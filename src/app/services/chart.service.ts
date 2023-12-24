import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Cdr } from 'src/model/Cdr';
import { CdrMscOcs } from 'src/model/CdrMscOCs';
import { Filters } from 'src/model/Filters';
import { IxInterResp } from 'src/model/IxInterResp';
import { lcrComment } from 'src/model/lcrComment';

@Injectable({
  providedIn: 'root',
})
export class ChartService {
  apiUrl = environment.chartApi;
  api = environment.apiUrl;

  constructor(private http: HttpClient) {}

  public getRepByFunctionId(id: any) {
    return this.http.get(`${this.api}/function/${id}/rep`);
  }

  public getReportsByUserId(userId: any) {
    return this.http.get(`${this.api}/user/reports/${userId}`);
  }

  public getRepById(id: any) {
    const body = new HttpParams().set('id', id).toString();

    const headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
    //console.log(body)
    return this.http.post(`${this.apiUrl}/login/reponly/`, body, { headers });
  }

  public getChart(id: any): Observable<Object> {
    return this.http.get(`${this.apiUrl}/welcome/rep/` + id);
  }

  public getFunctionChart(id: any): Observable<Object> {
    return this.http.get(`${this.apiUrl}/login/rep/` + id);
  }
  public getTestCharts(): Observable<Object> {
    return this.http.get(`${this.apiUrl}/login/rep/`);
  }

  public FilterChart(data: Filters, idRep: any): Observable<any> {
    const body = new HttpParams()
      .set('idrep', idRep)
      .set('startDate', data.startDate)
      .set('endDate', data.endDate)
      .set('type_Filtre', data.type_Filter)
      .set('startHour', data.startHour)
      .set('endHour', data.endHour)
      .toString();

    const headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
    return this.http.post(`${this.apiUrl}/login/repfiltreonly/`, body, {
      headers,
    });
  }
  public getFunctionChartFiltred(data: Filters): Observable<any> {
    const startDate = data.startDate ? new Date(data.startDate) : null;
    const endDate = data.endDate ? new Date(data.endDate) : null;
    const options: Intl.DateTimeFormatOptions = {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    };
    const format = new Intl.DateTimeFormat('en-CA', options).format;
    console.log(data.idfunction);
    const body = new HttpParams()
      .set('idfunction', data.idfunction)
      .set('startDate', data.startDate)
      .set('endDate', data.endDate)
      .set('type_Filtre', data.type_Filter)
      .toString();

    const headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
    //console.log(body)
    return this.http.post(`${this.apiUrl}/login/rep/`, body, { headers });
  }

  public getFunctionChartFiltredPerHour(data: Filters): Observable<any> {
    const startDate = data.startDate ? new Date(data.startDate) : null;
    const endDate = data.endDate ? new Date(data.endDate) : null;
    const options: Intl.DateTimeFormatOptions = {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    };
    const format = new Intl.DateTimeFormat('en-CA', options).format;
    const body = new HttpParams()
      .set('idfunction', data.idfunction.toString())
      .set('startDate', data.startDate)
      .set('endDate', data.endDate)
      .set('type_Filtre', data.type_Filter)
      .set('startHour', data.startHour)
      .set('endHour', data.endHour)
      .toString();

    const headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
    //console.log(body)
    return this.http.post(`${this.apiUrl}/login/rep/`, body, { headers });
  }

  public getFunctionChartVariation(data: Filters): Observable<any> {
    // .set('startDate', startDate ? format(startDate).split('/').reverse().join('-') : '')
    const startDate = data.startDate ? new Date(data.startDate) : null;
    const endDate = data.endDate ? new Date(data.endDate) : null;
    const options: Intl.DateTimeFormatOptions = {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    };
    const format = new Intl.DateTimeFormat('en-CA', options).format;
    const body = new HttpParams()
      .set('idfunction', data.idfunction)
      .set('startDate', data.startDate)
      .set('endDate', data.endDate)
      .set('type_Filtre', data.type_Filter)
      .toString();

    const headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
    return this.http.post(`${this.apiUrl}/login/trunding`, body, { headers });
  }

