import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AddReportService } from 'src/app/services/add-report.service';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';
import HC_accessibility from 'highcharts/modules/accessibility';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationDialogComponentComponent } from '../../confirmation-dialog-component/confirmation-dialog-component.component';

HC_accessibility(Highcharts);
HC_exporting(Highcharts);
@Component({
  selector: 'app-generate-report',
  templateUrl: './generate-report.component.html',
  styleUrls: ['./generate-report.component.css'],
})
export class GenerateReportComponent implements OnInit {
  Highcharts: typeof Highcharts = Highcharts;
  constructor(
    public addService: AddReportService,
    private router: Router,
    private dialog: MatDialog,
    private toastr: ToastrService
  ) {}
  chartData: any;
  chartOptions: Highcharts.Options;
  query: any;
  errorMessage: any;

  ngOnInit(): void {
    //this.getQuery();
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

  saveReport() {
    this.addService.saveReport(this.addService.report).subscribe(
      (data: any) => {
        this.toastr.success('Report saved successfully', 'Success');
        this.router.navigate(['/dashboard/steps/choose-flow']);
      },
      (error: any) => {
        console.error('Error fetching chart data:', error.error.errorMessage);
        this.errorMessage = error.error.errorMessage;
        this.toastr.error(this.errorMessage, 'Error');
      }
    );
  }

  saveReportWithConfirmation() {
    const dialogRef = this.dialog.open(ConfirmationDialogComponentComponent, {
      width: '250px',
      data: 'Are you sure you want to save the report?',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.saveReport();
      }
    });
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
