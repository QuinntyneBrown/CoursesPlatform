# Subscription & Membership - Backend Specification

**Feature:** Subscription & Membership Management
**Version:** 1.0
**Last Updated:** December 2025

---

## 1. Overview

The Subscription & Membership feature enables the platform to offer subscription-based access to courses through tiered membership plans, recurring billing, and comprehensive subscription management capabilities.

---

## 2. Requirements

### 2.1 Subscription Plan Management

#### REQ-SUB-001: Create Subscription Plan [Phase 5]
The system SHALL allow administrators to create subscription plans.

**Acceptance Criteria:**
- AC1: Plan includes name, description, and billing cycle
- AC2: Plan includes pricing and currency
- AC3: Plan includes membership tier assignment
- AC4: SubscriptionPlanCreated event is published
- AC5: Plan is created in Draft status

#### REQ-SUB-002: Update Subscription Plan [Phase 5]
The system SHALL allow administrators to update subscription plan details.

**Acceptance Criteria:**
- AC1: Only draft plans can have price changes
- AC2: Active plans can update descriptions and features
- AC3: SubscriptionPlanUpdated event is published
- AC4: Existing subscriptions are not affected by updates

#### REQ-SUB-003: Activate Subscription Plan [Phase 5]
The system SHALL allow administrators to activate subscription plans.

**Acceptance Criteria:**
- AC1: Plan must have valid pricing and tier
- AC2: Status changes to Active
- AC3: SubscriptionPlanActivated event is published
- AC4: Plan becomes available for new subscriptions

#### REQ-SUB-004: Deactivate Subscription Plan [Phase 5]
The system SHALL allow administrators to deactivate subscription plans.

**Acceptance Criteria:**
- AC1: Existing subscriptions continue until renewal
- AC2: Status changes to Inactive
- AC3: SubscriptionPlanDeactivated event is published
- AC4: Plan is hidden from subscription options

#### REQ-SUB-005: Delete Subscription Plan [Phase 5]
The system SHALL allow administrators to delete unused subscription plans.

**Acceptance Criteria:**
- AC1: Only draft plans with no subscriptions can be deleted
- AC2: SubscriptionPlanDeleted event is published
- AC3: All associated data is removed

### 2.2 Membership Tier Configuration

#### REQ-SUB-006: Define Membership Tiers [Phase 5]
The system SHALL support configurable membership tiers.

**Acceptance Criteria:**
- AC1: Tiers include: Free, Basic, Premium, Enterprise
- AC2: Each tier has defined access privileges
- AC3: Tiers specify course access limits
- AC4: Tiers specify feature access flags

#### REQ-SUB-007: Tier Access Rules [Phase 5]
The system SHALL enforce tier-based access rules.

**Acceptance Criteria:**
- AC1: Free tier has limited course access
- AC2: Basic tier allows access to specific course collections
- AC3: Premium tier provides full course catalog access
- AC4: Enterprise tier includes additional features (analytics, team management)

#### REQ-SUB-008: Tier Feature Flags [Phase 5]
The system SHALL support feature flags per membership tier.

**Acceptance Criteria:**
- AC1: Features include: offline downloads, certificates, priority support
- AC2: Features can be enabled/disabled per tier
- AC3: MembershipTierFeatureUpdated event is published
- AC4: Feature access is validated at runtime

### 2.3 User Subscription Lifecycle

#### REQ-SUB-009: Subscribe to Plan [Phase 5]
The system SHALL allow users to subscribe to subscription plans.

**Acceptance Criteria:**
- AC1: User selects active subscription plan
- AC2: Payment method is validated
- AC3: Subscription is created with Pending status
- AC4: UserSubscribed event is published
- AC5: Subscription starts immediately after payment confirmation

#### REQ-SUB-010: Payment Processing Integration [Phase 5]
The system SHALL integrate with payment gateway for recurring billing.

**Acceptance Criteria:**
- AC1: Payment gateway creates recurring payment profile
- AC2: Initial payment is processed
- AC3: SubscriptionPaymentProcessed event is published
- AC4: Subscription status changes to Active on success
- AC5: SubscriptionPaymentFailed event on failure

#### REQ-SUB-011: Subscription Activation [Phase 5]
The system SHALL activate subscriptions upon successful payment.

**Acceptance Criteria:**
- AC1: User gains tier-based access immediately
- AC2: Subscription period starts from activation
- AC3: SubscriptionActivated event is published
- AC4: Next billing date is calculated based on cycle

