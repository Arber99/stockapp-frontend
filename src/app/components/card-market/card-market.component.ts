import { Component, Input } from '@angular/core';

type Market = {
  ticker: string,
  ap: number,
  bp: number,
}
@Component({
  selector: 'comp-card-market',
  templateUrl: './card-market.component.html',
  styleUrls: ['./card-market.component.scss'],
})
export class CardMarketComponent {
  constructor() {}

  @Input()
  market: Market = {
    ticker: '',
    ap: 0,
    bp: 0,
  };
}
