# Affiliate Partner Feature - Backend Specification

**Document Version:** 1.0
**Date:** 2025-12-25
**Status:** Draft
**Phase:** 5 (Enterprise Feature)

---

## 1. Introduction

### 1.1 Purpose
This document specifies the backend requirements for the Affiliate Partner feature, which enables users to register as affiliates, generate tracking links, earn commissions, and receive payouts for course sales generated through their referrals.

### 1.2 Scope
This specification covers:
- Affiliate registration and management
- Affiliate link generation and tracking
- Commission calculation and tracking
- Partner tier management
- Payout processing and management

### 1.3 Phase Classification
All requirements in this document are classified as **Phase 5 - Enterprise Features**.

---

## 2. Affiliate Registration

### 2.1 Affiliate Registration Process

**REQ-AFF-001** [Phase 5]: The system SHALL allow authenticated users to register as affiliates through a dedicated registration endpoint.

**Acceptance Criteria:**
- User must be authenticated
- User must not already be an affiliate
- Registration must collect: business name (optional), contact email, payment method details
- System assigns default partner tier upon registration
- System generates unique affiliate code upon registration
- Registration timestamp is recorded

**REQ-AFF-002** [Phase 5]: The system SHALL validate that an affiliate code is unique across all affiliates.

**Acceptance Criteria:**
- Affiliate code must be 8-12 alphanumeric characters
- Code must be URL-safe (no special characters except hyphens)
- System checks uniqueness before assignment
- If collision occurs, system generates new code

**REQ-AFF-003** [Phase 5]: The system SHALL support multiple affiliate statuses: Pending, Active, Suspended, Terminated.

**Acceptance Criteria:**
- New affiliates start in Pending status
- Only Active affiliates can generate links and earn commissions
- Suspended affiliates cannot generate new links but existing links remain tracked
- Terminated affiliates have all links deactivated
- Status transitions are logged with timestamp and reason

---

## 3. Affiliate Link Management

### 3.1 Link Generation

**REQ-AFF-004** [Phase 5]: The system SHALL allow active affiliates to generate tracking links for any published course.

**Acceptance Criteria:**
- Affiliate must be in Active status
- Course must be published and available for purchase
- Each link includes unique tracking token
- Links are stored with creation timestamp
- System supports multiple links per affiliate per course

**REQ-AFF-005** [Phase 5]: The system SHALL generate unique tracking tokens for each affiliate link.

**Acceptance Criteria:**
- Token is cryptographically secure (minimum 16 characters)
- Token is URL-safe
- Token uniqueness is enforced
- Token includes affiliate identifier for quick lookup

**REQ-AFF-006** [Phase 5]: The system SHALL track affiliate link metadata including creation date, course, and custom campaign name.

**Acceptance Criteria:**
- CreatedAt timestamp is recorded
- CourseId reference is maintained
- Optional campaign name (max 100 characters)
- Optional custom parameters (JSON object)
- Link active/inactive status

### 3.2 Link Tracking

**REQ-AFF-007** [Phase 5]: The system SHALL track all clicks on affiliate links with timestamp and source information.

**Acceptance Criteria:**
- Click timestamp is recorded
- Source IP address is logged (anonymized for privacy)
- User agent string is captured
- Referrer URL is stored if available
- Geographic data (country/region) is recorded if available

**REQ-AFF-008** [Phase 5]: The system SHALL associate purchases with affiliate links using tracking tokens stored in session/cookie.

**Acceptance Criteria:**
- Tracking token stored for 30 days
- Token persists across page navigation
- Purchase must occur within tracking window
- System handles multiple affiliate clicks (last-click attribution)
- Anonymous users can be tracked and attributed after registration

---

## 4. Commission Tracking

### 4.1 Commission Calculation

**REQ-AFF-009** [Phase 5]: The system SHALL automatically create commission records when a tracked purchase is completed.

**Acceptance Criteria:**
- Commission created on successful payment
- Commission amount calculated based on partner tier rate
- Base amount excludes taxes and fees
- Commission status starts as Pending
- Purchase reference is maintained

**REQ-AFF-010** [Phase 5]: The system SHALL calculate commission amounts based on the affiliate's partner tier rate at time of purchase.

**Acceptance Criteria:**
- Commission rate from partner tier is applied
- Rate is locked at time of purchase (immune to tier changes)
- Calculation: BaseAmount × CommissionRate = CommissionAmount
- Calculation is logged for audit trail
- Currency is maintained from original purchase

