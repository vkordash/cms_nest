import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SliderPagesComponent } from './slider-pages.component';

describe('SliderPagesComponent', () => {
  let component: SliderPagesComponent;
  let fixture: ComponentFixture<SliderPagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SliderPagesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SliderPagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
