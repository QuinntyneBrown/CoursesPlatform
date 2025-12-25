# Orders & Transactions - Frontend Specification

**Feature:** Orders & Transactions
**Version:** 1.0
**Last Updated:** December 2024

---

## 1. Overview

The Orders & Transactions frontend provides user interfaces for viewing order history, managing orders, downloading invoices, and tracking transaction status.

---

## 2. Requirements

### 2.1 Order History

#### REQ-ORD-FE-001: Order History Page [Phase 3]
The application SHALL provide an order history page for users.

**Acceptance Criteria:**
- AC1: Page displays list of all user orders
- AC2: Orders show order number, date, total, and status
- AC3: Orders are sorted by date descending
- AC4: Filters available for status (All, Confirmed, Fulfilled, Cancelled)
- AC5: Search by order number is supported
- AC6: Pagination is implemented for large order lists

#### REQ-ORD-FE-002: Order List Item Display [Phase 3]
The application SHALL display order summary cards in list view.

**Acceptance Criteria:**
- AC1: Card shows order number and date
- AC2: Status badge displays order status with color coding
- AC3: Total amount is prominently displayed
- AC4: Course thumbnails are shown for order items
- AC5: Click on card navigates to order detail page

### 2.2 Order Details

#### REQ-ORD-FE-003: Order Detail Page [Phase 3]
The application SHALL provide detailed order view.

**Acceptance Criteria:**
- AC1: Page displays complete order information
- AC2: Order items listed with course name, price, and thumbnail
- AC3: Pricing breakdown shows subtotal, discount, tax, and total
- AC4: Payment transaction details are displayed
- AC5: Order status timeline is shown
- AC6: Download invoice button is available

#### REQ-ORD-FE-004: Order Item Display [Phase 3]
The application SHALL display order items with course details.

**Acceptance Criteria:**
- AC1: Item shows course thumbnail and title
- AC2: Original and discounted prices are displayed
- AC3: Discount amount is shown if applicable
- AC4: Link to course detail page is provided
- AC5: Cancel item button shown if cancellation allowed

#### REQ-ORD-FE-005: Order Status Timeline [Phase 3]
The application SHALL display order status progression.

**Acceptance Criteria:**
- AC1: Timeline shows Created, Confirmed, Fulfilled stages
- AC2: Current status is highlighted
- AC3: Timestamps are displayed for each completed stage
- AC4: Visual indicator shows progression
- AC5: Cancelled status shown separately if applicable

### 2.3 Order Actions

#### REQ-ORD-FE-006: Order Cancellation [Phase 3]
The application SHALL provide order cancellation interface.

**Acceptance Criteria:**
- AC1: Cancel order button shown if eligible
- AC2: Confirmation dialog displays refund policy
- AC3: Cancellation reason selection is required
- AC4: Success notification shown on completion
- AC5: Error message displayed if cancellation fails
- AC6: Order status updates immediately

#### REQ-ORD-FE-007: Partial Order Cancellation [Phase 4]
The application SHALL support cancelling individual order items.

**Acceptance Criteria:**
- AC1: Cancel button shown for each eligible item
- AC2: Confirmation dialog shows partial refund amount
- AC3: Success notification shown on completion
- AC4: Item list updates to show cancelled items
- AC5: Order total recalculates automatically

### 2.4 Invoices

#### REQ-ORD-FE-008: Invoice Display [Phase 3]
The application SHALL display invoice information.

**Acceptance Criteria:**
- AC1: Invoice section shows invoice number and date
- AC2: Download invoice button is prominent
- AC3: Resend invoice email option available
- AC4: Invoice status (Sent, Downloaded) is displayed
- AC5: Billing address is shown

#### REQ-ORD-FE-009: Invoice Download [Phase 3]
The application SHALL support invoice PDF download.

**Acceptance Criteria:**
- AC1: Download button triggers PDF download
- AC2: Loading indicator shown during download
- AC3: Success notification shown on completion
- AC4: Error message displayed if download fails
- AC5: Downloaded file named with invoice number

