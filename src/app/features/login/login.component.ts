import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuthFacade } from '@state/auth';

@Component({
  selector: 'dsr-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  constructor(private authFacade: AuthFacade) {}

  isLoading$ = this.authFacade.isLoading$;

  signIn(): void {
    this.authFacade.signIn({ email: 'test@test.io', password: 'A12345678!' });
  }

  signInOleg(): void {
    this.authFacade.signIn({ email: 'test@test.ios', password: 'A12345678!' });
  }
}
