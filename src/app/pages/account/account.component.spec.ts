import { NO_ERRORS_SCHEMA } from "@angular/core";
import { AccountPage } from "./account.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";

describe("AccountComponent", () => {

  let fixture: ComponentFixture<AccountPage>;
  let component: AccountPage;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
      ],
      declarations: [AccountPage]
    });

    fixture = TestBed.createComponent(AccountPage);
    component = fixture.componentInstance;

  });

  it("should be able to create component instance", () => {
    expect(component).toBeDefined();
  });
  
});
