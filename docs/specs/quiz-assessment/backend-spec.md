# Quiz & Assessment - Backend Specification

**Feature:** Quiz & Assessment
**Version:** 1.0
**Last Updated:** December 2024

---

## 1. Overview

The Quiz & Assessment feature provides comprehensive quiz creation, question management, automated grading, and coding exercise evaluation for the CoursesPlatform system.

---

## 2. Requirements

### 2.1 Quiz Management

#### REQ-QIZ-001: Create Quiz [Phase 4]
The system SHALL allow instructors to create quizzes for their courses.

**Acceptance Criteria:**
- AC1: Instructor can create quiz with title, description, and instructions
- AC2: Quiz is associated with a specific lecture or curriculum item
- AC3: System validates quiz data before creation
- AC4: QuizCreated event is published
- AC5: Quiz is created in Draft status
- AC6: Quiz settings include time limit, passing score, and attempts allowed

#### REQ-QIZ-002: Update Quiz [Phase 4]
The system SHALL allow instructors to update quiz details.

**Acceptance Criteria:**
- AC1: Instructor can update title, description, instructions, and settings
- AC2: Changes cannot be made to Published quizzes with active attempts
- AC3: QuizUpdated event is published
- AC4: Version history is maintained for published quizzes
- AC5: System validates updated data

#### REQ-QIZ-003: Publish Quiz [Phase 4]
The system SHALL allow instructors to publish draft quizzes.

**Acceptance Criteria:**
- AC1: Quiz must have at least one question to be published
- AC2: All questions must be valid and complete
- AC3: Quiz status changes from Draft to Published
- AC4: QuizPublished event is published
- AC5: Published timestamp is recorded
- AC6: Published quiz is visible to enrolled students

#### REQ-QIZ-004: Unpublish Quiz [Phase 4]
The system SHALL allow instructors to unpublish quizzes.

**Acceptance Criteria:**
- AC1: Instructor can unpublish quiz without active attempts
- AC2: Quiz status changes from Published to Draft
- AC3: QuizUnpublished event is published
- AC4: Quiz becomes hidden from students
- AC5: Existing attempt data is preserved

#### REQ-QIZ-005: Delete Quiz [Phase 4]
The system SHALL allow instructors to delete quizzes.

**Acceptance Criteria:**
- AC1: Only Draft quizzes without attempts can be deleted
- AC2: QuizDeleted event is published
- AC3: All associated questions are deleted
- AC4: Cascade delete removes quiz-curriculum associations

#### REQ-QIZ-006: Quiz Settings [Phase 4]
The system SHALL allow instructors to configure quiz settings.

**Acceptance Criteria:**
- AC1: Instructor can set time limit (minutes) or unlimited
- AC2: Instructor can set passing score percentage
- AC3: Instructor can set maximum attempts allowed
- AC4: Instructor can enable/disable question randomization
- AC5: Instructor can enable/disable answer shuffling
- AC6: QuizSettingsUpdated event is published

#### REQ-QIZ-007: Quiz Statistics [Phase 4]
The system SHALL track and provide quiz statistics.

**Acceptance Criteria:**
- AC1: System tracks total attempts, average score, pass rate
- AC2: System tracks completion time statistics
- AC3: System identifies difficult questions (low success rate)
- AC4: Statistics are updated after each graded attempt
- AC5: QuizStatisticsUpdated event is published

### 2.2 Question Management

#### REQ-QIZ-008: Add Question [Phase 4]
The system SHALL allow instructors to add questions to quizzes.

**Acceptance Criteria:**
- AC1: Instructor can add multiple choice questions
- AC2: Instructor can add true/false questions
- AC3: Instructor can add multiple answer questions
- AC4: Instructor can add short answer questions
- AC5: QuestionAdded event is published
- AC6: Questions are assigned sequential order numbers

#### REQ-QIZ-009: Multiple Choice Question [Phase 4]
The system SHALL support multiple choice questions with single correct answer.

**Acceptance Criteria:**
- AC1: Question has text, explanation, and points value
- AC2: Minimum 2 and maximum 10 answer options
- AC3: Exactly one option marked as correct
- AC4: Each option has text content
- AC5: Question can include image or code snippet
- AC6: Correct answer and explanation are hidden from students

#### REQ-QIZ-010: True/False Question [Phase 4]
The system SHALL support true/false questions.

**Acceptance Criteria:**
- AC1: Question has text, explanation, and points value
- AC2: Two options: True and False
- AC3: One option marked as correct
- AC4: Question can include image or code snippet
- AC5: Simplified interface for binary choice

#### REQ-QIZ-011: Multiple Answer Question [Phase 4]
The system SHALL support multiple answer questions with multiple correct answers.

