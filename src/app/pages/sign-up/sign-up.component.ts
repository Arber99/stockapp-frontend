import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'page-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  constructor(
    private account: AccountService,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    if (!this.auth.isExpired()) {
      this.router.navigate(['dashboard']);
    }
  }

  signUpForm = new FormGroup({
    firstName: new FormControl(),
    email: new FormControl(),
    password: new FormControl(),
  });

  onClickSubmit() {
    this.account.signUp(this.signUpForm.value);
  }
}
