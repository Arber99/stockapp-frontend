import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { ChartService } from 'src/app/services/chart.service';
import { PortfolioService } from 'src/app/services/portfolio.service';

@Component({
  selector: 'comp-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
})
export class ChartComponent {
  constructor(
    private chartService: ChartService,
    private portfolioService: PortfolioService
  ) {
    this.portfolio = this.portfolioService.portfolio.subscribe((data) => {
      this.cash = data.cash;
      this.stocks = data.stocks;
    });
    this.chartService.initChartData();
    this.chartSubscription = this.chartService.chart.subscribe((data) => {
      let final: number[] = [];

      let chart: any = [];
      let cash: number = this.cash;
      this.stocks.forEach((stock: any) => {
        chart = data.find((element: any) => element.ticker === stock.ticker.toString())
          ?.prices.map(function(x: number) { return (x * stock.amount); });
        if(final.length === 0) {
          final = chart.slice();
        }
        else {
          final = final.slice().map(function (num, idx) {
            return num + chart[idx];
          });
        }
      });
      this.chart = final.slice();
      this.calculateChart();
    });
  }

  portfolio: Subscription = new Subscription();
  chartSubscription: Subscription = new Subscription();
  chart: number[] = [];
  stocks = [];
  cash: number = 0;
  path = '';

  calculateChart(): void {

    this.chart = this.chart.slice().filter(function (value) {
      return !Number.isNaN(value);
  });

    const min = Math.min(...this.chart);
    const max = Math.max(...this.chart);
    const diff = max - min;

    this.chart.forEach((element, index) => {
      if (index == 0) {
        this.path += `M${index * 27},${((max - element) / diff) * 300 - 20},`;
      } else {
        this.path += `L${index * 27},${((max - element) / diff) * 300 - 20},`;
      }
    });
  }
}
