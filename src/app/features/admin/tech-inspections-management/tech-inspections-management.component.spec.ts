import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechInspectionsManagementComponent } from './tech-inspections-management.component';

describe('TechInspectionsManagementComponent', () => {
  let component: TechInspectionsManagementComponent;
  let fixture: ComponentFixture<TechInspectionsManagementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TechInspectionsManagementComponent]
    });
    fixture = TestBed.createComponent(TechInspectionsManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
