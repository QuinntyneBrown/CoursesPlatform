# Pricing & Promotions - Frontend Specification

**Feature:** Pricing & Promotions
**Version:** 1.0
**Last Updated:** December 2024

---

## 1. Overview

The Pricing & Promotions frontend provides user interfaces for setting course prices, creating coupons and promotions, managing bundles, and applying discounts during checkout.

---

## 2. Requirements

### 2.1 Course Pricing Management

#### REQ-PRC-FE-001: Pricing Settings Page [Phase 3]
The application SHALL provide a course pricing management page for instructors.

**Acceptance Criteria:**
- AC1: Page displays current course price
- AC2: Form allows setting/updating base price in USD
- AC3: Currency symbol is displayed based on user preference
- AC4: Price input validates range ($0.00-$999.99)
- AC5: Success notification on price update
- AC6: Price history table shows previous prices with timestamps

#### REQ-PRC-FE-002: Regional Pricing Configuration [Phase 3]
The application SHALL provide regional pricing interface.

**Acceptance Criteria:**
- AC1: Page displays list of supported regions
- AC2: Instructor can set custom price per region
- AC3: Suggested prices based on base price are shown
- AC4: Form validates regional price is within 50%-150% of base
- AC5: Regional prices are displayed in local currency
- AC6: Save/Reset buttons are provided

#### REQ-PRC-FE-003: Free Course Toggle [Phase 3]
The application SHALL provide option to make course free.

**Acceptance Criteria:**
- AC1: Toggle switch sets price to $0.00
- AC2: Disabling free mode restores previous price
- AC3: Confirmation dialog shows before making paid course free
- AC4: Badge indicates free course in course list
- AC5: Regional pricing is disabled for free courses

### 2.2 Coupon Management

#### REQ-PRC-FE-004: Create Coupon Page [Phase 3]
The application SHALL provide a coupon creation page.

**Acceptance Criteria:**
- AC1: Form includes coupon code input (4-20 alphanumeric)
- AC2: Discount type selector (percentage/fixed amount)
- AC3: Discount value input with validation
- AC4: Expiration date/time picker
- AC5: Usage limit input (optional)
- AC6: Course selection multi-select dropdown
- AC7: Code uniqueness is validated in real-time

#### REQ-PRC-FE-005: Coupon List Page [Phase 3]
The application SHALL display list of coupons.

**Acceptance Criteria:**
- AC1: Table shows code, discount, expiration, usage count
- AC2: Filter by status (active/expired/deactivated)
- AC3: Search by coupon code
- AC4: Sort by creation date, expiration, usage
- AC5: Actions menu for edit/deactivate/view analytics
- AC6: Status badge (active/expired/deactivated)

#### REQ-PRC-FE-006: Coupon Analytics Dashboard [Phase 4]
The application SHALL display coupon usage analytics.

**Acceptance Criteria:**
- AC1: Total redemptions count
- AC2: Revenue impact chart
- AC3: Conversion rate percentage
- AC4: Time-series usage graph
- AC5: Top performing coupons list
- AC6: Export analytics to CSV

### 2.3 Promotion Management

#### REQ-PRC-FE-007: Create Promotion Page [Phase 3]
The application SHALL provide a promotion creation page.

**Acceptance Criteria:**
- AC1: Form includes name and description inputs
- AC2: Start date/time and end date/time pickers
- AC3: Discount type and value inputs
- AC4: Course/category selection
- AC5: Promotion type selector (regular/flash sale)
- AC6: Preview shows how promotion will display
- AC7: Schedule validation ensures end after start

#### REQ-PRC-FE-008: Promotion Calendar View [Phase 3]
The application SHALL display promotions in calendar format.

**Acceptance Criteria:**
- AC1: Calendar shows scheduled promotions
- AC2: Active promotions are highlighted
- AC3: Click event opens promotion details
- AC4: Month/week/day view options
- AC5: Color coding by promotion type
- AC6: Conflicts are indicated if overlapping

#### REQ-PRC-FE-009: Flash Sale Creation [Phase 3]
The application SHALL provide flash sale creation interface.

**Acceptance Criteria:**
- AC1: Duration selector (1-24 hours)
- AC2: Countdown timer preview
- AC3: Urgency messaging configuration
- AC4: Push notification option
- AC5: Template selection for common flash sales
- AC6: Instant start or scheduled start options

### 2.4 Bundle Management

#### REQ-PRC-FE-010: Create Bundle Page [Phase 3]
The application SHALL provide a bundle creation page.

