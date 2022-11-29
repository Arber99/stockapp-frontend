import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AccountService } from 'src/app/services/account.service';
import { MarketService } from 'src/app/services/market.service';
import { Market } from '../market/market.component';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { PortfolioService } from 'src/app/services/portfolio.service';
import { ChartService } from 'src/app/services/chart.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

export type Stock = {
  ticker: string;
  amount?: number;
  id?: number;
  bp: number;
  ap: number;
  total?: number;
};

@Component({
  selector: 'page-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardPage implements OnInit, OnDestroy {
  constructor(
    private account: AccountService,
    private marketService: MarketService,
    private portfolioService: PortfolioService,
    private chartService: ChartService,
    private auth: AuthService,
    private router: Router
  ) {}

  faPlus = faPlus;

  marketData: Subscription = new Subscription();
  marketList: Subscription = new Subscription();
  accountCash: Subscription = new Subscription();
  accountStocks: Subscription = new Subscription();
  percentageSubscription: Subscription = new Subscription();
  networthSubscription: Subscription = new Subscription();

  $accountLoaded: Subscription = new Subscription();

  stocks: any = [];
  cash: number = 0;
  networth: number = 0;
  isTrade: boolean = false;
  market: Market = [];
  trade: Stock = {
    ticker: '',
    amount: 0,
    id: 0,
    bp: 0,
    ap: 0,
    total: 0,
  };
  percentage: number = 0;
  popup: string = '';

  accountLoaded: boolean = true;

  ngOnInit(): void {
    if (this.auth.isExpired()) {
      this.router.navigate(['/login']);
      return;
    }
    this.account.getUserData();
    this.account.getStockData();
    this.marketService.initMarketData();

    //Subscriptions
    this.networthSubscription = this.chartService.networth.subscribe((data) => {
      this.networth = data;
    });
    this.percentageSubscription = this.chartService.percentage.subscribe(
      (data) => {
        this.percentage = data;
      }
    );
    this.marketData = this.marketService.getMarketData();
    this.accountCash = this.account.cash.subscribe((data: number) => {
      this.cash = data;
    });
    this.accountStocks = this.account.stocks.subscribe((data: any) => {
      this.stocks = data;
      this.calculatePortfolio();
    });
    this.marketList = this.marketService.market.subscribe({
      next: (data: any) => {
        this.market = data;
        this.calculatePortfolio();
      },
    });

    this.$accountLoaded = this.account.accountLoaded.subscribe((data: boolean) => {
      this.accountLoaded = data;
    })
  }

  ngOnDestroy(): void {
    this.networthSubscription.unsubscribe();
    this.percentageSubscription.unsubscribe();
    this.marketData.unsubscribe();
    this.marketList.unsubscribe();
    this.accountCash.unsubscribe();
    this.accountStocks.unsubscribe();
    this.$accountLoaded.unsubscribe();
  }

  calculatePortfolio() {
    if (this.stocks.length === 0 || this.market.length === 0) {
      return;
    }

    let portfolio: Stock[] = [];
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
    this.chartService.actual.next(portfolioValue);
    this.chartService.networth.next(portfolioValue);

    this.portfolioService.portfolio.next({
      stocks: this.stocks,
      cash: this.cash,
    });
  }
}
