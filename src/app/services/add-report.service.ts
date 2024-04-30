import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RepRapportX } from '../components/steps/models/rep_rapports_x';

@Injectable({
  providedIn: 'root',
})
export class AddReportService {
  apiUrl = environment.chartApi;
  api = environment.apiUrl;
  recAPi = environment.recApi;

  constructor(private httpClient: HttpClient) {}

  report = {
    report_type: '',
    flow: [],
    fields: [] as any[],
    rep_rapports_x: [] as RepRapportX[],
  };

  private reportComplete = new Subject<any>();
  reportComplete$ = this.reportComplete.asObservable();

  getReportInformation() {
    return this.report;
  }

  setReportInformation(reportInformation: any) {
    this.report = reportInformation;
  }

  complete() {
    this.reportComplete.next(this.report);
  }

  public getFlows(): Observable<any> {
    return this.httpClient.get<any>(`${this.recAPi}/flows`);
  }
}
