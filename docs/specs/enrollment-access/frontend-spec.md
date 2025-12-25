# Enrollment & Access - Frontend Specification

**Feature:** Enrollment & Access
**Version:** 1.0
**Last Updated:** December 2024

---

## 1. Overview

The Enrollment & Access frontend provides user interfaces for course enrollment, managing enrollments, and checking course access status.

---

## 2. Requirements

### 2.1 Course Enrollment

#### REQ-ENR-FE-001: Course Enrollment Button [Phase 1]
The application SHALL display enrollment button on course detail pages.

**Acceptance Criteria:**
- AC1: "Enroll Now" button shown for unenrolled courses
- AC2: "Already Enrolled" indicator for enrolled courses
- AC3: Button is disabled if course is unavailable
- AC4: Loading state shown during enrollment
- AC5: Success message displayed after enrollment
- AC6: Error messages shown for enrollment failures

#### REQ-ENR-FE-002: Free Course Enrollment [Phase 2]
The application SHALL support enrolling in free courses.

**Acceptance Criteria:**
- AC1: Single click enrollment for free courses
- AC2: Confirmation dialog before enrollment
- AC3: Immediate redirect to course content upon success
- AC4: Enrollment added to user's course list

#### REQ-ENR-FE-003: Paid Course Enrollment [Phase 2]
The application SHALL support paid course enrollment flow.

**Acceptance Criteria:**
- AC1: Clicking "Enroll" opens payment dialog
- AC2: Course price is clearly displayed
- AC3: Payment form is embedded or opens modal
- AC4: Loading state during payment processing
- AC5: Success redirects to course after payment
- AC6: Payment errors are displayed clearly

#### REQ-ENR-FE-004: Coupon Application [Phase 2]
The application SHALL allow applying discount coupons.

**Acceptance Criteria:**
- AC1: Coupon code input field on enrollment page
- AC2: "Apply" button validates coupon
- AC3: Valid coupon shows discount amount
- AC4: Invalid coupon shows error message
- AC5: Price updates when valid coupon applied
- AC6: Coupon can be removed before checkout

### 2.2 Enrollment Management

#### REQ-ENR-FE-005: My Enrollments Page [Phase 1]
The application SHALL provide a page listing user's enrollments.

**Acceptance Criteria:**
- AC1: Grid or list view of all enrollments
- AC2: Filters for Active, Suspended, Expired enrollments
- AC3: Search by course name
- AC4: Each enrollment shows course thumbnail, title, status
- AC5: Click to navigate to course content
- AC6: Progress indicator for each enrollment

#### REQ-ENR-FE-006: Unenroll Action [Phase 1]
The application SHALL allow users to unenroll from courses.

**Acceptance Criteria:**
- AC1: "Unenroll" button available on enrollment card
- AC2: Confirmation dialog warns about data loss
- AC3: Requires user to type course name to confirm
- AC4: Loading state during unenrollment
- AC5: Enrollment removed from list on success
- AC6: Success notification displayed

#### REQ-ENR-FE-007: Enrollment Details Modal [Phase 2]
The application SHALL display enrollment details in a modal.

**Acceptance Criteria:**
- AC1: Click on enrollment opens details modal
- AC2: Shows enrollment date, status, expiration
- AC3: Shows payment information if paid
- AC4: Shows gift information if received as gift
- AC5: Access history is displayed
- AC6: Close button dismisses modal

### 2.3 Gift Enrollment

#### REQ-ENR-FE-008: Gift Purchase Flow [Phase 2]
The application SHALL support purchasing course as gift.

**Acceptance Criteria:**
- AC1: "Gift This Course" button on course page
- AC2: Form to enter recipient email
- AC3: Optional gift message field
- AC4: Payment flow for gift purchase
- AC5: Confirmation email to purchaser
- AC6: Gift code generated and displayed

#### REQ-ENR-FE-009: Gift Redemption [Phase 2]
The application SHALL allow redeeming gift enrollments.

**Acceptance Criteria:**
- AC1: "Redeem Gift" button in navigation
- AC2: Input field for gift code
- AC3: Validation of gift code
- AC4: Display course details before redemption
- AC5: Confirm button to claim gift
- AC6: Redirect to course after claiming

