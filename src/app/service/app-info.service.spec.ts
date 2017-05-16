import { TestBed, inject } from '@angular/core/testing';

import { AppInfoService } from './app-info.service';

describe('AppInfoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AppInfoService]
    });
  });

  it('should be created', inject([AppInfoService], (service: AppInfoService) => {
    expect(service).toBeTruthy();
  }));
});