  public getFunctionChartFiltredForUser(data: Filters): Observable<any> {
    const startDate = data.startDate ? new Date(data.startDate) : null;
    const endDate = data.endDate ? new Date(data.endDate) : null;
    const options: Intl.DateTimeFormatOptions = {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    };
    const format = new Intl.DateTimeFormat('en-CA', options).format;
    const body = new HttpParams()
      .set('idfunction', data.idfunction)
      .set('startDate', data.startDate)
      .set('endDate', data.endDate)
      .set('type_Filtre', data.type_Filter)
      .toString();

    const headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
    console.log('test' + body);
    return this.http.post(`${this.apiUrl}/login/repdash/`, body, { headers });
  }

  public getFunctionChartFiltredForUserPerHours(
    data: Filters
  ): Observable<any> {
    const startDate = data.startDate ? new Date(data.startDate) : null;
    const endDate = data.endDate ? new Date(data.endDate) : null;
    const options: Intl.DateTimeFormatOptions = {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    };
    const format = new Intl.DateTimeFormat('en-CA', options).format;
    const body = new HttpParams()
      .set('idfunction', data.idfunction)
      .set('startDate', data.startDate)
      .set('endDate', data.endDate)
      .set('type_Filtre', data.type_Filter)
      .set('startHour', data.startHour)
      .set('endHour', data.endHour)
      .toString();

    const headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
    return this.http.post(`${this.apiUrl}/login/repdash/`, body, { headers });
  }

  public getFunctionChartVariationForUser(data: Filters): Observable<any> {
    const startDate = data.startDate ? new Date(data.startDate) : null;
    const endDate = data.endDate ? new Date(data.endDate) : null;
    const options: Intl.DateTimeFormatOptions = {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    };
    const format = new Intl.DateTimeFormat('en-CA', options).format;
    const body = new HttpParams()
      .set('idfunction', data.idfunction)
      .set('startDate', data.startDate)
      .set('endDate', data.endDate)
      .set('type_Filtre', data.type_Filter)
      .toString();

    const headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
    return this.http.post(`${this.apiUrl}/login/trundingtodash`, body, {
      headers,
    });
  }

  public getDetails(
    idrep: any,
    date: any,
    startdate: any,
    enddate: any
  ): Observable<any> {
    const body = new HttpParams()
      .set('idrep', idrep)
      .set('date', date)
      .set('startdate', startdate)
      .set('enddate', enddate)
      .toString();

    const headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
    return this.http.post(`${this.apiUrl}/login/rsrReport`, body, { headers });
  }

  public customDetails(
    plantarif: any,
    dest: any,
    comtarif: any,
    apptrif: any,
    begindate: any,
    endDate: any
  ): Observable<any> {
    const body = new HttpParams()
      .set('plantarif', plantarif)
      .set('dest', dest)
      .set('comtarif', comtarif)
      .set('apptrif', apptrif)
      .set('begindate', begindate)
      .set('endDate', endDate)
      .toString();

    const headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
    return this.http.post(`${this.apiUrl}/login/customrep`, body, { headers });
  }

  public getCdrsInfo(): Observable<Cdr> {
    return this.http.get<Cdr>(`${this.api}/cdr/`);
  }

  public getCdrsMSCInfo(): Observable<IxInterResp> {
    return this.http.get<IxInterResp>(`${this.api}/cdr/ix_inter/`);
  }

  public getCdrsMSC(): Observable<CdrMscOcs> {
    return this.http.get<CdrMscOcs>(`${this.api}/cdr/msc_ocs/`);
  }

  public getOperators(): Observable<any> {
    return this.http.get<any>(`${this.api}/operators/`);
  }

  public getOperatorsDest(): Observable<any> {
    return this.http.get<any>(`${this.api}/operators/dest`);
  }

  public getOperatorsInterco(): Observable<any> {
    return this.http.get<any>(`${this.api}/operators/interco`);
  }

  public addComment(lcrComment: lcrComment): Observable<Object> {
    return this.http.post(`${this.api}/lcr/add`, lcrComment);
  }

  public getDailyEtatCollect(): Observable<any> {
    return this.http.get<any>(`${this.api}/cdr/etat-collect/`);
  }

  public getMonthlyEtatCollect(): Observable<any> {
    return this.http.get<any>(`${this.api}/cdr/etat-collect-monthly/`);
  }

  public getEtatCollect(): Observable<any> {
    return this.http.get<any>(`${this.api}/cdr/collect/`);
  }

  public getMissingFiles(): Observable<any> {
    return this.http.get<any>(`${this.api}/cdr/missingFiles/`);
  }

  public getMissingSeq(): Observable<any> {
    return this.http.get<any>(`${this.api}/cdr/missingSequence/`);
  }
}
