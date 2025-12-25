# Backend Specification: Instructor Management
**Feature**: Instructor Management
**Phase**: 5 (Enterprise)
**Document Version**: 1.0
**Date**: 2025-12-25
**Status**: Draft

---

## 1. Overview

### 1.1 Purpose
This document specifies the backend requirements for the Instructor Management feature, which enables instructors to manage their profiles, view earnings, configure payout settings, access analytics, and undergo verification.

### 1.2 Scope
This specification covers the backend implementation for:
- Instructor profile management
- Payout settings and configuration
- Earnings dashboard and tracking
- Instructor analytics
- Instructor verification process

### 1.3 Architectural Constraints
- **NO Repository Pattern**: Use `ICoursesPlatformContext` directly for all data access
- **MediatR CQRS**: All operations implemented as Commands and Queries
- **Services in Core**: Business logic SHALL be in `CoursesPlatform.Core\Services`
- **Structured Logging**: All operations SHALL use Serilog with appropriate log levels

---

## 2. Functional Requirements

### 2.1 Instructor Profile Management

**REQ-INS-001**: The system SHALL allow instructors to create and update their instructor profile.
- **Phase**: 5
- **Priority**: High
- **Acceptance Criteria**:
  - AC1: Instructor can create a new instructor profile with bio, headline, website, and social links
  - AC2: Instructor can update existing profile information
  - AC3: Profile changes are validated before saving
  - AC4: Profile updates are logged with structured logging
  - AC5: Profile creation requires authenticated instructor user

**REQ-INS-002**: The system SHALL store instructor profile information including bio, headline, expertise areas, website, and social media links.
- **Phase**: 5
- **Priority**: High
- **Acceptance Criteria**:
  - AC1: Bio field supports up to 5000 characters
  - AC2: Headline supports up to 120 characters
  - AC3: Website URL is validated as a valid URI
  - AC4: Social media links support Twitter, LinkedIn, YouTube, Facebook, and Instagram
  - AC5: Expertise areas stored as comma-separated list

**REQ-INS-003**: The system SHALL track instructor statistics including total students, total courses, and average rating.
- **Phase**: 5
- **Priority**: Medium
- **Acceptance Criteria**:
  - AC1: Total students count is updated when new enrollments occur
  - AC2: Total courses count reflects published courses only
  - AC3: Average rating is calculated from all course reviews
  - AC4: Statistics are cached for performance
  - AC5: Statistics update operations are logged

### 2.2 Payout Settings

**REQ-INS-004**: The system SHALL allow instructors to configure payout methods including bank transfer, PayPal, and Stripe.
- **Phase**: 5
- **Priority**: High
- **Acceptance Criteria**:
  - AC1: Instructor can select preferred payout method from available options
  - AC2: Bank transfer requires account number, routing number, and account holder name
  - AC3: PayPal requires verified PayPal email address
  - AC4: Stripe requires connected Stripe account ID
  - AC5: Payout method changes require verification before activation

**REQ-INS-005**: The system SHALL securely store payout configuration data with encryption for sensitive fields.
- **Phase**: 5
- **Priority**: Critical
- **Acceptance Criteria**:
  - AC1: Bank account numbers are encrypted at rest
  - AC2: Routing numbers are encrypted at rest
  - AC3: PayPal email is stored securely
  - AC4: Stripe account ID is stored securely
  - AC5: Encryption uses industry-standard AES-256

**REQ-INS-006**: The system SHALL allow instructors to set minimum payout threshold amounts.
- **Phase**: 5
- **Priority**: Medium
- **Acceptance Criteria**:
  - AC1: Minimum threshold can be set between $50 and $1000
  - AC2: Default minimum threshold is $100
  - AC3: Threshold changes take effect for next payout cycle
  - AC4: Threshold validation prevents invalid amounts
  - AC5: Threshold updates are logged

**REQ-INS-007**: The system SHALL support automatic payout scheduling (monthly, bi-weekly, weekly).
- **Phase**: 5
- **Priority**: Medium
- **Acceptance Criteria**:
  - AC1: Instructors can select payout frequency from predefined options
  - AC2: Monthly payouts execute on the 1st of each month
  - AC3: Bi-weekly payouts execute every 2 weeks
  - AC4: Weekly payouts execute every 7 days
  - AC5: Schedule changes take effect for next payout cycle

