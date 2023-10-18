import { TestBed } from '@angular/core/testing';

import { TechInspectionRequestsService } from './tech-inspection-requests.service';

describe('TechInspectionRequestsService', () => {
  let service: TechInspectionRequestsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TechInspectionRequestsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
