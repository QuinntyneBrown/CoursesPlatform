# Pricing & Promotions - Backend Specification

**Feature:** Pricing & Promotions
**Version:** 1.0
**Last Updated:** December 2024

---

## 1. Overview

The Pricing & Promotions feature provides course pricing management, coupon creation and redemption, promotional campaigns, and bundle offerings for the CoursesPlatform system.

---

## 2. Requirements

### 2.1 Course Pricing

#### REQ-PRC-001: Set Course Base Price [Phase 3]
The system SHALL allow instructors to set a base price for their courses.

**Acceptance Criteria:**
- AC1: Instructor can set base price in USD
- AC2: Price must be between $0.00 and $999.99
- AC3: Free courses can be set with $0.00 price
- AC4: CoursePriceSet event is published
- AC5: Price changes are logged with timestamp and user

#### REQ-PRC-002: Update Course Price [Phase 3]
The system SHALL allow instructors to update course pricing.

**Acceptance Criteria:**
- AC1: Instructor can update price for their own courses
- AC2: Price changes do not affect existing enrollments
- AC3: CoursePriceUpdated event is published
- AC4: Price history is maintained for auditing
- AC5: Minimum 24-hour notice before price increases

#### REQ-PRC-003: Regional Pricing [Phase 3]
The system SHALL support regional pricing for different markets.

**Acceptance Criteria:**
- AC1: Instructors can set prices for specific regions (US, EU, UK, IN, BR, etc.)
- AC2: Regional prices override base price
- AC3: System automatically detects user region from IP or profile
- AC4: RegionalPriceSet event is published
- AC5: Regional price must be within 50%-150% of base price

#### REQ-PRC-004: Currency Conversion [Phase 3]
The system SHALL display prices in user's preferred currency.

**Acceptance Criteria:**
- AC1: System supports USD, EUR, GBP, INR, BRL currencies
- AC2: Exchange rates are updated daily
- AC3: Prices are converted and displayed in user's currency
- AC4: Original pricing currency is preserved in database
- AC5: Conversion rates are logged for audit trail

#### REQ-PRC-005: Pricing Tiers [Phase 4]
The system SHALL support pricing tiers for volume purchases.

**Acceptance Criteria:**
- AC1: Instructors can create pricing tiers (e.g., 1-10 seats, 11-50 seats)
- AC2: Tier pricing applies to team/enterprise purchases
- AC3: PricingTierCreated event is published
- AC4: Discount percentage increases with tier level

### 2.2 Coupons

#### REQ-PRC-006: Create Coupon [Phase 3]
The system SHALL allow administrators and instructors to create discount coupons.

**Acceptance Criteria:**
- AC1: User can create coupon with unique code (4-20 alphanumeric chars)
- AC2: Coupon can be percentage (0-100%) or fixed amount discount
- AC3: Coupon has expiration date/time
- AC4: CouponCreated event is published
- AC5: Coupon code must be unique across the system

#### REQ-PRC-007: Coupon Restrictions [Phase 3]
The system SHALL support restrictions on coupon usage.

**Acceptance Criteria:**
- AC1: Maximum usage count can be set (e.g., 100 redemptions)
- AC2: Minimum purchase amount can be required
- AC3: Coupon can be restricted to specific courses or categories
- AC4: First-time users only restriction is supported
- AC5: One coupon per user enforcement is supported

#### REQ-PRC-008: Redeem Coupon [Phase 3]
The system SHALL allow users to apply coupons during checkout.

**Acceptance Criteria:**
- AC1: User can enter coupon code at checkout
- AC2: System validates coupon is active and not expired
- AC3: System checks usage limits not exceeded
- AC4: Discount is applied to cart total
- AC5: CouponRedeemed event is published
- AC6: Coupon redemption count is incremented

#### REQ-PRC-009: Coupon Deactivation [Phase 3]
The system SHALL allow deactivating coupons before expiration.

**Acceptance Criteria:**
- AC1: Creator can deactivate active coupons
- AC2: Deactivated coupons cannot be redeemed
- AC3: CouponDeactivated event is published
- AC4: Deactivation reason can be provided
- AC5: Active enrollments with coupon are not affected

#### REQ-PRC-010: Coupon Analytics [Phase 4]
The system SHALL track coupon usage analytics.

**Acceptance Criteria:**
- AC1: System tracks total redemptions per coupon
- AC2: System tracks total revenue impact
- AC3: System tracks conversion rate
- AC4: CouponAnalyticsGenerated event is published
- AC5: Analytics are available to coupon creator

### 2.3 Promotions

#### REQ-PRC-011: Create Promotion [Phase 3]
The system SHALL allow creating promotional campaigns.

**Acceptance Criteria:**
- AC1: Administrator can create time-limited promotions
- AC2: Promotion has name, description, start and end date/time
- AC3: Promotion applies to selected courses or categories
- AC4: Discount can be percentage or fixed amount
- AC5: PromotionCreated event is published