#### REQ-SUB-012: Cancel Subscription [Phase 5]
The system SHALL allow users to cancel their subscriptions.

**Acceptance Criteria:**
- AC1: Subscription remains active until period end
- AC2: Auto-renewal is disabled
- AC3: SubscriptionCancelled event is published
- AC4: User is notified of cancellation and end date
- AC5: Cancellation reason is optionally captured

#### REQ-SUB-013: Reactivate Subscription [Phase 5]
The system SHALL allow users to reactivate cancelled subscriptions.

**Acceptance Criteria:**
- AC1: Only cancelled subscriptions can be reactivated
- AC2: Previous tier and plan are restored
- AC3: SubscriptionReactivated event is published
- AC4: New billing cycle begins immediately

#### REQ-SUB-014: Subscription Expiration [Phase 5]
The system SHALL handle subscription expiration.

**Acceptance Criteria:**
- AC1: Access is revoked at expiration time
- AC2: Status changes to Expired
- AC3: SubscriptionExpired event is published
- AC4: User is notified before and at expiration
- AC5: Grace period may be configured

### 2.4 Subscription Upgrades and Downgrades

#### REQ-SUB-015: Upgrade Subscription [Phase 5]
The system SHALL allow users to upgrade their subscription tier.

**Acceptance Criteria:**
- AC1: Upgrade is processed immediately
- AC2: Prorated charges are calculated
- AC3: SubscriptionUpgraded event is published
- AC4: New tier access is granted immediately
- AC5: Billing date remains unchanged

#### REQ-SUB-016: Downgrade Subscription [Phase 5]
The system SHALL allow users to downgrade their subscription tier.

**Acceptance Criteria:**
- AC1: Downgrade takes effect at next billing cycle
- AC2: SubscriptionDowngraded event is published
- AC3: User retains current tier until period end
- AC4: User is notified of effective downgrade date

#### REQ-SUB-017: Proration Calculation [Phase 5]
The system SHALL calculate prorated charges for mid-cycle changes.

**Acceptance Criteria:**
- AC1: Unused time on current plan is credited
- AC2: New plan is charged for remaining period
- AC3: ProrationCalculated event includes breakdown
- AC4: Net charge/credit is processed immediately

### 2.5 Billing Cycle Management

#### REQ-SUB-018: Billing Cycle Types [Phase 5]
The system SHALL support multiple billing cycle types.

**Acceptance Criteria:**
- AC1: Cycles include: Monthly, Quarterly, Yearly
- AC2: Each cycle has defined duration in days
- AC3: Pricing varies by billing cycle
- AC4: Longer cycles may offer discounts

#### REQ-SUB-019: Recurring Billing [Phase 5]
The system SHALL process recurring billing automatically.

**Acceptance Criteria:**
- AC1: Billing occurs on scheduled renewal date
- AC2: Payment is attempted using stored method
- AC3: RecurringBillingProcessed event is published
- AC4: Subscription renews on successful payment
- AC5: Retry logic handles failed payments

#### REQ-SUB-020: Payment Retry Logic [Phase 5]
The system SHALL retry failed recurring payments.

**Acceptance Criteria:**
- AC1: Up to 3 retry attempts with intervals
- AC2: User is notified of payment failures
- AC3: PaymentRetryAttempted event is published
- AC4: Subscription enters Past Due status
- AC5: Access may be suspended during retry period

#### REQ-SUB-021: Update Payment Method [Phase 5]
The system SHALL allow users to update payment methods.

**Acceptance Criteria:**
- AC1: New payment method is validated
- AC2: PaymentMethodUpdated event is published
- AC3: Next billing uses updated method
- AC4: Previous method is archived

### 2.6 Subscription Access Control

#### REQ-SUB-022: Validate Subscription Access [Phase 5]
The system SHALL validate user subscription status for access control.

**Acceptance Criteria:**
- AC1: Access check verifies active subscription
- AC2: Tier-based permissions are evaluated
- AC3: Expired or cancelled subscriptions deny access
- AC4: AccessValidated event is logged
- AC5: Performance is optimized with caching

#### REQ-SUB-023: Course Access by Tier [Phase 5]
The system SHALL restrict course access based on membership tier.

**Acceptance Criteria:**
- AC1: Free tier has no course access
- AC2: Basic tier accesses designated courses
- AC3: Premium tier accesses all courses
- AC4: Enterprise tier includes team courses
- AC5: CourseAccessGranted/Denied events are published

