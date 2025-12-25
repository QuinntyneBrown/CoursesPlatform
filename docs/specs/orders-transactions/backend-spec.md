# Orders & Transactions - Backend Specification

**Feature:** Orders & Transactions
**Version:** 1.0
**Last Updated:** December 2024

---

## 1. Overview

The Orders & Transactions feature provides order lifecycle management, payment processing integration, invoicing, and transaction tracking for the CoursesPlatform system.

---

## 2. Requirements

### 2.1 Order Lifecycle

#### REQ-ORD-001: Order Creation [Phase 3]
The system SHALL create orders from checkout cart sessions.

**Acceptance Criteria:**
- AC1: Order is created with Pending status
- AC2: Order captures user, pricing, discount, and tax information
- AC3: OrderItems are created for each cart item
- AC4: OrderCreated event is published
- AC5: Cart is cleared after order creation
- AC6: Order number is generated in format ORD-YYYYMMDD-XXXXX

#### REQ-ORD-002: Order Confirmation [Phase 3]
The system SHALL confirm orders upon successful payment.

**Acceptance Criteria:**
- AC1: Order status changes from Pending to Confirmed
- AC2: OrderConfirmed event is published
- AC3: Payment transaction is linked to order
- AC4: Confirmation timestamp is recorded
- AC5: Enrollments are created for purchased courses
- AC6: Order confirmation email is triggered

#### REQ-ORD-003: Order Fulfillment [Phase 3]
The system SHALL fulfill orders by granting access to purchased courses.

**Acceptance Criteria:**
- AC1: Order status changes to Fulfilled
- AC2: OrderFulfilled event is published
- AC3: Course access is granted to user
- AC4: Fulfillment timestamp is recorded
- AC5: Instructor revenue records are created

#### REQ-ORD-004: Order Cancellation [Phase 3]
The system SHALL support order cancellation with refund processing.

**Acceptance Criteria:**
- AC1: User or admin can cancel order within cancellation window
- AC2: Order status changes to Cancelled
- AC3: OrderCancelled event is published
- AC4: Refund is initiated if payment was processed
- AC5: Enrollments are revoked for cancelled orders
- AC6: Course access is removed

#### REQ-ORD-005: Partial Order Cancellation [Phase 4]
The system SHALL support cancelling individual items from an order.

**Acceptance Criteria:**
- AC1: Individual order items can be cancelled
- AC2: Partial refund is calculated and processed
- AC3: OrderItemCancelled event is published
- AC4: Only cancelled item enrollments are revoked
- AC5: Order remains active with remaining items

#### REQ-ORD-006: Order Refund [Phase 3]
The system SHALL process full and partial refunds for orders.

**Acceptance Criteria:**
- AC1: Refund amount is calculated based on items
- AC2: RefundInitiated event is published
- AC3: Refund transaction is created and linked to order
- AC4: RefundCompleted or RefundFailed event is published
- AC5: Order refund status is updated
- AC6: User is notified of refund status

#### REQ-ORD-007: Order History [Phase 3]
The system SHALL maintain complete order history for users.

**Acceptance Criteria:**
- AC1: Users can view all their orders
- AC2: Order details include items, pricing, and status
- AC3: Payment and refund history is accessible
- AC4: Invoice download links are provided
- AC5: Orders are sorted by creation date descending

### 2.2 Order Items

#### REQ-ORD-008: Order Item Creation [Phase 3]
The system SHALL create order items for each purchased course.

**Acceptance Criteria:**
- AC1: OrderItem captures course, pricing, and discount
- AC2: Original and discounted prices are stored
- AC3: Tax amount is calculated and stored
- AC4: OrderItemAdded event is published
- AC5: Course snapshot is preserved for historical reference

#### REQ-ORD-009: Order Item Pricing [Phase 3]
The system SHALL calculate order item pricing with discounts and taxes.

**Acceptance Criteria:**
- AC1: Base price is retrieved from course
- AC2: Discount is applied if coupon is used
- AC3: Tax is calculated based on user location
- AC4: Final price includes all adjustments
- AC5: Pricing breakdown is stored for transparency

### 2.3 Invoicing

#### REQ-ORD-010: Invoice Generation [Phase 3]
The system SHALL generate invoices for confirmed orders.

**Acceptance Criteria:**
- AC1: Invoice is created when order is confirmed
- AC2: Invoice number is generated in format INV-YYYYMMDD-XXXXX
- AC3: InvoiceGenerated event is published
- AC4: Invoice includes billing address and tax details
- AC5: Invoice line items match order items
- AC6: PDF invoice is generated and stored

#### REQ-ORD-011: Invoice Sending [Phase 3]
The system SHALL send invoices to users via email.

