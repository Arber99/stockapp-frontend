import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { envConfig } from 'envConfig';
import { BehaviorSubject, timeout } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class StockService {
  constructor(private http: HttpClient, private auth: AuthService) {}

  buyLoaded: BehaviorSubject<boolean> = new BehaviorSubject(true);
  sellLoaded: BehaviorSubject<boolean> = new BehaviorSubject(true);

  buyStock(ticker: string, amount: number) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.auth.getToken()}`,
    });
    this.buyLoaded.next(false);
    this.http
      .post(
        envConfig.baseUrl + 'stocks/buy',
        { ticker: ticker, amount: amount },
        { headers: headers }
      )
      .pipe(timeout(15000))
      .subscribe(
        (data) => {
          this.buyLoaded.next(true);
        },
        (error) => {
          this.buyLoaded.next(true);
        }
      );
  }

  sellStock(ticker: string, amount: number) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.auth.getToken()}`,
    });
    this.sellLoaded.next(false);
    this.http
      .post(
        envConfig.baseUrl + 'stocks/sell',
        { ticker: ticker, amount: amount },
        { headers: headers }
      )
      .pipe(timeout(15000))
      .subscribe(
        (data) => {
          this.sellLoaded.next(true);
        },
        (error) => {
          this.sellLoaded.next(true);
        }
      );
  }
}
