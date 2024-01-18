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
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OverlayPanel } from 'primeng/overlaypanel';
import { FilterType } from 'src/model/FilterType';
import { Filters } from 'src/model/Filters';

@Component({
  selector: 'app-filter-component',
  templateUrl: './filter-component.component.html',
  styleUrls: ['./filter-component.component.css'],
})
export class FilterComponentComponent implements OnInit, OnChanges {
  @Input() filter: any;
  @Output() filterApplied: EventEmitter<Filters> = new EventEmitter<Filters>();
  filterType = FilterType;
  @ViewChild('overlayPanel') overlayPanel!: OverlayPanel;
  filterForm!: FormGroup;
  date: any;

  filterTypeOptions: any[] = [
    //{ label: 'Hour', value: 'per_hour' },
    { label: 'Day', value: 'per_day' },
    { label: 'Month', value: 'per_month' },
    { label: 'Year', value: 'per_year' },
  ];

  constructor(private fb: FormBuilder, private datePipe: DatePipe) {
    this.initializeForm();
  }
  ngOnInit(): void {
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
      },
      { validators: this.dateComparisonValidator }
    );
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
}
