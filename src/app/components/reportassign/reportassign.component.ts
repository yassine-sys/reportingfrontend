import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AddReportService } from 'src/app/services/add-report.service';

@Component({
  selector: 'app-reportassign',
  templateUrl: './reportassign.component.html',
  styleUrl: './reportassign.component.css'
})
export class ReportassignComponent implements OnInit {
  reportshasdetails: any;
  reports: any[];
  selectedFieldValue: any;
  selectedValue: { label: string, value: number } | null;  // Property to store the selected value from the dropdown
  dropdownOptions = [
    { label: '1', value: 1 },
    { label: '2', value: 2 },
    { label: '3', value: 3 },
    { label: '4', value: 4 },
  ];
  constructor(
    private router: Router,
    private http: HttpClient,
    private dialog: MatDialog,
    private reportService: AddReportService
  ) {}

  ngOnInit(): void {
   // this.loadreportshasdetails();
    this.loadReports();
  }

  // loadreportshasdetails() {
  //   return this.http
  //     .get('http://localhost:8080/reporting/rapport/gethasdetailledreports')
  //     .subscribe((reportshasdetails) => {
  //       this.reportshasdetails = reportshasdetails;
  //     });
  // }

  // loadReports() {
  //   return this.http
  //     .get('http://localhost:8080/reporting/rapport/list')
  //     .subscribe((reports) => {
  //       this.reports = reports;

  //       if (this.selectedIdReport) {
  //         this.reportshasdetails = this.reports.filter((report:any) => report.id !== this.selectedIdReport);
  //       } else {
  //         this.reportshasdetails = this.reports;
  //       }
  //     });
  // }

  loadReports() {

   this.reportService.loadReports()
      .subscribe((reports: any) => {
        // Format reports for parent dropdown
        this.reports = reports.map((report: any) => ({ label: report.name, value: report.id }));
        console.log('Selected parent report ID:', this.selectedIdReport);

        // Format reports for child dropdown
        if (this.selectedIdReport) {
          console.log(this.selectedIdReport)
          this.reportshasdetails = reports.filter((report: any) => report.id !== this.selectedIdReport)
                                            .map((report: any) => ({ label: report.name, value: report.id }));
        } else {
          this.reportshasdetails = this.reports;
        }
      });
  }
  

  selectedReportId: any;
  selectedFields: any;
  onReportChange() {
    this.reportService.getReportFields(this.selectedReportId).subscribe(
      (fields: any) => {
        this.selectedFields = fields;
      },
      (error) => {
        console.error('Failed to load report fields:', error);
        // Optionally, display an error message
      }
    );
  }
  // onReportChange() {
  //   this.http
  //     .get(
  //       `http://localhost:8080/reporting/rapport/rapport_fields/${this.selectedReportId}`
  //     )
  //     .subscribe((fields) => {
  //       this.selectedFields = fields;
  //     });
  // }

  selectedIdReport: any;
  selectedFields2: any;
  onReportChange2() {
    this.loadReports();
    this.reportService.getReportFields(this.selectedIdReport)
    // this.http
    //   .get(
    //     `http://localhost:8080/reporting/rapport/rapport_fields/${this.selectedIdReport}`
    //   )
      .subscribe((fields2) => {
        this.selectedFields2 = fields2;
      });
  }

  onCancel(): void {
    // Clear all fields
    this.selectedFieldValue = null;
    this.selectedValue = null;
    this.selectedReportId = null;
    this.selectedFields = null;
    this.selectedIdReport = null;
    this.selectedFields2 = null;
    this.reportshasdetails = [];
    this.reports = [];
  }

  onSave(): void {

    const wherefield = this.selectedFields.map((field:any) => field.field_name).join(', '); // Assuming 'field_name' is the property you want
    const wherefieldreppere = this.selectedFields2.map((field:any) => field.field_name).join(', '); // Assuming 'field_name' is the property you want
  
    
    const reportData = {
      parentId: this.selectedIdReport,
      subReportId: this.selectedReportId,
      level: this.selectedValue ? this.selectedValue.value : null,
             wherefield: wherefield, // Assuming these are strings, adjust as needed
      wherefieldreppere: wherefieldreppere // Assuming these are strings, adjust as needed
    };
console.log(this.selectedValue)
    this.reportService.assignReport(reportData)
      .subscribe(
        response => {
          console.log('Report assigned successfully:', response);
          this.dialog.closeAll();
          // Handle success response
        },
        error => {
          console.error('Failed to assign report:', error);
          // Handle error response
        }
      );
  }
}
