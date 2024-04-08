import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Inject,
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
import { DOCUMENT, DatePipe } from '@angular/common';
import { DataUpdateService } from 'src/app/services/data-update.service';
import { DarkModeService } from '../../services/dark-mode.service';
import { ThemeService } from '../../services/theme.service';
import { DialogService } from 'primeng/dynamicdialog';
import { CurrencyService } from '../../services/currency.service';

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
  @Input() collect: boolean = false;
  @Input() dataChanged: boolean = false;
  @Input() hasDetails: boolean = false;
  @Input() currencies: any;

  dataSource: MatTableDataSource<any>;
  selectedRow: any;
  searchActive: boolean = false;
  filtredSubscription!: Subscription;

  parentRow: any;

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

  private subscriptionDarkMode: Subscription = new Subscription();
  darkModeEnabled!: boolean;

  operatorsList: any;
  selectedCurrency: any;
  conversionRates: any;

  originalCurrencyValues: any;
  originalCurrency: any;

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
    private dataUpdateService: DataUpdateService,
    private darkModeService: DarkModeService,
    private themeService: ThemeService,
    public dialogService: DialogService,
    public currencyService: CurrencyService,
    @Inject(DOCUMENT) private document: Document,
    private datePipe: DatePipe
  ) {
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

  checkColumnTypes(column: string): string {
    if (
      this.jsonData &&
      this.jsonData.length > 0 &&
      this.jsonData[0][column] !== undefined
    ) {
      return typeof this.jsonData[0][column] === 'number' ? 'numeric' : 'text';
    }
    return 'text'; // Default to text if unsure
  }

  switchTheme(theme: string) {
    let themeLink = this.document.getElementById(
      'app-theme'
    ) as HTMLLinkElement;
    if (themeLink) {
      themeLink.href = 'assets/css/' + theme + '.css';
    }
  }

  ngOnDestroy(): void {
    this.filter = null;
    this.filterService.clearFilters();
  }

  ngOnInit(): void {
    //console.log(this.data);
    this.selectedCurrency = {
      id: 4,
      code_monnai: 'LYD',
      monnai: 'Libyan Dinar',
    };
    this.originalCurrency = { ...this.selectedCurrency };

    //////console.log(this.operator);
    if (this.title === ' Voice Call Rating Alert') {
      this.hasDetails = true;
    }
    // Fetch operators' data asynchronously
    //////console.log(this.operator);
    this.chartService.getOperatorsInterco().subscribe((operatorsList) => {
      this.operatorsList = operatorsList;
      // Process each row of data
      this.jsonData = this.data.map((row: any[]) => {
        const obj: { [key: string]: any } = {};
        this.columns.forEach((column, index) => {
          obj[column] = row[index];
        });
        return obj;
      });

      // Modify jsonData only if iscarrier is true
      if (this.iscarrier) {
        // Add 'Name' to columns in the second position
        this.columns.splice(1, 0, 'Name');
        // Add 'Name' field to jsonData
        this.jsonData = this.jsonData.map((rowData) => {
          const operatorId = parseInt(rowData[this.columns[0]], 10);
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

  formatNumber(value: any): number {
    if (!this.collect) {
      if (typeof value === 'number') {
        // Use toFixed to always display 4 values after the decimal point
        const formattedValue = value.toFixed(4);

        return parseFloat(formattedValue);
      }
      return value;
    }
    return value;
  }

  openDialog(row: any): void {
    if (this.title === 'LCR Alert') {
      //console.log(row);
      const dialogRef = this.dialog.open(CommentFormComponent, {
        width: '400px',
        data: { data: row },
      });

      dialogRef.afterClosed().subscribe((comment: string) => {
        dialogRef.close();
      });
    } else if (this.collect) {
      //console.log(row);
      const idFlow = row.name_flow === 'Interco' ? 6063 : 3390;
      const columns: any[] = [
        'filename',
        'date_reception',
        'statut',
        'id_rep',
        'id_rep_fils',
        'nb_record',
      ];
      this.chartService
        .getCollectDetails(row.name_rep, idFlow, row.date, row.switch)
        .subscribe((response) => {
          const ref = this.dialogService.open(TableDialogComponent, {
            header: `${row.name_flow + ' Details'}`,
            width: '70%',
            modal: true,
            maximizable: true,
            resizable: true,
            dismissableMask: true,
            data: {
              columns,
              rows: response,
              title: `${row.name_flow + ' Details'}`,
              isoperator: false,
              iscarrier: false,
            },
          });

          ref.onClose.subscribe((data) => {
            // Handle the data received from the dialog
          });
        });
    } else if (this.title === ' Voice Call Rating Alert') {
      ////console.log(row);
      ////console.log(this.convertDate(row.begin_date));

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
          const ref = this.dialogService.open(TableDialogComponent, {
            header: `${response.title}`,
            width: '70%',
            modal: true,
            maximizable: true,
            resizable: true,
            dismissableMask: true,
            data: {
              columns,
              rows: this.convertToArrayOfObjects(response, columns),
              title: response.title,
              isoperator: response.operator,
              iscarrier: response.iscarrier,
              parentRow: this.parentRow,
              hasdetails: response.hasdetails,
            },
          });

          ref.onClose.subscribe((data) => {
            // Handle the data received from the dialog
          });
        });
    } else if (
      this.title.includes('Rate vs. Cost Reconciliation by Destination')
    ) {
      //console.log(row);
      const columns = [
        'callingnumber',
        'callednumber',
        'networkcallreference',
        'type_call',
        'mscincomingroute',
        'mscoutgoingroute',
        'answertime',
        'callduration',
        'tarif_class',
        'subscription_type',
        'country_name',
        'operator_name',
        'rate',
        'amount',
        'rate_litc',
        'amount_litc',
        'rating_method_madar',
        'rating_method',
        'id_outgoing_operator',
        'id_incoming_operator',
      ];

      this.chartService
        .marginDetails(
          row.Country,
          row.begindate?.replace(/-/g, ''),
          row.enddate?.replace(/-/g, '')
        )
        .pipe(
          catchError((error) => {
            this.showProgressBar = false; // Hide the progress bar
            this.toastr.error('An error occurred while fetching details.');
            return throwError(error); // Rethrow the error to keep it propagating
          })
        )
        .subscribe((response) => {
          const ref = this.dialogService.open(TableDialogComponent, {
            header: 'CDR Details',
            width: '70%',
            modal: true,
            maximizable: true,
            resizable: true,
            dismissableMask: true,
            data: {
              columns,
              rows: this.convertToArrayOfObjects(response, columns),
              title: response.title,
              isoperator: response.operator,
              iscarrier: response.iscarrier,
              parentRow: this.parentRow,
              hasdetails: response.hasdetails,
            },
          });

          ref.onClose.subscribe((data) => {
            // Handle the data received from the dialog
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
        //////console.log(this.filter);
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
          let columns: any;
          if (response.listnamereptab.length == 1) {
            columns = [...response.listnamereptab, ...response.listnamerep];
          } else {
            columns = response.listnamereptab;
          }
          console.log(columns);
          let data = response.list_de_donnees.map((d: any) => {
            let obj: { [key: string]: any } = {};

            d.forEach((cell: any, index: any) => {
              obj[columns[index]] = cell;
            });

            if (response.iscarrier) {
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
                    ////console.log(obj);
                  }
                });
            }
            return obj;
          });

          this.parentRow = {
            [this.columns[0].toUpperCase()]: row[this.columns[0]],
          };

          const ref = this.dialogService.open(TableDialogComponent, {
            header: `${response.title}`,
            width: '70%',
            modal: true,
            maximizable: true,
            resizable: true,
            dismissableMask: true,
            data: {
              columns,
              rows: data,
              title: response.title,
              isoperator: response.operator,
              iscarrier: this.iscarrier,
              parentRow: this.parentRow,
              hasdetails: response.hasdetails,
              report: response,
            },
          });

          ref.onClose.subscribe((data) => {
            // Handle the data received from the dialog
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

  convertDateFormat(begindate: string): string {
    // Parse the input string to a Date object
    const dateParts = begindate.split('-');
    // Assuming the year part is already in the correct format ('yy'), no addition is necessary.
    // Adjust the month index by subtracting 1 as JavaScript months are 0-indexed.
    const date = new Date(
      parseInt(dateParts[2], 10), // Directly use the year part without adding 2000
      parseInt(dateParts[1], 10) - 1, // Adjust month
      parseInt(dateParts[0], 10) // Use day as is
    );

    // Use DatePipe to transform the Date object to the desired format 'yyMMdd'
    const formattedDate = this.datePipe.transform(date, 'yyMMdd');

    return formattedDate || '';
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

  checkColumnType(columnName: string): string {
    const lowerCaseColumnName = columnName.toLowerCase();
    if (
      lowerCaseColumnName.includes('revenue') ||
      lowerCaseColumnName.includes('charge')
    ) {
      return 'currency';
    } else if (lowerCaseColumnName === 'status') {
      return 'status';
    } else {
      return 'default';
    }
  }

  onCurrencyChange(newCurrency: string, column: string) {
    const previousCurrency = { ...this.selectedCurrency };

    this.selectedCurrency = newCurrency;
    this.convertCurrencyValues(column, newCurrency);
    this.originalCurrency = { ...previousCurrency };
  }

  convertCurrencyValues(column: string, newCurrency: any) {
    ////console.log(this.selectedCurrency);

    // Iterate through the jsonData and update the currency values
    this.jsonData.forEach((row, index) => {
      ////console.log(row[column]);
      this.currencyService
        .convertCurrencyLocal(
          this.originalCurrency.id,
          newCurrency.id,
          row[column]
        )
        .subscribe((resp: any) => {
          if (resp) {
            // Update the jsonData and the specific row
            this.jsonData[index][column] = parseFloat(resp);

            // You may need to update the corresponding row in the table directly, if it doesn't update automatically
            if (this.dataTable && this.dataTable.filteredValue) {
              const rowIndex = this.dataTable.filteredValue.indexOf(row);
              if (rowIndex !== -1) {
                this.dataTable.filteredValue[rowIndex][column] = parseFloat(
                  resp.results[this.selectedCurrency.code_monnai]
                );
              }
            }
          }
        });
    });
  }

  setupCurrencyOptions() {
    this.currencies = this.currencies.map((currency: any) => {
      return { label: currency.name, value: currency.code };
    });

    // Set default currency
    const defaultCurrency = this.currencies.find((c: any) => c.value === 'LYD');
    if (defaultCurrency) {
      this.selectedCurrency = defaultCurrency.value;
    }
  }

  get isNameColumnPresentLVL4(): boolean {
    return this.columns.includes('Name');
  }
}