### 2.3 Earnings Dashboard

**REQ-INS-008**: The system SHALL provide instructors with real-time access to their earnings data.
- **Phase**: 5
- **Priority**: High
- **Acceptance Criteria**:
  - AC1: Total lifetime earnings displayed with 2 decimal precision
  - AC2: Current balance available for payout displayed
  - AC3: Pending earnings (in escrow) displayed separately
  - AC4: Last payout amount and date displayed
  - AC5: Earnings data refreshes on each page load

**REQ-INS-009**: The system SHALL calculate and display earnings breakdown by course.
- **Phase**: 5
- **Priority**: High
- **Acceptance Criteria**:
  - AC1: Each course shows total revenue generated
  - AC2: Each course shows number of enrollments
  - AC3: Each course shows average revenue per enrollment
  - AC4: Courses sorted by revenue descending by default
  - AC5: Earnings reflect platform commission deduction

**REQ-INS-010**: The system SHALL track earnings over time with daily, weekly, and monthly aggregations.
- **Phase**: 5
- **Priority**: Medium
- **Acceptance Criteria**:
  - AC1: Daily earnings stored for last 90 days
  - AC2: Weekly aggregations available for last 52 weeks
  - AC3: Monthly aggregations available for all time
  - AC4: Aggregations calculated through database queries
  - AC5: Time-based queries optimized with appropriate indexes

**REQ-INS-011**: The system SHALL provide transaction history with detailed breakdown of each earning event.
- **Phase**: 5
- **Priority**: Medium
- **Acceptance Criteria**:
  - AC1: Transaction history includes enrollment date, course name, amount, and status
  - AC2: Transactions paginated with 50 items per page
  - AC3: Transactions filterable by date range
  - AC4: Transactions filterable by course
  - AC5: Export to CSV functionality available

### 2.4 Instructor Analytics

**REQ-INS-012**: The system SHALL provide instructors with student engagement analytics.
- **Phase**: 5
- **Priority**: High
- **Acceptance Criteria**:
  - AC1: Total enrollments displayed per course
  - AC2: Active students (accessed in last 30 days) displayed per course
  - AC3: Completion rate displayed per course
  - AC4: Average progress percentage displayed per course
  - AC5: Analytics updated daily via background job

**REQ-INS-013**: The system SHALL track and display course performance metrics.
- **Phase**: 5
- **Priority**: High
- **Acceptance Criteria**:
  - AC1: Average rating displayed with 2 decimal precision
  - AC2: Total reviews count displayed
  - AC3: Rating distribution (5-star, 4-star, etc.) displayed
  - AC4: Recent reviews (last 10) displayed with excerpt
  - AC5: Performance metrics cached for 1 hour

**REQ-INS-014**: The system SHALL provide revenue analytics with trends and projections.
- **Phase**: 5
- **Priority**: Medium
- **Acceptance Criteria**:
  - AC1: Monthly revenue trend for last 12 months displayed
  - AC2: Growth rate percentage calculated month-over-month
  - AC3: Projected revenue for next month based on trend analysis
  - AC4: Top performing courses by revenue highlighted
  - AC5: Revenue analytics refreshed daily

**REQ-INS-015**: The system SHALL track content performance metrics including video completion rates.
- **Phase**: 5
- **Priority**: Low
- **Acceptance Criteria**:
  - AC1: Lecture completion rate displayed per lecture
  - AC2: Average time spent on each lecture tracked
  - AC3: Drop-off points identified in course curriculum
  - AC4: Quiz performance metrics displayed
  - AC5: Assignment submission rates tracked

### 2.5 Instructor Verification

**REQ-INS-016**: The system SHALL allow instructors to submit verification requests with required documentation.
- **Phase**: 5
- **Priority**: High
- **Acceptance Criteria**:
  - AC1: Verification request includes government-issued ID upload
  - AC2: Verification request includes proof of expertise documents
  - AC3: Verification request includes professional credentials or certifications
  - AC4: File uploads limited to 10MB per file
  - AC5: Supported file formats: PDF, JPG, PNG

**REQ-INS-017**: The system SHALL track verification status through workflow states (Pending, UnderReview, Approved, Rejected).
- **Phase**: 5
- **Priority**: High
- **Acceptance Criteria**:
  - AC1: New verification requests start in Pending status
  - AC2: Admin review changes status to UnderReview
  - AC3: Final decision changes status to Approved or Rejected
  - AC4: Status transitions are logged with timestamp and admin user
  - AC5: Instructors notified via email on status changes

