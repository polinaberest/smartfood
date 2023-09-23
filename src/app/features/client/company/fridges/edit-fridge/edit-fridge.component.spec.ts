import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFridgeComponent } from './edit-fridge.component';

describe('EditFridgeComponent', () => {
  let component: EditFridgeComponent;
  let fixture: ComponentFixture<EditFridgeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditFridgeComponent]
    });
    fixture = TestBed.createComponent(EditFridgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
