import { RepRapportX } from '../models/rep_rapports_x';
import { AddReportService } from 'src/app/services/add-report.service';
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { CustomdialogComponent } from '../customdialog/customdialog.component';
import { MatDialog } from '@angular/material/dialog';
import { OperationComponent } from '../operation/operation.component';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { QuerybuilderCComponent } from '../querybuilder-c/querybuilder-c.component';

@Component({
  selector: 'app-custom',
  templateUrl: './custom.component.html',
  styleUrl: './custom.component.css'
})
export class CustomComponent {
  selectedFields: any[] = []; // Array to hold selected fields
  flow: any;
  filtre:any
  selectedFlow: any; // Variable to hold selected flow
  filtreValue: string; 
  selectedFlows: any[] = []; 
  repRapportsXList: RepRapportX[] = [];
    ri:any
    field:any
  constructor(    private dialogService: DialogService
    ,public addService: AddReportService, private router: Router , public dialog: MatDialog) {
    
  }

  ref: DynamicDialogRef;
  columns: string[] = [];


  openDialogOperation(field: any) {
    this.ref = this.dialogService.open(OperationComponent, {
      header: 'Operation Query',
      width: '40%',
      data: { columnName: field.name_base },
      maximizable: true,
    });

    this.ref.onClose.subscribe((query: string) => {
      console.log('Dialog closed with query:', query);
      if (query) {
        field.operation = query;
        console.log(field);
      }
    });
  }
  openDialogF(flow: any, field: any) {
    this.ref = this.dialogService.open(QuerybuilderCComponent, {
      header: 'Filter',
      width: '40%',
      data: { flow, filtreValue: this.filtreValue }, // Pass the filtreValue to the dialog
      maximizable: true,
    });

    this.ref.onClose.subscribe((result: any) => {
      console.log('Dialog closed with filter:', result.filtreValue);
      if (result && result.filtreValue) {
        this.filtreValue = result.filtreValue; // Update the filtreValue in the component
        console.log(field);
      }
    });
}





  ngOnDestroy() {
    if (this.ref) {
      this.ref.close();
    }
  }


  


  
  ngOnInit(): void {
    this.flow = this.addService.report.flow[0];
    console.log(this.addService.report);
    if (this.flow.length == 0) {
      this.router.navigate(['/dashboard/steps/choose-flow']);
    }
  }


  onRowEditInit(field: any) {
    field.editing = true;
    field.operation = field.name_base; // Set operation to field.name_base initially
  }

  onRowEditSave(field: any, ri: number) {
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
      col1: this.selectedColumn1[ri] || '',      
      col2: this.selectedColumn2[ri] || '',      
      tableJoin: field.tableJoin,
      ycustField: field.ycustField, 
      join: field.join,
      list_rep_rapport_y: [],
    }; 
    this.repRapportsXList.push(repX);
    console.log(this.addService.report);
  }
    onRowEditCancel(field: any, ri: number) {
  }
  onDeleteRow(rowIndex: number) {
    this.selectedFields.splice(rowIndex, 1); 
}



nextPageClicked: boolean = false;
selectedColumn1: string[] = [];
selectedColumn2: string[] = [];

nextPage() {
  if (this.nextPageClicked) {
    return;
  }
  this.nextPageClicked = true;
  this.selectedFields.forEach((field, index) => {
    console.log('selectedColumn1 for field ' + index + ':', this.selectedColumn1[index]);
    console.log('selectedColumn2 for field ' + index + ':', this.selectedColumn2[index]);

    const repX: RepRapportX = {
      filtre:'',

      field_name: field.name_base,
      field_reporting: field.field_reporting,
      id_field: field.id,
      operation: field.operation,

      table_rep: this.flow.table_name,
      tableref_field_appears: '',
      tableref_field_query: '',
      // col1: Array.isArray(this.selectedColumn1) ? this.selectedColumn1.join(', ') : (this.selectedColumn1 || ''),      
      // col2: Array.isArray(this.selectedColumn2) ? this.selectedColumn2.join(', ') : (this.selectedColumn2 || ''),      
      // col1: field.selectedColumn1 || '',      
      // col2: field.selectedColumn2 || '',      
      col1: this.selectedColumn1[index] || '',
      col2: this.selectedColumn2[index] || '',
      tableJoin: field.tableJoin,
      ycustField: field.ycustField,
     join: field.join,
      list_rep_rapport_y: [],
    };

    this.repRapportsXList.push(repX);
  });

  this.addService.report.rep_rapports_x = this.repRapportsXList;

  if (this.filtreValue !== null && this.filtreValue !== undefined) {
    this.addService.report.filtre = { myfiltre: this.filtreValue };
  }
  
  console.log(this.addService.report);
  this.router.navigate(['/dashboard/steps/reportinfo']);
}





  prevPage() {
    this.addService.report.fields = [];
    this.addService.report.rep_rapports_x = [];
    console.log(this.addService.report);
    this.router.navigate(['/dashboard/steps/choose-flow']);
  }
  allFieldsNotNull(): boolean {
    return this.selectedFields.every(field =>
        field.name_base !== null &&
        field.filtre !== null &&
        // field.field_reporting !== null &&
        field.operation !== null &&
        field.tableJoin !== null
        //  &&
        // field.isYcustfield1 !== null
    );
}

openDialog(field: any, ri: number): void {
  const dialogRef = this.dialog.open(CustomdialogComponent, {
    width: 'auto',
    height: 'auto',
    maxHeight: '90vh',
    maxWidth: '90vw',
    data: {
      selectedFlow: this.selectedFlow,
      selectedFields: [field],
      rep_rapports_x: []
    }
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
    if (result) {
      this.selectedColumn1[ri] = result.selectedColumn1 || '';
      this.selectedColumn2[ri] = result.selectedColumn2 || '';

      field.col1 = result.selectedColumn1 || '';
      field.col2 = result.selectedColumn2 || '';
      field.tableJoin = result.selectedTable || '';
      field.join = result.join || '';
    }
  });
}

currentFieldIndex: number = 0;

areAllFieldsFilled(): boolean {
  return this.selectedFields.every(
    (field) =>
    field.field_name &&
      field.table_join &&
      field.field_reporting &&
      field.operation
  );
}
updateTableJoin(selectedFields: any[]): void {
  selectedFields.forEach(field => {
    if (!field.table_join) {
        field.table_join = ''; 
    }
});}
}