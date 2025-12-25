# Shopping & Cart - Frontend Specification

**Feature:** Shopping & Cart
**Version:** 1.0
**Last Updated:** December 2024

---

## 1. Overview

The Shopping & Cart frontend provides user interfaces for managing shopping cart, applying coupons, managing wishlist, and proceeding to checkout.

---

## 2. Requirements

### 2.1 Shopping Cart

#### REQ-SHP-FE-001: Cart Page [Phase 3]
The application SHALL provide a shopping cart page.

**Acceptance Criteria:**
- AC1: Page displays all items in cart with thumbnails
- AC2: Each item shows course title, instructor, and price
- AC3: Remove button available for each item
- AC4: Cart shows subtotal, discount, and total
- AC5: Continue shopping button returns to course catalog
- AC6: Checkout button proceeds to payment
- AC7: Empty cart shows message with browse courses link

#### REQ-SHP-FE-002: Cart Item Display [Phase 3]
The application SHALL display cart items with relevant information.

**Acceptance Criteria:**
- AC1: Item shows course thumbnail image
- AC2: Item shows course title as clickable link
- AC3: Item shows instructor name
- AC4: Item shows original price
- AC5: Item shows discounted price if applicable
- AC6: Item shows savings amount if discounted
- AC7: Remove button with confirmation dialog

#### REQ-SHP-FE-003: Cart Summary [Phase 3]
The application SHALL display cart summary with totals.

**Acceptance Criteria:**
- AC1: Summary shows subtotal of all items
- AC2: Summary shows applied coupon discount
- AC3: Summary shows bulk discount if applicable
- AC4: Summary shows final total prominently
- AC5: Summary shows total savings
- AC6: Summary updates in real-time on changes

#### REQ-SHP-FE-004: Add to Cart Button [Phase 3]
The application SHALL provide add to cart functionality on course pages.

**Acceptance Criteria:**
- AC1: Button displays on course detail page
- AC2: Button disabled if user owns course
- AC3: Button changes to "Go to Cart" if course in cart
- AC4: Success notification on add
- AC5: Cart icon badge updates with item count
- AC6: Loading state during API call

#### REQ-SHP-FE-005: Cart Badge [Phase 3]
The application SHALL display cart item count in navigation.

**Acceptance Criteria:**
- AC1: Cart icon shows badge with item count
- AC2: Badge updates immediately on cart changes
- AC3: Badge hidden when cart is empty
- AC4: Badge shows maximum of 99+ for large counts
- AC5: Clicking icon navigates to cart page

#### REQ-SHP-FE-006: Empty Cart [Phase 3]
The application SHALL handle empty cart state.

**Acceptance Criteria:**
- AC1: Empty state shows friendly message
- AC2: Illustration or icon displayed
- AC3: Browse courses button prominent
- AC4: Recently viewed courses suggested
- AC5: Popular courses displayed as recommendations

### 2.2 Coupons & Discounts

#### REQ-SHP-FE-007: Coupon Input [Phase 3]
The application SHALL provide coupon code entry.

**Acceptance Criteria:**
- AC1: Input field for coupon code on cart page
- AC2: Apply button next to input
- AC3: Input validates format (uppercase, alphanumeric)
- AC4: Success message on valid coupon
- AC5: Error message for invalid/expired coupons
- AC6: Applied coupon displayed with remove option

#### REQ-SHP-FE-008: Applied Coupon Display [Phase 3]
The application SHALL show applied coupon details.

**Acceptance Criteria:**
- AC1: Coupon code displayed prominently
- AC2: Discount amount or percentage shown
- AC3: Remove coupon button available
- AC4: Coupon description displayed
- AC5: Expiration date shown if applicable

#### REQ-SHP-FE-009: Discount Badges [Phase 3]
The application SHALL display discount badges on items.

**Acceptance Criteria:**
- AC1: Sale badge shown on discounted courses
- AC2: Percentage off displayed
- AC3: Original price shown with strikethrough
- AC4: New price highlighted
- AC5: Bulk discount indicator if applicable

### 2.3 Wishlist

#### REQ-SHP-FE-010: Wishlist Page [Phase 3]
The application SHALL provide a wishlist page.

