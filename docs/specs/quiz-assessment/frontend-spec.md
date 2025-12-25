# Quiz & Assessment - Frontend Specification

**Feature:** Quiz & Assessment
**Version:** 1.0
**Last Updated:** December 2024

---

## 1. Overview

The Quiz & Assessment frontend provides user interfaces for quiz creation, question management, quiz taking, result viewing, and coding exercise submission.

---

## 2. Requirements

### 2.1 Quiz Management (Instructor)

#### REQ-QIZ-FE-001: Quiz List Page [Phase 4]
The application SHALL provide a quiz list page for instructors.

**Acceptance Criteria:**
- AC1: Page displays all quizzes for the course
- AC2: Each quiz shows title, status, question count, attempt count
- AC3: Create new quiz button is available
- AC4: Filter by status (Draft, Published)
- AC5: Sort by date created, title, attempts
- AC6: Search by quiz title

#### REQ-QIZ-FE-002: Create Quiz Page [Phase 4]
The application SHALL provide a quiz creation page.

**Acceptance Criteria:**
- AC1: Form includes title, description, instructions fields
- AC2: Settings panel for time limit, passing score, max attempts
- AC3: Options for randomization and answer shuffling
- AC4: Form validation with error messages
- AC5: Save as draft button available
- AC6: Success notification on save

#### REQ-QIZ-FE-003: Edit Quiz Page [Phase 4]
The application SHALL provide a quiz editing interface.

**Acceptance Criteria:**
- AC1: Form pre-populated with existing quiz data
- AC2: Question list with add/edit/delete/reorder actions
- AC3: Preview button to see student view
- AC4: Publish/unpublish toggle
- AC5: Delete quiz option for drafts
- AC6: Warning for published quizzes with attempts

#### REQ-QIZ-FE-004: Quiz Settings Panel [Phase 4]
The application SHALL provide a quiz settings configuration panel.

**Acceptance Criteria:**
- AC1: Time limit input (minutes) with unlimited option
- AC2: Passing score percentage slider or input
- AC3: Maximum attempts selector (1-10 or unlimited)
- AC4: Randomize questions toggle
- AC5: Shuffle answers toggle
- AC6: Show correct answers toggle
- AC7: Real-time validation of settings

#### REQ-QIZ-FE-005: Quiz Statistics Dashboard [Phase 4]
The application SHALL display quiz statistics for instructors.

**Acceptance Criteria:**
- AC1: Total attempts count
- AC2: Average score with chart
- AC3: Pass rate percentage
- AC4: Average completion time
- AC5: Question difficulty breakdown
- AC6: Student performance list
- AC7: Export statistics option

### 2.2 Question Management (Instructor)

#### REQ-QIZ-FE-006: Add Question Modal [Phase 4]
The application SHALL provide a question creation modal.

**Acceptance Criteria:**
- AC1: Question type selector (multiple choice, true/false, multiple answer, short answer)
- AC2: Question text editor with rich text support
- AC3: Points value input
- AC4: Type-specific configuration panel
- AC5: Image upload option
- AC6: Code snippet insertion with syntax highlighting
- AC7: Explanation field for correct answer

#### REQ-QIZ-FE-007: Multiple Choice Question Editor [Phase 4]
The application SHALL provide a multiple choice question editor.

**Acceptance Criteria:**
- AC1: Add/remove answer options (2-10)
- AC2: Radio button to mark correct answer
- AC3: Text input for each option
- AC4: Option reordering capability
- AC5: Preview mode
- AC6: Validation: exactly one correct answer

#### REQ-QIZ-FE-008: True/False Question Editor [Phase 4]
The application SHALL provide a true/false question editor.

**Acceptance Criteria:**
- AC1: Two fixed options: True and False
- AC2: Radio button to select correct answer
- AC3: Simplified interface
- AC4: Preview mode

#### REQ-QIZ-FE-009: Multiple Answer Question Editor [Phase 4]
The application SHALL provide a multiple answer question editor.

**Acceptance Criteria:**
- AC1: Add/remove answer options (2-10)
- AC2: Checkboxes to mark multiple correct answers
- AC3: Text input for each option
- AC4: Partial credit configuration
- AC5: Preview mode
- AC6: Validation: at least one correct answer

#### REQ-QIZ-FE-010: Short Answer Question Editor [Phase 4]
The application SHALL provide a short answer question editor.