### 2.4 Waitlist

#### REQ-ENR-FE-010: Join Waitlist [Phase 4]
The application SHALL allow joining course waitlists.

**Acceptance Criteria:**
- AC1: "Join Waitlist" button when course is full
- AC2: Shows current waitlist position
- AC3: Notification preference toggle
- AC4: Confirmation message after joining
- AC5: "Leave Waitlist" option available

#### REQ-ENR-FE-011: Waitlist Notifications [Phase 4]
The application SHALL notify users when spots become available.

**Acceptance Criteria:**
- AC1: In-app notification when spot available
- AC2: Email notification option
- AC3: Limited time to claim spot (24 hours)
- AC4: Countdown timer for claim window
- AC5: Auto-removal if not claimed in time

### 2.5 Access Status

#### REQ-ENR-FE-012: Access Indicator [Phase 1]
The application SHALL display access status on content pages.

**Acceptance Criteria:**
- AC1: Lock icon for restricted content
- AC2: Unlock icon for accessible content
- AC3: Tooltip explains access status
- AC4: "Enroll to Access" button for locked content
- AC5: Expiration date shown if access is time-limited

#### REQ-ENR-FE-013: Access Denied Page [Phase 1]
The application SHALL display access denied page for restricted content.

**Acceptance Criteria:**
- AC1: Clear message explaining access denied
- AC2: Reason for denial (not enrolled, expired, etc.)
- AC3: Call-to-action button to enroll
- AC4: Link to course details page
- AC5: Support contact information

### 2.6 Administration

#### REQ-ENR-FE-014: Enrollment Management Admin [Phase 3]
The application SHALL provide admin interface for enrollment management.

**Acceptance Criteria:**
- AC1: List all enrollments with filters
- AC2: Search by user or course
- AC3: Suspend/resume enrollment actions
- AC4: Extend expiration action
- AC5: Transfer enrollment action
- AC6: Bulk operations support

#### REQ-ENR-FE-015: Access Audit Logs [Phase 3]
The application SHALL display access audit logs for administrators.

**Acceptance Criteria:**
- AC1: Searchable table of access attempts
- AC2: Filter by user, course, date range, result
- AC3: Export to CSV option
- AC4: Pagination for large datasets
- AC5: Detail view for each log entry

---

## 3. Component Architecture

### 3.1 Pages

| Component | Route | Description |
|-----------|-------|-------------|
| MyEnrollmentsPage | /my-enrollments | User's course enrollments |
| EnrollmentCheckoutPage | /enroll/:courseId | Enrollment checkout flow |
| GiftPurchasePage | /gift/:courseId | Gift enrollment purchase |
| RedeemGiftPage | /redeem-gift | Redeem gift code |
| EnrollmentAdminPage | /admin/enrollments | Admin enrollment management |
| AccessAuditPage | /admin/access-logs | Access audit logs |
| AccessDeniedPage | /access-denied | Access denied error page |

### 3.2 Components

| Component | Description |
|-----------|-------------|
| EnrollButton | Enrollment button with status |
| EnrollmentCard | Enrollment card in list |
| EnrollmentStatusBadge | Badge showing enrollment status |
| CouponInput | Coupon code input with validation |
| GiftPurchaseForm | Form for purchasing gift |
| GiftRedemptionForm | Form for redeeming gift |
| WaitlistButton | Join/leave waitlist button |
| AccessStatusIndicator | Lock/unlock icon with tooltip |
| EnrollmentDetailsModal | Modal showing enrollment details |
| UnenrollConfirmDialog | Confirmation dialog for unenroll |

### 3.3 Services

| Service | Description |
|---------|-------------|
| EnrollmentService | Enrollment API calls |
| AccessService | Access control API calls |
| CouponService | Coupon validation API calls |
| GiftService | Gift enrollment API calls |
| WaitlistService | Waitlist management API calls |

---

## 4. State Management

Per REQ-FE-009, state management SHALL use RxJS (not NgRx or Signals).

### 4.1 Enrollment State