**REQ-AFF-011** [Phase 5]: The system SHALL support commission approval workflow before payouts.

**Acceptance Criteria:**
- New commissions start in Pending status
- Pending commissions become Approved after refund period (30 days)
- Approved commissions are eligible for payout
- Rejected commissions are excluded from payouts (e.g., refunded purchases)
- Status transitions are logged with reason

### 4.2 Commission Lifecycle

**REQ-AFF-012** [Phase 5]: The system SHALL support commission statuses: Pending, Approved, Rejected, Paid.

**Acceptance Criteria:**
- Pending: Initial state, awaiting refund period
- Approved: Eligible for payout
- Rejected: Excluded from payout (refund or fraud)
- Paid: Included in completed payout
- Status changes tracked with timestamp and user

**REQ-AFF-013** [Phase 5]: The system SHALL automatically approve commissions after the refund period expires.

**Acceptance Criteria:**
- Default refund period is 30 days
- Refund period configurable per course or globally
- Background job checks and approves eligible commissions daily
- Approval timestamp recorded
- Affiliates notified of approved commissions

---

## 5. Partner Tier Management

### 5.1 Tier Definition

**REQ-AFF-014** [Phase 5]: The system SHALL support multiple partner tiers with different commission rates.

**Acceptance Criteria:**
- Tier includes: name, description, commission rate (percentage)
- Commission rate between 0.01 and 0.50 (1% to 50%)
- Multiple tiers can exist simultaneously
- Default tier assigned to new affiliates
- Tier configuration managed by administrators

**REQ-AFF-015** [Phase 5]: The system SHALL support tier progression based on performance metrics.

**Acceptance Criteria:**
- Metrics include: total sales, number of conversions, time as affiliate
- Automatic tier upgrades when thresholds met
- Manual tier assignment by administrators
- Tier changes take effect for future commissions only
- Notification sent on tier change

**REQ-AFF-016** [Phase 5]: The system SHALL define standard partner tiers: Bronze (5%), Silver (10%), Gold (15%), Platinum (20%).

**Acceptance Criteria:**
- Bronze: Default tier, 5% commission
- Silver: 10 sales or $1000 revenue, 10% commission
- Gold: 50 sales or $5000 revenue, 15% commission
- Platinum: 200 sales or $20000 revenue, 20% commission
- Tier requirements configurable by administrators

---

## 6. Payout Management

### 6.1 Payout Request

**REQ-AFF-017** [Phase 5]: The system SHALL allow affiliates to request payouts for approved commissions.

**Acceptance Criteria:**
- Minimum payout threshold: $50 (configurable)
- Only approved commissions included
- Payout request includes all eligible commissions
- Request creates AffiliatePayout record
- Request timestamp recorded

**REQ-AFF-018** [Phase 5]: The system SHALL validate payout requests against minimum thresholds and payment method requirements.

**Acceptance Criteria:**
- Total approved commissions must meet minimum threshold
- Affiliate must have valid payment method on file
- Affiliate must be in Active status
- Validation errors returned with specific messages
- Failed validations logged

**REQ-AFF-019** [Phase 5]: The system SHALL support payout methods: Bank Transfer, PayPal, Check.

**Acceptance Criteria:**
- Bank Transfer requires: account number, routing number, account holder name
- PayPal requires: verified PayPal email
- Check requires: mailing address
- Payment method stored securely
- Multiple payment methods per affiliate supported

### 6.2 Payout Processing

**REQ-AFF-020** [Phase 5]: The system SHALL support payout statuses: Requested, Processing, Completed, Failed.

**Acceptance Criteria:**
- Requested: Initial state when affiliate submits
- Processing: Administrator initiated payment
- Completed: Payment confirmed
- Failed: Payment failed, commissions returned to Approved
- Status transitions logged with timestamp

**REQ-AFF-021** [Phase 5]: The system SHALL update commission status to Paid when payout is completed.

**Acceptance Criteria:**
- All commissions in payout marked as Paid
- PayoutId reference added to commission
- Update is atomic (all or none)
- Timestamp of payment recorded
- Cannot be reversed once marked Paid

**REQ-AFF-022** [Phase 5]: The system SHALL track payout processing details including transaction reference and completion date.

**Acceptance Criteria:**
- Transaction reference from payment processor stored
- Completion date recorded
- Processing notes available for administrators
- Payout method used is recorded
- Audit trail maintained

---

## 7. Reporting and Analytics

### 7.1 Affiliate Dashboards

