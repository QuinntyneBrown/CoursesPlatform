# API and Webhooks Feature - Backend Specification

**Document Version:** 1.0
**Date:** 2025-12-25
**Status:** Draft
**Phase:** 5 (Enterprise Features)

---

## 1. Overview

### 1.1 Purpose
This document specifies the backend requirements for the API and Webhooks feature of the CoursesPlatform system. This enterprise-level feature enables external developers to integrate with CoursesPlatform through a RESTful public API and receive real-time notifications via webhooks.

### 1.2 Scope
This specification covers:
- API key management and authentication
- Rate limiting and quota management
- Webhook subscription management
- Webhook delivery infrastructure
- API versioning support
- API usage tracking and analytics
- Developer portal backend services

### 1.3 Dependencies
- Identity and Access Management feature
- Course Management feature
- Enrollment and Access feature
- Notifications infrastructure

---

## 2. API Key Management

### 2.1 API Key Generation

**REQ-API-001** [Phase 5]: The system SHALL provide a command to generate API keys for authenticated organizations.

**Acceptance Criteria:**
- Command accepts OrganizationId, KeyName, and optional Scopes
- System generates a unique API key using cryptographically secure random generation
- API key is hashed before storage using SHA256
- Plain-text API key is returned only once during generation
- API key metadata (KeyId, Name, Created date, Scopes) is stored
- Command uses ICoursesPlatformContext directly for persistence
- Command is implemented as MediatR IRequest in CoursesPlatform.Api/Features/ApiManagement

**REQ-API-002** [Phase 5]: The system SHALL validate API key generation requests.

**Acceptance Criteria:**
- OrganizationId must exist and be active
- KeyName must be unique within the organization
- KeyName must be 3-50 characters
- Scopes must be valid scope values from predefined list
- User must have "ManageApiKeys" permission for the organization
- Validation failures return appropriate error messages

**REQ-API-003** [Phase 5]: The system SHALL store API key metadata in the ApiKey aggregate.

**Acceptance Criteria:**
- ApiKeyId (Guid) as primary key
- OrganizationId (foreign key)
- KeyName (string)
- KeyHash (string) - SHA256 hash of the key
- Scopes (string array) - comma-separated or JSON
- CreatedAt (DateTime)
- ExpiresAt (DateTime?) - optional expiration
- IsActive (bool)
- LastUsedAt (DateTime?)
- UsageCount (long)
- RateLimitPolicyId (Guid?) - optional rate limit override

### 2.2 API Key Authentication

**REQ-API-004** [Phase 5]: The system SHALL authenticate API requests using API keys.

**Acceptance Criteria:**
- API key provided in Authorization header as "ApiKey {key}"
- System hashes incoming key and compares with stored hash
- Authentication validates key is active and not expired
- Authentication loads associated scopes and rate limit policy
- Failed authentication returns 401 Unauthorized
- Authentication service is implemented in CoursesPlatform.Core/Services
- Service uses ICoursesPlatformContext to query ApiKeys DbSet

**REQ-API-005** [Phase 5]: The system SHALL update API key usage statistics on successful authentication.

**Acceptance Criteria:**
- LastUsedAt timestamp updated to current UTC time
- UsageCount incremented by 1
- Update performed asynchronously to avoid blocking request
- Uses ICoursesPlatformContext.SaveChangesAsync()

**REQ-API-006** [Phase 5]: The system SHALL validate API key scopes for requested operations.

**Acceptance Criteria:**
- Each API endpoint defines required scopes
- Middleware validates API key has all required scopes
- Missing scopes return 403 Forbidden with scope details
- Wildcard scope "*" grants access to all endpoints

### 2.3 API Key Management Operations

**REQ-API-007** [Phase 5]: The system SHALL provide a command to revoke API keys.

**Acceptance Criteria:**
- Command accepts ApiKeyId and OrganizationId
- Sets IsActive to false
- Records RevokedAt timestamp
- Command uses ICoursesPlatformContext directly
- Only organization members with "ManageApiKeys" permission can revoke
- Revoked keys fail authentication immediately

**REQ-API-008** [Phase 5]: The system SHALL provide a query to list API keys for an organization.

