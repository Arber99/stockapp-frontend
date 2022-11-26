import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AccountService } from 'src/app/services/account.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'page-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss'],
})
export class LogInPage implements OnInit, OnDestroy {
  constructor(
    private account: AccountService,
    private auth: AuthService,
    private router: Router
  ) {}

  $loginLoaded: Subscription = new Subscription();
  loginLoaded = true;

  ngOnInit() {
    this.$loginLoaded = this.account.loginLoaded.subscribe((data: boolean) => {
      this.loginLoaded = data;
    });
    if (!this.auth.isExpired()) {
      this.router.navigate(['dashboard']);
    }
  }

  logInForm = new FormGroup({
    email: new FormControl(),
    password: new FormControl(),
  });

  onClickSubmit() {
    this.account.logIn(this.logInForm.value);
  }

  ngOnDestroy() {
    this.$loginLoaded.unsubscribe();
  }
}
