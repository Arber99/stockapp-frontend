import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
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
  status$: Subscription = new Subscription();
  buyLoaded$: Subscription = new Subscription();
  sellLoaded$: Subscription = new Subscription();
  faTriangleExclamation = faTriangleExclamation;
  spread: boolean = false;
  buyLoaded: boolean = true;
  sellLoaded: boolean = true;

  ngOnInit() {
    this.buyLoaded$ = this.stockService.buyLoaded.subscribe((data: boolean) => {
      this.buyLoaded = data;
    })
    this.sellLoaded$ = this.stockService.sellLoaded.subscribe((data: boolean) => {
      this.sellLoaded = data;
    })
    this.status$ = this.marketService.status.subscribe((data: boolean) => {
      this.status = data;
    })
    this.market$ = this.marketService.market.subscribe((data) => {
      this.stock.bp = data.find(
        (element: any) => element.ticker === this.stock.ticker.toString()
      )?.bp;
      this.stock.ap = data.marketData.find(
        (element: any) => element.ticker === this.stock.ticker.toString()
      )?.ap;

      if((this.stock.ap - this.stock.bp) / this.stock.ap > 0.03) {
        this.spread = true;
      }
    });
    if((this.stock.ap - this.stock.bp) / this.stock.ap > 0.03) {
      this.spread = true;
    }
  }

  ngOnDestroy() {
    this.market$.unsubscribe();
    this.status$.unsubscribe();
    this.buyLoaded$.unsubscribe();
    this.sellLoaded$.unsubscribe();
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
