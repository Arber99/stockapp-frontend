import { NO_ERRORS_SCHEMA } from "@angular/core";
import { AccountComponent } from "./account.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";

describe("AccountComponent", () => {

  let fixture: ComponentFixture<AccountComponent>;
  let component: AccountComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
      ],
      declarations: [AccountComponent]
    });

    fixture = TestBed.createComponent(AccountComponent);
    component = fixture.componentInstance;

  });

  it("should be able to create component instance", () => {
    expect(component).toBeDefined();
  });
  
});
