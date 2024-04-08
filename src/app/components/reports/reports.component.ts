import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChildren,
  ChangeDetectorRef,
  HostListener,
  NgZone,
  Input,
} from '@angular/core';
//import * as Highcharts from 'highcharts';
import * as Highcharts from 'highcharts/highstock';
import Accessibility from 'highcharts/modules/accessibility';
import ExportingModule from 'highcharts/modules/exporting';
import type { SeriesOptionsType } from 'highcharts';
import { AuthService } from 'src/app/services/auth.service';
import { ChartService } from 'src/app/services/chart.service';
import { User } from 'src/model/User';
import { ActivatedRoute, Router } from '@angular/router';
import { FilterService } from 'src/app/services/filter.service';
import { Filters } from 'src/model/Filters';
import { FilterType } from 'src/model/FilterType';
import HC_exportData from 'highcharts/modules/export-data';
import OfflineEXporting from 'highcharts/modules/offline-exporting';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { TableDialogComponent } from '../table-dialog/table-dialog.component';
import { UserService } from 'src/app/services/user.service';
import { ToastrService } from 'ngx-toastr';
import { HIGHCHARTS_TYPES } from 'src/model/HIGHCHARTS_TYPES';
import { LoaderService } from 'src/app/services/loader.service';
import { FunctionService } from 'src/app/services/function.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { OrderFunctionComponent } from '../order-function/order-function.component';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Chart, SeriesAbandsOptions, SeriesPieOptions } from 'highcharts';
import { DataUpdateService } from '../../services/data-update.service';

import { ViewChild } from '@angular/core';
import { data } from 'jquery';
import {
  Observable,
  Subject,
  Subscription,
  catchError,
  combineLatest,
  concatMap,
  forkJoin,
  from,
  interval,
  map,
  merge,
  of,
  switchMap,
  takeUntil,
  toArray,
} from 'rxjs';
import { MatSelectChange } from '@angular/material/select';
import { HighchartsChartComponent } from 'highcharts-angular';
import { PaginatedTableComponent } from '../paginated-table/paginated-table.component';
import { CommentService } from 'src/app/services/comment.service';
import { MenuItem, Message } from 'primeng/api';
import IndicatorsAll from 'highcharts/indicators/indicators-all';
import HDragPanes from 'highcharts/modules/drag-panes';
import HAnnotationsAdvanced from 'highcharts/modules/annotations-advanced';
import HPriceIndicator from 'highcharts/modules/price-indicator';
import HFullScreen from 'highcharts/modules/full-screen';
import HStockTools from 'highcharts/modules/stock-tools';
import IndicatorsCore from 'highcharts/indicators/indicators';
import TrendLine from 'highcharts/indicators/trendLine';
import Regressions from 'highcharts/indicators/regressions';
import ExportData from 'highcharts/modules/export-data';
import { DarkModeService } from '../../services/dark-mode.service';
import DarkTheme from 'highcharts/themes/dark-unica';
import DefaultTheme from 'highcharts/themes/grid-light';
import { DialogService } from 'primeng/dynamicdialog';
import { PlaylistComponent } from '../playlist/playlist.component';
import { CurrencyService } from 'src/app/services/currency.service';
import { DatePipe } from '@angular/common';
import { filter } from 'd3';
import { colorSets } from '@swimlane/ngx-charts';

Accessibility(Highcharts);
ExportingModule(Highcharts);
//HC_exportData(Highcharts);
//IndicatorsAll(Highcharts);
OfflineEXporting(Highcharts);
IndicatorsCore(Highcharts);
TrendLine(Highcharts);
//Regressions(Highcharts);
HDragPanes(Highcharts);
HAnnotationsAdvanced(Highcharts);
HPriceIndicator(Highcharts);
HFullScreen(Highcharts);
//ExportData(Highcharts);
HStockTools(Highcharts);
@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css'],
})
export class ReportsComponent implements OnInit, OnDestroy, AfterViewInit {
  newuser!: User;
  funcId: any;
  moduleName!: string;
  subModuleName!: string;
  functionName!: string;
  listeRep: any[] = [];
  reports: any[] = [];
  funcName: any;
  chartOptions: Highcharts.Options[] = [];
  subchartOptions: Highcharts.Options[] = [];
  isLoading: boolean[] = [];
  isChartDisplayed: boolean[] = [];
  private destroy$ = new Subject<void>();
  Highcharts = Highcharts;

  isTable: boolean = false;
  chartInstances: any[] = [];
  subChartInstances: any[] = [];
  highchartsTypes = HIGHCHARTS_TYPES;

  reportIds: {
    id: any;
    loading: boolean;
    error: string;
    report: any;
    constructorType: string;
    chartType: string;
    customFilter: boolean;
    subReport: [];
    showSubReport: boolean;
  }[] = [];

  subreportIds: {
    id: any;
    loading: boolean;
    error: string;
    report: any;
    constructorType: string;
    chartType: string;
    customFilter: boolean;
    subReport: [];
    showSubReport: boolean;
  }[] = [];

  filtred!: Filters;
  globalFilter!: Filters;

  messages1!: Message[];

  private filtredSubscription!: Subscription;

  private updateSubscription: Subscription | null = null;

  expandableReport: string[] = [
    'ASR by Incoming  Trunck',
    'ASR By Outgoing Trunck',
    'ASR by couple of trunks (incoming / outgoing)',
    'Inbound Traffic Distribution by Country by Operator',
    'Inbound Traffic Distribution by Country by Carrier',
    'global report By country by operator by carrier ( incoming)',
    'global report By country by operator by carrier ( outgoing )',
  ];

  liveUpdateActive: boolean = false;
  items!: MenuItem[];
  items1!: MenuItem[];
  playListIds: any[] = [];

  private subscriptionDarkMode: Subscription = new Subscription();
  darkModeEnabled!: boolean;

  showButton = false; // Flag to control button visibility
  selectedPlaylists: any[] = []; // Array to store selected playlists
  allPlaylists: any[] = [];

  itemssplit!: MenuItem[];
  reportGroup: any;
  selectedId: any;

  diffRepIDs = [2905, 2910];

