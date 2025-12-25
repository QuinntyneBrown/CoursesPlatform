# Content Moderation Backend Specification

**Feature:** Content Moderation
**Phase:** 5 (Enterprise Feature)
**Version:** 1.0
**Date:** 2025-12-25
**Status:** Draft

---

## 1. Overview

The Content Moderation feature provides a comprehensive system for flagging, reviewing, and moderating user-generated content across the CoursesPlatform. This includes courses, reviews, Q&A posts, discussions, and direct messages. The system supports automated AI-based moderation, manual moderation workflows, trust scoring, and an appeal process.

---

## 2. Functional Requirements

### 2.1 Content Flagging

**REQ-MOD-001** [Phase 5]
**Requirement:** The system SHALL allow users to flag content for moderation review.

**Acceptance Criteria:**
- Users can flag any flaggable content type (Course, Review, QAPost, Discussion, DirectMessage)
- Flagging requires a reason from a predefined list (Spam, Offensive, Inappropriate, Copyright, Other)
- Users can optionally provide additional context/description (max 1000 characters)
- Users cannot flag the same content multiple times
- Flagging is recorded with timestamp and flagging user ID
- Flagged content is added to the moderation queue automatically

---

**REQ-MOD-002** [Phase 5]
**Requirement:** The system SHALL support automated content flagging using AI moderation services.

**Acceptance Criteria:**
- Content is automatically scanned upon creation or update
- AI service analyzes content for profanity, hate speech, adult content, violence
- Content with confidence score above threshold is automatically flagged
- AI flags include confidence score (0.0 to 1.0) and detected categories
- AI flagging bypasses duplicate flag prevention
- AI-flagged content is prioritized in moderation queue

---

**REQ-MOD-003** [Phase 5]
**Requirement:** The system SHALL prevent abuse of the flagging system.

**Acceptance Criteria:**
- Maximum 10 flags per user per 24-hour period
- Repeated false flags reduce user's trust score
- Users with trust score below 20 cannot flag content
- System logs all flagging attempts including denied ones

---

### 2.2 Review Queue Management

**REQ-MOD-004** [Phase 5]
**Requirement:** The system SHALL maintain a moderation queue for flagged content.

**Acceptance Criteria:**
- Queue entries are created when content is flagged
- Queue entries track status: Pending, UnderReview, Resolved
- Queue entries include priority: Low, Medium, High, Critical
- AI-flagged content automatically gets High or Critical priority
- Multiple flags on same content increase priority
- Queue entries track assigned moderator (if any)
- Queue entries include first flagged timestamp and last updated timestamp

---

**REQ-MOD-005** [Phase 5]
**Requirement:** The system SHALL allow moderators to claim and review queue items.

**Acceptance Criteria:**
- Moderators can claim unassigned queue items
- Claiming changes status to UnderReview and assigns moderator
- Moderators can view all flags and context for a queue item
- Moderators can view the flagged content in full context
- Moderators can reassign queue items to other moderators
- Queue items automatically unassign after 24 hours of inactivity

---

**REQ-MOD-006** [Phase 5]
**Requirement:** The system SHALL provide queue filtering and sorting capabilities.

**Acceptance Criteria:**
- Filter by status (Pending, UnderReview, Resolved)
- Filter by priority (Low, Medium, High, Critical)
- Filter by content type
- Filter by assigned moderator
- Filter by date range
- Sort by priority, date flagged, number of flags, last updated
- Default view shows Pending items sorted by priority descending

---

### 2.3 Moderation Actions

**REQ-MOD-007** [Phase 5]
**Requirement:** The system SHALL support multiple moderation actions.

**Acceptance Criteria:**
- Available actions: Approve, Remove, Hide, Warn, Ban
- Approve: Marks content as reviewed and safe, resolves queue item
- Remove: Permanently deletes content, resolves queue item
- Hide: Makes content invisible to non-moderators, resolves queue item
- Warn: Sends warning to content creator, resolves queue item
- Ban: Suspends content creator account, resolves queue item
- Each action requires moderator notes (min 20, max 2000 characters)
- Actions are logged with moderator ID, timestamp, and notes

