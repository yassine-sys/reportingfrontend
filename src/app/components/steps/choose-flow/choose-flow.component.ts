import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AddReportService } from 'src/app/services/add-report.service';

@Component({
  selector: 'app-choose-flow',
  templateUrl: './choose-flow.component.html',
  styleUrl: './choose-flow.component.css',
})
export class ChooseFlowComponent implements OnInit {
  info: any;
  submitted: boolean = false;
  flows: any[] = []; // Array to hold flows
  selectedFlow: any[] = []; // Variable to hold selected flow
  selectedReportType: any;
  reportTypes: any[] = [
    { id: 1, name: 'Normal Report' },
    { id: 2, name: 'Custom Report' },
    { id: 3, name: 'Detailled Report' },
  ];
  selectedDate: Date;
  constructor(public addService: AddReportService, private router: Router) {}

  ngOnInit() {
    this.info = this.addService.getReportInformation();
    this.loadFlows();
  }


  loadFlows() {
    if (this.selectedReportType && this.selectedReportType.name === 'Detailled Report') {
      this.addService.getFlowsForDetails().subscribe((data) => {
        this.flows = data;
      });
    } else {
      this.addService.getFlows().subscribe((data) => {
        this.flows = data;
      });
    }
  }

  onReportTypeChange() {
    this.loadFlows(); // Reload flows based on the selected report type
  }

  nextPage() {
    if (this.selectedReportType && this.selectedFlow) {
      this.addService.report.report_type = this.selectedReportType.id;
      this.addService.report.flow = this.selectedFlow;
      if (this.selectedReportType.name === 'Normal Report') {
        this.router.navigate(['/dashboard/steps/fields']);
      } else {
      if (this.selectedReportType.name === 'Detailled Report') {
        this.router.navigate(['/dashboard/steps/detailledfields']);
      } else {
        if (this.selectedReportType.name === 'Custom Report') {
          this.router.navigate(['/dashboard/steps/custom']);
        } else {
        this.router.navigate(['/dashboard/steps/fields']);
      }}
      return;
    }

    this.submitted = true;
  }
  }
 
}
