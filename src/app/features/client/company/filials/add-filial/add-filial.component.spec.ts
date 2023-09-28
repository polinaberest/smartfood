import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFilialComponent } from './add-filial.component';

describe('AddFilialComponent', () => {
  let component: AddFilialComponent;
  let fixture: ComponentFixture<AddFilialComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddFilialComponent]
    });
    fixture = TestBed.createComponent(AddFilialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
