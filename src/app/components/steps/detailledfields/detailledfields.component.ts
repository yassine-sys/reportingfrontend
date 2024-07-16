import { Component, OnInit } from '@angular/core';
import { RepRapportX } from '../models/rep_rapports_x';
import { AddReportService } from 'src/app/services/add-report.service';
import { Router } from '@angular/router';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { OperationQueryComponent } from '../operation-query/operation-query.component';
import { FiltreOperationComponent } from '../filtre-operation/filtre-operation.component';

@Component({
  selector: 'app-detailledfields',
  templateUrl: './detailledfields.component.html',
  styleUrl: './detailledfields.component.css',
})
export class DetailledfieldsComponent implements OnInit {
  selectedFields: any[] = []; // Array to hold selected fields
  flow: any;
  repRapportsXList: RepRapportX[] = [];
  ref: DynamicDialogRef;
  filtreValue: string; 

  constructor(public addService: AddReportService, private router: Router,private dialogService: DialogService) {}

  ngOnInit(): void {
    this.flow = this.addService.report.flow[0];
    console.log(this.addService.report);
    if (this.flow.length == 0) {
      this.router.navigate(['/dashboard/steps/choose-flow']);
    }
  }

  onRowEditInit(field: any) {
    field.editing = true;
  }

  onRowEditSave(field: any) {
    if (field.saved) {
      return; // Exit the method if the field has already been saved
    }
    field.saved = true;
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
      tableJoin: field.tableJoin,
        ycustField: false,
        join: false,
        // isYcustfield1: false,
      list_rep_rapport_y: [],
    };
    this.repRapportsXList.push(repX);

    console.log(this.addService.report);
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
  }

  // nextPage() {
  //   this.addService.report.rep_rapports_x = this.repRapportsXList;
  //   console.log(this.addService.report);
  //   this.router.navigate(['/dashboard/steps/reprapport']);
  // }

  areAllFieldsFilled(): boolean {
    return this.selectedFields.every(
      (field) =>
          field.filtre &&
        field.field_reporting && field.operation //&&
      // field.selectedFieldsY != undefined
    );
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
        tableJoin: field.tableJoin,
        ycustField: false,
        join: false,
        // isYcustfield1: false,
        list_rep_rapport_y: [],
      };
      //create Y fields

       //  this.repRapportsXList.push(repX);
    });

    this.addService.report.rep_rapports_x = this.repRapportsXList;
    console.log(this.addService.report);

    console.log('Next button clicked');
    console.log('Navigating to /dashboard/steps/reprapport');
    this.router.navigate(['/dashboard/steps/reprapport']);
  }

  prevPage() {
    //   this.addService.report.fields = [];
    this.addService.report.rep_rapports_x = [];
    console.log(this.addService.report);
    this.router.navigate(['/dashboard/steps/choose-flow']);
  }

  openDialogOperation(field: any) {
    this.ref = this.dialogService.open(OperationQueryComponent, {
      header: 'Operation Query',
      width: '40%',
      data: { columnName:field.operation || field.name_base },
      maximizable: true,
    });

    // Handle dialog closure and get the result
    this.ref.onClose.subscribe((query: string) => {
      console.log('Dialog closed with query:', query);
      if (query) {
        field.operation = query;
        console.log(field);
      }
    });
  }

  ngOnDestroy() {
    if (this.ref) {
      this.ref.close();
    }
  }


  openDialogF(flow: any, field: any) {
    this.ref = this.dialogService.open(FiltreOperationComponent, {
      header: 'Filter',
      width: '40%',
      data: { flow, filtreValue: field.filtre }, // Pass the field-specific filtreValue to the dialog
      maximizable: true,
    });
  
    this.ref.onClose.subscribe((result: any) => {
      console.log('Dialog closed with filter:', result.filtreValue);
      if (result && result.filtreValue) {
        field.filtre = result.filtreValue; // Update the filtre value in the specific field
        console.log(field);
      }
    });
  }
  
}