**Acceptance Criteria:**
- AC1: Form includes bundle name and description
- AC2: Multi-select for instructor's courses
- AC3: Minimum 2 courses required validation
- AC4: Bundle price input with savings calculator
- AC5: Preview shows bundle card as it will appear
- AC6: Savings percentage auto-calculated and displayed

#### REQ-PRC-FE-011: Bundle Editor [Phase 3]
The application SHALL allow editing bundle composition.

**Acceptance Criteria:**
- AC1: Drag-and-drop to reorder courses
- AC2: Add/remove courses from bundle
- AC3: Price adjustment with savings validation
- AC4: Preview updates in real-time
- AC5: Deactivate bundle option with confirmation
- AC6: Changes are saved incrementally

#### REQ-PRC-FE-012: Bundle Display Card [Phase 3]
The application SHALL display bundle information in course listings.

**Acceptance Criteria:**
- AC1: Bundle card shows all included courses
- AC2: Total value (sum of individual prices) displayed
- AC3: Bundle price with savings badge
- AC4: Course thumbnails shown in grid
- AC5: Hover shows brief course descriptions
- AC6: Add to cart button for entire bundle

### 2.5 Checkout & Discounts

#### REQ-PRC-FE-013: Coupon Application [Phase 3]
The application SHALL provide coupon input during checkout.

**Acceptance Criteria:**
- AC1: Coupon code input field in checkout
- AC2: Apply button validates and applies coupon
- AC3: Success message shows discount amount
- AC4: Error message for invalid/expired coupons
- AC5: Remove coupon option available
- AC6: Discount is reflected in price breakdown

#### REQ-PRC-FE-014: Price Breakdown Display [Phase 3]
The application SHALL display detailed price breakdown at checkout.

**Acceptance Criteria:**
- AC1: Original price(s) shown
- AC2: Promotional discount line item if applicable
- AC3: Coupon discount line item if applied
- AC4: Tax amount line item if applicable
- AC5: Final total prominently displayed
- AC6: Savings summary highlighted

#### REQ-PRC-FE-015: Promotional Badge Display [Phase 3]
The application SHALL display promotion indicators on course cards.

**Acceptance Criteria:**
- AC1: Original price shown with strikethrough
- AC2: Promotional price in larger font
- AC3: Discount percentage badge
- AC4: Countdown timer for time-limited offers
- AC5: "Flash Sale" badge for flash sales
- AC6: Promotion end time displayed

---

## 3. Component Architecture

### 3.1 Pages

| Component | Route | Description |
|-----------|-------|-------------|
| CoursePricingPage | /instructor/courses/{id}/pricing | Course pricing settings |
| CouponCreatePage | /instructor/coupons/new | Create new coupon |
| CouponListPage | /instructor/coupons | List all coupons |
| CouponAnalyticsPage | /instructor/coupons/{code}/analytics | Coupon performance |
| PromotionCreatePage | /admin/promotions/new | Create promotion |
| PromotionListPage | /admin/promotions | List promotions |
| PromotionCalendarPage | /admin/promotions/calendar | Calendar view |
| BundleCreatePage | /instructor/bundles/new | Create bundle |
| BundleListPage | /instructor/bundles | List bundles |
| BundleEditPage | /instructor/bundles/{id}/edit | Edit bundle |
| CheckoutPage | /checkout | Checkout with discounts |

### 3.2 Components

| Component | Description |
|-----------|-------------|
| PriceInput | Price input with currency formatting |
| RegionalPricingForm | Regional price configuration |
| CouponForm | Coupon creation/edit form |
| CouponCodeInput | Coupon code input with validation |
| PromotionForm | Promotion creation/edit form |
| PromotionCalendar | Calendar view for promotions |
| BundleForm | Bundle creation/edit form |
| BundleCard | Bundle display card |
| PriceBreakdown | Checkout price breakdown |
| PromotionalBadge | Promotion indicator badge |
| CountdownTimer | Time-limited offer countdown |
| DiscountCalculator | Savings calculator component |

### 3.3 Services

| Service | Description |
|---------|-------------|
| PricingService | Course pricing API calls |
| CouponService | Coupon management API calls |
| PromotionService | Promotion management API calls |
| BundleService | Bundle management API calls |
| CheckoutService | Checkout and price calculation API calls |

---

## 4. State Management

Per REQ-FE-009, state management SHALL use RxJS (not NgRx or Signals).

### 4.1 Pricing State

