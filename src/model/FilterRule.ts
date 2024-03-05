import { FilterOption } from './FilterOption';

export interface FilterRule {
  filter: boolean;
  selectedField: any;
  dependentOptions: FilterOption[];
  selectedDependentField: string;
  inputText: string;
  showMultiSelect: boolean;
}
