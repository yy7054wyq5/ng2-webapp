import { TestBed, inject } from '@angular/core/testing';

import { WeixinLoginResolveService } from './weixin-login-resolve.service';

describe('WeixinLoginResolveService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WeixinLoginResolveService]
    });
  });

  it('should be created', inject([WeixinLoginResolveService], (service: WeixinLoginResolveService) => {
    expect(service).toBeTruthy();
  }));
});
