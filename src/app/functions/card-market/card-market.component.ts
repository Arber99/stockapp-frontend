import { Component, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { dictionary } from 'src/app/dictionary/dictionary';
import { PopupService } from 'src/app/services/popup.service';

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
  constructor(private popupService: PopupService) {}

  popup$: Subscription = new Subscription();

  @Input()
  market: Market = {
    ticker: '',
    ap: 0,
    bp: 0,
  };
  company: string = ''
  popup: string = ''

  ngOnInit() {
    this.popup$ = this.popupService.popup.subscribe(data => {
      this.popup = data;
    })
    this.popup = '';
    this.company = dictionary[this.market.ticker]
  }

  popupStock(ticker: string) {
    if (this.popup === ticker) {
      this.popupService.popup.next('');
      this.popup = ''
    } else {
      this.popupService.popup.next(ticker);
      this.popup = ticker;
    }
  }
}
