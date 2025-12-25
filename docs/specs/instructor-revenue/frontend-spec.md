# Instructor Revenue - Frontend Specification

**Feature:** Instructor Revenue
**Version:** 1.0
**Last Updated:** December 2024

---

## 1. Overview

The Instructor Revenue frontend provides user interfaces for viewing earnings, managing payout methods, reviewing payouts, and handling tax information.

---

## 2. Requirements

### 2.1 Earnings Dashboard

#### REQ-REV-FE-001: Earnings Overview Page [Phase 3]
The application SHALL provide an earnings overview dashboard for instructors.

**Acceptance Criteria:**
- AC1: Dashboard displays total earnings to date
- AC2: Current month earnings are highlighted
- AC3: Pending vs paid earnings are shown separately
- AC4: Chart shows earnings trend over last 12 months
- AC5: Quick stats show number of sales and average revenue per sale
- AC6: Page updates in real-time when new earnings are recorded

#### REQ-REV-FE-002: Earnings List [Phase 3]
The application SHALL provide a detailed earnings transaction list.

**Acceptance Criteria:**
- AC1: List displays all earning records with date, course, amount
- AC2: List supports filtering by date range, course, status
- AC3: List supports sorting by date, amount, course name
- AC4: Pagination is implemented for large datasets
- AC5: Each row shows gross amount, platform fee, net amount
- AC6: Clicking a row shows earning details modal

#### REQ-REV-FE-003: Earnings Detail View [Phase 3]
The application SHALL provide detailed view of individual earnings.

**Acceptance Criteria:**
- AC1: Detail shows related enrollment information
- AC2: Detail shows revenue breakdown with percentages
- AC3: Detail shows any adjustments made
- AC4: Detail shows payout status (pending/included in payout)
- AC5: Detail includes timestamp and transaction ID

#### REQ-REV-FE-004: Earnings Export [Phase 3]
The application SHALL allow exporting earnings data.

**Acceptance Criteria:**
- AC1: Export button generates CSV file
- AC2: Export includes all filtered/visible earnings
- AC3: Export shows all earning details and calculations
- AC4: File name includes date range
- AC5: Export progress indicator is shown

### 2.2 Revenue Breakdown

#### REQ-REV-FE-005: Revenue Summary [Phase 3]
The application SHALL display revenue summary and breakdown.

**Acceptance Criteria:**
- AC1: Summary shows total gross revenue
- AC2: Summary shows total platform fees
- AC3: Summary shows total net earnings
- AC4: Summary can be toggled between monthly, quarterly, yearly
- AC5: Pie chart shows revenue by course
- AC6: Bar chart shows monthly revenue trend

#### REQ-REV-FE-006: Revenue Share Display [Phase 3]
The application SHALL show revenue share configuration.

**Acceptance Criteria:**
- AC1: Current revenue share percentage is displayed prominently
- AC2: Visual indicator shows instructor vs platform split
- AC3: History of revenue share changes is available
- AC4: Help text explains revenue share model

### 2.3 Payout Methods

#### REQ-REV-FE-007: Payout Methods List [Phase 3]
The application SHALL display configured payout methods.

**Acceptance Criteria:**
- AC1: List shows all payout methods with type icons
- AC2: Primary method is clearly indicated
- AC3: Each method shows masked account details
- AC4: Add new method button is visible
- AC5: Edit and delete buttons available per method
- AC6: Verification status is shown for each method

#### REQ-REV-FE-008: Add Payout Method [Phase 3]
The application SHALL provide form to add payout methods.

**Acceptance Criteria:**
- AC1: Form allows selecting method type (Bank, PayPal, Stripe)
- AC2: Form fields change based on selected type
- AC3: Bank form includes routing number, account number, account type
- AC4: PayPal form includes email validation
- AC5: All fields have appropriate validation
- AC6: Success message shown after adding
- AC7: Form includes security disclaimer

#### REQ-REV-FE-009: Edit Payout Method [Phase 3]
The application SHALL allow editing payout method details.

**Acceptance Criteria:**
- AC1: Edit form pre-populates with existing data
- AC2: Sensitive fields show masked values
- AC3: Confirmation required for changes
- AC4: Success notification shown after update
- AC5: Validation prevents invalid changes

#### REQ-REV-FE-010: Delete Payout Method [Phase 3]
The application SHALL allow removing payout methods.

**Acceptance Criteria:**
- AC1: Delete button shows confirmation dialog
- AC2: Warning shown if method has pending payouts
- AC3: Primary method cannot be deleted if it's the only method
- AC4: Success message shown after deletion
- AC5: List updates immediately after deletion

