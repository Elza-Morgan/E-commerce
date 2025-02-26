import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { checkTokenSkipTestGuard } from './check-token--skip-test.guard';

describe('checkTokenSkipTestGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => checkTokenSkipTestGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
