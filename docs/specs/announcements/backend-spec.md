# Announcements - Backend Specification

**Feature:** Announcements
**Version:** 1.0
**Last Updated:** December 2024

---

## 1. Overview

The Announcements feature enables instructors to communicate with students through targeted announcements. It supports announcement lifecycle management (create, publish, schedule), multi-channel delivery (email, push notifications, in-app), and engagement tracking (views, read status).

---

## 2. Requirements

### 2.1 Announcement Lifecycle

#### REQ-ANN-001: Create Announcement [Phase 4]
The system SHALL allow instructors to create announcements for their courses.

**Acceptance Criteria:**
- AC1: Instructor can create announcement with title, content, and target audience
- AC2: System validates title (required, max 200 chars) and content (required, max 5000 chars)
- AC3: Announcement is created with Draft status
- AC4: AnnouncementCreated event is published
- AC5: Created timestamp is recorded
- AC6: Instructor can specify target (all students, specific sections, specific students)

#### REQ-ANN-002: Update Announcement [Phase 4]
The system SHALL allow instructors to update draft announcements.

**Acceptance Criteria:**
- AC1: Instructor can update title, content, and target audience
- AC2: Only Draft announcements can be updated
- AC3: AnnouncementUpdated event is published
- AC4: Updated timestamp is recorded
- AC5: System prevents editing of published announcements

#### REQ-ANN-003: Publish Announcement [Phase 4]
The system SHALL allow instructors to publish announcements immediately.

**Acceptance Criteria:**
- AC1: Instructor can publish Draft announcement
- AC2: Announcement status changes to Published
- AC3: PublishedAt timestamp is recorded
- AC4: AnnouncementPublished event is published
- AC5: Delivery process is triggered immediately
- AC6: Target recipients are identified and delivery records are created

#### REQ-ANN-004: Schedule Announcement [Phase 4]
The system SHALL allow instructors to schedule announcements for future delivery.

**Acceptance Criteria:**
- AC1: Instructor can specify future publish date and time
- AC2: Scheduled date must be in the future
- AC3: Announcement status changes to Scheduled
- AC4: AnnouncementScheduled event is published
- AC5: ScheduledFor timestamp is recorded
- AC6: Background job automatically publishes at scheduled time

#### REQ-ANN-005: Cancel Scheduled Announcement [Phase 4]
The system SHALL allow instructors to cancel scheduled announcements.

**Acceptance Criteria:**
- AC1: Instructor can cancel Scheduled announcement before publish time
- AC2: Announcement status reverts to Draft
- AC3: AnnouncementCancelled event is published
- AC4: ScheduledFor is cleared
- AC5: Cannot cancel after publish time has passed

#### REQ-ANN-006: Delete Announcement [Phase 4]
The system SHALL allow instructors to delete draft announcements.

**Acceptance Criteria:**
- AC1: Instructor can delete Draft announcements
- AC2: AnnouncementDeleted event is published
- AC3: Cannot delete Published or Scheduled announcements
- AC4: Soft delete is used to maintain audit trail

#### REQ-ANN-007: Archive Announcement [Phase 4]
The system SHALL support archiving old announcements.

**Acceptance Criteria:**
- AC1: Instructor can archive Published announcements
- AC2: Announcement status changes to Archived
- AC3: AnnouncementArchived event is published
- AC4: Archived announcements are hidden from student view
- AC5: Instructor can view archived announcements in archive list

### 2.2 Announcement Delivery

#### REQ-ANN-008: In-App Delivery [Phase 4]
The system SHALL deliver announcements through in-app notifications.

**Acceptance Criteria:**
- AC1: Each target student receives an in-app notification
- AC2: InAppDeliveryCreated event is published for each recipient
- AC3: Notification appears in student's notification center
- AC4: Delivery status is tracked (Pending, Delivered, Failed)
- AC5: DeliveredAt timestamp is recorded when shown to student

#### REQ-ANN-009: Email Delivery [Phase 4]
The system SHALL deliver announcements via email.

**Acceptance Criteria:**
- AC1: Each target student receives an email notification
- AC2: EmailDeliveryCreated event is published for each recipient
- AC3: Email includes announcement title and content
- AC4: Email includes link to view in-app
- AC5: Delivery status is tracked (Pending, Sent, Failed, Bounced)
- AC6: Failed deliveries trigger EmailDeliveryFailed event

