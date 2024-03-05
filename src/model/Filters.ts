import { FilterType } from './FilterType';

export interface Filters {
  id_rep?: any;
  idfunction: number;
  startDate: any | null;
  endDate: any | null;
  type_Filter: FilterType;
  isVaration: boolean;
  isPerHour: boolean;
  startHour: any | null;
  endHour: any | null;
  rules?: any;
}
