import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AddReportService } from 'src/app/services/add-report.service';
import { RepRapportX } from '../models/rep_rapports_x';
import { RepRapportsY } from '../models/rep_rapports_y';

@Component({
  selector: 'app-fields',
  templateUrl: './fields.component.html',
  styleUrls: ['./fields.component.css'],
})
export class FieldsComponent implements OnInit {
  selectedFieldsMap: Map<string, any[]> = new Map(); // Map to hold selected fields for each flow
  selectedFieldsYMap: Map<string, any[]> = new Map(); // Map to hold selected Y fields for each flow
  flow: any;
  repRapportsXMap: Map<string, RepRapportX[]> = new Map(); // Map to hold RepRapportX for each flow
  showYDropdownMap: Map<string, boolean> = new Map();

  constructor(public addService: AddReportService, private router: Router) {}

  ngOnInit(): void {
    this.flow = this.addService.report.flow;
    if (this.flow.length === 0) {
      this.router.navigate(['/dashboard/steps/choose-flow']);
    } else {
      this.initializeData();
    }
  }

  initializeData() {
    this.flow.forEach((flow: any) => {
      this.selectedFieldsMap.set(flow.id, []);
      this.selectedFieldsYMap.set(flow.id, []);
      this.repRapportsXMap.set(flow.id, []);
      this.showYDropdownMap.set(flow.id, false);
    });
  }

  onRowEditInit(field: any) {
    field.editing = true;
  }

  onRowEditSave(field: any) {
    field.editing = false;
  }

  onRowEditCancel(field: any) {
    field.editing = false;
  }

  onDeleteRow(field: any, flowId: string) {
    const selectedFields = this.selectedFieldsMap.get(flowId);
    const selectedYFields = this.selectedFieldsYMap.get(flowId);
    const repRapportsXList = this.repRapportsXMap.get(flowId);

    if (selectedFields && selectedYFields && repRapportsXList) {
      const index = selectedFields.findIndex(
        (selectedField) => selectedField.id === field.id
      );

      if (index !== -1) {
        selectedFields.splice(index, 1);
        selectedYFields.splice(index, 1);
        repRapportsXList.splice(index, 1);
      }
    }
  }

  areAllFieldsFilled(): boolean {
    let allFieldsFilled = true;

    // Iterate over all flows
    this.flow.forEach((flow: any) => {
      const selectedFields = this.selectedFieldsMap.get(flow.id) as any[];

      if (
        !selectedFields?.every(
          (field) =>
            field.filtre &&
            field.field_reporting &&
            field.operation &&
            field.selectedFieldsY !== undefined
        )
      ) {
        allFieldsFilled = false;
      }
    });

    return allFieldsFilled;
  }

  addRepRapportsY(field: any, flowId: string) {
    this.showYDropdownMap.set(flowId, !this.showYDropdownMap.get(flowId));
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
  updateNextPage() {
    // Check if all fields are filled for all flows
    //const allFieldsFilled = this.flow.every((flow: any) => this.areAllFieldsFilled(flow.id));

    if (!this.areAllFieldsFilled()) {
      return; // Exit the method if not all fields are filled for any flow
    }

    // Prevent multiple clicks on the "Next" button
    if (this.nextPageClicked) {
      return;
    }
    // Initialize an array to hold all repRapportsXList for each flow
    const allRepRapportsXLists: RepRapportX[][] = [];

    // Iterate over all flows
    this.flow.forEach((flow: any) => {
      const selectedFields = this.selectedFieldsMap.get(flow.id);
      let repRapportsXList = this.repRapportsXMap.get(flow.id) ?? [];

      selectedFields?.forEach((field) => {
        const repX: RepRapportX = {
          filtre: field.filtre,
          field_name: field.name_base,
          field_reporting: field.field_reporting,
          id_field: field.id,
          operation: field.operation,
          table_rep: flow.table_name, // Use the table_name of the current flow
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

        field.selectedFieldsY.forEach((fieldY: any) => {
          const repY: RepRapportsY = {
            field_name: fieldY.name_base,
            field_reporting: fieldY.field_reporting,
            id_field: fieldY.id,
            operation: fieldY.operation,
          };
          repX.list_rep_rapport_y.push(repY);
        });

        repRapportsXList.push(repX);
      });

      // Push the repRapportsXList for the current flow to the array
      allRepRapportsXLists.push(repRapportsXList);
    });

    // Concatenate all repRapportsXLists into a single array
    const allRepRapportsX = allRepRapportsXLists.reduce(
      (acc, curr) => acc.concat(curr),
      []
    );

    // Update the rep_rapports_x with the concatenated array
    this.addService.report.rep_rapports_x = allRepRapportsX;

    console.log(this.addService.report);

    // Navigate to the next page after handling all flows
    this.router.navigate(['/dashboard/steps/report-info']);
  }

  prevPage() {
    this.addService.report.rep_rapports_x = [];
    this.router.navigate(['/dashboard/steps/choose-flow']);
  }
}
