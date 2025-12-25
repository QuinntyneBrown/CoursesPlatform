# Course Management - Frontend Specification

**Feature:** Course Management
**Version:** 1.0
**Last Updated:** December 2024

---

## 1. Overview

The Course Management frontend provides interfaces for instructors to create, manage, and publish courses with rich content and metadata.

---

## 2. Requirements

### 2.1 Course Creation

#### REQ-CRS-FE-001: Course Creation Wizard [Phase 1]
The application SHALL provide a step-by-step course creation wizard.

**Acceptance Criteria:**
- AC1: Wizard has clear step indicators
- AC2: User can navigate between steps
- AC3: Progress is saved automatically
- AC4: Validation occurs before each step transition

#### REQ-CRS-FE-002: Course Basic Info Form [Phase 1]
The application SHALL provide form for basic course information.

**Acceptance Criteria:**
- AC1: Title field with character counter
- AC2: Subtitle field with character counter
- AC3: Description rich text editor
- AC4: Real-time validation feedback

#### REQ-CRS-FE-003: Course Thumbnail Upload [Phase 1]
The application SHALL provide thumbnail upload functionality.

**Acceptance Criteria:**
- AC1: Drag and drop upload
- AC2: Image preview before save
- AC3: Crop tool for aspect ratio
- AC4: File size and type validation

#### REQ-CRS-FE-004: Course Promo Video Upload [Phase 2]
The application SHALL provide promotional video upload.

**Acceptance Criteria:**
- AC1: Video upload with progress indicator
- AC2: Processing status displayed
- AC3: Preview after processing complete

### 2.2 Course Settings

#### REQ-CRS-FE-005: Category Selection [Phase 1]
The application SHALL provide category selection interface.

**Acceptance Criteria:**
- AC1: Hierarchical category browser
- AC2: Search within categories
- AC3: Subcategory selection

#### REQ-CRS-FE-006: Course Level Selection [Phase 1]
The application SHALL provide course level selection.

**Acceptance Criteria:**
- AC1: Radio button selection
- AC2: Level descriptions displayed

#### REQ-CRS-FE-007: Language Selection [Phase 1]
The application SHALL provide language selection.

**Acceptance Criteria:**
- AC1: Searchable dropdown
- AC2: Common languages prioritized

### 2.3 Learning Content

#### REQ-CRS-FE-008: Learning Objectives Manager [Phase 1]
The application SHALL provide learning objectives management.

**Acceptance Criteria:**
- AC1: Add/edit/delete objectives
- AC2: Drag and drop reordering
- AC3: Minimum objectives validation

#### REQ-CRS-FE-009: Prerequisites Manager [Phase 2]
The application SHALL provide prerequisites management.

**Acceptance Criteria:**
- AC1: Add/edit/delete prerequisites
- AC2: Text-based input

#### REQ-CRS-FE-010: Target Audience Manager [Phase 2]
The application SHALL provide target audience management.

**Acceptance Criteria:**
- AC1: Add/edit/delete audience descriptions
- AC2: Text-based input

### 2.4 Course Dashboard

#### REQ-CRS-FE-011: Instructor Course Dashboard [Phase 1]
The application SHALL provide course management dashboard.

**Acceptance Criteria:**
- AC1: List of instructor's courses
- AC2: Filter by status
- AC3: Quick actions menu
- AC4: Course statistics summary

#### REQ-CRS-FE-012: Course Status Display [Phase 1]
The application SHALL display course status clearly.

**Acceptance Criteria:**
- AC1: Status badge with color coding
- AC2: Available actions based on status
- AC3: Tooltip with status description

### 2.5 Course Publishing

#### REQ-CRS-FE-013: Submit for Review [Phase 2]
The application SHALL provide submission interface.

**Acceptance Criteria:**
- AC1: Checklist of requirements
- AC2: Validation before submission
- AC3: Confirmation dialog

#### REQ-CRS-FE-014: Publish Course [Phase 1]
The application SHALL provide publish interface.

**Acceptance Criteria:**
- AC1: Publish confirmation dialog
- AC2: Success notification
- AC3: Share options after publish

---

## 3. Component Architecture

### 3.1 Pages

| Component | Route | Description |
|-----------|-------|-------------|
| CourseListPage | /instructor/courses | Course dashboard |
| CourseCreatePage | /instructor/courses/new | Create wizard |
| CourseEditPage | /instructor/courses/:id/edit | Edit course |
| CoursePreviewPage | /instructor/courses/:id/preview | Preview course |

### 3.2 Components

| Component | Description |
|-----------|-------------|
| CourseWizard | Step-by-step creation wizard |
| CourseBasicInfoForm | Basic info form |
| ThumbnailUpload | Thumbnail upload component |
| VideoUpload | Video upload component |
| CategorySelector | Category selection |
| LevelSelector | Level selection |
| LanguageSelector | Language selection |
| ObjectivesList | Learning objectives list |
| CourseStatusBadge | Status indicator |
| CourseCard | Course summary card |
| CourseActionsMenu | Quick actions menu |

---

## 4. State Management

Per REQ-FE-009, state management SHALL use RxJS.

### 4.1 Course State

```typescript
interface CourseState {
  courses: Course[];
  selectedCourse: Course | null;
  isLoading: boolean;
  error: string | null;
  filters: CourseFilters;
}
```

---

## 5. UI/UX Requirements

### 5.1 Wizard UX
- Step indicator shows progress
- User can jump to completed steps
- Auto-save on field blur
- Clear validation messages

### 5.2 Responsive Design
- Mobile: Single column, full-width forms
- Tablet: Two columns where appropriate
- Desktop: Sidebar navigation with content area

---

## 6. Form Validation

### 6.1 Title
- Required
- 10-200 characters

### 6.2 Description
- Required
- 50-5000 characters

### 6.3 Objectives
- Minimum 4 objectives
- Each 10-200 characters

---

*Document Version: 1.0*
*Phase Coverage: 1-5*
