# Referral Program - Backend Specification

**Document Version:** 1.0
**Date:** 2025-12-25
**Status:** Final
**Phase:** 5 - Enterprise Features

---

## 1. Introduction

### 1.1 Purpose
This document specifies the backend requirements for the Referral Program feature in the CoursesPlatform system. The referral program enables users to share referral codes, track referrals, earn rewards, and allows administrators to manage referral campaigns and analytics.

### 1.2 Scope
This specification covers the backend implementation for referral code generation, referral tracking, reward distribution, referral campaigns, and referral analytics.

### 1.3 Phase Classification
**Phase 5 - Enterprise Features**: The referral program is an enterprise-level feature designed to drive user acquisition and engagement through incentivized sharing.

---

## 2. Referral Code Management

### 2.1 Referral Code Generation

**REQ-REF-001**: [Phase 5] The system SHALL provide a command to generate a unique referral code for a user.

**Acceptance Criteria:**
- Command handler SHALL use `ICoursesPlatformContext` directly to access user data
- Referral code SHALL be alphanumeric, 8-12 characters in length
- Referral code SHALL be unique across all users
- System SHALL check for code uniqueness before saving
- System SHALL associate the referral code with the requesting user
- System SHALL log referral code generation at Information level
- System SHALL return the generated referral code in the response DTO

**REQ-REF-002**: [Phase 5] The system SHALL validate that a user can only have one active referral code at a time.

**Acceptance Criteria:**
- Query handler SHALL check for existing active referral codes for the user
- If an active code exists, system SHALL return the existing code
- System SHALL NOT create duplicate codes for the same user
- System SHALL log validation failures at Warning level

**REQ-REF-003**: [Phase 5] The system SHALL provide a query to retrieve a user's referral code.

**Acceptance Criteria:**
- Query handler SHALL use `ICoursesPlatformContext` to fetch the user's referral code
- System SHALL return null if no referral code exists
- System SHALL include code metadata (creation date, usage count, status)
- System SHALL log query execution at Information level

### 2.2 Referral Code Validation

**REQ-REF-004**: [Phase 5] The system SHALL provide a query to validate a referral code.

**Acceptance Criteria:**
- Query handler SHALL check if the referral code exists in the database
- System SHALL verify the code is active and not expired
- System SHALL verify the code belongs to a valid user account
- System SHALL return validation result with referrer information
- System SHALL log validation attempts at Information level
- System SHALL log invalid code attempts at Warning level

**REQ-REF-005**: [Phase 5] The system SHALL prevent users from applying their own referral code.

**Acceptance Criteria:**
- Validation logic SHALL compare referrer ID with applicant ID
- System SHALL return validation error if IDs match
- System SHALL log self-referral attempts at Warning level with user context

---

## 3. Referral Tracking

### 3.1 Referral Application

**REQ-REF-006**: [Phase 5] The system SHALL provide a command to apply a referral code during user registration.

**Acceptance Criteria:**
- Command handler SHALL use `ICoursesPlatformContext` to create referral tracking record
- System SHALL validate the referral code before application
- System SHALL create a Referral entity linking referrer and referee
- System SHALL record the application timestamp
- System SHALL update the referral code usage count
- System SHALL log successful referral application at Information level with CorrelationId
- System SHALL handle concurrent applications with appropriate locking

**REQ-REF-007**: [Phase 5] The system SHALL track the referral status through multiple stages.

**Acceptance Criteria:**
- Referral entity SHALL include status enum (Pending, Active, Completed, Expired, Cancelled)
- System SHALL initialize new referrals with Pending status
- System SHALL transition status based on business rules
- System SHALL record status change timestamps
- System SHALL log status transitions at Information level

**REQ-REF-008**: [Phase 5] The system SHALL prevent duplicate referral applications for the same user.

**Acceptance Criteria:**
- System SHALL check if user already has an applied referral
- System SHALL return validation error if referral exists
- System SHALL log duplicate application attempts at Warning level

### 3.2 Referral Conversion Tracking

