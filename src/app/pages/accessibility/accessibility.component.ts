import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-accessibility',
  templateUrl: './accessibility.component.html',
  styleUrls: ['./accessibility.component.scss']
})
export class AccessibilityPage implements OnInit {
  constructor(private auth: AuthService, private account: AccountService) {}

  ngOnInit() {
    if (!this.auth.isExpired()) {
      this.account.getUserData();
    }
  }
}
