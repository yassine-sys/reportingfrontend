import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Subscription, interval } from 'rxjs';
import { ChartService } from 'src/app/services/chart.service';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';
import HC_data from 'highcharts/modules/data';
import HC_serieslabel from 'highcharts/modules/series-label';
import HC_drilldown from 'highcharts/modules/drilldown';
import * as Utils from './Utils.js';
import darkUnica from 'highcharts/themes/dark-unica';
import brandDark from 'highcharts/themes/brand-dark';

@Component({
  selector: 'app-home-charts',
  templateUrl: './home-charts.component.html',
  styleUrls: ['./home-charts.component.css'],
})
export class HomeChartsComponent implements OnInit, OnDestroy {
  // private chartIds: number[] = [
  //   2454, 2470, 2770, 16711104, 2936, 2458, 2474, 2927, 2945, 2954, 2466,
  //   16712507, 16712508, 2968, 2462, 16712505, 2959, 2964,
  // ];

  //private chartIds: number[] = [25607, 103908, 966978];
  chartIds: any[] = [];
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

  @ViewChild('chartContainer') chartContainer!: ElementRef;

  constructor(private chartService: ChartService) {
    HC_exporting(Highcharts);
    HC_data(Highcharts);
    HC_serieslabel(Highcharts);
    HC_drilldown(Highcharts);
    brandDark(Highcharts);
  }

  ngOnInit() {
    this.chartService.getRepByFunctionId(929).subscribe((response: any) => {
      this.chartIds = response;
      this.loadChartData();
    });

    interval(10000).subscribe(() => {
      if (!this.isTransitioning) {
        this.loadChartData();
      }
    });
  }

  private loadChartData() {
    const chartId = this.chartIds[this.currentChartIndex];
    this.chartSubscription = this.chartService.getRepById(chartId).subscribe(
      (data: any) => {
        this.chartData = data;
        console.log(this.chartData);
        this.transitionToNextChart();
      },
      (error) => {
        console.error('Error loading chart data:', error);
      }
    );
  }

  private transitionToNextChart() {
    this.isTransitioning = true;

    // Fade out the existing chart
    if (this.myChart) {
      this.myChart.destroy();
      this.loadNextChart();
    } else {
      this.loadNextChart();
    }
  }

  private loadNextChart() {
    const nextChartId = this.chartIds[this.currentChartIndex];
    this.chartService.getRepById(nextChartId).subscribe(
      (data: any) => {
        this.chartData = data;
        this.renderChart(data);
        this.isTransitioning = false;
      },
      (error) => {
        console.error('Error loading chart data:', error);
        this.isTransitioning = false; // Reset the flag on error
      }
    );

    this.switchToNextChart();
  }

  private switchToNextChart() {
    this.currentChartIndex =
      (this.currentChartIndex + 1) % this.chartIds.length;
  }

  private renderChart(data: any) {
    const chartData = data[0];
    console.log(chartData);
    const chartType =
      chartData.chart_type === 'table' ? 'spline' : chartData.chart_type;
    const labels = chartData.list_de_donnees.map(
      (data: { toString: () => any }[]) => data[0].toString()
    );

    const seriesData = chartData.listnamerep.map((name: any, i: number) => ({
      name: name,
      data: chartData.list_de_donnees.map((data: any[]) => data[i + 1]),
    }));

    // Find the maximum value in the series data
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
        //       text: `Threshold = ${thresholdValue}`, // Label text
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
        enabled: true,
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
      plotOptions: {
        bar: {
          borderRadius: 10,
          dataLabels: {
            enabled: true,
          },
          groupPadding: 0.1,
        },
        series: {
          borderWidth: 3,
          dataLabels: {
            enabled: true,
            format: '{point.y:.1f}',
          },
        },
      },
      series: seriesData,
    };

    this.myChart = Highcharts.chart(chartOptions);
  }

  ngOnDestroy(): void {
    if (this.chartSubscription) {
      this.chartSubscription.unsubscribe();
    }

    if (this.myChart) {
      this.myChart.destroy();
    }
  }
}
