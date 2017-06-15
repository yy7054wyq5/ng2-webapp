import { TestBed, async, inject } from '@angular/core/testing';

import { HasGuideGuard } from './has-guide.guard';

describe('HasGuideGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HasGuideGuard]
    });
  });

  it('should ...', inject([HasGuideGuard], (guard: HasGuideGuard) => {
    expect(guard).toBeTruthy();
  }));
});