**REQ-INS-018**: The system SHALL assign verification badges to verified instructors.
- **Phase**: 5
- **Priority**: Medium
- **Acceptance Criteria**:
  - AC1: Verified badge added to instructor profile upon approval
  - AC2: Verification date stored with instructor record
  - AC3: Verified status displayed on all instructor courses
  - AC4: Badge visible to students browsing courses
  - AC5: Verification can be revoked by administrators

**REQ-INS-019**: The system SHALL send notifications to instructors at each verification workflow stage.
- **Phase**: 5
- **Priority**: Medium
- **Acceptance Criteria**:
  - AC1: Email sent when verification request is submitted
  - AC2: Email sent when verification moves to UnderReview
  - AC3: Email sent when verification is approved with congratulations
  - AC4: Email sent when verification is rejected with reasons
  - AC5: All notification emails logged in structured logging

### 2.6 Data Access and Security

**REQ-INS-020**: The system SHALL use `ICoursesPlatformContext` directly for all data access operations.
- **Phase**: 5
- **Priority**: Critical
- **Acceptance Criteria**:
  - AC1: No repository pattern or abstraction layer used
  - AC2: All queries use DbSet properties from ICoursesPlatformContext
  - AC3: Entity Framework tracking used appropriately
  - AC4: Async operations used for all database access
  - AC5: Transactions used for multi-entity updates

**REQ-INS-021**: The system SHALL enforce authorization ensuring instructors can only access their own data.
- **Phase**: 5
- **Priority**: Critical
- **Acceptance Criteria**:
  - AC1: Instructor ID extracted from authenticated user claims
  - AC2: All queries filtered by InstructorId
  - AC3: Authorization failures logged at Warning level
  - AC4: Unauthorized access returns 403 Forbidden
  - AC5: Admin users can access all instructor data

**REQ-INS-022**: The system SHALL validate all input data before processing.
- **Phase**: 5
- **Priority**: High
- **Acceptance Criteria**:
  - AC1: FluentValidation used for all command and query validation
  - AC2: Validation failures return 400 Bad Request with error details
  - AC3: Validation errors logged at Warning level
  - AC4: Business rule violations logged with context
  - AC5: SQL injection prevented through parameterized queries

---

## 3. Technical Architecture

### 3.1 Domain Model Location

**REQ-INS-023**: Instructor aggregate SHALL be located in `CoursesPlatform.Core\Model\InstructorAggregate`.
- **Phase**: 5
- **Priority**: Critical
- **Acceptance Criteria**:
  - AC1: InstructorAggregate folder created in Core\Model
  - AC2: Instructor aggregate root class defined
  - AC3: InstructorProfile value object defined
  - AC4: PayoutSettings entity defined
  - AC5: All domain objects follow DDD patterns

### 3.2 Commands and Queries Location

**REQ-INS-024**: MediatR commands and queries SHALL be located in `CoursesPlatform.Api\Features\InstructorManagement`.
- **Phase**: 5
- **Priority**: Critical
- **Acceptance Criteria**:
  - AC1: InstructorManagement folder created in Api\Features
  - AC2: Commands subfolder contains all command handlers
  - AC3: Queries subfolder contains all query handlers
  - AC4: DTOs defined in same folder as their command/query
  - AC5: Extension methods for ToDto conversions defined

### 3.3 Service Layer

**REQ-INS-025**: Instructor-related services SHALL be implemented in `CoursesPlatform.Core\Services`.
- **Phase**: 5
- **Priority**: High
- **Acceptance Criteria**:
  - AC1: IInstructorAnalyticsService interface defined in Core\Services
  - AC2: InstructorAnalyticsService implementation in Core\Services
  - AC3: IInstructorPayoutService interface defined in Core\Services
  - AC4: Services use ICoursesPlatformContext for data access
  - AC5: Services registered in dependency injection container

### 3.4 Controller Design

**REQ-INS-026**: InstructorController SHALL be created in `CoursesPlatform.Api\Controllers`.
- **Phase**: 5
- **Priority**: High
- **Acceptance Criteria**:
  - AC1: Controller named InstructorController
  - AC2: Controller uses MediatR for all operations
  - AC3: Controller endpoints follow RESTful conventions
  - AC4: All endpoints require authentication with [Authorize] attribute
  - AC5: Instructor role required for access

