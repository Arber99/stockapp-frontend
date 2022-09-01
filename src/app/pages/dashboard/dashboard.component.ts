import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AccountService } from 'src/app/services/account.service';
import { History } from 'src/app/services/history.service';
import { MarketService } from 'src/app/services/market.service';
import { TokenService } from 'src/app/services/token.service';
import { Market } from '../market/market.component';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

export type Stock = {
  ticker: string;
  amount?: number;
  id?: number;
  bp: number;
  ap: number;
  total?: number;
};

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  constructor(
    private account: AccountService,
    private marketService: MarketService,
    private tokenService: TokenService
  ) {}

  faPlus = faPlus;

  market: Market = [];
  status: boolean = false;
  marketData: Subscription = new Subscription();
  marketList: Subscription = new Subscription();
  accountCash: Subscription = new Subscription();
  accountStocks: Subscription = new Subscription();

  stocks: any = [];
  cash: number = 0;
  networth: number = 0;
  isTrade: boolean = false;
  trade: Stock = {
    ticker: '',
    amount: 0,
    id: 0,
    bp: 0,
    ap: 0,
    total: 0,
  };

  ngOnInit(): void {
    this.tokenService.isExpired();
    this.cash = this.account.getCash();
    this.stocks = this.account.getStocks();

    this.accountCash = this.account.cash.subscribe((data: number) => {
      this.cash = data;
    });
    this.accountStocks = this.account.stocks.subscribe((data: any) => {
      this.stocks = data;
      this.calculatePortfolio();
    });
    this.marketData = this.marketService.getMarketData();
    this.marketList = this.marketService.market.subscribe({
      next: (data: any) => {
        this.market = data.marketData;
        this.status = data.marketStatus;
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
    this.accountCash.unsubscribe();
    this.accountStocks.unsubscribe();
  }

  calculatePortfolio() {
    const portfolio: Stock[] = [];
    let portfolioValue: number = 0;
    this.stocks.forEach((stock: any) => {
      stock.bp = this.market.find(
        (element) => element.ticker === stock.ticker.toString()
      )?.bp;
      stock.ap = this.market.find(
        (element) => element.ticker === stock.ticker.toString()
      )?.ap;
      portfolio.push({
        ticker: stock.ticker,
        amount: stock.amount,
        id: stock.id,
        bp: stock.bp,
        ap: stock.ap,
        total: stock.bp * stock.amount,
      });
      portfolioValue += stock.bp * stock.amount;
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
