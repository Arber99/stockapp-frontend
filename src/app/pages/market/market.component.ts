import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { envConfig } from 'envConfig';
import { interval, startWith, Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { History, HistoryService } from 'src/app/services/history.service';
import { MarketService } from 'src/app/services/market.service';
import { StockService } from 'src/app/services/stock.service';
import { TokenService } from 'src/app/services/token.service';

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
    private tokenService: TokenService,
  ) {}

  isTrade: boolean = false;
  trade: any;

  market: Market = [];
  status: boolean = false;
  marketData: Subscription = new Subscription();
  marketList: Subscription = new Subscription();

  ngOnInit(): void {
    this.tokenService.isExpired();
    this.marketData = this.marketService.getMarketData();
    this.marketList = this.marketService.market.subscribe({
      next: (data: any) => {
        this.market = data.marketData;
        this.status = data.marketStatus;
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

  setTrade(market: any) {
    this.trade = market;
    this.isTrade = true;
  }

  disableTrade() {
    this.isTrade = false;
  }
}
