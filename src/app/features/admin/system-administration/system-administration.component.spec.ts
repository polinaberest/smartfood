import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemAdministrationComponent } from './system-administration.component';

describe('SystemAdministrationComponent', () => {
  let component: SystemAdministrationComponent;
  let fixture: ComponentFixture<SystemAdministrationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SystemAdministrationComponent]
    });
    fixture = TestBed.createComponent(SystemAdministrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
