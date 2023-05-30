import { TestBed } from '@angular/core/testing';
import { ThemeService } from './theme.service';

describe('ThemeService', () => {
  let service: ThemeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThemeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should toggle theme value', () => {
    const prevValue = service.isDarkTheme$.value;
    service.toggleTheme();
    const newValue = service.isDarkTheme$.value;

    expect(prevValue === newValue).toBeFalse();
  });
});
