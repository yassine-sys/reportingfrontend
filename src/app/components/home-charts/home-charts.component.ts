import {
  Component,
  ElementRef,
  EventEmitter,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Subscription, interval } from 'rxjs';
import { ChartService } from 'src/app/services/chart.service';
import * as Highcharts from 'highcharts';

//import * as Utils from './Utils.js';
import darkUnica from 'highcharts/themes/dark-unica';
import brandDark from 'highcharts/themes/brand-dark';
import { ActivatedRoute, Router } from '@angular/router';
import { FunctionService } from 'src/app/services/function.service';
import * as Highstock from 'highcharts/highstock';
import HC_exporting from 'highcharts/modules/exporting';
import HC_data from 'highcharts/modules/data';
import HC_serieslabel from 'highcharts/modules/series-label';
import HC_drilldown from 'highcharts/modules/drilldown';
import HC_stockTools from 'highcharts/modules/stock-tools';
import { Filters } from 'src/model/Filters.js';
import { FilterType } from 'src/model/FilterType';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home-charts',
  templateUrl: './home-charts.component.html',
  styleUrls: ['./home-charts.component.css'],
})
export class HomeChartsComponent implements OnInit, OnDestroy {
  clicked: boolean = false;
  filter: any;
  filterApplied: EventEmitter<Filters> = new EventEmitter<Filters>();
  filterType = FilterType;
  filterForm!: FormGroup;
  date: any;
  filterTypeOptions: any[] = [
    //{ label: 'Hour', value: 'per_hour' },
    { label: 'Day', value: 'per_day' },
    { label: 'Month', value: 'per_month' },
    { label: 'Year', value: 'per_year' },
  ];

  chartIds: any[] = [];
  playlist: any;
  playListId: any;
  chartypes: any[] = [
    'line',
    'spline',
    'area',
    'areaspline',
    'column',
    'bar',
    'pie',
    'scatter',
    'gauge',
    'arearange',
    'areasplinerange',
    'columnrange',
  ];
  private currentChartIndex = 0;
  private interval: any;
  chartData: any;
  private chartSubscription!: Subscription;
  private myChart: Highcharts.Chart | null = null;
  private isTransitioning = false;
  private fadeInDuration = 500; // milliseconds
  private fadeOutDuration = 500; // milliseconds
  isPlaying: boolean = true;

  @ViewChild('chartContainer') chartContainer!: ElementRef;

  constructor(
    private service: FunctionService,
    private chartService: ChartService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private datePipe: DatePipe,
    private toastr: ToastrService
  ) {
    HC_serieslabel(Highcharts);
    HC_drilldown(Highcharts);
    darkUnica(Highstock);
    HC_stockTools(Highstock);
    HC_exporting(Highstock);
    HC_data(Highstock);
    HC_serieslabel(Highstock);

    this.initializeForm();
  }

  ngOnInit() {
    this.initializeForm();
    this.date = new Date().toISOString().slice(0, 10);
    this.startAutoLoad();
  }

  private extractChartIds(): void {
    if (this.playlist && this.playlist.playlistReports) {
      this.chartIds = this.playlist.playlistReports.map(
        (playlistReport: any) => playlistReport.report.id
      );
      console.log('Extracted Chart IDs:', this.chartIds);
    }
  }

  private loadChartData() {
    this.route.params.subscribe((params) => {
      this.playListId = params['id'];
      this.service.getPlayListById(this.playListId).subscribe((resp) => {
        this.playlist = resp;

        this.extractChartIds();

        const chartId = this.chartIds[this.currentChartIndex];
        this.chartSubscription = this.chartService
          .getRepById(chartId)
          .subscribe(
            (data: any) => {
              this.chartData = data;
              this.transitionToNextChart();
            },
            (error) => {
              console.error('Error loading chart data:', error);
            }
          );
      });
    });
  }

  private transitionToNextChart() {
    this.isTransitioning = true;

    const nextChartIndex = (this.currentChartIndex + 1) % this.chartIds.length;
    const nextChartId = this.chartIds[nextChartIndex];

    this.chartService.getRepById(nextChartId).subscribe(
      (data: any) => {
        if (this.myChart) {
          this.myChart.destroy();
        }

        this.chartData = data;
        this.renderChart(data);

        this.currentChartIndex = nextChartIndex;
        this.isTransitioning = false;
      },
      (error) => {
        console.error('Error loading chart data:', error);
        this.isTransitioning = false;
      }
    );
  }

