# Reviews & Ratings - Backend Specification

**Feature:** Reviews & Ratings
**Version:** 1.0
**Last Updated:** December 2024

---

## 1. Overview

The Reviews & Ratings feature allows students to review and rate courses they have enrolled in, enabling course quality feedback, instructor responses, and community engagement through review interactions.

---

## 2. Requirements

### 2.1 Review Lifecycle

#### REQ-REV-001: Submit Review [Phase 2]
The system SHALL allow enrolled students to submit reviews for courses.

**Acceptance Criteria:**
- AC1: Only enrolled students can submit reviews
- AC2: Student can submit one review per course
- AC3: Review includes rating (1-5 stars), title, and body text
- AC4: Rating is required, title and body are optional
- AC5: ReviewSubmitted event is published
- AC6: Course rating is recalculated upon submission

#### REQ-REV-002: Edit Review [Phase 2]
The system SHALL allow students to edit their submitted reviews.

**Acceptance Criteria:**
- AC1: Student can edit only their own reviews
- AC2: Review can be edited at any time
- AC3: Edit history is tracked with timestamps
- AC4: ReviewEdited event is published
- AC5: Course rating is recalculated upon edit

#### REQ-REV-003: Delete Review [Phase 2]
The system SHALL allow students to delete their reviews.

**Acceptance Criteria:**
- AC1: Student can delete only their own reviews
- AC2: Deletion is soft delete (marked as deleted)
- AC3: ReviewDeleted event is published
- AC4: Course rating is recalculated upon deletion
- AC5: Instructor responses remain for audit purposes

#### REQ-REV-004: Review Moderation [Phase 3]
The system SHALL allow administrators to moderate inappropriate reviews.

**Acceptance Criteria:**
- AC1: Administrators can flag reviews as inappropriate
- AC2: Administrators can hide/unhide reviews
- AC3: ReviewFlagged event is published when flagged
- AC4: ReviewHidden/ReviewUnhidden events are published
- AC5: Hidden reviews are excluded from rating calculations

### 2.2 Review Content

#### REQ-REV-005: Rating Validation [Phase 2]
The system SHALL validate rating values.

**Acceptance Criteria:**
- AC1: Rating must be integer between 1 and 5
- AC2: Rating cannot be null or zero
- AC3: Validation error returned for invalid ratings

#### REQ-REV-006: Text Content Validation [Phase 2]
The system SHALL validate review text content.

**Acceptance Criteria:**
- AC1: Title maximum length is 200 characters
- AC2: Body maximum length is 5000 characters
- AC3: HTML/script tags are stripped from content
- AC4: Profanity filter is applied (Phase 3)

#### REQ-REV-007: Review Metadata [Phase 2]
The system SHALL capture review metadata.

**Acceptance Criteria:**
- AC1: Timestamp of submission is recorded
- AC2: Timestamp of last edit is recorded
- AC3: Student enrollment status at time of review is captured
- AC4: Course completion status at time of review is captured

### 2.3 Review Interactions

#### REQ-REV-008: Helpful Vote [Phase 2]
The system SHALL allow users to mark reviews as helpful.

**Acceptance Criteria:**
- AC1: Any authenticated user can vote on review helpfulness
- AC2: User can vote helpful or not helpful (binary choice)
- AC3: User can change their vote
- AC4: User can remove their vote
- AC5: ReviewMarkedHelpful/ReviewMarkedNotHelpful events are published
- AC6: Vote counts are updated in real-time

#### REQ-REV-009: Report Review [Phase 3]
The system SHALL allow users to report inappropriate reviews.

**Acceptance Criteria:**
- AC1: Any authenticated user can report a review
- AC2: Report requires reason selection (spam, offensive, etc.)
- AC3: ReviewReported event is published
- AC4: Multiple reports trigger automatic flagging
- AC5: Administrators are notified of reports

### 2.4 Instructor Responses

