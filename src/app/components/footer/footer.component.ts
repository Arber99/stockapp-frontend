import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'comp-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor(private account: AccountService) { }

  isAuthorized: boolean = false;
  authorizedSubscription: Subscription = new Subscription();

  ngOnInit(): void {
    this.authorizedSubscription = this.account.isAuthorized.subscribe(
      (data: boolean) => {
        this.isAuthorized = data;
      }
    );
  }

  ngOnDestroy(): void {
    this.authorizedSubscription.unsubscribe();
  }

}