```typescript
interface PricingState {
  currentPrice: CoursePrice | null;
  regionalPrices: RegionalPrice[];
  priceHistory: PriceHistory[];
  isLoading: boolean;
  error: string | null;
}
```

### 4.2 Coupon State

```typescript
interface CouponState {
  coupons: Coupon[];
  activeCoupon: Coupon | null;
  analytics: CouponAnalytics | null;
  isLoading: boolean;
}
```

### 4.3 Promotion State

```typescript
interface PromotionState {
  promotions: Promotion[];
  activePromotions: Promotion[];
  selectedPromotion: Promotion | null;
  isLoading: boolean;
}
```

### 4.4 Checkout State

```typescript
interface CheckoutState {
  cartItems: CartItem[];
  appliedCoupon: Coupon | null;
  activePromotions: Promotion[];
  priceBreakdown: PriceBreakdown | null;
  total: number;
}
```

---

## 5. UI/UX Requirements

### 5.1 Design System

Per REQ-FE-006 and REQ-FE-010, the application SHALL use Angular Material with Material 3 guidelines and default theme colors.

### 5.2 Responsive Design

Per REQ-FE-018, all pages SHALL be responsive and follow mobile-first design:
- Mobile: Single column layout, stacked price details
- Tablet: Two column layout for forms
- Desktop: Multi-column dashboard layouts

### 5.3 Accessibility

- Price information MUST be readable by screen readers
- Currency symbols MUST have proper ARIA labels
- Form inputs MUST have clear labels
- Error messages MUST be associated with fields
- Countdown timers MUST not auto-update screen readers excessively

### 5.4 Component Naming

Per REQ-FE-012 and REQ-FE-013:
- Class names SHALL NOT have "Component" suffix
- File names SHALL NOT have "component" prefix

---

## 6. Form Validation

### 6.1 Price Validation
- Required
- Minimum $0.00
- Maximum $999.99
- Maximum 2 decimal places
- Must be numeric

### 6.2 Coupon Code Validation
- Required
- Minimum 4 characters
- Maximum 20 characters
- Alphanumeric only
- Case-insensitive
- Uniqueness checked

### 6.3 Discount Validation
- Required
- Percentage: 1-100%
- Fixed: $0.01 to course price
- Must be positive

### 6.4 Date Validation
- Expiration date must be in future
- End date must be after start date
- Flash sale maximum 24 hours

---

## 7. Error Handling

### 7.1 API Errors

| Error Code | User Message |
|------------|--------------|
| 400 | Invalid price or discount value. |
| 404 | Course, coupon, or promotion not found. |
| 409 | Coupon code already exists. |
| 422 | Validation failed. Please check your input. |
| 500 | Unable to process request. Please try again. |

### 7.2 Validation Errors

- Display inline below the field
- Use red color for error state
- Clear error when field is corrected
- Show field-specific error messages

### 7.3 Coupon Errors

| Scenario | User Message |
|----------|--------------|
| Invalid code | Coupon code is invalid. |
| Expired | This coupon has expired. |
| Usage limit | This coupon has reached its usage limit. |
| Not applicable | This coupon cannot be applied to your cart. |
| Already used | You have already used this coupon. |

---

## 8. Testing Requirements

### 8.1 Unit Tests (Jest)

Per REQ-FE-021, unit tests SHALL use Jest:
- Test price calculation logic
- Test discount application
- Test coupon validation
- Test form validations
- Test state management
- Minimum 80% code coverage

### 8.2 E2E Tests (Playwright)

Per REQ-FE-022, E2E tests SHALL use Playwright:
- Test setting course price
- Test creating and applying coupon
- Test promotion scheduling
- Test bundle purchase flow
- Test checkout with discounts

---

## 9. Implementation Notes

### 9.1 API Base URL

Per REQ-FE-026, the baseUrl configuration SHALL contain ONLY the base URI:
```typescript
// Correct
baseUrl = "http://localhost:7200"
this.http.post(`${baseUrl}/api/coupons`, data)

// Incorrect
baseUrl = "http://localhost:7200/api"
```

### 9.2 Price Formatting

All prices SHALL be formatted using locale-specific number formatting:
```typescript
// Use Intl.NumberFormat for currency display
const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD'
});
```

### 9.3 File Structure

Per REQ-FE-015 and REQ-FE-016:
- Pages in `pages/` folder
- Reusable components in `components/` folder
- Barrel exports in each folder

---

*Document Version: 1.0*
*Phase Coverage: 3-4*
