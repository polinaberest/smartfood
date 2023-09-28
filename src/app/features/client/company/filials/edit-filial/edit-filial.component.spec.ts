import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFilialComponent } from './edit-filial.component';

describe('EditFilialComponent', () => {
  let component: EditFilialComponent;
  let fixture: ComponentFixture<EditFilialComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditFilialComponent]
    });
    fixture = TestBed.createComponent(EditFilialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
