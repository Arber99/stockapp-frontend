import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Stock } from 'src/app/pages/dashboard/dashboard.component';
import { StockService } from 'src/app/services/stock.service';

@Component({
  selector: 'comp-stock-popup',
  templateUrl: './stock-popup.component.html',
  styleUrls: ['./stock-popup.component.scss'],
})
export class StockPopupComponent {
  constructor(private stockService: StockService) {}
  @Output() trade: EventEmitter<{}> = new EventEmitter();
  @Input() stock: Stock = {
    ticker: '',
    amount: 0,
    id: 0,
    price: 0,
    total: 0,
  };
  amount: number = 0;

  closeTrade() {
    this.trade.emit();
  }

  buyStock(ticker: string, amount: number) {
    console.log(Number.isInteger(parseInt(amount.toString())));
    //this.stockService.buyStock(ticker, amount);
  }

  sellStock(ticker: string, amount: number) {
    console.log(Number.isInteger(parseInt(amount.toString())));
    //this.stockService.sellStock(ticker, amount);
  }
}