**Acceptance Criteria:**
- Query accepts OrganizationId and pagination parameters
- Returns list of API key metadata (excludes key hash)
- Supports filtering by IsActive status
- Orders by CreatedAt descending
- Query implemented as MediatR IRequest in CoursesPlatform.Api/Features/ApiManagement
- Uses ICoursesPlatformContext to query ApiKeys DbSet

**REQ-API-009** [Phase 5]: The system SHALL provide a query to get API key usage statistics.

**Acceptance Criteria:**
- Query accepts ApiKeyId and date range
- Returns usage count, last used date, request volume over time
- Aggregates data from ApiUsage entity
- Query uses ICoursesPlatformContext to query ApiUsage DbSet

---

## 3. Rate Limiting

### 3.1 Rate Limit Policies

**REQ-API-010** [Phase 5]: The system SHALL support configurable rate limit policies.

**Acceptance Criteria:**
- RateLimitPolicy value object defined in CoursesPlatform.Core/Model/ApiKeyAggregate
- Contains RequestsPerMinute, RequestsPerHour, RequestsPerDay limits
- Contains BurstLimit for short-term spikes
- Supports tier-based policies (Free, Basic, Premium, Enterprise)
- Default policy applied if no specific policy assigned

**REQ-API-011** [Phase 5]: The system SHALL enforce rate limits on API requests.

**Acceptance Criteria:**
- Rate limiting middleware intercepts all public API requests
- Uses sliding window algorithm for accurate rate limiting
- Stores rate limit counters in distributed cache (Redis)
- Returns 429 Too Many Requests when limit exceeded
- Includes Retry-After header in 429 response
- Rate limiting service implemented in CoursesPlatform.Core/Services

**REQ-API-012** [Phase 5]: The system SHALL track API usage per key for rate limiting.

**Acceptance Criteria:**
- ApiUsage entity stores usage records per API key
- Includes ApiUsageId, ApiKeyId, Timestamp, Endpoint, ResponseStatus, ResponseTime
- Records created asynchronously to avoid blocking requests
- Old usage records archived/deleted after retention period (90 days)
- Uses ICoursesPlatformContext.ApiUsage DbSet for persistence

### 3.2 Rate Limit Administration

**REQ-API-013** [Phase 5]: The system SHALL allow administrators to configure rate limit policies.

**Acceptance Criteria:**
- Command to create/update rate limit policies
- Command accepts tier name and limit values
- Validates limit values are positive integers
- Command uses ICoursesPlatformContext directly
- Only system administrators can manage policies

**REQ-API-014** [Phase 5]: The system SHALL allow assigning custom rate limits to specific API keys.

**Acceptance Criteria:**
- Command accepts ApiKeyId and RateLimitPolicyId
- Updates ApiKey.RateLimitPolicyId
- Custom policy overrides default tier policy
- Organization administrators can assign within their tier limits
- Uses ICoursesPlatformContext for persistence

---

## 4. Webhook Subscriptions

### 4.1 Webhook Subscription Management

**REQ-API-015** [Phase 5]: The system SHALL provide a command to create webhook subscriptions.

**Acceptance Criteria:**
- Command accepts OrganizationId, EventType, CallbackUrl, Secret
- Creates WebhookSubscription entity
- Validates CallbackUrl is valid HTTPS URL
- Generates unique Secret if not provided
- Supports subscription to multiple event types
- Command implemented as MediatR IRequest in CoursesPlatform.Api/Features/WebhookManagement
- Uses ICoursesPlatformContext.WebhookSubscriptions DbSet

**REQ-API-016** [Phase 5]: The system SHALL validate webhook subscription requests.

**Acceptance Criteria:**
- EventType must be from predefined list of webhook events
- CallbackUrl must be HTTPS (except localhost for development)
- Secret must be 32-256 characters if provided
- Organization must have active subscription plan supporting webhooks
- Validates maximum subscriptions per organization (based on tier)

**REQ-API-017** [Phase 5]: The system SHALL store webhook subscriptions in WebhookSubscription entity.