#### REQ-PRC-012: Schedule Promotion [Phase 3]
The system SHALL automatically activate and deactivate promotions.

**Acceptance Criteria:**
- AC1: Promotion activates automatically at start date/time
- AC2: Promotion deactivates automatically at end date/time
- AC3: PromotionActivated event is published at start
- AC4: PromotionDeactivated event is published at end
- AC5: System processes scheduled promotions every minute

#### REQ-PRC-013: Flash Sales [Phase 3]
The system SHALL support flash sale events.

**Acceptance Criteria:**
- AC1: Flash sales are short-duration promotions (1-24 hours)
- AC2: Flash sales display countdown timer
- AC3: FlashSaleStarted event is published
- AC4: FlashSaleEnded event is published
- AC5: Flash sale urgency is indicated in UI

#### REQ-PRC-014: Promotional Pricing Display [Phase 3]
The system SHALL display promotional prices on course listings.

**Acceptance Criteria:**
- AC1: Original price is shown with strikethrough
- AC2: Promotional price is prominently displayed
- AC3: Promotion end date is shown
- AC4: Savings amount/percentage is calculated
- AC5: Active promotion badge is displayed

#### REQ-PRC-015: Promotion Stacking Rules [Phase 3]
The system SHALL define rules for stacking promotions and coupons.

**Acceptance Criteria:**
- AC1: By default, only one discount applies (best for customer)
- AC2: Administrators can enable promotion + coupon stacking
- AC3: Maximum total discount is 95%
- AC4: Stacking rules are validated at checkout
- AC5: PromotionStackingApplied event is published

### 2.4 Bundles

#### REQ-PRC-016: Create Course Bundle [Phase 3]
The system SHALL allow creating bundles of multiple courses.

**Acceptance Criteria:**
- AC1: Instructor can bundle 2 or more courses
- AC2: Bundle has unique name and description
- AC3: Bundle price is set (typically less than sum of courses)
- AC4: BundleCreated event is published
- AC5: Bundle can only include courses by same instructor

#### REQ-PRC-017: Bundle Pricing [Phase 3]
The system SHALL calculate and display bundle savings.

**Acceptance Criteria:**
- AC1: System calculates sum of individual course prices
- AC2: Bundle savings percentage is displayed
- AC3: Bundle price must be less than total individual prices
- AC4: Minimum 10% savings required for bundle
- AC5: BundlePriceSet event is published

#### REQ-PRC-018: Purchase Bundle [Phase 3]
The system SHALL allow users to purchase course bundles.

**Acceptance Criteria:**
- AC1: User can add bundle to cart
- AC2: All courses in bundle are enrolled upon purchase
- AC3: BundlePurchased event is published
- AC4: Individual course enrollments are created
- AC5: Certificate eligibility applies to each course

#### REQ-PRC-019: Bundle Management [Phase 3]
The system SHALL allow updating bundle composition.

**Acceptance Criteria:**
- AC1: Instructor can add/remove courses from bundle
- AC2: Changes do not affect previous purchases
- AC3: BundleUpdated event is published
- AC4: Bundle can be deactivated
- AC5: BundleDeactivated event is published

#### REQ-PRC-020: Bundle Analytics [Phase 4]
The system SHALL track bundle performance metrics.

**Acceptance Criteria:**
- AC1: System tracks bundle purchase count
- AC2: System tracks revenue from bundles
- AC3: System compares bundle vs individual purchases
- AC4: BundleAnalyticsGenerated event is published
- AC5: Analytics are available to bundle creator

### 2.5 Payment Integration

#### REQ-PRC-021: Calculate Final Price [Phase 3]
The system SHALL calculate final price with all discounts applied.

**Acceptance Criteria:**
- AC1: System applies regional pricing if available
- AC2: System applies active promotion if available
- AC3: System applies coupon discount if provided
- AC4: System validates minimum price ($0.00)
- AC5: PriceCalculated event is published with breakdown

#### REQ-PRC-022: Tax Calculation [Phase 4]
The system SHALL calculate applicable taxes based on user location.

**Acceptance Criteria:**
- AC1: System determines tax jurisdiction from user address
- AC2: VAT is applied for EU users (rate per country)
- AC3: GST is applied for Indian users
- AC4: Sales tax is applied for US users (state-specific)
- AC5: TaxCalculated event is published

#### REQ-PRC-023: Refund Processing [Phase 4]
The system SHALL process refunds with coupon handling.

**Acceptance Criteria:**
- AC1: Refunds restore coupon usage if applicable
- AC2: RefundProcessed event is published
- AC3: Promotional discounts are included in refund calculation
- AC4: Coupon is marked as unused if within policy
- AC5: Refund amount matches original payment amount