**Acceptance Criteria:**
- AC1: Question has text, explanation, and points value
- AC2: Minimum 2 and maximum 10 answer options
- AC3: At least one option marked as correct
- AC4: Partial credit supported based on correct selections
- AC5: Points deducted for incorrect selections
- AC6: Question can include image or code snippet

#### REQ-QIZ-012: Short Answer Question [Phase 4]
The system SHALL support short answer questions with text input.

**Acceptance Criteria:**
- AC1: Question has text, explanation, and points value
- AC2: Expected answer(s) defined for auto-grading
- AC3: Case-insensitive matching supported
- AC4: Multiple acceptable answers supported
- AC5: Manual grading option available
- AC6: Character limit can be specified

#### REQ-QIZ-013: Update Question [Phase 4]
The system SHALL allow instructors to update questions.

**Acceptance Criteria:**
- AC1: Instructor can update question text, options, and points
- AC2: Changes require quiz to be in Draft status
- AC3: QuestionUpdated event is published
- AC4: System validates updated question data

#### REQ-QIZ-014: Delete Question [Phase 4]
The system SHALL allow instructors to delete questions.

**Acceptance Criteria:**
- AC1: Question can only be deleted from Draft quizzes
- AC2: QuestionDeleted event is published
- AC3: Question order is automatically adjusted
- AC4: Deletion is permanent and cannot be undone

#### REQ-QIZ-015: Reorder Questions [Phase 4]
The system SHALL allow instructors to reorder quiz questions.

**Acceptance Criteria:**
- AC1: Instructor can change question display order
- AC2: Questions are renumbered automatically
- AC3: QuestionsReordered event is published
- AC4: Changes only allowed on Draft quizzes

#### REQ-QIZ-016: Question Bank [Phase 5]
The system SHALL support reusable question banks.

**Acceptance Criteria:**
- AC1: Instructor can save questions to personal question bank
- AC2: Questions can be imported from bank to quizzes
- AC3: QuestionAddedToBank event is published
- AC4: Questions maintain metadata (category, difficulty, tags)
- AC5: Bank questions can be searched and filtered

### 2.3 Quiz Attempts

#### REQ-QIZ-017: Start Quiz Attempt [Phase 4]
The system SHALL allow students to start quiz attempts.

**Acceptance Criteria:**
- AC1: Student must be enrolled in course
- AC2: Quiz must be Published
- AC3: Student has not exceeded maximum attempts
- AC4: QuizAttemptStarted event is published
- AC5: Attempt timer starts if time limit configured
- AC6: Questions are randomized if enabled
- AC7: Answer options are shuffled if enabled

#### REQ-QIZ-018: Answer Question [Phase 4]
The system SHALL allow students to answer quiz questions.

**Acceptance Criteria:**
- AC1: Student can select/enter answer for each question
- AC2: Answers are auto-saved periodically
- AC3: QuestionAnswered event is published
- AC4: Student can change answers before submission
- AC5: Answer data is validated before storage

#### REQ-QIZ-019: Submit Quiz Attempt [Phase 4]
The system SHALL allow students to submit completed quiz attempts.

**Acceptance Criteria:**
- AC1: Student can submit attempt before time expires
- AC2: Unanswered questions are marked as blank
- AC3: QuizAttemptSubmitted event is published
- AC4: Attempt status changes to Submitted
- AC5: Submission timestamp is recorded
- AC6: Auto-submit occurs when time limit expires

#### REQ-QIZ-020: Auto-Grade Attempt [Phase 4]
The system SHALL automatically grade quiz attempts.

**Acceptance Criteria:**
- AC1: Multiple choice questions are graded automatically
- AC2: True/false questions are graded automatically
- AC3: Multiple answer questions calculate partial credit
- AC4: Short answer questions match against expected answers
- AC5: Total score is calculated as percentage
- AC6: Pass/fail status determined by passing score threshold
- AC7: QuizAttemptGraded event is published

#### REQ-QIZ-021: Manual Grading [Phase 5]
The system SHALL support manual grading for subjective questions.

**Acceptance Criteria:**
- AC1: Instructor can review submitted answers
- AC2: Instructor can assign points to short answer questions
- AC3: Instructor can add feedback comments
- AC4: ManualGradingCompleted event is published
- AC5: Student is notified when grading is complete

#### REQ-QIZ-022: View Quiz Results [Phase 4]
The system SHALL allow students to view quiz results.

**Acceptance Criteria:**
- AC1: Student can see score, percentage, and pass/fail status
- AC2: Student can see correct/incorrect answers if enabled
- AC3: Student can see explanations for questions
- AC4: Student can see time taken to complete
- AC5: ResultsViewed event is published

#### REQ-QIZ-023: Retry Quiz [Phase 4]
The system SHALL allow students to retry failed quizzes.