```typescript
interface EnrollmentState {
  enrollments: Enrollment[];
  currentEnrollment: Enrollment | null;
  isLoading: boolean;
  error: string | null;
}
```

### 4.2 Access State

```typescript
interface AccessState {
  grants: AccessGrant[];
  currentCourseAccess: boolean;
  isChecking: boolean;
  denialReason: string | null;
}
```

---

## 5. UI/UX Requirements

### 5.1 Design System

Per REQ-FE-006 and REQ-FE-010, the application SHALL use Angular Material with Material 3 guidelines and default theme colors.

### 5.2 Enrollment Flow

- Enrollment button prominently displayed on course pages
- Clear pricing information before enrollment
- Progress indicators for multi-step enrollment
- Success confirmation after enrollment
- Error states with helpful recovery actions

### 5.3 Responsive Design

Per REQ-FE-018, all pages SHALL be responsive and follow mobile-first design:
- Mobile: Single column, stacked layout
- Tablet: Two column grid for enrollment cards
- Desktop: Three column grid with filters sidebar

### 5.4 Accessibility

- Enrollment buttons have proper ARIA labels
- Status indicators are screen-reader friendly
- Keyboard navigation for all enrollment actions
- Focus management in modals and dialogs
- Error messages announced to screen readers

### 5.5 Component Naming

Per REQ-FE-012 and REQ-FE-013:
- Class names SHALL NOT have "Component" suffix
- File names SHALL NOT have "component" prefix

---

## 6. Form Validation

### 6.1 Coupon Code Validation
- Required when coupon field is shown
- Alphanumeric characters only
- Maximum 20 characters
- Case-insensitive

### 6.2 Gift Email Validation
- Required for gift purchases
- Valid email format
- Maximum 256 characters
- Cannot be purchaser's own email

### 6.3 Gift Message Validation
- Optional field
- Maximum 500 characters
- Plain text only (no HTML)

---

## 7. Error Handling

### 7.1 API Errors

| Error Code | User Message |
|------------|--------------|
| 400 | Invalid request. Please check your information. |
| 401 | Please log in to enroll in courses. |
| 403 | You don't have permission to perform this action. |
| 404 | Course not found. |
| 409 | You are already enrolled in this course. |
| 422 | Course is not available for enrollment. |
| 429 | Too many attempts. Please wait. |
| 500 | Something went wrong. Please try again. |

### 7.2 Enrollment Errors

| Error Type | User Message |
|------------|--------------|
| Duplicate | You are already enrolled in this course. |
| Course Full | This course is full. Join the waitlist? |
| Prerequisites | You must complete prerequisites first. |
| Payment Failed | Payment failed. Please try again. |
| Invalid Coupon | Invalid or expired coupon code. |
| Gift Claimed | This gift has already been claimed. |

---

## 8. Testing Requirements

### 8.1 Unit Tests (Jest)

Per REQ-FE-021, unit tests SHALL use Jest:
- Test enrollment button states
- Test coupon validation logic
- Test access status calculations
- Test state management
- Minimum 80% code coverage

### 8.2 E2E Tests (Playwright)

Per REQ-FE-022, E2E tests SHALL use Playwright:
- Test free course enrollment flow
- Test paid course enrollment flow
- Test coupon application flow
- Test gift purchase and redemption flow
- Test unenroll flow
- Test access denied scenarios

---

## 9. Implementation Notes

### 9.1 API Base URL

Per REQ-FE-026, the baseUrl configuration SHALL contain ONLY the base URI:
```typescript
// Correct
baseUrl = "http://localhost:7200"
this.http.post(`${baseUrl}/api/enrollments`, data)

// Incorrect
baseUrl = "http://localhost:7200/api"
```

### 9.2 File Structure

Per REQ-FE-015 and REQ-FE-016:
- Pages in `pages/` folder
- Reusable components in `components/` folder
- Barrel exports in each folder

### 9.3 Access Checks

Access checks MUST be performed:
- Before displaying course content
- Before allowing lesson navigation
- Before downloading course materials
- On route guards for protected pages

---

*Document Version: 1.0*
*Phase Coverage: 1-4*
