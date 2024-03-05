// filter-component.component.ts
import { DatePipe } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OverlayPanel } from 'primeng/overlaypanel';
import { ChartService } from 'src/app/services/chart.service';
import { FilterOption } from 'src/model/FilterOption';
import { FilterRule } from 'src/model/FilterRule';
import { FilterType } from 'src/model/FilterType';
import { Filters } from 'src/model/Filters';

@Component({
  selector: 'app-filter-component',
  templateUrl: './filter-component.component.html',
  styleUrls: ['./filter-component.component.css'],
})
export class FilterComponentComponent implements OnInit, OnChanges {
  @Input() filter: any;
  @Input() idRep: any;
  @Output() filterApplied: EventEmitter<Filters> = new EventEmitter<Filters>();
  filterType = FilterType;
  @ViewChild('overlayPanel') overlayPanel!: OverlayPanel;
  filterForm!: FormGroup;
  date: any;

  showMultiSelect: boolean = false;
  flow: any;
  selectedField: any;

  rules: FilterRule[] = [];

  filterTypeOptions: any[] = [
    //{ label: 'Hour', value: 'per_hour' },
    { label: 'Day', value: 'per_day' },
    { label: 'Month', value: 'per_month' },
    { label: 'Year', value: 'per_year' },
  ];

  operatorOptions: any[] = [
    { label: '=', value: '=' },
    { label: '<>', value: '<>' },
    { label: '!=', value: '!=' },
    { label: '>', value: '>' },
    { label: '<', value: '<' },
    { label: '>=', value: '>=' },
    { label: '<=', value: '<=' },
    { label: 'IN', value: 'IN' },
    { label: 'LIKE', value: 'LIKE' },
    { label: 'IS', value: 'IS' },
    { label: 'IS NOT', value: 'IS NOT' },
  ];

  constructor(
    private fb: FormBuilder,
    private datePipe: DatePipe,
    private chartService: ChartService
  ) {
    this.initializeForm();
  }
  ngOnInit(): void {
    this.initializeForm();
    this.date = new Date().toISOString().slice(0, 10);
    if (this.filter) {
      this.setFormValues(this.filter);
    }
  }

  initializeForm() {
    this.filterForm = this.fb.group(
      {
        startDate: ['', Validators.required],
        endDate: ['', Validators.required],
        type_Filter: [this.filterType.Day],
        isVaration: [false],
        isPerHour: [false],
        startHour: [''],
        endHour: [''],
        rules: this.fb.array([]), // Initialize an empty FormArray for rules
      },
      { validators: this.dateComparisonValidator }
    );
  }

  get rulesFormArray() {
    return this.filterForm.get('rules') as FormArray;
  }

  addRule(): void {
    this.getFlowByIdRep();
    const newRule: FilterRule = {
      showMultiSelect: false,
      selectedField: '',
      dependentOptions: [],
      selectedDependentField: '',
      inputText: '',
      filter: false,
    };

    this.rules.push(newRule);
    this.rulesFormArray.push(this.createRuleFormGroup(newRule));
  }

  createRuleFormGroup(rule: FilterRule): FormGroup {
    return this.fb.group({
      selectedField: [rule.selectedField.name_base],
      dependentOptions: [rule.dependentOptions],
      selectedDependentField: [rule.selectedDependentField],
      inputText: [rule.inputText],
    });
  }

  onFieldSelect(ruleIndex: number, selectedField: any): void {
    //console.log(selectedField);
    this.chartService
      .getDistinctValues(this.flow.table_name, selectedField.name_base)
      .subscribe((options: FilterOption[]) => {
        this.rules[ruleIndex].dependentOptions = options;
        // Manually update the FormArray to reflect changes
        this.rulesFormArray.at(ruleIndex).patchValue({
          dependentOptions: options,
          selectedDependentField: '', // Reset dependent field selection
        });
      });
  }

  removeRule(index: number) {
    // Remove the rule from the UI state array
    this.rules.splice(index, 1);

    // Remove the corresponding FormGroup from the FormArray
    this.rulesFormArray.removeAt(index);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['filter'] && this.filter) {
      console.log(this.filter);
      this.setFormValues(this.filter);
    }
  }

  setFormValues(filter: any) {
    this.filterForm.patchValue({
      startDate: this.transformDate(filter.startDate),
      endDate: this.transformDate(filter.endDate),
      type_Filter:
        this.filterTypeOptions.find((ft) => ft.value === filter.type_Filter)
          ?.value || this.filterType.Day,
      isVaration: filter.isVaration || false,
      isPerHour: filter.isPerHour || false,
      startHour: filter.startHour || '',
      endHour: filter.endHour || '',
    });
  }

  transformDate(dateStr: string): string {
    if (!dateStr) {
      return '';
    }
    const [year, month, day] = dateStr.split('-');
    const transformedYear = parseInt(year) < 100 ? '20' + year : year;
    return `${transformedYear}-${month}-${day}`;
  }

  applyFilter() {
    const formValue = this.filterForm.value;

    // Transforming the form values to match the Filters interface
    const transformedFormValue: Filters = {
      startDate: formValue.startDate
        ? this.datePipe.transform(formValue.startDate, 'yy-MM-dd')
        : null,
      endDate: formValue.endDate
        ? this.datePipe.transform(formValue.endDate, 'yy-MM-dd')
        : null,
      type_Filter: formValue.type_Filter,
      isVaration: formValue.isVaration,
      isPerHour: formValue.isPerHour,
      startHour: formValue.isPerHour ? formValue.startHour.split(':')[0] : null,
      endHour: formValue.isPerHour ? formValue.endHour.split(':')[0] : null,
      id_rep: this.idRep,
      idfunction: 0,
      rules: formValue.rules.map((rule: any) => ({
        selectedField: {
          id: rule.selectedField.id,
          name_base: rule.selectedField.name_base,
          mapping: rule.selectedField.mapping,
          id_data_type: rule.selectedField.id_data_type,
        },
        selectedDependentField: Array.isArray(rule.selectedDependentField)
          ? rule.selectedDependentField
          : [rule.selectedDependentField],
        inputText: rule.inputText,
        filter: true,
      })),
    };

    console.log(transformedFormValue);
    this.filterApplied.emit(transformedFormValue);
    this.overlayPanel.hide();
  }

  dateComparisonValidator(formGroup: FormGroup) {
    const startDate = formGroup.get('startDate')!.value;
    const endDate = formGroup.get('endDate')!.value;

    if (startDate && endDate && startDate > endDate) {
      return { dateComparison: true };
    }

    if (startDate && endDate && startDate === endDate) {
      return { sameDate: true };
    }

    return null;
  }

  toggleMultiSelect() {
    this.showMultiSelect = !this.showMultiSelect;
    this.getFlowByIdRep();
  }

  toggleMultiSelect2(index: number): void {
    this.rules[index].showMultiSelect = !this.rules[index].showMultiSelect;
    // You may need to update the form control value if necessary
    // For example, clear the selectedDependentField when toggling
    this.rulesFormArray.at(index).patchValue({
      selectedDependentField: this.rules[index].showMultiSelect ? [] : '',
    });
  }

  getFlowByIdRep() {
    this.chartService.getFlowByIdRep(this.idRep).subscribe((flow) => {
      this.flow = flow;
      console.log(this.flow);
    });
  }
}
