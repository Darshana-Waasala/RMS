import { TestBed, inject } from '@angular/core/testing';

import { MiddleLayerService } from './middle-layer.service';

describe('MiddleLayerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MiddleLayerService]
    });
  });

  it('should be created', inject([MiddleLayerService], (service: MiddleLayerService) => {
    expect(service).toBeTruthy();
  }));
});