---

**REQ-MOD-008** [Phase 5]
**Requirement:** The system SHALL notify content creators of moderation actions.

**Acceptance Criteria:**
- Creators are notified when their content is removed or hidden
- Creators are notified when they receive a warning
- Creators are notified when they are banned
- Notifications include reason and moderator notes
- Notifications include appeal instructions
- Approve actions do not notify creators

---

**REQ-MOD-009** [Phase 5]
**Requirement:** The system SHALL track moderation action history.

**Acceptance Criteria:**
- All actions are stored permanently
- Action history includes: content ID, action type, moderator ID, timestamp, notes
- Action history is viewable by administrators and the moderator who took the action
- Action history is included in user moderation profiles
- Deleted content retains action history

---

### 2.4 Trust Score System

**REQ-MOD-010** [Phase 5]
**Requirement:** The system SHALL maintain a trust score for each user.

**Acceptance Criteria:**
- Trust scores range from 0 to 100
- New users start with trust score of 50
- Trust score affects content visibility and flagging privileges
- Trust scores are recalculated based on user behavior
- Trust score history is tracked over time

---

**REQ-MOD-011** [Phase 5]
**Requirement:** The system SHALL adjust trust scores based on user behavior.

**Acceptance Criteria:**
- Creating approved content: +2 points
- Content removed by moderator: -10 points
- Content hidden by moderator: -5 points
- Receiving warning: -8 points
- Being banned: -30 points
- Accurate flag (content actioned): +1 point
- False flag (content approved): -3 points
- Trust score cannot go below 0 or above 100
- Trust score changes are logged with reason and timestamp

---

**REQ-MOD-012** [Phase 5]
**Requirement:** The system SHALL apply restrictions based on trust scores.

**Acceptance Criteria:**
- Trust score < 20: Cannot flag content, all posts auto-flagged for review
- Trust score < 30: Cannot create course content
- Trust score < 40: Content visibility reduced
- Trust score >= 80: Content auto-approved, faster review priority
- Restrictions are enforced in real-time
- Users are notified when restrictions apply

---

### 2.5 Appeal Process

**REQ-MOD-013** [Phase 5]
**Requirement:** The system SHALL allow users to appeal moderation decisions.

**Acceptance Criteria:**
- Users can appeal Remove, Hide, Warn, and Ban actions
- Appeals must include reason (min 50, max 2000 characters)
- Users can appeal within 30 days of the moderation action
- Users cannot submit multiple appeals for the same action
- Appeal submissions are tracked with timestamp

---

**REQ-MOD-014** [Phase 5]
**Requirement:** The system SHALL provide an appeal review workflow.

**Acceptance Criteria:**
- Appeals are queued for review by senior moderators/administrators
- Appeal statuses: Pending, UnderReview, Approved, Rejected
- Appeals include original action details and user's appeal reason
- Reviewers can approve (reverse action) or reject (uphold action)
- Reviewers must provide notes (min 20, max 2000 characters)
- Appeal reviews are timestamped and logged

---

**REQ-MOD-015** [Phase 5]
**Requirement:** The system SHALL notify users of appeal outcomes.

**Acceptance Criteria:**
- Users are notified when their appeal is reviewed
- Notifications include decision (approved/rejected) and reviewer notes
- Approved appeals restore content and adjust trust score (+5 points)
- Rejected appeals do not adjust trust score
- Users are informed of final decision with no further appeals allowed

---

### 2.6 Moderation Reports and Analytics

**REQ-MOD-016** [Phase 5]
**Requirement:** The system SHALL provide moderation analytics and reporting.

**Acceptance Criteria:**
- Track total flags by time period
- Track action counts by type
- Track moderator activity and performance
- Track average review time
- Track appeal rates and outcomes
- Track AI moderation accuracy
- Reports are exportable to CSV

---

**REQ-MOD-017** [Phase 5]
**Requirement:** The system SHALL maintain audit logs for all moderation activities.

**Acceptance Criteria:**
- All flags, actions, appeals, and reviews are logged
- Logs include user ID, moderator ID, timestamps, and full details
- Logs are immutable and cannot be deleted
- Logs are retained for minimum 7 years
- Logs are accessible to administrators only