  private switchToNextChart() {
    this.currentChartIndex =
      (this.currentChartIndex + 1) % this.chartIds.length;
  }

  private renderChart(data: any) {
    const chartData = data[0];
    const chartType =
      chartData.chart_type === 'table' ? 'spline' : chartData.chart_type;

    let labels: any[] = [];
    let seriesData: any[] = [];

    if (chartData.list_de_donnees.length > 0) {
      const firstDataRow = chartData.list_de_donnees[0];

      const isDateData =
        firstDataRow[0] && !isNaN(new Date(firstDataRow[0]).getTime());

      if (isDateData) {
        labels = chartData.list_de_donnees.map((data: any[]) =>
          new Date(data[0]).toISOString()
        );
        seriesData = chartData.listnamerep.map((name: string, i: number) => ({
          name: name,
          data: chartData.list_de_donnees.map((datum: any[]) => [
            new Date(datum[0]).getTime(),
            datum[i + 1],
          ]),
        }));
      } else {
        labels = chartData.list_de_donnees.map((data: any[]) =>
          data[0].toString()
        );
        seriesData = chartData.listnamerep.map((name: any, i: number) => ({
          name: name,
          data: chartData.list_de_donnees.map((data: any[]) => data[i + 1]),
        }));
      }

      const maxValue = Math.max(
        ...seriesData.flatMap((series: { data: any }) => series.data)
      );

      // Calculate the threshold as 80% of the maximum value
      const thresholdValue = 0.8 * maxValue;

      let subtitleText = chartData.title + ': ';
      if (chartData.list_de_donnees.length === 1) {
        subtitleText += 'Date: ' + chartData.list_de_donnees[0][0];
      } else if (chartData.list_de_donnees.length >= 2) {
        subtitleText +=
          'Between ' +
          chartData.list_de_donnees[0][0] +
          ' and ' +
          chartData.list_de_donnees[chartData.list_de_donnees.length - 1][0];
      }

      // Process data for pie
      const isPieChart = chartData.chart_type === 'pie';
      console.log('chart type === ' + isPieChart);
      let pieData: any;

      if (isPieChart) {
        pieData = chartData.list_de_donnees.map((item: any) => {
          return {
            name: item[0], // Assuming the first value is the name
            y: item[1], // Assuming the second value is the data point
          };
        });
      }

      const chartOptions: Highcharts.Options = {
        credits: {
          enabled: false,
        },
        chart: {
          type: chartType,
          height: '50%',
          animation: true,
          colorCount: 100,
          plotShadow: false,
          reflow: true,
          renderTo: this.chartContainer.nativeElement,
        },
        title: {
          text: chartData.title,
          style: {
            fontWeight: 'bold',
            fontSize: '16px',
            minWidth: '90%',
          },
        },
        subtitle: {
          text: subtitleText,
          align: 'center',
          style: {
            fontSize: '14px',
          },
        },
        xAxis: {
          categories: labels,
          gridLineWidth: 1,
          alignTicks: true,

          title: {
            text: chartData.listnamereptab[0],
          },
        },
        yAxis: {
          gridLineWidth: 1,
          alignTicks: true,
          title: {
            text: 'Values',
          },
          // plotLines: [
          //   {
          //     color: 'red', // Line color
          //     dashStyle: 'Solid' as Highcharts.DashStyleValue, // Line style
          //     value: thresholdValue, // Threshold value
          //     width: 2, // Line width
          //     zIndex: 5, // To make sure the line is above the series
          //     label: {
          //       text: Threshold = ${thresholdValue}, // Label text
          //       align: 'left',
          //       x: -10,
          //       style: {
          //         color: 'red',
          //       },
          //     },
          //   },
          // ],
        },
        legend: {
          enabled: true,
          layout: 'vertical',
          align: 'right',
          verticalAlign: 'top',
          x: -40,
          y: 80,
          floating: true,
          borderWidth: 1,
        },
        exporting: {
          enabled: false,
          chartOptions: {
            chart: {
              width: 1000,
              height: 800,
            },
          },
        },
        tooltip: {
          valueDecimals: 1,
        },

        rangeSelector: {
          enabled: true,
          inputEnabled: false,
          selected: 1,
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
        },

        navigator: {
          enabled: true,
        },

        scrollbar: {
          enabled: true,
        },
        stockTools: {
          gui: {
            buttons: [
              'customPlayPause',
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
            definitions: {
              customPlayPause: {
                className: 'highcharts-custom-annotation',
                symbol: 'close.svg',
              },
            },
          },
        },
        navigation: {
          bindings: {
            customPlayPause: {
              className: 'highcharts-custom-annotation',
              init: this.togglePlayPause.bind(this),
            },
          },
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
        series: isPieChart
          ? [
              {
                animation: {
                  duration: 1000,
                },
                colorByPoint: true,
                data: pieData,
                type: 'pie',
              },
            ]
          : seriesData,
      };
      this.myChart = Highstock.stockChart(chartOptions);
    }
  }

  ngOnDestroy(): void {
    if (this.chartSubscription) {
      this.chartSubscription.unsubscribe();
    }

    if (this.myChart) {
      this.myChart.destroy();
    }
  }

  initializeForm() {
    this.filterForm = this.fb.group(
      {
        startDate: ['', Validators.required],
        endDate: ['', Validators.required],
        type_Filter: [this.filterType.Day],
        isVaration: [false],
        isPerHour: [false],
        startHour: [''],
        endHour: [''],
      },
      { validators: this.dateComparisonValidator }
    );
  }

  dateComparisonValidator(formGroup: FormGroup) {
    const startDate = formGroup.get('startDate')!.value;
    const endDate = formGroup.get('endDate')!.value;

    if (startDate && endDate && startDate > endDate) {
      return { dateComparison: true };
    }

    if (startDate && endDate && startDate === endDate) {
      return { sameDate: true };
    }

    return null;
  }
  setFormValues(filter: any) {
    this.filterForm.patchValue({
      startDate: this.transformDate(filter.startDate),
      endDate: this.transformDate(filter.endDate),
      type_Filter:
        this.filterTypeOptions.find((ft) => ft.value === filter.type_Filter)
          ?.value || this.filterType.Day,
      isVaration: filter.isVaration || false,
      isPerHour: filter.isPerHour || false,
      startHour: filter.startHour || '',
      endHour: filter.endHour || '',
    });
  }

  transformDate(dateStr: string): string {
    if (!dateStr) {
      return '';
    }
    const [year, month, day] = dateStr.split('-');
    const transformedYear = parseInt(year) < 100 ? '20' + year : year;
    return `${transformedYear}-${month}-${day}`;
  }

  applyFilter() {
    const filterValues = this.filterForm.value;
    if (filterValues.startDate) {
      filterValues.startDate = this.datePipe.transform(
        filterValues.startDate,
        'yy-MM-dd'
      );
    }

    if (filterValues.endDate) {
      filterValues.endDate = this.datePipe.transform(
        filterValues.endDate,
        'yy-MM-dd'
      );
    }
    if (filterValues.isPerHour) {
      filterValues.startHour = filterValues.startHour.split(':')[0];
      filterValues.endHour = filterValues.endHour.split(':')[0];
      filterValues.type_Filter = 'per_day_Hour';
    }
    this.filter = filterValues;
    this.clicked = true;

    if (this.interval) {
      this.interval.unsubscribe(); // Unsubscribe from existing interval
    }

    this.loadChartData();

    // Set up a new interval for auto-refreshing charts
    this.interval = interval(20000).subscribe(() => {
      if (!this.isTransitioning) {
        this.loadChartData();
      }
    });
  }

  togglePlayPause() {
    this.isPlaying = !this.isPlaying;

    if (this.isPlaying) {
      this.toastr.info('Charts will auto-refresh every 20 seconds.', 'Play');
      this.startAutoLoad();
    } else {
      if (this.interval) {
        this.interval.unsubscribe();
        this.toastr.info('Auto-refresh paused.', 'Pause');
      }
    }
  }

  startAutoLoad() {
    this.loadChartData();

    if (this.interval) {
      this.interval.unsubscribe();
    }
    this.interval = interval(20000).subscribe(() => {
      if (!this.isTransitioning && this.isPlaying) {
        this.loadChartData();
      }
    });
  }
}

declare module 'highcharts/highstock' {
  interface StockToolsGuiDefinitionsOptions {
    customPlayPause?: any;
  }
}
