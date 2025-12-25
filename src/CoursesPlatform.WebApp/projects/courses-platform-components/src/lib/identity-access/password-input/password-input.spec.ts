import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { PasswordInput } from './password-input';

describe('PasswordInput', () => {
  let component: PasswordInput;
  let fixture: ComponentFixture<PasswordInput>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PasswordInput, ReactiveFormsModule, NoopAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(PasswordInput);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle password visibility', () => {
    expect(component.hidePassword).toBe(true);
    component.toggleVisibility();
    expect(component.hidePassword).toBe(false);
    component.toggleVisibility();
    expect(component.hidePassword).toBe(true);
  });

  it('should calculate weak password strength', () => {
    component.calculateStrength('abc');
    expect(component.strength.label).toBe('Weak');
    expect(component.strength.score).toBeLessThan(30);
  });

  it('should calculate fair password strength', () => {
    // abcdefgh = 25 (length>=8) + 20 (lowercase) = 45 (Fair: 30-59)
    component.calculateStrength('abcdefgh');
    expect(component.strength.label).toBe('Fair');
  });

  it('should calculate good password strength', () => {
    // Abcdefgh = 25 (length>=8) + 20 (uppercase) + 20 (lowercase) = 65 (Good: 60-79)
    component.calculateStrength('Abcdefgh');
    expect(component.strength.label).toBe('Good');
  });

  it('should calculate strong password strength', () => {
    component.calculateStrength('Abcdefgh1!@#');
    expect(component.strength.label).toBe('Strong');
  });

  it('should implement ControlValueAccessor', () => {
    const onChange = vi.fn();
    const onTouched = vi.fn();

    component.registerOnChange(onChange);
    component.registerOnTouched(onTouched);

    component.writeValue('test');
    expect(component.passwordControl.value).toBe('test');

    const event = { target: { value: 'newvalue' } } as unknown as Event;
    component.onInput(event);
    expect(onChange).toHaveBeenCalledWith('newvalue');

    component.onBlur();
    expect(onTouched).toHaveBeenCalled();
  });

  it('should handle disabled state', () => {
    component.setDisabledState(true);
    expect(component.passwordControl.disabled).toBe(true);

    component.setDisabledState(false);
    expect(component.passwordControl.disabled).toBe(false);
  });
});