---

## 4. API Endpoints

### 4.1 Profile Management Endpoints

**REQ-INS-027**: The system SHALL expose endpoint `GET /api/instructors/me/profile` to retrieve current instructor's profile.
- **Phase**: 5
- **Priority**: High
- **Acceptance Criteria**:
  - AC1: Returns 200 OK with InstructorProfileDto
  - AC2: Returns 401 Unauthorized if not authenticated
  - AC3: Returns 404 Not Found if instructor profile not found
  - AC4: Response includes all profile fields
  - AC5: Operation logged at Information level

**REQ-INS-028**: The system SHALL expose endpoint `PUT /api/instructors/me/profile` to update instructor profile.
- **Phase**: 5
- **Priority**: High
- **Acceptance Criteria**:
  - AC1: Accepts UpdateInstructorProfileCommand in request body
  - AC2: Returns 200 OK with updated InstructorProfileDto
  - AC3: Returns 400 Bad Request for validation errors
  - AC4: Returns 401 Unauthorized if not authenticated
  - AC5: Profile update logged at Information level

**REQ-INS-029**: The system SHALL expose endpoint `GET /api/instructors/me/statistics` to retrieve instructor statistics.
- **Phase**: 5
- **Priority**: Medium
- **Acceptance Criteria**:
  - AC1: Returns 200 OK with InstructorStatisticsDto
  - AC2: Includes total students, courses, and average rating
  - AC3: Statistics calculated from current data
  - AC4: Returns 401 Unauthorized if not authenticated
  - AC5: Query execution logged at Information level

### 4.2 Payout Settings Endpoints

**REQ-INS-030**: The system SHALL expose endpoint `GET /api/instructors/me/payout-settings` to retrieve payout configuration.
- **Phase**: 5
- **Priority**: High
- **Acceptance Criteria**:
  - AC1: Returns 200 OK with PayoutSettingsDto
  - AC2: Sensitive data (account numbers) masked in response
  - AC3: Returns 401 Unauthorized if not authenticated
  - AC4: Returns 404 Not Found if settings not configured
  - AC5: Access logged at Information level

**REQ-INS-031**: The system SHALL expose endpoint `PUT /api/instructors/me/payout-settings` to update payout configuration.
- **Phase**: 5
- **Priority**: High
- **Acceptance Criteria**:
  - AC1: Accepts UpdatePayoutSettingsCommand in request body
  - AC2: Returns 200 OK with updated PayoutSettingsDto
  - AC3: Returns 400 Bad Request for validation errors
  - AC4: Sensitive data encrypted before saving
  - AC5: Changes logged at Information level with masked data

### 4.3 Earnings Endpoints

**REQ-INS-032**: The system SHALL expose endpoint `GET /api/instructors/me/earnings` to retrieve earnings summary.
- **Phase**: 5
- **Priority**: High
- **Acceptance Criteria**:
  - AC1: Returns 200 OK with EarningsSummaryDto
  - AC2: Includes lifetime earnings, current balance, pending amount
  - AC3: Returns 401 Unauthorized if not authenticated
  - AC4: Calculations performed accurately
  - AC5: Query logged at Information level

**REQ-INS-033**: The system SHALL expose endpoint `GET /api/instructors/me/earnings/by-course` to retrieve per-course earnings.
- **Phase**: 5
- **Priority**: High
- **Acceptance Criteria**:
  - AC1: Returns 200 OK with array of CourseEarningsDto
  - AC2: Each item includes course name, revenue, enrollments
  - AC3: Results sorted by revenue descending
  - AC4: Returns empty array if no earnings
  - AC5: Query optimized for performance

**REQ-INS-034**: The system SHALL expose endpoint `GET /api/instructors/me/earnings/transactions` to retrieve transaction history.
- **Phase**: 5
- **Priority**: Medium
- **Acceptance Criteria**:
  - AC1: Returns 200 OK with paginated TransactionHistoryDto
  - AC2: Supports query parameters: page, pageSize, startDate, endDate, courseId
  - AC3: Default page size is 50
  - AC4: Includes total count for pagination
  - AC5: Results sorted by date descending

