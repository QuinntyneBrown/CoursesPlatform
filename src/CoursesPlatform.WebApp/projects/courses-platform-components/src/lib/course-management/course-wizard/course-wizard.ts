import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CourseBasicInfoForm, CourseBasicInfo } from '../course-basic-info-form/course-basic-info-form';
import { ThumbnailUpload, ThumbnailUploadEvent } from '../thumbnail-upload/thumbnail-upload';
import { CategorySelector, Category, CategorySelection } from '../category-selector/category-selector';
import { LevelSelector, CourseLevel } from '../level-selector/level-selector';
import { LanguageSelector } from '../language-selector/language-selector';
import { ObjectivesList } from '../objectives-list/objectives-list';

export interface CourseWizardData {
  basicInfo: CourseBasicInfo;
  thumbnailUrl?: string;
  category?: CategorySelection;
  level?: CourseLevel;
  language?: string;
  objectives: string[];
}

export interface WizardStepChange {
  currentStep: number;
  previousStep: number;
  data: Partial<CourseWizardData>;
}

@Component({
  selector: 'lib-course-wizard',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatStepperModule,
    MatButtonModule,
    MatIconModule,
    CourseBasicInfoForm,
    ThumbnailUpload,
    CategorySelector,
    LevelSelector,
    LanguageSelector,
    ObjectivesList,
  ],
  templateUrl: './course-wizard.html',
  styleUrl: './course-wizard.scss',
})
export class CourseWizard {
  @Input() categories: Category[] = [];
  @Input() initialData: Partial<CourseWizardData> = {};
  @Input() isLoading = false;

  @Output() stepChange = new EventEmitter<WizardStepChange>();
  @Output() complete = new EventEmitter<CourseWizardData>();
  @Output() cancel = new EventEmitter<void>();
  @Output() saveDraft = new EventEmitter<Partial<CourseWizardData>>();

  currentStep = 0;
  basicInfoValid = false;
  objectivesValid = false;

  data: CourseWizardData = {
    basicInfo: { title: '', subtitle: '', description: '' },
    objectives: [],
  };

  steps = [
    { label: 'Basic Information', icon: 'info' },
    { label: 'Media', icon: 'image' },
    { label: 'Settings', icon: 'settings' },
    { label: 'Learning Objectives', icon: 'lightbulb' },
  ];

  onBasicInfoChange(info: CourseBasicInfo): void {
    this.data.basicInfo = info;
  }

  onBasicInfoValidityChange(isValid: boolean): void {
    this.basicInfoValid = isValid;
  }

  onThumbnailChange(event: ThumbnailUploadEvent): void {
    this.data.thumbnailUrl = event.preview;
  }

  onThumbnailRemove(): void {
    this.data.thumbnailUrl = undefined;
  }

  onCategoryChange(category: CategorySelection | null): void {
    this.data.category = category || undefined;
  }

  onLevelChange(level: CourseLevel | null): void {
    this.data.level = level || undefined;
  }

  onLanguageChange(language: string | null): void {
    this.data.language = language || undefined;
  }

  onObjectivesChange(objectives: string[]): void {
    this.data.objectives = objectives;
    this.objectivesValid = objectives.length >= 4;
  }

  onStepChange(previousStep: number, currentStep: number): void {
    this.currentStep = currentStep;
    this.stepChange.emit({
      currentStep,
      previousStep,
      data: this.data,
    });
  }

  canProceedFromStep(stepIndex: number): boolean {
    switch (stepIndex) {
      case 0:
        return this.basicInfoValid;
      case 1:
        return true; // Thumbnail is optional
      case 2:
        return !!this.data.level && !!this.data.language;
      case 3:
        return this.objectivesValid;
      default:
        return true;
    }
  }

  onComplete(): void {
    if (this.canProceedFromStep(3)) {
      this.complete.emit(this.data);
    }
  }

  onCancel(): void {
    this.cancel.emit();
  }

  onSaveDraft(): void {
    this.saveDraft.emit(this.data);
  }
}
