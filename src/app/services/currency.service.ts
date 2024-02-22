import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CurrencyService {
  //apiUrl = 'http://api.forexapi.eu/v2';
  apiUrl = environment.apiUrl;
  apikey = '1C6sgeudZnSHZwoP9UXFmC';

  constructor(private http: HttpClient) {}

  public getAllCurrenciesLocal(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/currency/`);
  }

  public convertCurrencyLocal(
    from: any,
    to: any,
    amount: any
  ): Observable<any> {
    return this.http.get<any>(
      `${this.apiUrl}/currency/changeRate/${from}/${to}/${amount}`
    );
  }

  public getAllCurrencies(): Observable<any> {
    return this.http.get<any>(
      `${this.apiUrl}/currencies?apikey=${this.apikey}`
    );
  }

  public convertCurrency(amount: any, to: any): Observable<any> {
    return this.http.get<any>(
      `${this.apiUrl}/convert?amount=${amount}&from=LYD&to=${to}&&format=json&apikey=${this.apikey}`
    );
  }
}
