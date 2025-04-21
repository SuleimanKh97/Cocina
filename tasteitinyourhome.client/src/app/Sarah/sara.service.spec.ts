import { TestBed } from '@angular/core/testing';

import { SaraService } from './sara.service';

describe('SaraService', () => {
  let service: SaraService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SaraService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