**REQ-REF-009**: [Phase 5] The system SHALL track referral conversion events.

**Acceptance Criteria:**
- System SHALL provide a command to mark referral as converted
- Conversion event SHALL be triggered when referee completes qualifying action (e.g., first purchase)
- System SHALL update referral status to Completed
- System SHALL record conversion timestamp
- System SHALL log conversion events at Information level with referee and referrer context
- System SHALL enrich logs with ConversionId and relevant identifiers

**REQ-REF-010**: [Phase 5] The system SHALL calculate referral conversion metrics.

**Acceptance Criteria:**
- System SHALL provide query to retrieve conversion rates
- Calculation SHALL include total referrals vs. completed referrals
- System SHALL support filtering by date range
- System SHALL support filtering by campaign
- System SHALL log metric calculations at Information level

---

## 4. Reward Distribution

### 4.1 Reward Calculation

**REQ-REF-011**: [Phase 5] The system SHALL calculate rewards for successful referrals.

**Acceptance Criteria:**
- System SHALL provide a service in `CoursesPlatform.Core\Services` for reward calculation
- Service SHALL use `ICoursesPlatformContext` to access campaign rules
- Calculation SHALL support multiple reward types (percentage discount, fixed amount, course credits)
- System SHALL apply campaign-specific reward rules
- System SHALL validate reward eligibility before calculation
- System SHALL log reward calculations at Information level with amount and type

**REQ-REF-012**: [Phase 5] The system SHALL support tiered reward structures.

**Acceptance Criteria:**
- System SHALL support different reward amounts based on referral count
- Reward rules SHALL be configurable per campaign
- System SHALL calculate cumulative rewards correctly
- System SHALL prevent duplicate reward calculations
- System SHALL log tier progression at Information level

### 4.2 Reward Distribution

**REQ-REF-013**: [Phase 5] The system SHALL provide a command to distribute rewards to referrers.

**Acceptance Criteria:**
- Command handler SHALL create ReferralReward entity
- System SHALL record reward amount, type, and status
- System SHALL associate reward with referral and referrer
- System SHALL update reward distribution timestamp
- System SHALL log reward distribution at Information level with referrer context
- System SHALL handle distribution failures with appropriate error logging at Error level

**REQ-REF-014**: [Phase 5] The system SHALL provide a command to distribute rewards to referees.

**Acceptance Criteria:**
- Command handler SHALL create ReferralReward entity for referee
- System SHALL support welcome bonuses for new users
- System SHALL apply campaign-specific referee rewards
- System SHALL log referee reward distribution at Information level
- System SHALL enrich logs with RefereeId and RewardId

**REQ-REF-015**: [Phase 5] The system SHALL track reward redemption status.

**Acceptance Criteria:**
- ReferralReward entity SHALL include status enum (Pending, Issued, Redeemed, Expired, Cancelled)
- System SHALL initialize rewards with Pending status
- System SHALL transition to Issued when reward is credited
- System SHALL transition to Redeemed when reward is used
- System SHALL log status transitions at Information level

### 4.3 Reward Validation

**REQ-REF-016**: [Phase 5] The system SHALL validate reward eligibility before distribution.

**Acceptance Criteria:**
- Validation SHALL verify referral is in Completed status
- System SHALL check for existing rewards for the same referral
- System SHALL verify campaign is still active
- System SHALL verify user account is in good standing
- System SHALL log validation failures at Warning level with detailed context

**REQ-REF-017**: [Phase 5] The system SHALL provide a query to retrieve user rewards.

**Acceptance Criteria:**
- Query handler SHALL use `ICoursesPlatformContext` to fetch user rewards
- System SHALL support filtering by status, type, and date range
- System SHALL include reward metadata (campaign, referral, amounts)
- System SHALL calculate total rewards earned
- System SHALL log query execution at Information level

---

## 5. Referral Campaigns

### 5.1 Campaign Management

**REQ-REF-018**: [Phase 5] The system SHALL provide a command to create referral campaigns.

