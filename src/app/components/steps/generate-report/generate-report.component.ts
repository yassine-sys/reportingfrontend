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
  query: any;
  errorMessage: any;

  ngOnInit(): void {
    this.chartData = {
      query:
        ' SELECT  T0.dateappel0 , T0.totalduree0, T1.totalduree1 FROM ( SELECT substr(dateappel,1,6) AS dateappel0 ,sum(totalduree) AS totalduree0 FROM stat.stattraficmsc WHERE 1=1 GROUP BY dateappel0 ORDER BY dateappel0 DESC  LIMIT 100) AS T0  FULL JOIN ( SELECT substr(dateappel,1,6) AS dateappel1 ,sum(totalduree) AS totalduree1 FROM stat.stattraficocs WHERE 1=1 GROUP BY dateappel1 ORDER BY dateappel1 DESC  LIMIT 100) AS T1 ON T1.dateappel1 =  T0.dateappel0',
      chart_type: 'line',
      chartName: 'test',
      data: [
        ['240502', 440953744, 352565613],
        ['240501', 1400805329, 762217085],
        ['240430', 1403104524, 756659205],
        ['240429', 1136319822, 564617387],
        ['240428', 1194242943, 615549181],
        ['240427', 1347156195, 727653584],
        ['240426', 1405531196, 758489503],
      ],
      axisName: ['datteMSc', 'duration', 'durationOCS'],
      title: null,
      erroMessage: null,
    };
    this.getQuery();
    this.fetchChartData();
  }

  getQuery() {
    this.addService.getQuery(this.addService.report).subscribe((data: any) => {
      this.query = data;
    });
  }
  fetchChartData() {
    this.addService.getChartData(this.addService.report).subscribe(
      (data: any) => {
        if (data.errorMessage) {
          this.errorMessage = data.errorMessage;
        } else {
          this.chartData = data;
          this.renderChart();
        }
      },
      (error: any) => {
        console.error('Error fetching chart data:', error.error.erroMessage);
        this.errorMessage = error.error.erroMessage;
      }
    );
  }

  renderChart() {
    // Check if chartData exists and has data
    if (
      this.chartData &&
      this.chartData.data &&
      this.chartData.data.length > 0
    ) {
      // Extract x-axis data from the first column
      const xAxisData = this.chartData.data.map((row: any) => row[0]);

      // Extract y-axis data from subsequent columns
      const yAxisData = this.chartData.axisName
        .slice(1)
        .map((name: any, i: any) => ({
          id: `series-${i}`,
          name: name,
          data: this.chartData.data.map((datum: any) =>
            parseFloat(datum[i + 1])
          ),
        }));

      // Determine xAxis type
      const xAxisType =
        typeof xAxisData[0] === 'string' ? 'category' : 'datetime';

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
          type: xAxisType,
          title: {
            text: this.chartData.axisName[0],
          },
          categories: xAxisType === 'category' ? xAxisData : null,
        },
        yAxis: {
          title: {
            text: 'Values',
          },
        },
        legend: {
          enabled: true,
        },
        series: yAxisData,
      };

      console.log(this.chartOptions);
    }
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
