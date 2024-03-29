import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'page-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
})
export class HistoryPage implements OnInit {
  constructor(private auth: AuthService, private account: AccountService) {}

  ngOnInit() {
    if (!this.auth.isExpired()) {
      this.account.getUserData();
    }
  }
}