#### REQ-ANN-010: Push Notification Delivery [Phase 4]
The system SHALL deliver announcements via push notifications.

**Acceptance Criteria:**
- AC1: Students with push enabled receive push notification
- AC2: PushNotificationCreated event is published for each recipient
- AC3: Push includes announcement title and preview
- AC4: Tapping push opens announcement in app
- AC5: Delivery status is tracked (Pending, Sent, Failed)
- AC6: Failed deliveries trigger PushDeliveryFailed event

#### REQ-ANN-011: Delivery Preferences [Phase 4]
The system SHALL respect student notification preferences.

**Acceptance Criteria:**
- AC1: Students can opt-out of email delivery per course
- AC2: Students can opt-out of push delivery per course
- AC3: In-app delivery is always enabled
- AC4: Preferences are checked before creating delivery records
- AC5: DeliveryPreferenceUpdated event is published on changes

#### REQ-ANN-012: Delivery Retries [Phase 4]
The system SHALL retry failed deliveries.

**Acceptance Criteria:**
- AC1: Failed email deliveries retry up to 3 times
- AC2: Failed push deliveries retry up to 2 times
- AC3: Exponential backoff is used between retries
- AC4: DeliveryRetried event is published for each retry
- AC5: Permanent failures are marked after max retries

#### REQ-ANN-013: Bulk Delivery Processing [Phase 4]
The system SHALL process announcement deliveries efficiently.

**Acceptance Criteria:**
- AC1: Deliveries are processed in batches of 100
- AC2: Background job handles delivery processing
- AC3: Delivery progress is tracked and visible to instructor
- AC4: Large announcements (500+ recipients) show progress indicator
- AC5: Failed deliveries don't block successful ones

### 2.3 View Tracking

#### REQ-ANN-014: Track Announcement Views [Phase 4]
The system SHALL track when students view announcements.

**Acceptance Criteria:**
- AC1: First view by student is recorded with timestamp
- AC2: AnnouncementViewed event is published on first view
- AC3: Multiple views by same student update LastViewedAt
- AC4: View count per student is maintained
- AC5: In-app delivery status changes to Read on first view

#### REQ-ANN-015: Read Status Tracking [Phase 4]
The system SHALL track read/unread status for each student.

**Acceptance Criteria:**
- AC1: Announcement starts as Unread for all recipients
- AC2: First view marks announcement as Read
- AC3: AnnouncementMarkedAsRead event is published
- AC4: Read status persists across sessions
- AC5: Student can see unread count in notification center

#### REQ-ANN-016: Engagement Metrics [Phase 4]
The system SHALL provide engagement metrics to instructors.

**Acceptance Criteria:**
- AC1: Total recipients count is calculated
- AC2: Delivered count tracks successful deliveries
- AC3: Viewed count tracks students who opened announcement
- AC4: Read rate percentage is calculated (viewed/delivered)
- AC5: Metrics update in real-time as views occur

#### REQ-ANN-017: View History [Phase 4]
The system SHALL maintain view history for announcements.

**Acceptance Criteria:**
- AC1: Each view event is recorded with timestamp
- AC2: Student's complete view history is retrievable
- AC3: Instructor can see list of students who viewed
- AC4: Instructor can see list of students who haven't viewed
- AC5: View history includes device/platform information

### 2.4 Announcement Retrieval

#### REQ-ANN-018: List Course Announcements [Phase 4]
The system SHALL allow retrieving announcements for a course.

**Acceptance Criteria:**
- AC1: Students can list Published announcements for enrolled courses
- AC2: Instructors can list all announcements (all statuses) for their courses
- AC3: Results are sorted by PublishedAt descending
- AC4: Pagination is supported (page size 20)
- AC5: Archived announcements are excluded for students

#### REQ-ANN-019: Get Announcement Details [Phase 4]
The system SHALL allow retrieving individual announcement details.

**Acceptance Criteria:**
- AC1: Students can view Published announcements
- AC2: Instructors can view all announcements for their courses
- AC3: Response includes title, content, author, timestamps
- AC4: Response includes delivery metrics for instructors
- AC5: View is tracked when student retrieves announcement

#### REQ-ANN-020: Search Announcements [Phase 4]
The system SHALL support searching announcements.

