import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AddReportService } from 'src/app/services/add-report.service';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';
import HC_accessibility from 'highcharts/modules/accessibility';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationDialogComponentComponent } from '../../confirmation-dialog-component/confirmation-dialog-component.component';
import { PaginatedTableComponent } from '../../paginated-table/paginated-table.component';

HC_accessibility(Highcharts);
HC_exporting(Highcharts);
@Component({
  selector: 'app-generate-customise',
  templateUrl: './generate-customise.component.html',
  styleUrls: ['./generate-customise.component.css'],
})
export class GenerateCustomiseComponent implements OnInit {
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
  report: any;

  ngOnInit(): void {
    this.fetchChartData();
  }

  getQuery() {
    this.addService.getQueryCustomize (this.addService.report).subscribe((data: any) => {
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
                if (this.chartData.chart_type != 'table') {
                }
            }
        },
        (error: any) => {
            console.error('Error fetching chart data:', error);
            this.errorMessage = error.error ? error.error.errorMessage : 'Unknown error';
        }
    );
}


saveReport() {
  this.addService.saveReportCustomize(this.addService.report).subscribe(
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
    this.router.navigate(['/dashboard/steps/report-info']);
  }
}