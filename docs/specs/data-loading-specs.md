# Data Loading and Display Requirements

## Overview
This document defines the required approach for loading and displaying data in Angular components using RxJS observables and the async pipe pattern.

---

## Requirement: Reactive Data Loading Pattern

**All components that load and display data from services MUST use the async pipe pattern with observables exposed directly in the template, rather than manually subscribing and managing state.**

---

## Acceptance Criteria

### ✅ MUST Requirements

1. **Observable Exposure**: Components MUST expose observables (ending with `$` suffix) as public properties that can be consumed directly in templates
2. **Async Pipe Usage**: Templates MUST use the Angular `async` pipe to subscribe to observables
3. **No Manual Subscriptions**: Components MUST NOT manually call `.subscribe()` on observables in lifecycle hooks
4. **No State Management**: Components MUST NOT maintain local state properties that duplicate data from observables
5. **Automatic Cleanup**: Subscriptions MUST be automatically managed by the async pipe (no manual unsubscription needed)
6. **View Model Pattern**: When transformation is needed, components SHOULD use RxJS operators (e.g., `map`) to create view model observables

### ❌ MUST NOT Requirements

1. Components MUST NOT implement `OnInit` solely for subscribing to data observables
2. Components MUST NOT store observable data in component properties manually
3. Components MUST NOT create memory leaks by leaving subscriptions unmanaged

---

## Examples

### ✅ CORRECT Implementation

**Component: [correct.ts](src/app/correct/correct.ts)**

```typescript
import { Component, inject } from '@angular/core';
import { DataService } from '../data-service';
import { map } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-correct',
  imports: [CommonModule],
  templateUrl: './correct.html',
  styleUrl: './correct.scss',
})
export class Correct {

  _dataService = inject(DataService);

  // ✅ Observable exposed directly for template consumption
  viewModel$ = this._dataService.get().pipe(
    map(x => ({ message: x }))
  );
}
```

**Template: [correct.html](src/app/correct/correct.html)**

```html
<ng-container *ngIf="viewModel$ | async as vm">
    <h1>{{ vm.message }}</h1>
</ng-container>
```

**Why This Is Correct:**

- ✅ Observable is exposed as a public property (`viewModel$`)
- ✅ Uses async pipe in template for automatic subscription management
- ✅ No manual subscribe() calls
- ✅ No lifecycle hooks needed for data loading
- ✅ Automatic unsubscription when component is destroyed
- ✅ Uses RxJS operators (`map`) for data transformation
- ✅ No memory leaks possible
- ✅ Cleaner, more declarative code
- ✅ Better performance (OnPush change detection compatible)

---

### ❌ INCORRECT Implementation (Bad Practice)

**Component: [incorrect.ts](src/app/incorrect/incorrect.ts)**

```typescript
import { Component, inject, OnInit } from '@angular/core';
import { DataService } from '../data-service';

@Component({
  selector: 'app-incorrect',
  imports: [],
  templateUrl: './incorrect.html',
  styleUrl: './incorrect.scss',
})
export class Incorrect implements OnInit {

  _dataService = inject(DataService);

  // ❌ Local state property instead of observable
  message: string = '';

  // ❌ Manual subscription in lifecycle hook
  ngOnInit(): void {
    this._dataService.get().subscribe(data => {
      this.message = data;
    });
  }
}
```

**Template: [incorrect.html](src/app/incorrect/incorrect.html)**

```html
<h1>{{ message }}</h1>
```

**Why This Is INCORRECT:**

- ❌ Manual `.subscribe()` call creates potential memory leak
- ❌ No unsubscription logic (subscription never cleaned up)
- ❌ Duplicates data in local component state (`message`)
- ❌ Requires `OnInit` lifecycle hook unnecessarily
- ❌ More boilerplate code
- ❌ Imperative rather than declarative
- ❌ Incompatible with OnPush change detection without extra work
- ❌ Harder to test and reason about
- ❌ Violates Angular best practices

