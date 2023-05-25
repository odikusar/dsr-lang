import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, CanLoad, Router } from '@angular/router';
import { UserFacade } from '@state/user';
import { filter, map, take, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {
  constructor(private router: Router, private userFacade: UserFacade) {}

  canActivate() {
    return this.checkRoute();
  }

  canActivateChild() {
    return this.checkRoute();
  }

  canLoad() {
    return this.checkRoute();
  }

  private checkRoute() {
    return this.userFacade.userState$.pipe(
      filter((state) => state.isInitialized),
      take(1),
      tap((state) => {
        if (!state.isAuthorized) {
          this.router.navigate(['/login']);
        }
      }),
      map((state) => state.isAuthorized)
    );
  }
}
