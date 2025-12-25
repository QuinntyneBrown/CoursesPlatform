# Shopping & Cart - Backend Specification

**Feature:** Shopping & Cart
**Version:** 1.0
**Last Updated:** December 2024

---

## 1. Overview

The Shopping & Cart feature provides shopping cart management, wishlist functionality, coupon/discount application, and cart persistence for the CoursesPlatform system.

---

## 2. Requirements

### 2.1 Cart Management

#### REQ-SHP-001: Add Item to Cart [Phase 3]
The system SHALL allow users to add courses to their shopping cart.

**Acceptance Criteria:**
- AC1: User can add a course to cart
- AC2: System validates course exists and is published
- AC3: System prevents duplicate course additions
- AC4: System validates user is not already enrolled
- AC5: ItemAddedToCart event is published
- AC6: Cart total is recalculated

#### REQ-SHP-002: Remove Item from Cart [Phase 3]
The system SHALL allow users to remove courses from their shopping cart.

**Acceptance Criteria:**
- AC1: User can remove a course from cart
- AC2: ItemRemovedFromCart event is published
- AC3: Cart total is recalculated
- AC4: Empty cart is preserved for the session

#### REQ-SHP-003: Update Cart Item Quantity [Phase 3]
The system SHALL prevent multiple quantities of the same course in the cart.

**Acceptance Criteria:**
- AC1: Each course can only appear once in cart
- AC2: Quantity is always 1 for courses
- AC3: System validates business rules for course purchases

#### REQ-SHP-004: View Cart [Phase 3]
The system SHALL allow users to view their shopping cart contents.

**Acceptance Criteria:**
- AC1: User can retrieve all cart items
- AC2: Cart displays course details (title, price, thumbnail)
- AC3: Cart shows subtotal, discounts, and total
- AC4: Cart displays applied coupons
- AC5: Cart shows item count

#### REQ-SHP-005: Clear Cart [Phase 3]
The system SHALL allow users to clear all items from their cart.

**Acceptance Criteria:**
- AC1: User can clear entire cart
- AC2: CartCleared event is published
- AC3: All cart items are removed
- AC4: Applied coupons are removed
- AC5: Cart total is reset to zero

#### REQ-SHP-006: Cart Persistence [Phase 3]
The system SHALL persist cart data for authenticated users.

**Acceptance Criteria:**
- AC1: Cart is saved to database for logged-in users
- AC2: Cart is restored on subsequent logins
- AC3: Anonymous carts are stored in session/cookies
- AC4: Anonymous cart is merged with user cart on login
- AC5: CartMerged event is published on merge

#### REQ-SHP-007: Cart Expiration [Phase 3]
The system SHALL automatically expire inactive carts.

**Acceptance Criteria:**
- AC1: Carts expire after 30 days of inactivity
- AC2: Expired carts are marked as Expired status
- AC3: CartExpired event is published
- AC4: Expired carts can be restored within 7 days
- AC5: Expired items are removed from cart after grace period

#### REQ-SHP-008: Cart Abandonment Tracking [Phase 3]
The system SHALL track cart abandonment for marketing purposes.

**Acceptance Criteria:**
- AC1: System identifies abandoned carts (items added but not purchased within 24 hours)
- AC2: CartAbandoned event is published
- AC3: Abandonment reason is tracked (if provided)
- AC4: System tracks abandonment metrics per course
- AC5: Abandoned cart data is available for reporting

### 2.2 Coupons & Discounts

#### REQ-SHP-009: Coupon Creation [Phase 3]
The system SHALL allow administrators to create discount coupons.

**Acceptance Criteria:**
- AC1: Administrator can create coupon with code
- AC2: Coupon supports percentage or fixed amount discount
- AC3: Coupon has start and expiration dates
- AC4: Coupon has usage limit (total and per user)
- AC5: CouponCreated event is published
- AC6: Coupon can be course-specific or cart-wide

#### REQ-SHP-010: Apply Coupon to Cart [Phase 3]
The system SHALL allow users to apply discount coupons to their cart.

**Acceptance Criteria:**
- AC1: User can apply coupon by code
- AC2: System validates coupon exists and is active
- AC3: System validates coupon is not expired
- AC4: System validates usage limits not exceeded
- AC5: System validates minimum purchase requirements
- AC6: CouponApplied event is published
- AC7: Cart total is recalculated with discount
- AC8: Only one coupon can be applied at a time

#### REQ-SHP-011: Remove Coupon from Cart [Phase 3]
The system SHALL allow users to remove applied coupons.

