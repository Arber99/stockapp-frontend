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
  _price: string = '';
  @Input()
  amount: number = 0;
  total: string = '';

  ngOnInit(): void {
    this._price = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(this.price);

    this.total = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(this.amount * this.price);
  }
}