### 2.4 Payout Management

#### REQ-REV-FE-011: Payout History [Phase 3]
The application SHALL display payout history.

**Acceptance Criteria:**
- AC1: List shows all payouts with date, amount, status
- AC2: Status badge uses color coding (pending, completed, failed)
- AC3: Clicking payout shows details
- AC4: List supports filtering by status and date range
- AC5: List supports pagination
- AC6: Next payout date is displayed

#### REQ-REV-FE-012: Payout Details [Phase 3]
The application SHALL show detailed payout information.

**Acceptance Criteria:**
- AC1: Details show included earnings breakdown
- AC2: Details show payout method used
- AC3: Details show all status changes with timestamps
- AC4: Details include transaction ID if completed
- AC5: Retry button available for failed payouts
- AC6: Details show expected arrival date

#### REQ-REV-FE-013: Payout Schedule Settings [Phase 3]
The application SHALL allow configuring payout schedule.

**Acceptance Criteria:**
- AC1: Settings show current schedule (weekly/monthly)
- AC2: Radio buttons allow changing frequency
- AC3: Minimum threshold amount is displayed
- AC4: Next payout date updates when frequency changes
- AC5: Save button with confirmation
- AC6: Help text explains schedule options

### 2.5 Tax Information

#### REQ-REV-FE-014: Tax Forms Management [Phase 3]
The application SHALL provide tax form management interface.

**Acceptance Criteria:**
- AC1: Page shows required form type based on location
- AC2: Current form status is displayed (missing, pending, approved, expired)
- AC3: Upload button allows selecting PDF or image
- AC4: File size and type validation before upload
- AC5: Preview of uploaded form is available
- AC6: Expiration date is shown with renewal reminder

#### REQ-REV-FE-015: Tax Form Upload [Phase 3]
The application SHALL provide tax form upload functionality.

**Acceptance Criteria:**
- AC1: Drag and drop or click to upload
- AC2: File preview before submission
- AC3: Progress bar during upload
- AC4: Validation error messages
- AC5: Success confirmation after upload
- AC6: Security disclaimer about data protection

#### REQ-REV-FE-016: Tax Reports [Phase 3]
The application SHALL display available tax reports.

**Acceptance Criteria:**
- AC1: List shows reports by tax year
- AC2: Download button for each report
- AC3: Report type (1099, etc.) is indicated
- AC4: Generation status shown (generating, ready)
- AC5: Reports available from January 31st each year

#### REQ-REV-FE-017: Tax Information Form [Phase 3]
The application SHALL provide form for entering tax information.

**Acceptance Criteria:**
- AC1: Form includes tax ID/SSN field (masked)
- AC2: Form includes legal name and address
- AC3: Form includes tax classification selection
- AC4: All fields have validation
- AC5: Save button with confirmation
- AC6: Security badge shown for data protection

---

## 3. Component Architecture

### 3.1 Pages

| Component | Route | Description |
|-----------|-------|-------------|
| EarningsDashboardPage | /instructor/earnings | Earnings overview |
| EarningsListPage | /instructor/earnings/transactions | Detailed earnings list |
| PayoutMethodsPage | /instructor/payouts/methods | Manage payout methods |
| PayoutHistoryPage | /instructor/payouts/history | View payout history |
| PayoutSchedulePage | /instructor/payouts/schedule | Configure schedule |
| TaxInformationPage | /instructor/tax | Tax forms and reports |
| RevenueReportsPage | /instructor/revenue/reports | Revenue analytics |

### 3.2 Components

| Component | Description |
|-----------|-------------|
| EarningsSummaryCard | Total earnings display card |
| EarningsChart | Earnings trend chart |
| EarningsTable | Earnings transaction table |
| RevenueBreakdownChart | Revenue split visualization |
| PayoutMethodCard | Payout method display card |
| PayoutMethodForm | Add/edit payout method form |
| PayoutHistoryTable | Payout history table |
| PayoutDetailsModal | Payout details dialog |
| PayoutScheduleForm | Schedule configuration form |
| TaxFormUpload | Tax form upload component |
| TaxReportsList | Tax reports list |

### 3.3 Services

| Service | Description |
|---------|-------------|
| EarningsService | Earnings API calls |
| PayoutService | Payout management API calls |
| TaxService | Tax information API calls |
| RevenueService | Revenue analytics API calls |

---

## 4. State Management

