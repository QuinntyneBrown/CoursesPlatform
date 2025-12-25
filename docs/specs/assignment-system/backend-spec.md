# Assignment System - Backend Specification

**Feature:** Assignment System
**Version:** 1.0
**Last Updated:** December 2024

---

## 1. Overview

The Assignment System feature provides assignment creation, submission handling, grading, feedback, and peer review capabilities for the CoursesPlatform system.

---

## 2. Requirements

### 2.1 Assignment Management

#### REQ-ASN-001: Create Assignment [Phase 4]
The system SHALL allow instructors to create assignments for their courses.

**Acceptance Criteria:**
- AC1: Instructor can create assignment with title, description, instructions
- AC2: Assignment can specify due date and late submission policy
- AC3: Assignment can define point value and passing threshold
- AC4: Assignment can set submission type (file upload, text, link, or mixed)
- AC5: Assignment can enable/disable peer review
- AC6: AssignmentCreated event is published

#### REQ-ASN-002: Update Assignment [Phase 4]
The system SHALL allow instructors to update assignment details.

**Acceptance Criteria:**
- AC1: Instructor can update title, description, and instructions
- AC2: Instructor can modify due date if no submissions exist
- AC3: Instructor can update point value and passing threshold
- AC4: AssignmentUpdated event is published
- AC5: Changes are prevented if grading has started

#### REQ-ASN-003: Publish Assignment [Phase 4]
The system SHALL allow instructors to publish assignments to make them visible to students.

**Acceptance Criteria:**
- AC1: Draft assignments are not visible to students
- AC2: Published assignments are visible to enrolled students
- AC3: AssignmentPublished event is published
- AC4: Students receive notification when assignment is published
- AC5: Published assignment shows in student dashboard

#### REQ-ASN-004: Unpublish Assignment [Phase 4]
The system SHALL allow instructors to unpublish assignments.

**Acceptance Criteria:**
- AC1: Unpublished assignments are hidden from students
- AC2: Existing submissions are retained
- AC3: AssignmentUnpublished event is published
- AC4: Students receive notification if assignment is unpublished

#### REQ-ASN-005: Delete Assignment [Phase 4]
The system SHALL allow instructors to delete assignments.

**Acceptance Criteria:**
- AC1: Only draft assignments without submissions can be deleted
- AC2: Published assignments can be archived instead
- AC3: AssignmentDeleted event is published
- AC4: Associated submissions are retained for audit

#### REQ-ASN-006: Set Due Date [Phase 4]
The system SHALL support due dates and late submission policies.

**Acceptance Criteria:**
- AC1: Assignment can have a due date with time and timezone
- AC2: Late submission can be allowed or disallowed
- AC3: Late penalty percentage can be configured
- AC4: DueDateSet event is published
- AC5: Students receive reminders before due date

#### REQ-ASN-007: Configure Submission Settings [Phase 4]
The system SHALL allow configuration of submission requirements.

**Acceptance Criteria:**
- AC1: Submission type can be file, text, link, or multiple
- AC2: File type restrictions can be specified
- AC3: Maximum file size can be configured
- AC4: Number of resubmissions can be limited
- AC5: SubmissionSettingsConfigured event is published

#### REQ-ASN-008: Attach Rubric [Phase 4]
The system SHALL support attaching grading rubrics to assignments.

**Acceptance Criteria:**
- AC1: Instructor can create multi-criteria rubric
- AC2: Each criterion has description and point value
- AC3: Criterion can have performance levels
- AC4: RubricAttached event is published
- AC5: Rubric is visible to students before submission

### 2.2 Submission Management

#### REQ-ASN-009: Submit Assignment [Phase 4]
The system SHALL allow students to submit assignments.

**Acceptance Criteria:**
- AC1: Student can submit before due date
- AC2: Submission includes content per assignment type
- AC3: Files are uploaded and stored securely
- AC4: SubmissionCreated event is published
- AC5: Instructor receives notification of submission
- AC6: Submission timestamp is recorded

#### REQ-ASN-010: Resubmit Assignment [Phase 4]
The system SHALL allow students to resubmit assignments.

**Acceptance Criteria:**
- AC1: Resubmission is allowed if configured by instructor
- AC2: Previous submission is retained for history
- AC3: SubmissionUpdated event is published
- AC4: Latest submission is used for grading
- AC5: Resubmission count is tracked

#### REQ-ASN-011: Late Submission [Phase 4]
The system SHALL handle late submissions based on configuration.

**Acceptance Criteria:**
- AC1: Late submissions are accepted if allowed
- AC2: Late penalty is automatically calculated
- AC3: LateSubmissionReceived event is published
- AC4: Submission is marked as late
- AC5: Maximum late submission period is enforced

#### REQ-ASN-012: Withdraw Submission [Phase 4]
The system SHALL allow students to withdraw submissions before grading.

**Acceptance Criteria:**
- AC1: Student can withdraw ungraded submission
- AC2: Graded submissions cannot be withdrawn
- AC3: SubmissionWithdrawn event is published
- AC4: Assignment status returns to pending

#### REQ-ASN-013: Upload Files [Phase 4]
The system SHALL support file uploads for submissions.