#### REQ-ORD-FE-010: Invoice Email Resend [Phase 3]
The application SHALL allow resending invoice emails.

**Acceptance Criteria:**
- AC1: Resend button available on order detail page
- AC2: Confirmation message shown before sending
- AC3: Success notification displayed after sending
- AC4: Email sent timestamp updates

### 2.5 Credit Notes

#### REQ-ORD-FE-011: Credit Note Display [Phase 3]
The application SHALL display credit notes for refunded orders.

**Acceptance Criteria:**
- AC1: Credit notes section shown for cancelled orders
- AC2: Credit note number and date displayed
- AC3: Refunded amount prominently shown
- AC4: Download credit note button available
- AC5: Refund reason is displayed

#### REQ-ORD-FE-012: Credit Note Download [Phase 3]
The application SHALL support credit note PDF download.

**Acceptance Criteria:**
- AC1: Download button triggers PDF download
- AC2: Loading indicator shown during download
- AC3: Success notification shown on completion
- AC4: Downloaded file named with credit note number

### 2.6 Payment Transactions

#### REQ-ORD-FE-013: Transaction History [Phase 3]
The application SHALL display payment transaction history.

**Acceptance Criteria:**
- AC1: Transactions section shows all related transactions
- AC2: Payment and refund transactions are differentiated
- AC3: Transaction date, amount, and status displayed
- AC4: Payment method shown for each transaction
- AC5: Transaction ID displayed for reference

#### REQ-ORD-FE-014: Transaction Status Display [Phase 3]
The application SHALL show transaction status with visual indicators.

**Acceptance Criteria:**
- AC1: Status badge uses color coding (green=completed, red=failed, yellow=pending)
- AC2: Failed transactions show error message
- AC3: Pending transactions show processing indicator
- AC4: Refunded transactions link to refund details

### 2.7 Order Search and Filters

#### REQ-ORD-FE-015: Order Search [Phase 3]
The application SHALL provide order search functionality.

**Acceptance Criteria:**
- AC1: Search input accepts order number
- AC2: Search results update in real-time
- AC3: No results message shown if order not found
- AC4: Clear search button available

#### REQ-ORD-FE-016: Order Filters [Phase 3]
The application SHALL support filtering orders by status.

**Acceptance Criteria:**
- AC1: Filter dropdown with status options
- AC2: Multiple status selection supported
- AC3: Active filters shown with badges
- AC4: Clear filters option available
- AC5: Filter state persists during session

---

## 3. Component Architecture

### 3.1 Pages

| Component | Route | Description |
|-----------|-------|-------------|
| OrderHistoryPage | /orders | Order history list |
| OrderDetailPage | /orders/:id | Detailed order view |
| InvoicePage | /orders/:id/invoice | Invoice details |

### 3.2 Components

| Component | Description |
|-----------|-------------|
| OrderList | List of order summary cards |
| OrderCard | Individual order summary card |
| OrderDetailView | Complete order information display |
| OrderItemList | List of order items |
| OrderItemCard | Individual order item display |
| OrderStatusTimeline | Visual status progression |
| OrderPricingBreakdown | Price calculation display |
| OrderActionsMenu | Order action buttons |
| InvoiceViewer | Invoice information display |
| CreditNoteList | List of credit notes |
| TransactionHistory | Transaction list display |
| OrderFilters | Status filter controls |
| OrderSearchBar | Search input component |
| CancellationDialog | Order cancellation confirmation |

### 3.3 Services

| Service | Description |
|---------|-------------|
| OrderService | Order API calls |
| InvoiceService | Invoice API calls |
| TransactionService | Transaction API calls |

---

## 4. State Management

Per REQ-FE-009, state management SHALL use RxJS (not NgRx or Signals).

### 4.1 Order State

```typescript
interface OrderState {
  orders: Order[];
  selectedOrder: Order | null;
  filters: OrderFilters;
  searchTerm: string;
  isLoading: boolean;
  error: string | null;
}
```