---

## 3. Domain Model

### 3.1 Entities

| Entity | Description |
|--------|-------------|
| CoursePrice | Base and regional pricing for a course |
| PriceTier | Volume-based pricing tier |
| Coupon | Discount coupon with restrictions |
| CouponRedemption | Record of coupon usage |
| Promotion | Time-based promotional campaign |
| PromotionCourse | Course included in promotion |
| Bundle | Collection of courses with discounted price |
| BundleCourse | Course included in a bundle |
| PriceHistory | Audit log of price changes |

### 3.2 Domain Events

| Event | Trigger |
|-------|---------|
| CoursePriceSet | Initial price is set |
| CoursePriceUpdated | Price is changed |
| RegionalPriceSet | Regional price is configured |
| PricingTierCreated | Tier pricing is added |
| CouponCreated | New coupon is created |
| CouponRedeemed | Coupon is applied to purchase |
| CouponDeactivated | Coupon is disabled |
| CouponExpired | Coupon reaches expiration |
| CouponAnalyticsGenerated | Coupon stats calculated |
| PromotionCreated | New promotion is created |
| PromotionActivated | Promotion start time reached |
| PromotionDeactivated | Promotion end time reached |
| FlashSaleStarted | Flash sale begins |
| FlashSaleEnded | Flash sale concludes |
| PromotionStackingApplied | Multiple discounts combined |
| BundleCreated | New bundle is created |
| BundleUpdated | Bundle composition changed |
| BundleDeactivated | Bundle is disabled |
| BundlePriceSet | Bundle price is set |
| BundlePurchased | Bundle is purchased |
| BundleAnalyticsGenerated | Bundle stats calculated |
| PriceCalculated | Final price computed |
| TaxCalculated | Tax amount determined |
| RefundProcessed | Refund completed |

---

## 4. API Endpoints

### 4.1 Course Pricing

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/courses/{id}/pricing | Set course base price |
| PUT | /api/courses/{id}/pricing | Update course price |
| POST | /api/courses/{id}/pricing/regional | Set regional price |
| GET | /api/courses/{id}/pricing | Get course pricing |
| GET | /api/courses/{id}/pricing/history | Get price history |

### 4.2 Coupons

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/coupons | Create coupon |
| GET | /api/coupons | List coupons |
| GET | /api/coupons/{code} | Get coupon details |
| PUT | /api/coupons/{code} | Update coupon |
| DELETE | /api/coupons/{code} | Deactivate coupon |
| POST | /api/coupons/{code}/validate | Validate coupon |
| GET | /api/coupons/{code}/analytics | Get coupon analytics |

### 4.3 Promotions

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/promotions | Create promotion |
| GET | /api/promotions | List promotions |
| GET | /api/promotions/{id} | Get promotion details |
| PUT | /api/promotions/{id} | Update promotion |
| DELETE | /api/promotions/{id} | Deactivate promotion |
| GET | /api/promotions/active | Get active promotions |
| POST | /api/promotions/flash-sale | Create flash sale |

### 4.4 Bundles

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/bundles | Create bundle |
| GET | /api/bundles | List bundles |
| GET | /api/bundles/{id} | Get bundle details |
| PUT | /api/bundles/{id} | Update bundle |
| DELETE | /api/bundles/{id} | Deactivate bundle |
| POST | /api/bundles/{id}/courses | Add course to bundle |
| DELETE | /api/bundles/{id}/courses/{courseId} | Remove course from bundle |
| GET | /api/bundles/{id}/analytics | Get bundle analytics |

### 4.5 Checkout

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/checkout/calculate | Calculate final price |
| POST | /api/checkout/apply-coupon | Apply coupon to cart |
| POST | /api/checkout/remove-coupon | Remove coupon from cart |
| GET | /api/checkout/tax | Calculate tax amount |

---

## 5. Security Considerations

- Coupon codes MUST be case-insensitive but stored in uppercase
- Price manipulation attempts MUST be logged and flagged
- Negative prices MUST be rejected
- Discount stacking abuse MUST be monitored
- Coupon brute-force attempts MUST be rate-limited
- Administrative pricing endpoints MUST require elevated permissions

---

## 6. Dependencies

- Serilog for structured logging
- MediatR for CQRS pattern
- Entity Framework Core for data access
- FluentValidation for request validation
- Hangfire for scheduled promotion activation/deactivation
- External exchange rate API for currency conversion

---

## 7. Implementation Notes

Per the implementation specification (REQ-SYS-005, REQ-SYS-006), all data access SHALL use ICoursesPlatformContext directly without repository pattern.

Scheduled promotions SHALL be managed using Hangfire background jobs for reliable execution.

Price calculations SHALL always use decimal type to avoid floating-point precision issues.

---

*Document Version: 1.0*
*Phase Coverage: 3-4*