**REQ-AFF-023** [Phase 5]: The system SHALL provide endpoints for affiliate dashboard data including clicks, conversions, and earnings.

**Acceptance Criteria:**
- Total clicks across all links
- Total conversions (purchases)
- Conversion rate percentage
- Total earnings (approved + paid)
- Pending earnings awaiting approval
- Available balance for payout

**REQ-AFF-024** [Phase 5]: The system SHALL support time-based filtering for affiliate statistics (last 7 days, 30 days, 90 days, all time).

**Acceptance Criteria:**
- Date range filtering on all metrics
- Comparison with previous period
- Trend data for visualizations
- Top performing courses
- Top performing links

### 7.2 Administrative Reports

**REQ-AFF-025** [Phase 5]: The system SHALL provide administrative endpoints for affiliate program analytics.

**Acceptance Criteria:**
- Total active affiliates
- Total commission paid
- Total pending payouts
- Top performing affiliates
- Fraud detection metrics
- Program ROI calculations

---

## 8. Data Model Requirements

### 8.1 Affiliate Aggregate

**REQ-AFF-026** [Phase 5]: The system SHALL implement an Affiliate aggregate root with properties: AffiliateId, UserId, AffiliateCode, BusinessName, ContactEmail, Status, PartnerTier, CreatedAt, UpdatedAt.

**Acceptance Criteria:**
- AffiliateId is primary key (Guid)
- UserId references User entity
- AffiliateCode is unique string (8-12 chars)
- Status is enum: Pending, Active, Suspended, Terminated
- PartnerTier is value object
- Timestamps are UTC

**REQ-AFF-027** [Phase 5]: The system SHALL implement AffiliateLink entity with properties: AffiliateLinkId, AffiliateId, CourseId, TrackingToken, CampaignName, IsActive, CreatedAt.

**Acceptance Criteria:**
- AffiliateLinkId is primary key (Guid)
- AffiliateId is foreign key
- CourseId is foreign key
- TrackingToken is unique string
- CampaignName is optional string (max 100 chars)
- IsActive defaults to true

**REQ-AFF-028** [Phase 5]: The system SHALL implement Commission entity with properties: CommissionId, AffiliateId, AffiliateLinkId, PurchaseId, BaseAmount, CommissionRate, CommissionAmount, Status, CreatedAt, ApprovedAt, PaidAt.

**Acceptance Criteria:**
- CommissionId is primary key (Guid)
- All foreign keys properly indexed
- Amounts stored as decimal (18,2)
- CommissionRate stored as decimal (5,4)
- Status is enum: Pending, Approved, Rejected, Paid
- Timestamps are nullable UTC

**REQ-AFF-029** [Phase 5]: The system SHALL implement PartnerTier value object with properties: Name, Description, CommissionRate, MinimumSales, MinimumRevenue.

**Acceptance Criteria:**
- Immutable value object
- CommissionRate between 0.01 and 0.50
- MinimumSales and MinimumRevenue are nullable integers
- Equality based on all properties
- Validation in constructor

**REQ-AFF-030** [Phase 5]: The system SHALL implement AffiliatePayout entity with properties: AffiliatePayoutId, AffiliateId, Amount, PayoutMethod, Status, RequestedAt, ProcessedAt, CompletedAt, TransactionReference.

**Acceptance Criteria:**
- AffiliatePayoutId is primary key (Guid)
- AffiliateId is foreign key
- Amount is decimal (18,2)
- PayoutMethod is enum: BankTransfer, PayPal, Check
- Status is enum: Requested, Processing, Completed, Failed
- Timestamps are UTC (nullable for future dates)

---

## 9. API Endpoints (MediatR CQRS)

### 9.1 Commands

**REQ-AFF-031** [Phase 5]: The system SHALL implement a RegisterAffiliateCommand handled through MediatR.

**Acceptance Criteria:**
- Input: BusinessName (optional), ContactEmail, PaymentMethodDetails
- Output: AffiliateDto with AffiliateId and AffiliateCode
- Validates user not already affiliate
- Generates unique affiliate code
- Saves to ICoursesPlatformContext
- Returns 201 Created on success

**REQ-AFF-032** [Phase 5]: The system SHALL implement a GenerateAffiliateLinkCommand handled through MediatR.

**Acceptance Criteria:**
- Input: CourseId, CampaignName (optional)
- Output: AffiliateLinkDto with full tracking URL
- Validates affiliate is active
- Validates course exists and is published
- Generates unique tracking token
- Saves to ICoursesPlatformContext
- Returns 201 Created on success