---

## 3. Technical Requirements

### 3.1 Domain Model

**REQ-MOD-018** [Phase 5]
**Requirement:** The system SHALL implement a ContentFlag aggregate root.

**Acceptance Criteria:**
- ContentFlag entity includes: ContentFlagId, ContentType, ContentId, FlaggedByUserId, FlagReason, Description, FlaggedAt, IsAIFlag, AIConfidenceScore, AICategories
- ContentFlag is the aggregate root
- Aggregate uses ICoursesPlatformContext directly (no repository pattern)
- Entity ID property named ContentFlagId

---

**REQ-MOD-019** [Phase 5]
**Requirement:** The system SHALL implement a ModerationQueue entity.

**Acceptance Criteria:**
- ModerationQueue entity includes: ModerationQueueId, ContentType, ContentId, Status, Priority, AssignedModeratorId, CreatedAt, UpdatedAt, ResolvedAt
- Links to associated ContentFlag records
- Tracks all status transitions
- Entity ID property named ModerationQueueId

---

**REQ-MOD-020** [Phase 5]
**Requirement:** The system SHALL implement a ModerationAction entity.

**Acceptance Criteria:**
- ModerationAction entity includes: ModerationActionId, ContentType, ContentId, ActionType, ModeratorId, ActionedAt, ModeratorNotes
- Immutable once created
- Links to ModerationQueue and ContentFlag
- Entity ID property named ModerationActionId

---

**REQ-MOD-021** [Phase 5]
**Requirement:** The system SHALL implement a TrustScore value object.

**Acceptance Criteria:**
- TrustScore contains Score (0-100), LastUpdated, ChangeHistory
- Value object semantics (immutable, equality by value)
- Located in ContentFlagAggregate folder
- Includes validation logic for score range

---

**REQ-MOD-022** [Phase 5]
**Requirement:** The system SHALL implement an Appeal entity.

**Acceptance Criteria:**
- Appeal entity includes: AppealId, ModerationActionId, AppealedByUserId, Reason, Status, ReviewedByUserId, ReviewerNotes, AppealedAt, ReviewedAt
- Links to ModerationAction
- Tracks status transitions
- Entity ID property named AppealId

---

### 3.2 CQRS Commands and Queries

**REQ-MOD-023** [Phase 5]
**Requirement:** The system SHALL implement MediatR commands for content flagging.

**Acceptance Criteria:**
- FlagContentCommand with validation
- Commands located in CoursesPlatform.Api/Features/ContentModeration folder
- Commands use ICoursesPlatformContext directly
- Commands return appropriate DTOs via ToDto extension methods

---

**REQ-MOD-024** [Phase 5]
**Requirement:** The system SHALL implement MediatR queries for moderation queue.

**Acceptance Criteria:**
- GetModerationQueueQuery with filtering parameters
- GetQueueItemDetailsQuery
- Queries use ICoursesPlatformContext directly
- Queries return DTOs via ToDto extension methods
- Efficient database queries with appropriate includes

---

**REQ-MOD-025** [Phase 5]
**Requirement:** The system SHALL implement MediatR commands for moderation actions.

**Acceptance Criteria:**
- TakeModerationActionCommand with action type validation
- ClaimQueueItemCommand
- ReassignQueueItemCommand
- Commands enforce moderator permissions
- Commands update trust scores appropriately

---

**REQ-MOD-026** [Phase 5]
**Requirement:** The system SHALL implement MediatR commands for appeals.

**Acceptance Criteria:**
- CreateAppealCommand with validation
- ReviewAppealCommand
- Commands enforce appeal eligibility rules
- Commands notify affected users

---

### 3.3 Data Access

**REQ-MOD-027** [Phase 5]
**Requirement:** The system SHALL use ICoursesPlatformContext directly for all data operations.

**Acceptance Criteria:**
- NO repository pattern implemented
- All handlers inject ICoursesPlatformContext
- DbSet properties for ContentFlag, ModerationQueue, ModerationAction, Appeal, TrustScore
- Entity configurations in Infrastructure project
- Migrations created for all entities

