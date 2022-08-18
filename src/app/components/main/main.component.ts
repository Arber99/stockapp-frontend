import { Component, OnInit } from '@angular/core';
import { faArrowDown, faUser } from '@fortawesome/free-solid-svg-icons';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'comp-main',
  templateUrl: './main.component.html',
})
export class MainComponent implements OnInit {
  constructor(private account: AccountService) {}

  ngOnInit(): void {}

  faArrowDown = faArrowDown;
  faUser = faUser;
}