**Acceptance Criteria:**
- AC1: Invoice email is sent to user's email address
- AC2: PDF invoice is attached to email
- AC3: InvoiceSent event is published
- AC4: Invoice sent timestamp is recorded
- AC5: Email includes order summary and payment details

#### REQ-ORD-012: Invoice Download [Phase 3]
The system SHALL allow users to download invoices.

**Acceptance Criteria:**
- AC1: Invoice PDF is accessible via secure URL
- AC2: InvoiceDownloaded event is published
- AC3: Download requires user authentication
- AC4: Invoice format complies with tax regulations
- AC5: Multiple downloads are allowed

#### REQ-ORD-013: Invoice Regeneration [Phase 4]
The system SHALL support regenerating invoices with corrections.

**Acceptance Criteria:**
- AC1: Admin can regenerate invoice for an order
- AC2: Previous invoice is marked as superseded
- AC3: InvoiceRegenerated event is published
- AC4: New invoice number is generated
- AC5: User is notified of updated invoice

### 2.4 Credit Notes

#### REQ-ORD-014: Credit Note Creation [Phase 3]
The system SHALL create credit notes for refunded orders.

**Acceptance Criteria:**
- AC1: Credit note is generated when refund is processed
- AC2: Credit note number is generated in format CN-YYYYMMDD-XXXXX
- AC3: CreditNoteGenerated event is published
- AC4: Credit note references original invoice
- AC5: Refund amount and reason are documented

#### REQ-ORD-015: Credit Note Sending [Phase 3]
The system SHALL send credit notes to users via email.

**Acceptance Criteria:**
- AC1: Credit note email is sent to user
- AC2: PDF credit note is attached
- AC3: CreditNoteSent event is published
- AC4: Email includes refund details
- AC5: Credit note sent timestamp is recorded

#### REQ-ORD-016: Credit Note Download [Phase 3]
The system SHALL allow users to download credit notes.

**Acceptance Criteria:**
- AC1: Credit note PDF is accessible via secure URL
- AC2: CreditNoteDownloaded event is published
- AC3: Download requires user authentication
- AC4: Credit note format complies with tax regulations

### 2.5 Payment Transactions

#### REQ-ORD-017: Transaction Recording [Phase 3]
The system SHALL record all payment transactions.

**Acceptance Criteria:**
- AC1: Transaction captures payment method, amount, and status
- AC2: PaymentTransactionCreated event is published
- AC3: Transaction is linked to order
- AC4: Payment gateway transaction ID is stored
- AC5: Transaction timestamp is recorded

#### REQ-ORD-018: Transaction Status Tracking [Phase 3]
The system SHALL track payment transaction status changes.

**Acceptance Criteria:**
- AC1: Transaction status can be Pending, Completed, Failed, Refunded
- AC2: PaymentStatusChanged event is published on updates
- AC3: Status change timestamp is recorded
- AC4: Failure reason is captured for failed transactions

#### REQ-ORD-019: Refund Transaction Recording [Phase 3]
The system SHALL record refund transactions separately.

**Acceptance Criteria:**
- AC1: Refund transaction is created with negative amount
- AC2: RefundTransactionCreated event is published
- AC3: Refund is linked to original payment transaction
- AC4: Refund gateway transaction ID is stored
- AC5: Refund reason is documented

### 2.6 Order Pricing

#### REQ-ORD-020: Price Calculation [Phase 3]
The system SHALL calculate order total with all adjustments.

**Acceptance Criteria:**
- AC1: Subtotal is sum of all item prices
- AC2: Discounts are applied to subtotal
- AC3: Tax is calculated on discounted subtotal
- AC4: Total includes subtotal, discount, and tax
- AC5: All amounts are stored with 2 decimal precision

#### REQ-ORD-021: Currency Handling [Phase 3]
The system SHALL support multiple currencies for orders.

**Acceptance Criteria:**
- AC1: Order currency is determined by course pricing
- AC2: All order amounts use same currency
- AC3: Currency code (ISO 4217) is stored with order
- AC4: Currency symbol is used in display
- AC5: Exchange rates are not applied (single currency per order)

### 2.7 Order Validation

#### REQ-ORD-022: Order Creation Validation [Phase 3]
The system SHALL validate orders before creation.

**Acceptance Criteria:**
- AC1: User must be authenticated
- AC2: Cart must contain at least one item
- AC3: All courses must be published and available
- AC4: User must not already own purchased courses
- AC5: Payment method must be valid
- AC6: Billing address must be provided for tax calculation

#### REQ-ORD-023: Cancellation Validation [Phase 3]
The system SHALL validate order cancellation requests.

