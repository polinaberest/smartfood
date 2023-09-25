import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUseRequestComponent } from './add-use-request.component';

describe('AddUseRequestComponent', () => {
  let component: AddUseRequestComponent;
  let fixture: ComponentFixture<AddUseRequestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddUseRequestComponent]
    });
    fixture = TestBed.createComponent(AddUseRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
