import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreferenceListpagesComponent } from './preference-listpages.component';

describe('PreferenceListpagesComponent', () => {
  let component: PreferenceListpagesComponent;
  let fixture: ComponentFixture<PreferenceListpagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreferenceListpagesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreferenceListpagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
