import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { History, HistoryService } from 'src/app/services/history.service';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'comp-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
})
export class HistoryComponent implements OnInit, OnDestroy {
  constructor(
    private historyService: HistoryService,
    private auth: AuthService
  ) {}

  faArrowRight = faArrowRight;
  faArrowLeft = faArrowLeft;

  @Input()
  history: History[] = [];
  historyData: Subscription = new Subscription();

  ngOnInit() {
    if (this.auth.isExpired()) {
      return;
    }
    this.historyService.getHistory();

    //Subscriptions
    this.historyData = this.historyService.history.subscribe(
      (data: History[]) => {
        this.history = data;
      }
    );
  }

  ngOnDestroy() {
    this.historyData.unsubscribe();
  }
}
