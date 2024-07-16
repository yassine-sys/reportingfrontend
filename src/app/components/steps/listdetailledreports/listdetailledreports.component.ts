import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AssigndialogComponent } from '../assigndialog/assigndialog.component';
import { ShowreportComponent } from '../showreport/showreport.component';
import { AddReportService } from 'src/app/services/add-report.service';

@Component({
  selector: 'app-listdetailledreports',
  templateUrl: './listdetailledreports.component.html',
  styleUrl: './listdetailledreports.component.css'
})
export class ListdetailledreportsComponent  implements OnInit{
  reports:any

  constructor(private router: Router, private http: HttpClient,private dialog:MatDialog, private addService: AddReportService) { }


  ngOnInit(): void {
    this.loadReports();
  }

  loadReports() {
    return this.addService.loadReports().subscribe(reports => {
      this.reports = reports;
    });
  }
openDialog(): void {
  const dialogRef = this.dialog.open(AssigndialogComponent, {
    width: '600px',
    height: '600px',
   
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
  });
}


showreport(): void {
  const dialogRef = this.dialog.open(ShowreportComponent, {
    width: '1000px', // Set the width to auto
    height: '600px', // Set the height to auto
   
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
  });
}


}
