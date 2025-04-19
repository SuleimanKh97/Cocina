import { TestBed } from '@angular/core/testing';

import { PasswordResetServiceService } from './password-reset-service.service';

describe('PasswordResetServiceService', () => {
  let service: PasswordResetServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PasswordResetServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
