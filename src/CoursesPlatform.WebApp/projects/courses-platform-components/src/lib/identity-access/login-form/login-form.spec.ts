import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { LoginForm } from './login-form';

describe('LoginForm', () => {
  let component: LoginForm;
  let fixture: ComponentFixture<LoginForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginForm, ReactiveFormsModule, NoopAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have invalid form initially', () => {
    expect(component.loginForm.valid).toBe(false);
  });

  it('should validate email field', () => {
    const emailControl = component.loginForm.get('email');

    emailControl?.setValue('');
    expect(emailControl?.hasError('required')).toBe(true);

    emailControl?.setValue('invalid');
    expect(emailControl?.hasError('email')).toBe(true);

    emailControl?.setValue('valid@email.com');
    expect(emailControl?.valid).toBe(true);
  });

  it('should validate password field', () => {
    const passwordControl = component.loginForm.get('password');

    passwordControl?.setValue('');
    expect(passwordControl?.hasError('required')).toBe(true);

    passwordControl?.setValue('short');
    expect(passwordControl?.hasError('minlength')).toBe(true);

    passwordControl?.setValue('longenough');
    expect(passwordControl?.valid).toBe(true);
  });

  it('should emit login event when form is valid', () => {
    const loginSpy = vi.spyOn(component.login, 'emit');

    component.loginForm.patchValue({
      email: 'test@example.com',
      password: 'password123',
      rememberMe: true,
    });

    component.onSubmit();

    expect(loginSpy).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password123',
      rememberMe: true,
    });
  });

  it('should not emit login event when form is invalid', () => {
    const loginSpy = vi.spyOn(component.login, 'emit');

    component.onSubmit();

    expect(loginSpy).not.toHaveBeenCalled();
  });

  it('should emit forgotPassword event', () => {
    const forgotSpy = vi.spyOn(component.forgotPassword, 'emit');
    component.onForgotPassword();
    expect(forgotSpy).toHaveBeenCalled();
  });

  it('should emit register event', () => {
    const registerSpy = vi.spyOn(component.register, 'emit');
    component.onRegister();
    expect(registerSpy).toHaveBeenCalled();
  });

  it('should return correct email error message', () => {
    const emailControl = component.loginForm.get('email');
    emailControl?.markAsTouched();

    emailControl?.setValue('');
    expect(component.emailError).toBe('Email is required');

    emailControl?.setValue('invalid');
    expect(component.emailError).toBe('Please enter a valid email address');
  });
});