**Acceptance Criteria:**
- AC1: Page displays all wishlist items in grid layout
- AC2: Each item shows course thumbnail and details
- AC3: Move to cart button on each item
- AC4: Remove from wishlist button on each item
- AC5: Empty wishlist shows message
- AC6: Sort options (date added, price, rating)

#### REQ-SHP-FE-011: Add to Wishlist Button [Phase 3]
The application SHALL provide add to wishlist functionality.

**Acceptance Criteria:**
- AC1: Heart icon button on course cards
- AC2: Icon filled when course in wishlist
- AC3: Icon outline when not in wishlist
- AC4: Toggle on/off functionality
- AC5: Success notification on add
- AC6: Tooltip shows "Add to Wishlist" on hover

#### REQ-SHP-FE-012: Wishlist Item Display [Phase 3]
The application SHALL display wishlist items with details.

**Acceptance Criteria:**
- AC1: Item shows course thumbnail
- AC2: Item shows course title and instructor
- AC3: Item shows current price
- AC4: Price drop indicator if price decreased
- AC5: Added date displayed
- AC6: Course rating and review count shown

#### REQ-SHP-FE-013: Wishlist Actions [Phase 3]
The application SHALL provide wishlist item actions.

**Acceptance Criteria:**
- AC1: Move to cart button prominent
- AC2: Remove from wishlist button available
- AC3: Share wishlist button on page
- AC4: Bulk actions (move all to cart, clear wishlist)
- AC5: Confirmation dialogs for destructive actions

#### REQ-SHP-FE-014: Price Drop Notifications [Phase 3]
The application SHALL show price drop alerts for wishlist.

**Acceptance Criteria:**
- AC1: Badge on wishlist icon when price drops
- AC2: Notification message for price drops
- AC3: Highlighted items with price drops
- AC4: Savings amount displayed
- AC5: Notification settings toggle

### 2.4 Checkout Flow

#### REQ-SHP-FE-015: Checkout Button [Phase 3]
The application SHALL provide checkout initiation.

**Acceptance Criteria:**
- AC1: Checkout button disabled when cart empty
- AC2: Button prominent and styled as primary action
- AC3: Button shows loading state during navigation
- AC4: Button validates authentication (redirect to login)
- AC5: Button redirects to payment page

#### REQ-SHP-FE-016: Cart Validation [Phase 3]
The application SHALL validate cart before checkout.

**Acceptance Criteria:**
- AC1: System checks all items still available
- AC2: System validates prices haven't changed
- AC3: Warning shown if prices increased
- AC4: User can review and confirm changes
- AC5: Unavailable items highlighted for removal

#### REQ-SHP-FE-017: Mobile Cart Menu [Phase 3]
The application SHALL provide mobile-optimized cart.

**Acceptance Criteria:**
- AC1: Slide-out cart drawer on mobile
- AC2: Cart preview shows item count and total
- AC3: Quick access to cart from navigation
- AC4: Swipe to remove items
- AC5: Responsive layout for all screen sizes

---

## 3. Component Architecture

### 3.1 Pages

| Component | Route | Description |
|-----------|-------|-------------|
| CartPage | /cart | Shopping cart view |
| WishlistPage | /wishlist | Wishlist view |
| SharedWishlistPage | /wishlist/shared/:token | Public wishlist view |

### 3.2 Components

| Component | Description |
|-----------|-------------|
| CartItemList | List of cart items |
| CartItem | Individual cart item card |
| CartSummary | Cart totals and checkout |
| CouponInput | Coupon code entry form |
| AppliedCoupon | Display applied coupon |
| AddToCartButton | Add course to cart button |
| CartBadge | Cart item count badge |
| WishlistItemList | List of wishlist items |
| WishlistItem | Individual wishlist item card |
| AddToWishlistButton | Wishlist toggle button |
| EmptyCart | Empty cart state |
| EmptyWishlist | Empty wishlist state |
| PriceDisplay | Price with discount formatting |
| DiscountBadge | Discount indicator badge |

### 3.3 Services

| Service | Description |
|---------|-------------|
| CartService | Cart API operations |
| CouponService | Coupon validation and application |
| WishlistService | Wishlist API operations |

---

## 4. State Management

Per REQ-FE-009, state management SHALL use RxJS (not NgRx or Signals).