---

**REQ-MOD-028** [Phase 5]
**Requirement:** The system SHALL implement efficient database queries.

**Acceptance Criteria:**
- Use async/await for all database operations
- Use appropriate Include/ThenInclude for related data
- Use pagination for queue and history queries
- Use indexes on frequently queried columns (ContentId, Status, Priority, CreatedAt)
- Use composite indexes for common filter combinations

---

### 3.4 Services

**REQ-MOD-029** [Phase 5]
**Requirement:** The system SHALL implement an AI moderation service.

**Acceptance Criteria:**
- IAIModerationService interface in Core project
- Service analyzes text content for policy violations
- Returns confidence scores and violation categories
- Located in CoursesPlatform.Core/Services (preferred) or Infrastructure/Services if external dependencies required
- Implements retry logic for service failures
- Logs all AI moderation requests and results

---

**REQ-MOD-030** [Phase 5]
**Requirement:** The system SHALL implement a trust score calculation service.

**Acceptance Criteria:**
- ITrustScoreService interface in Core project
- Service calculates score adjustments based on events
- Service enforces score boundaries (0-100)
- Service tracks score history
- Located in CoursesPlatform.Core/Services

---

**REQ-MOD-031** [Phase 5]
**Requirement:** The system SHALL implement a notification service for moderation events.

**Acceptance Criteria:**
- IModerationNotificationService interface in Core project
- Service sends notifications for actions, warnings, bans, appeals
- Service formats messages appropriately
- Integrates with existing notification system
- Located in CoursesPlatform.Core/Services

---

### 3.5 API Endpoints

**REQ-MOD-032** [Phase 5]
**Requirement:** The system SHALL provide RESTful API endpoints for content flagging.

**Acceptance Criteria:**
- POST /api/moderation/flags - Flag content
- GET /api/moderation/flags - Get flags for content (moderator only)
- Endpoints in ModerationController
- Proper authorization and role checks
- Returns DTOs created via ToDto extension methods

---

**REQ-MOD-033** [Phase 5]
**Requirement:** The system SHALL provide RESTful API endpoints for moderation queue.

**Acceptance Criteria:**
- GET /api/moderation/queue - Get queue items with filtering
- GET /api/moderation/queue/{id} - Get queue item details
- POST /api/moderation/queue/{id}/claim - Claim queue item
- POST /api/moderation/queue/{id}/reassign - Reassign queue item
- Moderator role required
- Proper error handling and validation

---

**REQ-MOD-034** [Phase 5]
**Requirement:** The system SHALL provide RESTful API endpoints for moderation actions.

**Acceptance Criteria:**
- POST /api/moderation/actions - Take moderation action
- GET /api/moderation/actions/history - Get action history
- GET /api/moderation/content/{contentType}/{contentId}/actions - Get actions for specific content
- Moderator role required for actions
- Admin role required for full history
- Validates action parameters

---

**REQ-MOD-035** [Phase 5]
**Requirement:** The system SHALL provide RESTful API endpoints for appeals.

**Acceptance Criteria:**
- POST /api/moderation/appeals - Create appeal
- GET /api/moderation/appeals - Get user's appeals
- GET /api/moderation/appeals/queue - Get appeals queue (moderator only)
- POST /api/moderation/appeals/{id}/review - Review appeal (moderator only)
- Proper authorization checks
- Validates appeal eligibility

---

**REQ-MOD-036** [Phase 5]
**Requirement:** The system SHALL provide RESTful API endpoints for trust scores.

**Acceptance Criteria:**
- GET /api/moderation/users/{userId}/trust-score - Get user trust score
- GET /api/moderation/users/{userId}/trust-score/history - Get trust score history
- Users can view own trust score
- Moderators can view all trust scores
- Returns score, restrictions, and history

---

### 3.6 Validation and Business Rules

**REQ-MOD-037** [Phase 5]
**Requirement:** The system SHALL validate all moderation commands.

**Acceptance Criteria:**
- FluentValidation used for all command validation
- Validation checks required fields, string lengths, value ranges
- Validation checks business rules (e.g., flag rate limits, appeal eligibility)
- Validation errors return 400 Bad Request with detailed messages
- Validation failures logged at Warning level

