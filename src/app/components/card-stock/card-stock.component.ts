import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'comp-card-stock',
  templateUrl: './card-stock.component.html',
  styleUrls: ['./card-stock.component.scss'],
})
export class CardStockComponent implements OnInit {
  constructor() {}

  @Input()
  company: string = '';
  @Input()
  symbol: string = '';
  @Input()
  price: number = 0;
  @Input()
  amount: number = 0;
  total: number = 0;

  ngOnInit(): void {
    this.total = this.amount * this.price;
  }
}
