import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { envConfig } from 'envConfig';
import { interval, startWith, Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { MarketService } from 'src/app/services/market.service';
import { StockService } from 'src/app/services/stock.service';

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
    private stockService: StockService,
    private marketService: MarketService
  ) {}

  market: Market = [];
  marketData: Subscription = new Subscription();
  marketList: Subscription = new Subscription();

  ngOnInit(): void {
    this.marketData = this.marketService.getMarketData();
    this.marketList = this.marketService.market.subscribe({
      next: (data: any) => {
        this.market = data;
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

  buyStock(ticker: string) {
    this.stockService.buyStock(ticker, 1);
  }
}