#### REQ-SUB-024: Feature Access by Tier [Phase 5]
The system SHALL restrict feature access based on membership tier.

**Acceptance Criteria:**
- AC1: Certificate generation requires Premium or higher
- AC2: Offline downloads require Premium or higher
- AC3: Priority support requires Enterprise tier
- AC4: FeatureAccessValidated event is logged

### 2.7 Billing History and Invoicing

#### REQ-SUB-025: Record Billing Transactions [Phase 5]
The system SHALL record all billing transactions.

**Acceptance Criteria:**
- AC1: Transaction includes amount, date, status
- AC2: Invoice number is auto-generated
- AC3: BillingTransactionRecorded event is published
- AC4: Transactions are immutable after creation

#### REQ-SUB-026: Generate Invoices [Phase 5]
The system SHALL generate invoices for subscription payments.

**Acceptance Criteria:**
- AC1: Invoice includes itemized charges
- AC2: Tax calculations are included
- AC3: PDF invoice is generated
- AC4: InvoiceGenerated event is published
- AC5: Invoice is accessible to user

#### REQ-SUB-027: Billing History Query [Phase 5]
The system SHALL provide billing history access.

**Acceptance Criteria:**
- AC1: Users can view all transactions
- AC2: Filtering by date range is supported
- AC3: Invoices can be downloaded
- AC4: Pagination is implemented

### 2.8 Subscription Analytics

#### REQ-SUB-028: Track Subscription Metrics [Phase 5]
The system SHALL track subscription analytics.

**Acceptance Criteria:**
- AC1: Metrics include: new subscriptions, cancellations, upgrades
- AC2: Monthly Recurring Revenue (MRR) is calculated
- AC3: Churn rate is tracked
- AC4: SubscriptionMetricsUpdated event is published

#### REQ-SUB-029: Revenue Reporting [Phase 5]
The system SHALL provide subscription revenue reports.

**Acceptance Criteria:**
- AC1: Reports by time period
- AC2: Reports by tier
- AC3: Reports by plan
- AC4: Export to CSV/PDF

### 2.9 Subscription Notifications

#### REQ-SUB-030: Renewal Reminders [Phase 5]
The system SHALL send subscription renewal reminders.

**Acceptance Criteria:**
- AC1: Reminder sent 7 days before renewal
- AC2: Reminder sent 1 day before renewal
- AC3: RenewalReminderSent event is published
- AC4: User preferences are respected

#### REQ-SUB-031: Payment Failure Notifications [Phase 5]
The system SHALL notify users of payment failures.

**Acceptance Criteria:**
- AC1: Immediate notification on failure
- AC2: Retry schedule is communicated
- AC3: PaymentFailureNotificationSent event is published
- AC4: Link to update payment method included

#### REQ-SUB-032: Subscription Status Changes [Phase 5]
The system SHALL notify users of subscription status changes.

**Acceptance Criteria:**
- AC1: Notifications for activation, cancellation, expiration
- AC2: Notifications for upgrades and downgrades
- AC3: SubscriptionStatusNotificationSent event is published
- AC4: Email and in-app notifications

---

## 3. Domain Model

### 3.1 Entities

| Entity | Description |
|--------|-------------|
| Subscription | User subscription to a plan |
| SubscriptionPlan | Available subscription offering |
| BillingCycle | Recurring billing period configuration |
| BillingTransaction | Record of payment transaction |
| Invoice | Generated billing invoice |
| PaymentMethod | Stored payment information |

### 3.2 Value Objects

| Value Object | Description |
|--------------|-------------|
| MembershipTier | Tier level with access permissions |
| Money | Amount with currency |
| BillingPeriod | Start and end dates for billing |

### 3.3 Enumerations

| Enumeration | Values |
|-------------|--------|
| SubscriptionStatus | Pending, Active, Cancelled, Expired, PastDue, Suspended |
| SubscriptionPlanStatus | Draft, Active, Inactive, Archived |
| BillingCycleType | Monthly, Quarterly, Yearly |
| MembershipTierLevel | Free, Basic, Premium, Enterprise |
| PaymentStatus | Pending, Completed, Failed, Refunded |

### 3.4 Domain Events

