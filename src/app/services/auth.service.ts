import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AccountService } from './account.service';

const jwtHelper = new JwtHelperService();

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  setToken(key: string, value: string) {
    this.flushToken();
    localStorage.setItem(key, value);
  }

  getToken() {
    return localStorage.getItem('access_token');
  }

  flushToken() {
    localStorage.setItem('access_token', '');
  }

  isExpired() {
    const token = localStorage.getItem('access_token');
    if (token !== null && token?.length !== 0) {
      if (!jwtHelper.isTokenExpired(token)) {
        return false;
      }
    }
    return true;
  }
}
