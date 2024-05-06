import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AddReportService } from 'src/app/services/add-report.service';

@Component({
  selector: 'app-assigndialog',
  templateUrl: './assigndialog.component.html',
  styleUrl: './assigndialog.component.css',
})
export class AssigndialogComponent implements OnInit {
  reportshasdetails: any;
  reports: any;
  selectedFieldValue: any;
  selectedValue: number; // Property to store the selected value from the dropdown
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
    this.loadreportshasdetails();
    this.loadReports();
  }

  loadreportshasdetails() {
    return this.http
      .get('http://localhost:8080/reporting/rapport/gethasdetailledreports')
      .subscribe((reportshasdetails) => {
        this.reportshasdetails = reportshasdetails;
      });
  }

  loadReports() {
    return this.http
      .get('http://localhost:8080/reporting/rapport/listdetailled')
      .subscribe((reports) => {
        this.reports = reports;
      });
  }

  selectedReportId: any;
  selectedFields: any;
  onReportChange() {
    this.http
      .get(
        `http://localhost:8080/reporting/rapport/rapport_fields/${this.selectedReportId}`
      )
      .subscribe((fields) => {
        this.selectedFields = fields;
      });
  }

  selectedIdReport: any;
  selectedFields2: any;
  onReportChange2() {
    this.http
      .get(
        `http://localhost:8080/reporting/rapport/rapport_fields/${this.selectedIdReport}`
      )
      .subscribe((fields2) => {
        this.selectedFields2 = fields2;
      });
  }

  onCancel(): void {
    this.dialog.closeAll();
  }

  onSave(parentId: number, subReportId: number): void {
    this.reportService.assignReport(parentId, subReportId).subscribe(
      (response) => {
        console.log('Report assigned successfully:', response);
        // Handle success response
      },
      (error) => {
        console.error('Failed to assign report:', error);
        // Handle error response
      }
    );
  }
}
