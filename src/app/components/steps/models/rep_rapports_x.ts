import { RepRapportsY } from './rep_rapports_y';

export class RepRapportX {
  filtre: string;
  field_name: string;
  field_reporting: string;
  id_field: number;
  operation: string;
  table_rep: string;
  tableref_field_appears: string;
  tableref_field_query: string;
  col1: string;
  col2: string;
  tableJoin: string;
  // isycustfield: boolean = false;
  // is_join: boolean = false;
  join: boolean = false;;
  // isYcustfield1: boolean = false;
  ycustField: boolean = false;
  list_rep_rapport_y: RepRapportsY[] = [];

  constructor() {}
}