**Acceptance Criteria:**
- AC1: Students can search by title and content
- AC2: Instructors can search by title, content, and status
- AC3: Full-text search is supported
- AC4: Search is case-insensitive
- AC5: Results are ranked by relevance

---

## 3. Domain Model

### 3.1 Entities

| Entity | Description |
|--------|-------------|
| Announcement | Core announcement with title, content, and status |
| AnnouncementDelivery | Delivery record for each recipient and channel |
| AnnouncementView | View tracking record for each student view |
| DeliveryPreference | Student preferences for announcement notifications |

### 3.2 Domain Events

| Event | Trigger |
|-------|---------|
| AnnouncementCreated | Instructor creates announcement |
| AnnouncementUpdated | Instructor updates draft announcement |
| AnnouncementPublished | Announcement is published |
| AnnouncementScheduled | Announcement is scheduled |
| AnnouncementCancelled | Scheduled announcement is cancelled |
| AnnouncementDeleted | Draft announcement is deleted |
| AnnouncementArchived | Published announcement is archived |
| InAppDeliveryCreated | In-app delivery record created |
| EmailDeliveryCreated | Email delivery record created |
| PushNotificationCreated | Push delivery record created |
| DeliveryCompleted | Delivery successfully completed |
| EmailDeliveryFailed | Email delivery failed |
| PushDeliveryFailed | Push delivery failed |
| DeliveryRetried | Failed delivery retried |
| DeliveryPreferenceUpdated | Student updates notification preferences |
| AnnouncementViewed | Student views announcement |
| AnnouncementMarkedAsRead | Announcement marked as read |

---

## 4. API Endpoints

### 4.1 Announcement Management

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/courses/{courseId}/announcements | Create announcement |
| PUT | /api/courses/{courseId}/announcements/{id} | Update draft announcement |
| POST | /api/courses/{courseId}/announcements/{id}/publish | Publish announcement |
| POST | /api/courses/{courseId}/announcements/{id}/schedule | Schedule announcement |
| POST | /api/courses/{courseId}/announcements/{id}/cancel | Cancel scheduled announcement |
| DELETE | /api/courses/{courseId}/announcements/{id} | Delete draft announcement |
| POST | /api/courses/{courseId}/announcements/{id}/archive | Archive announcement |

### 4.2 Announcement Retrieval

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/courses/{courseId}/announcements | List course announcements |
| GET | /api/courses/{courseId}/announcements/{id} | Get announcement details |
| GET | /api/announcements/unread | Get unread announcements count |
| GET | /api/courses/{courseId}/announcements/search | Search announcements |

### 4.3 Delivery & Tracking

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/courses/{courseId}/announcements/{id}/metrics | Get engagement metrics |
| GET | /api/courses/{courseId}/announcements/{id}/viewers | Get list of viewers |
| POST | /api/courses/{courseId}/announcements/{id}/mark-read | Mark announcement as read |
| PUT | /api/courses/{courseId}/delivery-preferences | Update delivery preferences |
| GET | /api/courses/{courseId}/delivery-preferences | Get delivery preferences |

---

## 5. Business Rules

- Only instructors can create announcements
- Only course instructor or teaching assistants can manage announcements
- Students can only view Published announcements for enrolled courses
- Scheduled announcements automatically publish at specified time
- Cannot edit or delete Published announcements
- Cannot schedule announcement for past date
- Archived announcements remain accessible to instructors
- Email delivery requires verified email address
- Push delivery requires registered device token
- In-app delivery always succeeds (persists in database)

---

## 6. Security Considerations

- All announcement operations require authentication
- Authorization checks verify course instructor/TA role
- Students can only access announcements for enrolled courses
- Announcement content is sanitized to prevent XSS
- Rate limiting applies to announcement creation (max 10 per hour)
- Delivery preferences are user-scoped and isolated
- View tracking includes IP address for audit purposes

---

## 7. Dependencies

- Serilog for structured logging
- MediatR for CQRS pattern
- Entity Framework Core for data access
- FluentValidation for request validation
- Hangfire for background job processing
- Email service integration for email delivery
- Push notification service for mobile notifications

---

## 8. Implementation Notes

Per the implementation specification (REQ-SYS-005, REQ-SYS-006), all data access SHALL use ICoursesPlatformContext directly without repository pattern.

Background job processing SHALL use Hangfire for scheduled announcements and delivery processing.

---

*Document Version: 1.0*
*Phase Coverage: 4*
