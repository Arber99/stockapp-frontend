import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { ChartService } from 'src/app/services/chart.service';
import { MarketService } from 'src/app/services/market.service';
import { PortfolioService } from 'src/app/services/portfolio.service';

@Component({
  selector: 'comp-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
})
export class ChartComponent implements OnInit, OnDestroy {
  constructor(
    private chartService: ChartService,
    private portfolioService: PortfolioService,
    private marketService: MarketService,
    private auth: AuthService
  ) {}

  portfolio: Subscription = new Subscription();
  chartSubscription: Subscription = new Subscription();
  actualSubscription: Subscription = new Subscription();
  status$: Subscription = new Subscription();

  date: Date = new Date(Date.now());
  chartPortfolio: number[] = [];
  stocks: any[] = [];
  status: boolean = false;
  cash: number = 0;
  path = '';
  positive = true;
  chart: any[] = [];
  pathLine: number = 0;
  isLine: boolean = false;
  index: number = 0;
  actual: number = 0;
  dotted: number = 0;

  ngOnInit() {
    if (this.auth.isExpired()) {
      return;
    }
    this.chartService.initChartData();

    //Subscriptions
    this.portfolio = this.portfolioService.portfolio.subscribe((data) => {
      this.cash = data.cash;
      this.stocks = data.stocks;
      this.calculateChart();
    });
    this.chartSubscription = this.chartService.chart.subscribe({
      next: (data: any) => {
        this.chart = data;
        this.calculateChart();
      },
    });
    this.actualSubscription = this.chartService.actual.subscribe({
      next: (data: number) => {
        this.actual = data;
      },
    });
    this.status$ = this.marketService.status.subscribe((data) => {
      this.status = data;
    });
  }

  ngOnDestroy() {
    this.portfolio.unsubscribe();
    this.chartSubscription.unsubscribe();
    this.status$.unsubscribe();
  }

  calculateChart(): void {
    if (this.stocks.length === 0 || this.chart.length === 0) {
      return;
    }

    let final: number[] = [];
    let chart: any = [];
    let cash: number = this.cash;
    this.stocks.forEach((stock: any) => {
      chart = this.chart
        .find((element: any) => element.ticker === stock.ticker.toString())
        ?.prices.map(function (x: number) {
          return x * stock.amount;
        });
      if (final.length === 0) {
        final = chart.slice();
      } else {
        final = final.slice().map(function (num, idx) {
          return num + chart[idx];
        });
      }
    });

    this.chartPortfolio = final.slice().filter(function (value) {
      return !Number.isNaN(value);
    });

    if (this.status) {
      //this.chartPortfolio.push(this.actual);
    }

    const min = Math.min(...this.chartPortfolio);
    const max = Math.max(...this.chartPortfolio);
    const diff = max - min;
    this.path = '';

    this.chartPortfolio.forEach((element, index) => {
      if (index == 0) {
        this.path += `M${index * 28},${((max - element) / diff) * 300 - 20},`;
        this.dotted = ((max - element) / diff) * 300 - 20;
        console.log(this.dotted);
      } else {
        this.path += `L${index * 28},${((max - element) / diff) * 300 - 20},`;
      }
    });

    if (this.chartPortfolio.length > 0) {
      this.setPercentage(
        this.chartPortfolio[0],
        this.chartPortfolio[this.chartPortfolio.length - 1]
      );
    }

    this.chartPortfolio[0] <=
    this.chartPortfolio[this.chartPortfolio.length - 1]
      ? (this.positive = true)
      : (this.positive = false);
  }

  line(e: any) {
    let rect = e.target.getBoundingClientRect();
    if (rect.width > 0) {
      this.index = Math.min(this.chartPortfolio.length - 1, Math.round(((e.clientX - rect.left) / rect.width) * 25));

      if (this.index === this.chartPortfolio.length - 1) {
        this.pathLine = (this.index * rect.width) / 25 - 4;
      } else {
        this.pathLine = Math.max(2, (this.index * rect.width) / 25 - 1);
      }

      this.setPercentage(
        this.chartPortfolio[0],
        this.chartPortfolio[this.index]
      );
      this.setLine(true);
    }
  }

  setLine(value: boolean) {
    this.isLine = value;

    if (!value) {
      this.setPercentage(
        this.chartPortfolio[0],
        this.chartPortfolio[this.chartPortfolio.length - 1]
      );
    }
  }

  setPercentage(start: number, end: number) {
    if (start && end) {
      this.chartService.percentage.next((end / start - 1) * 100);
      this.chartService.networth.next(end + this.cash);
    }
  }
}
