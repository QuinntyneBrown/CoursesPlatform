# Assignment System - Frontend Specification

**Feature:** Assignment System
**Version:** 1.0
**Last Updated:** December 2024

---

## 1. Overview

The Assignment System frontend provides user interfaces for instructors to create and manage assignments, students to submit work, and both to view grades and feedback.

---

## 2. Requirements

### 2.1 Instructor - Assignment Management

#### REQ-ASN-FE-001: Create Assignment Page [Phase 4]
The application SHALL provide an assignment creation page for instructors.

**Acceptance Criteria:**
- AC1: Page displays form with title, description, instructions fields
- AC2: Rich text editor is available for description and instructions
- AC3: Due date picker with time and timezone selection
- AC4: Point value and passing threshold inputs
- AC5: Submission type selector (file, text, link, mixed)
- AC6: Late submission policy configuration
- AC7: Save as draft or publish directly options

#### REQ-ASN-FE-002: Assignment List Page [Phase 4]
The application SHALL provide an assignment list page.

**Acceptance Criteria:**
- AC1: Page displays all assignments for the course
- AC2: List shows assignment title, due date, submissions count
- AC3: Filters for published, draft, past due
- AC4: Search by assignment title
- AC5: Create new assignment button
- AC6: Quick actions for publish, edit, delete

#### REQ-ASN-FE-003: Edit Assignment Page [Phase 4]
The application SHALL provide an assignment editing page.

**Acceptance Criteria:**
- AC1: Form is pre-filled with existing assignment data
- AC2: All fields are editable before submissions exist
- AC3: Warning shown if submissions exist
- AC4: Changes are prevented if grading has started
- AC5: Save changes button

#### REQ-ASN-FE-004: Assignment Settings [Phase 4]
The application SHALL provide assignment settings configuration.

**Acceptance Criteria:**
- AC1: File type restrictions can be specified
- AC2: Maximum file size can be set
- AC3: Number of resubmissions can be configured
- AC4: Peer review can be enabled/disabled
- AC5: Settings are validated before saving

#### REQ-ASN-FE-005: Rubric Builder [Phase 4]
The application SHALL provide a rubric builder interface.

**Acceptance Criteria:**
- AC1: Add/remove rubric criteria
- AC2: Each criterion has description and points
- AC3: Performance levels can be defined per criterion
- AC4: Preview of rubric for students
- AC5: Total points calculation displayed

### 2.2 Instructor - Grading

#### REQ-ASN-FE-006: Submissions List [Phase 4]
The application SHALL display submissions for grading.

**Acceptance Criteria:**
- AC1: List shows all student submissions
- AC2: Status indicators for submitted, graded, late
- AC3: Filter by status, student name
- AC4: Sort by submission date, grade
- AC5: Bulk selection for bulk grading
- AC6: Download all submissions option

#### REQ-ASN-FE-007: Grading Interface [Phase 4]
The application SHALL provide a grading interface.

**Acceptance Criteria:**
- AC1: Student submission content is displayed
- AC2: Files can be previewed or downloaded
- AC3: Points input with validation
- AC4: Feedback text area with rich text editor
- AC5: Rubric grading if rubric exists
- AC6: Save grade and next submission navigation

#### REQ-ASN-FE-008: Rubric Grading [Phase 4]
The application SHALL support rubric-based grading.

**Acceptance Criteria:**
- AC1: Rubric criteria are displayed
- AC2: Performance level selector per criterion
- AC3: Points are calculated automatically
- AC4: Comments can be added per criterion
- AC5: Total score is updated in real-time

#### REQ-ASN-FE-009: Feedback Editor [Phase 4]
The application SHALL provide a feedback editor.

**Acceptance Criteria:**
- AC1: Rich text formatting options
- AC2: Inline comments on text submissions
- AC3: Predefined feedback snippets
- AC4: Feedback preview before submission
- AC5: Save draft feedback option

#### REQ-ASN-FE-010: Grade History [Phase 4]
The application SHALL display grade history.

**Acceptance Criteria:**
- AC1: List of all grade changes
- AC2: Timestamp and instructor for each change
- AC3: Previous and new grade values
- AC4: Reason for change if provided

### 2.3 Student - Assignment View

#### REQ-ASN-FE-011: Assignment Details Page [Phase 4]
The application SHALL provide assignment details for students.

**Acceptance Criteria:**
- AC1: Page displays title, description, instructions
- AC2: Due date with countdown timer
- AC3: Point value and passing threshold
- AC4: Submission requirements clearly displayed
- AC5: Rubric is visible if attached
- AC6: Submit assignment button

#### REQ-ASN-FE-012: Assignment List Dashboard [Phase 4]
The application SHALL provide a student assignment dashboard.

