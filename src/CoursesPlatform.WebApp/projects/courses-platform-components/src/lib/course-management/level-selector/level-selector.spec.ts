import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { LevelSelector } from './level-selector';

describe('LevelSelector', () => {
  let component: LevelSelector;
  let fixture: ComponentFixture<LevelSelector>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LevelSelector, ReactiveFormsModule, NoopAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(LevelSelector);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have four level options', () => {
    expect(component.levels.length).toBe(4);
  });

  it('should include beginner, intermediate, advanced, and all_levels', () => {
    const values = component.levels.map((l) => l.value);
    expect(values).toContain('beginner');
    expect(values).toContain('intermediate');
    expect(values).toContain('advanced');
    expect(values).toContain('all_levels');
  });

  it('should implement ControlValueAccessor', () => {
    const onChange = vi.fn();
    const onTouched = vi.fn();

    component.registerOnChange(onChange);
    component.registerOnTouched(onTouched);

    component.writeValue('intermediate');
    expect(component.levelControl.value).toBe('intermediate');

    component.onSelectionChange('advanced');
    expect(onChange).toHaveBeenCalledWith('advanced');
    expect(onTouched).toHaveBeenCalled();
  });

  it('should handle disabled state', () => {
    component.setDisabledState(true);
    expect(component.levelControl.disabled).toBe(true);

    component.setDisabledState(false);
    expect(component.levelControl.disabled).toBe(false);
  });
});
