import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AddReportService } from 'src/app/services/add-report.service';
import * as Highcharts from 'highcharts';
@Component({
  selector: 'app-showreport',
  templateUrl: './showreport.component.html',
  styleUrl: './showreport.component.css'
})
export class ShowreportComponent implements OnInit{
query:any
chartData:any
data: any[];
chartType: string;
chart: Highcharts.Chart; // Declare chart property
chartOptions: Highcharts.Options;
  constructor(public addService: AddReportService,
    private router: Router, 
    private http: HttpClient,
    private dialog:MatDialog) { }
  ngOnInit() {
    this.getQuery()
    this.initializeLastRepRapport()
    this.addService.generatedatafromquery().subscribe(
      (response:any) => {
        // Process the received data
        this.data = response;
        // Determine chart type from data
      //  this.chartType = this.data[0]?.type_chart || 'column'; // Default to 'column' if type_chart is not available
        // Render chart
        this.renderChart();
      //  console.log(this.data.map((item: any) => Object.values(item)));
        
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }
  getQuery() {
    this.addService.generatereport().subscribe((data: any) => {
      this.query = data;
      console.log(this.query)
    });
  }
  copyQuery() {
    const textarea = document.createElement('textarea');
    textarea.value = this.query;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
  }
  onCancel(): void {
    this.dialog.closeAll();
  }
//   renderChart(): void {
//     this.addService.generatedatafromquery().subscribe((data: any[]) => {
//       const categories: any[] = [];
//       const seriesData: any[] = [];
//       const validChartTypes: ('line' | 'column' | 'bar' | 'area' | 'pie' | 'spline' | 'areaspline' | 'scatter' | 'table')[] = ['line', 'column', 'bar', 'area', 'pie', 'spline', 'areaspline', 'scatter', 'table'];
//       let xAxisTitle = ''
//       data.forEach(item => {
//         const key = Object.keys(item)[0]; // Assuming each object has only one key
//         const value = item[key];
//         categories.push(key);
//         seriesData.push(Number(value));
//        xAxisTitle=key
//       });
// console.log('categories',categories)
// console.log('seriesData',seriesData)
// if (validChartTypes.includes(this.chartType as any)){
//       this.chartOptions = {
//         chart: {
//           type: this.chartType,
//           renderTo: 'container'
//         },
//         title: {
//           text: this.title
//         },
//         xAxis: {
//          // categories: categories,
//           title: {
//             text: xAxisTitle
//           }
//         },
//         yAxis: {
//           title: {
//             text: 'Y Axis Title'
//           }
//         },
//         series: [{
//           type: this.chartType as any,
//           name: this.title,
//           data: seriesData.map(item => [item])        
//         }]
//       };
//     }
//       Highcharts.chart('container', this.chartOptions);
//     });
//   }
// renderChart(): void {
//   this.addService.generatedatafromquery().subscribe((data: any[]) => {
//     console.log('Data:', data); // Log the data array to inspect its structure
//     const seriesData: any[] = [];
//     data.forEach(item => {
//       // Assuming each object has keys for xAxis and seriesData
//       const xAxisValueStr = item[Object.keys(item)[0]]; // Assuming the first key is for xAxis
//       const seriesValue = parseFloat(item[Object.keys(item)[1]]); // Assuming the second key is for seriesData
//       // Parse xAxisValue as date
//       const year = parseInt(xAxisValueStr.substr(0, 2), 10) + 2000; // Assuming it's in YYMMDD format
//       const month = parseInt(xAxisValueStr.substr(2, 2), 10) - 1; // Month is zero-based in JavaScript Date object
//       const day = parseInt(xAxisValueStr.substr(4, 2), 10);
//       const xAxisValue = new Date(year, month, day);
//       console.log(xAxisValue);
//       console.log(seriesValue);
//       // Check if xAxisValue is a valid date
//       if (!isNaN(xAxisValue.getTime()) && !isNaN(seriesValue)) {
//         seriesData.push([xAxisValue.getTime(), seriesValue]); // Push both x (as milliseconds) and y values as an array
//       }
//     });
//     console.log('seriesData:', seriesData);
//     // Construct chart options
//     this.chartOptions = {
//       chart: {
//         type: this.chartType,
//         renderTo: 'container'
//       },
//       title: {
//         text: this.title
//       },
//       xAxis: {
//         type: 'datetime', // Set xAxis type to datetime
//         title: {
//           text: 'X Axis Title' // Replace with actual xAxis title
//         }
//       },
//       yAxis: {
//         title: {
//           text: 'Y Axis Title' // Replace with actual yAxis title
//         }
//       },
//       series: [{
//         type: this.chartType as any,
//         name: this.title,
//         data: seriesData
//       }]
//     };
//     // Render the chart
//     Highcharts.chart('container', this.chartOptions);
//   }, error => {
//     console.error('Error fetching data:', error);
//   });
// }
renderChart(): void {
  this.addService.generatedatafromquery().subscribe((data: any[]) => {
    console.log('Data:', data); // Log the data array to inspect its structure
    const seriesData: any[] = [];

    data.forEach(item => {
      let xAxisValue: Date | undefined;
      let seriesValue: number | undefined;

      // Iterate through keys to find the key containing the date value
      const keys = Object.keys(item);
      let dateKeyIndex = -1;
      keys.forEach((key, index) => {
        if (this.isDateKey(item[key])) {
          dateKeyIndex = index;
        }
      });

      // If a date key is found, use it as the xAxis value
      if (dateKeyIndex !== -1) {
        xAxisValue = this.parseXAxisValue(item[keys[dateKeyIndex]]);
        seriesValue = parseFloat(item[keys[dateKeyIndex === 0 ? 1 : 0]]);
      }

      console.log(xAxisValue);
      console.log(seriesValue);
      
      // Check if xAxisValue is a valid date and seriesValue is defined
      if (xAxisValue && !isNaN(xAxisValue.getTime()) && seriesValue !== undefined) {
        seriesData.push([xAxisValue.getTime(), seriesValue]); // Push both x (as milliseconds) and y values as an array
      }
    });

    console.log('seriesData:', seriesData);

    // Construct chart options
    this.chartOptions = {
      chart: {
        type: this.chartType,
        renderTo: 'container'
      },
      title: {
        text: this.title
      },
      xAxis: {
        type: 'datetime', // Set xAxis type to datetime
        
      },
      yAxis: {
        title: {
        //  text: this.field_reporting // Replace with actual yAxis title
        }
      },
    
      series: [{
        type: this.chartType as any,
        name: this.title,
        data: seriesData
      }]
    };

    // Render the chart
    Highcharts.chart('container', this.chartOptions);
  }, error => {
    console.error('Error fetching data:', error);
  });
}
// Function to check if a value is a valid date
isDateKey(value: any): boolean {
  return value instanceof Date || !isNaN(Date.parse(value));
}
// Function to parse xAxisValue
parseXAxisValue(value: any): Date | undefined {
  if (value instanceof Date) {
    return value;
  } else if (typeof value === 'string') {
    // Assuming the date value is in YYMMDD format
    const year = parseInt(value.substr(0, 2), 10) + 2000;
    const month = parseInt(value.substr(2, 2), 10) - 1; // Month is zero-based in JavaScript Date object
    const day = parseInt(value.substr(4, 2), 10);
    return new Date(year, month, day);
  }
  return undefined;
}
  title:any
  initializeLastRepRapport(){
    this.addService.initializeLastRepRapport().subscribe((data:any)=>{
      this.chartType=data.chartType
      this.title=data.title
    })
  }
}