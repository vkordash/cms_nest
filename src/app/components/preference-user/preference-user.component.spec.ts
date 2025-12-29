import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreferenceUserComponent } from './preference-user.component';

describe('PreferenceUserComponent', () => {
  let component: PreferenceUserComponent;
  let fixture: ComponentFixture<PreferenceUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreferenceUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreferenceUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
