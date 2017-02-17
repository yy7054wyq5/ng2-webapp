/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { RemService } from './rem.service';

describe('RemService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RemService]
    });
  });

  it('should ...', inject([RemService], (service: RemService) => {
    expect(service).toBeTruthy();
  }));
});
