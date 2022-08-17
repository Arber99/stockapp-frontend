import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss'],
})
export class LogInComponent implements OnInit {
  constructor(private account: AccountService) {}

  ngOnInit(): void {}
  logInForm = new FormGroup({
    email: new FormControl(),
    password: new FormControl(),
  });

  onClickSubmit() {
    this.account.logIn(this.logInForm.value);
  }
}