  constructor(
    private dataUpdateService: DataUpdateService,
    private chartService: ChartService,
    private route: ActivatedRoute,
    private router: Router,
    public filterService: FilterService,
    public dialog: MatDialog,
    private userService: UserService,
    private service: AuthService,
    private toastr: ToastrService,
    private loaderService: LoaderService,
    private functionService: FunctionService,
    private changeDetectorRef: ChangeDetectorRef,
    private commentService: CommentService,
    private ngZone: NgZone,
    private darkModeService: DarkModeService,
    public dialogService: DialogService,
    public currencyService: CurrencyService,
    private datePipe: DatePipe
  ) {}
  ngAfterViewInit(): void {
    this.subscriptionDarkMode = this.darkModeService.darkModeState.subscribe(
      (isDarkMode) => {
        this.darkModeEnabled = isDarkMode;
        this.applyChartTheme();
        //this.updateAllCharts();
        //this.ngOnInit();
      }
    );
  }

  handleSpeedDialClick(report: any) {
    console.log(report);
    this.reportGroup = report;
  }

  currencies: any[] = [];

  currentDateStr!: any;
  oneMonthEarlierStr!: any;

  ngOnInit(): void {
    const currentDate = new Date();
    const oneMonthEarlier = new Date();
    oneMonthEarlier.setMonth(currentDate.getMonth() - 1);

    this.currentDateStr = this.datePipe.transform(currentDate, 'yy-MM-dd');
    this.oneMonthEarlierStr = this.datePipe.transform(
      oneMonthEarlier,
      'yy-MM-dd'
    );

    this.currencyService.getAllCurrenciesLocal().subscribe((resp: any) => {
      this.currencies = resp;
    });

    this.itemssplit = [
      {
        tooltipOptions: {
          tooltipLabel: 'Export XLSX',
          tooltipPosition: 'top',
        },
        icon: 'pi pi-file-excel',
        iconStyle: { 'background-color': 'white' },
        command: () => {
          this.exportXLSX(
            this.reportGroup.report[0].list_de_donnees,
            this.reportGroup.report[0].listnamereptab,
            this.reportGroup.report[0].title
          );
        },
      },
      {
        tooltipOptions: {
          tooltipLabel: 'Add To Dashboard',
          tooltipPosition: 'top',
        },
        icon: 'pi pi-home',
        command: () => {
          this.addToDashboard(this.reportGroup.id);
        },
      },
      {
        tooltipOptions: {
          tooltipLabel: 'Add To PlayList',
          tooltipPosition: 'top',
        },
        icon: 'pi pi-star-fill',
        command: () => {
          this.onAddToPlaylistClick();
        },
      },
    ];
    this.route.params.subscribe((params) => {
      this.moduleName = params['moduleName'];
      this.subModuleName = params['subModuleName'];
      this.functionName = params['functionName'];
      this.funcId = params['id'];
      this.loadData();
    });
    if (this.filtredSubscription) {
      this.filtredSubscription.unsubscribe();
    }
    this.filtredSubscription = this.filterService
      .getFiltersUpdatedObservable()
      .subscribe((filterData: Filters) => {
        if (
          filterData.idfunction != this.funcId &&
          filterData.startDate != null &&
          filterData.endDate != null
        ) {
          filterData.idfunction = this.funcId;

          this.globalFilter = filterData;
          //console.log('Received updated filters:', this.globalFilter);
          if (this.globalFilter.isVaration) {
            this.chartService
              .getFunctionChartVariation(this.globalFilter)
              .subscribe((resp) => {
                this.updateReportsAfterFilter(resp);
              });
          } else if (this.globalFilter.isPerHour) {
            this.chartService
              .getFunctionChartFiltredPerHour(this.globalFilter)
              .subscribe((resp) => {
                this.updateReportsAfterFilter(resp);
              });
          } else {
            this.chartService
              .getFunctionChartFiltred(this.globalFilter)
              .subscribe((resp) => {
                this.loaderService.show();
                this.updateReportsAfterFilter(resp);
                this.loaderService.hide();
              });
          }
        }
      });

    //this.filterService.clearFilters();
    //this.globalFilter.idfunction = 0;
    //this.startLiveUpdate();
    this.changeDetectorRef.detectChanges();
  }

  toggleLiveUpdate() {
    this.liveUpdateActive = !this.liveUpdateActive;

    if (this.liveUpdateActive) {
      this.startLiveUpdate();
    } else if (this.updateSubscription) {
      this.updateSubscription.unsubscribe();
      this.updateSubscription = null; // Reset it to null if needed
    }
  }

  private loadData(): void {
    // Unsubscribe from previous subscriptions
    this.destroy$.next();
    this.destroy$.complete();

    // Initialize for new subscriptions
    this.destroy$ = new Subject<void>();

    // Clear existing data
    this.listeRep = [];
    this.reportIds = [];
    this.reports = [];
    this.chartOptions = [];

    this.chartService
      .getRepByFunctionId(this.funcId)
      .subscribe((response: any) => {
        this.listeRep = response;
        this.loadReports(this.listeRep, false);
      });
  }

