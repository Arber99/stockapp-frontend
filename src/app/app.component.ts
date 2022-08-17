import { Component, OnInit } from '@angular/core';
import { AccountService } from './services/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'stockapp-frontend';

  constructor(private account: AccountService) {
    if (localStorage.getItem('access_token')) {
      this.account.getUserData();
    }
  }

}
