import { Injectable } from '@angular/core';
import { envConfig } from 'envConfig';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject, timeout } from 'rxjs';
import { environment } from 'src/environments/environment';

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

  accountLoaded = new BehaviorSubject<boolean>(true);
  loginLoaded = new BehaviorSubject<boolean>(true);
  loginFailed = new BehaviorSubject<boolean>(false);

  async signUp(dto: any) {
    await this.http
      .post<any>(environment.api + 'auth/signup', dto)
      .pipe(timeout(15000))
      .subscribe((data) => {
        this.redirectDashboard(data.access_token);
      });
  }

  async logIn(dto: any) {
    this.loginLoaded.next(false);
    await this.http
      .post<any>(environment.api + 'auth/signin', dto)
      .pipe(timeout(15000))
      .subscribe({
        next: (data) => {
          this.redirectDashboard(data.access_token);
          this.loginLoaded.next(true);
        },
        error: (error) => {
          this.loginLoaded.next(true);
          this.loginFailed.next(true);
        },
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
      .get(environment.api + 'users/me', { headers: headers })
      .pipe(timeout(15000))
      .subscribe({
        next: (data: any) => {
          this.name.next(data.firstName);
          this.cash.next(data.cash);
          this.email.next(data.email);
          this.isAuthorized.next(true);
          this.accountLoaded.next(true);
        },
        error: (error) => {
          console.warn('Could not get account data');

          this.auth.flushToken();
          this.isAuthorized.next(false);
          this.accountLoaded.next(true);
        },
      });
  }

  getStockData() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.auth.getToken()}`,
    });
    this.http
      .get(environment.api + 'stocks', { headers: headers })
      .pipe(timeout(15000))
      .subscribe({
        next: (data: any) => {
          this.stocks.next(data);
        },
        error: () => {
          console.warn('Could not load stock data.');
          this.isAuthorized.next(false);
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
      .delete(environment.api + 'users/delete', { headers: headers })
      .pipe(timeout(15000))
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
