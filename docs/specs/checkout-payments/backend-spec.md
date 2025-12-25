# Checkout & Payments - Backend Specification

**Feature:** Checkout & Payments
**Version:** 1.0
**Last Updated:** December 2024

---

## 1. Overview

The Checkout & Payments feature provides secure payment processing, order management, refund handling, and dispute resolution for the CoursesPlatform system.

---

## 2. Requirements

### 2.1 Checkout Process

#### REQ-PAY-001: Shopping Cart Management [Phase 3]
The system SHALL allow users to add courses to a shopping cart.

**Acceptance Criteria:**
- AC1: User can add courses to cart
- AC2: User can remove courses from cart
- AC3: User can update course quantity (for gifting)
- AC4: Cart persists across sessions
- AC5: CartItemAdded event is published
- AC6: CartItemRemoved event is published

#### REQ-PAY-002: Cart Validation [Phase 3]
The system SHALL validate cart contents before checkout.

**Acceptance Criteria:**
- AC1: Verify all courses are still available
- AC2: Check for duplicate enrollments
- AC3: Apply pricing rules and discounts
- AC4: Calculate final total with taxes
- AC5: CartValidated event is published

#### REQ-PAY-003: Checkout Initiation [Phase 3]
The system SHALL allow users to initiate checkout process.

**Acceptance Criteria:**
- AC1: User can proceed to checkout from cart
- AC2: System creates pending order
- AC3: Order includes billing information
- AC4: CheckoutInitiated event is published
- AC5: Order expires after 30 minutes if not completed

#### REQ-PAY-004: Billing Information [Phase 3]
The system SHALL collect and validate billing information.

**Acceptance Criteria:**
- AC1: User can enter billing address
- AC2: System validates address format
- AC3: User can save billing info for future use
- AC4: BillingInformationAdded event is published
- AC5: Billing data is encrypted at rest

### 2.2 Payment Processing

#### REQ-PAY-005: Payment Initiation [Phase 3]
The system SHALL initiate payment with payment gateway.

**Acceptance Criteria:**
- AC1: System creates payment intent
- AC2: Payment amount matches order total
- AC3: PaymentInitiated event is published
- AC4: Transaction ID is generated and stored
- AC5: Payment timeout is set to 15 minutes

#### REQ-PAY-006: Payment Success [Phase 3]
The system SHALL handle successful payment completion.

**Acceptance Criteria:**
- AC1: Payment gateway confirms successful payment
- AC2: Order status changes to Completed
- AC3: PaymentSucceeded event is published
- AC4: OrderCompleted event is published
- AC5: User receives confirmation email
- AC6: Course enrollments are created automatically

#### REQ-PAY-007: Payment Failure [Phase 3]
The system SHALL handle payment failures gracefully.

**Acceptance Criteria:**
- AC1: System captures failure reason from gateway
- AC2: Order status changes to Failed
- AC3: PaymentFailed event is published
- AC4: User receives failure notification with reason
- AC5: Cart is restored for retry
- AC6: Failed payment is logged for analysis

#### REQ-PAY-008: Payment Retry [Phase 3]
The system SHALL allow users to retry failed payments.

**Acceptance Criteria:**
- AC1: User can retry payment with same order
- AC2: User can update payment method
- AC3: PaymentRetried event is published
- AC4: Maximum 3 retry attempts per order
- AC5: Order expires after maximum retries

### 2.3 Payment Methods

#### REQ-PAY-009: Credit Card Payments [Phase 3]
The system SHALL accept credit card payments.

**Acceptance Criteria:**
- AC1: System supports Visa, Mastercard, Amex
- AC2: Card details are tokenized by payment gateway
- AC3: CVV is required for all transactions
- AC4: System validates card expiry date
- AC5: No card details stored on platform servers

#### REQ-PAY-010: Debit Card Payments [Phase 3]
The system SHALL accept debit card payments.

**Acceptance Criteria:**
- AC1: System supports major debit cards
- AC2: Same security requirements as credit cards
- AC3: Real-time balance verification
- AC4: DebitCardPaymentProcessed event is published

#### REQ-PAY-011: PayPal Integration [Phase 4]
The system SHALL integrate with PayPal for payments.

**Acceptance Criteria:**
- AC1: User can select PayPal as payment method
- AC2: User is redirected to PayPal for authentication
- AC3: System handles PayPal callback
- AC4: PayPalPaymentCompleted event is published

#### REQ-PAY-012: Apple Pay Integration [Phase 4]
The system SHALL support Apple Pay for eligible devices.