#### REQ-REV-010: Submit Instructor Response [Phase 2]
The system SHALL allow course instructors to respond to reviews.

**Acceptance Criteria:**
- AC1: Only course instructor can respond to reviews
- AC2: One response per review is allowed
- AC3: Response maximum length is 2000 characters
- AC4: InstructorResponseSubmitted event is published
- AC5: Student is notified of instructor response

#### REQ-REV-011: Edit Instructor Response [Phase 2]
The system SHALL allow instructors to edit their responses.

**Acceptance Criteria:**
- AC1: Instructor can edit only their own responses
- AC2: Response can be edited at any time
- AC3: Edit history is tracked with timestamps
- AC4: InstructorResponseEdited event is published

#### REQ-REV-012: Delete Instructor Response [Phase 2]
The system SHALL allow instructors to delete their responses.

**Acceptance Criteria:**
- AC1: Instructor can delete only their own responses
- AC2: Deletion is soft delete (marked as deleted)
- AC3: InstructorResponseDeleted event is published

### 2.5 Course Ratings

#### REQ-REV-013: Calculate Course Rating [Phase 2]
The system SHALL calculate and maintain course average ratings.

**Acceptance Criteria:**
- AC1: Rating is calculated as average of all visible reviews
- AC2: Rating is calculated to 2 decimal places
- AC3: Rating calculation excludes hidden/deleted reviews
- AC4: Rating is recalculated on review create/edit/delete
- AC5: CourseRatingUpdated event is published on change

#### REQ-REV-014: Rating Statistics [Phase 2]
The system SHALL maintain rating distribution statistics.

**Acceptance Criteria:**
- AC1: Count of reviews for each star rating (1-5) is tracked
- AC2: Total review count is maintained
- AC3: Statistics are updated on review changes
- AC4: Statistics exclude hidden/deleted reviews

#### REQ-REV-015: Weighted Rating [Phase 3]
The system SHALL support weighted rating calculations.

**Acceptance Criteria:**
- AC1: Bayesian average can be applied for courses with few reviews
- AC2: Weight factors account for review age
- AC3: Weight factors account for verified purchases
- AC4: Configuration allows switching between simple and weighted

### 2.6 Review Display

#### REQ-REV-016: Review Pagination [Phase 2]
The system SHALL support paginated review retrieval.

**Acceptance Criteria:**
- AC1: Reviews are returned in pages of configurable size (default 10)
- AC2: Sorting options: most recent, highest rating, most helpful
- AC3: Filtering options: by rating value, verified purchase
- AC4: Total count is included in response

#### REQ-REV-017: Review Verification [Phase 2]
The system SHALL indicate verified reviews.

**Acceptance Criteria:**
- AC1: Reviews from students who completed course are marked verified
- AC2: Verification badge is included in review data
- AC3: Verified status is recalculated if completion status changes

---

## 3. Domain Model

### 3.1 Entities

| Entity | Description |
|--------|-------------|
| Review | Student review and rating for a course |
| InstructorResponse | Instructor's response to a review |
| ReviewInteraction | User's helpful/not helpful vote on a review |
| CourseRating | Aggregated rating statistics for a course |
| ReviewReport | User report of inappropriate review |

### 3.2 Domain Events

| Event | Trigger |
|-------|---------|
| ReviewSubmitted | Student submits new review |
| ReviewEdited | Student edits their review |
| ReviewDeleted | Student deletes their review |
| ReviewFlagged | Administrator flags review |
| ReviewHidden | Administrator hides review |
| ReviewUnhidden | Administrator unhides review |
| ReviewMarkedHelpful | User marks review as helpful |
| ReviewMarkedNotHelpful | User marks review as not helpful |
| ReviewReported | User reports review |
| InstructorResponseSubmitted | Instructor responds to review |
| InstructorResponseEdited | Instructor edits response |
| InstructorResponseDeleted | Instructor deletes response |
| CourseRatingUpdated | Course average rating changes |
| ReviewVerificationChanged | Review verification status changes |

