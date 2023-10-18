import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFridgeUriComponent } from './add-fridge-uri.component';

describe('AddFridgeUriComponent', () => {
  let component: AddFridgeUriComponent;
  let fixture: ComponentFixture<AddFridgeUriComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddFridgeUriComponent]
    });
    fixture = TestBed.createComponent(AddFridgeUriComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