**REQ-INS-035**: The system SHALL expose endpoint `GET /api/instructors/me/earnings/trends` to retrieve earnings trends.
- **Phase**: 5
- **Priority**: Medium
- **Acceptance Criteria**:
  - AC1: Returns 200 OK with EarningsTrendsDto
  - AC2: Includes daily, weekly, and monthly aggregations
  - AC3: Supports query parameter: period (30, 90, 365 days)
  - AC4: Default period is 90 days
  - AC5: Trend calculations cached for performance

### 4.4 Analytics Endpoints

**REQ-INS-036**: The system SHALL expose endpoint `GET /api/instructors/me/analytics/engagement` to retrieve student engagement analytics.
- **Phase**: 5
- **Priority**: High
- **Acceptance Criteria**:
  - AC1: Returns 200 OK with StudentEngagementDto
  - AC2: Includes per-course engagement metrics
  - AC3: Includes active students count
  - AC4: Includes completion rates
  - AC5: Data refreshed from analytics service

**REQ-INS-037**: The system SHALL expose endpoint `GET /api/instructors/me/analytics/performance` to retrieve course performance metrics.
- **Phase**: 5
- **Priority**: High
- **Acceptance Criteria**:
  - AC1: Returns 200 OK with CoursePerformanceDto
  - AC2: Includes ratings and reviews statistics
  - AC3: Includes rating distribution
  - AC4: Supports filtering by courseId query parameter
  - AC5: Metrics cached for performance

**REQ-INS-038**: The system SHALL expose endpoint `GET /api/instructors/me/analytics/revenue` to retrieve revenue analytics.
- **Phase**: 5
- **Priority**: Medium
- **Acceptance Criteria**:
  - AC1: Returns 200 OK with RevenueAnalyticsDto
  - AC2: Includes monthly trends for last 12 months
  - AC3: Includes growth rate calculations
  - AC4: Includes revenue projections
  - AC5: Analytics calculated via background service

### 4.5 Verification Endpoints

**REQ-INS-039**: The system SHALL expose endpoint `POST /api/instructors/me/verification` to submit verification request.
- **Phase**: 5
- **Priority**: High
- **Acceptance Criteria**:
  - AC1: Accepts multipart/form-data with file uploads
  - AC2: Returns 201 Created with VerificationRequestDto
  - AC3: Returns 400 Bad Request for invalid files
  - AC4: Files stored securely in Azure Blob Storage
  - AC5: Verification request logged at Information level

**REQ-INS-040**: The system SHALL expose endpoint `GET /api/instructors/me/verification` to retrieve verification status.
- **Phase**: 5
- **Priority**: High
- **Acceptance Criteria**:
  - AC1: Returns 200 OK with VerificationStatusDto
  - AC2: Includes current status and submission date
  - AC3: Includes rejection reasons if applicable
  - AC4: Returns 404 Not Found if no verification request exists
  - AC5: Access logged at Information level

**REQ-INS-041**: The system SHALL expose endpoint `PUT /api/instructors/{instructorId}/verification` for admin approval/rejection.
- **Phase**: 5
- **Priority**: High
- **Acceptance Criteria**:
  - AC1: Requires Admin role authorization
  - AC2: Accepts UpdateVerificationStatusCommand
  - AC3: Returns 200 OK with updated VerificationStatusDto
  - AC4: Sends notification email to instructor
  - AC5: Status change logged at Information level

---

## 5. Data Model

### 5.1 Instructor Aggregate Root

**REQ-INS-042**: Instructor entity SHALL be defined with following properties:
- **Phase**: 5
- **Priority**: Critical
- **Properties**:
  - InstructorId (Guid) - Primary key
  - UserId (Guid) - Foreign key to User
  - Bio (string, max 5000) - Instructor biography
  - Headline (string, max 120) - Professional headline
  - Website (string, max 500) - Personal website URL
  - ExpertiseAreas (string, max 1000) - Comma-separated expertise
  - TwitterUrl (string, max 500) - Twitter profile URL
  - LinkedInUrl (string, max 500) - LinkedIn profile URL
  - YouTubeUrl (string, max 500) - YouTube channel URL
  - FacebookUrl (string, max 500) - Facebook profile URL
  - InstagramUrl (string, max 500) - Instagram profile URL
  - TotalStudents (int) - Total enrolled students
  - TotalCourses (int) - Total published courses
  - AverageRating (decimal) - Average course rating
  - IsVerified (bool) - Verification status
  - VerifiedDate (DateTime?) - Verification approval date
  - CreatedAt (DateTime) - Profile creation timestamp
  - UpdatedAt (DateTime) - Last update timestamp