---

## 4. API Endpoints

### 4.1 Reviews

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/courses/{courseId}/reviews | Submit review |
| GET | /api/courses/{courseId}/reviews | List course reviews |
| GET | /api/reviews/{reviewId} | Get review details |
| PUT | /api/reviews/{reviewId} | Update review |
| DELETE | /api/reviews/{reviewId} | Delete review |
| GET | /api/users/me/reviews | List user's reviews |

### 4.2 Review Interactions

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/reviews/{reviewId}/helpful | Mark review helpful |
| POST | /api/reviews/{reviewId}/not-helpful | Mark review not helpful |
| DELETE | /api/reviews/{reviewId}/vote | Remove vote |
| POST | /api/reviews/{reviewId}/report | Report review |

### 4.3 Instructor Responses

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/reviews/{reviewId}/response | Submit instructor response |
| PUT | /api/reviews/{reviewId}/response | Update instructor response |
| DELETE | /api/reviews/{reviewId}/response | Delete instructor response |

### 4.4 Course Ratings

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/courses/{courseId}/rating | Get course rating summary |
| GET | /api/courses/{courseId}/rating/distribution | Get rating distribution |

### 4.5 Moderation

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/admin/reviews/{reviewId}/flag | Flag review |
| POST | /api/admin/reviews/{reviewId}/hide | Hide review |
| POST | /api/admin/reviews/{reviewId}/unhide | Unhide review |
| GET | /api/admin/reviews/reported | List reported reviews |

---

## 5. Business Rules

### 5.1 Review Eligibility
- Users MUST be enrolled in course to submit review
- Users can submit ONLY one review per course
- Users cannot review their own courses (instructors)
- Review can be edited/deleted only by author

### 5.2 Rating Calculation
- Hidden reviews MUST be excluded from rating calculation
- Deleted reviews MUST be excluded from rating calculation
- Rating MUST be recalculated on any review change
- Minimum 1 review required for course rating

### 5.3 Instructor Responses
- Only course instructor can respond to reviews
- One response per review maximum
- Responses visible to all users
- Responses remain after review deletion (for audit)

### 5.4 Review Interactions
- Users cannot vote on their own reviews
- One vote per user per review (helpful or not helpful)
- Users can change or remove their vote

---

## 6. Validation Rules

### 6.1 Review Validation
```
Rating:
- Required: Yes
- Type: Integer
- Range: 1-5

Title:
- Required: No
- Max Length: 200 characters
- Allowed: Text, numbers, basic punctuation

Body:
- Required: No
- Max Length: 5000 characters
- Allowed: Text, numbers, basic punctuation
- Stripped: HTML tags, scripts
```

### 6.2 Response Validation
```
Response Text:
- Required: Yes
- Max Length: 2000 characters
- Allowed: Text, numbers, basic punctuation
- Stripped: HTML tags, scripts
```

---

## 7. Security Considerations

- All review operations MUST be authenticated
- Authorization checks MUST verify enrollment for review submission
- Authorization checks MUST verify course ownership for instructor responses
- Rate limiting MUST be applied to prevent review spam
- XSS protection MUST be applied to all text content
- Reviews MUST not expose personal student information

---

## 8. Performance Considerations

- Course rating calculations SHOULD be cached
- Review lists SHOULD be paginated with default page size 10
- Rating distribution statistics SHOULD be cached
- Database indexes on CourseId, StudentId, CreatedAt, Rating

---

## 9. Dependencies

- Serilog for structured logging
- MediatR for CQRS pattern
- Entity Framework Core for data access
- FluentValidation for request validation
- HtmlSanitizer for content sanitization

---

## 10. Implementation Notes

Per the implementation specification (REQ-SYS-005, REQ-SYS-006), all data access SHALL use ICoursesPlatformContext directly without repository pattern.

---

*Document Version: 1.0*
*Phase Coverage: 2-3*
