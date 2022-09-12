import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { dictionary } from 'src/app/dictionary/dictionary';
import { AccountService } from 'src/app/services/account.service';
import { AuthService } from 'src/app/services/auth.service';
import { MarketService } from 'src/app/services/market.service';

export type Market = {
  ticker: string;
  ap: number;
  bp: number;
}[];

@Component({
  selector: 'page-market',
  templateUrl: './market.component.html',
  styleUrls: ['./market.component.scss'],
})
export class MarketPage implements OnInit, OnDestroy {
  constructor(
    private marketService: MarketService,
    private account: AccountService,
    private auth: AuthService,
    private router: Router
  ) {}

  isTrade: boolean = false;
  trade: any;
  page: number = 0;
  pages: number = 0;
  search: string = '';

  market: Market = [];
  found: Market = [];
  marketData: Subscription = new Subscription();
  marketList: Subscription = new Subscription();

  ngOnInit(): void {
    if (this.auth.isExpired()) {
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
        this.market = data.sort((a: any, b: any) =>
          a.ticker > b.ticker ? 1 : -1
        );
        this.filter(this.search);
      },
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

  setPage(page: number) {
    this.page = page;
  }

  filter(input: string) {
    this.search = input;
    this.found = this.market.slice().filter((market) => {
      return (
        market.ticker.toLowerCase().includes(input.toLowerCase()) ||
        dictionary[market.ticker].toLowerCase().includes(input.toLowerCase())
      );
    });
    this.pages = Math.floor(this.found.length / 15 + 1);

    if (this.page >= this.pages) {
      this.setPage(0);
    }
  }
}
