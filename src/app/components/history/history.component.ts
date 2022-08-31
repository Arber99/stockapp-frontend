import { Component, Input } from '@angular/core';
import { History } from 'src/app/services/history.service';
import {
  faArrowLeft,
  faArrowRight
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'comp-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
})
export class HistoryComponent {
  constructor() {}

  faArrowRight = faArrowRight;
  faArrowLeft = faArrowLeft;
  
  @Input()
  history: History[] = [];

}
