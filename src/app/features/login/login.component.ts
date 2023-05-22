import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DEMO_USER } from '@app/constants';
import { AuthFacade } from '@state/auth';

interface LoginForm {
  email: FormControl<string>;
  password: FormControl<string>;
}

@Component({
  selector: 'dsr-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  submit() {
    if (this.form.valid) {
      const { email, password } = this.form.value;

      this.authFacade.signIn({ email, password });

      // this.authFacade.signIn({ email: 'test@test.io', password: 'A12345678!' });
    }
  }
  error$ = this.authFacade.error$;

  constructor(private authFacade: AuthFacade) {}

  isLoading$ = this.authFacade.isLoading$;

  form = new FormGroup<LoginForm>({
    email: new FormControl(DEMO_USER.EMAIL, {
      validators: [Validators.required, Validators.email],
    }),
    password: new FormControl(DEMO_USER.PASSWORD, {
      validators: [Validators.required],
    }),
  });
}