### 4.1 Cart State

```typescript
interface CartState {
  items: CartItem[];
  subtotal: number;
  discount: number;
  total: number;
  appliedCoupon: Coupon | null;
  itemCount: number;
  isLoading: boolean;
  error: string | null;
}
```

### 4.2 Wishlist State

```typescript
interface WishlistState {
  items: WishlistItem[];
  itemCount: number;
  priceDropCount: number;
  isLoading: boolean;
}
```

---

## 5. UI/UX Requirements

### 5.1 Design System

Per REQ-FE-006 and REQ-FE-010, the application SHALL use Angular Material with Material 3 guidelines and default theme colors.

### 5.2 Cart Layout

- Desktop: Two-column layout (items on left, summary on right)
- Tablet: Single column with summary at bottom
- Mobile: Single column with sticky summary footer

### 5.3 Responsive Design

Per REQ-FE-018, all pages SHALL be responsive and follow mobile-first design:
- Mobile: Single column, full-width items
- Tablet: Two column grid for items
- Desktop: Multi-column grid with sidebar summary

### 5.4 Interactions

- Smooth animations for add/remove actions
- Optimistic UI updates for cart changes
- Loading skeletons during data fetch
- Toast notifications for user feedback
- Confirmation dialogs for destructive actions

### 5.5 Accessibility

- ARIA labels for cart actions
- Keyboard navigation for all actions
- Screen reader announcements for cart updates
- Focus management for modals
- High contrast support for discounts

### 5.6 Component Naming

Per REQ-FE-012 and REQ-FE-013:
- Class names SHALL NOT have "Component" suffix
- File names SHALL NOT have "component" prefix

---

## 6. Form Validation

### 6.1 Coupon Code Validation

- Required when applying coupon
- Alphanumeric characters only
- Maximum 20 characters
- Case-insensitive

### 6.2 Cart Validation

- Minimum 1 item for checkout
- Maximum 50 items per cart
- Valid course IDs
- Positive prices

---

## 7. Error Handling

### 7.1 API Errors

| Error Code | User Message |
|------------|--------------|
| 400 | Invalid coupon code |
| 404 | Course not found in cart |
| 409 | Course already in cart |
| 410 | Course no longer available |
| 422 | Price has changed, please review |
| 429 | Too many requests, please wait |
| 500 | Something went wrong, please try again |

### 7.2 Cart Errors

- Course unavailable: Highlight and offer removal
- Price changed: Show comparison and confirmation
- Coupon expired: Clear coupon and notify user
- Cart limit: Prevent adding more items

---

## 8. Performance Optimizations

### 8.1 Caching

- Cache cart data for 5 minutes
- Refresh on cart modifications
- Invalidate on user actions

### 8.2 Loading States

- Skeleton loaders for cart items
- Spinner for checkout button
- Progressive loading for large carts

### 8.3 Debouncing

- Debounce coupon validation (500ms)
- Throttle cart updates

---

## 9. Testing Requirements

### 9.1 Unit Tests (Jest)

Per REQ-FE-021, unit tests SHALL use Jest:
- Test cart service methods
- Test coupon validation logic
- Test price calculations
- Test state management
- Minimum 80% code coverage

### 9.2 E2E Tests (Playwright)

Per REQ-FE-022, E2E tests SHALL use Playwright:
- Test add to cart flow
- Test remove from cart flow
- Test apply coupon flow
- Test wishlist operations
- Test checkout navigation

---

## 10. Implementation Notes

### 10.1 API Base URL

Per REQ-FE-026, the baseUrl configuration SHALL contain ONLY the base URI:
```typescript
// Correct
baseUrl = "http://localhost:7200"
this.http.get(`${baseUrl}/api/cart`)

// Incorrect
baseUrl = "http://localhost:7200/api"
```

### 10.2 File Structure

Per REQ-FE-015 and REQ-FE-016:
- Pages in `pages/` folder
- Reusable components in `components/` folder
- Barrel exports in each folder

### 10.3 Real-time Updates

- Cart updates reflect immediately in UI
- Optimistic updates with rollback on error
- WebSocket integration for price changes (future phase)

---

*Document Version: 1.0*
*Phase Coverage: 3-4*
