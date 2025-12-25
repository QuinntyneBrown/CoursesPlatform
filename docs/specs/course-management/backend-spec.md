# Course Management - Backend Specification

**Feature:** Course Management
**Version:** 1.0
**Last Updated:** December 2024

---

## 1. Overview

The Course Management feature enables instructors to create, manage, and publish courses with rich metadata, learning objectives, and settings.

---

## 2. Requirements

### 2.1 Course Lifecycle

#### REQ-CRS-001: Create Course Draft [Phase 1]
The system SHALL allow instructors to create course drafts.

**Acceptance Criteria:**
- AC1: Instructor can create a new course with title and description
- AC2: Course is created with Draft status
- AC3: CourseDraftCreated event is published
- AC4: Course is assigned to the creating instructor

#### REQ-CRS-002: Update Course Draft [Phase 1]
The system SHALL allow instructors to update their course drafts.

**Acceptance Criteria:**
- AC1: Instructor can update all course fields
- AC2: CourseDraftUpdated event is published
- AC3: Last updated timestamp is recorded

#### REQ-CRS-003: Delete Course Draft [Phase 1]
The system SHALL allow instructors to delete unpublished course drafts.

**Acceptance Criteria:**
- AC1: Only draft courses can be deleted
- AC2: All associated sections and lectures are deleted
- AC3: CourseDraftDeleted event is published

#### REQ-CRS-004: Submit Course for Review [Phase 2]
The system SHALL allow instructors to submit courses for platform review.

**Acceptance Criteria:**
- AC1: Course must have minimum required content
- AC2: Status changes to PendingReview
- AC3: CourseSubmittedForReview event is published
- AC4: Platform admins are notified

#### REQ-CRS-005: Course Review Process [Phase 2]
The system SHALL support course review by platform administrators.

**Acceptance Criteria:**
- AC1: Reviewer can start review (CourseReviewStarted event)
- AC2: Reviewer can approve course (CourseApproved event)
- AC3: Reviewer can reject course with feedback (CourseRejected event)
- AC4: Reviewer can request revisions (CourseRevisionRequested event)

#### REQ-CRS-006: Publish Course [Phase 1]
The system SHALL allow instructors to publish approved courses.

**Acceptance Criteria:**
- AC1: Only approved courses can be published
- AC2: Status changes to Published
- AC3: CoursePublished event is published
- AC4: Course becomes visible to students

#### REQ-CRS-007: Unpublish Course [Phase 1]
The system SHALL allow instructors to unpublish courses.

**Acceptance Criteria:**
- AC1: Existing enrollments are preserved
- AC2: Status changes to Unpublished
- AC3: CourseUnpublished event is published
- AC4: Course is hidden from search/browse

#### REQ-CRS-008: Republish Course [Phase 2]
The system SHALL allow instructors to republish unpublished courses.

**Acceptance Criteria:**
- AC1: Status changes to Published
- AC2: CourseRepublished event is published
- AC3: Course becomes visible again

#### REQ-CRS-009: Archive Course [Phase 3]
The system SHALL allow instructors to archive courses.

**Acceptance Criteria:**
- AC1: Enrolled students retain access
- AC2: No new enrollments allowed
- AC3: CourseArchived event is published

#### REQ-CRS-010: Unarchive Course [Phase 3]
The system SHALL allow instructors to unarchive courses.

**Acceptance Criteria:**
- AC1: Course returns to previous status
- AC2: CourseUnarchived event is published

#### REQ-CRS-011: Duplicate Course [Phase 3]
The system SHALL allow instructors to duplicate courses.

**Acceptance Criteria:**
- AC1: All content and settings are copied
- AC2: New course is created as draft
- AC3: CourseDuplicated event is published

#### REQ-CRS-012: Course Versioning [Phase 5]
The system SHALL support course version management.

**Acceptance Criteria:**
- AC1: Instructor can create new version
- AC2: Previous versions are preserved
- AC3: CourseVersionCreated event is published
- AC4: Students can access enrolled version

### 2.2 Course Metadata

#### REQ-CRS-013: Update Course Title [Phase 1]
The system SHALL allow updating course title.

**Acceptance Criteria:**
- AC1: Title is validated (max 200 characters)
- AC2: CourseTitleChanged event is published

#### REQ-CRS-014: Update Course Subtitle [Phase 1]
The system SHALL allow updating course subtitle.

