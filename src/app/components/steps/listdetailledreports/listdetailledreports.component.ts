import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AssigndialogComponent } from '../assigndialog/assigndialog.component';

@Component({
  selector: 'app-listdetailledreports',
  templateUrl: './listdetailledreports.component.html',
  styleUrl: './listdetailledreports.component.css'
})
export class ListdetailledreportsComponent  implements OnInit{
  reports:any

  constructor(private router: Router, private http: HttpClient,private dialog:MatDialog) { }


  ngOnInit(): void {
    this.loadReports();
  }

  loadReports() {
    return this.http.get('http://localhost:8080/reporting/rapport/listdetailled') .subscribe(reports => {
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


}