**Acceptance Criteria:**
- AC1: Student can retry if attempts remaining
- AC2: Previous attempt data is preserved
- AC3: Best score is tracked separately
- AC4: QuizRetryStarted event is published
- AC5: Question randomization applied to new attempt

#### REQ-QIZ-024: Quiz Attempt History [Phase 4]
The system SHALL maintain complete quiz attempt history.

**Acceptance Criteria:**
- AC1: All attempts are stored with answers and scores
- AC2: Student can view all previous attempts
- AC3: Instructor can view all student attempts
- AC4: Attempt data includes timestamps and duration
- AC5: Historical data cannot be modified after grading

### 2.4 Coding Exercises

#### REQ-QIZ-025: Create Coding Exercise [Phase 5]
The system SHALL allow instructors to create coding exercises.

**Acceptance Criteria:**
- AC1: Instructor can define problem description
- AC2: Instructor can specify programming language
- AC3: Instructor can provide starter code template
- AC4: Instructor can define test cases (input/output)
- AC5: CodingExerciseCreated event is published
- AC6: Exercise includes points value

#### REQ-QIZ-026: Coding Exercise Test Cases [Phase 5]
The system SHALL support automated test cases for coding exercises.

**Acceptance Criteria:**
- AC1: Instructor can add multiple test cases
- AC2: Test cases include input, expected output, and points
- AC3: Test cases can be visible or hidden from students
- AC4: Test timeout can be specified
- AC5: TestCaseAdded event is published

#### REQ-QIZ-027: Submit Code Solution [Phase 5]
The system SHALL allow students to submit code solutions.

**Acceptance Criteria:**
- AC1: Student can write code in browser-based editor
- AC2: Student can run code against sample test cases
- AC3: Student can submit solution for grading
- AC4: CodeSubmitted event is published
- AC5: Submission includes code, language, and timestamp

#### REQ-QIZ-028: Auto-Grade Code Solution [Phase 5]
The system SHALL automatically evaluate code submissions.

**Acceptance Criteria:**
- AC1: Code is executed in isolated sandbox environment
- AC2: All test cases are run against submission
- AC3: Output is compared with expected results
- AC4: Score calculated based on passing test cases
- AC5: Execution errors are captured and reported
- AC6: CodeGraded event is published
- AC7: Execution time and memory usage tracked

#### REQ-QIZ-029: Code Plagiarism Detection [Phase 5]
The system SHALL detect potential code plagiarism.

**Acceptance Criteria:**
- AC1: Submissions are compared for similarity
- AC2: Similarity score is calculated
- AC3: PlagiarismDetected event is published if threshold exceeded
- AC4: Instructor is notified of potential cases
- AC5: Detection excludes starter code

#### REQ-QIZ-030: Coding Exercise Feedback [Phase 5]
The system SHALL provide detailed feedback on code submissions.

**Acceptance Criteria:**
- AC1: Test case results show pass/fail status
- AC2: Failed tests show expected vs actual output
- AC3: Compilation/runtime errors are displayed
- AC4: Performance metrics included
- AC5: Best practices suggestions provided (optional)

---

## 3. Domain Model

### 3.1 Entities

| Entity | Description |
|--------|-------------|
| Quiz | Assessment container with settings and metadata |
| Question | Individual quiz question with type and content |
| QuestionOption | Answer option for multiple choice questions |
| QuizAttempt | Student's attempt at completing a quiz |
| AttemptAnswer | Student's answer to a specific question |
| CodingExercise | Programming exercise with test cases |
| CodeSubmission | Student's code solution submission |
| TestCase | Input/output test case for coding exercise |
| TestResult | Result of running test case against submission |

### 3.2 Domain Events

| Event | Trigger |
|-------|---------|
| QuizCreated | New quiz created |
| QuizUpdated | Quiz details modified |
| QuizPublished | Quiz made available to students |
| QuizUnpublished | Quiz hidden from students |
| QuizDeleted | Quiz removed |
| QuizSettingsUpdated | Quiz configuration changed |
| QuizStatisticsUpdated | Quiz metrics recalculated |
| QuestionAdded | Question added to quiz |
| QuestionUpdated | Question modified |
| QuestionDeleted | Question removed |
| QuestionsReordered | Question order changed |
| QuestionAddedToBank | Question saved to reusable bank |
| QuizAttemptStarted | Student begins quiz |
| QuestionAnswered | Student answers question |
| QuizAttemptSubmitted | Student submits quiz |
| QuizAttemptGraded | Attempt automatically graded |
| ManualGradingCompleted | Instructor grades subjective questions |
| ResultsViewed | Student views results |
| QuizRetryStarted | Student starts new attempt |
| CodingExerciseCreated | Coding exercise created |
| CodingExerciseUpdated | Exercise modified |
| TestCaseAdded | Test case added to exercise |
| CodeSubmitted | Student submits code solution |
| CodeGraded | Code automatically evaluated |
| PlagiarismDetected | Similar code detected |