  private loadReports(listeRep: any[], isRefresh: boolean): void {
    if (!isRefresh) {
      this.reportIds = listeRep.map((item) => ({
        id: item,
        loading: true,
        report: null,
        error: '',
        constructorType: '',
        chartType: '',
        customFilter: false,
        subReport: [],
        showSubReport: false,
      }));

      const reportObservables: Observable<any>[] = this.reportIds.map((item) =>
        //this.chartService.getChartWithDateFilter(this.oneMonthEarlierStr,this.currentDateStr,item.id)
        this.chartService.getRepById(item.id).pipe(
          catchError((error) => {
            item.error = 'Error Fetching report: ' + item.id;
            return of(null);
          })
        )
      );

      merge(...reportObservables)
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          (report) => {
            const index = this.reportIds.findIndex(
              (item) => item.id === report[0].id_report
            );
            if (index !== -1) {
              this.reportIds[index].report = report;
              this.reportIds[index].report[0].list_de_donnees =
                report[0].list_de_donnees;
              if (
                report &&
                report.length > 0 &&
                report[0].list_de_donnees.length > 0 &&
                this.reportIds[index].report[0].hasdate &&
                this.reportIds[index].report[0].title !==
                  ' Voice Call Rating Alert'
              ) {
                const startDate = report[0].list_de_donnees[0][0];
                const endDate = new Date().toISOString().split('T')[0];
                this.reportIds[index].report[0].list_de_donnees =
                  this.fillMissingDates(
                    report[0].list_de_donnees,
                    startDate,
                    endDate,
                    report[0].list_de_donnees.length
                  );
              } else if (
                report &&
                report.length > 0 &&
                !report[0].list_de_donnees?.length &&
                this.reportIds[index].report[0].hasdate &&
                this.reportIds[index].report[0].title !==
                  ' Voice Call Rating Alert'
              ) {
                const endDate = new Date().toISOString().split('T')[0];
                const startDate = new Date(
                  new Date().setDate(new Date().getDate() - 30)
                )
                  .toISOString()
                  .split('T')[0];

                this.reportIds[index].report[0].list_de_donnees =
                  this.fillMissingDates(
                    report[0].list_de_donnees,
                    startDate,
                    endDate,
                    report[0].listnamereptab.length
                  );
              } else if (
                this.reportIds[index].report &&
                this.reportIds[index].report[0].title
                  .toUpperCase()
                  .includes('TRUNCK')
              ) {
                this.reportIds[index].customFilter = true;
              } else if (
                report[0].listnamereptab &&
                report[0].listnamereptab.length > 0 &&
                report[0].listnamereptab[0].toLowerCase().includes('date') &&
                report[0].list_de_donnees.length > 0
              ) {
                const firstDatum = report[0].list_de_donnees[0][0];
                if (/^\d{6}$/.test(firstDatum)) {
                  report[0].list_de_donnees.forEach((datum: any[]) => {
                    datum[0] = this.parseCustomDateFormat(datum[0]);
                  });
                }
              }

              this.reportIds[index].chartType = report[0].chart_type;
              if (this.reportIds[index].chartType !== 'table') {
                this.chartOptions[index] = this.buildChart(
                  this.reportIds[index]
                );
              } else {
                this.chartOptions[index] = {};
              }
              this.reportIds[index].loading = false;
              this.isChartDisplayed[this.chartOptions.length - 1] = true;
              this.changeDetectorRef.detectChanges();
            }
          },
          (error) => {
            console.error('Error fetching reports', error);
          }
        );
      console.log(this.reportIds);
    }
  }

  generateSubReport(index: any, report: any) {
    console.log('report passed', report);
    if (this.diffRepIDs.includes(report.id_report)) {
      const reportCopy = JSON.parse(JSON.stringify(report));
      const sub = this.calculateDifferences(reportCopy);
      this.reportIds[index].subReport = sub;

      this.subchartOptions[index] = this.buildChartV2(this.reportIds[index]);
      console.log(this.reportIds[index]);
    }
  }

  calculateDifferences(data: any): any {
    const response: any[] = [];
    const differencesWithFirstColumn: any[][] = [];
    for (const entry of data.list_de_donnees) {
      const difference = Math.abs(entry[1] - entry[2]);
      differencesWithFirstColumn.push([entry[0], difference]);
    }
    data.list_de_donnees = differencesWithFirstColumn;
    data.listnamereptab = [data.listnamereptab[0], 'Difference'];
    data.listnamerep = ['Difference'];

    response.push(data);
    return response;
  }

  private fillMissingDates(
    data: any[],
    startDate: string,
    endDate: string,
    dataLength: any
  ): any[] {
    const filledData = [];
    const currentDate = new Date(startDate);
    const end = new Date(endDate);
    const leng = data.length > 0 && data[0] ? data[0].length : dataLength;

    while (currentDate <= end) {
      const dateString = currentDate.toISOString().split('T')[0];
      const existingData = data.find((d) => d[0] === dateString);

      if (existingData) {
        filledData.push(existingData);
      } else {
        const newData = [dateString, ...Array(leng - 1).fill(0)];
        filledData.push(newData);
      }

      currentDate.setDate(currentDate.getDate() + 1);
    }

    return filledData;
  }

  parseCustomDateFormat(dateString: any): any {
    // Assuming the format is YYMMDD
    const year = '20' + dateString.substring(0, 2);
    const month = dateString.substring(2, 4);
    const day = dateString.substring(4, 6);
    return `${year}-${month}-${day}`;
  }

  private buildChart(data: any): any {
    const chartData = data.report;

    let subtitleText = chartData[0].title + ': ';
    if (chartData[0].list_de_donnees.length === 1) {
      subtitleText += 'Date: ' + chartData[0].list_de_donnees[0][0];
    } else if (chartData[0].list_de_donnees.length >= 2) {
      subtitleText +=
        'Between ' +
        chartData[0].list_de_donnees[0][0] +
        ' and ' +
        chartData[0].list_de_donnees[
          chartData[0].list_de_donnees.length - 1
        ][0];
    }

    let hasDateData = false;
    // hasDateData = chartData[0].hasdate;
    hasDateData =
      chartData[0].listnamereptab &&
      chartData[0].listnamereptab.length > 0 &&
      chartData[0].listnamereptab[0].toLowerCase().includes('date');
    data.constructorType = hasDateData ? 'stockChart' : 'chart';

    if (chartData[0].listnamerep.length === 0) {
      chartData[0].listnamerep = chartData[0].listnamereptab.slice(1); // Remove the first item
    }

    // Calculate the date 90 days ago and 30 days ago from today
    const ninetyDaysAgo = new Date();
    ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90);
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    // Process data for charts
    const seriesData = hasDateData
      ? chartData[0].listnamerep.map((name: string, i: number) => ({
          id: `series-${i}`,
          name: name,
          data: chartData[0].list_de_donnees.map((datum: any) => [
            this.isMonthYearFormat(datum[0])
              ? this.parseDateToUTC(datum[0])
              : new Date(datum[0]).getTime(),

            chartData[0].listnamereptab[i + 1] === 'CallDuration(Minutes)'
              ? Math.round(datum[i + 1])
              : parseFloat(datum[i + 1]),
          ]),
        }))
      : chartData[0].listnamerep.slice(0).map((name: any, i: number) => ({
          id: `series-${i}`,
          name: name,
          data: chartData[0].list_de_donnees.map(
            (data: { toString: () => any }[]) => data[i + 1]
          ),
        }));

    // Process data for pie
    const isPieChart = data.chartType === 'pie';
    let pieData: any;

    if (isPieChart) {
      pieData = chartData[0].list_de_donnees.map((item: any) => {
        return {
          name: item[0], // Assuming the first value is the name
          y: item[1], // Assuming the second value is the data point
        };
      });
    }

    let chartOptions: Highcharts.Options;
    chartOptions = {
      colors: [
        '#058DC7',
        '#50B432',
        '#ED561B',
        '#DDDF00',
        '#24CBE5',
        '#64E572',
        '#FF9655',
        '#FFF263',
        '#6AF9C4',
      ],
      credits: {
        enabled: false,
      },
      chart: {
        type: data.chartType,
        height: '50%',
        animation: true,
        colorCount: 100,
        reflow: true,
        plotBorderWidth: 1,
        plotShadow: true,
        borderRadius: 10,
        style: {
          fontFamily: "'Open Sans', sans-serif",
        },
        zooming: {
          mouseWheel: {
            enabled: false,
          },
        },
      },
      responsive: {
        rules: [
          {
            condition: {
              maxWidth: 500,
            },
            chartOptions: {
              legend: {
                layout: 'horizontal',
                align: 'center',
                verticalAlign: 'bottom',
              },
            },
          },
        ],
      },
      xAxis: {
        type: hasDateData ? 'datetime' : 'category',
        gridLineWidth: 1,
        alignTicks: true,
        title: {
          text: chartData[0].listnamereptab[0],
        },
        labels: {
          style: {
            fontSize: '12px',
          },
        },
        categories: hasDateData
          ? null
          : chartData[0].list_de_donnees.map((datum: any[]) => datum[0]),
      },
      yAxis: {
        title: {
          text: 'Values',
        },
        gridLineWidth: 1,
        alignTicks: true,
      },
      legend: {
        enabled: true,
      },
      exporting: {
        enabled: true,
        fallbackToExportServer: false,
        libURL: 'assets/js/',
        chartOptions: {
          chart: {
            width: 1000,
            height: 800,
          },
        },
        buttons: {
          contextButton: {
            menuItems: [
              'viewFullscreen',
              'separator',
              'downloadPNG',
              'downloadPDF',
              'downloadSVG',
              'downloadCSV',
            ],
          },
        },
      },
      tooltip: hasDateData
        ? {
            backgroundColor: '#2b2b2b',
            style: {
              color: '#E0E0E3',
            },
            shared: true,
            useHTML: true,
            formatter: function () {
              if (!this.points) {
                return '';
              }
              if (typeof this.x !== 'number') {
                return 'Invalid date';
              }
              let tooltipHtml = `<b>${Highcharts.dateFormat(
                '%A, %b %e, %Y',
                this.x
              )}</b><br/>`;
              let values: Array<number> = [];
              this.points.forEach(function (point) {
                if (typeof point.y === 'number') {
                  values.push(point.y);
                  tooltipHtml += `<span style="color:${
                    point.color
                  }">\u25CF</span> ${
                    point.series.name
                  }: <b>${Highcharts.numberFormat(point.y, 2)}</b><br/>`;
                }
              });

              // Check if chartData[0].isdiff is true
              if (chartData[0].rapport.isdiff && values.length === 2) {
                const difference = Math.abs(values[0] - values[1]);
                const percentDifference = (difference / values[0]) * 100;
                tooltipHtml += `<span style="color:red">Difference: <b>${Highcharts.numberFormat(
                  difference,
                  2
                )}</b> (${Highcharts.numberFormat(
                  percentDifference,
                  2
                )}%)</span><br/>`;
              }
              return tooltipHtml;
            },

            xDateFormat: '%A, %b %e, %Y',
          }
        : {
            valueDecimals: 1,
            pointFormat: '{point.name}: <b>{point.y:.2f}</b>',
          },
      plotOptions: {
        pie: isPieChart
          ? {
              allowPointSelect: true,
              cursor: 'pointer',
              dataLabels: {
                enabled: true,
                distance: 20,
                format: '<b>{point.name}</b>: {point.percentage:.2f}%',
              },
              borderRadius: 10,
              showInLegend: true,
              slicedOffset: 20,
            }
          : {},
        series: !isPieChart
          ? {
              dataLabels: {
                enabled: true,
                format: '{point.y:.2f}',
              },
            }
          : {},
      },
      rangeSelector: hasDateData
        ? {
            buttons: [
              {
                type: 'week',
                count: 1,
                text: '1w',
              },
              {
                type: 'month',
                count: 1,
                text: '1m',
              },
              {
                type: 'all',
                text: 'All',
              },
            ],
            buttonTheme: {
              width: 60,
            },
            inputEnabled: true,
            inputPosition: {
              align: 'right',
              x: 0,
              y: 0,
            },
            buttonPosition: {
              align: 'left',
              x: 0,
              y: 0,
            },
            selected: 1,
          }
        : {},
      navigator: {
        enabled: hasDateData ? true : false,
      },
      scrollbar: {
        enabled: hasDateData ? true : false,
      },
      stockTools: {
        gui: {
          buttons: [
            'indicators',
            'separator',
            'simpleShapes',
            'flags',
            'verticalLabels',
            'measure',
            'separator',
            'zoomChange',
            'currentPriceIndicator',
            'fullScreen',
            'separator',
            'toggleAnnotations',
          ],
        },
      },
      series: isPieChart
        ? [
            {
              animation: {
                duration: 2000,
              },
              colorByPoint: true,
              data: pieData,
              type: 'pie',
            },
          ]
        : seriesData,
    };
    return chartOptions;
  }

  parseDateToUTC(dateStr: string): number {
    const parts = dateStr.split('/');
    const year = parseInt(parts[1], 10);
    const month = parseInt(parts[0], 10) - 1; // Month is 0-indexed in JavaScript Date
    const date = new Date(Date.UTC(year, month, 1)); // Use the first day of the month
    return date.getTime();
  }

  isMonthYearFormat(dateStr: string) {
    return /^\d{2}\/\d{4}$/.test(dateStr); // Regex for 'MM/YYYY' format
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
    this.filtredSubscription.unsubscribe();
    this.filterService.clearFilters();

    this.subscriptionDarkMode.unsubscribe();
  }

  getFunctionName() {
    console.log(this.funcId);
    this.functionService.getFunctionById(this.funcId).subscribe((f: any) => {
      this.funcName = f.functionName;
    });
  }

  containsTableChart(reportGroup: any[]): boolean {
    return reportGroup.some((report) => report.chart_type === 'table');
  }

  addToDashboard(id: any) {
    this.newuser = this.service.uuser;
    this.userService.addToDashboard(this.newuser.uId, id).subscribe(() => {
      this.toastr.success('Repport added successfully!', 'Success');
    });
  }

  exportXLSX(cols: any, rows: any, fileName: any) {
    console.log(cols);
    console.log(rows);
    rows = rows.filter((row: any) => row !== 'Name');

    const isRowsEmpty =
      rows.length === 0 || (rows.length === 1 && rows[0] === '');

    if (isRowsEmpty) {
      rows = [
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
    }
    const worksheetName = 'Sheet1';
    const worksheetData = cols.map((col: { [x: string]: any }, i: any) => {
      return rows.reduce(
        (
          rowObj: { [x: string]: any },
          rowName: string | number,
          j: string | number
        ) => {
          rowObj[rowName] = col[j];
          return rowObj;
        },
        {}
      );
    });
    const worksheetColumns = rows;

    const sheet = XLSX.utils.json_to_sheet(worksheetData, {
      header: worksheetColumns,
    }); // Create the sheet

    const headerCellStyle = {
      font: { bold: true },
      border: { bottom: { style: 'thin' } },
      fill: { type: 'pattern', pattern: 'solid', fgColor: { rgb: 'ECECEC' } },
    };

    const bodyCellStyle = {
      border: { bottom: { style: 'thin' } },
    };

    const sheetRange = XLSX.utils.decode_range(sheet['!ref'] || '');
    const { s: startCell, e: endCell } = sheetRange;

    for (let col = startCell.c; col <= endCell.c; col++) {
      const cellAddress = XLSX.utils.encode_cell({ r: startCell.r, c: col });
      const cell = sheet[cellAddress];
      if (cell && cell.t === 's' && cell.v) {
        cell.s = headerCellStyle; // Apply the style to the cell in the sheet
      }
    }

    // const columnWidths = cols.map(() => ({ width: 10 }));
    // console.log(columnWidths);
    // worksheetData.forEach((rowData: any) => {
    //   Object.keys(rowData).forEach((key, index) => {
    //     const value = rowData[key];
    //     const contentLength = value ? String(value).length : 0;
    //     if (contentLength > columnWidths[index].width) {
    //       columnWidths[index].width = contentLength;
    //     }
    //   });
    // });

    // columnWidths.forEach((width: any, index: any) => {
    //   const column = XLSX.utils.encode_col(index);
    //   sheet['!cols'] = sheet['!cols'] || [];
    //   sheet['!cols'].push({ wch: width.width });
    // });

    const range = `A1:${XLSX.utils.encode_col(worksheetColumns.length - 1)}${
      worksheetData.length + 1
    }`;
    sheet['!ref'] = range;

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, sheet, worksheetName); // Append the sheet to the workbook
    XLSX.writeFile(workbook, `${fileName}.xlsx`); // Save the workbook as an Excel file
  }

  // exportXLSX(cols: any, rows: any, fileName: any) {
  //   const worksheet: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet([cols, ...rows]);
  //   const workbook: XLSX.WorkBook = {
  //     Sheets: { data: worksheet },
  //     SheetNames: ['data'],
  //   };
  //   const excelBuffer: any = XLSX.write(workbook, {
  //     bookType: 'xlsx',
  //     type: 'array',
  //   });
  //   const dataBlob = new Blob([excelBuffer], {
  //     type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8',
  //   });
  //   saveAs(dataBlob, fileName + '.xlsx');
  // }

  updateChartType(chartIndex: number, event: MatSelectChange) {
    if (event.value === 'table') {
      this.isTable = true;
      this.reportIds[chartIndex].chartType = event.value;
      this.chartOptions[chartIndex] = {};
    } else {
      this.isTable = false;
      this.chartOptions[chartIndex] = this.buildChart(
        this.reportIds[chartIndex]
      );
    }
  }

  openOrderDiag(): void {
    const dialogRef = this.dialog.open(OrderFunctionComponent, {
      width: '350px',
      data: { funcId: this.funcId },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.ngOnInit();
    });
  }

  isChartOptionsEmpty(index: number): boolean {
    return (
      this.chartOptions[index] &&
      Object.keys(this.chartOptions[index]).length === 0
    );
  }

  loader: boolean = false;
  onFilterApplied(filterData: any, report: any, index: any) {
    // Handle filter data here
    this.currentDateStr = filterData.startDate;
    this.oneMonthEarlierStr = filterData.endDate;

    this.loader = true;
    if (filterData) {
      filterData.type_Filter = filterData.isPerHour
        ? FilterType.Custom
        : filterData.type_Filter;
      this.filtred = filterData;
      this.reportIds[index].loading = true;
      this.chartService
        .FilterChart(filterData, report.id_report)
        .subscribe((resp) => {
          //remove Name from listenamereptab
          if (
            this.reportIds[index].report &&
            this.reportIds[index].report[0].listnamereptab &&
            this.reportIds[index].report[0].listnamereptab.includes('Name')
          ) {
            this.reportIds[index].report[0].listnamereptab = this.reportIds[
              index
            ].report[0].listnamereptab.filter((item: any) => item !== 'Name');
          }
          //console.log(this.reportIds[index].report[0]);
          // Update the report data
          this.reportIds[index].report[0].list_de_donnees =
            resp.list_de_donnees;

          // Update the chart options
          if (this.reportIds[index].chartType !== 'table') {
            this.chartOptions[index] = this.buildChart(this.reportIds[index]);
            // Ensure the chart instance is available and responsive before updating
            const chartInstance = this.chartInstances[index];
            if (chartInstance && chartInstance.responsive) {
              chartInstance.update(this.chartOptions[index]);
            }
          } else {
            this.chartOptions[index] = {};
          }
          this.changeDetectorRef.detectChanges();
          this.reportIds[index].loading = false;
          this.loader = false;
        });
    }
  }

  private updateReportsAfterFilter(filteredData: any[]): void {
    // Iterate over the filtered data
    for (const filterResult of filteredData) {
      // Find the corresponding report in reportIds using id_report
      const index = this.reportIds.findIndex(
        (item) => item.id === filterResult.id_report
      );

      if (index !== -1) {
        this.reportIds[index].loading = true;
        // Update the list_de_donnees in the existing report
        if (this.reportIds[index].report[0].hasdate) {
          this.reportIds[index].report[0].list_de_donnees =
            filterResult.list_de_donnees.length > 0 &&
            this.isMonthYearFormat(filterResult.list_de_donnees[0][0])
              ? filterResult.list_de_donnees
              : this.fillMissingDatesFilter(
                  filterResult.list_de_donnees,
                  this.globalFilter.startDate,
                  this.globalFilter.endDate,

                  this.reportIds[index].report[0].listnamereptab.length
                );
        } else {
          this.reportIds[index].report[0].list_de_donnees =
            filterResult.list_de_donnees;
        }

        // Update the chart options
        if (this.reportIds[index].chartType !== 'table') {
          this.chartOptions[index] = this.buildChart(this.reportIds[index]);
          if (this.reportIds[index].showSubReport) {
            this.generateSubReport(index, this.reportIds[index].report[0]);
          }

          // Ensure the chart instance is available and responsive before updating
          const chartInstance = this.chartInstances[index];
          const subchartInstance = this.subChartInstances[index];
          if (chartInstance && chartInstance.responsive) {
            chartInstance.update(this.chartOptions[index]);
          }
          if (subchartInstance && subchartInstance.responsive) {
            subchartInstance.update(this.subChartInstances[index]);
          }

          console.log(this.reportIds[index]);
        } else {
          this.chartOptions[index] = {};
        }
        this.changeDetectorRef.detectChanges();
        this.reportIds[index].loading = false;
      }
    }
  }

  private fillMissingDatesFilter(
    data: any[],
    startDate: string,
    endDate: string,
    size: any
  ): any[] {
    const filledData = [];
    const startYear = '20' + startDate.split('-')[0];
    const endYear = '20' + endDate.split('-')[0];
    const formattedStartDate = startDate.replace(/^\d{2}/, startYear);
    const formattedEndDate = endDate.replace(/^\d{2}/, endYear);
    const currentDate = new Date(formattedStartDate);
    const end = new Date(formattedEndDate);

    while (currentDate <= end) {
      const dateString = currentDate.toISOString().split('T')[0];
      const existingData = data.find((d) => d[0] === dateString);

      if (existingData) {
        filledData.push(existingData);
      } else {
        const newData = [dateString, ...Array(size - 1).fill(0)];
        filledData.push(newData);
      }

      currentDate.setDate(currentDate.getDate() + 1);
    }

    return filledData;
  }

  onChartInit(chart: Highcharts.Chart, index: number) {
    this.chartInstances[index] = chart;
  }

  onSubChartInit(chart: Highcharts.Chart, index: number) {
    this.subChartInstances[index] = chart;
  }

  deepEqual(obj1: any, obj2: any): boolean {
    if (obj1 === obj2) return true;
    if (
      typeof obj1 !== 'object' ||
      obj1 === null ||
      typeof obj2 !== 'object' ||
      obj2 === null
    )
      return false;
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);
    return (
      keys1.length === keys2.length &&
      keys1.every(
        (key) => keys2.includes(key) && this.deepEqual(obj1[key], obj2[key])
      )
    );
  }

  private startLiveUpdate() {
    this.updateSubscription = interval(30000)
      .pipe(
        switchMap(() => {
          // Check if any reports are currently loading
          const anyReportLoading = this.reportIds.some(
            (report) => report.loading
          );
          // Only proceed if no reports are loading and globalFilter dates are set
          if (
            !anyReportLoading &&
            this.globalFilter &&
            this.globalFilter.startDate &&
            this.globalFilter.endDate
          ) {
            console.log('filter');
            return this.chartService
              .getFunctionChartFiltred(this.globalFilter)
              .pipe(
                map((resp) =>
                  resp.map((report: { id_report: any }) => ({
                    id: report.id_report,
                    data: [report],
                  }))
                ),
                catchError((error) => {
                  console.error('Error fetching filtered reports', error);
                  return of([]);
                })
              );
          } else if (!anyReportLoading) {
            console.log('no filter');
            return forkJoin(
              this.reportIds.map((report) =>
                this.fetchReport(report.id).pipe(
                  map((data) => ({ id: report.id, data: [data] }))
                )
              )
            );
          } else {
            // Skip fetching reports if any are still loading
            return of([]);
          }
        })
      )
      .subscribe((reports) => {
        console.log('reulst:', reports);
        reports.forEach((reportData: { data: any[]; id: any }) => {
          const newReport = reportData.data[0]; // Assuming each data array has one report
          const reportId = reportData.id;
          const reportIndex = this.reportIds.findIndex(
            (report) => report.id === reportId
          );

          if (
            reportIndex !== -1 &&
            !this.deepEqual(this.reportIds[reportIndex].report, newReport)
          ) {
            console.log(
              'changes detected on report:',
              this.reportIds[reportIndex]
            );
            if (newReport.title !== ' Voice Call Rating Alert') {
              this.updateChart(reportIndex, newReport);
            }
          }
        });
      });
  }

  updateChart(index: number, newReportData: any) {
    this.ngZone.run(() => {
      let newReport;
      // Check if the new report data is from getFunctionChartFiltred or getRepById
      if (Array.isArray(newReportData)) {
        // Assuming getFunctionChartFiltred returns an array of reports
        newReport = newReportData[0];
      } else {
        // Assuming getRepById returns a single report object
        newReport = newReportData;
      }

      if (!newReport || !newReport.list_de_donnees) {
        console.error('Invalid report data received:', newReport);
        return;
      }
      // Update the chart options
      if (this.reportIds[index].chartType !== 'table') {
        let startDate, endDate;
        let hasDateData = false;
        hasDateData = this.reportIds[index].report[0].hasdate;

        if (
          this.globalFilter &&
          this.globalFilter &&
          this.globalFilter.startDate &&
          this.globalFilter.endDate
        ) {
          startDate = this.globalFilter.startDate;
          endDate = this.globalFilter.endDate;
          this.reportIds[index].report[0].list_de_donnees =
            this.fillMissingDatesFilter(
              newReport.list_de_donnees,
              startDate,
              endDate,
              this.reportIds[index].report[0].listnamereptab.length
            );
        } else {
          startDate = newReport.list_de_donnees[0][0];
          endDate =
            newReport.list_de_donnees[newReport.list_de_donnees.length - 1][0];
          this.reportIds[index].report[0].list_de_donnees =
            this.fillMissingDates(
              newReport.list_de_donnees,
              startDate,
              new Date().toISOString().split('T')[0],
              newReport.list_de_donnees.length
            );
        }
        this.chartOptions[index] = this.buildChart(this.reportIds[index]);

        const chartInstance = this.chartInstances[index];

        if (chartInstance && chartInstance.responsive) {
          chartInstance.update(this.chartOptions[index]);
        }
      } else {
        this.reportIds[index].loading = true;
        let startDate, endDate;
        if (
          this.globalFilter &&
          this.globalFilter &&
          this.globalFilter.startDate &&
          this.globalFilter.endDate
        ) {
          startDate = this.globalFilter.startDate;
          endDate = this.globalFilter.endDate;
          this.reportIds[index].report[0].list_de_donnees =
            this.fillMissingDatesFilter(
              newReport.list_de_donnees,
              startDate,
              endDate,
              this.reportIds[index].report[0].listnamereptab.length
            );
        } else {
          startDate = newReport.list_de_donnees[0][0];
          endDate =
            newReport.list_de_donnees[newReport.list_de_donnees.length - 1][0];
          this.reportIds[index].report[0].list_de_donnees =
            this.fillMissingDates(
              newReport.list_de_donnees,
              startDate,
              new Date().toISOString().split('T')[0],
              newReport.list_de_donnees.length
            );
        }

        console.log(this.reportIds[index].report[0]);
        this.chartOptions[index] = {};
      }
      this.dataUpdateService.updateData(
        this.reportIds[index].report[0].list_de_donnees
      );
      this.changeDetectorRef.detectChanges();
      this.reportIds[index].loading = false;
    });
  }

  fetchReport(reportId: number) {
    return this.chartService.getRepById(reportId);
  }

  private applyChartTheme() {
    if (this.darkModeEnabled) {
      //console.log('Applying dark theme');
      DarkTheme(Highcharts);
    } else {
      //console.log('Applying light theme');
      DefaultTheme(Highcharts);
    }
    Highcharts.setOptions({}); // Reapply global options if needed
  }

  private updateAllCharts() {
    if (this.darkModeEnabled) {
      //console.log('Applying dark theme');
      DarkTheme(Highcharts);
      Highcharts.setOptions({});
    } else {
      //console.log('Applying light theme');
      DefaultTheme(Highcharts);
      Highcharts.setOptions({});
    }

    this.reportIds.forEach((reportId, index) => {
      if (this.reportIds[index].chartType !== 'table') {
        this.chartOptions[index] = this.buildChart(this.reportIds[index]);
        const chartInstance = this.chartInstances[index];
        if (chartInstance) {
          chartInstance.update(this.chartOptions[index], true, true);
          //console.log('chart is on dark mode');
          chartInstance.redraw(); // Explicitly redraw the chart
        }
      }
    });
    this.changeDetectorRef.detectChanges();
  }

  formatDate(date: Date): string {
    const year = date.getFullYear().toString().slice(-2); // Get the last two digits of the year
    const month = ('0' + (date.getMonth() + 1)).slice(-2); // Add 1 to the month because it's 0-indexed
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
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

  formatNumber(value: any): string {
    if (typeof value === 'number') {
      // Use toFixed to always display 4 values after the decimal point
      const formattedValue = value.toFixed(4);
      // console.log(value);
      // console.log(formattedValue);
      return formattedValue;
    }
    return value;
  }

  onAddToPlaylistClick() {
    // Hide the button and show the dropdown
    this.showButton = true;
    this.selectedId = this.reportGroup.id;
    const ref = this.dialogService.open(PlaylistComponent, {
      header: 'Save To Playlist',
      width: '30%',
      contentStyle: { 'max-height': '500px', overflow: 'auto' }, // Optional: you can set custom styles
      // If you need to pass data to your PlaylistComponent, use the data property:
      data: {
        id: this.selectedId, // pass any data you need
      },
    });

    ref.onClose.subscribe((data) => {
      // Handle the data received from the dialog
    });
  }

  copyToClipboard(id: any) {
    if (navigator.clipboard) {
      navigator.clipboard
        .writeText(id)
        .then(() => {
          //console.log('ID copied to clipboard:', id);
        })
        .catch((err) => {
          console.error('Error copying text to clipboard', err);
        });
    } else {
      this.fallbackCopyTextToClipboard(id);
    }
  }

  fallbackCopyTextToClipboard(text: string) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.top = '0';
    textArea.style.left = '0';
    textArea.style.position = 'fixed';

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
      const successful = document.execCommand('copy');
      const msg = successful ? 'successful' : 'unsuccessful';
      //console.log('Fallback: Copying text command was ' + msg);
    } catch (err) {
      console.error('Fallback: Oops, unable to copy', err);
    }

    document.body.removeChild(textArea);
  }

  detailsTooltip(value: any): any {
    if (value) {
      return 'Details available'; // Your tooltip text here
    }
    return null;
  }

  convertDateFormat(dateStr: string): string {
    const parts = dateStr.split('-');
    if (parts[0].length === 2) {
      parts[0] = '20' + parts[0]; // Prepend '20' to make the year in 'yyyy' format
    }
    return parts.join('-'); // Reassemble the date string in 'yyyy-mm-dd' format
  }

  private buildChartV2(data: any): any {
    console.log(data);
    const chartData = data.subReport;
    console.log(chartData);
    let subtitleText = chartData[0].title + ': ';
    if (chartData[0].list_de_donnees.length === 1) {
      subtitleText += 'Date: ' + chartData[0].list_de_donnees[0][0];
    } else if (chartData[0].list_de_donnees.length >= 2) {
      subtitleText +=
        'Between ' +
        chartData[0].list_de_donnees[0][0] +
        ' and ' +
        chartData[0].list_de_donnees[
          chartData[0].list_de_donnees.length - 1
        ][0];
    }

    let hasDateData = false;
    // hasDateData = chartData[0].hasdate;
    hasDateData =
      chartData[0].listnamereptab &&
      chartData[0].listnamereptab.length > 0 &&
      chartData[0].listnamereptab[0].toLowerCase().includes('date');
    data.constructorType = hasDateData ? 'stockChart' : 'chart';

    // Calculate the date 90 days ago and 30 days ago from today
    const ninetyDaysAgo = new Date();
    ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90);
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    // Process data for charts
    const seriesData = hasDateData
      ? chartData[0].listnamerep.map((name: string, i: number) => ({
          id: `series-${i}`,
          name: name,
          data: chartData[0].list_de_donnees.map((datum: any) => [
            this.isMonthYearFormat(datum[0])
              ? this.parseDateToUTC(datum[0])
              : new Date(datum[0]).getTime(),
            datum[i + 1],
          ]),
        }))
      : chartData[0].listnamerep.slice(0).map((name: any, i: number) => ({
          id: `series-${i}`,
          name: name,
          data: chartData[0].list_de_donnees.map(
            (data: { toString: () => any }[]) => data[i + 1]
          ),
        }));

    //console.log(seriesData);

    // Process data for pie
    const isPieChart = data.chartType === 'pie';
    let pieData: any;

    if (isPieChart) {
      pieData = chartData[0].list_de_donnees.map((item: any) => {
        return {
          name: item[0], // Assuming the first value is the name
          y: item[1], // Assuming the second value is the data point
        };
      });
    }

    const chartService = this.chartService;
    let chartOptions: Highcharts.Options;
    chartOptions = {
      colors: [
        '#058DC7',
        '#50B432',
        '#ED561B',
        '#DDDF00',
        '#24CBE5',
        '#64E572',
        '#FF9655',
        '#FFF263',
        '#6AF9C4',
      ],
      credits: {
        enabled: false,
      },
      chart: {
        type: data.chartType,
        height: '50%',
        animation: true,
        colorCount: 100,
        reflow: true,
        plotBorderWidth: 1,
        plotShadow: true,
        borderRadius: 10,
        style: {
          fontFamily: "'Open Sans', sans-serif",
        },
        zooming: {
          mouseWheel: {
            enabled: false,
          },
        },
        // events: {
        //   load: function () {
        //     const chart = this;
        //     const updateData = () => {
        //       chartService.getRepById(data.id).subscribe((newData: any) => {
        //         chart.series[0].setData(
        //           newData[0].list_de_donnees.map((datum: any) => [
        //             console.log(datum),
        //           ])
        //         );
        //       });
        //     };
        //     setInterval(() => {
        //       updateData();
        //     }, 10000);
        //   },
        // },
      },
      // title: {
      //   text:
      //     chartData[0].title +
      //     '<br><hr style="height:2px;color:white;background-color:gray">',
      //   align: 'left',
      //   useHTML: true,
      //   style: {
      //     fontSize: '18px',
      //     fontWeight: 'bold',
      //   },
      // },
      responsive: {
        rules: [
          {
            condition: {
              maxWidth: 500,
            },
            chartOptions: {
              legend: {
                layout: 'horizontal',
                align: 'center',
                verticalAlign: 'bottom',
              },
            },
          },
        ],
      },
      xAxis: {
        type: hasDateData ? 'datetime' : 'category',
        //min: thirtyDaysAgo.getTime(),
        gridLineWidth: 1,
        alignTicks: true,
        title: {
          text: chartData[0].listnamereptab[0],
        },
        labels: {
          style: {
            fontSize: '12px',
          },
        },
        categories: hasDateData
          ? null
          : chartData[0].list_de_donnees.map((datum: any[]) => datum[0]),
      },
      yAxis: {
        title: {
          text: 'Values',
        },
        gridLineWidth: 1,
        alignTicks: true,
      },
      legend: {
        enabled: true,
      },
      exporting: {
        enabled: true,
        fallbackToExportServer: false,
        libURL: 'assets/js/',
        chartOptions: {
          chart: {
            width: 1000,
            height: 800,
          },
        },
        buttons: {
          contextButton: {
            menuItems: [
              'viewFullscreen',
              'separator',
              'downloadPNG',
              'downloadPDF',
              'downloadSVG',
              'downloadCSV',
            ],
          },
        },
      },
      tooltip: hasDateData
        ? {
            backgroundColor: '#2b2b2b',
            style: {
              color: '#E0E0E3',
            },
            shared: true,
            useHTML: true,
            formatter: function () {
              if (!this.points) {
                return '';
              }
              if (typeof this.x !== 'number') {
                return 'Invalid date';
              }
              let tooltipHtml = `<b>${Highcharts.dateFormat(
                '%A, %b %e, %Y',
                this.x
              )}</b><br/>`;
              let values: Array<number> = [];
              this.points.forEach(function (point) {
                if (typeof point.y === 'number') {
                  values.push(point.y);
                  tooltipHtml += `<span style="color:${
                    point.color
                  }">\u25CF</span> ${
                    point.series.name
                  }: <b>${Highcharts.numberFormat(point.y, 2)}</b><br/>`;
                }
              });

              // Check if chartData[0].isdiff is true
              //console.log(chartData[0].rapport.isdiff);
              if (chartData[0].rapport.isdiff && values.length === 2) {
                const difference = Math.abs(values[0] - values[1]);
                const percentDifference = (difference / values[0]) * 100;
                tooltipHtml += `<span style="color:red">Difference: <b>${Highcharts.numberFormat(
                  difference,
                  2
                )}</b> (${Highcharts.numberFormat(
                  percentDifference,
                  2
                )}%)</span><br/>`;
              }
              return tooltipHtml;
            },

            xDateFormat: '%A, %b %e, %Y',
          }
        : {
            valueDecimals: 1,
            pointFormat: '{point.name}: <b>{point.y:.2f}</b>',
          },
      plotOptions: {
        pie: isPieChart
          ? {
              allowPointSelect: true,
              cursor: 'pointer',
              dataLabels: {
                enabled: true,
                distance: 20,
                format: '<b>{point.name}</b>: {point.percentage:.2f}%',
              },
              borderRadius: 10,
              showInLegend: true,
              slicedOffset: 20,
            }
          : {},
        series: !isPieChart
          ? {
              dataLabels: {
                enabled: true,
                format: '{point.y:.2f}',
              },
            }
          : {},
      },
      rangeSelector: hasDateData
        ? {
            buttons: [
              {
                type: 'week',
                count: 1,
                text: '1w',
              },
              {
                type: 'month',
                count: 1,
                text: '1m',
              },
              {
                type: 'all',
                text: 'All',
              },
            ],
            buttonTheme: {
              width: 60,
            },
            inputEnabled: true,
            inputPosition: {
              align: 'right',
              x: 0,
              y: 0,
            },
            buttonPosition: {
              align: 'left',
              x: 0,
              y: 0,
            },
            selected: 1,
          }
        : {},
      navigator: {
        enabled: hasDateData ? true : false,
      },
      scrollbar: {
        enabled: hasDateData ? true : false,
      },
      stockTools: {
        gui: {
          buttons: [
            'indicators',
            'separator',
            'simpleShapes',
            'flags',
            'verticalLabels',
            'measure',
            'separator',
            'zoomChange',
            'currentPriceIndicator',
            'fullScreen',
            'separator',
            'toggleAnnotations',
          ],
        },
      },
      series: isPieChart
        ? [
            {
              animation: {
                duration: 2000,
              },
              colorByPoint: true,
              data: pieData,
              type: 'pie',
            },
          ]
        : seriesData,
    };
    return chartOptions;
  }
}
