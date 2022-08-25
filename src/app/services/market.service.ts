import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { interval, startWith, Subject } from 'rxjs';
import { Market } from '../pages/market/market.component';
import { AuthService } from './auth.service';
import { envConfig } from 'envConfig';

@Injectable({
  providedIn: 'root',
})
export class MarketService {
  constructor(private auth: AuthService, private http: HttpClient) {}

  market: Subject<any> = new Subject

  getMarketData() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.auth.getToken()}`,
    });
    return interval(5000)
      .pipe(startWith(0))
      .subscribe(() => {
        this.http
          .get(envConfig.baseUrl + 'market', { headers: headers })
          .subscribe({
            next: (data: any) => {
              this.market.next(data);
            },
          });
        console.log('Hey');
      });
  }
}
