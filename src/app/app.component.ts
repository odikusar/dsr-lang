import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { AuthFacade } from '@state/auth';
import * as fromActions from '@state/auth/auth.actions';
import { filter, take } from 'rxjs';
import { ThemeService } from './services/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  private loader = this.loadingBar.useRef();
  isInitialized$ = this.authFacade.isInitialized$;
  isAuthorized$ = this.authFacade.isAuthorized$;
  isLoading$ = this.authFacade.isLoading$;
  user$ = this.authFacade.user$;
  isDarkTheme$ = this.themeService.isDarkTheme$;

  constructor(
    private authFacade: AuthFacade,
    private themeService: ThemeService,
    private loadingBar: LoadingBarService,
    private actions$: Actions,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.handleLoader();

    this.authFacade.init();
  }

  private handleLoader(): void {
    this.loader.start();

    this.isInitialized$
      .pipe(
        filter((res) => !!res),
        take(1)
      )
      .subscribe(() => this.loader.complete());
  }

  signOut(): void {
    this.actions$
      .pipe(ofType(fromActions.signOutSuccess), take(1))
      .subscribe(() => this.router.navigate(['/login']));

    this.authFacade.signOut();
  }
}
