import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AddReportService } from 'src/app/services/add-report.service';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';
import HC_accessibility from 'highcharts/modules/accessibility';

HC_accessibility(Highcharts);
HC_exporting(Highcharts);
@Component({
  selector: 'app-generate-report',
  templateUrl: './generate-report.component.html',
  styleUrls: ['./generate-report.component.css'],
})
export class GenerateReportComponent implements OnInit {
  Highcharts: typeof Highcharts = Highcharts;
  constructor(public addService: AddReportService, private router: Router) {}
  chartData: any;
  chartOptions: Highcharts.Options;

  ngOnInit(): void {
    this.chartData = {
      query:
        'SELECT t1.dateappel, t1.totalduree AS durationMSC, t2.totalduree AS surationOCS FROM (SELECT substr(dateappel,1,6) AS dateappel, sum(totalduree) AS totalduree FROM stat.stattraficmsc WHERE 1=1 GROUP BY dateappel ORDER BY dateappel DESC  LIMIT 100) AS t1 FULL JOIN (SELECT substr(dateappel,1,6) AS dateappel, sum(totalduree) AS totalduree FROM stat.stattraficocs WHERE 1=1 GROUP BY dateappel ORDER BY dateappel DESC  LIMIT 100) AS t2 ON t1.dateappel = t2.dateappel',
      chart_type: 'line',
      chartName: 'test',
      data: [
        ['240501', 16266739, 392439],
        ['240501', 16266739, 37833930],
        ['240501', 16266739, 10805776],
        ['240501', 16266739, 34322699],
        ['240501', 16266739, 3317416],
      ],
      axisName: ['dateee', 'durationMSC', 'surationOCS'],
      title: null,
    };
    this.renderChart();
  }

  fetchChartData() {
    this.addService
      .getChartData(this.addService.report)
      .subscribe((data: any) => {
        this.chartData = data;
        console.log(this.chartData);
        this.renderChart();
      });
  }

  renderChart() {
    const xAxisType =
      this.chartData.axisName[0] === 'date' ? 'datetime' : 'category';

    this.chartOptions = {
      chart: {
        type: this.chartData.chart_type,
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
      title: {
        text: this.chartData.chartName || 'Chart',
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
      credits: {
        enabled: false,
      },
      xAxis: {
        type: 'category',
        title: {
          text: this.chartData.axisName[0],
        },
      },
      yAxis: {
        title: {
          text: 'Values',
        },
      },
      legend: {
        enabled: true,
      },
      series: this.chartData.axisName.slice(0).map((name: any, i: any) => ({
        id: `series-${i}`,
        name: name,
        data: this.chartData.data.map((datum: any) => [
          datum[0],
          parseFloat(datum[i + 1]),
        ]),
      })),
    };

    console.log(this.chartOptions);
  }

  copyQuery() {
    const textarea = document.createElement('textarea');
    textarea.value = this.chartData.query;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
  }

  nextPage() {}

  prevPage() {
    this.router.navigate(['/dashboard/steps/report-info']);
  }
}