**Acceptance Criteria:**
- Command handler SHALL create ReferralCampaign entity
- Campaign SHALL include name, description, start date, end date
- Campaign SHALL define reward rules for referrers and referees
- Campaign SHALL support targeting specific user segments
- System SHALL validate date ranges (end date after start date)
- System SHALL log campaign creation at Information level with CampaignId

**REQ-REF-019**: [Phase 5] The system SHALL provide a command to update referral campaigns.

**Acceptance Criteria:**
- Command handler SHALL update existing campaign properties
- System SHALL validate campaign exists
- System SHALL prevent modification of completed campaigns
- System SHALL maintain audit trail of changes
- System SHALL log campaign updates at Information level

**REQ-REF-020**: [Phase 5] The system SHALL provide a command to deactivate referral campaigns.

**Acceptance Criteria:**
- Command handler SHALL set campaign status to Inactive
- System SHALL prevent new referrals from joining inactive campaigns
- System SHALL honor existing referrals from the campaign
- System SHALL log campaign deactivation at Information level

### 5.2 Campaign Configuration

**REQ-REF-021**: [Phase 5] The system SHALL support configurable campaign rules.

**Acceptance Criteria:**
- Campaign rules SHALL include minimum conversion criteria
- Rules SHALL define reward amounts for referrers and referees
- Rules SHALL support multiple reward tiers
- Rules SHALL include maximum rewards per user limits
- System SHALL validate rule configuration during campaign creation
- System SHALL log rule validation failures at Warning level

**REQ-REF-022**: [Phase 5] The system SHALL provide a query to retrieve active campaigns.

**Acceptance Criteria:**
- Query handler SHALL filter campaigns by status and date range
- System SHALL return only campaigns within valid date ranges
- System SHALL include campaign statistics (total referrals, conversions)
- System SHALL log query execution at Information level

**REQ-REF-023**: [Phase 5] The system SHALL automatically expire campaigns after end date.

**Acceptance Criteria:**
- Background service SHALL check for expired campaigns daily
- System SHALL update campaign status to Expired
- System SHALL prevent new referral applications to expired campaigns
- System SHALL log campaign expiration at Information level with CampaignId

---

## 6. Referral Analytics

### 6.1 Referral Metrics

**REQ-REF-024**: [Phase 5] The system SHALL provide a query to retrieve referral performance metrics.

**Acceptance Criteria:**
- Query SHALL calculate total referrals, conversions, and conversion rate
- Metrics SHALL include time period filtering
- Metrics SHALL include campaign-level breakdowns
- System SHALL calculate average reward per referral
- System SHALL log metric queries at Information level
- Query SHALL use `ICoursesPlatformContext` for data access

**REQ-REF-025**: [Phase 5] The system SHALL track top referrers.

**Acceptance Criteria:**
- Query SHALL rank users by successful referral count
- System SHALL support pagination for large result sets
- System SHALL include referrer statistics (total referrals, conversions, rewards earned)
- System SHALL support filtering by time period and campaign
- System SHALL log top referrer queries at Information level

**REQ-REF-026**: [Phase 5] The system SHALL calculate referral program ROI metrics.

**Acceptance Criteria:**
- Metrics SHALL include total rewards distributed
- Metrics SHALL include revenue generated from referrals
- System SHALL calculate ROI percentage
- System SHALL support campaign-level ROI analysis
- System SHALL log ROI calculations at Information level

### 6.2 Campaign Analytics

**REQ-REF-027**: [Phase 5] The system SHALL provide campaign performance analytics.

**Acceptance Criteria:**
- Query SHALL retrieve campaign-specific metrics
- Analytics SHALL include participation rate, conversion rate, cost per acquisition
- System SHALL calculate average time to conversion
- System SHALL identify best-performing campaigns
- System SHALL log analytics queries at Information level

**REQ-REF-028**: [Phase 5] The system SHALL track referral source attribution.

**Acceptance Criteria:**
- System SHALL record referral source channels (email, social media, direct link)
- Analytics SHALL include source-level performance metrics
- System SHALL support source comparison analysis
- System SHALL log source tracking at Information level