**Acceptance Criteria:**
- AC1: Multiple files can be uploaded per submission
- AC2: File type validation is enforced
- AC3: File size limits are enforced
- AC4: FileUploaded event is published
- AC5: Files are scanned for malware

### 2.3 Grading

#### REQ-ASN-014: Grade Submission [Phase 4]
The system SHALL allow instructors to grade student submissions.

**Acceptance Criteria:**
- AC1: Instructor can assign points to submission
- AC2: Points cannot exceed assignment maximum
- AC3: Written feedback can be provided
- AC4: SubmissionGraded event is published
- AC5: Student receives notification of grade

#### REQ-ASN-015: Apply Rubric Grading [Phase 4]
The system SHALL support rubric-based grading.

**Acceptance Criteria:**
- AC1: Instructor selects performance level for each criterion
- AC2: Total score is calculated from rubric
- AC3: Comments can be added per criterion
- AC4: RubricGradeApplied event is published
- AC5: Student sees detailed rubric feedback

#### REQ-ASN-016: Provide Feedback [Phase 4]
The system SHALL allow instructors to provide detailed feedback.

**Acceptance Criteria:**
- AC1: Text feedback can be added to submission
- AC2: Inline comments can be added to text submissions
- AC3: Audio feedback can be recorded (Phase 5)
- AC4: FeedbackProvided event is published
- AC5: Feedback is only visible after grading is complete

#### REQ-ASN-017: Update Grade [Phase 4]
The system SHALL allow instructors to update grades.

**Acceptance Criteria:**
- AC1: Instructor can modify previously assigned grade
- AC2: Grade history is maintained
- AC3: GradeUpdated event is published
- AC4: Student receives notification of grade change
- AC5: Updated grade reflects in gradebook

#### REQ-ASN-018: Bulk Grading [Phase 5]
The system SHALL support bulk grading operations.

**Acceptance Criteria:**
- AC1: Instructor can grade multiple submissions at once
- AC2: Same feedback can be applied to multiple students
- AC3: BulkGradingCompleted event is published
- AC4: Individual events are published for each grade

### 2.4 Peer Review

#### REQ-ASN-019: Enable Peer Review [Phase 4]
The system SHALL support peer review for assignments.

**Acceptance Criteria:**
- AC1: Instructor can enable peer review mode
- AC2: Number of reviews per student is configurable
- AC3: Peer review deadline can be set
- AC4: PeerReviewEnabled event is published
- AC5: Anonymous reviews can be configured

#### REQ-ASN-020: Assign Peer Reviews [Phase 4]
The system SHALL automatically assign peer reviews to students.

**Acceptance Criteria:**
- AC1: Reviews are assigned after submission deadline
- AC2: Each student receives configured number of reviews
- AC3: Students cannot review their own work
- AC4: PeerReviewsAssigned event is published
- AC5: Students receive notification of review assignment

#### REQ-ASN-021: Submit Peer Review [Phase 4]
The system SHALL allow students to submit peer reviews.

**Acceptance Criteria:**
- AC1: Student can provide score per rubric criterion
- AC2: Written feedback is required
- AC3: PeerReviewSubmitted event is published
- AC4: Review subject receives notification
- AC5: Reviewer identity is hidden if anonymous mode

#### REQ-ASN-022: Instructor Review Override [Phase 4]
The system SHALL allow instructors to override peer review grades.

**Acceptance Criteria:**
- AC1: Instructor can view all peer reviews
- AC2: Instructor can set final grade overriding peers
- AC3: PeerReviewOverridden event is published
- AC4: Final grade is used in gradebook

#### REQ-ASN-023: Peer Review Feedback [Phase 4]
The system SHALL allow students to view peer feedback.

**Acceptance Criteria:**
- AC1: Peer reviews are visible after deadline
- AC2: Reviewer names are hidden in anonymous mode
- AC3: Student can see all reviews received
- AC4: Aggregated score is calculated from peer reviews

### 2.5 Assignment Analytics

#### REQ-ASN-024: Track Submission Status [Phase 4]
The system SHALL track submission status for each student.

**Acceptance Criteria:**
- AC1: Status includes pending, submitted, graded, late
- AC2: SubmissionStatusChanged event is published
- AC3: Instructor can view all submission statuses
- AC4: Students can view their own status

#### REQ-ASN-025: Generate Assignment Statistics [Phase 5]
The system SHALL generate statistics for assignments.

**Acceptance Criteria:**
- AC1: Statistics include submission rate, average score
- AC2: Grade distribution is calculated
- AC3: On-time vs late submission count is tracked
- AC4: Statistics are updated in real-time

#### REQ-ASN-026: Track Time Spent [Phase 5]
The system SHALL track time students spend on assignments.

**Acceptance Criteria:**
- AC1: Time from assignment publish to submission is recorded
- AC2: TimeSpent event is published
- AC3: Average time is calculated across students
- AC4: Time data is available for analytics

---

## 3. Domain Model

### 3.1 Entities