---

## Anti-Pattern Analysis: The Incorrect Component

The [incorrect.ts](src/app/incorrect/incorrect.ts) component demonstrates a **common anti-pattern** that violates Angular and RxJS best practices:

### Problem 1: Memory Leaks
```typescript
ngOnInit(): void {
  this._dataService.get().subscribe(data => {  // ❌ Subscription never cleaned up
    this.message = data;
  });
}
```

**Issue**: The subscription is never unsubscribed. When the component is destroyed, the subscription remains active, causing a memory leak.

**Impact**: In a real application with long-lived observables (HTTP requests, WebSockets, intervals), this leads to:
- Memory leaks
- Multiple active subscriptions
- Unexpected behavior
- Performance degradation

### Problem 2: Unnecessary State Management
```typescript
message: string = '';  // ❌ Duplicates observable data
```

**Issue**: Creates a separate source of truth. The data exists in the observable stream AND in the component property.

**Impact**:
- Synchronization issues
- More code to maintain
- Harder to debug
- Not reactive

### Problem 3: Imperative Code
**Issue**: Uses imperative programming (subscribe and manually set value) instead of declarative (async pipe).

**Impact**:
- Less readable
- More error-prone
- Harder to compose operations
- Doesn't leverage Angular's reactive features

---

## Best Practices Summary

### DO ✅
- Use the async pipe for all observable subscriptions in templates
- Expose observables directly as component properties
- Use RxJS operators (`map`, `filter`, `switchMap`, etc.) for transformations
- Name observable properties with `$` suffix (e.g., `data$`, `viewModel$`)
- Let Angular manage subscription lifecycle

### DON'T ❌
- Manually subscribe in components (except for side effects like navigation)
- Store observable data in component properties
- Forget to unsubscribe from manual subscriptions
- Implement lifecycle hooks just for subscribing to observables
- Create memory leaks

---

## Migration Guide

If you have components using the incorrect pattern, follow these steps:

1. **Remove manual subscriptions** from `ngOnInit` or other lifecycle hooks
2. **Remove state properties** that store observable data
3. **Expose observables** as public properties with `$` suffix
4. **Update templates** to use async pipe: `*ngIf="observable$ | async as data"`
5. **Remove lifecycle interfaces** if they're only used for subscriptions
6. **Import CommonModule** if using structural directives like `*ngIf`

### Example Migration

**Before (Incorrect):**
```typescript
export class MyComponent implements OnInit {
  data: any;

  ngOnInit() {
    this.service.getData().subscribe(result => {
      this.data = result;
    });
  }
}
```

**After (Correct):**
```typescript
export class MyComponent {
  data$ = this.service.getData();
}
```

Template: `<div *ngIf="data$ | async as data">{{ data }}</div>`

---

## Testing Implications

### Correct Pattern Benefits for Testing
- Easier to test: just verify the observable stream
- No need to trigger lifecycle hooks
- Can use marble testing for complex scenarios
- Pure, functional approach

### Incorrect Pattern Testing Challenges
- Must trigger `ngOnInit()`
- Must wait for async operations
- Harder to mock subscriptions
- More test setup required

---

## Performance Considerations

The **correct pattern** (async pipe) enables:
- OnPush change detection strategy (better performance)
- Automatic unsubscription (prevents memory leaks)
- Built-in null checking with `*ngIf`
- Lazy evaluation

The **incorrect pattern** (manual subscribe) results in:
- Default change detection (less efficient)
- Potential memory leaks
- Manual cleanup required
- More change detection cycles

---

## Conclusion

**Always use the async pipe pattern** as demonstrated in the [Correct](src/app/correct/correct.ts) component. The [Incorrect](src/app/incorrect/incorrect.ts) component serves as an example of what NOT to do and represents a common anti-pattern that should be avoided in all Angular applications.

This approach leads to:
- Cleaner code
- Better performance
- Fewer bugs
- Easier maintenance
- Angular best practices compliance
