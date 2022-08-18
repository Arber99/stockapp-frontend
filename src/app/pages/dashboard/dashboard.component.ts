import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private account: AccountService) { 
    this.account.cash.subscribe((data: number) => {
      this.cash = new Intl.NumberFormat('en-US', { style: "currency", currency: "USD" }).format(data);
    })
  }

  cash: string = '';

  ngOnInit(): void {
    this.cash = new Intl.NumberFormat('en-US', { style: "currency", currency: "USD" }).format(this.account.getCash());
  }

}