Per REQ-FE-009, state management SHALL use RxJS (not NgRx or Signals).

### 4.1 Earnings State

```typescript
interface EarningsState {
  earnings: Earning[];
  summary: EarningsSummary | null;
  selectedEarning: Earning | null;
  isLoading: boolean;
  error: string | null;
}
```

### 4.2 Payout State

```typescript
interface PayoutState {
  payoutMethods: PayoutMethod[];
  payouts: Payout[];
  schedule: PayoutSchedule | null;
  isLoading: boolean;
  error: string | null;
}
```

### 4.3 Tax State

```typescript
interface TaxState {
  taxForms: TaxForm[];
  taxReports: TaxReport[];
  taxInformation: TaxInformation | null;
  isLoading: boolean;
}
```

---

## 5. UI/UX Requirements

### 5.1 Design System

Per REQ-FE-006 and REQ-FE-010, the application SHALL use Angular Material with Material 3 guidelines and default theme colors.

### 5.2 Responsive Design

Per REQ-FE-018, all pages SHALL be responsive and follow mobile-first design:
- Mobile: Single column layout, stacked cards
- Tablet: Two column layout for earnings and payouts
- Desktop: Multi-column dashboard with charts

### 5.3 Data Visualization

- Use Chart.js or similar for earnings charts
- Use color coding for positive/negative adjustments
- Use progress indicators for pending payouts
- Use badges for status indicators

### 5.4 Security Indicators

- Show security badges on sensitive forms
- Mask sensitive data (account numbers, tax IDs)
- Show encryption indicators on tax forms
- Display last 4 digits only for account numbers

### 5.5 Component Naming

Per REQ-FE-012 and REQ-FE-013:
- Class names SHALL NOT have "Component" suffix
- File names SHALL NOT have "component" prefix

---

## 6. Form Validation

### 6.1 Payout Method Validation

**Bank Account:**
- Routing number: Required, 9 digits
- Account number: Required, 4-17 digits
- Account type: Required (Checking/Savings)
- Account holder name: Required, matches user name

**PayPal:**
- Email: Required, valid email format
- Email: Must match verified PayPal account

### 6.2 Tax Form Validation

- Tax ID: Required, valid format for country
- Legal name: Required, matches account
- Address: Required, complete address
- Tax classification: Required selection

---

## 7. Error Handling

### 7.1 API Errors

| Error Code | User Message |
|------------|--------------|
| 400 | Invalid data provided. Please check your input. |
| 403 | You don't have permission to access this resource. |
| 404 | Resource not found. |
| 409 | This payout method already exists. |
| 422 | Minimum payout threshold not met. |
| 500 | Something went wrong. Please try again. |

### 7.2 Validation Errors

- Display inline below the field
- Use red color for error state
- Show specific validation messages
- Clear error when field is corrected

---

## 8. Notifications

### 8.1 In-App Notifications

- Show toast when earnings are added
- Show notification when payout is created
- Alert when tax form is expiring
- Notify when payout is completed

### 8.2 Empty States

- "No earnings yet" with encouragement to create courses
- "No payout methods" with CTA to add one
- "No payouts yet" with information about schedule
- "No tax forms" with upload instructions

---

## 9. Testing Requirements

### 9.1 Unit Tests (Jest)

Per REQ-FE-021, unit tests SHALL use Jest:
- Test earnings calculations
- Test payout method validation
- Test state management
- Test service API calls with mocks
- Minimum 80% code coverage

### 9.2 E2E Tests (Playwright)

Per REQ-FE-022, E2E tests SHALL use Playwright:
- Test adding payout method flow
- Test viewing earnings flow
- Test uploading tax form flow
- Test configuring payout schedule

---

## 10. Implementation Notes

### 10.1 API Base URL

Per REQ-FE-026, the baseUrl configuration SHALL contain ONLY the base URI:
```typescript
// Correct
baseUrl = "http://localhost:7200"
this.http.get(`${baseUrl}/api/instructors/me/earnings`)

// Incorrect
baseUrl = "http://localhost:7200/api"
```

### 10.2 File Structure

Per REQ-FE-015 and REQ-FE-016:
- Pages in `pages/` folder
- Reusable components in `components/` folder
- Barrel exports in each folder

### 10.3 Currency Formatting

All monetary amounts SHALL be formatted using Angular's CurrencyPipe with appropriate locale and currency code.

### 10.4 Date Formatting

All dates SHALL be formatted using Angular's DatePipe with locale-aware formatting.

---

*Document Version: 1.0*
*Phase Coverage: 3*
