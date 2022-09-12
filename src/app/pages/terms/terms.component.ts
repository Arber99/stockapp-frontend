import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'page-terms',
  templateUrl: './terms.component.html',
  styleUrls: ['./terms.component.scss']
})
export class TermsPage implements OnInit {
  constructor(private auth: AuthService, private account: AccountService) {}

  ngOnInit() {
    if (!this.auth.isExpired()) {
      this.account.getUserData();
    }
  }
}
