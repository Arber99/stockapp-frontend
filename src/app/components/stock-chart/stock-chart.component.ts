import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'comp-stock-chart',
  templateUrl: './stock-chart.component.html',
  styleUrls: ['./stock-chart.component.scss'],
})
export class StockChartComponent implements OnInit {
  constructor() {}

  chart = [
    150, 151.52, 151.32, 150.49, 151.42, 152.14, 150.1, 148.69, 147.58, 149.2,
    148.58, 147.98, 147.94, 146.0, 145.26, 144.24, 142.87, 144.77, 143.58,
    141.19, 140.25, 141.46, 142.15, 141.99, 142.74, 142.33, 143.03,
  ];
  path = '';

  ngOnInit(): void {
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
