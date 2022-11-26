import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { envConfig } from 'envConfig';
import { BehaviorSubject, Subject, timeout } from 'rxjs';

export type History = {
  amount: number;
  createdAt: Date;
  id: number;
  price: number;
  ticker: string;
  type: string;
  userId: number;
};
@Injectable({
  providedIn: 'root',
})
export class HistoryService {
  constructor(private auth: AuthService, private http: HttpClient) {}

  history: Subject<any> = new Subject();
  historyLoaded: BehaviorSubject<boolean> = new BehaviorSubject(true);

  getHistory() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.auth.getToken()}`,
    });
    this.historyLoaded.next(false);
    this.http
      .get(envConfig.baseUrl + 'history', { headers: headers })
      .pipe(timeout(15000))
      .subscribe((data) => {
        this.history.next(data);
        this.historyLoaded.next(true);
      });
    return history;
  }
}
