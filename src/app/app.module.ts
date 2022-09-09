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
import { HomeComponent } from './pages/home/home.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { LogInComponent } from './pages/log-in/log-in.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CardStockComponent } from './components/card-stock/card-stock.component';
import { MarketComponent } from './pages/market/market.component';
import { DollarPipe } from './pipes/dollar.pipe';
import { StockPopupComponent } from './functions/stock-popup/stock-popup.component';
import { DatePipe } from './pipes/date.pipe';
import { HistoryComponent } from './functions/history/history.component';
import { FooterComponent } from './components/footer/footer.component';
import { LearnComponent } from './components/learn/learn.component';
import { ExploreComponent } from './components/explore/explore.component';
import { CardMarketComponent } from './components/card-market/card-market.component';
import { ChartComponent } from './functions/chart/chart.component';
import { StockChartComponent } from './functions/stock-chart/stock-chart.component';
import { PercentPipe } from './pipes/percent.pipe';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    MainComponent,
    IntroductionComponent,
    CardComponent,
    CourseComponent,
    HomeComponent,
    SignUpComponent,
    LogInComponent,
    DashboardComponent,
    CardStockComponent,
    MarketComponent,
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
