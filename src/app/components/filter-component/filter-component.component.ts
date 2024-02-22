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

  // Method to add a new rule to the FormArray
  addRule(): void {
    this.getFlowByIdRep();
    const newRule: FilterRule = {
      selectedField: '',
      dependentOptions: [],
      selectedDependentField: '',
      inputText: '',
    };

    this.rules.push(newRule);
    this.rulesFormArray.push(this.createRuleFormGroup(newRule));
  }

  createRuleFormGroup(rule: FilterRule): FormGroup {
    return this.fb.group({
      selectedField: [rule.selectedField],
      dependentOptions: [rule.dependentOptions],
      selectedDependentField: [rule.selectedDependentField],
      inputText: [rule.inputText],
    });
  }

  onFieldSelect(ruleIndex: number, selectedField: any): void {
    console.log(selectedField);
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
    console.log(this.filterForm.value);
    const filterValues = this.filterForm.value;
    if (filterValues.startDate) {
      filterValues.startDate = this.datePipe.transform(
        filterValues.startDate,
        'yy-MM-dd'
      );
    }

    if (filterValues.endDate) {
      filterValues.endDate = this.datePipe.transform(
        filterValues.endDate,
        'yy-MM-dd'
      );
    }
    if (filterValues.isPerHour) {
      filterValues.startHour = filterValues.startHour.split(':')[0];
      filterValues.endHour = filterValues.endHour.split(':')[0];
      filterValues.type_Filter = 'per_day_Hour';
    }
    this.filterApplied.emit(filterValues);
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

  getFlowByIdRep() {
    this.chartService.getFlowByIdRep(this.idRep).subscribe((flow) => {
      this.flow = flow;
      console.log(this.flow);
    });
  }
}
