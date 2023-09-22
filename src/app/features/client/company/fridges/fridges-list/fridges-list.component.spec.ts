import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FridgesListComponent } from './fridges-list.component';

describe('FridgesListComponent', () => {
  let component: FridgesListComponent;
  let fixture: ComponentFixture<FridgesListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FridgesListComponent]
    });
    fixture = TestBed.createComponent(FridgesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