**Acceptance Criteria:**
- AC1: Expected answer(s) input
- AC2: Add multiple acceptable answers
- AC3: Case sensitivity toggle
- AC4: Character limit setting
- AC5: Manual grading option
- AC6: Preview mode

#### REQ-QIZ-FE-011: Question List Component [Phase 4]
The application SHALL display quiz questions in editable list.

**Acceptance Criteria:**
- AC1: Questions shown in order with numbers
- AC2: Each question shows type, text preview, points
- AC3: Drag-and-drop reordering
- AC4: Edit and delete buttons
- AC5: Expand/collapse question details
- AC6: Add question button between items

### 2.3 Quiz Taking (Student)

#### REQ-QIZ-FE-012: Quiz Detail Page [Phase 4]
The application SHALL provide a quiz detail page for students.

**Acceptance Criteria:**
- AC1: Quiz title, description, and instructions displayed
- AC2: Quiz settings shown (time limit, attempts, passing score)
- AC3: Previous attempt history with scores
- AC4: Start quiz button if attempts remaining
- AC5: View results button for completed attempts
- AC6: Attempt counter display

#### REQ-QIZ-FE-013: Quiz Attempt Page [Phase 4]
The application SHALL provide a quiz-taking interface.

**Acceptance Criteria:**
- AC1: Timer display if time limit enabled
- AC2: Question navigation panel
- AC3: Progress indicator
- AC4: One question displayed at a time
- AC5: Next/previous navigation buttons
- AC6: Answer selection/input for current question
- AC7: Mark for review option
- AC8: Submit quiz button
- AC9: Auto-save answers periodically

#### REQ-QIZ-FE-014: Question Display Component [Phase 4]
The application SHALL display questions appropriately by type.

**Acceptance Criteria:**
- AC1: Question text rendered with formatting
- AC2: Images displayed if included
- AC3: Code snippets with syntax highlighting
- AC4: Radio buttons for multiple choice
- AC5: Checkboxes for multiple answer
- AC6: Text input for short answer
- AC7: Character counter for limited inputs
- AC8: Selected answers highlighted

#### REQ-QIZ-FE-015: Quiz Timer Component [Phase 4]
The application SHALL display and manage quiz timer.

**Acceptance Criteria:**
- AC1: Countdown timer displayed prominently
- AC2: Warning when 5 minutes remaining
- AC3: Critical warning when 1 minute remaining
- AC4: Auto-submit when time expires
- AC5: Timer pauses when user navigates away (optional)
- AC6: Timer persists across page reloads

#### REQ-QIZ-FE-016: Submit Quiz Confirmation [Phase 4]
The application SHALL confirm quiz submission.

**Acceptance Criteria:**
- AC1: Confirmation dialog before submit
- AC2: Show unanswered question count
- AC3: List marked-for-review questions
- AC4: Confirm or cancel options
- AC5: Final warning for incomplete quiz
- AC6: Redirect to results after submission

#### REQ-QIZ-FE-017: Quiz Results Page [Phase 4]
The application SHALL display quiz results to students.

**Acceptance Criteria:**
- AC1: Score percentage and points displayed
- AC2: Pass/fail status with visual indicator
- AC3: Time taken to complete
- AC4: Question-by-question review if enabled
- AC5: Correct answers shown if enabled
- AC6: Explanations displayed
- AC7: Retry button if attempts remaining
- AC8: View all attempts link

#### REQ-QIZ-FE-018: Attempt History Page [Phase 4]
The application SHALL display quiz attempt history.

**Acceptance Criteria:**
- AC1: All attempts listed with date, score, status
- AC2: Best score highlighted
- AC3: View details button for each attempt
- AC4: Attempt comparison chart
- AC5: Filter by passed/failed
- AC6: Sort by date or score

### 2.4 Coding Exercises (Instructor)

#### REQ-QIZ-FE-019: Create Coding Exercise Page [Phase 5]
The application SHALL provide coding exercise creation interface.

**Acceptance Criteria:**
- AC1: Problem description editor
- AC2: Programming language selector
- AC3: Starter code editor with syntax highlighting
- AC4: Points value input
- AC5: Test cases section
- AC6: Add sample test cases visible to students
- AC7: Add hidden test cases for grading
- AC8: Preview exercise button

#### REQ-QIZ-FE-020: Test Case Editor [Phase 5]
The application SHALL provide test case configuration.