---

## 7. Data Model Requirements

### 7.1 Aggregate Structure

**REQ-REF-029**: [Phase 5] The system SHALL implement a Referral aggregate in `CoursesPlatform.Core\Model\ReferralAggregate`.

**Acceptance Criteria:**
- Aggregate root SHALL be named Referral
- Aggregate folder SHALL contain all referral-related entities
- Folder structure SHALL follow: `CoursesPlatform.Core\Model\ReferralAggregate`
- Aggregate SHALL include Events subfolder for domain events
- Aggregate SHALL include Enums subfolder for status enumerations

### 7.2 Entity Definitions

**REQ-REF-030**: [Phase 5] The ReferralCode entity SHALL contain the following properties:

**Acceptance Criteria:**
- ReferralCodeId (Guid) - primary key
- UserId (Guid) - foreign key to user who owns the code
- Code (string) - unique referral code
- CreatedDate (DateTime) - code creation timestamp
- ExpiryDate (DateTime?) - optional expiration date
- IsActive (bool) - activation status
- UsageCount (int) - number of times code has been applied
- MaxUsageLimit (int?) - optional usage limit
- CampaignId (Guid?) - optional campaign association

**REQ-REF-031**: [Phase 5] The Referral entity SHALL contain the following properties:

**Acceptance Criteria:**
- ReferralId (Guid) - primary key
- ReferrerUserId (Guid) - user who shared the code
- RefereeUserId (Guid) - user who applied the code
- ReferralCodeId (Guid) - foreign key to referral code
- CampaignId (Guid?) - optional campaign association
- AppliedDate (DateTime) - when code was applied
- ConversionDate (DateTime?) - when referral converted
- Status (ReferralStatus enum) - current status
- StatusChangedDate (DateTime) - last status change
- ConversionValue (decimal?) - value of conversion if applicable

**REQ-REF-032**: [Phase 5] The ReferralReward entity SHALL contain the following properties:

**Acceptance Criteria:**
- ReferralRewardId (Guid) - primary key
- ReferralId (Guid) - foreign key to referral
- UserId (Guid) - reward recipient
- RewardType (RewardType enum) - type of reward
- RewardAmount (decimal) - reward value
- CurrencyCode (string?) - currency for monetary rewards
- Status (RewardStatus enum) - current status
- IssuedDate (DateTime) - when reward was issued
- RedeemedDate (DateTime?) - when reward was used
- ExpiryDate (DateTime?) - optional expiration date
- Description (string) - reward description

**REQ-REF-033**: [Phase 5] The ReferralCampaign entity SHALL contain the following properties:

**Acceptance Criteria:**
- ReferralCampaignId (Guid) - primary key
- Name (string) - campaign name
- Description (string) - campaign description
- StartDate (DateTime) - campaign start
- EndDate (DateTime) - campaign end
- IsActive (bool) - activation status
- ReferrerRewardType (RewardType enum) - reward type for referrers
- ReferrerRewardAmount (decimal) - reward amount for referrers
- RefereeRewardType (RewardType enum) - reward type for referees
- RefereeRewardAmount (decimal) - reward amount for referees
- MinimumConversionValue (decimal?) - minimum purchase for conversion
- MaxRewardsPerUser (int?) - limit on rewards per user
- TargetAudienceSegment (string?) - user segment targeting
- CreatedDate (DateTime) - campaign creation
- CreatedByUserId (Guid) - campaign creator

### 7.3 Enumerations

**REQ-REF-034**: [Phase 5] The system SHALL define a ReferralStatus enumeration.

**Acceptance Criteria:**
- Values: Pending, Active, Completed, Expired, Cancelled
- Enum SHALL be located in `CoursesPlatform.Core\Model\ReferralAggregate\Enums`

**REQ-REF-035**: [Phase 5] The system SHALL define a RewardType enumeration.

