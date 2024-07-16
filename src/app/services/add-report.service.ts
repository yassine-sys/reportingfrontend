import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, catchError, throwError } from 'rxjs';
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

  // report = {
  //   report_type: '',
  //   flow: [] as any[],
  //   fileds :[] as any [],
  //   rep_rapport: {} as rapport,
  //   rep_rapports_x: [] as RepRapportX[],
  // };

  private reportComplete = new Subject<any>();
  reportComplete$ = this.reportComplete.asObservable();

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

  assignReport(reportData: any): Observable<any>{
    return this.httpClient.post('http://localhost:8080/reporting/rapport/assignReport', reportData,{ responseType: 'text' });
  }

  generatereport(){
    return this.httpClient.get('http://localhost:8080/reporting/rapport/generateQuery',{ responseType: 'text' })
  }

  generatedatafromquery(): Observable<any[]>{
    return this.httpClient.get<any[]>('http://localhost:8080/reporting/rapport/generateData')
  }

  saveDetailedReport(reportInfo: any): Observable<string> {
    return this.httpClient.post('http://localhost:8080/reporting/rapport/savedetailledreport', reportInfo, { responseType: 'text' });
  }
  initializeLastRepRapport(): Observable<any> {
    return this.httpClient.get('http://localhost:8080/reporting/rapport/initializeLastRepRapport');
  }
  loadReports(): Observable<any> {
    return this.httpClient.get('http://localhost:8080/reporting/rapport/list');
  }
  getReportFields(reportId: any): Observable<any> {
    return this.httpClient.get(`http://localhost:8080/reporting/rapport/rapport_fields/${reportId}`);
  }
  generatetestQuery(repRapportsXList: any[]): Observable<string> {
    const requestBody = { repRapportsXList };
    return this.httpClient.post('http://localhost:8080/reporting/rapport/generatetestQuery', requestBody, { responseType: 'text' });
  }
  // public generatetestQuery(reportInfo: any): Observable<any> {
  //   const { flow, ...modifiedReportInfo } = reportInfo;
  //   return this.httpClient.post<any>('http://localhost:8080/reporting/rapport/generatetestQuery',      modifiedReportInfo)
  //   ;
  // }
  generateReport(reportDTO: any): Observable<any> {
    const headers = { 'Content-Type': 'application/json' }; // Specify content type
    return this.httpClient.post('http://localhost:8080/reporting/rapport/generatereport', reportDTO, { headers });
  }

  public generateReports(reportInfo: any): Observable<any> {
    const { flow, ...modifiedReportInfo } = reportInfo;
    return this.httpClient.post<any>(
      'http://localhost:8080/reporting/rapport/generatereport',
      modifiedReportInfo
    );
  }






  report = {
    report_type: '', 
    flow: [] as any[], 
    flows: [] as any[],
    fields: [] as any[],
    rep_rapport: {} as rapport,
    rep_rapports_x: [] as RepRapportX[],
    filtre: { myfiltre: '' },  
  
  };


  // private reportComplete = new Subject<any>();
  // reportComplete$ = this.reportComplete.asObservable();

  getReportInformation() {
    return this.report;
    
  }

  setReportInformation(reportInformation: any) {
    this.report = reportInformation;
  }

  complete() {
    this.reportComplete.next(this.report);
  }

  getTablesInSchema(tableref: string): Observable<string[]> {
    const url = `http://localhost:8080/reporting/tables/${tableref}`;
    return this.httpClient.get<string[]>(url);
  }
  
  getTablesCols(tableref: string ,tableName: string): Observable<string[]> {
    return this.httpClient.get<string[]>(`http://localhost:8080/reporting/tables/cols/${tableref}/${tableName}`);
  }

  // getColsdata(tableref: string, tableName: string, colName: string): Observable<string[]> {
  //   const url = `http://localhost:8080/reporting/tables/colsdata/${tableref}/${tableName}/${colName}`;
  //   return this.httpClient.get<string[]>(url);
  // }
  
  getOtherTablesCols(tableref: string ,tableName: string): Observable<string[]> {
    return this.httpClient.get<string[]>(`http://localhost:8080/reporting/tables/othercols/${tableref}/${tableName}`);
  }

  
  public getFlows(): Observable<any> {
    return this.httpClient.get<any>(`${this.recAPi}/flows`);
  }

  public getFlowsForDetails(): Observable<any> {
    return this.httpClient.get<any>(`${this.recAPi}/partialStat`);
  }


  public getChartData(reportInfo: any): Observable<any> {
    const { flow, ...modifiedReportInfo } = reportInfo;
    return this.httpClient.post<any>(
      `http://localhost:8080/reporting/rapport/getDataC`,
      modifiedReportInfo
    );
  }

  public getQueryCustomize(reportInfo: any): Observable<any> {
    const { flow, ...modifiedReportInfo } = reportInfo;
    return this.httpClient.post<any>(
      `http://localhost:8080/reporting/rapport/queryC`,
      modifiedReportInfo
    );
  }
  public saveReportCustomize(reportInfo: any): Observable<any> {
    const { flow, ...modifiedReportInfo } = reportInfo;
    return this.httpClient.post<any>(
      'http://localhost:8080/reporting/rapport/addC',
      modifiedReportInfo
    ).pipe(
      catchError((error: any) => {
        let errorMessage = 'An error occurred';
        if (error.error && error.error.error) {
          errorMessage = error.error.error;
        }
        console.error('Error saving report:', errorMessage);
        return throwError(errorMessage);
      })
    );
  }
}
