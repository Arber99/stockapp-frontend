import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'page-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  constructor(private account: AccountService) {}

  ngOnInit(): void {}
  signUpForm = new FormGroup({
    firstName: new FormControl(),
    email: new FormControl(),
    password: new FormControl(),
  });

  onClickSubmit() {
    this.account.signUp(this.signUpForm.value)
  }
}