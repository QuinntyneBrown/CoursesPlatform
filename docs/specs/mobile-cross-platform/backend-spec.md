# Mobile Cross-Platform Backend Specification

**Feature:** Mobile Cross-Platform Support
**Phase:** 5 (Enterprise Feature)
**Status:** Draft
**Version:** 1.0
**Date:** 2025-12-25

---

## 1. Overview

This specification defines the backend requirements for mobile cross-platform support in the CoursesPlatform system, enabling Progressive Web App (PWA) functionality, native mobile app support, offline content access, and cross-device synchronization.

### 1.1 Key Capabilities
- Device registration and management
- Offline content download and synchronization
- Push notification delivery
- Progressive Web App (PWA) support
- Cross-device state synchronization
- Download queue management
- Mobile-optimized API endpoints

---

## 2. Device Management Requirements

### REQ-MOB-001: Device Registration
**Phase:** 5
**Priority:** High

The system SHALL provide an API endpoint to register mobile devices and PWA installations.

**Acceptance Criteria:**
- POST /api/devices/register endpoint accepts device information (platform, model, OS version, device token)
- Device registration creates a DeviceRegistration aggregate with unique DeviceId
- System generates and returns a device-specific authentication token
- Registration includes user binding (UserId from authenticated context)
- Device fingerprinting prevents duplicate registrations
- Maximum 10 devices per user account
- Structured logging at Information level for successful registrations
- Structured logging at Warning level for duplicate registration attempts

**Implementation:**
- Command: `RegisterDeviceCommand` in `CoursesPlatform.Api/Features/MobileDevice`
- Handler: Uses `ICoursesPlatformContext` directly (NO repository pattern)
- Service: Device validation logic in `CoursesPlatform.Core/Services/IDeviceManagementService`
- Aggregate: `DeviceRegistration` in `CoursesPlatform.Core/Model/DeviceRegistrationAggregate`

---

### REQ-MOB-002: Device Information Update
**Phase:** 5
**Priority:** Medium

The system SHALL allow devices to update their registration information.

**Acceptance Criteria:**
- PUT /api/devices/{deviceId} endpoint updates device information
- Updates include OS version, app version, device token, last active timestamp
- Unauthorized devices cannot update other devices
- Device updates trigger synchronization of pending content
- Returns updated device information
- Structured logging at Information level for successful updates

**Implementation:**
- Command: `UpdateDeviceCommand` in `CoursesPlatform.Api/Features/MobileDevice`
- Handler: Uses `ICoursesPlatformContext` to update DeviceRegistration entity
- Validation: Device ownership verification using authenticated UserId

---

### REQ-MOB-003: Device Deactivation
**Phase:** 5
**Priority:** High

The system SHALL provide capability to deactivate/unregister devices.

**Acceptance Criteria:**
- DELETE /api/devices/{deviceId} endpoint deactivates device
- Deactivation sets IsActive flag to false (soft delete)
- Removes device from push notification targets
- Clears device-specific cached data
- User can deactivate their own devices
- Admin can deactivate any device
- Returns confirmation of deactivation
- Structured logging at Information level for deactivations

**Implementation:**
- Command: `DeactivateDeviceCommand` in `CoursesPlatform.Api/Features/MobileDevice`
- Handler: Uses `ICoursesPlatformContext` to update DeviceRegistration.IsActive
- Service: Push notification cleanup in `CoursesPlatform.Core/Services/IPushNotificationService`

---

### REQ-MOB-004: List User Devices
**Phase:** 5
**Priority:** Medium

The system SHALL provide an endpoint to list all devices registered to a user.

**Acceptance Criteria:**
- GET /api/devices endpoint returns list of user's registered devices
- Response includes device platform, model, OS version, registration date, last active date
- Results sorted by last active date (descending)
- Inactive devices clearly marked
- Pagination support (page size: 20)
- Filtering by platform and active status

**Implementation:**
- Query: `GetUserDevicesQuery` in `CoursesPlatform.Api/Features/MobileDevice`
- Handler: Uses `ICoursesPlatformContext.DeviceRegistrations` DbSet directly
- DTO: `DeviceDto` with ToDto extension method in Api layer

---

## 3. Offline Content Management Requirements

### REQ-MOB-005: Download Content Endpoint
**Phase:** 5
**Priority:** High