**Acceptance Criteria:**
- WebhookSubscriptionId (Guid) as primary key
- OrganizationId (foreign key)
- EventType (string) - event to subscribe to
- CallbackUrl (string) - HTTPS endpoint to call
- Secret (string) - used for HMAC signature
- IsActive (bool)
- CreatedAt (DateTime)
- UpdatedAt (DateTime)
- FailureCount (int) - consecutive delivery failures
- LastFailureAt (DateTime?)
- DeactivatedAt (DateTime?) - when auto-deactivated due to failures

### 4.2 Webhook Event Types

**REQ-API-018** [Phase 5]: The system SHALL support the following webhook event types.

**Acceptance Criteria:**
- course.created - New course published
- course.updated - Course content updated
- course.deleted - Course removed
- enrollment.created - Student enrolled in course
- enrollment.completed - Student completed course
- order.created - New order placed
- order.completed - Order payment completed
- order.refunded - Order refunded
- certificate.issued - Certificate generated for student
- review.created - New course review posted

**REQ-API-019** [Phase 5]: The system SHALL provide a query to list webhook subscriptions.

**Acceptance Criteria:**
- Query accepts OrganizationId and pagination parameters
- Returns list of active subscriptions
- Supports filtering by EventType and IsActive
- Query uses ICoursesPlatformContext.WebhookSubscriptions DbSet

**REQ-API-020** [Phase 5]: The system SHALL provide a command to update webhook subscriptions.

**Acceptance Criteria:**
- Command accepts WebhookSubscriptionId, new CallbackUrl, new Secret
- Validates new URL and Secret
- Resets FailureCount to 0 on update
- Command uses ICoursesPlatformContext directly

**REQ-API-021** [Phase 5]: The system SHALL provide a command to delete webhook subscriptions.

**Acceptance Criteria:**
- Command accepts WebhookSubscriptionId and OrganizationId
- Soft deletes by setting IsActive to false
- Records DeactivatedAt timestamp
- Command uses ICoursesPlatformContext directly

---

## 5. Webhook Delivery

### 5.1 Webhook Event Publishing

**REQ-API-022** [Phase 5]: The system SHALL publish events to webhook subscribers when subscribed events occur.

**Acceptance Criteria:**
- Event handlers detect domain events matching webhook event types
- Service queries active subscriptions for event type using ICoursesPlatformContext
- Creates WebhookDelivery record for each subscription
- Queues delivery for background processing
- Publishing service implemented in CoursesPlatform.Core/Services

**REQ-API-023** [Phase 5]: The system SHALL create webhook delivery records in WebhookDelivery entity.

**Acceptance Criteria:**
- WebhookDeliveryId (Guid) as primary key
- WebhookSubscriptionId (foreign key)
- EventType (string)
- Payload (string) - JSON serialized event data
- Signature (string) - HMAC-SHA256 signature
- Status (enum) - Pending, Delivered, Failed, Abandoned
- AttemptCount (int)
- NextAttemptAt (DateTime)
- CreatedAt (DateTime)
- DeliveredAt (DateTime?)
- ResponseStatus (int?)
- ResponseBody (string?)

### 5.2 Webhook Delivery Processing

**REQ-API-024** [Phase 5]: The system SHALL deliver webhooks via background job processor.

**Acceptance Criteria:**
- Background service queries pending deliveries using ICoursesPlatformContext
- Sends HTTP POST to CallbackUrl with JSON payload
- Includes X-Webhook-Signature header with HMAC signature
- Includes X-Webhook-Event header with EventType
- Includes X-Webhook-Delivery-Id header with DeliveryId
- Delivery service implemented in CoursesPlatform.Infrastructure/Services (due to HTTP dependency)

**REQ-API-025** [Phase 5]: The system SHALL generate HMAC signatures for webhook payloads.

**Acceptance Criteria:**
- Uses HMAC-SHA256 algorithm
- Uses subscription Secret as key
- Signs complete JSON payload
- Signature included as hex string in X-Webhook-Signature header
- Signature generation service in CoursesPlatform.Core/Services

**REQ-API-026** [Phase 5]: The system SHALL implement retry logic for failed webhook deliveries.

**Acceptance Criteria:**
- Retries on network errors, timeouts, and 5xx responses
- Does not retry on 4xx responses (except 408, 429)
- Uses exponential backoff: 1min, 5min, 15min, 1hr, 6hr, 24hr
- Maximum 6 retry attempts
- Updates AttemptCount and NextAttemptAt after each attempt
- Sets Status to Abandoned after max retries
- Updates WebhookSubscription.FailureCount on consecutive failures

