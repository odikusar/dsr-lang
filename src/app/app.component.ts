import { Component, OnInit } from '@angular/core';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { AuthFacade } from '@state/auth';
import { ThemeService } from './services/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  loader = this.loadingBar.useRef();
  isInitialized$ = this.authFacade.isInitialized$;
  isAuthorized$ = this.authFacade.isAuthorized$;
  isLoading$ = this.authFacade.isLoading$;
  user$ = this.authFacade.user$;
  isDarkTheme$ = this.themeService.isDarkTheme$;

  constructor(
    private authFacade: AuthFacade,
    private themeService: ThemeService,
    private loadingBar: LoadingBarService
  ) {}

  ngOnInit(): void {
    this.authFacade.init();
    // this.loadingBar.start();
    this.loader.start();
  }

  signOut(): void {
    this.authFacade.signOut();
  }
}
