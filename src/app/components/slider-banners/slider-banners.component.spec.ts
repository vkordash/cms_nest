import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SliderBannersComponent } from './slider-banners.component';

describe('SliderBannersComponent', () => {
  let component: SliderBannersComponent;
  let fixture: ComponentFixture<SliderBannersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SliderBannersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SliderBannersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
