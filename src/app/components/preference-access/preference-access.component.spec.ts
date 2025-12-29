import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreferenceAccessComponent } from './preference-access.component';

describe('PreferenceAccessComponent', () => {
  let component: PreferenceAccessComponent;
  let fixture: ComponentFixture<PreferenceAccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreferenceAccessComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreferenceAccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
