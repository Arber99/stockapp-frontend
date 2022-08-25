import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { envConfig } from 'envConfig';
import { interval, startWith, Subscription } from 'rxjs';
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
  constructor(private http: HttpClient, private auth: AuthService, private marketService: MarketService) {}

  market: Market = []
  sub: Subscription = new Subscription();
  marketSub: Subscription = new Subscription();

  ngOnInit(): void {
    this.sub = this.marketService.getMarketData();
    this.marketSub = this.marketService.market.subscribe((data) => {
      this.market = data;
    })
  }

  buyStock(ticker: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.auth.getToken()}`,
    });
    this.http
      .post(
        envConfig.baseUrl + 'stocks',
        { ticker: ticker, amount: 1 },
        { headers: headers }
      )
      .subscribe((data) => {
        console.log(data);
      });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
    this.marketSub.unsubscribe();
  }
}
