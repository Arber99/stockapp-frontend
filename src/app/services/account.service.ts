import { Injectable } from '@angular/core';
import { envConfig } from 'envConfig';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private router: Router
  ) {}

  name = new BehaviorSubject<any>('');
  isAuthorized = new BehaviorSubject<any>(false);
  email = new BehaviorSubject<any>('');
  cash = new Subject<any>();
  stocks = new Subject<any>();

  async signUp(dto: any) {
    await this.http
      .post<any>(envConfig.baseUrl + 'auth/signup', dto)
      .subscribe((data) => {
        this.redirectDashboard(data.access_token);
      });
  }

  async logIn(dto: any) {
    await this.http
      .post<any>(envConfig.baseUrl + 'auth/signin', dto)
      .subscribe((data) => {
        this.redirectDashboard(data.access_token);
      });
  }

  async redirectDashboard(token: string) {
    this.auth.setToken('access_token', token);
    this.router.navigate(['/dashboard']);
  }

  logout() {
    this.auth.flushToken();
    this.isAuthorized.next(false);
    this.router.navigate(['/']);
  }

  getUserData() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.auth.getToken()}`,
    });
    this.http
      .get(envConfig.baseUrl + 'users/me', { headers: headers })
      .subscribe({
        next: (data: any) => {
          this.name.next(data.firstName);
          this.cash.next(data.cash);
          this.email.next(data.email);
          this.isAuthorized.next(true);
        },
        error: (error) => {
          console.warn('Your user token has expired, please login again.');
          this.auth.flushToken();
        },
      });
  }

  getStockData() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.auth.getToken()}`,
    });
    this.http
      .get(envConfig.baseUrl + 'stocks', { headers: headers })
      .subscribe({
        next: (data: any) => {
          this.stocks.next(data);
        },
        error: () => {
          console.warn('Your user token has expired, please login again.');
          this.auth.flushToken();
        },
      });
  }

  deleteUser() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.auth.getToken()}`,
    });
    this.http
      .delete(envConfig.baseUrl + 'users/delete', { headers: headers })
      .subscribe({
        next: (data: any) => {
          this.isAuthorized.next(false);
          this.auth.flushToken();
        },
        error: (error) => {
          console.warn('Could not delete non existing user.');
          this.auth.flushToken();
        },
      });
  }
}