**Acceptance Criteria:**
- AC1: Apple Pay button displayed on compatible devices
- AC2: System validates Apple Pay merchant certificate
- AC3: Payment processed through Apple Pay gateway
- AC4: ApplePayPaymentCompleted event is published

#### REQ-PAY-013: Google Pay Integration [Phase 4]
The system SHALL support Google Pay.

**Acceptance Criteria:**
- AC1: Google Pay button displayed when available
- AC2: Payment processed through Google Pay gateway
- AC3: GooglePayPaymentCompleted event is published

#### REQ-PAY-014: Saved Payment Methods [Phase 4]
The system SHALL allow users to save payment methods.

**Acceptance Criteria:**
- AC1: User can opt to save payment method
- AC2: Payment tokens stored securely
- AC3: PaymentMethodSaved event is published
- AC4: User can delete saved payment methods
- AC5: PaymentMethodRemoved event is published

### 2.4 Invoicing

#### REQ-PAY-015: Invoice Generation [Phase 3]
The system SHALL generate invoices for completed orders.

**Acceptance Criteria:**
- AC1: Invoice created immediately after payment success
- AC2: Invoice includes order details, amounts, taxes
- AC3: Unique invoice number assigned
- AC4: InvoiceGenerated event is published
- AC5: Invoice available as PDF download

#### REQ-PAY-016: Invoice Email [Phase 3]
The system SHALL send invoice via email to customer.

**Acceptance Criteria:**
- AC1: Invoice emailed within 5 minutes of payment
- AC2: Email includes PDF attachment
- AC3: Email contains payment confirmation details
- AC4: InvoiceEmailed event is published

#### REQ-PAY-017: Receipt Generation [Phase 3]
The system SHALL generate payment receipts.

**Acceptance Criteria:**
- AC1: Receipt generated for each payment
- AC2: Receipt includes transaction ID
- AC3: ReceiptGenerated event is published
- AC4: Receipt available for download

### 2.5 Refunds

#### REQ-PAY-018: Refund Request [Phase 3]
The system SHALL allow users to request refunds.

**Acceptance Criteria:**
- AC1: User can request refund within 30 days
- AC2: System validates refund eligibility
- AC3: RefundRequested event is published
- AC4: Refund request includes reason
- AC5: User cannot access course during refund processing

#### REQ-PAY-019: Refund Approval [Phase 3]
The system SHALL support administrator refund approval.

**Acceptance Criteria:**
- AC1: Admin can review refund requests
- AC2: Admin can approve or reject requests
- AC3: RefundApproved or RefundRejected events published
- AC4: Approval reason is recorded
- AC5: User receives notification of decision

#### REQ-PAY-020: Refund Processing [Phase 3]
The system SHALL process approved refunds through payment gateway.

**Acceptance Criteria:**
- AC1: Refund initiated with payment gateway
- AC2: Full or partial refund supported
- AC3: RefundProcessing event is published
- AC4: Refund status tracked in real-time
- AC5: RefundCompleted event published on success

#### REQ-PAY-021: Refund Failure [Phase 3]
The system SHALL handle refund processing failures.

**Acceptance Criteria:**
- AC1: System captures refund failure reason
- AC2: RefundFailed event is published
- AC3: Admin is notified of failure
- AC4: Manual intervention option available
- AC5: Failed refunds can be retried

#### REQ-PAY-022: Automatic Refunds [Phase 4]
The system SHALL support automatic refunds for specific scenarios.

**Acceptance Criteria:**
- AC1: Course cancellation triggers automatic refund
- AC2: Platform error triggers automatic refund
- AC3: AutomaticRefundInitiated event is published
- AC4: Refund processed without manual approval

### 2.6 Disputes

#### REQ-PAY-023: Dispute Creation [Phase 3]
The system SHALL handle payment disputes from gateway.

**Acceptance Criteria:**
- AC1: System receives dispute notification from gateway
- AC2: Dispute record created with details
- AC3: DisputeCreated event is published
- AC4: Order status updated to Disputed
- AC5: Admin receives dispute notification

#### REQ-PAY-024: Dispute Evidence [Phase 3]
The system SHALL allow submission of dispute evidence.

**Acceptance Criteria:**
- AC1: Admin can upload supporting documents
- AC2: System compiles course access logs
- AC3: DisputeEvidenceSubmitted event is published
- AC4: Evidence submitted to payment gateway
- AC5: Evidence submission deadline tracked

#### REQ-PAY-025: Dispute Resolution [Phase 3]
The system SHALL track dispute resolution outcomes.

