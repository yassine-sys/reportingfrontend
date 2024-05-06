import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AddReportService } from 'src/app/services/add-report.service';

@Component({
  selector: 'app-report-details',
  templateUrl: './report-details.component.html',
  styleUrl: './report-details.component.css',
})
export class ReportDetailsComponent implements OnInit {
  reportInfo: any; // Declare a variable to store report information
  cols: any[];
  rows: any[];
  raportInfo: any;
  constructor(
    private router: Router,
    private http: HttpClient,
    private addService: AddReportService
  ) {}
  toggleNestedTable(rowData: any) {}

  showNestedTable: boolean = false;
  ngOnInit(): void {
    this.raportInfo = {
      rep_rapport: this.addService.report.rep_rapport,
      rep_rapports_x: this.addService.report.rep_rapports_x,
    };
    // Retrieve report information from AddReportService
    this.reportInfo = this.addService.getReportInformation();

    this.cols = [
      { field: this.addService.report.rep_rapport.name, header: 'Name' },
      { field: this.addService.report.rep_rapport.title, header: 'Title' },
      {
        field: this.addService.report.rep_rapport.chart_type,
        header: 'Chart Type',
      },
      // Add more columns as needed
    ];

    this.rows = this.addService.report.rep_rapports_x.map((repRapportX) => {
      return {
        field_name: repRapportX.field_name,
        field_reporting: repRapportX.field_reporting,
        operation: repRapportX.operation,
      };
    });
    console.log('cols:', this.cols);
  }

  confirmReport() {
    // Send HTTP POST request to the backend API
    this.http
      .post(
        'http://localhost:8080/reporting/rapport/savedetailledreport',
        this.raportInfo,
        { responseType: 'text' }
      )
      .subscribe(
        (response) => {
          // Handle success response
          console.log('Report saved successfully:', response);
          // Optionally, navigate to a success page
        },
        (error) => {
          // Handle error response
          console.error('Failed to save report:', error);
          // Optionally, display an error message
        }
      );
    this.router.navigate(['/dashboard/steps/listdetailledreport']);
  }
}