---

**REQ-MOD-038** [Phase 5]
**Requirement:** The system SHALL enforce role-based authorization.

**Acceptance Criteria:**
- Moderator role required for queue access and moderation actions
- Administrator role required for appeals review and audit logs
- Users can only appeal their own content
- Users can only view their own trust scores
- Authorization failures return 403 Forbidden and are logged

---

### 3.7 Logging

**REQ-MOD-039** [Phase 5]
**Requirement:** The system SHALL implement comprehensive structured logging.

**Acceptance Criteria:**
- Information level: Flag submissions, queue claims, actions taken
- Warning level: Rate limit violations, validation failures, false flags
- Error level: AI service failures, database errors, notification failures
- Critical level: System failures, data corruption
- All logs enriched with CorrelationId, UserId, ContentId, ModerationQueueId
- Sensitive content not logged
- Serilog used for structured logging

---

**REQ-MOD-040** [Phase 5]
**Requirement:** The system SHALL log all moderation activities for audit purposes.

**Acceptance Criteria:**
- Every flag, action, appeal logged with full context
- Logs include timestamps, user IDs, moderator IDs, action details
- Logs stored in centralized logging system
- Logs queryable for audit and compliance
- Logs retained per REQ-MOD-017

---

### 3.8 Performance

**REQ-MOD-041** [Phase 5]
**Requirement:** The system SHALL meet performance requirements for moderation operations.

**Acceptance Criteria:**
- Flag submission completes within 500ms
- Queue retrieval with filters completes within 1 second
- Moderation action completes within 1 second
- AI moderation completes within 3 seconds
- Appeal submission completes within 500ms
- Trust score calculation completes within 200ms

---

**REQ-MOD-042** [Phase 5]
**Requirement:** The system SHALL handle high volumes of moderation activity.

**Acceptance Criteria:**
- Support 1000 concurrent flag submissions
- Support 100 concurrent moderators
- Queue pagination prevents performance degradation
- Database indexes optimize query performance
- AI service calls are async and don't block

---

## 4. Data Model

### 4.1 Entities and Aggregates

**ContentFlagAggregate** (CoursesPlatform.Core/Model/ContentFlagAggregate/)
- ContentFlag (aggregate root)
- TrustScore (value object)
- ModerationQueue (entity)
- ModerationAction (entity)
- Appeal (entity)

### 4.2 Enums

**FlagReason** (CoursesPlatform.Core/Model/ContentFlagAggregate/Enums/)
- Spam
- Offensive
- Inappropriate
- Copyright
- HateSpeech
- Violence
- AdultContent
- Other

**ModerationActionType** (CoursesPlatform.Core/Model/ContentFlagAggregate/Enums/)
- Approve
- Remove
- Hide
- Warn
- Ban

**QueueStatus** (CoursesPlatform.Core/Model/ContentFlagAggregate/Enums/)
- Pending
- UnderReview
- Resolved

**QueuePriority** (CoursesPlatform.Core/Model/ContentFlagAggregate/Enums/)
- Low
- Medium
- High
- Critical

**AppealStatus** (CoursesPlatform.Core/Model/ContentFlagAggregate/Enums/)
- Pending
- UnderReview
- Approved
- Rejected

**ContentType** (CoursesPlatform.Core/Model/ContentFlagAggregate/Enums/)
- Course
- Review
- QAPost
- Discussion
- DirectMessage
- Comment

---

## 5. Integration Requirements

**REQ-MOD-043** [Phase 5]
**Requirement:** The system SHALL integrate with the notification system.

**Acceptance Criteria:**
- Uses existing notification infrastructure
- Sends notifications for actions, warnings, bans, appeals
- Notifications support email and in-app delivery
- Notification failures logged but don't block moderation actions

---

**REQ-MOD-044** [Phase 5]
**Requirement:** The system SHALL integrate with AI moderation service.

**Acceptance Criteria:**
- Azure Content Safety API or equivalent service
- Service configured via appsettings
- Graceful degradation if AI service unavailable
- AI results cached for 24 hours to avoid duplicate analysis

