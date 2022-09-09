import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AccountService } from 'src/app/services/account.service';
import { AuthService } from 'src/app/services/auth.service';
import { MarketService } from 'src/app/services/market.service';

export type Market = {
  ticker: string;
  ap: number;
  bp: number;
}[];

@Component({
  selector: 'app-market',
  templateUrl: './market.component.html',
  styleUrls: ['./market.component.scss'],
})
export class MarketComponent implements OnInit, OnDestroy {
  constructor(
    private marketService: MarketService,
    private account: AccountService,
    private auth: AuthService,
    private router: Router) {}

  isTrade: boolean = false;
  trade: any;

  market: Market = [];
  status: boolean = false;
  marketData: Subscription = new Subscription();
  marketList: Subscription = new Subscription();

  ngOnInit(): void {
    if(this.auth.isExpired()) {
      this.router.navigate(['/login']);
      return;
    }

    this.account.getUserData();
    this.account.getStockData();
    this.marketService.initMarketData();

    //Subscriptions
    this.marketData = this.marketService.getMarketData();
    this.marketList = this.marketService.market.subscribe({
      next: (data: any) => {
        this.market = data.marketData;
        this.status = data.marketStatus;
      }
    });
  }

  ngOnDestroy(): void {
    this.marketData.unsubscribe();
    this.marketList.unsubscribe();
  }

  setTrade(market: any) {
    this.trade = market;
    this.isTrade = true;
  }

  disableTrade() {
    this.isTrade = false;
  }
}