**REQ-API-027** [Phase 5]: The system SHALL auto-deactivate subscriptions after excessive failures.

**Acceptance Criteria:**
- Deactivates subscription after 10 consecutive failures
- Sets IsActive to false and records DeactivatedAt
- Sends notification email to organization administrators
- Stops delivery attempts for deactivated subscriptions
- Uses ICoursesPlatformContext to update subscription

**REQ-API-028** [Phase 5]: The system SHALL record webhook delivery results.

**Acceptance Criteria:**
- Updates Status to Delivered on 2xx response
- Updates Status to Failed on error
- Records ResponseStatus HTTP status code
- Records ResponseBody (truncated to 2000 chars)
- Records DeliveredAt on success
- Updates LastFailureAt on subscription for failures
- Uses ICoursesPlatformContext.SaveChangesAsync()

### 5.3 Webhook Delivery Monitoring

**REQ-API-029** [Phase 5]: The system SHALL provide a query to list webhook deliveries for a subscription.

**Acceptance Criteria:**
- Query accepts WebhookSubscriptionId and pagination
- Returns delivery history ordered by CreatedAt descending
- Supports filtering by Status
- Includes response status and attempt count
- Query uses ICoursesPlatformContext.WebhookDeliveries DbSet

**REQ-API-030** [Phase 5]: The system SHALL provide a command to manually retry failed webhook deliveries.

**Acceptance Criteria:**
- Command accepts WebhookDeliveryId
- Validates delivery is in Failed or Abandoned status
- Resets Status to Pending
- Sets NextAttemptAt to immediate
- Resets AttemptCount to 0
- Command uses ICoursesPlatformContext directly

---

## 6. API Versioning

### 6.1 Version Management

**REQ-API-031** [Phase 5]: The system SHALL support API versioning using URL path versioning.

**Acceptance Criteria:**
- Public API endpoints include version in path: /api/v1/courses
- Version format is /v{major}
- Current version is v1
- Versioning configured in ASP.NET Core API versioning middleware

**REQ-API-032** [Phase 5]: The system SHALL maintain backward compatibility within major versions.

**Acceptance Criteria:**
- Breaking changes require new major version
- Additive changes allowed in same major version
- Deprecated endpoints marked with [Obsolete] attribute
- Deprecated endpoints include deprecation notice in response headers

**REQ-API-033** [Phase 5]: The system SHALL provide API version discovery endpoint.

**Acceptance Criteria:**
- GET /api/versions returns list of supported versions
- Response includes version number, status (current, deprecated, sunset)
- Includes sunset date for deprecated versions
- Endpoint is unauthenticated

---

## 7. Public API Endpoints

### 7.1 Course API

**REQ-API-034** [Phase 5]: The system SHALL provide public API endpoints for course discovery.

**Acceptance Criteria:**
- GET /api/v1/courses - list published courses with pagination
- GET /api/v1/courses/{id} - get course details
- GET /api/v1/courses/{id}/curriculum - get course curriculum
- Endpoints require API key authentication
- Requires "courses:read" scope
- Returns CourseDto with public course information
- Commands/Queries in CoursesPlatform.Api/Features/PublicApi/Courses
- Uses ICoursesPlatformContext to query Courses DbSet

**REQ-API-035** [Phase 5]: The system SHALL provide public API endpoints for course search.

**Acceptance Criteria:**
- GET /api/v1/courses/search?q={query}&category={category}&level={level}
- Supports full-text search on title and description
- Supports filtering by category, level, price range
- Returns paginated results
- Requires "courses:read" scope
- Uses ICoursesPlatformContext with EF Core LINQ queries

### 7.2 Enrollment API

**REQ-API-036** [Phase 5]: The system SHALL provide public API endpoints for enrollment management.

**Acceptance Criteria:**
- POST /api/v1/enrollments - create enrollment
- GET /api/v1/enrollments - list enrollments
- GET /api/v1/enrollments/{id} - get enrollment details
- Requires "enrollments:write" and "enrollments:read" scopes respectively
- Scoped to organization's users only
- Commands/Queries in CoursesPlatform.Api/Features/PublicApi/Enrollments
- Uses ICoursesPlatformContext for enrollment operations