---

## 4. API Endpoints

### 4.1 Quiz Management

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/courses/{courseId}/quizzes | Create quiz |
| GET | /api/courses/{courseId}/quizzes | List course quizzes |
| GET | /api/quizzes/{quizId} | Get quiz details |
| PUT | /api/quizzes/{quizId} | Update quiz |
| DELETE | /api/quizzes/{quizId} | Delete quiz |
| POST | /api/quizzes/{quizId}/publish | Publish quiz |
| POST | /api/quizzes/{quizId}/unpublish | Unpublish quiz |
| GET | /api/quizzes/{quizId}/statistics | Get quiz statistics |

### 4.2 Question Management

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/quizzes/{quizId}/questions | Add question |
| GET | /api/quizzes/{quizId}/questions | List questions |
| GET | /api/questions/{questionId} | Get question details |
| PUT | /api/questions/{questionId} | Update question |
| DELETE | /api/questions/{questionId} | Delete question |
| PUT | /api/quizzes/{quizId}/questions/reorder | Reorder questions |
| POST | /api/questions/{questionId}/save-to-bank | Save to question bank |

### 4.3 Quiz Attempts

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/quizzes/{quizId}/attempts | Start quiz attempt |
| GET | /api/attempts/{attemptId} | Get attempt details |
| PUT | /api/attempts/{attemptId}/answers | Save answer |
| POST | /api/attempts/{attemptId}/submit | Submit attempt |
| GET | /api/attempts/{attemptId}/results | Get results |
| GET | /api/quizzes/{quizId}/my-attempts | List student attempts |
| GET | /api/quizzes/{quizId}/all-attempts | List all attempts (instructor) |

### 4.4 Coding Exercises

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/quizzes/{quizId}/coding-exercises | Create coding exercise |
| GET | /api/coding-exercises/{exerciseId} | Get exercise details |
| PUT | /api/coding-exercises/{exerciseId} | Update exercise |
| DELETE | /api/coding-exercises/{exerciseId} | Delete exercise |
| POST | /api/coding-exercises/{exerciseId}/test-cases | Add test case |
| POST | /api/coding-exercises/{exerciseId}/submit | Submit code |
| POST | /api/coding-exercises/{exerciseId}/run | Run code (test) |
| GET | /api/code-submissions/{submissionId}/results | Get submission results |

---

## 5. Business Rules

### 5.1 Quiz Rules
- Draft quizzes can be edited freely
- Published quizzes with active attempts cannot be modified
- Quiz must have at least one question to publish
- Deleted quizzes must have zero attempts
- Time limit range: 5-300 minutes or unlimited
- Passing score range: 1-100%
- Max attempts range: 1-10 or unlimited

### 5.2 Question Rules
- Question points must be greater than zero
- Multiple choice requires 2-10 options with exactly one correct
- Multiple answer requires at least one correct option
- Question order starts at 1 and increments sequentially
- Questions inherit quiz publishing restrictions

### 5.3 Attempt Rules
- Student must be enrolled to attempt quiz
- Cannot exceed maximum attempts limit
- Cannot start new attempt while one is in progress
- Auto-submit occurs at time limit expiration
- Answers cannot be changed after submission
- Best score is used for grade calculation

### 5.4 Grading Rules
- Multiple choice: full points or zero
- True/false: full points or zero
- Multiple answer: proportional credit for correct selections, penalties for incorrect
- Short answer: exact match or manual grading required
- Coding exercise: points proportional to passing test cases
- Total score rounded to two decimal places

---

## 6. Security Considerations

- Only enrolled students can view and attempt quizzes
- Only course instructors can create and modify quizzes
- Correct answers hidden until after submission
- Quiz data access logged for audit
- Code execution in sandboxed environment with resource limits
- Anti-cheating: randomization, time limits, attempt tracking
- Plagiarism detection for code submissions

---

## 7. Dependencies

- Serilog for structured logging
- MediatR for CQRS pattern
- Entity Framework Core for data access
- FluentValidation for request validation
- Code execution service for coding exercises
- File storage for code submissions

---

## 8. Implementation Notes

Per the implementation specification (REQ-SYS-005, REQ-SYS-006), all data access SHALL use ICoursesPlatformContext directly without repository pattern.

Code execution for coding exercises requires containerized sandbox environment with:
- Language runtime isolation
- CPU and memory limits
- Execution timeout enforcement
- Network access disabled
- File system restrictions

---

*Document Version: 1.0*
*Phase Coverage: 4-5*