**REQ-AFF-033** [Phase 5]: The system SHALL implement a RequestPayoutCommand handled through MediatR.

**Acceptance Criteria:**
- Input: PaymentMethodType
- Output: AffiliatePayoutDto with payout details
- Validates minimum threshold
- Validates payment method exists
- Creates payout record with Requested status
- Updates commissions to reference payout
- Returns 201 Created on success

**REQ-AFF-034** [Phase 5]: The system SHALL implement a ProcessPayoutCommand handled through MediatR (admin only).

**Acceptance Criteria:**
- Input: AffiliatePayoutId, TransactionReference
- Output: Updated AffiliatePayoutDto
- Validates payout in Requested status
- Updates status to Processing
- Records transaction reference
- Returns 200 OK on success
- Requires admin role

**REQ-AFF-035** [Phase 5]: The system SHALL implement a CompletePayoutCommand handled through MediatR (admin only).

**Acceptance Criteria:**
- Input: AffiliatePayoutId
- Output: Updated AffiliatePayoutDto
- Validates payout in Processing status
- Updates status to Completed
- Marks all commissions as Paid
- Records completion timestamp
- Returns 200 OK on success
- Requires admin role

### 9.2 Queries

**REQ-AFF-036** [Phase 5]: The system SHALL implement a GetAffiliateDashboardQuery handled through MediatR.

**Acceptance Criteria:**
- Input: DateRange (optional)
- Output: AffiliateDashboardDto with metrics
- Includes: clicks, conversions, earnings, pending balance
- Filters by authenticated affiliate
- Returns 200 OK with data

**REQ-AFF-037** [Phase 5]: The system SHALL implement a GetAffiliateLinksQuery handled through MediatR.

**Acceptance Criteria:**
- Input: Page, PageSize, CourseId (optional)
- Output: Paginated list of AffiliateLinkDto
- Filters by authenticated affiliate
- Supports filtering by course
- Includes click count and conversion count
- Returns 200 OK with data

**REQ-AFF-038** [Phase 5]: The system SHALL implement a GetCommissionsQuery handled through MediatR.

**Acceptance Criteria:**
- Input: Page, PageSize, Status (optional), DateRange (optional)
- Output: Paginated list of CommissionDto
- Filters by authenticated affiliate
- Supports status filtering
- Supports date range filtering
- Returns 200 OK with data

**REQ-AFF-039** [Phase 5]: The system SHALL implement a GetPayoutsQuery handled through MediatR.

**Acceptance Criteria:**
- Input: Page, PageSize, Status (optional)
- Output: Paginated list of AffiliatePayoutDto
- Filters by authenticated affiliate
- Supports status filtering
- Includes commission details
- Returns 200 OK with data

**REQ-AFF-040** [Phase 5]: The system SHALL implement a GetAllAffiliatesQuery handled through MediatR (admin only).

**Acceptance Criteria:**
- Input: Page, PageSize, Status (optional), SearchTerm (optional)
- Output: Paginated list of AffiliateDto with statistics
- Supports status filtering
- Supports search by name, email, or code
- Includes performance metrics
- Returns 200 OK with data
- Requires admin role

---

## 10. Business Rules

### 10.1 Commission Rules

**REQ-AFF-041** [Phase 5]: The system SHALL NOT create commissions for purchases made by the affiliate themselves.

**Acceptance Criteria:**
- Check UserId of purchaser against affiliate UserId
- Self-purchases are tracked but not commissioned
- Logged for fraud detection
- Clear error message if attempted

**REQ-AFF-042** [Phase 5]: The system SHALL support commission refunds when purchases are refunded.

**Acceptance Criteria:**
- Commission status changed to Rejected
- If already paid, create negative commission record
- Negative commission deducted from next payout
- Audit trail maintained
- Affiliate notified of refund

**REQ-AFF-043** [Phase 5]: The system SHALL apply last-click attribution when multiple affiliate links are clicked.

**Acceptance Criteria:**
- Most recent valid click wins
- Click must be within 30-day window
- Previous clicks are tracked but not commissioned
- Attribution recorded in commission

### 10.2 Security Rules

**REQ-AFF-044** [Phase 5]: The system SHALL implement rate limiting on affiliate link generation.

**Acceptance Criteria:**
- Maximum 100 links per hour per affiliate
- Maximum 1000 links per day per affiliate
- Rate limit resets on rolling window
- 429 Too Many Requests returned when exceeded
- Logged for fraud detection