**Acceptance Criteria:**
- AC1: System receives resolution from gateway
- AC2: DisputeWon or DisputeLost events published
- AC3: Order status updated accordingly
- AC4: User is notified of outcome
- AC5: Financial records updated

#### REQ-PAY-026: Chargeback Handling [Phase 3]
The system SHALL handle chargebacks.

**Acceptance Criteria:**
- AC1: Chargeback notification received from gateway
- AC2: ChargebackReceived event is published
- AC3: Course access immediately revoked
- AC4: Admin notified for review
- AC5: Chargeback can be contested

### 2.7 Pricing & Promotions

#### REQ-PAY-027: Dynamic Pricing [Phase 3]
The system SHALL support dynamic course pricing.

**Acceptance Criteria:**
- AC1: Instructors can set course prices
- AC2: Pricing can include multiple currencies
- AC3: PriceUpdated event is published
- AC4: Price history maintained
- AC5: Active enrollments not affected by price changes

#### REQ-PAY-028: Coupon Codes [Phase 4]
The system SHALL support coupon codes for discounts.

**Acceptance Criteria:**
- AC1: Admin can create coupon codes
- AC2: Coupons support percentage or fixed discounts
- AC3: Coupon usage limits and expiry supported
- AC4: CouponApplied event is published
- AC5: Invalid coupons show error message

#### REQ-PAY-029: Bundle Pricing [Phase 4]
The system SHALL support course bundle pricing.

**Acceptance Criteria:**
- AC1: Multiple courses can be bundled
- AC2: Bundle price is less than individual sum
- AC3: BundleCreated event is published
- AC4: Bundle purchase enrolls in all courses

#### REQ-PAY-030: Tax Calculation [Phase 3]
The system SHALL calculate applicable taxes.

**Acceptance Criteria:**
- AC1: Tax calculated based on billing address
- AC2: System supports VAT and sales tax
- AC3: Tax rate retrieved from tax service
- AC4: TaxCalculated event is published
- AC5: Tax amount shown separately on invoice

### 2.8 Payment Security

#### REQ-PAY-031: PCI Compliance [Phase 3]
The system SHALL maintain PCI DSS compliance.

**Acceptance Criteria:**
- AC1: No credit card data stored on platform
- AC2: Payment gateway handles all card data
- AC3: Tokenization used for all transactions
- AC4: Secure HTTPS for all payment pages
- AC5: Regular security audits performed

#### REQ-PAY-032: Fraud Detection [Phase 4]
The system SHALL implement fraud detection measures.

**Acceptance Criteria:**
- AC1: Unusual purchase patterns flagged
- AC2: Velocity checks implemented
- AC3: FraudSuspected event is published
- AC4: High-risk transactions require verification
- AC5: Blocked transactions logged

#### REQ-PAY-033: 3D Secure [Phase 4]
The system SHALL support 3D Secure authentication.

**Acceptance Criteria:**
- AC1: 3DS challenge presented when required
- AC2: Strong customer authentication enforced
- AC3: ThreeDSecureCompleted event is published
- AC4: Failed authentication blocks payment

---

## 3. Domain Model

### 3.1 Entities

| Entity | Description |
|--------|-------------|
| ShoppingCart | User's cart containing courses to purchase |
| CartItem | Individual course in shopping cart |
| Order | Purchase order for one or more courses |
| OrderItem | Individual course within an order |
| Payment | Payment transaction record |
| PaymentMethod | Saved payment method (tokenized) |
| Invoice | Generated invoice for completed order |
| Receipt | Payment receipt document |
| Refund | Refund transaction for returned course |
| Dispute | Payment dispute or chargeback |
| Coupon | Discount coupon code |
| Bundle | Group of courses sold together |

### 3.2 Domain Events