The system SHALL provide API endpoints to download course content for offline access.

**Acceptance Criteria:**
- POST /api/offline/content/download endpoint accepts list of content IDs (lessons, videos, resources)
- Creates OfflineContent entities for requested items
- Validates user has access to requested content (enrollment check)
- Returns download URLs with expiration tokens (24-hour validity)
- Supports partial downloads and resume capability
- Tracks download status (Pending, InProgress, Completed, Failed)
- Maximum 50 items per download request
- Structured logging at Information level for download requests
- Structured logging at Error level for access violations

**Implementation:**
- Command: `DownloadContentCommand` in `CoursesPlatform.Api/Features/OfflineContent`
- Handler: Uses `ICoursesPlatformContext` for enrollment validation and OfflineContent creation
- Service: URL generation in `CoursesPlatform.Core/Services/IContentDeliveryService`
- Entity: `OfflineContent` in `CoursesPlatform.Core/Model/OfflineContentAggregate`

---

### REQ-MOB-006: Download Queue Management
**Phase:** 5
**Priority:** High

The system SHALL manage a download queue for offline content.

**Acceptance Criteria:**
- POST /api/offline/queue endpoint adds items to download queue
- Queue prioritization based on content type (videos lower priority than text)
- Maximum queue size of 100 items per device
- GET /api/offline/queue/{deviceId} returns current queue status
- Queue items include estimated size, priority, status, progress percentage
- DELETE /api/offline/queue/{itemId} removes item from queue
- Automatic queue cleanup for items older than 7 days
- Structured logging at Information level for queue operations

**Implementation:**
- Commands: `AddToDownloadQueueCommand`, `RemoveFromDownloadQueueCommand` in `CoursesPlatform.Api/Features/OfflineContent`
- Query: `GetDownloadQueueQuery` in `CoursesPlatform.Api/Features/OfflineContent`
- Entity: `DownloadQueue` in `CoursesPlatform.Core/Model/OfflineContentAggregate`
- Handler: Uses `ICoursesPlatformContext.DownloadQueues` DbSet directly

---

### REQ-MOB-007: Offline Content Synchronization
**Phase:** 5
**Priority:** High

The system SHALL synchronize offline content with latest versions.

**Acceptance Criteria:**
- GET /api/offline/sync endpoint returns content updates since last sync timestamp
- Response includes modified content items, deleted items, new items
- Sync respects device storage constraints (header: X-Available-Storage)
- Incremental sync support (delta updates only)
- Content versioning prevents stale data
- Returns list of content IDs requiring re-download
- Sync token mechanism for efficient polling
- Structured logging at Information level for sync operations

**Implementation:**
- Query: `SyncOfflineContentQuery` in `CoursesPlatform.Api/Features/OfflineContent`
- Handler: Uses `ICoursesPlatformContext` to query OfflineContent and compare versions
- Service: Version comparison logic in `CoursesPlatform.Core/Services/IContentSyncService`

---

### REQ-MOB-008: Offline Content Metadata
**Phase:** 5
**Priority:** Medium

The system SHALL provide metadata for offline content planning.

**Acceptance Criteria:**
- GET /api/offline/content/{contentId}/metadata returns file size, type, dependencies
- Metadata includes estimated download time on different connection speeds
- Lists prerequisite content (e.g., video requires player assets)
- Indicates if content is already downloaded by device
- Returns content expiration date (if applicable)
- Content hash for integrity verification

**Implementation:**
- Query: `GetOfflineContentMetadataQuery` in `CoursesPlatform.Api/Features/OfflineContent`
- Handler: Uses `ICoursesPlatformContext` to retrieve content and device download history
- DTO: `OfflineContentMetadataDto` with comprehensive metadata fields

---

## 4. Progress Synchronization Requirements

### REQ-MOB-009: Progress Sync Upload
**Phase:** 5
**Priority:** High

The system SHALL accept progress updates from offline mobile devices.

**Acceptance Criteria:**
- POST /api/sync/progress endpoint accepts batch progress updates
- Supports offline-first: accepts progress with future timestamps (queued updates)
- Batch size maximum 100 progress events
- Each event includes: LessonId, ProgressPercentage, LastPosition, CompletedAt, DeviceId
- Conflict resolution: server timestamp wins for same lesson
- Progress validation: percentage 0-100, valid lesson IDs
- Idempotent updates using client-generated UUID
- Returns sync confirmation with server timestamps
- Structured logging at Information level for successful syncs
- Structured logging at Warning level for conflicts

