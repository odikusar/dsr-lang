import { TestBed } from '@angular/core/testing';
import { RandomNumberService } from './random-number.service';

describe('RandomNumberService', () => {
  let service: RandomNumberService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RandomNumberService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return numeric value', () => {
    expect(service.get(1, 10000)).toBeInstanceOf(Number);
  });

  it('should return random value', () => {
    expect(service.get(1, 1000000) === service.get(1, 1000000)).toBeFalse();
  });

  it('should return value within bounds', () => {
    expect(service.get(1, 100) >= 1).toBeTrue();
    expect(service.get(1, 100) <= 100).toBeTrue();
  });
});
