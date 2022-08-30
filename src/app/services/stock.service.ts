import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { envConfig } from 'envConfig';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class StockService {
  constructor(private http: HttpClient, private auth: AuthService) {}

  buyStock(ticker: string, amount: number) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.auth.getToken()}`,
    });
    this.http
      .post(
        envConfig.baseUrl + 'stocks/buy',
        { ticker: ticker, amount: amount },
        { headers: headers }
      )
      .subscribe((data) => {
        console.log(data);
      });
  }

  sellStock(ticker: string, amount: number) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.auth.getToken()}`,
    });
    this.http
      .post(
        envConfig.baseUrl + 'stocks/sell',
        { ticker: ticker, amount: amount },
        { headers: headers }
      )
      .subscribe((data) => {
        console.log(data);
      });
  }
}
