import { Component, Input, OnInit } from '@angular/core';
import { dictionary } from 'src/app/dictionary/dictionary';

@Component({
  selector: 'comp-card-stock',
  templateUrl: './card-stock.component.html',
  styleUrls: ['./card-stock.component.scss'],
})
export class CardStockComponent implements OnInit {
  constructor() {}

  company: string = '';
  @Input()
  ticker: string = '';
  @Input()
  price: number = 0;
  @Input()
  amount: number = 0;
  @Input()
  total: number = 0;

  ngOnInit()  {
    this.company = dictionary[this.ticker];
  }

}
