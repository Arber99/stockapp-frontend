import { NO_ERRORS_SCHEMA } from "@angular/core";
import { NavigationComponent } from "./navigation.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";

describe("NavigationComponent", () => {

  let fixture: ComponentFixture<NavigationComponent>;
  let component: NavigationComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
      ],
      declarations: [NavigationComponent]
    });

    fixture = TestBed.createComponent(NavigationComponent);
    component = fixture.componentInstance;

  });

  it("should be able to create component instance", () => {
    expect(component).toBeDefined();
  });
  
});
