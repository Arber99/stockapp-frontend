import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ChartService } from 'src/app/services/chart.service';

@Component({
  selector: 'comp-stock-chart',
  templateUrl: './stock-chart.component.html',
  styleUrls: ['./stock-chart.component.scss'],
})
export class StockChartComponent implements OnDestroy {
  constructor(private chartService: ChartService) {
    this.chartService.initChartData();
    this.chartSubscription = this.chartService.chart.subscribe((data) => {
      this.chart = data.find(
        (element: any) => element.ticker === this.ticker.toString()
      )?.prices;

      if(this.chart.length < 27) {
      this.chart.push(this.lastPrice);
      }
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

      this.chart[0] < this.chart[this.chart.length - 1]
        ? (this.positive = true)
        : (this.positive = false);
    });
  }

  chart: number[] = [];
  path = '';
  positive = true;

  @Input()
  ticker = '';
  @Input()
  lastPrice = 0;

  chartSubscription: Subscription = new Subscription();

  ngOnDestroy() {
    this.chartSubscription.unsubscribe();
  }
}
