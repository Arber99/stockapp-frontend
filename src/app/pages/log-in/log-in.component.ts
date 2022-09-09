import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss'],
})
export class LogInComponent implements OnInit {
  constructor(private account: AccountService, private auth: AuthService, private router: Router) {}

  ngOnInit() {
    if(!this.auth.isExpired()) {
      this.router.navigate(['dashboard'])
    }
  }

  logInForm = new FormGroup({
    email: new FormControl(),
    password: new FormControl(),
  });

  onClickSubmit() {
    this.account.logIn(this.logInForm.value);
  }
}