| Entity | Description |
|--------|-------------|
| Assignment | Course assignment with requirements and settings |
| Submission | Student submission for an assignment |
| Grade | Grading result for a submission |
| SubmissionFile | File attached to a submission |
| Rubric | Grading rubric with criteria and levels |
| RubricCriterion | Individual criterion in a rubric |
| PeerReview | Student peer review of a submission |
| SubmissionComment | Feedback comment on a submission |

### 3.2 Domain Events

| Event | Trigger |
|-------|---------|
| AssignmentCreated | Assignment is created |
| AssignmentUpdated | Assignment details are modified |
| AssignmentPublished | Assignment is made visible to students |
| AssignmentUnpublished | Assignment is hidden from students |
| AssignmentDeleted | Assignment is removed |
| DueDateSet | Assignment due date is configured |
| SubmissionSettingsConfigured | Submission requirements are set |
| RubricAttached | Grading rubric is added |
| RubricUpdated | Rubric criteria are modified |
| SubmissionCreated | Student submits assignment |
| SubmissionUpdated | Student resubmits assignment |
| LateSubmissionReceived | Submission after due date |
| SubmissionWithdrawn | Student withdraws submission |
| FileUploaded | File is attached to submission |
| FileRemoved | File is removed from submission |
| SubmissionGraded | Instructor assigns grade |
| RubricGradeApplied | Grade calculated from rubric |
| FeedbackProvided | Instructor provides feedback |
| GradeUpdated | Grade is modified |
| GradePublished | Grade is released to student |
| BulkGradingCompleted | Multiple submissions graded |
| PeerReviewEnabled | Peer review mode activated |
| PeerReviewsAssigned | Reviews distributed to students |
| PeerReviewSubmitted | Student completes peer review |
| PeerReviewOverridden | Instructor overrides peer grade |
| SubmissionStatusChanged | Submission status updated |
| AssignmentReminderSent | Due date reminder sent |

---

## 4. API Endpoints

### 4.1 Assignment Management

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/courses/{courseId}/assignments | Create assignment |
| GET | /api/courses/{courseId}/assignments | List assignments |
| GET | /api/assignments/{id} | Get assignment details |
| PUT | /api/assignments/{id} | Update assignment |
| DELETE | /api/assignments/{id} | Delete assignment |
| POST | /api/assignments/{id}/publish | Publish assignment |
| POST | /api/assignments/{id}/unpublish | Unpublish assignment |

### 4.2 Rubric Management

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/assignments/{id}/rubric | Create rubric |
| GET | /api/assignments/{id}/rubric | Get rubric |
| PUT | /api/assignments/{id}/rubric | Update rubric |
| DELETE | /api/assignments/{id}/rubric | Remove rubric |

### 4.3 Submission Management

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/assignments/{id}/submissions | Submit assignment |
| GET | /api/assignments/{id}/submissions | List submissions |
| GET | /api/submissions/{id} | Get submission details |
| PUT | /api/submissions/{id} | Resubmit assignment |
| DELETE | /api/submissions/{id} | Withdraw submission |
| POST | /api/submissions/{id}/files | Upload file |
| DELETE | /api/submissions/{id}/files/{fileId} | Remove file |

### 4.4 Grading

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/submissions/{id}/grade | Grade submission |
| PUT | /api/submissions/{id}/grade | Update grade |
| POST | /api/submissions/{id}/feedback | Add feedback |
| POST | /api/assignments/{id}/bulk-grade | Bulk grade submissions |

### 4.5 Peer Review

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/assignments/{id}/peer-review/enable | Enable peer review |
| POST | /api/assignments/{id}/peer-review/assign | Assign peer reviews |
| GET | /api/assignments/{id}/peer-reviews | List peer reviews |
| POST | /api/peer-reviews/{id}/submit | Submit peer review |
| PUT | /api/peer-reviews/{id} | Update peer review |

### 4.6 Analytics

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/assignments/{id}/statistics | Get assignment statistics |
| GET | /api/assignments/{id}/submissions/status | Get submission status summary |
| GET | /api/submissions/{id}/history | Get submission history |

---

## 5. Security Considerations

- Students can only view and submit to assignments in courses they are enrolled in
- Instructors can only manage assignments for courses they teach
- Submission files MUST be scanned for malware before storage
- File download links MUST be time-limited and signed
- Peer review assignments MUST maintain anonymity if configured
- Grades MUST only be visible to the student and instructor
- All grade changes MUST be logged for audit trail

---

## 6. Dependencies

- Course Management feature for course and enrollment data
- Identity & Access Management for user authentication
- File storage service for submission files
- Notification service for assignment reminders
- Serilog for structured logging
- MediatR for CQRS pattern
- Entity Framework Core for data access
- FluentValidation for request validation

---

## 7. Implementation Notes

Per the implementation specification (REQ-SYS-005, REQ-SYS-006), all data access SHALL use ICoursesPlatformContext directly without repository pattern.

File uploads SHALL use a dedicated storage service with virus scanning.

Late penalty calculation SHALL be automatic based on configured policy.

Peer review assignment SHALL use a round-robin algorithm to ensure fair distribution.

---

*Document Version: 1.0*
*Phase Coverage: 4-5*
