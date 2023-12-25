import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { TableDialogComponent } from '../table-dialog/table-dialog.component';
import { ChartService } from '../../services/chart.service';
import { MatSort } from '@angular/material/sort';
import { CommentFormComponent } from '../comment-form/comment-form.component';
import { FunctionChartsComponent } from '../function-charts/function-charts.component';
import { ActivatedRoute, Router } from '@angular/router';
import { FilterService } from '../../services/filter.service';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { LoaderService } from '../../services//loader.service';
import { FunctionService } from '../../services//function.service';
import { CommentService } from '../../services//comment.service';
import { PrimeNGConfig, SortEvent } from 'primeng/api';
import { Observable, Subscription, finalize } from 'rxjs';
import { Table } from 'primeng/table';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import { DarkModeService } from 'src/app/services/dark-mode.service';
import { ThemeService } from 'src/app/services/theme.service';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-nested-table',
  templateUrl: './nested-table.component.html',
  styleUrls: ['./nested-table.component.css'],
})
export class NestedTableComponent implements OnInit {
  @Input() columns: string[] = [];
  @Input() data: any[] = [];
  @Input() idrep: any[] = [];
  @Input() title!: String;
  @Input() filter: any;
  @Input() operator: any;
  @Input() iscarrier: any;

  subRepId: any;
  jsonData!: any[];

  dataSource: MatTableDataSource<any>;
  selectedRow: any;
  searchActive: boolean = false;