**Acceptance Criteria:**
- AC1: Subtitle is validated (max 300 characters)
- AC2: CourseSubtitleChanged event is published

#### REQ-CRS-015: Update Course Description [Phase 1]
The system SHALL allow updating course description.

**Acceptance Criteria:**
- AC1: Rich text description is supported
- AC2: Maximum 5000 characters
- AC3: CourseDescriptionUpdated event is published

#### REQ-CRS-016: Course Thumbnail [Phase 1]
The system SHALL allow uploading course thumbnail images.

**Acceptance Criteria:**
- AC1: Accepted formats: JPEG, PNG
- AC2: Maximum size: 5MB
- AC3: Image is resized to standard dimensions
- AC4: CourseThumbnailUploaded/Removed events are published

#### REQ-CRS-017: Course Promo Video [Phase 2]
The system SHALL allow uploading promotional videos.

**Acceptance Criteria:**
- AC1: Video is processed for streaming
- AC2: CoursePromoVideoUploaded event is published
- AC3: CoursePromoVideoProcessed event after processing
- AC4: CoursePromoVideoRemoved event when removed

#### REQ-CRS-018: Course Category [Phase 1]
The system SHALL allow assigning courses to categories.

**Acceptance Criteria:**
- AC1: Course can be assigned to one category
- AC2: Subcategory can be assigned
- AC3: CourseCategoryAssigned/Changed events are published

#### REQ-CRS-019: Course Topics and Tags [Phase 2]
The system SHALL support course topics and tags.

**Acceptance Criteria:**
- AC1: Multiple topics can be added
- AC2: Multiple tags can be added
- AC3: CourseTopicAdded/Removed events are published
- AC4: CourseTagAdded/Removed events are published

#### REQ-CRS-020: Course Language [Phase 1]
The system SHALL allow setting course language.

**Acceptance Criteria:**
- AC1: Language is selected from supported list
- AC2: CourseLanguageSet/Changed events are published

#### REQ-CRS-021: Course Level [Phase 1]
The system SHALL allow setting course difficulty level.

**Acceptance Criteria:**
- AC1: Levels: Beginner, Intermediate, Advanced, All Levels
- AC2: CourseLevelSet/Changed events are published

### 2.3 Learning Objectives

#### REQ-CRS-022: Learning Objectives [Phase 1]
The system SHALL allow defining learning objectives.

**Acceptance Criteria:**
- AC1: Multiple objectives can be added
- AC2: Objectives can be reordered
- AC3: LearningObjectiveAdded/Updated/Removed/Reordered events are published

#### REQ-CRS-023: Prerequisites [Phase 2]
The system SHALL allow defining course prerequisites.

**Acceptance Criteria:**
- AC1: Text-based prerequisites
- AC2: PrerequisiteAdded/Updated/Removed events are published

#### REQ-CRS-024: Target Audience [Phase 2]
The system SHALL allow defining target audience.

**Acceptance Criteria:**
- AC1: Multiple audience descriptions can be added
- AC2: TargetAudienceAdded/Updated/Removed events are published

### 2.4 Course Settings

#### REQ-CRS-025: Course Settings [Phase 2]
The system SHALL allow configuring course settings.

**Acceptance Criteria:**
- AC1: Feedback settings can be configured
- AC2: Message settings can be configured
- AC3: Completion settings can be configured
- AC4: CourseSettingsUpdated event is published

#### REQ-CRS-026: Certificate Settings [Phase 3]
The system SHALL allow enabling/disabling certificates.

**Acceptance Criteria:**
- AC1: Certificates can be enabled/disabled
- AC2: Certificate template can be selected
- AC3: CourseCertificateEnabled/Disabled events are published
- AC4: CourseCertificateSettingsUpdated event for template changes

---

## 3. Domain Model

### 3.1 Entities

| Entity | Description |
|--------|-------------|
| Course | Main course entity with metadata and settings |
| Category | Course category for organization |
| LearningObjective | Course learning outcome |
| Prerequisite | Required prior knowledge |
| TargetAudience | Intended learner description |
| CourseSettings | Course configuration options |

### 3.2 Domain Events