### 4.2 Order Filters

```typescript
interface OrderFilters {
  statuses: OrderStatus[];
  dateFrom: Date | null;
  dateTo: Date | null;
}
```

---

## 5. UI/UX Requirements

### 5.1 Design System

Per REQ-FE-006 and REQ-FE-010, the application SHALL use Angular Material with Material 3 guidelines and default theme colors.

### 5.2 Status Color Coding

- **Pending**: Yellow (#FFC107)
- **Confirmed**: Blue (#2196F3)
- **Fulfilled**: Green (#4CAF50)
- **Cancelled**: Red (#F44336)
- **Refunded**: Orange (#FF9800)

### 5.3 Responsive Design

Per REQ-FE-018, all pages SHALL be responsive and follow mobile-first design:
- Mobile: Single column, stacked layout
- Tablet: Two column where appropriate
- Desktop: Full width with sidebar navigation

### 5.4 Accessibility

- All interactive elements MUST have proper labels
- Status indicators MUST use icons AND text
- Tables MUST have proper headers
- Focus management for dialogs
- Keyboard navigation support

### 5.5 Component Naming

Per REQ-FE-012 and REQ-FE-013:
- Class names SHALL NOT have "Component" suffix
- File names SHALL NOT have "component" prefix

---

## 6. Data Display

### 6.1 Date Formatting

- Order date: "MMM dd, yyyy" (e.g., "Dec 25, 2024")
- Date with time: "MMM dd, yyyy HH:mm" (e.g., "Dec 25, 2024 14:30")
- Timeline: Relative format (e.g., "2 days ago")

### 6.2 Currency Formatting

- Amount with currency symbol (e.g., "$49.99")
- Two decimal places required
- Negative amounts for refunds (e.g., "-$49.99")

### 6.3 Order Number Display

- Full format with prefix (e.g., "ORD-20241225-00123")
- Monospace font for readability
- Copyable on click

---

## 7. Error Handling

### 7.1 API Errors

| Error Code | User Message |
|------------|--------------|
| 401 | Please log in to view orders. |
| 403 | Access denied to this order. |
| 404 | Order not found. |
| 400 | Cannot cancel order at this time. |
| 500 | Something went wrong. Please try again. |

### 7.2 Validation Errors

- Display inline below the field
- Use red color for error state
- Clear error when action is corrected

---

## 8. Loading States

### 8.1 Order List Loading

- Skeleton loaders for order cards
- Minimum 3 skeleton cards shown
- Progressive loading for pagination

### 8.2 Order Detail Loading

- Skeleton loader for entire page
- Individual sections load progressively
- Shimmer animation for loading state

### 8.3 Action Loading

- Disable action buttons during processing
- Show spinner on button for in-progress actions
- Timeout after 30 seconds with error message

---

## 9. Testing Requirements

### 9.1 Unit Tests (Jest)

Per REQ-FE-021, unit tests SHALL use Jest:
- Test order list filtering and sorting
- Test order cancellation logic
- Test price calculation display
- Test invoice download functionality
- Minimum 80% code coverage

### 9.2 E2E Tests (Playwright)

Per REQ-FE-022, E2E tests SHALL use Playwright:
- Test complete order viewing flow
- Test order cancellation flow
- Test invoice download flow
- Test search and filter functionality

---

## 10. Implementation Notes

### 10.1 API Base URL

Per REQ-FE-026, the baseUrl configuration SHALL contain ONLY the base URI:
```typescript
// Correct
baseUrl = "http://localhost:7200"
this.http.get(`${baseUrl}/api/orders`)

// Incorrect
baseUrl = "http://localhost:7200/api"
```

### 10.2 File Structure

Per REQ-FE-015 and REQ-FE-016:
- Pages in `pages/` folder
- Reusable components in `components/` folder
- Barrel exports in each folder

---

*Document Version: 1.0*
*Phase Coverage: 3-4*
