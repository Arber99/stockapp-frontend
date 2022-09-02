import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { envConfig } from 'envConfig';
import { ReplaySubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChartService {
  constructor(private auth: AuthService, private http: HttpClient) {}

  chart: Subject<any> = new Subject();

  initChartData() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.auth.getToken()}`,
    });
    this.http
      .get(envConfig.baseUrl + 'chart', { headers: headers })
      .subscribe({
        next: (data: any) => {
          this.chart.next(data);
        },
        error: (error) => {
          console.warn('Your user token has expired, please login again.');
          this.chart.error(error);
          this.auth.flushToken();
        },
      });
  }
}
