# Checkout & Payments - Frontend Specification

**Feature:** Checkout & Payments
**Version:** 1.0
**Last Updated:** December 2024

---

## 1. Overview

The Checkout & Payments frontend provides user interfaces for shopping cart management, secure checkout process, payment processing, order history, and refund requests.

---

## 2. Requirements

### 2.1 Shopping Cart

#### REQ-PAY-FE-001: Shopping Cart Page [Phase 3]
The application SHALL provide a shopping cart page.

**Acceptance Criteria:**
- AC1: Page displays all courses in cart
- AC2: Each item shows course thumbnail, title, price
- AC3: User can remove items from cart
- AC4: Total price calculated and displayed
- AC5: Checkout button navigates to checkout flow
- AC6: Empty cart shows appropriate message

#### REQ-PAY-FE-002: Add to Cart Button [Phase 3]
The application SHALL provide add to cart functionality on course pages.

**Acceptance Criteria:**
- AC1: Add to Cart button visible on course detail page
- AC2: Button disabled if already in cart
- AC3: Success notification shown when added
- AC4: Cart icon badge updates with item count
- AC5: Button shows "Already Enrolled" if user owns course

#### REQ-PAY-FE-003: Cart Mini Widget [Phase 3]
The application SHALL display a cart preview in header.

**Acceptance Criteria:**
- AC1: Cart icon shows item count badge
- AC2: Hover/click shows mini cart preview
- AC3: Preview displays first 3 items
- AC4: View Cart and Checkout buttons available
- AC5: Mini cart updates in real-time

### 2.2 Checkout Process

#### REQ-PAY-FE-004: Checkout Page [Phase 3]
The application SHALL provide a multi-step checkout page.

**Acceptance Criteria:**
- AC1: Page shows progress indicator (Order Review, Billing, Payment)
- AC2: Order summary displayed on right side
- AC3: User can navigate between steps
- AC4: Form validation prevents invalid submissions
- AC5: Mobile responsive design

#### REQ-PAY-FE-005: Order Review Step [Phase 3]
The application SHALL display order review as first checkout step.

**Acceptance Criteria:**
- AC1: Lists all courses with prices
- AC2: Shows subtotal, tax, total
- AC3: Displays applied coupon if any
- AC4: User can remove items from order
- AC5: Continue to billing button enabled

#### REQ-PAY-FE-006: Billing Information Step [Phase 3]
The application SHALL collect billing information.

**Acceptance Criteria:**
- AC1: Form includes name, email, address fields
- AC2: Country and state dropdowns provided
- AC3: Real-time validation with error messages
- AC4: Save billing info checkbox available
- AC5: Previously saved billing info can be selected

#### REQ-PAY-FE-007: Payment Step [Phase 3]
The application SHALL display payment options and forms.

**Acceptance Criteria:**
- AC1: Payment method tabs shown (Card, PayPal, etc.)
- AC2: Credit card form includes number, expiry, CVV
- AC3: Card number input formatted with spaces
- AC4: Card type detected and icon displayed
- AC5: Save payment method checkbox available
- AC6: Saved payment methods can be selected
- AC7: Place Order button requires all fields valid

### 2.3 Payment Processing

#### REQ-PAY-FE-008: Payment Processing UI [Phase 3]
The application SHALL show payment processing status.

**Acceptance Criteria:**
- AC1: Loading spinner displayed during processing
- AC2: Progress message shown (Verifying payment...)
- AC3: User cannot navigate away during processing
- AC4: Timeout after 60 seconds with retry option
- AC5: 3D Secure modal displayed if required

#### REQ-PAY-FE-009: Payment Success Page [Phase 3]
The application SHALL display payment confirmation.

**Acceptance Criteria:**
- AC1: Success message with order number displayed
- AC2: Order summary shown
- AC3: Download invoice button available
- AC4: Access courses button navigates to enrolled courses
- AC5: Confirmation email message displayed

#### REQ-PAY-FE-010: Payment Failure Page [Phase 3]
The application SHALL handle payment failures gracefully.

**Acceptance Criteria:**
- AC1: Failure message with reason displayed
- AC2: Retry payment button available
- AC3: Cart is preserved for retry
- AC4: Contact support link provided
- AC5: Different messages for different failure types

### 2.4 Payment Methods

#### REQ-PAY-FE-011: Credit Card Form [Phase 3]
The application SHALL provide secure credit card input.

**Acceptance Criteria:**
- AC1: Card fields embedded from payment gateway
- AC2: No card data stored in application
- AC3: Real-time validation for card number
- AC4: Expiry date picker or formatted input
- AC5: CVV field masked

#### REQ-PAY-FE-012: PayPal Button [Phase 4]
The application SHALL integrate PayPal button.

