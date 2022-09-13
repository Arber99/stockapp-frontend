import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MainComponent } from './components/main/main.component';
import { IntroductionComponent } from './components/introduction/introduction.component';
import { CardComponent } from './components/card/card.component';
import { CourseComponent } from './components/course/course.component';
import { HomePage } from './pages/home/home.component';
import { SignUpPage } from './pages/sign-up/sign-up.component';
import { LogInPage } from './pages/log-in/log-in.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardPage } from './pages/dashboard/dashboard.component';
import { CardStockComponent } from './functions/card-stock/card-stock.component';
import { MarketPage } from './pages/market/market.component';
import { DollarPipe } from './pipes/dollar.pipe';
import { StockPopupComponent } from './functions/stock-popup/stock-popup.component';
import { DatePipe } from './pipes/date.pipe';
import { HistoryComponent } from './functions/history/history.component';
import { FooterComponent } from './components/footer/footer.component';
import { LearnComponent } from './components/learn/learn.component';
import { ExploreComponent } from './components/explore/explore.component';
import { CardMarketComponent } from './functions/card-market/card-market.component';
import { ChartComponent } from './functions/chart/chart.component';
import { StockChartComponent } from './functions/stock-chart/stock-chart.component';
import { PercentPipe } from './pipes/percent.pipe';
import { WrapperComponent } from './components/wrapper/wrapper.component';
import { HistoryPage } from './pages/history/history.component';
import { ImprintPage } from './pages/imprint/imprint.component';
import { TermsPage } from './pages/terms/terms.component';
import { PrivacyPage } from './pages/privacy/privacy.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    MainComponent,
    IntroductionComponent,
    CardComponent,
    CourseComponent,
    HomePage,
    SignUpPage,
    LogInPage,
    DashboardPage,
    CardStockComponent,
    MarketPage,
    DollarPipe,
    StockPopupComponent,
    DatePipe,
    HistoryComponent,
    FooterComponent,
    LearnComponent,
    ExploreComponent,
    CardMarketComponent,
    ChartComponent,
    StockChartComponent,
    PercentPipe,
    WrapperComponent,
    HistoryPage,
    ImprintPage,
    TermsPage,
    PrivacyPage,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
