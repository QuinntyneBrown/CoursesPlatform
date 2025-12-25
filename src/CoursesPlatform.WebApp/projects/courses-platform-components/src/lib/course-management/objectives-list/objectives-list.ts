import { Component, forwardRef, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule, FormControl } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'lib-objectives-list',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    DragDropModule,
  ],
  templateUrl: './objectives-list.html',
  styleUrl: './objectives-list.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ObjectivesList),
      multi: true,
    },
  ],
})
export class ObjectivesList implements ControlValueAccessor {
  @Input() label = 'Learning Objectives';
  @Input() minObjectives = 4;
  @Input() maxObjectives = 10;
  @Input() minLength = 10;
  @Input() maxLength = 200;
  @Input() placeholder = 'Students will be able to...';

  objectives: string[] = [];
  newObjectiveControl = new FormControl('');
  editingIndex: number | null = null;
  editControl = new FormControl('');

  private onChange: (value: string[]) => void = () => {};
  private onTouched: () => void = () => {};

  get validationMessage(): string {
    if (this.objectives.length < this.minObjectives) {
      return `Add at least ${this.minObjectives} learning objectives (${this.objectives.length}/${this.minObjectives})`;
    }
    return '';
  }

  get canAddMore(): boolean {
    return this.objectives.length < this.maxObjectives;
  }

  get newObjectiveError(): string {
    const value = this.newObjectiveControl.value || '';
    if (value.length > 0 && value.length < this.minLength) {
      return `Objective must be at least ${this.minLength} characters`;
    }
    if (value.length > this.maxLength) {
      return `Objective must not exceed ${this.maxLength} characters`;
    }
    return '';
  }

  writeValue(value: string[]): void {
    this.objectives = value || [];
  }

  registerOnChange(fn: (value: string[]) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  addObjective(): void {
    const value = (this.newObjectiveControl.value || '').trim();
    if (
      value.length >= this.minLength &&
      value.length <= this.maxLength &&
      this.canAddMore
    ) {
      this.objectives = [...this.objectives, value];
      this.newObjectiveControl.setValue('');
      this.onChange(this.objectives);
      this.onTouched();
    }
  }

  removeObjective(index: number): void {
    this.objectives = this.objectives.filter((_, i) => i !== index);
    this.onChange(this.objectives);
    this.onTouched();
  }

  startEdit(index: number): void {
    this.editingIndex = index;
    this.editControl.setValue(this.objectives[index]);
  }

  saveEdit(): void {
    if (this.editingIndex === null) return;

    const value = (this.editControl.value || '').trim();
    if (value.length >= this.minLength && value.length <= this.maxLength) {
      this.objectives = this.objectives.map((obj, i) =>
        i === this.editingIndex ? value : obj
      );
      this.editingIndex = null;
      this.onChange(this.objectives);
      this.onTouched();
    }
  }

  cancelEdit(): void {
    this.editingIndex = null;
  }

  onDrop(event: CdkDragDrop<string[]>): void {
    moveItemInArray(this.objectives, event.previousIndex, event.currentIndex);
    this.objectives = [...this.objectives];
    this.onChange(this.objectives);
  }

  onKeyPress(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      event.preventDefault();
      this.addObjective();
    }
  }
}