**Acceptance Criteria:**
- AC1: PayPal button styled per brand guidelines
- AC2: Clicking opens PayPal modal
- AC3: Callback handled after PayPal completion
- AC4: Error handling for cancelled PayPal flow

#### REQ-PAY-FE-013: Apple Pay Button [Phase 4]
The application SHALL show Apple Pay button on compatible devices.

**Acceptance Criteria:**
- AC1: Button only shown on Apple Pay capable devices
- AC2: Apple Pay sheet presented on click
- AC3: Payment processed through Apple Pay
- AC4: Success/failure handled appropriately

#### REQ-PAY-FE-014: Google Pay Button [Phase 4]
The application SHALL integrate Google Pay.

**Acceptance Criteria:**
- AC1: Button shown when Google Pay available
- AC2: Google Pay sheet presented on click
- AC3: Payment processed through Google Pay
- AC4: Success/failure handled appropriately

#### REQ-PAY-FE-015: Saved Payment Methods [Phase 4]
The application SHALL display saved payment methods.

**Acceptance Criteria:**
- AC1: List shows last 4 digits of saved cards
- AC2: Card brand icon displayed
- AC3: Default payment method highlighted
- AC4: User can delete saved methods
- AC5: Confirmation required before deletion

### 2.5 Orders & Invoices

#### REQ-PAY-FE-016: Order History Page [Phase 3]
The application SHALL provide order history view.

**Acceptance Criteria:**
- AC1: Lists all user orders with dates
- AC2: Each order shows status, total, items
- AC3: Filters for date range and status
- AC4: Search by order number
- AC5: Pagination for long order lists

#### REQ-PAY-FE-017: Order Details Page [Phase 3]
The application SHALL show detailed order information.

**Acceptance Criteria:**
- AC1: Displays order number, date, status
- AC2: Lists all purchased courses
- AC3: Shows billing and payment information
- AC4: Download invoice button available
- AC5: Request refund button if eligible

#### REQ-PAY-FE-018: Invoice Download [Phase 3]
The application SHALL allow invoice downloads.

**Acceptance Criteria:**
- AC1: Download button triggers PDF download
- AC2: Invoice filename includes order number
- AC3: PDF opens in new tab option
- AC4: Loading indicator while generating

### 2.6 Refunds

#### REQ-PAY-FE-019: Refund Request Page [Phase 3]
The application SHALL provide refund request interface.

**Acceptance Criteria:**
- AC1: Page shows order details for refund
- AC2: Refund reason dropdown provided
- AC3: Additional comments textarea available
- AC4: Eligibility check before submission
- AC5: Submit button with confirmation dialog

#### REQ-PAY-FE-020: Refund Status Page [Phase 3]
The application SHALL display refund request status.

**Acceptance Criteria:**
- AC1: Shows current refund status
- AC2: Displays expected processing time
- AC3: Timeline of status changes shown
- AC4: Email notification preference available

### 2.7 Coupons & Discounts

#### REQ-PAY-FE-021: Coupon Input [Phase 4]
The application SHALL provide coupon code entry.

**Acceptance Criteria:**
- AC1: Coupon input field in cart and checkout
- AC2: Apply button validates code
- AC3: Success shows discount applied
- AC4: Error message for invalid codes
- AC5: Applied coupon can be removed

#### REQ-PAY-FE-022: Discount Display [Phase 4]
The application SHALL show discount calculations.

**Acceptance Criteria:**
- AC1: Original price shown with strikethrough
- AC2: Discount amount displayed
- AC3: Final price highlighted
- AC4: Coupon code shown in summary

---

## 3. Component Architecture

### 3.1 Pages

| Component | Route | Description |
|-----------|-------|-------------|
| CartPage | /cart | Shopping cart view |
| CheckoutPage | /checkout | Multi-step checkout process |
| PaymentSuccessPage | /checkout/success | Payment confirmation |
| PaymentFailurePage | /checkout/failure | Payment error handling |
| OrderHistoryPage | /orders | List of user orders |
| OrderDetailsPage | /orders/:id | Detailed order view |
| RefundRequestPage | /orders/:id/refund | Refund request form |
| PaymentMethodsPage | /settings/payment-methods | Saved payment methods |

### 3.2 Components

| Component | Description |
|-----------|-------------|
| CartItem | Single course in cart |
| CartSummary | Cart totals and checkout button |
| MiniCart | Header cart preview dropdown |
| CheckoutStepper | Progress indicator for checkout |
| OrderReview | Order summary step |
| BillingForm | Billing information form |
| PaymentForm | Payment method selection |
| CreditCardInput | Credit card entry fields |
| PayPalButton | PayPal payment button |
| ApplePayButton | Apple Pay button |
| GooglePayButton | Google Pay button |
| OrderSummaryCard | Order total breakdown |
| OrderListItem | Single order in history |
| InvoiceDownload | Invoice download button |
| CouponInput | Coupon code entry field |
| RefundForm | Refund request form |
| PaymentMethodCard | Saved payment method display |

