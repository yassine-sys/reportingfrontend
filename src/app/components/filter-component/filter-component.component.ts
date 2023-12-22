// filter-component.component.ts
import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OverlayPanel } from 'primeng/overlaypanel';
import { FilterType } from 'src/model/FilterType';
import { Filters } from 'src/model/Filters';

@Component({
  selector: 'app-filter-component',
  templateUrl: './filter-component.component.html',
  styleUrls: ['./filter-component.component.css'],
})
export class FilterComponentComponent {
  @Output() filterApplied: EventEmitter<Filters> = new EventEmitter<Filters>();
  filterType = FilterType;
  @ViewChild('overlayPanel') overlayPanel!: OverlayPanel;
  filterForm!: FormGroup;

  filterTypeOptions: any[] = [
    //{ label: 'Hour', value: 'per_hour' },
    { label: 'Day', value: 'per_day' },
    { label: 'Month', value: 'per_month' },
    { label: 'Year', value: 'per_year' },
  ];

  constructor(private fb: FormBuilder, private datePipe: DatePipe) {
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
