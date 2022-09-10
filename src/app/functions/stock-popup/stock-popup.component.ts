import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { Stock } from 'src/app/pages/dashboard/dashboard.component';
import { MarketService } from 'src/app/services/market.service';
import { StockService } from 'src/app/services/stock.service';

@Component({
  selector: 'comp-stock-popup',
  templateUrl: './stock-popup.component.html',
  styleUrls: ['./stock-popup.component.scss'],
})
export class StockPopupComponent implements OnInit, OnDestroy {
  constructor(
    private stockService: StockService,
    private marketService: MarketService
  ) {}
  @Input() stock: Stock = {
    ticker: '',
    amount: 0,
    id: 0,
    bp: 0,
    ap: 0,
    total: 0,
  };
  amount: number = 0;
  mode: 'sell' | 'buy' = 'buy';
  status: boolean = false;
  market$: Subscription = new Subscription();

  ngOnInit() {
    this.market$ = this.marketService.market.subscribe((data) => {
      this.status = data.marketStatus;
      this.stock.bp = data.marketData.find(
        (element: any) => element.ticker === this.stock.ticker.toString()
      )?.bp;
      this.stock.ap = data.marketData.find(
        (element: any) => element.ticker === this.stock.ticker.toString()
      )?.ap;
    });
  }

  ngOnDestroy() {
    this.market$.unsubscribe();
  }

  setMode(mode: 'sell' | 'buy') {
    this.mode = mode;
  }

  buyStock(ticker: string, amount: number) {
    if (Number.isInteger(parseInt(amount.toString()))) {
      this.stockService.buyStock(ticker, parseInt(amount.toString()));
    }
  }

  sellStock(ticker: string, amount: number) {
    if (Number.isInteger(parseInt(amount.toString()))) {
      this.stockService.sellStock(ticker, parseInt(amount.toString()));
    }
  }
}
