import { NO_ERRORS_SCHEMA } from "@angular/core";
import { LearnComponent } from "./learn.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";

describe("LearnComponent", () => {

  let fixture: ComponentFixture<LearnComponent>;
  let component: LearnComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
      ],
      declarations: [LearnComponent]
    });

    fixture = TestBed.createComponent(LearnComponent);
    component = fixture.componentInstance;

  });

  it("should be able to create component instance", () => {
    expect(component).toBeDefined();
  });
  
});
