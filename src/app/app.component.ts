import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { UserFacade } from '@state/user';
import * as fromUserActions from '@state/user/user.actions';
import { filter, take } from 'rxjs';
import { ThemeService } from './services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title: string = 'Dikusar Angular App.';

  private loader = this.loadingBar.useRef();
  isInitialized$ = this.userFacade.isInitialized$;
  isAuthorized$ = this.userFacade.isAuthorized$;
  isLoading$ = this.userFacade.isLoading$;
  user$ = this.userFacade.user$;
  isDarkTheme$ = this.themeService.isDarkTheme$;

  constructor(
    private userFacade: UserFacade,
    private themeService: ThemeService,
    private loadingBar: LoadingBarService,
    private actions$: Actions,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.handleLoader();

    this.userFacade.initAuth();
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
      .pipe(ofType(fromUserActions.signOutSuccess), take(1))
      .subscribe(() => this.router.navigate(['/login']));

    this.userFacade.signOut();
  }
}
