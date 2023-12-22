import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { TableDialogComponent } from '../table-dialog/table-dialog.component';
import { ChartService } from 'src/app/services/chart.service';
import { MatSort } from '@angular/material/sort';
import { CommentFormComponent } from '../comment-form/comment-form.component';
import { FunctionChartsComponent } from '../function-charts/function-charts.component';
import { ActivatedRoute, Router } from '@angular/router';
import { FilterService } from 'src/app/services/filter.service';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { LoaderService } from 'src/app/services/loader.service';
import { FunctionService } from 'src/app/services/function.service';
import { CommentService } from 'src/app/services/comment.service';
import { Table } from 'primeng/table';
import { ProgressSpinner } from 'primeng/progressspinner';
import { catchError } from 'rxjs/operators';
import { Subscription, throwError } from 'rxjs';
import { DatePipe } from '@angular/common';
import { DataUpdateService } from 'src/app/services/data-update.service';

@Component({
  selector: 'app-paginated-table',
  templateUrl: './paginated-table.component.html',
  styleUrls: ['./paginated-table.component.css'],
})
export class PaginatedTableComponent
  implements AfterViewInit, OnInit, OnDestroy
{
  @Input() columns: string[] = [];
  @Input() data: any;
  @Input() idrep: any[] = [];
  @Input() title!: String;
  @Input() filter: any;
  @Input() iscarrier: any;
  @Input() operator: any;
  @Input() collect!: boolean;
  @Input() dataChanged: boolean = false;
  dataSource: MatTableDataSource<any>;
  selectedRow: any;
  searchActive: boolean = false;
  filtredSubscription!: Subscription;

  @ViewChild('searchInput') searchInput!: ElementRef;

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
  @ViewChild('dt2') dataTable!: Table;

  jsonData!: any[];
  showProgressBar: boolean = false;

  startDate: any;
  endDate: any;
  id: any;

  subscription!: Subscription;

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
    private dataUpdateService: DataUpdateService
  ) {
    this.dataSource = new MatTableDataSource();
  }
  ngOnDestroy(): void {
    this.filter = null;
    this.filterService.clearFilters();
  }

  ngOnInit(): void {
    console.log(this.operator);
    // Fetch operators' data asynchronously
    //console.log(this.operator);
    this.chartService.getOperatorsInterco().subscribe((operatorsList) => {
      // Process each row of data
      this.jsonData = this.data.map((row: any[]) => {
        const obj: { [key: string]: any } = {};
        this.columns.forEach((column, index) => {
          obj[column] = row[index];
        });
        return obj;
      });

      // Modify jsonData only if iscarrier is true
      if (this.operator) {
        // Add 'Name' to columns in the second position
        this.columns.splice(1, 0, 'Name');
        // Add 'Name' field to jsonData
        this.jsonData = this.jsonData.map((rowData) => {
          const operatorId = parseInt(rowData.Operator, 10);
          const operator = operatorsList.find(
            (op: { id: number }) => op.id === operatorId
          );
          const operatorName = operator ? operator.operateur : 'Unknown';
          // Insert 'Name' after 'Operator'
          const newData = { ...rowData, Name: operatorName };
          return newData;
        });
      }
      // Sort and filter the jsonData
      this.jsonData = this.jsonData.slice(); // Create a new array reference to trigger re-rendering
      // Define the default sorting
      this.jsonData.sort((a, b) => {
        // Implement your custom sorting logic here
        return 0; // Specify initial sorting logic
      });
    });
    console.log(this.jsonData);
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
    if (!this.collect) {
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
    }
    return value;
  }

  openDialog(row: any): void {
    if (this.title === 'LCR Alert') {
      const dialogRef = this.dialog.open(CommentFormComponent, {
        width: '400px',
        data: { data: row },
      });

      dialogRef.afterClosed().subscribe((comment: string) => {
        dialogRef.close();
      });
    } else if (this.title === ' Voice Call Rating Alert') {
      console.log(row);
      console.log(this.convertDate(row.begin_date));
      const columns = [
        'plan_tarifaire',
        'calling_number',
        'called_number',
        'dest',
        'total_charge',
        'commercial_tarif',
        'applied_tarif',
        'call_duration',
        'charge_duration',
        'event_time',
        'bearing_count',
      ];

      this.chartService
        .customDetails(
          row.tariffplan,
          row.destination,
          row.com_tariff,
          row.tariff_call,
          this.convertDate(row.begin_date),
          this.convertDate(row.end_date)
        )
        .pipe(
          catchError((error) => {
            this.showProgressBar = false; // Hide the progress bar
            this.toastr.error('An error occurred while fetching details.');
            return throwError(error); // Rethrow the error to keep it propagating
          })
        )
        .subscribe((response) => {
          console.log(response);
          this.dialog.open(TableDialogComponent, {
            data: {
              columns,
              rows: this.convertToArrayOfObjects(response, columns),
              title: this.title,
              isoperator: false,
              iscarrier: false,
            },
          });
        });
    } else {
      this.showProgressBar = true; // Show the progress bar
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

      this.chartService
        .getDetails(
          this.idrep,
          row[this.columns[0]],
          this.startDate,
          this.endDate
        )
        .pipe(
          catchError((error) => {
            this.showProgressBar = false; // Hide the progress bar
            this.toastr.error('An error occurred while fetching details.');
            return throwError(error); // Rethrow the error to keep it propagating
          })
        )
        .subscribe((response) => {
          console.log(response);
          const columns = response.listnamereptab;
          const data = response.list_de_donnees.map((d: any) => {
            let obj: { [key: string]: any } = {};

            d.forEach((cell: any, index: any) => {
              obj[columns[index]] = cell;
            });
            if (this.iscarrier) {
              this.chartService
                .getOperatorsInterco()
                .subscribe((destinations) => {
                  const firstKey = Object.keys(obj)[0];
                  const firstValue = obj[firstKey];
                  const destination = destinations.find(
                    (dest: { id: any }) => dest.id === firstValue
                  );

                  if (destination) {
                    obj[firstKey] = destination.operateur;
                    console.log(obj);
                  }
                });
            }
            return obj;
          });

          this.dialog.open(TableDialogComponent, {
            data: {
              columns,
              rows: data,
              title: this.title,
              isoperator: response.operator,
              iscarrier: this.iscarrier,
            },
          });

          this.showProgressBar = false; // Hide the progress bar when data is loaded
        });
    }
    this.filterService.clearFilters();
  }
  convertToArrayOfObjects(data: any[], columns: string[]): any[] {
    return data.map((row) => {
      let obj: { [key: string]: any } = {}; // Explicitly define obj type
      columns.forEach((col, index) => {
        obj[col] = row[index];
      });
      return obj;
    });
  }
  convertDate(dateStr: string) {
    const parts = dateStr.split('/');

    // Extract day, month, and year
    const day = parts[0];
    const month = parts[1];
    const year = '20' + parts[2]; // Assuming all years are 2000s

    // Format to yyyy-mm-dd
    return `${year}-${month}-${day}`;
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

  onRowSelect(event: any) {
    this.openDialog(event.data);
  }

  formatDate(date: Date): string {
    const year = date.getFullYear().toString().slice(-2); // Get the last two digits of the year
    const month = ('0' + (date.getMonth() + 1)).slice(-2); // Add 1 to the month because it's 0-indexed
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }
}
