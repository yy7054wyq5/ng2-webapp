import { TestBed, inject } from '@angular/core/testing';
import { LocaldataService } from './localdata.service';

describe('LocaldataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LocaldataService]
    });
  });

  it('should ...', inject([LocaldataService], (service: LocaldataService) => {
    expect(service).toBeTruthy();
  }));
});
