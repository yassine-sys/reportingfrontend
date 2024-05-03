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
} from '@angular/core';
//import * as Highcharts from 'highcharts';
import * as Highcharts from 'highcharts/highstock';
import Accessibility from 'highcharts/modules/accessibility';
import ExportingModule from 'highcharts/modules/exporting';
import type { SeriesOptionsType } from 'highcharts';
import { AuthService } from '../../services/auth.service';
import { ChartService } from '../../services/chart.service';
import { User } from '../../../model/User';
import { ActivatedRoute, Router } from '@angular/router';
import { FilterService } from '../../services/filter.service';
import { Filters } from '../../../model/Filters';
import { FilterType } from '../../../model/FilterType';
import HC_exportData from 'highcharts/modules/export-data';
import OfflineEXporting from 'highcharts/modules/offline-exporting';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { TableDialogComponent } from '../table-dialog/table-dialog.component';
import { UserService } from '../../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { HIGHCHARTS_TYPES } from '../../../model/HIGHCHARTS_TYPES';
import { LoaderService } from '../../services/loader.service';
import { FunctionService } from '../../services/function.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { OrderFunctionComponent } from '../order-function/order-function.component';
import * as XLSX from 'xlsx';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Chart, SeriesAbandsOptions, SeriesPieOptions } from 'highcharts';

import { ViewChild } from '@angular/core';
import { data } from 'jquery';
import {
  Observable,
  Subject,
  Subscription,
  catchError,
  combineLatest,
  interval,
  map,
  merge,
  of,
  takeUntil,
} from 'rxjs';
import { MatSelectChange } from '@angular/material/select';
import { HighchartsChartComponent } from 'highcharts-angular';
import { PaginatedTableComponent } from '../paginated-table/paginated-table.component';
import { CommentService } from '../../services/comment.service';
import { OrderUserChartsComponent } from '../order-user-charts/order-user-charts.component';
import { MenuItem, Message } from 'primeng/api';
import IndicatorsAll from 'highcharts/indicators/indicators-all';
import HDragPanes from 'highcharts/modules/drag-panes';
import HAnnotationsAdvanced from 'highcharts/modules/annotations-advanced';
import HPriceIndicator from 'highcharts/modules/price-indicator';
import HFullScreen from 'highcharts/modules/full-screen';
import HStockTools from 'highcharts/modules/stock-tools';
import IndicatorsCore from 'highcharts/indicators/indicators';
import TrendLine from 'highcharts/indicators/trendLine';
import ExportData from 'highcharts/modules/export-data';
import { DarkModeService } from 'src/app/services/dark-mode.service';
import DarkTheme from 'highcharts/themes/dark-unica';
import DefaultTheme from 'highcharts/themes/grid-light';
import { DialogService } from 'primeng/dynamicdialog';
import { PlaylistComponent } from '../playlist/playlist.component';

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
  selector: 'app-userchart',
  templateUrl: './userchart.component.html',
  styleUrls: ['./userchart.component.css'],
})
export class UserchartComponent implements OnInit, OnDestroy, AfterViewInit {
  user!: User;
  funcId: any;
  listeRep: any[] = [];
  reports: any[] = [];
  funcName: any;
  chartOptions: Highcharts.Options[] = [];

  isLoading: boolean[] = [];
  isChartDisplayed: boolean[] = [];
  private destroy$ = new Subject<void>();
  Highcharts = Highcharts;

  isTable: boolean = false;
  chartInstances: any[] = [];
  highchartsTypes = HIGHCHARTS_TYPES;
  messages1!: Message[];

  reportIds: {
    id: any;
    loading: boolean;
    error: string;
    report: any;
    constructorType: string;
    chartType: string;
  }[] = [];
  filtred!: Filters;
  globalFilter!: Filters;

  private filtredSubscription!: Subscription;

  private subscriptionDarkMode: Subscription = new Subscription();
  darkModeEnabled!: boolean;

  itemssplit!: MenuItem[];

