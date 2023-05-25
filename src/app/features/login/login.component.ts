import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DEMO_USER } from '@app/constants';
import { Actions, ofType } from '@ngrx/effects';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { UserFacade } from '@state/user';
import * as fromActions from '@state/user/user.actions';
import { Subject, take, takeUntil } from 'rxjs';

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
export class LoginComponent implements OnInit, OnDestroy {
  private loader = this.loadingBar.useRef();
  private onDestroy$: Subject<void> = new Subject();

  error$ = this.userFacade.error$;
  isLoading$ = this.userFacade.isLoading$;

  form = new FormGroup<LoginForm>({
    email: new FormControl(DEMO_USER.EMAIL, {
      validators: [Validators.required, Validators.email],
    }),
    password: new FormControl(DEMO_USER.PASSWORD, {
      validators: [Validators.required],
    }),
  });

  constructor(
    private userFacade: UserFacade,
    private loadingBar: LoadingBarService,
    private actions$: Actions,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.actions$
      .pipe(ofType(fromActions.signInSuccess), take(1))
      .subscribe(() => this.router.navigate(['/']));

    this.actions$
      .pipe(ofType(fromActions.signInSuccess, fromActions.signInFail), takeUntil(this.onDestroy$))
      .subscribe(() => this.loader.complete());
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  submit(): void {
    this.loader.start();

    if (this.form.valid) {
      const { email, password } = this.form.value;

      this.userFacade.signIn({ email, password });
    }
  }
}
