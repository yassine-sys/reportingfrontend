import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import * as XLSX from 'xlsx';
import { ChartService } from 'src/app/services/chart.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Table } from 'primeng/table';
import { Subscription } from 'rxjs';
import { DarkModeService } from 'src/app/services/dark-mode.service';
import { ThemeService } from 'src/app/services/theme.service';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-table-dialog',
  templateUrl: './table-dialog.component.html',
  styleUrls: ['./table-dialog.component.css'],
})
export class TableDialogComponent {
  parentRow: any;
  columns: string[];
  title: any;
  dataSource: MatTableDataSource<any>;
  tableData: any;
  searchActive: boolean = false;
  isoperator: boolean = false;
  iscarrier: boolean = false;
  isnested: boolean = false;
  lvl4: boolean = false;
  hasDetails: boolean = false;

  lvl1: any;
  lvl2: any;
  rows: any;
  idrep: any;

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild('searchInput') searchInput!: ElementRef;
  @ViewChild('dt2') dataTable!: Table;

  exporting: boolean = false;
  exportProgress: number = 0;

  private subscriptionDarkMode: Subscription = new Subscription();
  darkModeEnabled!: boolean;

  constructor(
    public config: DynamicDialogConfig,
    public ref: DynamicDialogRef,
    public service: ChartService, // @Inject(MAT_DIALOG_DATA) data: any, // private dialogRef: MatDialogRef<TableDialogComponent>
    private darkModeService: DarkModeService,
    private themeService: ThemeService
  ) {
    //console.log(data);
    this.tableData = this.config.data;
    this.rows = this.config.data.rows;
    this.columns = this.config.data.columns;
    this.title = this.config.data.title;
    this.isoperator = this.config.data.isoperator;
    this.iscarrier = this.config.data.iscarrier;
    this.isnested = this.config.data.isnested;
    this.lvl1 = this.config.data.lvl1;
    this.lvl2 = this.config.data.lvl2;
    this.idrep = this.config.data.idrep;
    this.parentRow = this.config.data.parentRow;
    this.hasDetails = this.config.data.hasDetails;

    if (this.isoperator) {
      this.service.getOperatorsDest().subscribe((operators) => {
        this.updateRowsWithOperators(operators);
      });
    }

    if (this.isnested) {
      this.lvl4 = true;
    }

    this.dataSource = new MatTableDataSource<any>(this.config.data.rows);

    this.subscriptionDarkMode = this.darkModeService.darkModeState.subscribe(
      (isDarkMode) => {
        this.darkModeEnabled = isDarkMode;
        if (this.darkModeEnabled) {
          this.themeService.switchTheme('lara-dark-blue');
        } else {
          this.themeService.switchTheme('lara-light-blue');
        }
      }
    );
  }

  ngOnInit() {
    console.log('is nested : ', this.isnested);
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
    this.ref.close();
  }

  saveAsXLSX() {
    console.log(this.parentRow);
    import('xlsx').then((xlsx) => {
      this.exporting = true;
      this.exportProgress = 0;

      const rows = this.tableData.rows;
      const title = this.title;
      const parentRow = this.parentRow; // Assuming you have a parentRow object

      // Add parentRow to each row
      const rowsWithParent = rows.map((row: any) => ({
        ...parentRow,
        ...row,
      }));
      // Convert the new data to a worksheet
      const worksheet = xlsx.utils.json_to_sheet(rowsWithParent);

      // Create the workbook
      const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, {
        bookType: 'xlsx',
        type: 'array',
      });
      this.saveAsExcelFile(excelBuffer, `${title}.xlsx`);
      this.exporting = false;
    });
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    let EXCEL_TYPE =
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    let EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE,
    });
    FileSaver.saveAs(data, fileName + EXCEL_EXTENSION);
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

  clear(table: Table) {
    table.clear();
    this.clearSearchInput();
  }

  clearSearchInput() {
    if (this.searchInput && this.searchInput.nativeElement) {
      this.searchInput.nativeElement.value = ''; // Clear the input value
      //this.applyFilterGlobal(); // Optionally, trigger the filter function after clearing
    }
  }
  applyFilterGlobal(event: Event) {
    if (this.dataTable) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataTable.filterGlobal(filterValue, 'contains');
    }
  }

  // checkColumnTypes(column: string): string {
  //   return typeof this.rows[0][column] === 'number' ? 'numeric' : 'text';
  // }

  checkColumnTypes(column: string): string {
    if (
      this.rows &&
      this.rows.length > 0 &&
      this.rows[0][column] !== undefined
    ) {
      return typeof this.rows[0][column] === 'number' ? 'numeric' : 'text';
    }
    return 'text'; // Default to text if unsure
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