  constructor(
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
    private authServive: AuthService,
    private darkModeService: DarkModeService,
    public dialogService: DialogService
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

  ngOnInit(): void {
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
          tooltipLabel: 'Remove From Dashboard',
          tooltipPosition: 'top',
        },
        icon: 'pi pi-home',
        command: () => {
          this.removeFromDashboard(this.reportGroup.id);
        },
      },
    ];
    this.authServive.getUser().subscribe((resp: User) => {
      this.user = resp;
      this.funcId = resp.uId;
      if (this.filtredSubscription) {
        this.filtredSubscription.unsubscribe();
      }
      this.filtredSubscription = this.filterService
        .getFiltersUpdatedObservableUSer()
        .subscribe((filterData: Filters) => {
          this.globalFilter = filterData;
          this.globalFilter.idfunction = this.funcId;
          if (this.globalFilter.isVaration) {
            this.chartService
              .getFunctionChartVariationForUser(this.globalFilter)
              .subscribe((resp) => {
                this.updateReportsAfterFilter(resp);
              });
          } else if (this.globalFilter.isPerHour) {
            this.chartService
              .getFunctionChartFiltredForUserPerHours(this.globalFilter)
              .subscribe((resp) => {
                this.updateReportsAfterFilter(resp);
              });
          } else {
            this.chartService
              .getFunctionChartFiltredForUser(this.globalFilter)
              .subscribe((resp) => {
                this.updateReportsAfterFilter(resp);
              });
          }
        });
      this.loadData(this.user);
    });
    //this.filterService.clearFilters();
    //this.filtred.idfunction = 0;
  }

  private loadData(user: User): void {
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
      .getReportsByUserId(this.user.uId)
      .subscribe((response: any) => {
        console.log(response);
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
      }));

      const reportObservables: Observable<any>[] = this.reportIds.map((item) =>
        this.chartService.getRepById(item.id).pipe(
          catchError((error) => {
            console.error('Error fetching report', error);
            item.error = 'Error Fetching report: ' + item.id;
            this.messages1 = [
              {
                severity: 'error',
                summary: 'Error',
                detail: 'Error Fetching report: ' + item.id,
              },
            ];
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
              const startDate = report[0].list_de_donnees[0][0];
              const endDate =
                report[0].list_de_donnees[
                  report[0].list_de_donnees.length - 1
                ][0];
              this.reportIds[index].report = report;
              this.reportIds[index].report[0].list_de_donnees =
                this.fillMissingDates(
                  report[0].list_de_donnees,
                  startDate,
                  endDate
                );
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
              console.log(this.reportIds);
            }
          },
          (error) => {
            console.error('Error fetching reports', error);
          }
        );
    }
  }

  private fillMissingDates(
    data: any[],
    startDate: string,
    endDate: string
  ): any[] {
    const filledData = [];
    const currentDate = new Date(startDate);
    const end = new Date(endDate);

    while (currentDate <= end) {
      const dateString = currentDate.toISOString().split('T')[0];
      const existingData = data.find((d) => d[0] === dateString);

      if (existingData) {
        filledData.push(existingData);
      } else {
        const newData = [dateString, ...Array(data[0].length - 1).fill(0)];
        filledData.push(newData);
      }

      currentDate.setDate(currentDate.getDate() + 1);
    }

    return filledData;
  }

  isMonthYearFormat(dateStr: string) {
    return /^\d{2}\/\d{4}$/.test(dateStr); // Regex for 'MM/YYYY' format
  }

  parseDateToUTC(dateStr: string): number {
    const parts = dateStr.split('/');
    const year = parseInt(parts[1], 10);
    const month = parseInt(parts[0], 10) - 1; // Month is 0-indexed in JavaScript Date
    const date = new Date(Date.UTC(year, month, 1)); // Use the first day of the month
    return date.getTime();
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

    console.log(seriesData);

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
        height: '40%',
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

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
    this.filterService.clearFiltersUser();
    this.subscriptionDarkMode.unsubscribe();
  }

  getFunctionName() {
    console.log(this.funcId);
    this.functionService.getFunctionById(this.funcId).subscribe((f: any) => {
      this.funcName = f.functionName;
    });
  }

  containsTableChart(reportGroup: any[]): boolean {
    return reportGroup.some((report) => report.ChartType === 'table');
  }

  exportXLSX(cols: any, rows: any, fileName: any) {
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

    const columnWidths = cols.map(() => ({ width: 10 }));
    worksheetData.forEach((rowData: any) => {
      Object.keys(rowData).forEach((key, index) => {
        const value = rowData[key];
        const contentLength = value ? String(value).length : 0;
        if (contentLength > columnWidths[index].width) {
          columnWidths[index].width = contentLength;
        }
      });
    });

    columnWidths.forEach((width: any, index: any) => {
      const column = XLSX.utils.encode_col(index);
      sheet['!cols'] = sheet['!cols'] || [];
      sheet['!cols'].push({ wch: width.width });
    });

    const range = `A1:${XLSX.utils.encode_col(worksheetColumns.length - 1)}${
      worksheetData.length + 1
    }`;
    sheet['!ref'] = range;

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, sheet, worksheetName); // Append the sheet to the workbook
    XLSX.writeFile(workbook, `${fileName}.xlsx`); // Save the workbook as an Excel file
  }

  updateChartType(chartIndex: number, event: any) {
    if (event === 'table') {
      this.isTable = true;
      this.reportIds[chartIndex].report[0].ChartType = event;
      this.chartOptions[chartIndex] = {};
    } else {
      this.isTable = false;
      this.chartOptions[chartIndex] = this.buildChart(
        this.reportIds[chartIndex]
      );
    }
  }

  openOrderDiag(): void {
    const dialogRef = this.dialog.open(OrderUserChartsComponent, {
      width: '350px',
      data: { userId: this.user.uId },
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

  onFilterApplied(filterData: any, report: any, index: any) {
    // Handle filter data here
    if (filterData) {
      this.filtred = filterData;
      this.reportIds[index].loading = true;
      this.chartService
        .FilterChart(filterData, report.id_report)
        .subscribe((resp) => {
          // Update the report data
          this.reportIds[index].report[0].list_de_donnees =
            resp.list_de_donnees;
          console.log(this.reportIds[index].report[0]);
          // Update the chart options
          if (report.chart_type !== 'table') {
            this.chartOptions[index] = this.buildChart(this.reportIds[index]);

            // Ensure the chart instance is available and responsive before updating
            const chartInstance = this.chartInstances[index];
            if (chartInstance && chartInstance.responsive) {
              chartInstance.update(this.chartOptions[index]);
            }
          } else {
            this.chartOptions[index] = {};
          }

          this.reportIds[index].loading = false;
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
        this.reportIds[index].report[0].list_de_donnees =
          filterResult.list_de_donnees;
        console.log(this.reportIds[index].report[0]);
        // Update the chart options
        if (this.reportIds[index].report[0].chart_type !== 'table') {
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
      }
    }
  }

  onChartInit(chart: any, index: number) {
    this.chartInstances[index] = chart;
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

  removeFromDashboard(id: any) {
    this.userService.removeFromDashboard(this.user?.uId, id).subscribe(() => {
      //this.chartOptions = []; // clear existing chart options
      this.loadData(this.user);
    });
  }

  private async applyChartTheme() {
    if (this.darkModeEnabled) {
      DarkTheme(Highcharts);
    } else {
      DefaultTheme(Highcharts);
    }
    Highcharts.setOptions({}); // Reapply global options if needed
  }

  reportGroup: any;

  handleSpeedDialClick(report: any) {
    this.reportGroup = report;
  }

  showButton = false; // Flag to control button visibility
  selectedId: any;
  selectedPlaylists: any[] = []; // Array to store selected playlists
  allPlaylists: any[] = [];
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

  detailsTooltip(value: any): any {
    if (value) {
      return 'Details available'; // Your tooltip text here
    }
    return null;
  }

  copyToClipboard(id: any) {
    if (navigator.clipboard) {
      navigator.clipboard
        .writeText(id)
        .then(() => {
          console.log('ID copied to clipboard:', id);
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
      console.log('Fallback: Copying text command was ' + msg);
    } catch (err) {
      console.error('Fallback: Oops, unable to copy', err);
    }

    document.body.removeChild(textArea);
  }
}
