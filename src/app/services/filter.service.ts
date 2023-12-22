// filter-state.service.ts
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Filters } from 'src/model/Filters';
import { FilterType } from 'src/model/FilterType';

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  private filterType: FilterType = FilterType.None;
  private filters: Filters = {
    idfunction: 0,
    startDate: null,
    endDate: null,
    type_Filter: this.filterType,
    isVaration: false,
    isPerHour: false,
    startHour: null,
    endHour: null,
  };

  private filtersUpdated: Subject<Filters> = new Subject<Filters>();
  private filtersUpdatedUser: Subject<Filters> = new Subject<Filters>();

  getFilters(): Filters {
    return this.filters;
  }

  updateFilters(newFilters: Filters) {
    this.filters = newFilters;
    this.filtersUpdated.next(this.filters);
  }

  updateFiltersUSer(newFilters: Filters) {
    this.filters = newFilters;
    this.filtersUpdatedUser.next(this.filters);
  }

  clearFilters() {
    this.filterType = FilterType.None;
    this.filters = {
      idfunction: 0,
      startDate: null,
      endDate: null,
      type_Filter: this.filterType,
      isVaration: false,
      isPerHour: false,
      startHour: null,
      endHour: null,
    };
    this.filtersUpdated.next(this.filters);
  }

  clearFiltersUser() {
    this.filterType = FilterType.None;
    this.filters = {
      idfunction: 0,
      startDate: null,
      endDate: null,
      type_Filter: this.filterType,
      isVaration: false,
      isPerHour: false,
      startHour: null,
      endHour: null,
    };
    this.filtersUpdatedUser.next(this.filters);
  }

  getFiltersUpdatedObservable() {
    return this.filtersUpdated.asObservable();
  }

  getFiltersUpdatedObservableUSer() {
    return this.filtersUpdatedUser.asObservable();
  }
}
