import { Component, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AddReportService } from 'src/app/services/add-report.service';
import * as Highcharts from 'highcharts'; 
import { HighchartsChartModule } from 'highcharts-angular';
import { Message } from 'primeng/api';
import { ConfirmationDialogComponentComponent } from '../../confirmation-dialog-component/confirmation-dialog-component.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AssigndialogComponent } from '../assigndialog/assigndialog.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
@Component({
  selector: 'app-querymodal',
  
  templateUrl: './querymodal.component.html',
  styleUrl: './querymodal.component.css'
})
export class QuerymodalComponent {



//   reportDTO:any
//   highcharts = Highcharts; // Declare highcharts property

//   chartData: any;
//   chartOptions: Highcharts.Options;
//   query: any;
//   errorMessage: any;
//   report: any;
//   msgs1: Message[];

//   constructor(private reportService: AddReportService,
//     public dialogRef: MatDialogRef<QuerymodalComponent>,
//     @Inject(MAT_DIALOG_DATA) public data: { query: string }
//   ) {}

//   ngOnInit(): void {
//     this.fetchChartData();
//   }

//   close(): void {
//     this.dialogRef.close();
//   }

//   generateReport(): void {
//     // Call the service method to generate the report
//     this.reportService.generateReport(this.reportDTO).subscribe(
//       (chartResp: any) => {
//         // Populate the chart options
//         this.chartOptions = {
//           chart: {
//             type: chartResp.chart_type // Set the chart type
//           },
//           title: {
//             text: chartResp.chartName // Set the chart title
//           },
          
//           // Other Highcharts options as needed
//           // Example:
//           series: [{
//             type:chartResp.chart_type,
//             name: 'Data',
//             data: chartResp.data
//           }]
//         };console.log(chartResp.data)
//       },
//       (error) => {
//         console.error('Failed to generate report:', error);
//       }
//     );
//   }


//   fetchChartData() {
//     this.reportService.generateReports(this.reportService.report).subscribe(
//       (data: any) => {
//         if (data.errorMessage) {
//           this.errorMessage = data.errorMessage;
//           this.msgs1 = [
//             { severity: 'error', summary: 'Error', detail: data.errorMessage },
//           ];
//         } else {
//           this.chartData = data;
//           if (this.chartData.chart_type != 'table') {
//             this.renderChart();
//           }
//         }
//       },
//       (error: any) => {
//         console.error('Error fetching chart data:', error.error.erroMessage);
//         this.errorMessage = error.error.erroMessage;
//         this.msgs1 = [
//           {
//             severity: 'error',
//             summary: 'Error',
//             detail: error.error.erroMessage,
//           },
//         ];
//       }
//     );
//   }

//   renderChart() {
//     // Check if chartData exists and has data
//     if (
//       this.chartData &&
//       this.chartData.data &&
//       this.chartData.data.length > 0
//     ) {
//       // Extract x-axis data from the first column
//       const xAxisData = this.chartData.data.map((row: any) => row[0]);

//       // Extract y-axis data from subsequent columns
//       const yAxisData = this.chartData.axisName
//         .slice(1)
//         .map((name: any, i: any) => ({
//           id: `series-${i}`,
//           name: name,
//           data: this.chartData.data.map((datum: any) =>
//             parseFloat(datum[i + 1])
//           ),
//         }));

//       // Determine xAxis type
//       const xAxisType =
//         typeof xAxisData[0] === 'string' ? 'category' : 'datetime';

//       this.chartOptions = {
//         chart: {
//           type: this.chartData.chart_type,
//           height: '40%',
//           animation: true,
//           colorCount: 100,
//           reflow: true,
//           plotBorderWidth: 1,
//           plotShadow: true,
//           borderRadius: 10,
//           style: {
//             fontFamily: "'Open Sans', sans-serif",
//           },
//           zooming: {
//             mouseWheel: {
//               enabled: false,
//             },
//           },
//         },
//         title: {
//           text: this.chartData.chartName || 'Chart',
//         },
//         responsive: {
//           rules: [
//             {
//               condition: {
//                 maxWidth: 500,
//               },
//               chartOptions: {
//                 legend: {
//                   layout: 'horizontal',
//                   align: 'center',
//                   verticalAlign: 'bottom',
//                 },
//               },
//             },
//           ],
//         },
//         credits: {
//           enabled: false,
//         },
//         xAxis: {
//           type: xAxisType,
//           title: {
//             text: this.chartData.axisName[0],
//           },
//           categories: xAxisType === 'category' ? xAxisData : null,
//         },
//         yAxis: {
//           title: {
//             text: 'Values',
//           },
//         },
//         legend: {
//           enabled: true,
//         },
//         series: yAxisData,
//       };

//       console.log(this.chartOptions);
//     }
//   }
  
  

// }
Highcharts: typeof Highcharts = Highcharts;
constructor(
  private reportService: AddReportService,
  public addService: AddReportService,
  private router: Router,
  private dialog: MatDialog,
  private toastr: ToastrService,private route: ActivatedRoute
) {}
chartData: any;
chartOptions: Highcharts.Options;
query: any;
errorMessage: any;
report: any;
displayedColumns: string[] = []; // Add your column names here
  dataSource = new MatTableDataSource<any>([]);
  
  @ViewChild(MatPaginator) paginator: MatPaginator;


ngOnInit(): void {

  
  

  this.route.queryParams.subscribe(params => {
    this.query = decodeURIComponent(params['query']);
  });
  this.fetchChartData();
}

getQuery() {
  this.addService.generatetestQuery(this.addService.report.rep_rapports_x).subscribe((data: any) => {
    this.query = data;
  });
}

fetchChartData() {
  this.addService.generateReport(this.addService.report).subscribe(
    (data: any) => {
      if (data.errorMessage) {
        this.errorMessage = data.errorMessage;
      } else {
        this.chartData = data;
        if (this.chartData.chart_type !== 'table') {
          this.renderChart();
        } else {
          this.setupTable();
        }
      }
    },
    (error: any) => {
      console.error('Error fetching chart data:', error);
      this.errorMessage = error.error ? error.error.errorMessage : 'Unknown error';
    }
  );
}

renderChart() {
  if (this.chartData && this.chartData.data && this.chartData.data.length > 0) {
    const xAxisData = this.chartData.data.map((row: any) => row[0]);
    const yAxisData = this.chartData.axisName
      .slice(1)
      .map((name: any, i: any) => ({
        id: `series-${i}`,
        name: name,
        data: this.chartData.data.map((datum: any) => parseFloat(datum[i + 1])),
      }));

    const xAxisType = typeof xAxisData[0] === 'string' ? 'category' : 'datetime';

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

setupTable() {
  this.displayedColumns = this.chartData.axisName;
  this.dataSource.data = this.chartData.data;
}
ngAfterViewInit() {
  this.dataSource.paginator = this.paginator;
}



saveReport() {
this.addService.saveDetailedReport(this.addService.report).subscribe(
    (data: any) => {
        this.toastr.success('Report saved successfully', 'Success');
    },
    (error: any) => {
        console.error('Error saving report:', error);
        this.errorMessage = error.error ? error.error.errorMessage : 'Unknown error';
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

copyQuery() {
  const textarea = document.createElement('textarea');
  textarea.value = this.chartData.query;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  document.body.removeChild(textarea);
}

nextPage(

) {}

prevPage() {
  this.router.navigate(['/dashboard/steps/addreport']);
}

openAssignModal() {
  this.dialog.open(AssigndialogComponent, {
  });
}
}