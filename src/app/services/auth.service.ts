import { Injectable } from '@angular/core';

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
    localStorage.clear();
  }
}
