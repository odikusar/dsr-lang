import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { filter, map, take, tap } from 'rxjs/operators';

import { UserFacade } from '@app/store/user';

@Injectable({
  providedIn: 'root',
})
export class UnauthGuard implements CanActivate {
  constructor(private router: Router, private userFacade: UserFacade) {}

  canActivate() {
    return this.checkRoute();
  }

  private checkRoute() {
    return this.userFacade.userState$.pipe(
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
