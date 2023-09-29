import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuppliersManagementComponent } from './suppliers-management.component';

describe('SuppliersManagementComponent', () => {
  let component: SuppliersManagementComponent;
  let fixture: ComponentFixture<SuppliersManagementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SuppliersManagementComponent]
    });
    fixture = TestBed.createComponent(SuppliersManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
