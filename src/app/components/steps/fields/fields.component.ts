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
  selectedFieldsY: any[] = [];
  flow: any;
  repRapportsXList: RepRapportX[] = [];
  showYDropdown: boolean = false;
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
  }

  onRowEditCancel(field: any, ri: number) {
    field.editing = false;
  }

  onDeleteRow(field: any) {
    const index = this.selectedFields.findIndex(
      (selectedField) => selectedField.id === field.id
    );
    if (index !== -1) {
      this.selectedFields.splice(index, 1);
    }
    const repIndex = this.repRapportsXList.findIndex(
      (rep) => rep.id_field === field.id
    );

    if (repIndex !== -1) {
      this.repRapportsXList.splice(repIndex, 1);
    }

    console.log(this.addService.report);
    console.log(this.selectedFields);
  }
  areAllFieldsFilled(): boolean {
    return this.selectedFields.every(
      (field) =>
        field.filtre &&
        field.field_reporting &&
        field.operation &&
        field.selectedFieldsY != undefined
    );
  }

  addRepRapportsY(field: any) {
    this.showYDropdown = !this.showYDropdown;
    field.selectedFieldsY.forEach((yField: any) => (yField.editingY = false));
  }

  onRowEditInitY(yField: any) {
    yField.editingY = true;
  }

  onRowEditSaveY(yField: any) {
    yField.editingY = false;
  }

  onRowEditCancelY(yField: any) {
    yField.editingY = false;
  }

  nextPageClicked: boolean = false;
  nextPage() {
    console.log(this.selectedFields);
    if (!this.areAllFieldsFilled()) {
      return; // Exit the method if not all fields are filled
    }

    // Prevent multiple clicks on the "Next" button
    if (this.nextPageClicked) {
      return;
    }
    this.nextPageClicked = true;

    this.selectedFields.forEach((field) => {
      //create Y fields
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
      //create Y fields
      field.selectedFieldsY.forEach((fieldY: any) => {
        const repY: RepRapportsY = {
          field_name: fieldY.name_base,
          field_reporting: fieldY.field_reporting,
          id_field: fieldY.id,
          operation: fieldY.operation,
        };
        repX.list_rep_rapport_y.push(repY);
      });

      this.repRapportsXList.push(repX);
    });

    this.addService.report.rep_rapports_x = this.repRapportsXList;
    console.log(this.addService.report);
    this.router.navigate(['/dashboard/steps/report-info']);
  }

  prevPage() {
    this.addService.report.rep_rapports_x = [];
    this.router.navigate(['/dashboard/steps/choose-flow']);
  }
}
