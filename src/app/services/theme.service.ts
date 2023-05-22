import { Injectable } from '@angular/core';
import { IS_DARK_THEME_BY_DEFAULT } from '@app/constants/core.const';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  isDarkTheme$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.getPresetTheme());

  toggleTheme(): void {
    this.isDarkTheme$.next(!this.isDarkTheme$.value);
    localStorage.setItem('isDarkTheme', JSON.stringify(this.isDarkTheme$.value));
  }

  private getPresetTheme(): boolean {
    const isDarkTheme: boolean | null = JSON.parse(localStorage.getItem('isDarkTheme'));

    return typeof isDarkTheme == 'boolean' ? isDarkTheme : IS_DARK_THEME_BY_DEFAULT;
  }
}
