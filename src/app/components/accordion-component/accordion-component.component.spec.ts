import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccordionComponentComponent } from './accordion-component.component';

describe('AccordionComponentComponent', () => {
  let component: AccordionComponentComponent;
  let fixture: ComponentFixture<AccordionComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccordionComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccordionComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