**Acceptance Criteria:**
- Values: PercentageDiscount, FixedAmount, CourseCredits, FreeCourse, PremiumAccess
- Enum SHALL be located in `CoursesPlatform.Core\Model\ReferralAggregate\Enums`

**REQ-REF-036**: [Phase 5] The system SHALL define a RewardStatus enumeration.

**Acceptance Criteria:**
- Values: Pending, Issued, Redeemed, Expired, Cancelled
- Enum SHALL be located in `CoursesPlatform.Core\Model\ReferralAggregate\Enums`

---

## 8. ICoursesPlatformContext Requirements

### 8.1 DbSet Properties

**REQ-REF-037**: [Phase 5] The ICoursesPlatformContext interface SHALL include DbSet properties for all referral entities.

**Acceptance Criteria:**
- DbSet&lt;ReferralCode&gt; ReferralCodes { get; set; }
- DbSet&lt;Referral&gt; Referrals { get; set; }
- DbSet&lt;ReferralReward&gt; ReferralRewards { get; set; }
- DbSet&lt;ReferralCampaign&gt; ReferralCampaigns { get; set; }
- Properties SHALL follow naming convention: plural of entity name

---

## 9. MediatR Commands and Queries

### 9.1 Command Organization

**REQ-REF-038**: [Phase 5] All referral commands SHALL be located in `CoursesPlatform.Api\Features\Referrals\Commands`.

**Acceptance Criteria:**
- Commands SHALL use MediatR IRequest interface
- Each command SHALL have a dedicated handler
- Handlers SHALL use `ICoursesPlatformContext` directly
- DTOs associated with commands SHALL be in the same folder

**REQ-REF-039**: [Phase 5] The system SHALL implement the following commands:
- GenerateReferralCodeCommand
- ApplyReferralCodeCommand
- DistributeReferrerRewardCommand
- DistributeRefereeRewardCommand
- CreateReferralCampaignCommand
- UpdateReferralCampaignCommand
- DeactivateReferralCampaignCommand
- MarkReferralAsConvertedCommand

**Acceptance Criteria:**
- Each command SHALL have corresponding request and response DTOs
- Command handlers SHALL implement IRequestHandler interface
- Handlers SHALL log operations at appropriate levels

### 9.2 Query Organization

**REQ-REF-040**: [Phase 5] All referral queries SHALL be located in `CoursesPlatform.Api\Features\Referrals\Queries`.

**Acceptance Criteria:**
- Queries SHALL use MediatR IRequest interface
- Each query SHALL have a dedicated handler
- Handlers SHALL use `ICoursesPlatformContext` directly
- DTOs associated with queries SHALL be in the same folder

**REQ-REF-041**: [Phase 5] The system SHALL implement the following queries:
- GetUserReferralCodeQuery
- ValidateReferralCodeQuery
- GetUserReferralsQuery
- GetUserRewardsQuery
- GetActiveCampaignsQuery
- GetReferralMetricsQuery
- GetTopReferrersQuery
- GetCampaignAnalyticsQuery

**Acceptance Criteria:**
- Each query SHALL have corresponding request and response DTOs
- Query handlers SHALL implement IRequestHandler interface
- Handlers SHALL log query execution at Information level

---

## 10. API Controllers

### 10.1 Controller Structure

**REQ-REF-042**: [Phase 5] The system SHALL implement a ReferralsController in `CoursesPlatform.Api\Controllers`.

**Acceptance Criteria:**
- Controller SHALL inherit from ControllerBase
- Controller SHALL use dependency injection for IMediator
- Controller SHALL include route attribute [Route("api/[controller]")]
- Controller SHALL include [ApiController] attribute

**REQ-REF-043**: [Phase 5] The ReferralsController SHALL expose the following endpoints:
- POST /api/referrals/generate-code
- POST /api/referrals/apply-code
- GET /api/referrals/my-code
- GET /api/referrals/my-referrals
- GET /api/referrals/my-rewards
- GET /api/referrals/validate/{code}
- POST /api/referrals/mark-converted/{referralId}

