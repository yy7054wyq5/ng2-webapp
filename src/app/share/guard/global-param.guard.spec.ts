import { TestBed, async, inject } from '@angular/core/testing';

import { GlobalParamGuard } from './global-param.guard';

describe('GlobalParamGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GlobalParamGuard]
    });
  });

  it('should ...', inject([GlobalParamGuard], (guard: GlobalParamGuard) => {
    expect(guard).toBeTruthy();
  }));
});
