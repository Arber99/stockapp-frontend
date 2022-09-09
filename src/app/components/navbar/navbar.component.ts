import { Component, HostListener, Input, OnDestroy, OnInit } from '@angular/core';
import {
  faCircleInfo,
  faBookOpenReader,
  faBars,
} from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'comp-navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent implements OnInit, OnDestroy {
  
  constructor(private account: AccountService) {}
  
  faBookOpenReader = faBookOpenReader;
  faCircleInfo = faCircleInfo;
  faBars = faBars;

  currentWindowWidth: number = 0;
  isMenu: boolean = false;

  name = '';
  isAuthorized: boolean = false;

  nameSubscription: Subscription = new Subscription;
  authorizedSubscription: Subscription = new Subscription;

  @Input()
  background = 'bg-white';

  ngOnInit() {

    this.nameSubscription = this.account.name.subscribe((data) => {
      this.name = data;
    })

    this.authorizedSubscription = this.account.isAuthorized.subscribe((data) => {
      this.isAuthorized = data;
    })

    this.currentWindowWidth = window.innerWidth;
  }

  ngOnDestroy(): void {
    this.nameSubscription.unsubscribe();
    this.authorizedSubscription.unsubscribe();
  }

  @HostListener('window:resize')
  onResize() {
    this.currentWindowWidth = window.innerWidth;
  }

  onMenu(value: boolean) {
    this.isMenu = !this.isMenu;
  }

  logOut() {
    this.account.logout();
  }
}
