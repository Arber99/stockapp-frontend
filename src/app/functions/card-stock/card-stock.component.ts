import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { dictionary } from 'src/app/dictionary/dictionary';
import { Stock } from 'src/app/pages/dashboard/dashboard.component';
import { PopupService } from 'src/app/services/popup.service';

@Component({
  selector: 'comp-card-stock',
  templateUrl: './card-stock.component.html',
  styleUrls: ['./card-stock.component.scss'],
})
export class CardStockComponent implements OnInit {
  constructor(private popupService: PopupService) {}

  popup$: Subscription = new Subscription();

  company: string = '';
  @Input()
  ticker: string = '';
  @Input()
  price: number = 0;
  @Input()
  amount: number = 0;
  @Input()
  total: number = 0;
  @Input()
  stock: Stock = {ticker: '', bp: 0, ap: 0};
  @Input()
  isActive: boolean = false;
  popup: string = '';

  ngOnInit()  {
    this.popup$ = this.popupService.popup.subscribe(data => {
      this.popup = data;
    })
    this.popup = '';
    this.company = dictionary[this.ticker];
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
