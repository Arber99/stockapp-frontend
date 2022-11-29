import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { History, HistoryService } from 'src/app/services/history.service';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'comp-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
})
export class HistoryComponent implements OnInit, OnDestroy {
  constructor(
    private historyService: HistoryService,
    private auth: AuthService,
    private router: Router
  ) {}

  faArrowRight = faArrowRight;
  faArrowLeft = faArrowLeft;

  @Input()
  historyData: Subscription = new Subscription();
  $historyLoaded: Subscription = new Subscription();

  history: History[] = [];
  historyLoaded: boolean = true;

  ngOnInit() {
    if (this.auth.isExpired()) {
      return;
    }
    this.historyService.getHistory();

    //Subscriptions
    this.historyData = this.historyService.history.subscribe(
      (data: History[]) => {
        this.history = data.sort((a, b) => {
          if (a['createdAt'] < b['createdAt']) {
            return 1;
          } else {
            return -1;
          }
        });
      }
    );

    this.$historyLoaded = this.historyService.historyLoaded.subscribe(
      (data: boolean) => {
        this.historyLoaded = data;
      }
    );
  }

  ngOnDestroy() {
    this.historyData.unsubscribe();
    this.$historyLoaded.unsubscribe();
  }

  limitLength() {
    return Math.min(8, history.length);
  }

  isNotHistory() {
    return this.router.url !== '/history';
  }
}
