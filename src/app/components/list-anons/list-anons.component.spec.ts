import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAnonsComponent } from './list-anons.component';

describe('ListAnonsComponent', () => {
  let component: ListAnonsComponent;
  let fixture: ComponentFixture<ListAnonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListAnonsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListAnonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