**Implementation:**
- Command: `SyncProgressCommand` in `CoursesPlatform.Api/Features/ProgressSync`
- Handler: Uses `ICoursesPlatformContext` to update LearningProgress entities
- Service: Conflict resolution in `CoursesPlatform.Core/Services/IProgressSyncService`
- Value Object: `SyncState` in `CoursesPlatform.Core/Model/ProgressSyncAggregate`

---

### REQ-MOB-010: Progress Sync Download
**Phase:** 5
**Priority:** High

The system SHALL provide latest progress state for mobile devices.

**Acceptance Criteria:**
- GET /api/sync/progress endpoint returns progress for enrolled courses
- Filtering by course, date range, sync status
- Response includes all progress updates since last device sync
- Includes completion status, certificates earned, quiz results
- Pagination support (page size: 50)
- Efficient query using last sync timestamp
- Returns sync token for next request

**Implementation:**
- Query: `GetProgressSyncQuery` in `CoursesPlatform.Api/Features/ProgressSync`
- Handler: Uses `ICoursesPlatformContext.LearningProgress` DbSet with timestamp filtering
- DTO: `ProgressSyncDto` with ToDto extension method

---

### REQ-MOB-011: Sync Conflict Resolution
**Phase:** 5
**Priority:** Medium

The system SHALL resolve synchronization conflicts intelligently.

**Acceptance Criteria:**
- Server-side conflict detection for same lesson progress from multiple devices
- Resolution strategy: most recent timestamp wins
- Alternative strategy: highest progress percentage wins (configurable)
- Conflict log maintained for audit (ConflictLog table)
- User notification for resolved conflicts
- Manual conflict resolution interface for admins
- Structured logging at Warning level for all conflicts

**Implementation:**
- Service: `CoursesPlatform.Core/Services/IConflictResolutionService`
- Entity: `ConflictLog` in `CoursesPlatform.Core/Model/ProgressSyncAggregate`
- Uses `ICoursesPlatformContext.ConflictLogs` for persistence

---

## 5. Push Notification Requirements

### REQ-MOB-012: Push Notification Registration
**Phase:** 5
**Priority:** High

The system SHALL register devices for push notifications.

**Acceptance Criteria:**
- POST /api/notifications/register endpoint accepts device push token
- Supports FCM (Firebase Cloud Messaging) tokens for Android
- Supports APNs (Apple Push Notification service) tokens for iOS
- Token validation before registration
- Associates push token with DeviceId
- Updates existing token if device already registered
- Token refresh mechanism for expired tokens
- Structured logging at Information level for registrations

**Implementation:**
- Command: `RegisterPushTokenCommand` in `CoursesPlatform.Api/Features/PushNotification`
- Handler: Uses `ICoursesPlatformContext` to update DeviceRegistration.PushToken
- Service: Token validation in `CoursesPlatform.Infrastructure/Services/PushNotificationService`

---

### REQ-MOB-013: Send Push Notification
**Phase:** 5
**Priority:** High

The system SHALL send push notifications to registered devices.

**Acceptance Criteria:**
- POST /api/notifications/send endpoint sends notification to specific users/devices
- Notification payload includes: title, body, data, badge count, sound
- Platform-specific formatting (FCM vs APNs)
- Delivery status tracking (Sent, Delivered, Failed, Opened)
- Retry mechanism for failed deliveries (3 attempts)
- Notification preferences respected (user opt-out)
- Deep linking support (open specific course/lesson)
- Scheduled notifications support
- Batch sending (up to 1000 devices per request)
- Structured logging at Information level for sends
- Structured logging at Error level for failures

**Implementation:**
- Command: `SendPushNotificationCommand` in `CoursesPlatform.Api/Features/PushNotification`
- Service: `CoursesPlatform.Infrastructure/Services/PushNotificationService` (infrastructure dependency)
- Entity: `PushNotificationLog` for tracking in `CoursesPlatform.Core/Model/NotificationAggregate`
- External: Integration with FCM and APNs APIs