**REQ-AFF-045** [Phase 5]: The system SHALL detect and flag suspicious affiliate activity.

**Acceptance Criteria:**
- High click count with no conversions (> 1000 clicks, 0 conversions)
- Rapid link generation
- Multiple accounts from same IP
- Unusual conversion patterns
- Flagged accounts reviewed by admin

---

## 11. Data Access

**REQ-AFF-046** [Phase 5]: All data access operations SHALL use ICoursesPlatformContext directly, following the system-wide constraint of no Repository pattern.

**Acceptance Criteria:**
- Commands inject ICoursesPlatformContext
- Queries inject ICoursesPlatformContext
- No IRepository or repository abstraction
- Direct DbSet access for all entities
- Entity Framework LINQ queries

**REQ-AFF-047** [Phase 5]: The system SHALL add DbSet properties to ICoursesPlatformContext for: Affiliates, AffiliateLinks, Commissions, AffiliatePayout.

**Acceptance Criteria:**
- DbSet<Affiliate> Affiliates
- DbSet<AffiliateLink> AffiliateLinks
- DbSet<Commission> Commissions
- DbSet<AffiliatePayout> AffiliatePayouts
- Properties are read-only
- SaveChangesAsync method available

---

## 12. Logging Requirements

**REQ-AFF-048** [Phase 5]: The system SHALL implement structured logging using Serilog for all affiliate operations.

**Acceptance Criteria:**
- Info level: Affiliate registration, link generation, payout requests
- Warning level: Rate limit violations, validation failures
- Error level: Payment processing failures, data inconsistencies
- Critical level: Fraud detection triggers, data corruption
- Enriched with: AffiliateId, UserId, CorrelationId

**REQ-AFF-049** [Phase 5]: The system SHALL log all commission calculations with complete audit trail.

**Acceptance Criteria:**
- BaseAmount, CommissionRate, CommissionAmount logged
- PurchaseId and AffiliateId included
- Timestamp and CorrelationId
- Info level for successful calculations
- Warning level for zero commissions
- No sensitive payment data in logs

---

## 13. Entity Framework Configuration

**REQ-AFF-050** [Phase 5]: The system SHALL create Entity Framework entity configurations for all affiliate entities in CoursesPlatform.Infrastructure.

**Acceptance Criteria:**
- AffiliateConfiguration for Affiliate entity
- AffiliateLinkConfiguration for AffiliateLink entity
- CommissionConfiguration for Commission entity
- AffiliatePayoutConfiguration for AffiliatePayout entity
- Configurations define indexes, relationships, constraints
- Configurations use fluent API

**REQ-AFF-051** [Phase 5]: The system SHALL create database indexes for optimal query performance.

**Acceptance Criteria:**
- Index on Affiliate.AffiliateCode (unique)
- Index on Affiliate.UserId (unique)
- Index on AffiliateLink.TrackingToken (unique)
- Index on AffiliateLink.AffiliateId
- Index on Commission.AffiliateId
- Index on Commission.Status
- Composite index on Commission (AffiliateId, Status)

---

## 14. Background Jobs

**REQ-AFF-052** [Phase 5]: The system SHALL implement a background job to auto-approve eligible commissions daily.

**Acceptance Criteria:**
- Runs daily at configurable time (default: 2 AM UTC)
- Finds Pending commissions older than refund period
- Updates status to Approved
- Records approval timestamp
- Logs count of approved commissions
- Notifies affiliates of approved amounts

**REQ-AFF-053** [Phase 5]: The system SHALL implement a background job to detect and flag suspicious affiliate activity.

**Acceptance Criteria:**
- Runs hourly
- Checks for fraud patterns
- Updates affiliate status to Suspended if fraud detected
- Notifies administrators
- Logs all detections with evidence
- Configurable thresholds

---

## 15. Compliance

All requirements in this specification SHALL adhere to the system-wide requirements defined in `/home/user/CoursesPlatform/docs/specs/implementstion-specs.md`, including:
- No Repository pattern (REQ-SYS-005)
- Direct use of ICoursesPlatformContext (REQ-SYS-006)
- Services in CoursesPlatform.Core when possible (REQ-CORE-007)
- MediatR CQRS pattern for API (REQ-API-002)
- One class per file (REQ-SYS-008)
- Structured logging with Serilog (REQ-SYS-013)
- Entity naming conventions (REQ-SYS-007)

---

**End of Affiliate Partner Backend Specification**
