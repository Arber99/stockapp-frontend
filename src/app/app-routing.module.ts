import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardPage } from './pages/dashboard/dashboard.component';
import { HistoryPage } from './pages/history/history.component';
import { HomePage } from './pages/home/home.component';
import { LogInPage } from './pages/log-in/log-in.component';
import { MarketPage } from './pages/market/market.component';
import { SignUpPage } from './pages/sign-up/sign-up.component';

const routes: Routes = [
  { path: '', component: HomePage },
  { path: 'signup', component: SignUpPage },
  { path: 'login', component: LogInPage },
  { path: 'dashboard', component: DashboardPage },
  { path: 'market', component: MarketPage },
  { path: 'history', component: HistoryPage}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