---

**REQ-MOD-045** [Phase 5]
**Requirement:** The system SHALL integrate with identity and access management.

**Acceptance Criteria:**
- Uses existing authentication/authorization infrastructure
- Supports Moderator and Administrator roles
- Trust score restrictions enforced via authorization policies
- Role checks integrated into all moderation endpoints

---

## 6. File Organization

Following the implementation specs:

```
CoursesPlatform.Core/
  Model/
    ContentFlagAggregate/
      ContentFlag.cs (aggregate root)
      ModerationQueue.cs
      ModerationAction.cs
      Appeal.cs
      TrustScore.cs (value object)
      Enums/
        FlagReason.cs
        ModerationActionType.cs
        QueueStatus.cs
        QueuePriority.cs
        AppealStatus.cs
        ContentType.cs
  Services/
    IAIModerationService.cs
    ITrustScoreService.cs
    IModerationNotificationService.cs

CoursesPlatform.Infrastructure/
  Configurations/
    ContentFlagConfiguration.cs
    ModerationQueueConfiguration.cs
    ModerationActionConfiguration.cs
    AppealConfiguration.cs
    TrustScoreConfiguration.cs
  Services/
    AIModerationService.cs (if has external dependencies)

CoursesPlatform.Api/
  Features/
    ContentModeration/
      Commands/
        FlagContentCommand.cs
        FlagContentCommandHandler.cs
        TakeModerationActionCommand.cs
        TakeModerationActionCommandHandler.cs
        ClaimQueueItemCommand.cs
        ClaimQueueItemCommandHandler.cs
        ReassignQueueItemCommand.cs
        ReassignQueueItemCommandHandler.cs
        CreateAppealCommand.cs
        CreateAppealCommandHandler.cs
        ReviewAppealCommand.cs
        ReviewAppealCommandHandler.cs
      Queries/
        GetModerationQueueQuery.cs
        GetModerationQueueQueryHandler.cs
        GetQueueItemDetailsQuery.cs
        GetQueueItemDetailsQueryHandler.cs
        GetUserTrustScoreQuery.cs
        GetUserTrustScoreQueryHandler.cs
        GetAppealQueueQuery.cs
        GetAppealQueueQueryHandler.cs
      DTOs/
        ContentFlagDto.cs
        ModerationQueueDto.cs
        ModerationActionDto.cs
        AppealDto.cs
        TrustScoreDto.cs
      Extensions/
        ContentFlagExtensions.cs (ToDto methods)
        ModerationQueueExtensions.cs
        ModerationActionExtensions.cs
        AppealExtensions.cs
        TrustScoreExtensions.cs
  Controllers/
    ModerationController.cs
```

---

## 7. Non-Functional Requirements

**REQ-MOD-046** [Phase 5]
**Requirement:** The system SHALL maintain data integrity for moderation records.

**Acceptance Criteria:**
- All moderation actions are transactional
- Failed transactions are rolled back completely
- Foreign key constraints enforced
- Cascade deletes configured appropriately
- Concurrency conflicts detected and handled

---

**REQ-MOD-047** [Phase 5]
**Requirement:** The system SHALL be secure and protect sensitive moderation data.

**Acceptance Criteria:**
- Moderator notes not exposed to regular users
- Flag details protected by authorization
- Audit logs accessible only to administrators
- SQL injection prevention via parameterized queries
- XSS prevention via output encoding

---

**REQ-MOD-048** [Phase 5]
**Requirement:** The system SHALL be maintainable and testable.

**Acceptance Criteria:**
- Unit tests for all commands and queries
- Integration tests for database operations
- Mock AI service for testing
- Clear separation of concerns
- Simple, readable code per REQ-SYS-012

---

## 8. Success Metrics

- Average moderation queue resolution time < 4 hours
- False positive rate < 5%
- AI moderation accuracy > 85%
- Appeal approval rate 10-20%
- User trust score changes correlate with behavior
- Zero data integrity violations
- 99.9% uptime for moderation features

---

**End of Content Moderation Backend Specification**
