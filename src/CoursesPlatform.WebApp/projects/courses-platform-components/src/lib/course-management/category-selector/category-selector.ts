import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule, FormControl } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatTreeModule, MatTreeNestedDataSource } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NestedTreeControl } from '@angular/cdk/tree';

export interface Category {
  categoryId: string;
  name: string;
  children?: Category[];
}

export interface CategorySelection {
  categoryId: string;
  subcategoryId?: string;
}

@Component({
  selector: 'lib-category-selector',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatTreeModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './category-selector.html',
  styleUrl: './category-selector.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CategorySelector),
      multi: true,
    },
  ],
})
export class CategorySelector implements ControlValueAccessor, OnInit {
  @Input() label = 'Category';
  @Input() categories: Category[] = [];

  searchControl = new FormControl('');
  treeControl = new NestedTreeControl<Category>((node) => node.children);
  dataSource = new MatTreeNestedDataSource<Category>();

  selectedCategory: Category | null = null;
  selectedSubcategory: Category | null = null;
  isExpanded = false;

  private onChange: (value: CategorySelection | null) => void = () => {};
  private onTouched: () => void = () => {};

  ngOnInit(): void {
    this.dataSource.data = this.categories;
  }

  hasChild = (_: number, node: Category): boolean =>
    !!node.children && node.children.length > 0;

  writeValue(value: CategorySelection | null): void {
    if (value) {
      this.selectedCategory =
        this.categories.find((c) => c.categoryId === value.categoryId) || null;
      if (this.selectedCategory?.children && value.subcategoryId) {
        this.selectedSubcategory =
          this.selectedCategory.children.find(
            (s) => s.categoryId === value.subcategoryId
          ) || null;
      }
    } else {
      this.selectedCategory = null;
      this.selectedSubcategory = null;
    }
  }

  registerOnChange(fn: (value: CategorySelection | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  get displayValue(): string {
    if (this.selectedSubcategory) {
      return `${this.selectedCategory?.name} > ${this.selectedSubcategory.name}`;
    }
    return this.selectedCategory?.name || '';
  }

  toggleExpand(): void {
    this.isExpanded = !this.isExpanded;
  }

  selectCategory(category: Category, isSubcategory = false): void {
    if (isSubcategory) {
      this.selectedSubcategory = category;
    } else {
      this.selectedCategory = category;
      this.selectedSubcategory = null;

      if (category.children && category.children.length > 0) {
        this.treeControl.expand(category);
        return;
      }
    }

    const selection: CategorySelection = {
      categoryId: this.selectedCategory?.categoryId || '',
      subcategoryId: this.selectedSubcategory?.categoryId,
    };

    this.onChange(selection);
    this.onTouched();
    this.isExpanded = false;
  }

  clearSelection(): void {
    this.selectedCategory = null;
    this.selectedSubcategory = null;
    this.onChange(null);
  }
}
