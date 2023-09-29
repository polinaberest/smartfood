import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationsManagementComponent } from './organizations-management.component';

describe('OrganizationsManagementComponent', () => {
  let component: OrganizationsManagementComponent;
  let fixture: ComponentFixture<OrganizationsManagementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrganizationsManagementComponent]
    });
    fixture = TestBed.createComponent(OrganizationsManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
