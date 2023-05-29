import { TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { UnauthGuard } from './unauth.guard';

describe('UnauthGuard', () => {
  let guard: UnauthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [StoreModule.forRoot({})] }).compileComponents();

    guard = TestBed.inject(UnauthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