**Acceptance Criteria:**
- AC1: User can remove applied coupon
- AC2: CouponRemoved event is published
- AC3: Cart total is recalculated without discount
- AC4: Coupon can be reapplied if still valid

#### REQ-SHP-012: Coupon Validation [Phase 3]
The system SHALL validate coupon eligibility when applied.

**Acceptance Criteria:**
- AC1: System checks coupon is active and not expired
- AC2: System checks user has not exceeded per-user limit
- AC3: System checks total usage limit not exceeded
- AC4: System checks minimum purchase amount is met
- AC5: System checks applicable courses are in cart
- AC6: CouponValidationFailed event is published on failure

#### REQ-SHP-013: Bulk Discount Rules [Phase 3]
The system SHALL support automatic bulk purchase discounts.

**Acceptance Criteria:**
- AC1: Discounts apply when purchasing multiple courses
- AC2: Bulk discount rules are configurable per instructor
- AC3: BulkDiscountApplied event is published
- AC4: Bulk discounts and coupons can be combined
- AC5: System shows savings from bulk discount

#### REQ-SHP-014: Price Override Prevention [Phase 3]
The system SHALL prevent price manipulation during checkout.

**Acceptance Criteria:**
- AC1: Cart stores course price at time of addition
- AC2: System validates price has not been tampered with
- AC3: Price changes during checkout trigger warning
- AC4: PriceValidationFailed event is published on mismatch
- AC5: User must confirm if price increased

### 2.3 Wishlist

#### REQ-SHP-015: Add to Wishlist [Phase 3]
The system SHALL allow users to add courses to their wishlist.

**Acceptance Criteria:**
- AC1: User can add course to wishlist
- AC2: System validates course exists
- AC3: System prevents duplicate wishlist additions
- AC4: ItemAddedToWishlist event is published
- AC5: Wishlist is stored per user

#### REQ-SHP-016: Remove from Wishlist [Phase 3]
The system SHALL allow users to remove courses from their wishlist.

**Acceptance Criteria:**
- AC1: User can remove course from wishlist
- AC2: ItemRemovedFromWishlist event is published
- AC3: Wishlist updates immediately

#### REQ-SHP-017: View Wishlist [Phase 3]
The system SHALL allow users to view their wishlist.

**Acceptance Criteria:**
- AC1: User can retrieve all wishlist items
- AC2: Wishlist displays course details
- AC3: Wishlist shows current prices
- AC4: Wishlist indicates if course is on sale
- AC5: Wishlist shows if user already owns course

#### REQ-SHP-018: Move Wishlist to Cart [Phase 3]
The system SHALL allow users to move items from wishlist to cart.

**Acceptance Criteria:**
- AC1: User can move item from wishlist to cart
- AC2: Item is removed from wishlist
- AC3: Item is added to cart
- AC4: ItemMovedToCart event is published
- AC5: System validates course is still available

#### REQ-SHP-019: Wishlist Notifications [Phase 3]
The system SHALL notify users about wishlist price changes.

**Acceptance Criteria:**
- AC1: System tracks price changes for wishlisted courses
- AC2: WishlistPriceDropDetected event is published
- AC3: User receives notification for price drops
- AC4: User can configure notification preferences
- AC5: System tracks notification delivery

#### REQ-SHP-020: Share Wishlist [Phase 4]
The system SHALL allow users to share their wishlist.

**Acceptance Criteria:**
- AC1: User can generate shareable wishlist link
- AC2: Shared wishlist is publicly viewable
- AC3: WishlistShared event is published
- AC4: User can revoke shared link
- AC5: Shared wishlist shows gift purchase options

### 2.4 Cart Analytics

#### REQ-SHP-021: Cart Metrics Tracking [Phase 3]
The system SHALL track cart and checkout metrics.

**Acceptance Criteria:**
- AC1: System tracks cart creation time
- AC2: System tracks items added/removed timestamps
- AC3: System tracks coupon usage
- AC4: System tracks cart-to-purchase conversion
- AC5: CartMetricsRecorded event is published

#### REQ-SHP-022: Abandonment Analysis [Phase 3]
The system SHALL provide cart abandonment analytics.

**Acceptance Criteria:**
- AC1: System calculates abandonment rate by course
- AC2: System tracks abandonment reasons
- AC3: System identifies abandonment patterns
- AC4: Data is available for reporting dashboard
- AC5: AbandonmentAnalysisCompleted event is published

---

## 3. Domain Model

### 3.1 Entities