### 5.2 PayoutSettings Entity

**REQ-INS-043**: PayoutSettings entity SHALL be defined with following properties:
- **Phase**: 5
- **Priority**: High
- **Properties**:
  - PayoutSettingsId (Guid) - Primary key
  - InstructorId (Guid) - Foreign key to Instructor
  - PayoutMethod (enum) - BankTransfer, PayPal, Stripe
  - BankAccountNumber (string, encrypted) - Bank account number
  - BankRoutingNumber (string, encrypted) - Bank routing number
  - BankAccountHolderName (string) - Account holder name
  - PayPalEmail (string) - PayPal email address
  - StripeAccountId (string) - Stripe connected account ID
  - MinimumPayoutThreshold (decimal) - Minimum payout amount
  - PayoutFrequency (enum) - Monthly, BiWeekly, Weekly
  - IsActive (bool) - Active status
  - CreatedAt (DateTime) - Settings creation timestamp
  - UpdatedAt (DateTime) - Last update timestamp

### 5.3 InstructorEarnings Entity

**REQ-INS-044**: InstructorEarnings entity SHALL be defined with following properties:
- **Phase**: 5
- **Priority**: High
- **Properties**:
  - InstructorEarningsId (Guid) - Primary key
  - InstructorId (Guid) - Foreign key to Instructor
  - EnrollmentId (Guid) - Foreign key to Enrollment
  - CourseId (Guid) - Foreign key to Course
  - Amount (decimal) - Earning amount after commission
  - GrossAmount (decimal) - Total enrollment amount
  - PlatformCommission (decimal) - Platform commission amount
  - CommissionRate (decimal) - Commission percentage applied
  - Status (enum) - Pending, Available, PaidOut, Refunded
  - EarnedDate (DateTime) - Date earning was created
  - AvailableDate (DateTime) - Date earning becomes available
  - PaidOutDate (DateTime?) - Date earning was paid out
  - CreatedAt (DateTime) - Record creation timestamp

### 5.4 InstructorPayout Entity

**REQ-INS-045**: InstructorPayout entity SHALL be defined with following properties:
- **Phase**: 5
- **Priority**: High
- **Properties**:
  - InstructorPayoutId (Guid) - Primary key
  - InstructorId (Guid) - Foreign key to Instructor
  - Amount (decimal) - Payout amount
  - PayoutMethod (enum) - Payment method used
  - Status (enum) - Pending, Processing, Completed, Failed
  - TransactionReference (string) - External transaction ID
  - RequestedDate (DateTime) - Date payout was requested
  - ProcessedDate (DateTime?) - Date payout was processed
  - CompletedDate (DateTime?) - Date payout was completed
  - FailureReason (string?) - Reason for failure if applicable
  - CreatedAt (DateTime) - Record creation timestamp

### 5.5 InstructorVerification Entity

**REQ-INS-046**: InstructorVerification entity SHALL be defined with following properties:
- **Phase**: 5
- **Priority**: High
- **Properties**:
  - InstructorVerificationId (Guid) - Primary key
  - InstructorId (Guid) - Foreign key to Instructor
  - Status (enum) - Pending, UnderReview, Approved, Rejected
  - SubmittedDate (DateTime) - Date verification was submitted
  - ReviewedDate (DateTime?) - Date verification was reviewed
  - ReviewedByUserId (Guid?) - Admin who reviewed
  - ApprovedDate (DateTime?) - Date verification was approved
  - RejectionReason (string?) - Reason for rejection
  - IdentityDocumentUrl (string) - URL to ID document
  - ExpertiseDocumentUrl (string) - URL to expertise proof
  - CredentialsDocumentUrl (string) - URL to credentials
  - Notes (string?) - Admin review notes
  - CreatedAt (DateTime) - Record creation timestamp
  - UpdatedAt (DateTime) - Last update timestamp

---

## 6. Business Rules

### 6.1 Profile Management Rules

**REQ-INS-047**: Bio field SHALL be optional but recommended for instructor profiles.
- **Phase**: 5
- **Priority**: Low

