import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { ChartService } from 'src/app/services/chart.service';
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
    private auth: AuthService
  ) {}

  portfolio: Subscription = new Subscription();
  chartSubscription: Subscription = new Subscription();
  chartPortfolio: number[] = [];
  stocks: any[] = [];
  cash: number = 0;
  path = '';
  positive = true;
  chart: any[] = [];

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
      error: (error) => {},
    });
  }

  ngOnDestroy() {
    this.portfolio.unsubscribe();
    this.chartSubscription.unsubscribe();
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

    const min = Math.min(...this.chartPortfolio);
    const max = Math.max(...this.chartPortfolio);
    const diff = max - min;

    this.chartPortfolio.forEach((element, index) => {
      if (index == 0) {
        this.path += `M${index * 27},${((max - element) / diff) * 300 - 20},`;
      } else {
        this.path += `L${index * 27},${((max - element) / diff) * 300 - 20},`;
      }
    });

    if (this.chartPortfolio.length > 0) {
      this.chartService.percentage.next(
        (this.chartPortfolio[this.chartPortfolio.length - 1] /
          this.chartPortfolio[0] -
          1) *
          100
      );
    }

    this.chartPortfolio[0] < this.chartPortfolio[this.chartPortfolio.length - 1]
      ? (this.positive = true)
      : (this.positive = false);
  }
}
