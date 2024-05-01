import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { AddReportService } from 'src/app/services/add-report.service';

@Component({
  selector: 'app-steps',
  templateUrl: './steps.component.html',
  styleUrl: './steps.component.css',
})
export class StepsComponent implements OnInit {
  items: MenuItem[];
  subscription: Subscription;

  constructor(public addService: AddReportService) {}

  ngOnInit(): void {
    this.items = [
      {
        label: 'Choose Flow',
        routerLink: 'choose-flow',
      },
      {
        label: 'Report Axis',
        routerLink: 'fields',
      },
      {
        label: 'Report Informations',
        routerLink: 'report-info',
      },
      {
        label: 'Confirmation',
        routerLink: 'f',
      },
    ];

    this.subscription = this.addService.reportComplete$.subscribe((info) => {});
  }
}
