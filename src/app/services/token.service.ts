import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

const jwtHelper = new JwtHelperService();

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  constructor(private router: Router) {}

  isExpired() {
    const token = localStorage.getItem('access_token')?.toString();
    if (jwtHelper.isTokenExpired(token)) {
      this.router.navigate(['/login']);
    } else {
      return;
    }
  }
}