---

### REQ-MOB-014: Notification Preferences
**Phase:** 5
**Priority:** Medium

The system SHALL allow users to manage notification preferences per device.

**Acceptance Criteria:**
- GET /api/notifications/preferences/{deviceId} returns current preferences
- PUT /api/notifications/preferences/{deviceId} updates preferences
- Preferences include: enabled/disabled, notification types, quiet hours, frequency
- Notification types: course updates, new content, messages, achievements, reminders
- Quiet hours configuration (start time, end time, timezone)
- Frequency limits (maximum per day, per week)
- Immediate effect on notification delivery
- Default preferences on device registration

**Implementation:**
- Commands: `UpdateNotificationPreferencesCommand` in `CoursesPlatform.Api/Features/PushNotification`
- Query: `GetNotificationPreferencesQuery` in `CoursesPlatform.Api/Features/PushNotification`
- Entity: `NotificationPreferences` in `CoursesPlatform.Core/Model/DeviceRegistrationAggregate`

---

### REQ-MOB-015: Notification History
**Phase:** 5
**Priority:** Low

The system SHALL maintain notification delivery history.

**Acceptance Criteria:**
- GET /api/notifications/history endpoint returns notification history
- Filtering by device, date range, notification type, status
- History includes: sent timestamp, delivered timestamp, opened timestamp, content
- Pagination support (page size: 50)
- Retention period: 90 days
- Read/unread status tracking
- Mark as read capability
- Structured logging for history queries

**Implementation:**
- Query: `GetNotificationHistoryQuery` in `CoursesPlatform.Api/Features/PushNotification`
- Handler: Uses `ICoursesPlatformContext.PushNotificationLogs` DbSet
- Automatic cleanup job for records older than 90 days

---

## 6. Mobile API Optimization Requirements

### REQ-MOB-016: Mobile-Optimized Endpoints
**Phase:** 5
**Priority:** Medium

The system SHALL provide mobile-optimized versions of core API endpoints.

