import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AccountService } from 'src/app/services/account.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'page-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountPage implements OnInit {
  constructor(private account: AccountService, private auth: AuthService, private router: Router) {}

  nameSubscription: Subscription = new Subscription();
  emailSubscription: Subscription = new Subscription();

  isDelete: boolean = false;
  name: string = '';
  email: string = '';

  ngOnInit() {
    if (!this.auth.isExpired()) {
      this.account.getUserData();
      this.nameSubscription = this.account.name.subscribe((data) => {
        this.name = data;
      });
      this.emailSubscription = this.account.email.subscribe((data) => {
        this.email = data;
      });
    }
    else {
      this.router.navigate(['/login']);
    }
  }

  ngOnDestroy() {
    this.nameSubscription.unsubscribe();
    this.emailSubscription.unsubscribe();
  }

  deleteAccount() {
    this.account.deleteUser();
    this.router.navigateByUrl('/');
  }

  deletePopup() {
    this.isDelete = true;
  }
}
