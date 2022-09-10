import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardMarketComponent } from './card-market.component';

describe('CardMarketComponent', () => {
  let component: CardMarketComponent;
  let fixture: ComponentFixture<CardMarketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardMarketComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardMarketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
