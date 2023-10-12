import { TestBed } from '@angular/core/testing';

import { FridgeInstallService } from './fridge-install.service';

describe('FridgeInstallService', () => {
  let service: FridgeInstallService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FridgeInstallService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