| Event | Trigger |
|-------|---------|
| SubscriptionPlanCreated | New plan created |
| SubscriptionPlanUpdated | Plan details updated |
| SubscriptionPlanActivated | Plan activated |
| SubscriptionPlanDeactivated | Plan deactivated |
| SubscriptionPlanDeleted | Plan deleted |
| UserSubscribed | User subscribes to plan |
| SubscriptionPaymentProcessed | Payment processed |
| SubscriptionPaymentFailed | Payment failed |
| SubscriptionActivated | Subscription activated |
| SubscriptionCancelled | Subscription cancelled |
| SubscriptionReactivated | Subscription reactivated |
| SubscriptionExpired | Subscription expired |
| SubscriptionUpgraded | Tier upgraded |
| SubscriptionDowngraded | Tier downgraded |
| ProrationCalculated | Proration calculated |
| RecurringBillingProcessed | Billing cycle processed |
| PaymentRetryAttempted | Payment retry attempted |
| PaymentMethodUpdated | Payment method changed |
| BillingTransactionRecorded | Transaction recorded |
| InvoiceGenerated | Invoice created |
| SubscriptionMetricsUpdated | Analytics updated |
| RenewalReminderSent | Reminder sent |
| PaymentFailureNotificationSent | Failure notification sent |
| SubscriptionStatusNotificationSent | Status change notification |

---

## 4. API Endpoints

### 4.1 Subscription Plans (Admin)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/admin/subscription-plans | List all plans |
| GET | /api/admin/subscription-plans/{id} | Get plan details |
| POST | /api/admin/subscription-plans | Create plan |
| PUT | /api/admin/subscription-plans/{id} | Update plan |
| DELETE | /api/admin/subscription-plans/{id} | Delete plan |
| POST | /api/admin/subscription-plans/{id}/activate | Activate plan |
| POST | /api/admin/subscription-plans/{id}/deactivate | Deactivate plan |

### 4.2 Active Plans (Public)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/subscription-plans | List active plans |
| GET | /api/subscription-plans/{id} | Get plan details |

### 4.3 User Subscriptions

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/subscriptions/my | Get current subscription |
| POST | /api/subscriptions/subscribe | Subscribe to plan |
| POST | /api/subscriptions/cancel | Cancel subscription |
| POST | /api/subscriptions/reactivate | Reactivate subscription |
| POST | /api/subscriptions/upgrade | Upgrade tier |
| POST | /api/subscriptions/downgrade | Downgrade tier |
| PUT | /api/subscriptions/payment-method | Update payment method |

### 4.4 Billing History

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/billing/history | Get billing history |
| GET | /api/billing/invoices/{id} | Get invoice details |
| GET | /api/billing/invoices/{id}/pdf | Download invoice PDF |

### 4.5 Subscription Validation

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/subscriptions/validate-access | Validate current access |
| GET | /api/subscriptions/tier-features | Get current tier features |

---

## 5. Business Rules

- Only authenticated users can subscribe to plans
- A user can have only one active subscription at a time
- Subscription plans must have unique names per billing cycle
- Free tier is automatically assigned to all users
- Payment method is required for paid tiers
- Cancelled subscriptions retain access until period end
- Expired subscriptions revert user to Free tier
- Upgrades are processed immediately with proration
- Downgrades take effect at next billing cycle
- Failed payments trigger retry attempts before suspension
- Suspended subscriptions can be restored by updating payment method
- Invoices are generated for all successful payments
- Subscription analytics are updated in real-time
- Admins can override subscription status for support purposes

---

## 6. Integration Requirements

### 6.1 Payment Gateway
- Stripe or PayPal integration for payment processing
- Support for recurring payment profiles
- Webhook handling for payment events
- PCI compliance for payment data

### 6.2 Email Service
- Transactional emails for subscription events
- Renewal reminders
- Payment failure notifications
- Invoice delivery

### 6.3 Tax Calculation
- Integration with tax calculation service
- Support for VAT/GST
- Geographic tax rules

---

## 7. Implementation Notes

Per the implementation specification:
- All data access uses ICoursesPlatformContext directly without repository pattern
- Commands and Queries use MediatR CQRS pattern
- Services are placed in CoursesPlatform.Core\Services when possible
- Domain events are published for all subscription state changes
- Structured logging with Serilog for all subscription operations
- No AutoMapper - use ToDto extension methods in API layer

---

## 8. Security Considerations

- Subscription validation must be performed server-side
- Payment method data must be encrypted at rest
- Access tokens should be short-lived and tier-specific
- Audit logging for all subscription changes
- Rate limiting on subscription API endpoints
- GDPR compliance for subscription data

---

*Document Version: 1.0*
*Phase Coverage: Phase 5 (Enterprise Feature)*
