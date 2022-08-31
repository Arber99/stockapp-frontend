import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { envConfig } from 'envConfig';
import { ReplaySubject } from 'rxjs';

export type History = {
  amount: number,
  createdAt: Date,
  id: number,
  price: number,
  ticker: string,
  type: string,
  userId: number,
}
@Injectable({
  providedIn: 'root',
})
export class HistoryService {
  constructor(private auth: AuthService, private http: HttpClient) {}

  history: ReplaySubject<any>=new ReplaySubject(); 

  async getHistory() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.auth.getToken()}`,
    });
    
    await this.http
      .get(envConfig.baseUrl + 'history', { headers: headers })
      .subscribe((data) => {
        this.history.next(data)
      });
    return history;
  }
}
