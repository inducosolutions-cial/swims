import { TestBed } from '@angular/core/testing';

import { ApicommunicatorService } from './apicommunicator.service';

describe('ApicommunicatorService', () => {
  let service: ApicommunicatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApicommunicatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
