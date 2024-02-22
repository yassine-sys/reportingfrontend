import { FilterOption } from './FilterOption';

export interface FilterRule {
  selectedField: string;
  dependentOptions: FilterOption[];
  selectedDependentField: string;
  inputText: string;
}
