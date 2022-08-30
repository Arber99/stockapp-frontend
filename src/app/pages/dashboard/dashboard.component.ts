import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AccountService } from 'src/app/services/account.service';
import { MarketService } from 'src/app/services/market.service';
import { Market } from '../market/market.component';

export type Stock = {
  ticker: string;
  amount: number;
  id: number;
  price: number;
  total: number;
};

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
  isTrade: boolean = false;
  trade: Stock = {
    ticker: '',
    amount: 0,
    id: 0,
    price: 0,
    total: 0,
  };

  ngOnInit(): void {
    this.cash = this.account.getCash();

    this.marketData = this.marketService.getMarketData();

    this.marketList = this.marketService.market.subscribe({
      next: (data: any) => {
        this.market = data;
        this.calculatePortfolio();
      },
      error: (error) => {
        this.marketData.unsubscribe();
      },
    });
  }

  ngOnDestroy(): void {
    this.marketData.unsubscribe();
    this.marketList.unsubscribe();
  }

  calculatePortfolio() {
    const stocks = this.account.getStocks();
    const portfolio: Stock[] = [];
    let portfolioValue: number = 0;
    stocks.forEach((stock: any) => {
      stock.price = this.market.find(
        (element) => element.ticker === stock.ticker.toString()
      )!.bp;
      portfolio.push({
        ticker: stock.ticker,
        amount: stock.amount,
        id: stock.id,
        price: stock.price,
        total: stock.price * stock.amount,
      });
      portfolioValue += stock.price * stock.amount;
    });
    this.stocks = portfolio;
    this.networth = portfolioValue + this.cash;
  }

  setTrade(stock: Stock) {
    this.trade = stock;
    this.isTrade = true;
  }

  disableTrade() {
    this.isTrade = false;
  }
}
