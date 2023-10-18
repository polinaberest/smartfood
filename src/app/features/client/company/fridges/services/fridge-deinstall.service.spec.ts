import { TestBed } from '@angular/core/testing';

import { FridgeDeinstallService } from './fridge-deinstall.service';

describe('FridgeDeinstallService', () => {
  let service: FridgeDeinstallService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FridgeDeinstallService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
