import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule, FormControl } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { Observable, map, startWith } from 'rxjs';

export interface Language {
  code: string;
  name: string;
  isCommon?: boolean;
}

@Component({
  selector: 'lib-language-selector',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatAutocompleteModule,
  ],
  templateUrl: './language-selector.html',
  styleUrl: './language-selector.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => LanguageSelector),
      multi: true,
    },
  ],
})
export class LanguageSelector implements ControlValueAccessor, OnInit {
  @Input() label = 'Course Language';
  @Input() placeholder = 'Select a language';

  searchControl = new FormControl('');
  filteredLanguages$!: Observable<Language[]>;

  languages: Language[] = [
    { code: 'en', name: 'English', isCommon: true },
    { code: 'es', name: 'Spanish', isCommon: true },
    { code: 'fr', name: 'French', isCommon: true },
    { code: 'de', name: 'German', isCommon: true },
    { code: 'pt', name: 'Portuguese', isCommon: true },
    { code: 'zh', name: 'Chinese (Mandarin)', isCommon: true },
    { code: 'ja', name: 'Japanese', isCommon: true },
    { code: 'ko', name: 'Korean', isCommon: true },
    { code: 'ar', name: 'Arabic' },
    { code: 'hi', name: 'Hindi' },
    { code: 'it', name: 'Italian' },
    { code: 'nl', name: 'Dutch' },
    { code: 'pl', name: 'Polish' },
    { code: 'ru', name: 'Russian' },
    { code: 'tr', name: 'Turkish' },
    { code: 'vi', name: 'Vietnamese' },
  ];

  private selectedValue: string | null = null;
  private onChange: (value: string | null) => void = () => {};
  private onTouched: () => void = () => {};

  ngOnInit(): void {
    this.filteredLanguages$ = this.searchControl.valueChanges.pipe(
      startWith(''),
      map((search) => this.filterLanguages(search || ''))
    );
  }

  private filterLanguages(search: string): Language[] {
    const filterValue = search.toLowerCase();
    const filtered = this.languages.filter(
      (lang) =>
        lang.name.toLowerCase().includes(filterValue) ||
        lang.code.toLowerCase().includes(filterValue)
    );

    // Sort common languages first
    return filtered.sort((a, b) => {
      if (a.isCommon && !b.isCommon) return -1;
      if (!a.isCommon && b.isCommon) return 1;
      return a.name.localeCompare(b.name);
    });
  }

  writeValue(value: string | null): void {
    this.selectedValue = value;
    const language = this.languages.find((l) => l.code === value);
    this.searchControl.setValue(language?.name || '', { emitEvent: false });
  }

  registerOnChange(fn: (value: string | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    if (isDisabled) {
      this.searchControl.disable();
    } else {
      this.searchControl.enable();
    }
  }

  onOptionSelected(language: Language): void {
    this.selectedValue = language.code;
    this.onChange(language.code);
    this.onTouched();
  }

  displayFn(language: Language): string {
    return language?.name || '';
  }

  onBlur(): void {
    this.onTouched();
  }
}