**Acceptance Criteria:**
- Each endpoint SHALL use appropriate HTTP verb
- Endpoints SHALL send commands/queries via MediatR
- Endpoints SHALL return appropriate HTTP status codes
- Endpoints SHALL include proper authorization attributes

**REQ-REF-044**: [Phase 5] The system SHALL implement a ReferralCampaignsController in `CoursesPlatform.Api\Controllers`.

**Acceptance Criteria:**
- Controller SHALL be accessible only to administrators
- Controller SHALL include [Authorize(Roles = "Admin")] attribute

**REQ-REF-045**: [Phase 5] The ReferralCampaignsController SHALL expose the following endpoints:
- POST /api/referral-campaigns
- PUT /api/referral-campaigns/{id}
- DELETE /api/referral-campaigns/{id}
- GET /api/referral-campaigns
- GET /api/referral-campaigns/{id}
- GET /api/referral-campaigns/{id}/analytics

**Acceptance Criteria:**
- Endpoints SHALL validate administrator permissions
- Endpoints SHALL return appropriate status codes
- Endpoints SHALL log administrative actions at Information level with admin user context

---

## 11. Services

### 11.1 Core Services

**REQ-REF-046**: [Phase 5] The system SHALL implement a ReferralCodeGeneratorService in `CoursesPlatform.Core\Services`.

**Acceptance Criteria:**
- Service SHALL generate unique alphanumeric codes
- Service SHALL verify uniqueness via `ICoursesPlatformContext`
- Service SHALL support configurable code length
- Service SHALL implement retry logic for uniqueness conflicts
- Service SHALL log code generation at Information level

**REQ-REF-047**: [Phase 5] The system SHALL implement a RewardCalculationService in `CoursesPlatform.Core\Services`.

**Acceptance Criteria:**
- Service SHALL calculate rewards based on campaign rules
- Service SHALL support tiered reward structures
- Service SHALL use `ICoursesPlatformContext` to access campaign data
- Service SHALL validate eligibility before calculation
- Service SHALL log calculations at Information level

**REQ-REF-048**: [Phase 5] The system SHALL implement a ReferralAnalyticsService in `CoursesPlatform.Core\Services`.

**Acceptance Criteria:**
- Service SHALL aggregate referral metrics
- Service SHALL calculate conversion rates and ROI
- Service SHALL use `ICoursesPlatformContext` for data access
- Service SHALL support date range filtering
- Service SHALL log analytics operations at Information level

---

## 12. Domain Events

### 12.1 Event Definitions

**REQ-REF-049**: [Phase 5] The system SHALL define domain events in `CoursesPlatform.Core\Model\ReferralAggregate\Events`.

**Acceptance Criteria:**
- Events folder SHALL contain all referral-related events
- Each event SHALL be a separate file

**REQ-REF-050**: [Phase 5] The system SHALL implement the following domain events:
- ReferralCodeGeneratedEvent
- ReferralCodeAppliedEvent
- ReferralConvertedEvent
- RewardDistributedEvent
- CampaignCreatedEvent
- CampaignDeactivatedEvent

**Acceptance Criteria:**
- Each event SHALL include relevant entity identifiers
- Events SHALL include timestamp property
- Events SHALL include user context (UserId)
- Events SHALL be logged when raised at Information level with event-specific enrichment

---

## 13. Entity Framework Configuration

### 13.1 Entity Configurations

**REQ-REF-051**: [Phase 5] The system SHALL implement Entity Framework configurations for all referral entities in `CoursesPlatform.Infrastructure`.

**Acceptance Criteria:**
- Each entity SHALL have a dedicated configuration class
- Configurations SHALL implement IEntityTypeConfiguration&lt;T&gt;
- Configurations SHALL define primary keys, foreign keys, and indexes
- Configurations SHALL define required fields and max lengths
- Configurations SHALL configure cascade delete behaviors

**REQ-REF-052**: [Phase 5] The ReferralCode configuration SHALL enforce uniqueness on the Code property.

**Acceptance Criteria:**
- Configuration SHALL include unique index on Code column
- Index SHALL be case-insensitive

