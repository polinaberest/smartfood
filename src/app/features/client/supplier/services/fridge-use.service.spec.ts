import { TestBed } from '@angular/core/testing';

import { FridgeUseService } from './fridge-use.service';

describe('FridgeUseService', () => {
  let service: FridgeUseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FridgeUseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
