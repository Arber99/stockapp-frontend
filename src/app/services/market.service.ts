import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, interval, Subject, timeout } from 'rxjs';
import { AuthService } from './auth.service';
import { envConfig } from 'envConfig';

@Injectable({
  providedIn: 'root',
})
export class MarketService {
  constructor(private auth: AuthService, private http: HttpClient) {}

  market: Subject<any> = new Subject();
  status: BehaviorSubject<boolean> = new BehaviorSubject(false);
  marketLoaded: BehaviorSubject<boolean> = new BehaviorSubject(true);

  getMarketData() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.auth.getToken()}`,
    });
    return interval(60000).subscribe(() => {
      this.http
        .get(envConfig.baseUrl + 'market', { headers: headers })
        .pipe(timeout(15000))
        .subscribe({
          next: (data: any) => {
            this.market.next(data.marketData);
          },
          error: (error) => {
            console.warn('Could not load market data.');
            if (this.auth.isExpired()) {
              this.auth.flushToken();
            }
          },
        });
    });
  }

  initMarketData() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.auth.getToken()}`,
    });
    this.marketLoaded.next(false);
    this.http
      .get(envConfig.baseUrl + 'market', { headers: headers })
      .subscribe({
        next: (data: any) => {
          this.market.next(data.marketData);
          this.status.next(data.marketStatus);
          this.marketLoaded.next(true);
        },
        error: (error) => {
          console.warn('Could not load market data.');
          if (this.auth.isExpired()) {
            this.auth.flushToken();
          }
          this.marketLoaded.next(true);
        },
      });
  }
}