### 13.2 Database Migrations

**REQ-REF-053**: [Phase 5] The system SHALL create Entity Framework migrations for referral tables.

**Acceptance Criteria:**
- Migrations SHALL be located in `CoursesPlatform.Infrastructure\Migrations`
- Migration SHALL create tables: ReferralCodes, Referrals, ReferralRewards, ReferralCampaigns
- Migration SHALL create appropriate indexes and constraints
- Migration SHALL include down migration for rollback

---

## 14. Validation and Error Handling

### 14.1 Input Validation

**REQ-REF-054**: [Phase 5] All commands SHALL validate input data before processing.

**Acceptance Criteria:**
- Validation SHALL check for required fields
- Validation SHALL verify data types and ranges
- Validation SHALL return meaningful error messages
- Invalid input SHALL return HTTP 400 Bad Request
- Validation failures SHALL be logged at Warning level

### 14.2 Business Rule Validation

**REQ-REF-055**: [Phase 5] The system SHALL validate business rules before state changes.

**Acceptance Criteria:**
- Business rule violations SHALL return HTTP 409 Conflict or 422 Unprocessable Entity
- Error responses SHALL include descriptive messages
- Violations SHALL be logged at Warning level with context

### 14.3 Error Logging

**REQ-REF-056**: [Phase 5] The system SHALL log all exceptions with complete context.

**Acceptance Criteria:**
- Exceptions SHALL be logged at Error level
- Logs SHALL include exception type, message, and stack trace
- Logs SHALL be enriched with CorrelationId, UserId, and relevant entity IDs
- Critical failures SHALL be logged at Critical level
- Sensitive data SHALL NOT be logged (per REQ-SYS-021)

---

## 15. Performance and Scalability

### 15.1 Query Optimization

**REQ-REF-057**: [Phase 5] The system SHALL optimize referral queries for performance.

**Acceptance Criteria:**
- Queries SHALL use appropriate indexes
- Analytics queries SHALL use aggregation at database level
- Large result sets SHALL support pagination
- Query execution SHALL be logged with duration metrics

### 15.2 Caching Strategy

**REQ-REF-058**: [Phase 5] The system MAY implement caching for frequently accessed referral data.

**Acceptance Criteria:**
- Campaign data MAY be cached with appropriate TTL
- Cache invalidation SHALL occur on campaign updates
- Active campaigns list MAY be cached

---

## 16. Security Requirements

### 16.1 Authorization

**REQ-REF-059**: [Phase 5] The system SHALL enforce authorization on all referral endpoints.

**Acceptance Criteria:**
- Users SHALL only access their own referral data
- Campaign management SHALL require administrator role
- Authorization failures SHALL return HTTP 403 Forbidden
- Authorization attempts SHALL be logged at Warning level

### 16.2 Data Privacy

**REQ-REF-060**: [Phase 5] The system SHALL protect sensitive referral information.

**Acceptance Criteria:**
- Referral codes SHALL be validated server-side
- User personal information SHALL not be exposed in referral data
- Reward amounts SHALL only be visible to relevant users
- Data access SHALL follow principle of least privilege

---

## 17. Compliance

### 17.1 Architectural Compliance

**REQ-REF-061**: [Phase 5] The referral program implementation SHALL comply with all system-wide requirements defined in the SRS.

**Acceptance Criteria:**
- NO Repository pattern SHALL be used (REQ-SYS-005)
- `ICoursesPlatformContext` SHALL be used directly for all data access (REQ-SYS-006)
- Services SHALL be located in `CoursesPlatform.Core\Services` unless infrastructure dependencies require otherwise (REQ-CORE-007)
- Flattened namespaces SHALL be used (REQ-SYS-001)
- Identity properties SHALL follow {Entity}Id naming convention (REQ-SYS-007)
- One type per file SHALL be maintained (REQ-SYS-008)
- Structured logging with Serilog SHALL be implemented (REQ-SYS-013)

---

**End of Referral Program Backend Specification**
