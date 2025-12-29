import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmsChipsComponent } from './cms-chips.component';

describe('CmsChipsComponent', () => {
  let component: CmsChipsComponent;
  let fixture: ComponentFixture<CmsChipsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CmsChipsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CmsChipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
