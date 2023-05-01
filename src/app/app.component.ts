import { Component, OnInit } from '@angular/core';
import { AuthFacade } from '@state/auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Dikusar Language Box';

  constructor(private authFacade: AuthFacade) {}

  isInitialized$ = this.authFacade.isInitialized$;
  isAuthorized$ = this.authFacade.isAuthorized$;
  isLoading$ = this.authFacade.isLoading$;
  user$ = this.authFacade.user$;

  ngOnInit(): void {
    this.authFacade.init();
  }

  signOut(): void {
    this.authFacade.signOut();
  }
}
