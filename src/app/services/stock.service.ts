import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { envConfig } from 'envConfig';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class StockService {
  constructor(private http: HttpClient, private auth: AuthService) {}

  buyStock(ticker: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.auth.getToken()}`,
    });
    this.http
      .post(
        envConfig.baseUrl + 'stocks',
        { ticker: ticker, amount: 1 },
        { headers: headers }
      )
      .subscribe((data) => {
        console.log(data);
      });
  }
}
