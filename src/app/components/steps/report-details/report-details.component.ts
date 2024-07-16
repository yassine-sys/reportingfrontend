import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AddReportService } from 'src/app/services/add-report.service';
import { QuerymodalComponent } from '../querymodal/querymodal.component';
import { MatDialog } from '@angular/material/dialog';

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
  selectedDate: Date;
  constructor(
    private router: Router,
    private http: HttpClient,
    private addService: AddReportService,private dialog: MatDialog
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
        filtre:repRapportX.filtre,
        field_name: repRapportX.field_name,
        field_reporting: repRapportX.field_reporting,
        operation: repRapportX.operation,
      };
    });
    console.log('rows:', this.rows);
  }

  // confirmReport() {

  //   const formattedDate = this.formatDate(this.selectedDate);
  //   this.raportInfo.rep_rapports_x = this.raportInfo.rep_rapports_x.map((entry:any) => ({
  //     ...entry,
  //     table_rep: entry.table_rep + formattedDate
  //   }));
  //   // Send HTTP POST request to the backend API
  //   this.addService.saveDetailedReport(this.reportInfo)
  //     .subscribe(
  //       (response) => {
  //         // Handle success response
  //         console.log('Report saved successfully:', response);
  //         // Optionally, navigate to a success page
  //       },
  //       (error) => {
  //         // Handle error response
  //         console.error('Failed to save report:', error);
  //         // Optionally, display an error message
  //       }
  //     );
  //   this.router.navigate(['/dashboard/steps/listdetailledreport']);
  // }

  confirmReport(): void {
    if (!this.selectedDate) {
      console.error('Please select a date.'); // Handle this case as needed
      return;
    }

    const formattedDate = this.formatDate(this.selectedDate);
    this.reportInfo.rep_rapports_x = this.reportInfo.rep_rapports_x.map((entry: any) => {
      // Ensure table_rep is not null or undefined
      const tableRep = entry.table_rep ? entry.table_rep + formattedDate : ''; 
      const field_name=entry.field_name
      console.log('field_name' ,field_name)
      return {
        ...entry,
        table_rep: tableRep,
        field_name: field_name, // Ensure field_name is not null or undefined
        field_reporting: entry.field_reporting || '' // Ensure field_reporting is not null or undefined
      };
    });

    console.log('Modified reportInfo:', this.reportInfo);

    this.addService.generatetestQuery(this.reportInfo.rep_rapports_x).subscribe(
      (query) => {
        console.log('Generated query:', query);
      //  this.openQueryModal(query);
      this.navigateToQueryPage(query);
      },
      (error) => {
        console.error('Failed to generate query:', error);
      }
    );
  }
navigateToQueryPage(query: string): void {
  this.router.navigate(['/dashboard/steps/queryreport'], { queryParams: { query: encodeURIComponent(query) } });
}


  openQueryModal(query: string): void {
    this.dialog.open(QuerymodalComponent, {
      data: { query },
    });
  }
  formatDate(date: Date): string {
    // Format date as YYMMDD
    const year = date.getFullYear().toString().slice(-2);
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return year + month + day;
  }
  adjustCalendarPosition() {
    setTimeout(() => {
      const calendarElement = document.querySelector('.centered-calendar .p-datepicker') as HTMLElement;
      if (calendarElement) {
        const viewportHeight = window.innerHeight;
        const calendarHeight = calendarElement.clientHeight;
        const topOffset = (viewportHeight - calendarHeight) / 2;
        calendarElement.style.top = `${topOffset}px`;
      }
    }, 0);
  }

  ngAfterViewInit(): void {
    this.adjustCalendarPosition();
  }

  
}
