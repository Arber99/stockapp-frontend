import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccessibilityPage } from './pages/accessibility/accessibility.component';
import { DashboardPage } from './pages/dashboard/dashboard.component';
import { HistoryPage } from './pages/history/history.component';
import { HomePage } from './pages/home/home.component';
import { ImprintPage } from './pages/imprint/imprint.component';
import { LogInPage } from './pages/log-in/log-in.component';
import { MarketPage } from './pages/market/market.component';
import { PrivacyPage } from './pages/privacy/privacy.component';
import { SignUpPage } from './pages/sign-up/sign-up.component';
import { TermsPage } from './pages/terms/terms.component';

const routes: Routes = [
  { path: '', component: HomePage },
  { path: 'signup', component: SignUpPage },
  { path: 'login', component: LogInPage },
  { path: 'dashboard', component: DashboardPage },
  { path: 'market', component: MarketPage },
  { path: 'history', component: HistoryPage },
  { path: 'imprint', component: ImprintPage },
  { path: 'terms', component: TermsPage },
  { path: 'privacy', component: PrivacyPage },
  { path: 'accessibility', component: AccessibilityPage },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
