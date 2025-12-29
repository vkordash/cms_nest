import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreferenceMenuComponent } from './preference-menu.component';

describe('PreferenceMenuComponent', () => {
  let component: PreferenceMenuComponent;
  let fixture: ComponentFixture<PreferenceMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreferenceMenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreferenceMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
