import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SliderNewsComponent } from './slider-news.component';

describe('SliderNewsComponent', () => {
  let component: SliderNewsComponent;
  let fixture: ComponentFixture<SliderNewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SliderNewsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SliderNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
