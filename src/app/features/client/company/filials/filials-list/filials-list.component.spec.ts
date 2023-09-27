import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilialsListComponent } from './filials-list.component';

describe('FilialsListComponent', () => {
  let component: FilialsListComponent;
  let fixture: ComponentFixture<FilialsListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FilialsListComponent]
    });
    fixture = TestBed.createComponent(FilialsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
