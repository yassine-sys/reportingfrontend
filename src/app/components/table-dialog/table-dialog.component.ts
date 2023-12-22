import { Component, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import * as XLSX from 'xlsx';
import { ChartService } from 'src/app/services/chart.service';

@Component({
  selector: 'app-table-dialog',
  templateUrl: './table-dialog.component.html',
  styleUrls: ['./table-dialog.component.css'],
})
export class TableDialogComponent {
  columns: string[];
  title: any;
  dataSource: MatTableDataSource<any>;
  tableData: any;
  searchActive: boolean = false;
  isoperator: boolean = false;
  iscarrier: boolean = false;

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  exporting: boolean = false;
  exportProgress: number = 0;

  constructor(
    public service: ChartService,
    @Inject(MAT_DIALOG_DATA) data: any,
    private dialogRef: MatDialogRef<TableDialogComponent>
  ) {
    this.tableData = data;
    this.columns = data.columns;
    this.title = data.title;
    this.isoperator = data.isoperator;
    this.iscarrier = data.iscarrier;
    if (this.isoperator) {
      this.service.getOperatorsDest().subscribe((operators) => {
        this.updateRowsWithOperators(operators);
      });
    }

    this.dataSource = new MatTableDataSource<any>(data.rows);
  }

  ngOnInit() {
    console.log(this.tableData);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onCloseDialog(): void {
    this.dialogRef.close();
  }

  saveAsXLSX() {
    this.exporting = true;
    this.exportProgress = 0;

    const rows = this.tableData.rows;
    const columns = this.tableData.columns;
    const title = this.title;

    const totalRows = rows.length;
    const chunkSize = 1000; // Number of rows to export per chunk
    const totalChunks = Math.ceil(totalRows / chunkSize);

    const workbook = XLSX.utils.book_new();

    for (let i = 0; i < totalChunks; i++) {
      const start = i * chunkSize;
      const end = Math.min(start + chunkSize, totalRows);
      const chunkRows = rows.slice(start, end);

      const sheetName = `Sheet${i + 1}`;
      const ws = XLSX.utils.json_to_sheet(chunkRows, { header: columns });
      XLSX.utils.book_append_sheet(workbook, ws, sheetName);

      const progress = Math.ceil(((i + 1) / totalChunks) * 100);
      this.exportProgress = progress;
    }

    const wbout = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([wbout], { type: 'application/octet-stream' });

    this.exporting = false;
    saveAs(blob, `${title}.xlsx`);
  }

  toggleSearch() {
    this.searchActive = !this.searchActive;
  }

  updateRowsWithOperators(operators: any[]): void {
    const rows = this.tableData.rows;

    rows.forEach((row: { [x: string]: any }) => {
      const firstColumnValue = row[this.columns[0]]; // Get the value of the first column

      const matchingOperator = operators.find(
        (operator) => operator.id === firstColumnValue
      );

      if (matchingOperator) {
        row[this.columns[0]] = matchingOperator.nomDestination; // Replace the first column with the operator name
      }
    });

    // Update the data source
    this.dataSource.data = rows;
  }
}

function saveAs(blob: Blob | MediaSource, filename: string) {
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  // Revoke the object URL after the download
  URL.revokeObjectURL(url);
}