**REQ-API-037** [Phase 5]: The system SHALL provide public API endpoints for enrollment progress.

**Acceptance Criteria:**
- GET /api/v1/enrollments/{id}/progress - get progress details
- PUT /api/v1/enrollments/{id}/progress - update progress
- Requires "enrollments:read" and "enrollments:write" scopes
- Returns progress percentage, completed lessons, quiz scores
- Uses ICoursesPlatformContext to update progress

### 7.3 User API

**REQ-API-038** [Phase 5]: The system SHALL provide public API endpoints for user management.

**Acceptance Criteria:**
- POST /api/v1/users - create user (SSO integration)
- GET /api/v1/users/{id} - get user details
- PUT /api/v1/users/{id} - update user
- Requires "users:write" and "users:read" scopes
- Scoped to organization's users only
- Uses ICoursesPlatformContext.Users DbSet

---

## 8. Developer Portal Backend Services

### 8.1 API Documentation

**REQ-API-039** [Phase 5]: The system SHALL provide OpenAPI/Swagger documentation for public API.

**Acceptance Criteria:**
- Swagger UI available at /api/docs
- OpenAPI 3.0 specification generated from API controllers
- Includes authentication scheme documentation
- Includes request/response examples
- Documents all public API endpoints

**REQ-API-040** [Phase 5]: The system SHALL provide API reference documentation endpoint.

**Acceptance Criteria:**
- GET /api/v1/docs/reference returns API documentation
- Includes endpoint descriptions, parameters, examples
- Includes webhook event schemas
- Documentation stored as structured data in database
- Query uses ICoursesPlatformContext if documentation stored in DB

### 8.2 Analytics and Reporting

**REQ-API-041** [Phase 5]: The system SHALL provide analytics queries for API usage.

**Acceptance Criteria:**
- Query accepts OrganizationId and date range
- Returns total requests, success rate, average response time
- Groups by endpoint and date
- Aggregates from ApiUsage entity
- Query uses ICoursesPlatformContext.ApiUsage DbSet

**REQ-API-042** [Phase 5]: The system SHALL provide analytics queries for webhook delivery statistics.

**Acceptance Criteria:**
- Query accepts OrganizationId and date range
- Returns total deliveries, success rate, failure reasons
- Groups by event type and subscription
- Aggregates from WebhookDelivery entity
- Query uses ICoursesPlatformContext.WebhookDeliveries DbSet

---

## 9. Logging and Monitoring

### 9.1 Structured Logging

**REQ-API-043** [Phase 5]: The system SHALL implement structured logging for all API and webhook operations using Serilog.

**Acceptance Criteria:**
- Information level logs for successful API requests and webhook deliveries
- Warning level logs for rate limit violations and authentication failures
- Error level logs for webhook delivery failures with complete error details
- Critical level logs for system failures affecting API availability
- Logs enriched with CorrelationId, ApiKeyId, OrganizationId, Endpoint
- Sensitive data (API keys, secrets) excluded from logs

**REQ-API-044** [Phase 5]: The system SHALL log API request and response details for troubleshooting.

**Acceptance Criteria:**
- Logs include HTTP method, endpoint, query parameters, response status
- Logs include request duration in milliseconds
- Request/response bodies logged only for errors (truncated)
- Logs include user agent and client IP (hashed for privacy)

**REQ-API-045** [Phase 5]: The system SHALL log webhook delivery attempts and results.

**Acceptance Criteria:**
- Logs include WebhookDeliveryId, SubscriptionId, EventType, AttemptCount
- Logs include HTTP response status and delivery duration
- Logs include failure reason for failed deliveries
- Logs include next retry time for failed deliveries

---

## 10. Security Requirements

### 10.1 API Security

**REQ-API-046** [Phase 5]: The system SHALL enforce HTTPS for all public API endpoints.

**Acceptance Criteria:**
- HTTP requests redirected to HTTPS
- HSTS header included in responses
- Localhost HTTP allowed for development only

**REQ-API-047** [Phase 5]: The system SHALL validate and sanitize all API inputs.