**Acceptance Criteria:**
- Endpoints prefixed with /api/mobile/* for mobile-specific optimization
- Reduced payload size (exclude unnecessary fields)
- Image URLs include size parameters (?width=400&quality=80)
- Aggregated data endpoints to reduce round trips
- Compressed responses (gzip/brotli)
- Conditional requests support (ETag, If-None-Match)
- Pagination with cursor-based navigation
- Response time < 500ms for mobile endpoints

**Implementation:**
- Controllers in `CoursesPlatform.Api/Controllers/Mobile` folder
- DTOs: Lightweight versions in `CoursesPlatform.Api/Features/Mobile/Dtos`
- Middleware: Response compression in pipeline
- Service: Image optimization in `CoursesPlatform.Infrastructure/Services/ImageOptimizationService`

---

### REQ-MOB-017: Bandwidth-Aware Content Delivery
**Phase:** 5
**Priority:** Medium

The system SHALL adapt content delivery based on network conditions.

**Acceptance Criteria:**
- Request header X-Network-Quality (high/medium/low) influences response
- Low quality: text-only responses, thumbnail images only
- Medium quality: reduced image quality, summary videos
- High quality: full quality media
- Adaptive bitrate URLs for video streaming
- Progressive image loading support
- Resume support for interrupted downloads
- Range request support (HTTP 206)

**Implementation:**
- Middleware: Network quality detection in `CoursesPlatform.Api/Middleware`
- Service: Content adaptation in `CoursesPlatform.Core/Services/IContentAdaptationService`
- CDN integration for adaptive streaming

---

## 7. Data Model Requirements

### REQ-MOB-018: DeviceRegistration Aggregate
**Phase:** 5
**Priority:** High

The system SHALL implement DeviceRegistration as an aggregate root.

**Acceptance Criteria:**
- Properties: DeviceId (PK), UserId (FK), Platform, Model, OSVersion, AppVersion, DeviceToken, PushToken, IsActive, RegisteredAt, LastActiveAt
- Platform enum: iOS, Android, Web (PWA)
- DeviceId is GUID generated on server
- Unique constraint on DeviceToken per user
- IsActive default true
- LastActiveAt updated on each API call
- Audit fields: CreatedAt, ModifiedAt

**Implementation:**
- Location: `CoursesPlatform.Core/Model/DeviceRegistrationAggregate/DeviceRegistration.cs`
- Context: Added to `ICoursesPlatformContext.DeviceRegistrations` DbSet
- Configuration: `CoursesPlatform.Infrastructure/EntityConfigurations/DeviceRegistrationConfiguration.cs`

---

### REQ-MOB-019: OfflineContent Entity
**Phase:** 5
**Priority:** High

The system SHALL implement OfflineContent entity for tracking downloaded content.

**Acceptance Criteria:**
- Properties: OfflineContentId (PK), DeviceId (FK), ContentType, ContentId, DownloadedAt, ExpiresAt, FileSize, Version, Hash, Status
- ContentType enum: Video, Document, Quiz, Resource
- Status enum: Pending, Downloading, Downloaded, Expired, Deleted
- Composite unique index on (DeviceId, ContentType, ContentId)
- ExpiresAt nullable (some content never expires)
- Version for content update tracking
- Hash for integrity verification (SHA256)

**Implementation:**
- Location: `CoursesPlatform.Core/Model/OfflineContentAggregate/OfflineContent.cs`
- Context: Added to `ICoursesPlatformContext.OfflineContents` DbSet
- Configuration: Entity configuration with indexes

---

### REQ-MOB-020: DownloadQueue Entity
**Phase:** 5
**Priority:** High

The system SHALL implement DownloadQueue entity for managing download queues.

**Acceptance Criteria:**
- Properties: DownloadQueueId (PK), DeviceId (FK), ContentType, ContentId, Priority, Status, Progress, EstimatedSize, AddedAt, StartedAt, CompletedAt
- Priority int (1-10, higher = more important)
- Status enum: Queued, InProgress, Completed, Failed, Cancelled
- Progress percentage (0-100)
- EstimatedSize in bytes
- Automatic ordering by Priority (desc), AddedAt (asc)
- Cascade delete when device deactivated

**Implementation:**
- Location: `CoursesPlatform.Core/Model/OfflineContentAggregate/DownloadQueue.cs`
- Context: Added to `ICoursesPlatformContext.DownloadQueues` DbSet

---

### REQ-MOB-021: SyncState Value Object
**Phase:** 5
**Priority:** Medium

The system SHALL implement SyncState as a value object.

**Acceptance Criteria:**
- Properties: LastSyncTimestamp, SyncToken, ConflictStatus, PendingChanges
- Immutable value object
- SyncToken is GUID for tracking sync sessions
- ConflictStatus enum: None, Detected, Resolved
- PendingChanges int count
- Equality based on all properties
- Used within progress tracking

**Implementation:**
- Location: `CoursesPlatform.Core/Model/ProgressSyncAggregate/SyncState.cs`
- Pattern: Value object (no identity, immutable)
- EF Core: Owned entity type configuration

---

## 8. Security Requirements

### REQ-MOB-022: Device Authentication
**Phase:** 5
**Priority:** Critical

The system SHALL implement secure device authentication.

**Acceptance Criteria:**
- Device-specific JWT tokens with DeviceId claim
- Token expiration: 30 days (refresh required)
- Token revocation on device deactivation
- Device fingerprint validation on each request
- Rate limiting per device (100 requests/minute)
- Suspicious device activity detection
- Automatic deactivation after 90 days inactivity
- Structured logging at Warning level for suspicious activity
- Structured logging at Critical level for security violations

**Implementation:**
- Service: `CoursesPlatform.Core/Services/IDeviceAuthenticationService`
- Middleware: Device validation in `CoursesPlatform.Api/Middleware/DeviceAuthenticationMiddleware`
- Uses `ICoursesPlatformContext` for device lookup

---

### REQ-MOB-023: Content Access Control
**Phase:** 5
**Priority:** Critical

The system SHALL enforce access control for offline content.

**Acceptance Criteria:**
- Enrollment validation before allowing downloads
- License expiration check for time-limited content
- DRM integration for protected videos
- Temporary download URLs with signed tokens
- IP address validation for download requests
- Geographic restrictions enforcement
- Access logging for compliance
- Structured logging at Error level for access violations

**Implementation:**
- Service: `CoursesPlatform.Core/Services/IContentAccessControlService`
- Validation in download command handlers
- Integration with licensing system

---

## 9. Performance Requirements

### REQ-MOB-024: API Response Time
**Phase:** 5
**Priority:** High

The system SHALL meet mobile API performance targets.

**Acceptance Criteria:**
- Mobile endpoints respond within 500ms (95th percentile)
- Download queue queries < 200ms
- Progress sync batch processing < 1 second for 100 items
- Device registration < 300ms
- Notification send < 2 seconds (including external API calls)
- Database query optimization for mobile endpoints
- Caching for frequently accessed data (Redis)
- Performance monitoring and alerting

**Implementation:**
- Caching: `CoursesPlatform.Infrastructure/Services/RedisCacheService`
- Monitoring: Application Insights integration
- Optimization: Indexed queries, async operations

---

### REQ-MOB-025: Scalability
**Phase:** 5
**Priority:** High

The system SHALL scale to support mobile user load.

**Acceptance Criteria:**
- Support 10,000 concurrent mobile users
- Handle 1,000 notification sends per second
- Process 5,000 progress sync events per minute
- Database connection pooling
- Asynchronous processing for heavy operations
- Message queue for notification delivery (Azure Service Bus)
- CDN for content delivery
- Load balancing across API instances

**Implementation:**
- Queue: Azure Service Bus integration for notifications
- CDN: Azure CDN or CloudFlare for content
- Background jobs: Hangfire for scheduled tasks

---

## 10. Testing Requirements

### REQ-MOB-026: Mobile API Testing
**Phase:** 5
**Priority:** High

The system SHALL include comprehensive tests for mobile features.

**Acceptance Criteria:**
- Unit tests for all command/query handlers
- Integration tests for mobile endpoints
- Device registration flow tests
- Offline sync scenario tests
- Push notification delivery tests (mocked)
- Performance tests for batch operations
- Security tests for authentication
- Test coverage > 80%

**Implementation:**
- Unit tests: xUnit in test projects
- Integration tests: WebApplicationFactory for API testing
- Mocking: Moq for external services

---

## 11. Monitoring and Logging

### REQ-MOB-027: Mobile-Specific Logging
**Phase:** 5
**Priority:** High

The system SHALL implement comprehensive logging for mobile features.

**Acceptance Criteria:**
- Structured logging with Serilog
- Log enrichment: DeviceId, Platform, AppVersion, UserId
- Information level: successful operations, API calls
- Warning level: conflicts, quota limits, validation failures
- Error level: exceptions, external service failures, download failures
- Critical level: security violations, system failures
- Log correlation IDs for request tracing
- Azure Log Analytics integration
- Sensitive data exclusion (device tokens, user data)

**Implementation:**
- Configuration in `Program.cs` with Serilog sinks
- Enrichers for mobile context
- Log filtering and sampling

---

### REQ-MOB-028: Mobile Analytics
**Phase:** 5
**Priority:** Medium

The system SHALL track mobile usage analytics.

**Acceptance Criteria:**
- Device registration metrics (daily/weekly)
- Offline content download metrics (top content, failure rates)
- Push notification metrics (delivery rate, open rate)
- Sync operation metrics (frequency, conflict rate)
- Platform distribution (iOS/Android/Web)
- App version distribution
- Network quality distribution
- Dashboard for mobile analytics

**Implementation:**
- Telemetry: Application Insights custom events
- Dashboard: Azure Portal or custom reporting
- Metrics aggregation service

---

## 12. Migration and Deployment

### REQ-MOB-029: Database Migrations
**Phase:** 5
**Priority:** High

The system SHALL include database migrations for mobile features.

**Acceptance Criteria:**
- EF Core migrations for all new entities
- Indexes for performance optimization
- Foreign key constraints
- Default data seeding (if applicable)
- Migration scripts tested on development environment
- Rollback scripts prepared
- Migration applied via deployment pipeline

**Implementation:**
- Migrations in `CoursesPlatform.Infrastructure/Migrations`
- Naming convention: {Timestamp}_AddMobileTables
- Applied in `Program.cs` startup

---

### REQ-MOB-030: Feature Flags
**Phase:** 5
**Priority:** Medium

The system SHALL use feature flags for mobile functionality.

**Acceptance Criteria:**
- Feature flag: MobileApiEnabled (default: true)
- Feature flag: OfflineSyncEnabled (default: true)
- Feature flag: PushNotificationsEnabled (default: true)
- Runtime toggle without deployment
- Per-environment configuration
- Graceful degradation when features disabled
- Feature flag status endpoint

**Implementation:**
- Configuration in appsettings.json
- Service: `CoursesPlatform.Core/Services/IFeatureFlagService`
- Azure App Configuration integration (optional)

---

## 13. Documentation Requirements

### REQ-MOB-031: API Documentation
**Phase:** 5
**Priority:** Medium

The system SHALL provide comprehensive mobile API documentation.

**Acceptance Criteria:**
- Swagger/OpenAPI documentation for all mobile endpoints
- Request/response examples
- Authentication requirements documented
- Rate limiting documented
- Error codes and messages documented
- Versioning strategy documented
- Postman collection for testing

**Implementation:**
- Swashbuckle configuration in API project
- XML comments on controllers and DTOs
- API versioning with Microsoft.AspNetCore.Mvc.Versioning

---

## 14. Compliance and Data Privacy

### REQ-MOB-032: Data Privacy for Mobile
**Phase:** 5
**Priority:** Critical

The system SHALL comply with data privacy regulations for mobile data.

**Acceptance Criteria:**
- GDPR compliance: user consent for device tracking
- Right to deletion: remove all device data on user request
- Data minimization: collect only necessary device information
- Encryption at rest for sensitive device data
- Encryption in transit (HTTPS only)
- Privacy policy disclosure for mobile data collection
- Data retention policy: device data deleted after 1 year of inactivity
- Audit logging for data access

**Implementation:**
- Consent management integration
- Data deletion commands
- Encryption configuration in database
- Audit logging with Serilog

---

## 15. Error Handling

### REQ-MOB-033: Mobile Error Responses
**Phase:** 5
**Priority:** High

The system SHALL provide mobile-friendly error responses.

**Acceptance Criteria:**
- Consistent error response format (ProblemDetails)
- Mobile-specific error codes (MOB-*)
- User-friendly error messages
- Retry-able errors clearly indicated
- Offline-capable error responses
- Network connectivity errors distinguished
- Rate limit errors with retry-after header
- Validation errors with field-level details

**Implementation:**
- Global exception handler in API middleware
- Error response models
- HTTP status codes: 400 (validation), 401 (auth), 403 (access), 429 (rate limit), 500 (server error)

---

## Appendix A: Technology Stack

### Backend Technologies
- **Framework:** .NET 8
- **ORM:** Entity Framework Core
- **Messaging:** MediatR (CQRS)
- **Database:** SQL Server Express
- **Logging:** Serilog with Azure Log Analytics sink
- **Push Notifications:** Firebase Cloud Messaging (FCM), Apple Push Notification service (APNs)
- **Caching:** Redis (optional)
- **Queue:** Azure Service Bus (optional for notifications)
- **CDN:** Azure CDN or CloudFlare

### External Services
- Firebase Cloud Messaging (Android)
- Apple Push Notification service (iOS)
- Azure CDN (content delivery)
- Azure Log Analytics (logging)
- Application Insights (monitoring)

---

## Appendix B: Implementation Checklist

- [ ] Create DeviceRegistration aggregate in Core
- [ ] Create OfflineContent entity in Core
- [ ] Create DownloadQueue entity in Core
- [ ] Create SyncState value object in Core
- [ ] Implement IDeviceManagementService in Core/Services
- [ ] Implement IPushNotificationService in Infrastructure/Services
- [ ] Implement IContentSyncService in Core/Services
- [ ] Create MobileDevice feature folder in Api/Features
- [ ] Create OfflineContent feature folder in Api/Features
- [ ] Create PushNotification feature folder in Api/Features
- [ ] Create ProgressSync feature folder in Api/Features
- [ ] Create Mobile controllers in Api/Controllers
- [ ] Add ICoursesPlatformContext DbSets for new entities
- [ ] Create EF Core entity configurations
- [ ] Generate database migrations
- [ ] Implement device authentication middleware
- [ ] Add Swagger documentation
- [ ] Implement structured logging
- [ ] Create unit tests
- [ ] Create integration tests
- [ ] Configure CI/CD pipeline

---

**End of Mobile Cross-Platform Backend Specification**
