import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { filter, map, take, tap } from 'rxjs/operators';

import { AuthFacade } from '@state/auth';

@Injectable({
  providedIn: 'root',
})
export class UnauthGuard implements CanActivate {
  constructor(private router: Router, private authFacade: AuthFacade) {}

  canActivate() {
    return this.checkRoute();
  }

  private checkRoute() {
    return this.authFacade.userState$.pipe(
      filter((state) => state.isInitialized),
      take(1),
      tap((state) => {
        if (state.isAuthorized) {
          this.router.navigate(['/']);
        }
      }),
      map((state) => !state.isAuthorized)
    );
  }
}