**Acceptance Criteria:**
- AC1: List of all assignments for enrolled courses
- AC2: Status indicators for pending, submitted, graded
- AC3: Due date sorting with overdue highlighted
- AC4: Filter by status, course
- AC5: Search by assignment title
- AC6: Quick view of grades

### 2.4 Student - Submission

#### REQ-ASN-FE-013: Submission Form [Phase 4]
The application SHALL provide a submission form.

**Acceptance Criteria:**
- AC1: Form matches submission type (file, text, link)
- AC2: File upload with drag and drop
- AC3: Text editor for text submissions
- AC4: URL input for link submissions
- AC5: Multiple file upload support
- AC6: File type and size validation

#### REQ-ASN-FE-014: File Upload [Phase 4]
The application SHALL support file uploads.

**Acceptance Criteria:**
- AC1: Drag and drop or click to upload
- AC2: Upload progress indicator
- AC3: File preview for common types
- AC4: Remove uploaded file option
- AC5: File size and type validation messages
- AC6: Multiple file selection

#### REQ-ASN-FE-015: Submission Confirmation [Phase 4]
The application SHALL provide submission confirmation.

**Acceptance Criteria:**
- AC1: Confirm dialog before submission
- AC2: Summary of files and content
- AC3: Late submission warning if past due
- AC4: Success message after submission
- AC5: View submission button

#### REQ-ASN-FE-016: Resubmission [Phase 4]
The application SHALL allow resubmissions if enabled.

**Acceptance Criteria:**
- AC1: Resubmit button if allowed
- AC2: Previous submission is displayed
- AC3: Resubmission count displayed
- AC4: Confirmation before resubmitting
- AC5: New submission replaces previous

#### REQ-ASN-FE-017: Submission History [Phase 4]
The application SHALL display submission history.

**Acceptance Criteria:**
- AC1: List of all submissions for assignment
- AC2: Timestamp for each submission
- AC3: Files and content for each version
- AC4: Current/previous indicators
- AC5: View previous submission option

### 2.5 Student - Grades

#### REQ-ASN-FE-018: Grade View [Phase 4]
The application SHALL display grades to students.

**Acceptance Criteria:**
- AC1: Grade is displayed with total points
- AC2: Feedback is shown below grade
- AC3: Rubric grading breakdown if applicable
- AC4: Late penalty is clearly indicated
- AC5: Grade timestamp displayed

#### REQ-ASN-FE-019: Feedback Display [Phase 4]
The application SHALL display instructor feedback.

**Acceptance Criteria:**
- AC1: Written feedback is formatted properly
- AC2: Inline comments are highlighted
- AC3: Rubric criterion feedback is displayed
- AC4: Feedback is only shown after grading

### 2.6 Peer Review

#### REQ-ASN-FE-020: Peer Review Assignment [Phase 4]
The application SHALL display assigned peer reviews.

**Acceptance Criteria:**
- AC1: List of submissions to review
- AC2: Review deadline displayed
- AC3: Anonymous peer submission view
- AC4: Start review button
- AC5: Completed review indicator

#### REQ-ASN-FE-021: Peer Review Interface [Phase 4]
The application SHALL provide peer review interface.

**Acceptance Criteria:**
- AC1: Submission content is displayed
- AC2: Rubric criteria for scoring
- AC3: Feedback text area required
- AC4: Submit review button
- AC5: Save draft option

#### REQ-ASN-FE-022: Peer Review Received [Phase 4]
The application SHALL display received peer reviews.

**Acceptance Criteria:**
- AC1: List of all peer reviews received
- AC2: Score per criterion displayed
- AC3: Feedback from peers shown
- AC4: Reviewer names hidden if anonymous
- AC5: Aggregated score calculated

---

## 3. Component Architecture

### 3.1 Pages

| Component | Route | Description |
|-----------|-------|-------------|
| AssignmentListPage | /courses/:id/assignments | Assignment list |
| CreateAssignmentPage | /courses/:id/assignments/create | Create assignment |
| EditAssignmentPage | /assignments/:id/edit | Edit assignment |
| AssignmentDetailsPage | /assignments/:id | Assignment details |
| SubmissionFormPage | /assignments/:id/submit | Submit assignment |
| GradingPage | /assignments/:id/grading | Grade submissions |
| SubmissionViewPage | /submissions/:id | View submission |
| PeerReviewPage | /peer-reviews/:id | Complete peer review |
| StudentDashboardPage | /student/assignments | Student assignments |
| GradeDetailsPage | /submissions/:id/grade | View grade details |

### 3.2 Components

