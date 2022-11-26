import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { envConfig } from 'envConfig';
import { BehaviorSubject, ReplaySubject, Subject, timeout } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChartService {
  constructor(private auth: AuthService, private http: HttpClient) {}

  chart: Subject<any> = new Subject();
  percentage: BehaviorSubject<number> = new BehaviorSubject(0);
  networth: BehaviorSubject<number> = new BehaviorSubject(0);
  actual: BehaviorSubject<number> = new BehaviorSubject(0);

  initChartData() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.auth.getToken()}`,
    });
    this.http
      .get(envConfig.baseUrl + 'chart', { headers: headers })
      .pipe(timeout(15000))
      .subscribe({
        next: (data: any) => {
          if (data.length > 0) {
            this.chart.next(data);
          }
        },
        error: (error) => {
          console.warn('Could not load chart data.');
          this.chart.error(error);
          if (this.auth.isExpired()) {
            this.auth.flushToken();
          }
        },
      });
  }
}
