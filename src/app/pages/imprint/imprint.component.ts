import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'page-imprint',
  templateUrl: './imprint.component.html',
  styleUrls: ['./imprint.component.scss'],
})
export class ImprintPage implements OnInit {
  constructor(private auth: AuthService, private account: AccountService) {}

  ngOnInit() {
    if (!this.auth.isExpired()) {
      this.account.getUserData();
    }
  }
}