### 3.3 Services

| Service | Description |
|---------|-------------|
| CartService | Shopping cart management |
| CheckoutService | Checkout process handling |
| PaymentService | Payment processing |
| OrderService | Order retrieval and management |
| RefundService | Refund request handling |
| CouponService | Coupon validation and application |

---

## 4. State Management

Per REQ-FE-009, state management SHALL use RxJS (not NgRx or Signals).

### 4.1 Cart State

```typescript
interface CartState {
  items: CartItem[];
  subtotal: number;
  tax: number;
  discount: number;
  total: number;
  couponCode: string | null;
  isLoading: boolean;
}
```

### 4.2 Checkout State

```typescript
interface CheckoutState {
  currentStep: number;
  billingInfo: BillingInfo | null;
  paymentMethod: PaymentMethodType;
  isProcessing: boolean;
  orderId: string | null;
}
```

### 4.3 Order State

```typescript
interface OrderState {
  orders: Order[];
  selectedOrder: Order | null;
  isLoading: boolean;
  filters: OrderFilters;
}
```

---

## 5. UI/UX Requirements

### 5.1 Design System

Per REQ-FE-006 and REQ-FE-010, the application SHALL use Angular Material with Material 3 guidelines and default theme colors.

### 5.2 Responsive Design

Per REQ-FE-018, all pages SHALL be responsive:
- Mobile: Single column, stacked layout
- Tablet: Two column where appropriate
- Desktop: Cart sidebar on checkout pages

### 5.3 Accessibility

- All form fields MUST have proper labels
- Payment errors MUST be announced to screen readers
- Keyboard navigation for all interactive elements
- ARIA labels for payment status indicators
- Focus management during checkout flow

### 5.4 Component Naming

Per REQ-FE-012 and REQ-FE-013:
- Class names SHALL NOT have "Component" suffix
- File names SHALL NOT have "component" prefix

---

## 6. Form Validation

### 6.1 Card Number Validation

- Required field
- Valid card number (Luhn algorithm)
- Supported card type (Visa, Mastercard, Amex)
- No spaces in stored value

### 6.2 Billing Address Validation

- All fields required
- Postal code format based on country
- State/Province required for applicable countries

### 6.3 Coupon Validation

- Valid format (alphanumeric)
- Not expired
- Usage limit not exceeded
- Applicable to cart contents

---

## 7. Error Handling

### 7.1 Payment Errors

| Error Code | User Message |
|------------|--------------|
| card_declined | Your card was declined. Please try another payment method. |
| insufficient_funds | Insufficient funds. Please use a different card. |
| expired_card | Your card has expired. Please use a different card. |
| incorrect_cvc | Incorrect CVV code. Please check and try again. |
| processing_error | Payment processing error. Please try again. |
| network_error | Connection error. Please check your internet and retry. |

### 7.2 Checkout Errors

- Display errors inline below affected fields
- Prevent step progression with validation errors
- Show summary of errors at top of form
- Clear errors when user corrects input

---

## 8. Security Requirements

### 8.1 Payment Data Handling

- Credit card fields MUST be embedded iframes from gateway
- No card data stored in browser storage
- Payment tokens stored encrypted
- HTTPS enforced for all payment pages

### 8.2 Session Security

- Checkout session expires after 30 minutes
- Payment tokens expire after single use
- 3D Secure challenges handled in secure iframe

---

## 9. Testing Requirements

### 9.1 Unit Tests (Jest)

Per REQ-FE-021, unit tests SHALL use Jest:
- Test cart calculations
- Test coupon application logic
- Test payment method selection
- Test checkout flow state management
- Minimum 80% code coverage

### 9.2 E2E Tests (Playwright)

Per REQ-FE-022, E2E tests SHALL use Playwright:
- Test complete purchase flow
- Test payment failure scenarios
- Test refund request flow
- Test coupon application
- Test saved payment methods

---

## 10. Implementation Notes

### 10.1 API Base URL

Per REQ-FE-026, the baseUrl configuration SHALL contain ONLY the base URI:
```typescript
// Correct
baseUrl = "http://localhost:7200"
this.http.post(`${baseUrl}/api/payments/initiate`, data)

// Incorrect
baseUrl = "http://localhost:7200/api"
```

### 10.2 File Structure

Per REQ-FE-015 and REQ-FE-016:
- Pages in `pages/` folder
- Reusable components in `components/` folder
- Barrel exports in each folder

### 10.3 Payment Gateway Integration

- Stripe Elements for card input
- PayPal SDK for PayPal button
- Apple Pay JS for Apple Pay
- Google Pay API for Google Pay

---

*Document Version: 1.0*
*Phase Coverage: 3-4*
