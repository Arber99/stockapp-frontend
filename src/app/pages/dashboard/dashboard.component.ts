import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AccountService } from 'src/app/services/account.service';
import { MarketService } from 'src/app/services/market.service';
import { Market } from '../market/market.component';
import { DollarPipe } from 'src/app/pipes/dollar.pipe';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  constructor(
    private account: AccountService,
    private marketService: MarketService
  ) {
    this.account.cash.subscribe((data: number) => {
      this.cash = data;
      this.networth = this.calculateNetworth();
    });

    this.account.stocks.subscribe((data: any) => {
      this.stocks = data;
      this.networth = this.calculateNetworth();
    });
  }

  market: Market = [];
  sub: Subscription = new Subscription();
  cash: number = 0;
  stocks: any = [];
  networth: number = 0;

  ngOnInit(): void {
    this.cash = this.account.getCash();
    this.stocks = this.account.getStocks();
    this.networth = this.calculateNetworth();

    this.sub = this.marketService.getMarketData();
    this.marketService.market.subscribe((data) => {
      this.market = data;
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  getPrice(ticker: string) {
    const price: any = this.market.find((element) => element.ticker === ticker.toString())
    return price.bp;
  }

  calculateNetworth() {
    let total: number = this.cash;
    // this.stocks.forEach((record) => {
    // });
    return total;
  }
}
