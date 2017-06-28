import { TestBed, async, inject } from '@angular/core/testing';

import { GlobalParamForChildGuard } from './global-param-for-child.guard';

describe('GlobalParamGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GlobalParamForChildGuard]
    });
  });

  it('should ...', inject([GlobalParamForChildGuard], (guard: GlobalParamForChildGuard) => {
    expect(guard).toBeTruthy();
  }));
});