**Acceptance Criteria:**
- AC1: Input field for test input
- AC2: Expected output field
- AC3: Points allocation
- AC4: Visibility toggle (visible/hidden)
- AC5: Timeout setting
- AC6: Add/remove test cases
- AC7: Test case validation

#### REQ-QIZ-FE-021: Coding Exercise List [Phase 5]
The application SHALL display coding exercises for course.

**Acceptance Criteria:**
- AC1: Exercises listed with title, language, points
- AC2: Submission count and average score
- AC3: Edit and delete options
- AC4: Filter by language
- AC5: Search by title

### 2.5 Coding Exercises (Student)

#### REQ-QIZ-FE-022: Code Editor Page [Phase 5]
The application SHALL provide a code editing interface.

**Acceptance Criteria:**
- AC1: Code editor with syntax highlighting
- AC2: Language-specific auto-completion
- AC3: Line numbers and code folding
- AC4: Theme selector (light/dark)
- AC5: Font size adjustment
- AC6: Run code button
- AC7: Submit code button
- AC8: Reset to starter code option

#### REQ-QIZ-FE-023: Code Execution Panel [Phase 5]
The application SHALL display code execution results.

**Acceptance Criteria:**
- AC1: Test case results (pass/fail)
- AC2: Input and output comparison
- AC3: Execution time and memory usage
- AC4: Error messages with line numbers
- AC5: Console output display
- AC6: Visual indicators for passing tests

#### REQ-QIZ-FE-024: Code Submission Results [Phase 5]
The application SHALL display submission grading results.

**Acceptance Criteria:**
- AC1: Overall score and percentage
- AC2: Test case breakdown (visible and hidden)
- AC3: Execution details for each test
- AC4: Performance metrics
- AC5: Feedback and suggestions
- AC6: Submit again button
- AC7: View submission history

---

## 3. Component Architecture

### 3.1 Pages

| Component | Route | Description |
|-----------|-------|-------------|
| QuizListPage | /courses/{id}/quizzes | List quizzes (instructor) |
| CreateQuizPage | /courses/{id}/quizzes/create | Create new quiz |
| EditQuizPage | /quizzes/{id}/edit | Edit quiz details |
| QuizStatisticsPage | /quizzes/{id}/statistics | View quiz analytics |
| QuizDetailPage | /quizzes/{id} | Quiz overview (student) |
| TakeQuizPage | /quizzes/{id}/attempt | Take quiz |
| QuizResultsPage | /attempts/{id}/results | View attempt results |
| AttemptHistoryPage | /quizzes/{id}/attempts | View all attempts |
| CreateCodingExercisePage | /quizzes/{id}/coding/create | Create coding exercise |
| EditCodingExercisePage | /coding-exercises/{id}/edit | Edit coding exercise |
| CodeEditorPage | /coding-exercises/{id}/solve | Solve coding exercise |
| CodeSubmissionResultsPage | /code-submissions/{id}/results | View code results |

### 3.2 Components

| Component | Description |
|-----------|-------------|
| QuizForm | Quiz creation/edit form |
| QuizSettingsPanel | Quiz configuration settings |
| QuestionListEditor | Editable question list |
| AddQuestionModal | Question creation dialog |
| MultipleChoiceEditor | MC question editor |
| TrueFalseEditor | T/F question editor |
| MultipleAnswerEditor | MA question editor |
| ShortAnswerEditor | Short answer editor |
| QuizTimer | Countdown timer |
| QuestionDisplay | Question renderer by type |
| QuestionNavigation | Question list navigation |
| AnswerInput | Answer input by question type |
| ResultsSummary | Score and status display |
| AttemptCard | Individual attempt summary |
| CodeEditor | Code editing component |
| TestCaseList | Test case display |
| ExecutionResults | Code execution output |
| StatisticsChart | Quiz analytics charts |

### 3.3 Services

| Service | Description |
|---------|-------------|
| QuizService | Quiz CRUD operations |
| QuestionService | Question management |
| AttemptService | Quiz attempt operations |
| CodingExerciseService | Coding exercise management |
| CodeExecutionService | Code run and submit |
| TimerService | Quiz timer management |

---

## 4. State Management

Per REQ-FE-009, state management SHALL use RxJS (not NgRx or Signals).

### 4.1 Quiz State

