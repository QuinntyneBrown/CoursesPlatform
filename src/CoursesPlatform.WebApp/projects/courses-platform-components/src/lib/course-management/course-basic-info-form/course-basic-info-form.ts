import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

export interface CourseBasicInfo {
  title: string;
  subtitle: string;
  description: string;
}

@Component({
  selector: 'lib-course-basic-info-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './course-basic-info-form.html',
  styleUrl: './course-basic-info-form.scss',
})
export class CourseBasicInfoForm implements OnInit {
  @Input() initialData: CourseBasicInfo | null = null;

  @Output() formChange = new EventEmitter<CourseBasicInfo>();
  @Output() formValidityChange = new EventEmitter<boolean>();

  form!: FormGroup;

  readonly titleMinLength = 10;
  readonly titleMaxLength = 200;
  readonly subtitleMaxLength = 300;
  readonly descriptionMinLength = 50;
  readonly descriptionMaxLength = 5000;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      title: [
        this.initialData?.title || '',
        [
          Validators.required,
          Validators.minLength(this.titleMinLength),
          Validators.maxLength(this.titleMaxLength),
        ],
      ],
      subtitle: [
        this.initialData?.subtitle || '',
        [Validators.maxLength(this.subtitleMaxLength)],
      ],
      description: [
        this.initialData?.description || '',
        [
          Validators.required,
          Validators.minLength(this.descriptionMinLength),
          Validators.maxLength(this.descriptionMaxLength),
        ],
      ],
    });

    this.form.valueChanges.subscribe((value) => {
      this.formChange.emit(value);
      this.formValidityChange.emit(this.form.valid);
    });
  }

  getFieldError(fieldName: string): string {
    const control = this.form.get(fieldName);
    if (!control?.touched || !control?.errors) return '';

    if (control.hasError('required')) {
      return `${this.getFieldLabel(fieldName)} is required`;
    }
    if (control.hasError('minlength')) {
      const minLength = control.getError('minlength').requiredLength;
      return `${this.getFieldLabel(fieldName)} must be at least ${minLength} characters`;
    }
    if (control.hasError('maxlength')) {
      const maxLength = control.getError('maxlength').requiredLength;
      return `${this.getFieldLabel(fieldName)} must not exceed ${maxLength} characters`;
    }
    return '';
  }

  private getFieldLabel(fieldName: string): string {
    const labels: Record<string, string> = {
      title: 'Title',
      subtitle: 'Subtitle',
      description: 'Description',
    };
    return labels[fieldName] || fieldName;
  }

  get titleCharCount(): number {
    return (this.form.get('title')?.value || '').length;
  }

  get subtitleCharCount(): number {
    return (this.form.get('subtitle')?.value || '').length;
  }

  get descriptionCharCount(): number {
    return (this.form.get('description')?.value || '').length;
  }
}
