import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RegisterForm } from './register-form';

describe('RegisterForm', () => {
  let component: RegisterForm;
  let fixture: ComponentFixture<RegisterForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterForm, ReactiveFormsModule, NoopAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have invalid form initially', () => {
    expect(component.registerForm.valid).toBe(false);
  });

  it('should validate first name field', () => {
    const control = component.registerForm.get('firstName');
    control?.markAsTouched();

    control?.setValue('');
    expect(component.getFieldError('firstName')).toBe('First name is required');

    control?.setValue('John');
    expect(component.getFieldError('firstName')).toBe('');
  });

  it('should validate email field', () => {
    const control = component.registerForm.get('email');
    control?.markAsTouched();

    control?.setValue('invalid');
    expect(component.getFieldError('email')).toBe('Please enter a valid email address');

    control?.setValue('valid@example.com');
    expect(component.getFieldError('email')).toBe('');
  });

  it('should validate password strength', () => {
    const control = component.registerForm.get('password');
    control?.markAsTouched();

    control?.setValue('weak');
    expect(control?.hasError('minlength')).toBe(true);

    control?.setValue('nouppercaseornumber');
    expect(control?.hasError('passwordStrength')).toBe(true);

    control?.setValue('ValidPass1');
    expect(control?.valid).toBe(true);
  });

  it('should validate password match', () => {
    component.registerForm.patchValue({
      password: 'ValidPass1',
      confirmPassword: 'DifferentPass1',
    });

    expect(component.registerForm.hasError('passwordMismatch')).toBe(true);

    component.registerForm.patchValue({
      confirmPassword: 'ValidPass1',
    });

    expect(component.registerForm.hasError('passwordMismatch')).toBe(false);
  });

  it('should emit register event when form is valid', () => {
    const registerSpy = vi.spyOn(component.register, 'emit');

    component.registerForm.patchValue({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      password: 'ValidPass1',
      confirmPassword: 'ValidPass1',
    });

    component.onSubmit();

    expect(registerSpy).toHaveBeenCalledWith({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      password: 'ValidPass1',
    });
  });

  it('should emit login event', () => {
    const loginSpy = vi.spyOn(component.login, 'emit');
    component.onLogin();
    expect(loginSpy).toHaveBeenCalled();
  });
});
