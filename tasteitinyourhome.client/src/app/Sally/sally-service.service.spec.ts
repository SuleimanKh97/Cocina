import { TestBed } from '@angular/core/testing';

import { SallyServiceService } from './sally-service.service';

describe('SallyServiceService', () => {
  let service: SallyServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SallyServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