| Event | Trigger |
|-------|---------|
| CourseDraftCreated | New course draft created |
| CourseDraftUpdated | Course draft modified |
| CourseDraftDeleted | Course draft deleted |
| CourseSubmittedForReview | Course submitted for review |
| CourseReviewStarted | Review process started |
| CourseApproved | Course approved |
| CourseRejected | Course rejected |
| CourseRevisionRequested | Revisions requested |
| CoursePublished | Course published |
| CourseUnpublished | Course unpublished |
| CourseRepublished | Course republished |
| CourseArchived | Course archived |
| CourseUnarchived | Course unarchived |
| CoursePermanentlyDeleted | Course permanently deleted |
| CourseDuplicated | Course duplicated |
| CourseVersionCreated | New version created |
| CourseTitleChanged | Title updated |
| CourseSubtitleChanged | Subtitle updated |
| CourseDescriptionUpdated | Description updated |
| CourseThumbnailUploaded | Thumbnail uploaded |
| CourseThumbnailRemoved | Thumbnail removed |
| CoursePromoVideoUploaded | Promo video uploaded |
| CoursePromoVideoRemoved | Promo video removed |
| CoursePromoVideoProcessed | Promo video ready |
| CourseCategoryAssigned | Category assigned |
| CourseSubcategoryAssigned | Subcategory assigned |
| CourseCategoryChanged | Category changed |
| CourseTopicAdded | Topic added |
| CourseTopicRemoved | Topic removed |
| CourseTagAdded | Tag added |
| CourseTagRemoved | Tag removed |
| CourseLanguageSet | Language set |
| CourseLanguageChanged | Language changed |
| CourseLevelSet | Level set |
| CourseLevelChanged | Level changed |
| LearningObjectiveAdded | Objective added |
| LearningObjectiveUpdated | Objective updated |
| LearningObjectiveRemoved | Objective removed |
| LearningObjectiveReordered | Objectives reordered |
| PrerequisiteAdded | Prerequisite added |
| PrerequisiteUpdated | Prerequisite updated |
| PrerequisiteRemoved | Prerequisite removed |
| TargetAudienceAdded | Audience added |
| TargetAudienceUpdated | Audience updated |
| TargetAudienceRemoved | Audience removed |
| CourseSettingsUpdated | Settings updated |
| CourseFeedbackSettingsChanged | Feedback settings changed |
| CourseMessageSettingsChanged | Message settings changed |
| CourseCompletionSettingsUpdated | Completion settings changed |
| CourseCertificateEnabled | Certificate enabled |
| CourseCertificateDisabled | Certificate disabled |
| CourseCertificateSettingsUpdated | Certificate settings updated |

---

## 4. API Endpoints

### 4.1 Course CRUD

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/courses | List courses (with filters) |
| GET | /api/courses/{id} | Get course details |
| POST | /api/courses | Create course draft |
| PUT | /api/courses/{id} | Update course |
| DELETE | /api/courses/{id} | Delete course draft |

### 4.2 Course Lifecycle

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/courses/{id}/submit-for-review | Submit for review |
| POST | /api/courses/{id}/approve | Approve course |
| POST | /api/courses/{id}/reject | Reject course |
| POST | /api/courses/{id}/publish | Publish course |
| POST | /api/courses/{id}/unpublish | Unpublish course |
| POST | /api/courses/{id}/archive | Archive course |
| POST | /api/courses/{id}/unarchive | Unarchive course |
| POST | /api/courses/{id}/duplicate | Duplicate course |

### 4.3 Course Content

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/courses/{id}/thumbnail | Upload thumbnail |
| DELETE | /api/courses/{id}/thumbnail | Remove thumbnail |
| POST | /api/courses/{id}/promo-video | Upload promo video |
| DELETE | /api/courses/{id}/promo-video | Remove promo video |

### 4.4 Learning Objectives

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/courses/{id}/objectives | List objectives |
| POST | /api/courses/{id}/objectives | Add objective |
| PUT | /api/courses/{id}/objectives/{objId} | Update objective |
| DELETE | /api/courses/{id}/objectives/{objId} | Remove objective |
| PUT | /api/courses/{id}/objectives/reorder | Reorder objectives |

### 4.5 Categories

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/categories | List categories |
| GET | /api/categories/{id}/subcategories | List subcategories |

---

## 5. Business Rules

- Only instructors can create courses
- Course must have title, description, and at least one section with one lecture to submit for review
- Only course owner or admin can modify course
- Published courses cannot be deleted (must archive first)
- Archived courses cannot accept new enrollments

---

## 6. Implementation Notes

Per the implementation specification, all data access uses ICoursesPlatformContext directly without repository pattern.

---

*Document Version: 1.0*
*Phase Coverage: 1-5*