**REQ-INS-048**: Social media URLs SHALL be validated as properly formatted URLs.
- **Phase**: 5
- **Priority**: Medium

**REQ-INS-049**: Instructor statistics SHALL be calculated in real-time when requested.
- **Phase**: 5
- **Priority**: Medium

### 6.2 Earnings Rules

**REQ-INS-050**: Platform commission rate SHALL default to 20% but be configurable.
- **Phase**: 5
- **Priority**: High

**REQ-INS-051**: Earnings SHALL remain in Pending status for 30 days before becoming Available.
- **Phase**: 5
- **Priority**: High

**REQ-INS-052**: Refunded enrollments SHALL deduct from instructor earnings.
- **Phase**: 5
- **Priority**: Critical

**REQ-INS-053**: Payouts SHALL only include earnings in Available status.
- **Phase**: 5
- **Priority**: Critical

### 6.3 Payout Rules

**REQ-INS-054**: Minimum payout threshold SHALL be enforced before processing payouts.
- **Phase**: 5
- **Priority**: High

**REQ-INS-055**: Failed payouts SHALL be retried up to 3 times before marking as Failed.
- **Phase**: 5
- **Priority**: High

**REQ-INS-056**: Instructors SHALL receive email notification for all payout status changes.
- **Phase**: 5
- **Priority**: Medium

### 6.4 Verification Rules

**REQ-INS-057**: Only one active verification request SHALL exist per instructor at a time.
- **Phase**: 5
- **Priority**: Medium

**REQ-INS-058**: Rejected verification requests SHALL allow resubmission after 30 days.
- **Phase**: 5
- **Priority**: Low

**REQ-INS-059**: Verification approval SHALL automatically update instructor IsVerified flag.
- **Phase**: 5
- **Priority**: High

---

## 7. Logging Requirements

**REQ-INS-060**: All instructor profile operations SHALL be logged at Information level.
- **Phase**: 5
- **Priority**: High

**REQ-INS-061**: All payout operations SHALL be logged at Information level with sensitive data masked.
- **Phase**: 5
- **Priority**: Critical

**REQ-INS-062**: All verification status changes SHALL be logged at Information level.
- **Phase**: 5
- **Priority**: High

**REQ-INS-063**: Failed payout operations SHALL be logged at Error level with complete error details.
- **Phase**: 5
- **Priority**: Critical

**REQ-INS-064**: Authorization failures SHALL be logged at Warning level with user context.
- **Phase**: 5
- **Priority**: High

---

## 8. Performance Requirements

**REQ-INS-065**: Earnings calculations SHALL complete within 2 seconds for 95th percentile.
- **Phase**: 5
- **Priority**: High

**REQ-INS-066**: Analytics queries SHALL use database indexes for optimization.
- **Phase**: 5
- **Priority**: High

**REQ-INS-067**: Profile statistics SHALL be cached for 5 minutes.
- **Phase**: 5
- **Priority**: Medium

**REQ-INS-068**: Transaction history queries SHALL be paginated to prevent performance issues.
- **Phase**: 5
- **Priority**: High

---

## 9. Security Requirements

**REQ-INS-069**: All sensitive payout data SHALL be encrypted using AES-256.
- **Phase**: 5
- **Priority**: Critical

**REQ-INS-070**: Verification documents SHALL be stored in Azure Blob Storage with restricted access.
- **Phase**: 5
- **Priority**: Critical

**REQ-INS-071**: Instructors SHALL only access their own data enforced via claims-based authorization.
- **Phase**: 5
- **Priority**: Critical

**REQ-INS-072**: Admin endpoints SHALL require Admin role authorization.
- **Phase**: 5
- **Priority**: Critical

---

## 10. Dependencies

**REQ-INS-073**: Instructor Management depends on User aggregate for user identity.
- **Phase**: 5
- **Priority**: Critical

**REQ-INS-074**: Instructor Management depends on Course aggregate for course data.
- **Phase**: 5
- **Priority**: Critical

**REQ-INS-075**: Instructor Management depends on Enrollment aggregate for student counts.
- **Phase**: 5
- **Priority**: Critical

**REQ-INS-076**: Instructor Management depends on Payment service for payout processing.
- **Phase**: 5
- **Priority**: Critical

---

**End of Backend Specification**
