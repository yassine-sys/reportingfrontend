import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AddReportService } from 'src/app/services/add-report.service';
import { HIGHCHARTS_TYPES } from 'src/model/HIGHCHARTS_TYPES';
import { rapport } from '../models/rapport';

@Component({
  selector: 'app-report-info',
  templateUrl: './report-info.component.html',
  styleUrl: './report-info.component.css',
})
export class ReportInfoComponent implements OnInit {
  reportnfo: any;
  highchartsTypes = HIGHCHARTS_TYPES;
  submitted: boolean = false;

  constructor(public addService: AddReportService, private router: Router) {}

  ngOnInit() {
    if (this.addService.report.flow.length == 0) {
      this.router.navigate(['/dashboard/steps/choose-flow']);
    }
    this.reportnfo = this.addService.report.rep_rapport;
  }

  nextPage() {
    if (
      this.reportnfo.name &&
      this.reportnfo.title &&
      this.reportnfo.chart_type
    ) {
      // this.router.navigate(['steps/seat']);
      const rep: rapport = {
        chart_type: this.reportnfo.chart_type.value,
        name: this.reportnfo.name,
        seriessubtitle: '',
        title: this.reportnfo.title,
        fieldrepport_merge: '',
        operetionfieldmerge: '',
        isfieldmerge: false,
        col1: '',
        col2: '',
        table_join: '',
        isjointable: false,
        isycustfield: false,
        iscustomise: false,
        isdetails: false,
        type_flow: '',
        function_id: 0,
        ispercent: false,
        groupebyfield: '',
        limitnumber: 0,
        percent: false,
        isgroupedby: false,
        islimited: false,
        issimplepie: false,
        isoperator: false,
        load: false,
        iscarrier: false,
        isnested: false,
        iscaracter: false,
        isdiff: false,
        hasdetails: false,
        hasdate: false,
      };
      this.addService.report.rep_rapport = rep;
      console.log(this.addService.getReportInformation());
    }

    this.submitted = true;
    this.router.navigate(['/dashboard/steps/confirmation']);
  }

  prevPage() {
    this.router.navigate(['/dashboard/steps/fields']);
  }
}
