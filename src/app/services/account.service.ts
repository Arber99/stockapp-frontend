import { Injectable } from '@angular/core';
import { envConfig } from 'envConfig';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private router: Router
  ) {}

  userData = new Subject<any>();
  isAuthorized = new Subject<any>();
  cash = new Subject<any>();
  stocks = new Subject<any>();

  _userData = '';
  _isAuthorized = false;
  _cash = 0;
  _stocks: Record<string, string | number>[] = [];

  async signUp(dto: any) {
    await this.http
      .post<any>(envConfig.baseUrl + 'auth/signup', dto)
      .subscribe((data) => {
        this.auth.setToken('access_token', data.access_token);
        this.getUserData();
        this.getStockData();
        this.router.navigate(['/']);
      });
  }

  async logIn(dto: any) {
    await this.http
      .post<any>(envConfig.baseUrl + 'auth/signin', dto)
      .subscribe((data) => {
        this.auth.setToken('access_token', data.access_token);
        this.getUserData();
        this.getStockData();
        this.router.navigate(['/']);
      });
  }

  logout() {
    this.auth.flushToken();
    this.setUserId('');
    this.setIsAuthorized(false);
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
          this.setUserId(data.firstName);
          this.setCash(data.cash);
          this.setIsAuthorized(true);
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
          this.setStocks(data);
        },
        error: (error) => {
          console.warn('Your user token has expired, please login again.');
          this.auth.flushToken();
        },
      });
  }

  setUserId(name: string) {
    this.userData.next(name);
    this._userData = name;
  }

  setIsAuthorized(isAuthorized: boolean) {
    this.isAuthorized.next(isAuthorized);
    this._isAuthorized = isAuthorized;
  }

  setCash(cash: number) {
    this.cash.next(cash);
    this._cash = cash;
  }

  setStocks(stocks: Record<string, string | number>[]) {
    this.stocks.next(stocks);
    this._stocks = stocks;
  }

  getIsAuthorized() {
    return this._isAuthorized;
  }

  getUserId() {
    return this._userData;
  }

  getCash() {
    return this._cash;
  }

  getStocks() {
    return this._stocks;
  }
}
