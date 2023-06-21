import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { provideAnimations } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideAnimations()],
      imports: [StoreModule.forRoot({}), ReactiveFormsModule, LoginComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render Sign in title', () => {
    const compiled = fixture.debugElement.nativeElement;

    expect(compiled.querySelector('.mat-card-title').textContent).toContain('Sign in');
  });

  it('should render Sign in button', () => {
    const compiled = fixture.debugElement.nativeElement;

    expect(compiled.querySelector('button').textContent).toContain('Sign in');
  });

  it('should render form input with Email label', () => {
    const compiled = fixture.debugElement.nativeElement;

    expect(compiled.querySelector('form').textContent).toContain('Email');
  });

  it('should render form input with Password label', () => {
    const compiled = fixture.debugElement.nativeElement;

    expect(compiled.querySelector('form').textContent).toContain('Password');
  });
});
