import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardStockComponent } from './card-stock.component';

describe('CardStockComponent', () => {
  let component: CardStockComponent;
  let fixture: ComponentFixture<CardStockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardStockComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
