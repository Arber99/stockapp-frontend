import { Component, Input } from '@angular/core';

@Component({
  selector: 'comp-card-stock',
  templateUrl: './card-stock.component.html',
  styleUrls: ['./card-stock.component.scss'],
})
export class CardStockComponent {
  constructor() {}

  @Input()
  company: string = '';
  @Input()
  ticker: string = '';
  @Input()
  price: number = 0;
  @Input()
  amount: number = 0;
  @Input()
  total: number = 0;

}
