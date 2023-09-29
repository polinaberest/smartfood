import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FridgeInstallationRequestsComponent } from './fridge-installation-requests.component';

describe('FridgeInstallationRequestsComponent', () => {
  let component: FridgeInstallationRequestsComponent;
  let fixture: ComponentFixture<FridgeInstallationRequestsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FridgeInstallationRequestsComponent]
    });
    fixture = TestBed.createComponent(FridgeInstallationRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
