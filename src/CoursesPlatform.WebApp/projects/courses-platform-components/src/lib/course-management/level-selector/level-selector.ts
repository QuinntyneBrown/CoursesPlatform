import { Component, forwardRef, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule, FormControl } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';

export type CourseLevel = 'beginner' | 'intermediate' | 'advanced' | 'all_levels';

export interface LevelOption {
  value: CourseLevel;
  label: string;
  description: string;
}

@Component({
  selector: 'lib-level-selector',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatRadioModule],
  templateUrl: './level-selector.html',
  styleUrl: './level-selector.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => LevelSelector),
      multi: true,
    },
  ],
})
export class LevelSelector implements ControlValueAccessor {
  @Input() label = 'Course Level';

  levelControl = new FormControl<CourseLevel | null>(null);

  levels: LevelOption[] = [
    {
      value: 'beginner',
      label: 'Beginner',
      description: 'No prior knowledge required',
    },
    {
      value: 'intermediate',
      label: 'Intermediate',
      description: 'Basic understanding required',
    },
    {
      value: 'advanced',
      label: 'Advanced',
      description: 'In-depth knowledge required',
    },
    {
      value: 'all_levels',
      label: 'All Levels',
      description: 'Suitable for everyone',
    },
  ];

  private onChange: (value: CourseLevel | null) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(value: CourseLevel | null): void {
    this.levelControl.setValue(value, { emitEvent: false });
  }

  registerOnChange(fn: (value: CourseLevel | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    if (isDisabled) {
      this.levelControl.disable();
    } else {
      this.levelControl.enable();
    }
  }

  onSelectionChange(value: CourseLevel): void {
    this.onChange(value);
    this.onTouched();
  }
}
