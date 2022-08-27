import { Component, OnDestroy, OnInit } from '@angular/core';
import { elementAt, Subscription } from 'rxjs';
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
    });

    this.account.stocks.subscribe((data: any) => {
      this.stocks = data;
    });
  }

  market: Market = [];
  marketData: Subscription = new Subscription();
  marketList: Subscription = new Subscription();

  stocks: any = [];
  cash: number = 0;
  networth: number = 0;

  ngOnInit(): void {
    this.cash = this.account.getCash();

    this.marketData = this.marketService.getMarketData();
    this.marketList = this.marketService.market.subscribe((data) => {
      this.market = data;

      this.calculatePortfolio()
    });
  }

  ngOnDestroy(): void {
    this.marketData.unsubscribe();
    this.marketList.unsubscribe();
  }

  calculatePortfolio() {
    const stocks = this.account.getStocks();
    const portfolio: any[] = [];
    let portfolioValue: number = 0;
    stocks.forEach((stock: any) => {
      stock.price = this.market.find((element) => element.ticker === stock.ticker.toString())!.bp
      portfolio.push({
        ticker: stock.ticker,
        amount: stock.amount,
        id: stock.id,
        price: stock.price,
        total: stock.price * stock.amount
      })
      portfolioValue += stock.price * stock.amount;
    });
    this.stocks = portfolio
    this.networth = portfolioValue + this.cash;
  }
}