| Component | Description |
|-----------|-------------|
| AssignmentForm | Assignment creation/edit form |
| AssignmentCard | Assignment summary card |
| RubricBuilder | Rubric creation interface |
| RubricDisplay | Rubric view for students |
| SubmissionForm | File/text submission form |
| FileUpload | File upload with validation |
| GradeInput | Grade input with validation |
| FeedbackEditor | Rich text feedback editor |
| RubricGrading | Rubric-based grading interface |
| SubmissionList | List of submissions |
| PeerReviewForm | Peer review submission form |
| GradeDisplay | Grade and feedback display |
| AssignmentStatus | Status indicator badge |
| DueDateCountdown | Due date countdown timer |

### 3.3 Services

| Service | Description |
|---------|-------------|
| AssignmentService | Assignment API calls |
| SubmissionService | Submission API calls |
| GradingService | Grading API calls |
| PeerReviewService | Peer review API calls |
| FileUploadService | File upload handling |

---

## 4. State Management

Per REQ-FE-009, state management SHALL use RxJS (not NgRx or Signals).

### 4.1 Assignment State

```typescript
interface AssignmentState {
  assignments: Assignment[];
  currentAssignment: Assignment | null;
  isLoading: boolean;
  error: string | null;
}
```

### 4.2 Submission State

```typescript
interface SubmissionState {
  submissions: Submission[];
  currentSubmission: Submission | null;
  uploadProgress: number;
  isSubmitting: boolean;
  error: string | null;
}
```

### 4.3 Grading State

```typescript
interface GradingState {
  grades: Grade[];
  currentGrade: Grade | null;
  isGrading: boolean;
  error: string | null;
}
```

---

## 5. UI/UX Requirements

### 5.1 Design System

Per REQ-FE-006 and REQ-FE-010, the application SHALL use Angular Material with Material 3 guidelines and default theme colors.

### 5.2 Responsive Design

Per REQ-FE-018, all pages SHALL be responsive and follow mobile-first design:
- Mobile: Single column, stacked layout
- Tablet: Two column layout for lists
- Desktop: Full layout with sidebar

### 5.3 Accessibility

- All forms MUST have proper labels
- File upload MUST be keyboard accessible
- Focus management for dialogs
- Screen reader support for status indicators
- Keyboard navigation for grading interface

### 5.4 Component Naming

Per REQ-FE-012 and REQ-FE-013:
- Class names SHALL NOT have "Component" suffix
- File names SHALL NOT have "component" prefix

---

## 6. Form Validation

### 6.1 Assignment Form

- Title: Required, 1-200 characters
- Description: Required, 1-5000 characters
- Due date: Required, must be future date
- Point value: Required, positive integer
- Passing threshold: Optional, 0-100 percentage

### 6.2 Submission Form

- Text content: Required for text submissions, max 10000 characters
- Files: Required for file submissions, per configured restrictions
- URL: Required for link submissions, valid URL format

### 6.3 Grading Form

- Points: Required, 0 to assignment maximum
- Feedback: Optional, max 5000 characters

### 6.4 Peer Review Form

- Score: Required for each criterion
- Feedback: Required, minimum 50 characters

---

## 7. Error Handling

### 7.1 API Errors

| Error Code | User Message |
|------------|--------------|
| 400 | Invalid submission. Please check your input. |
| 403 | You do not have permission to perform this action. |
| 404 | Assignment not found. |
| 409 | Assignment already submitted. |
| 413 | File too large. Maximum size is X MB. |
| 500 | Something went wrong. Please try again. |

### 7.2 Validation Errors

- Display inline below the field
- Use red color for error state
- Clear error when field is corrected
- File upload errors shown in notification

---

## 8. Testing Requirements

### 8.1 Unit Tests (Jest)

Per REQ-FE-021, unit tests SHALL use Jest:
- Test assignment form validations
- Test file upload logic
- Test grading calculations
- Test rubric score calculations
- Minimum 80% code coverage

### 8.2 E2E Tests (Playwright)

Per REQ-FE-022, E2E tests SHALL use Playwright:
- Test complete assignment creation flow
- Test student submission flow
- Test instructor grading flow
- Test peer review flow
- Test resubmission flow

---

## 9. Implementation Notes

### 9.1 API Base URL

Per REQ-FE-026, the baseUrl configuration SHALL contain ONLY the base URI:
```typescript
// Correct
baseUrl = "http://localhost:7200"
this.http.get(`${baseUrl}/api/assignments`)

// Incorrect
baseUrl = "http://localhost:7200/api"
```

### 9.2 File Upload

File uploads SHALL use multipart/form-data encoding with progress tracking.

Large files SHALL be uploaded in chunks to prevent timeout.

### 9.3 Rich Text Editor

Use Angular-compatible rich text editor library (e.g., ngx-editor, quill-angular).

Sanitize HTML output to prevent XSS attacks.

### 9.4 File Structure

Per REQ-FE-015 and REQ-FE-016:
- Pages in `pages/` folder
- Reusable components in `components/` folder
- Barrel exports in each folder

---

*Document Version: 1.0*
*Phase Coverage: 4-5*
