import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { interval, Subject } from 'rxjs';
import { AuthService } from './auth.service';
import { envConfig } from 'envConfig';

@Injectable({
  providedIn: 'root',
})
export class MarketService {
  constructor(private auth: AuthService, private http: HttpClient) {}

  market: Subject<any> = new Subject();

  getMarketData() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.auth.getToken()}`,
    });
    return interval(60000).subscribe(() => {
      this.http
        .get(envConfig.baseUrl + 'market', { headers: headers })
        .subscribe({
          next: (data: any) => {
            this.market.next(data);
          },
          error: (error) => {
            console.warn('Your user token has expired, please login again.');
            this.auth.flushToken();
          },
        });
    });
  }

  initMarketData() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.auth.getToken()}`,
    });
    this.http
      .get(envConfig.baseUrl + 'market', { headers: headers })
      .subscribe({
        next: (data: any) => {
          this.market.next(data);
        },
        error: (error) => {
          console.warn('Your user token has expired, please login again.');
          this.auth.flushToken();
        },
      });
  }
}