**Acceptance Criteria:**
- All inputs validated using FluentValidation
- String inputs trimmed and length-validated
- Numeric inputs range-validated
- Enum inputs validated against allowed values
- SQL injection prevention via EF Core parameterized queries

**REQ-API-048** [Phase 5]: The system SHALL protect against common API attacks.

**Acceptance Criteria:**
- Rate limiting prevents brute force attacks
- CORS policy restricts origins
- Request size limits prevent DoS
- Input validation prevents injection attacks
- API keys stored as hashes, never plain text

### 10.2 Webhook Security

**REQ-API-049** [Phase 5]: The system SHALL enforce HTTPS for webhook callback URLs.

**Acceptance Criteria:**
- Subscription validation rejects HTTP URLs (except localhost)
- Webhook delivery only to HTTPS endpoints
- SSL certificate validation enforced

**REQ-API-050** [Phase 5]: The system SHALL provide HMAC signature verification for webhook consumers.

**Acceptance Criteria:**
- Documentation includes signature verification examples
- Test endpoint allows signature verification testing
- Signature algorithm documented (HMAC-SHA256)
- Secret rotation support for security

---

## 11. Performance Requirements

**REQ-API-051** [Phase 5]: Public API endpoints SHALL respond within 500ms for 95th percentile.

**Acceptance Criteria:**
- Database queries optimized with appropriate indexes
- Pagination enforced for list endpoints
- Response caching for read-heavy endpoints
- Performance monitoring tracks response times

**REQ-API-052** [Phase 5]: Webhook delivery SHALL not block API request processing.

**Acceptance Criteria:**
- Webhook deliveries queued for background processing
- Delivery processing separate from API request pipeline
- Delivery failures do not impact API availability

**REQ-API-053** [Phase 5]: Rate limiting SHALL be performant and accurate.

**Acceptance Criteria:**
- Rate limit checks complete within 50ms
- Uses distributed cache (Redis) for counters
- Sliding window algorithm for accuracy

---

## 12. Data Retention

**REQ-API-054** [Phase 5]: The system SHALL retain API usage data for 90 days.

**Acceptance Criteria:**
- Background job archives usage older than 90 days
- Archived data moved to cold storage or deleted
- Retention policy configurable per organization tier

**REQ-API-055** [Phase 5]: The system SHALL retain webhook delivery records for 30 days.

**Acceptance Criteria:**
- Delivery records older than 30 days deleted
- Failed deliveries retained longer for debugging
- Retention policy configurable

---

## 13. Database Schema

### 13.1 Entity Configurations

**REQ-API-056** [Phase 5]: The system SHALL define EF Core entity configurations for all API and webhook entities.

**Acceptance Criteria:**
- Configurations in CoursesPlatform.Infrastructure/EntityConfigurations
- ApiKeyConfiguration, WebhookSubscriptionConfiguration, WebhookDeliveryConfiguration, ApiUsageConfiguration
- Proper indexes on foreign keys and frequently queried fields
- Unique constraints on ApiKey.KeyHash
- String length constraints match validation rules

**REQ-API-057** [Phase 5]: The system SHALL create database migrations for API and webhook tables.

**Acceptance Criteria:**
- Migrations in CoursesPlatform.Infrastructure/Migrations
- Migration includes all entity tables and relationships
- Indexes created for performance
- Default data seeded for rate limit policies

---

## 14. Testing Requirements

**REQ-API-058** [Phase 5]: The system SHALL have unit tests for all commands and queries.

**Acceptance Criteria:**
- Tests cover validation logic
- Tests cover business rules
- Tests use in-memory database for ICoursesPlatformContext
- Test coverage > 80%

**REQ-API-059** [Phase 5]: The system SHALL have integration tests for public API endpoints.

**Acceptance Criteria:**
- Tests verify authentication and authorization
- Tests verify rate limiting
- Tests verify response formats
- Tests use test database

**REQ-API-060** [Phase 5]: The system SHALL have integration tests for webhook delivery.

**Acceptance Criteria:**
- Tests verify webhook signature generation
- Tests verify retry logic
- Tests verify deactivation on failures
- Tests use mock HTTP client for webhook calls

---

**End of Backend Specification**
