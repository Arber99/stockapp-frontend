import {
  Component,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { faCircleInfo, faBars } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'comp-navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent implements OnInit, OnDestroy {
  constructor(private account: AccountService) {}

  faCircleInfo = faCircleInfo;
  faBars = faBars;

  currentWindowWidth: number = 0;
  isMenu: boolean = false;

  name = '';
  isAuthorized: boolean = false;
  accountLoaded: boolean = true;

  nameSubscription: Subscription = new Subscription();
  authorizedSubscription: Subscription = new Subscription();

  $accountLoaded: Subscription = new Subscription();

  @Input()
  background = 'bg-white';

  ngOnInit() {
    this.nameSubscription = this.account.name.subscribe((data) => {
      this.name = data;
    });

    this.authorizedSubscription = this.account.isAuthorized.subscribe(
      (data) => {
        this.isAuthorized = data;
      }
    );

    this.$accountLoaded = this.account.accountLoaded.subscribe((data: boolean) => {
      this.accountLoaded = data;
    })

    this.currentWindowWidth = window.innerWidth;
  }

  ngOnDestroy(): void {
    this.nameSubscription.unsubscribe();
    this.authorizedSubscription.unsubscribe();
    this.$accountLoaded.unsubscribe();
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