| Event | Trigger |
|-------|---------|
| CartItemAdded | Course added to cart |
| CartItemRemoved | Course removed from cart |
| CartCleared | All items removed from cart |
| CartValidated | Cart validated before checkout |
| CheckoutInitiated | User begins checkout process |
| BillingInformationAdded | Billing info entered |
| PaymentInitiated | Payment process started |
| PaymentSucceeded | Payment completed successfully |
| PaymentFailed | Payment processing failed |
| PaymentRetried | Failed payment retried |
| OrderCreated | New order created |
| OrderCompleted | Order successfully completed |
| OrderFailed | Order processing failed |
| OrderCancelled | Order cancelled by user or system |
| InvoiceGenerated | Invoice created |
| InvoiceEmailed | Invoice sent to customer |
| ReceiptGenerated | Receipt created |
| RefundRequested | User requests refund |
| RefundApproved | Refund approved by admin |
| RefundRejected | Refund denied by admin |
| RefundProcessing | Refund being processed |
| RefundCompleted | Refund successfully processed |
| RefundFailed | Refund processing failed |
| AutomaticRefundInitiated | System triggers automatic refund |
| DisputeCreated | Payment dispute opened |
| DisputeEvidenceSubmitted | Evidence uploaded for dispute |
| DisputeWon | Dispute resolved in favor of merchant |
| DisputeLost | Dispute resolved in favor of customer |
| ChargebackReceived | Chargeback filed by customer |
| PriceUpdated | Course price changed |
| CouponCreated | New coupon code created |
| CouponApplied | Coupon applied to order |
| BundleCreated | Course bundle created |
| TaxCalculated | Tax amount computed |
| PaymentMethodSaved | Payment method stored |
| PaymentMethodRemoved | Saved payment method deleted |
| FraudSuspected | Fraudulent activity detected |
| ThreeDSecureCompleted | 3D Secure verification completed |
| DebitCardPaymentProcessed | Debit card payment completed |
| PayPalPaymentCompleted | PayPal payment completed |
| ApplePayPaymentCompleted | Apple Pay payment completed |
| GooglePayPaymentCompleted | Google Pay payment completed |

---

## 4. API Endpoints

### 4.1 Shopping Cart

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/cart | Get current user's cart |
| POST | /api/cart/items | Add course to cart |
| DELETE | /api/cart/items/{courseId} | Remove course from cart |
| DELETE | /api/cart | Clear entire cart |

### 4.2 Checkout

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/checkout/initiate | Begin checkout process |
| POST | /api/checkout/billing | Add billing information |
| POST | /api/checkout/validate | Validate cart and pricing |
| POST | /api/checkout/complete | Finalize checkout |

### 4.3 Payments

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/payments/initiate | Create payment intent |
| POST | /api/payments/confirm | Confirm payment |
| GET | /api/payments/{id} | Get payment status |
| POST | /api/payments/{id}/retry | Retry failed payment |

### 4.4 Payment Methods

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/payment-methods | List saved payment methods |
| POST | /api/payment-methods | Save new payment method |
| DELETE | /api/payment-methods/{id} | Remove payment method |
| PUT | /api/payment-methods/{id}/default | Set default method |

### 4.5 Orders

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/orders | List user's orders |
| GET | /api/orders/{id} | Get order details |
| GET | /api/orders/{id}/invoice | Download invoice PDF |
| GET | /api/orders/{id}/receipt | Download receipt PDF |

### 4.6 Refunds

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/refunds | Request refund |
| GET | /api/refunds/{id} | Get refund status |
| POST | /api/refunds/{id}/approve | Approve refund (admin) |
| POST | /api/refunds/{id}/reject | Reject refund (admin) |

### 4.7 Disputes

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/disputes | List disputes (admin) |
| GET | /api/disputes/{id} | Get dispute details |
| POST | /api/disputes/{id}/evidence | Submit evidence |
| PUT | /api/disputes/{id}/resolve | Update resolution |

### 4.8 Coupons

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/coupons/validate | Validate coupon code |
| POST | /api/coupons/apply | Apply coupon to cart |
| POST | /api/coupons | Create coupon (admin) |
| DELETE | /api/coupons/{code} | Delete coupon (admin) |

---

## 5. Payment Gateway Integration

### 5.1 Supported Gateways

- Stripe (Primary)
- PayPal
- Braintree (Apple Pay / Google Pay)

### 5.2 Integration Requirements

- All payment gateway communications MUST use HTTPS
- Webhook endpoints MUST validate signatures
- Idempotency keys MUST be used for all payment requests
- Gateway responses MUST be logged for audit trail

---

## 6. Security Considerations

- All payment data MUST be transmitted over HTTPS
- No credit card numbers stored on platform servers
- Payment tokens MUST be encrypted at rest
- PCI DSS Level 1 compliance MUST be maintained
- Payment webhooks MUST verify signature
- Rate limiting MUST be applied to payment endpoints
- Suspicious transactions MUST be flagged for review
- All payment operations MUST be logged for audit

---

## 7. Dependencies

- Serilog for structured logging
- MediatR for CQRS pattern
- Entity Framework Core for data access
- FluentValidation for request validation
- Stripe.NET SDK for payment processing
- iTextSharp for PDF generation

---

## 8. Implementation Notes

Per the implementation specification (REQ-SYS-005, REQ-SYS-006), all data access SHALL use ICoursesPlatformContext directly without repository pattern.

---

*Document Version: 1.0*
*Phase Coverage: 3-4*
