import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AddReportService } from 'src/app/services/add-report.service';
import { RepRapportX } from '../models/rep_rapports_x';

@Component({
  selector: 'app-customdialog',
  templateUrl: './Customdialog.component.html',
  styleUrls: ['./Customdialog.component.css']
})
export class CustomdialogComponent {
  selectedFields: any[];
  fieldReporting: string;
  selectedFlow: any;
  tables: string[]; 
  selectedTable: string; 
  selectedColumn1: string[];
  selectedColumn2: string[];
  constructor(
    public addService: AddReportService,
    private router: Router,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<CustomdialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http: HttpClient 
  ) {
    this.selectedFlow = data.selectedFlow;
    this.selectedFields = data.selectedFields;
    this.fieldReporting = data.fieldReporting;
    this.tables = [];
    this.selectedTable = '';
    this.selectedColumn1 = data.selectedColumn1 || []; 
    this.selectedColumn2 = data.selectedColumn2 || [];
    this.repRapportsXList = data.repRapportsXList; 
    this.shouldSetJoin = true;

  }
  selectedField: any;

  getSelectedFields(): string {
    return this.selectedFields.length > 0 ? this.selectedFields.map(field => field.name_base).join(', ') : '';
  }
  
  ngOnInit(): void {
    this.selectedFlow = this.addService.report.flow[0];
    if (!this.selectedFlow) {
      this.router.navigate(['/dashboard/steps/choose-flow']);
    } const tableref = 'tableref';
    this.addService.getTablesInSchema(tableref).subscribe(tables => {
      this.tables = tables;
    });

  }
  shouldSetJoin: boolean = false;
  currentFieldIndex: number = 0;
  selectedColumnsMap: { [key: number]: { col1: string, col2: string, table_join: string } } = {};
  isCustomized: boolean = false; 
  selectedColumns: string[];
  selectedColumns1: string[];
  selectedColumns2: string[];
  onTableSelect(): void {
    const tableref = 'tableref'; 
    this.addService.getTablesCols(tableref, this.selectedTable).subscribe(columns => {
      this.selectedColumns1 = columns; 
    });
  
    this.addService.getOtherTablesCols(tableref, this.selectedTable).subscribe(columns => {
      this.selectedColumns2 = columns; 
    });
  
  
    this.selectedFields.forEach(field => {
      field.table_join = this.selectedTable; // Set table_join for each field
    });
  

  //   this.rep_rapports_x.forEach(repX => {
  //     repX.table_join = this.selectedTable;
  // });
}
      
  selectedColumnData: string[];

  selectedColumn: string; // Change type to string

  field_reporting: RepRapportX[];

  onCancel(): void {
    this.dialogRef.close();
  }
  rowIndex: number;
  // onSave(): void {
  //   if (!this.selectedColumn1 || !this.selectedColumn2) {
  //     console.error('Please select columns.');
  //     return;
  //   }
  
  //   this.dialogRef.close({
  //     selectedColumn1: this.selectedColumn1,
  //     selectedColumn2: this.selectedColumn2
  //   });
  // }  
  repRapportsXList: RepRapportX[] = []; 
  onSave(): void {
    if (!this.selectedColumn1 || !this.selectedColumn2) {
      console.error('Please select columns.');
      return;
    }
  
   
  
    this.dialogRef.close({
      selectedColumn1: this.selectedColumn1,
      selectedColumn2: this.selectedColumn2,
      selectedTable: this.selectedTable,
      join:true // Pass the updated repRapportsXList back to the parent component

    });
  }
  

  onChange(event: any, field: string) {
    console.log('Selected ' + field + ':', event);
  }



  
  
}