| Entity | Description |
|--------|-------------|
| Cart | Shopping cart containing course items |
| CartItem | Individual course in a cart |
| Coupon | Discount coupon with rules and limits |
| CouponUsage | Track of coupon usage by users |
| Wishlist | User's saved courses for later |
| WishlistItem | Individual course in wishlist |
| BulkDiscountRule | Automatic discount rules |

### 3.2 Domain Events

| Event | Trigger |
|-------|---------|
| CartCreated | New cart is created |
| ItemAddedToCart | Course added to cart |
| ItemRemovedFromCart | Course removed from cart |
| CartCleared | All items removed from cart |
| CartMerged | Anonymous cart merged with user cart |
| CartExpired | Cart inactive for 30 days |
| CartAbandoned | Cart not purchased within 24 hours |
| CartRestored | Expired cart restored |
| CouponCreated | New coupon created |
| CouponUpdated | Coupon details modified |
| CouponDeactivated | Coupon disabled |
| CouponApplied | Coupon applied to cart |
| CouponRemoved | Coupon removed from cart |
| CouponValidationFailed | Coupon validation failed |
| CouponUsageLimitReached | Coupon max usage reached |
| BulkDiscountApplied | Bulk discount applied |
| PriceValidationFailed | Price mismatch detected |
| ItemAddedToWishlist | Course added to wishlist |
| ItemRemovedFromWishlist | Course removed from wishlist |
| ItemMovedToCart | Wishlist item moved to cart |
| WishlistPriceDropDetected | Wishlist item price decreased |
| WishlistShared | Wishlist shared publicly |
| CartMetricsRecorded | Cart metrics captured |
| AbandonmentAnalysisCompleted | Abandonment analysis finished |

---

## 4. API Endpoints

### 4.1 Cart Management

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/cart | Get current user's cart |
| POST | /api/cart/items | Add item to cart |
| DELETE | /api/cart/items/{courseId} | Remove item from cart |
| DELETE | /api/cart | Clear entire cart |
| POST | /api/cart/merge | Merge anonymous cart with user cart |

### 4.2 Coupons

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/cart/coupons | Apply coupon to cart |
| DELETE | /api/cart/coupons/{code} | Remove coupon from cart |
| POST | /api/coupons | Create coupon (Admin) |
| PUT | /api/coupons/{id} | Update coupon (Admin) |
| GET | /api/coupons/{code}/validate | Validate coupon code |
| DELETE | /api/coupons/{id} | Deactivate coupon (Admin) |

### 4.3 Wishlist

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/wishlist | Get user's wishlist |
| POST | /api/wishlist/items | Add item to wishlist |
| DELETE | /api/wishlist/items/{courseId} | Remove item from wishlist |
| POST | /api/wishlist/items/{courseId}/move-to-cart | Move to cart |
| GET | /api/wishlist/shared/{token} | View shared wishlist |
| POST | /api/wishlist/share | Generate shareable link |

### 4.4 Analytics

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/cart/analytics/abandonment | Get abandonment metrics (Admin) |
| GET | /api/cart/analytics/conversions | Get conversion metrics (Admin) |
| GET | /api/coupons/analytics/usage | Get coupon usage stats (Admin) |

---

## 5. Business Rules

### 5.1 Cart Rules

- Users cannot add courses they already own
- Users cannot add unpublished or deleted courses
- Each course can only appear once in cart
- Anonymous carts are limited to 10 items
- Authenticated user carts are limited to 50 items
- Cart items preserve price at time of addition

### 5.2 Coupon Rules

- Only one coupon can be applied per cart
- Coupons cannot reduce price below zero
- Expired coupons cannot be applied
- Inactive coupons cannot be applied
- Per-user limits are enforced strictly
- Course-specific coupons require applicable courses in cart

### 5.3 Wishlist Rules

- Wishlist is unlimited for authenticated users
- Anonymous users cannot create wishlists
- Wishlisted courses can be unavailable
- Price notifications respect user preferences

---

## 6. Security Considerations

- Cart modifications require user authentication or valid session
- Admin-only endpoints require administrator role
- Coupon codes are case-insensitive
- Shared wishlist tokens are cryptographically secure
- Price validation prevents client-side manipulation
- Rate limiting applied to cart operations

---

## 7. Dependencies

- Course Management (for course data validation)
- Identity & Access Management (for user authentication)
- Notifications (for wishlist price alerts)
- Serilog for structured logging
- MediatR for CQRS pattern
- Entity Framework Core for data access
- FluentValidation for request validation

---

## 8. Implementation Notes

Per the implementation specification (REQ-SYS-005, REQ-SYS-006), all data access SHALL use ICoursesPlatformContext directly without repository pattern.

---

*Document Version: 1.0*
*Phase Coverage: 3-4*
