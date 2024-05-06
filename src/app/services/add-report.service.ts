import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RepRapportX } from '../components/steps/models/rep_rapports_x';
import { rapport } from '../components/steps/models/rapport';

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
    flow: [] as any[],
    rep_rapport: {} as rapport,
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
    return this.httpClient.get<any>(`${this.recAPi}/statflows`);
  }

  public getChartData(reportInfo: any): Observable<any> {
    const { flow, ...modifiedReportInfo } = reportInfo;
    return this.httpClient.post<any>(
      `${this.api}/rapport/getData`,
      modifiedReportInfo
    );
  }

  public getQuery(reportInfo: any): Observable<any> {
    const { flow, ...modifiedReportInfo } = reportInfo;
    return this.httpClient.post<any>(
      `${this.api}/rapport/query`,
      modifiedReportInfo
    );
  }

  public saveReport(reportInfo: any): Observable<any> {
    const { flow, ...modifiedReportInfo } = reportInfo;
    return this.httpClient.post<any>(
      'http://localhost/reporting/rapport/add',
      modifiedReportInfo
    );
  }

  assignReport(parentId: number, subReportId: number): Observable<any> {
    const url = 'http://localhost:8080/reporting/rapport/assignReport';
    const body = new FormData();
    body.append('parentId', parentId.toString());
    body.append('subReportId', subReportId.toString());

    // You can add headers if needed
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
      }),
    };

    return this.httpClient.post<any>(url, body, httpOptions);
  }
}