  newCols: any[] = [
    'date_appel',
    'voice',
    'sms',
    'data',
    'roaming',
    'offer',
    'transert',
    'com',
    'loan',
    'evd',
    'mobile_money',
    'total',
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(FunctionChartsComponent) func!: FunctionChartsComponent;

  @Output() commentAdded = new EventEmitter<void>();
  originalData: any;
  childTableData: any;
  expanded: { [key: string]: boolean } = {};
  detailsCols: any[] = [];
  detailsRows: any[] = [];
  detailsTitle: any;
  // Use an object to store details and child table data for each row
  rowDetails: { [key: string]: { detailsCols: any[]; childTableData: any[] } } =
    {};

  expandedRows: Set<string> = new Set();
  isLoading: boolean = false;
  @ViewChild('dt2') dataTable!: Table;
  @ViewChild('detailsTable') detailsTable!: Table;
  detailsTableData!: any[];

  exporting: boolean = false;
  exportProgress: number = 0;
  startDate: any;
  endDate: any;

  subRep1: any;

  showProgressBar: boolean = false;

  @ViewChild('searchInput') searchInput!: ElementRef;

  private subscriptionDarkMode: Subscription = new Subscription();
  darkModeEnabled!: boolean;

  constructor(
    public dialog: MatDialog,
    public chartService: ChartService,
    private route: ActivatedRoute,
    private router: Router,
    private filterService: FilterService,
    private userService: UserService,
    private service: AuthService,
    private toastr: ToastrService,
    private loaderService: LoaderService,
    private functionService: FunctionService,
    private changeDetectorRef: ChangeDetectorRef,
    private commentService: CommentService,
    private primengConfig: PrimeNGConfig,
    private darkModeService: DarkModeService,
    private themeService: ThemeService,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.dataSource = new MatTableDataSource();
    this.dataSource = new MatTableDataSource();
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
  ngOnInit(): void {
    this.primengConfig.ripple = true;
    const jsonData = this.data.map((row: { [x: string]: any }) => {
      const obj: { [key: string]: any } = {};
      this.columns.forEach((column, index) => {
        obj[column] = this.formatNumber(row[index]);
      });
      return obj;
    });
    this.jsonData = jsonData;
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.columns.length === 0 || this.columns[0] === '') {
      // Use newCols when listenamereptab is empty or undefined
      this.columns = this.newCols;
    }
    this.dataSource.data = this.transformData(this.data, this.columns);
    if (this.paginator) {
      this.paginator.firstPage();
    }
    if (changes['data'] && this.data) {
      this.dataSource.data = this.transformData(this.data, this.columns);
      // Refresh the table with the new data
      if (this.paginator) {
        this.paginator.firstPage();
      }
    }
  }

  transformData(data: any[], columns: string[]): any[] {
    if (columns.includes('"Impact(dinar)"')) {
      return data
        .filter((row) => row[columns.indexOf('"Impact(dinar)"')] > 0)
        .map((row) => {
          let obj: { [key: string]: any } = {};
          row.forEach((cell: any, index: any) => {
            obj[columns[index]] = cell;
          });
          return obj;
        });
    } else {
      return data.map((row) => {
        let obj: { [key: string]: any } = {};
        row.forEach((cell: any, index: any) => {
          obj[columns[index]] = cell;
        });

        return obj;
      });
    }
  }

  formatNumber(value: any): string {
    if (typeof value === 'number') {
      const options = {
        minimumFractionDigits: 2,
        maximumFractionDigits: 5,
      };
      const formattedValue = value.toLocaleString('en-GB', options);
      const parts = formattedValue.split('.');
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
      const newValue = parts.join('.').replace(/,/g, ' '); // Replace commas with spaces

      return newValue;
    }
    return value;
  }

  formatDate(date: Date): string {
    const year = date.getFullYear().toString().slice(-2); // Get the last two digits of the year
    const month = ('0' + (date.getMonth() + 1)).slice(-2); // Add 1 to the month because it's 0-indexed
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }

  updateRowsWithOperators(row: any): void {
    console.log(this.iscarrier);
    if (this.operator) {
      this.chartService.getOperatorsDest().subscribe((operators) => {
        operators.forEach((opr: any) => {
          if (row[this.columns[0]] == opr.id) {
            console.log(row[this.columns[0]]);
            row[this.columns[0]] = opr.nomDestination;
            console.log(row[this.columns[0]]);
          }
        });
      });
    } else if (this.iscarrier) {
      this.chartService.getOperatorsInterco().subscribe((operators) => {
        operators.forEach((opr: any) => {
          if (row[this.columns[0]] == opr.id) {
            console.log(row[this.columns[0]]);
            row[this.columns[0]] = opr.operateur;
            console.log(row[this.columns[0]]);
          }
        });
      });
    }
  }

  selectRow(row: any) {
    this.selectedRow = row;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  toggleSearch() {
    this.searchActive = !this.searchActive;
  }

  filters(event: Event, field: string) {
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
    this.data = this.originalData.filter((rowData: { [x: string]: string }) =>
      rowData[field].toLowerCase().includes(filterValue)
    );
  }

  getDetails(rowData: any, i: any): void {
    if (this.filter === undefined) {
      const today = new Date();
      const datePreviousMonth = new Date(today);
      datePreviousMonth.setMonth(today.getMonth() - 1);

      this.startDate = this.formatDate(datePreviousMonth);
      this.endDate = this.formatDate(today);
      //console.log(this.filter);
    } else {
      this.startDate = this.filter.startDate;
      this.endDate = this.filter.endDate;
    }

    if (!rowData.details) {
      this.isLoading = true; // Set loading flag to true
      //console.log(this.filter);

      this.chartService
        .getDetails(
          this.idrep,
          rowData[this.columns[0]],
          this.startDate,
          this.endDate
        )
        .pipe(finalize(() => (this.isLoading = false))) // Set loading flag back to false
        .subscribe((response) => {
          //console.log(response);
          const columns = response.listnamereptab;
          const data = response.list_de_donnees;
          this.detailsCols = columns;
          this.detailsTitle = response.title;
          this.subRep1 = response.id_report;
          rowData.details = this.transformToJSON(data, columns);
          if (this.operator) {
            this.detailsCols.unshift('Name');
            console.log(this.detailsCols);
            this.chartService.getOperatorsDest().subscribe((destinations) => {
              rowData.details.forEach((detail: any) => {
                const destination = destinations.find(
                  (dest: { id: any }) =>
                    dest.id === parseFloat(detail[this.detailsCols[1]])
                );

                if (destination) {
                  // Add "Name" property to each item in rowData.details
                  detail['Name'] = destination.nomDestination;
                  // Add "Name" to the beginning of detailsCols if not already present
                  if (!this.detailsCols.includes('Name')) {
                    this.detailsCols.unshift('Name');
                    detail[this.detailsCols[1]] = parseFloat(
                      detail[this.detailsCols[1]]
                        .toString()
                        .replace(/\s/g, '') // Remove spaces
                        .replace(/\.00$/, '')
                    );
                  }
                }
              });
            });
          } else if (this.iscarrier) {
            this.detailsCols.unshift('Name');
            this.chartService
              .getOperatorsInterco()
              .subscribe((destinations) => {
                rowData.details.forEach((detail: any) => {
                  const destination = destinations.find(
                    (dest: { id: any }) =>
                      dest.id ===
                      parseFloat(
                        detail[this.detailsCols[0]]
                          .toString()
                          .replace(/\s/g, '') // Remove spaces
                          .replace(/\.00$/, '')
                      )
                  );
                  if (destination) {
                    // Add "Name" property to each item in rowData.details
                    detail['Name'] = destination.nomDestination;
                    // Add "Name" to the beginning of detailsCols if not already present
                    if (!this.detailsCols.includes('Name')) {
                      this.detailsCols.unshift('Name');
                      detail[this.detailsCols[1]] = parseFloat(
                        detail[this.detailsCols[1]]
                          .toString()
                          .replace(/\s/g, '') // Remove spaces
                          .replace(/\.00$/, '')
                      );
                    }
                  }
                });
              });
          }
        });
    }
  }

  isRowExpanded(row: any): boolean {
    return this.expandedRows.has(row[0]);
  }

  transformToJSON(data: any[], columns: string[]): any[] {
    const jsonData = data.map((row) => {
      const obj: { [key: string]: any } = {};
      columns.forEach((column, index) => {
        obj[column] = this.formatNumber(row[index]);
      });
      return obj;
    });
    return jsonData;
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
      this.detailsTable.filterGlobal(filterValue, 'contains');
    }
  }

  saveAsXLSX(data: any) {
    this.exporting = true;
    this.exportProgress = 0;

    console.log(data);
  }

  saveAs(blob: Blob | MediaSource, filename: string) {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    // Revoke the object URL after the download
    URL.revokeObjectURL(url);
  }

  exportExcel(data: any) {
    import('xlsx').then((xlsx) => {
      const worksheet = xlsx.utils.json_to_sheet(data);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, {
        bookType: 'xlsx',
        type: 'array',
      });
      this.saveAsExcelFile(excelBuffer, this.detailsTitle);
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

  onRowSelect(event: any) {
    this.openDialog(event.data);
  }

  openDialog(row: any): void {
    console.log(row);
    if (this.title === 'LCR Alert') {
      const dialogRef = this.dialog.open(CommentFormComponent, {
        width: '400px', // Adjust the width as needed
        data: { data: row }, // You can pass data to the dialog if needed
      });

      dialogRef.afterClosed().subscribe((comment: string) => {
        // this.commentAdded.emit();
        // let func1 =new FunctionChartsComponent(this.chartService,this.route,this.router,this.filterService,this.dialog,this.userService,this.service,this.toastr,this.loaderService,this.functionService,this.changeDetectorRef)
        // func1.ngOnInit()
      });
    }
    // Fetch data from the API
    else {
      this.showProgressBar = true;
      if (this.filter === undefined) {
        const today = new Date();
        const datePreviousMonth = new Date(today);
        datePreviousMonth.setMonth(today.getMonth() - 1);

        this.startDate = this.formatDate(datePreviousMonth);
        this.endDate = this.formatDate(today);
        //console.log(this.filter);
      } else {
        this.startDate = this.filter.startDate;
        this.endDate = this.filter.endDate;
      }
      if (this.operator || this.iscarrier) {
        this.subRepId = parseFloat(
          row[this.detailsCols[1]]
            .toString()
            .replace(/\s/g, '') // Remove spaces
            .replace(/\.00$/, '')
        );
      } else {
        this.subRepId = row[this.detailsCols[0]];
      }
      console.log(this.subRepId);
      this.chartService
        .getDetails(this.subRep1, this.subRepId, this.startDate, this.endDate)
        .pipe(finalize(() => (this.showProgressBar = false)))
        .subscribe((response) => {
          console.log(response);
          const columns = response.listnamereptab;
          const data = response.list_de_donnees.map((d: any) => {
            let obj: { [key: string]: any } = {};
            d.forEach((cell: any, index: any) => {
              obj[columns[index]] = cell;
            });
            return obj;
          });

          this.replaceWithOperatorName(
            columns,
            data,
            response.operator,
            response.iscarrier
          );

          this.dialog.open(TableDialogComponent, {
            data: {
              columns,
              rows: data,
              title: response.title,
            },
          });
        });
    }
  }

  replaceWithOperatorName(
    cols: any,
    data: any,
    operator: boolean,
    carrier: boolean
  ): void {
    if (operator) {
      cols.unshift('Name');
      console.log(cols);
      this.chartService.getOperatorsDest().subscribe((destinations) => {
        data.forEach((detail: any) => {
          const destination = destinations.find(
            (dest: { id: any }) => dest.id === parseFloat(detail[cols[1]])
          );

          if (destination) {
            detail['Name'] = destination.nomDestination;
            if (!cols.includes('Name')) {
              cols.unshift('Name');
              detail[cols[1]] = parseFloat(
                detail[cols[1]]
                  .toString()
                  .replace(/\s/g, '') // Remove spaces
                  .replace(/\.00$/, '')
              );
            }
          }
        });
      });
    } else if (carrier) {
      cols.unshift('Name');
      this.chartService.getOperatorsInterco().subscribe((destinations) => {
        data.forEach((detail: any) => {
          const destination = destinations.find(
            (dest: { id: any }) =>
              dest.id ===
              parseFloat(
                detail[cols[1]]
                  .toString()
                  .replace(/\s/g, '') // Remove spaces
                  .replace(/\.00$/, '')
              )
          );
          if (destination) {
            // Add "Name" property to each item in rowData.details
            detail['Name'] = destination.operateur;
            // Add "Name" to the beginning of detailsCols if not already present
            if (!cols.includes('Name')) {
              cols.unshift('Name');
              detail[cols[1]] = parseFloat(
                detail[cols[1]]
                  .toString()
                  .replace(/\s/g, '') // Remove spaces
                  .replace(/\.00$/, '')
              );
            }
          }
        });
      });
    }
  }
}
