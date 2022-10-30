import { NO_ERRORS_SCHEMA } from "@angular/core";
import { CookieBannerComponent } from "./cookie-banner.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";

describe("CookieBannerComponent", () => {

  let fixture: ComponentFixture<CookieBannerComponent>;
  let component: CookieBannerComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
      ],
      declarations: [CookieBannerComponent]
    });

    fixture = TestBed.createComponent(CookieBannerComponent);
    component = fixture.componentInstance;

  });

  it("should be able to create component instance", () => {
    expect(component).toBeDefined();
  });
  
});
