import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFridgeRequestComponent } from './add-fridge-request.component';

describe('AddFridgeRequestComponent', () => {
  let component: AddFridgeRequestComponent;
  let fixture: ComponentFixture<AddFridgeRequestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddFridgeRequestComponent]
    });
    fixture = TestBed.createComponent(AddFridgeRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
