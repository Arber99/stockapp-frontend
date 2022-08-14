import { Component, OnInit } from '@angular/core';
import { faArrowDown, faUser } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'comp-main',
  templateUrl: './main.component.html',
})
export class MainComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  faArrowDown = faArrowDown;
  faUser = faUser;
}