```typescript
interface QuizState {
  currentQuiz: Quiz | null;
  questions: Question[];
  isLoading: boolean;
  error: string | null;
}
```

### 4.2 Attempt State

```typescript
interface AttemptState {
  currentAttempt: QuizAttempt | null;
  answers: Map<number, Answer>;
  currentQuestionIndex: number;
  timeRemaining: number;
  isSubmitting: boolean;
}
```

### 4.3 Coding Exercise State

```typescript
interface CodingExerciseState {
  exercise: CodingExercise | null;
  code: string;
  isRunning: boolean;
  testResults: TestResult[];
  submissions: CodeSubmission[];
}
```

---

## 5. UI/UX Requirements

### 5.1 Design System

Per REQ-FE-006 and REQ-FE-010, the application SHALL use Angular Material with Material 3 guidelines and default theme colors.

### 5.2 Responsive Design

Per REQ-FE-018, all pages SHALL be responsive and follow mobile-first design:
- Mobile: Single column, simplified navigation
- Tablet: Optimized for quiz taking
- Desktop: Side-by-side question list and editor

### 5.3 Accessibility

- Quiz timer accessible to screen readers
- Keyboard navigation for question navigation
- ARIA labels for answer inputs
- Focus management in modals
- Color contrast for pass/fail indicators

### 5.4 Component Naming

Per REQ-FE-012 and REQ-FE-013:
- Class names SHALL NOT have "Component" suffix
- File names SHALL NOT have "component" prefix

---

## 6. Form Validation

### 6.1 Quiz Validation
- Title: Required, 5-200 characters
- Time limit: 5-300 minutes or unlimited
- Passing score: 1-100%
- Max attempts: 1-10 or unlimited
- At least one question to publish

### 6.2 Question Validation
- Question text: Required, 10-1000 characters
- Points: Required, greater than zero
- MC/MA: 2-10 options required
- Exactly one correct for MC
- At least one correct for MA

### 6.3 Coding Exercise Validation
- Problem description: Required
- Language: Required selection
- At least one test case required
- Test input/output: Required
- Timeout: 1-60 seconds

---

## 7. Error Handling

### 7.1 API Errors

| Error Code | User Message |
|------------|--------------|
| 400 | Invalid quiz data. Please check your input. |
| 403 | You don't have permission to access this quiz. |
| 404 | Quiz not found. |
| 409 | Cannot modify published quiz with active attempts. |
| 422 | Quiz must have at least one question to publish. |
| 429 | Maximum attempts reached for this quiz. |
| 500 | Something went wrong. Please try again. |

### 7.2 Validation Errors

- Display inline below fields
- Use red color for error state
- Clear errors on correction
- Summary at top for multiple errors

---

## 8. Real-time Features

### 8.1 Auto-save
- Save answers every 30 seconds
- Save on question navigation
- Visual indicator when saving
- Offline support with sync on reconnect

### 8.2 Timer Synchronization
- Timer synced with server time
- Handle clock drift
- Persist timer state across page reload
- Warning notifications at intervals

---

## 9. Testing Requirements

### 9.1 Unit Tests (Jest)

Per REQ-FE-021, unit tests SHALL use Jest:
- Test quiz form validations
- Test answer selection logic
- Test timer countdown
- Test auto-save functionality
- Minimum 80% code coverage

### 9.2 E2E Tests (Playwright)

Per REQ-FE-022, E2E tests SHALL use Playwright:
- Test complete quiz creation flow
- Test taking and submitting quiz
- Test timer expiration and auto-submit
- Test code submission and grading
- Test question navigation

---

## 10. Implementation Notes

### 10.1 API Base URL

Per REQ-FE-026, the baseUrl configuration SHALL contain ONLY the base URI:
```typescript
// Correct
baseUrl = "http://localhost:7200"
this.http.get(`${baseUrl}/api/quizzes`)

// Incorrect
baseUrl = "http://localhost:7200/api"
```

### 10.2 File Structure

Per REQ-FE-015 and REQ-FE-016:
- Pages in `pages/` folder
- Reusable components in `components/` folder
- Barrel exports in each folder

### 10.3 Code Editor Integration

- Use Monaco Editor or CodeMirror
- Language modes for supported languages
- Configure for read-only mode for results view
- Implement debounced auto-save

---

*Document Version: 1.0*
*Phase Coverage: 4-5*
