import { Component, HostListener, Input, OnInit } from '@angular/core';
import {
  faCircleInfo,
  faBookOpenReader,
  faBars,
} from '@fortawesome/free-solid-svg-icons';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'comp-navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent implements OnInit {
  constructor(private account: AccountService) {
    this.account.userData.subscribe((data) => {
      this.userId = data;
    })

    this.account.isAuthorized.subscribe((data) => {
      this.isAuthorized = data;
    })
  }

  currentWindowWidth: number = 0;
  faBookOpenReader = faBookOpenReader;
  faCircleInfo = faCircleInfo;
  faBars = faBars;
  isMenu: boolean = false;


  userId = '';
  isAuthorized: boolean = false;

  @Input()
  background = 'bg-white';

  ngOnInit() {
    this.currentWindowWidth = window.innerWidth;
    this.isAuthorized = this.account.getIsAuthorized();
    this.userId = this.account.getUserId();
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