**Acceptance Criteria:**
- AC1: Order must be in Confirmed or Fulfilled status
- AC2: Cancellation must be within allowed timeframe (30 days)
- AC3: User must be order owner or admin
- AC4: Refund policy conditions are checked
- AC5: OrderCancellationValidationFailed event published on failure

---

## 3. Domain Model

### 3.1 Entities

| Entity | Description |
|--------|-------------|
| Order | Complete purchase transaction with items and pricing |
| OrderItem | Individual course purchase within an order |
| Invoice | Billing document for confirmed order |
| CreditNote | Document for refunded amount |
| PaymentTransaction | Record of payment or refund transaction |
| BillingAddress | Address for tax calculation and invoicing |
| OrderAuditLog | Audit trail of order changes |

### 3.2 Domain Events

| Event | Trigger |
|-------|---------|
| OrderCreated | Order is created from checkout |
| OrderConfirmed | Payment successful, order confirmed |
| OrderFulfilled | Access granted, order fulfilled |
| OrderCancelled | Order is cancelled |
| OrderItemAdded | Item added to order |
| OrderItemCancelled | Individual item cancelled |
| OrderStatusChanged | Order status updated |
| OrderPriceCalculated | Order total calculated |
| PaymentTransactionCreated | Payment transaction recorded |
| PaymentStatusChanged | Payment status updated |
| RefundInitiated | Refund process started |
| RefundCompleted | Refund successfully processed |
| RefundFailed | Refund processing failed |
| RefundTransactionCreated | Refund transaction recorded |
| InvoiceGenerated | Invoice created for order |
| InvoiceSent | Invoice emailed to user |
| InvoiceDownloaded | Invoice PDF downloaded |
| InvoiceRegenerated | Invoice recreated with corrections |
| CreditNoteGenerated | Credit note created for refund |
| CreditNoteSent | Credit note emailed to user |
| CreditNoteDownloaded | Credit note PDF downloaded |
| OrderCancellationValidationFailed | Cancellation validation failed |

---

## 4. API Endpoints

### 4.1 Orders

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/orders | Create order from cart |
| GET | /api/orders | Get user's order history |
| GET | /api/orders/{id} | Get order details |
| POST | /api/orders/{id}/cancel | Cancel order |
| POST | /api/orders/{id}/items/{itemId}/cancel | Cancel order item |

### 4.2 Invoices

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/orders/{orderId}/invoice | Get invoice details |
| GET | /api/orders/{orderId}/invoice/download | Download invoice PDF |
| POST | /api/orders/{orderId}/invoice/resend | Resend invoice email |

### 4.3 Credit Notes

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/orders/{orderId}/credit-notes | Get order credit notes |
| GET | /api/credit-notes/{id}/download | Download credit note PDF |

### 4.4 Transactions

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/orders/{orderId}/transactions | Get order transactions |
| GET | /api/transactions/{id} | Get transaction details |

### 4.5 Admin Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/admin/orders | Get all orders with filters |
| PUT | /api/admin/orders/{id}/status | Update order status |
| POST | /api/admin/orders/{id}/refund | Process manual refund |
| POST | /api/admin/invoices/{id}/regenerate | Regenerate invoice |

---

## 5. Business Rules

### 5.1 Order Cancellation Policy

- Orders can be cancelled within 30 days of purchase
- Refund amount is 100% if no course content accessed
- Refund amount is 50% if less than 30% course completed
- No refund if more than 30% course completed

### 5.2 Invoice Numbering

- Invoice numbers follow format: INV-YYYYMMDD-XXXXX
- Credit note numbers follow format: CN-YYYYMMDD-XXXXX
- Order numbers follow format: ORD-YYYYMMDD-XXXXX
- Sequential numbers reset daily

### 5.3 Tax Calculation

- Tax rate determined by billing address country/state
- Tax applied after discounts
- Tax details included in invoice
- Zero-rated transactions for certain jurisdictions

---

## 6. Security Considerations

- Order access restricted to owner and admins
- Invoice downloads require authentication
- Payment transaction details are encrypted
- Refund requests are logged for audit
- Sensitive payment data is not stored (PCI compliance)
- All financial operations are logged

---

## 7. Dependencies

- Serilog for structured logging
- MediatR for CQRS pattern
- Entity Framework Core for data access
- FluentValidation for request validation
- Payment gateway integration (Stripe/PayPal)
- PDF generation library for invoices

---

## 8. Implementation Notes

Per the implementation specification (REQ-SYS-005, REQ-SYS-006), all data access SHALL use ICoursesPlatformContext directly without repository pattern.

---

*Document Version: 1.0*
*Phase Coverage: 3-4*
