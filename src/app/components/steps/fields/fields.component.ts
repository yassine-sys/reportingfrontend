import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AddReportService } from 'src/app/services/add-report.service';
import { RepRapportX } from '../models/rep_rapports_x';
import { RepRapportsY } from '../models/rep_rapports_y';
import { colorSets } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-fields',
  templateUrl: './fields.component.html',
  styleUrl: './fields.component.css',
})
export class FieldsComponent implements OnInit {
  selectedFields: any[] = []; // Array to hold selected fields
  flow: any;
  repRapportsXList: RepRapportX[] = [];
  constructor(public addService: AddReportService, private router: Router) {}

  ngOnInit(): void {
    this.flow = this.addService.report.flow;
    console.log(this.addService.report);
    if (this.flow.length == 0) {
      this.router.navigate(['/dashboard/steps/choose-flow']);
    }
  }

  onRowEditInit(field: any) {
    field.editing = true;
  }

  onRowEditSave(field: any) {
    field.editing = false;
    const repX: RepRapportX = {
      filtre: field.filtre,
      field_name: field.name_base,
      field_reporting: field.field_reporting,
      id_field: field.id,
      operation: field.operation,
      table_rep: this.flow.table_name,
      tableref_field_appears: '',
      tableref_field_query: '',
      col1: '',
      col2: '',
      table_join: field.table_join,
      isycustfield: false,
      is_join: false,
      isYcustfield1: false,
      list_rep_rapport_y: [],
    };
    this.repRapportsXList.push(repX);
    console.log(this.addService.report);
  }

  onRowEditCancel(field: any, ri: number) {
    field.editing = false;
  }
  nextPage() {
    this.addService.report.rep_rapports_x = this.repRapportsXList;
    console.log(this.addService.report);
    this.router.navigate(['steps/payment']);
  }

  prevPage() {
    this.addService.report.fields = [];
    this.addService.report.rep_rapports_x = [];
    console.log(this.addService.report);
    this.router.navigate(['/dashboard/steps/choose-flow']);
  }
}
