import { TestBed } from '@angular/core/testing';

import { SynchronousService } from './synchronous.service';

describe('SynchronousService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SynchronousService = TestBed.get(SynchronousService);
    expect(service).toBeTruthy();
  });
});
