import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AccountService } from 'src/app/services/account.service';
import { MarketService } from 'src/app/services/market.service';
import { Market } from '../market/market.component';

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
  stocks: Record<string, string | number>[] = [];
  networth: string = '';

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

  getCompany(company: number | string) {
    return company as string;
  }

  getSymbol(symbol: number | string) {
    return symbol as string;
  }

  getAmount(amount: number | string) {
    return amount as number;
  }

  getPrice(ticker: number | string) {
    const mak: any = this.market.find((element) => element.ticker === ticker.toString())
    if(mak.bp === undefined) {
      return null;
    }
    return mak.bp;
  }

  getCash() {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(this.cash);
  }

  calculateNetworth() {
    let total: number = this.cash;
    this.stocks.forEach((record) => {
      total += (record['amount'] as number) * 100;
    });

    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(total);
  }
}
