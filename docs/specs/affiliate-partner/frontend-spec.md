# Affiliate Partner Feature - Frontend Specification

**Document Version:** 1.0
**Date:** 2025-12-25
**Status:** Draft
**Phase:** 5 (Enterprise Feature)

---

## 1. Introduction

### 1.1 Purpose
This document specifies the frontend requirements for the Affiliate Partner feature, providing the user interface for affiliates to register, manage links, track earnings, and request payouts.

### 1.2 Scope
This specification covers:
- Affiliate registration flow
- Affiliate dashboard with analytics
- Link generation and management interface
- Commission tracking and earnings reports
- Payout request workflow
- Administrative affiliate management

### 1.3 Phase Classification
All requirements in this document are classified as **Phase 5 - Enterprise Features**.

### 1.4 Technology Stack
- Angular (latest stable version)
- Angular Material 3
- RxJS for state management
- No NgRx
- No Angular Signals

---

## 2. Affiliate Registration

### 2.1 Registration Page

**REQ-AFF-FE-001** [Phase 5]: The system SHALL provide an affiliate registration page accessible to authenticated users at `/affiliate/register`.

**Acceptance Criteria:**
- Route: `/affiliate/register`
- Located in: `src/CoursesPlatform.WebApp/projects/CoursesPlatform/src/pages/affiliate-register`
- Component files: `affiliate-register.ts`, `affiliate-register.html`, `affiliate-register.scss`
- Guards: Requires authentication
- Redirects to dashboard if already registered

**REQ-AFF-FE-002** [Phase 5]: The registration form SHALL collect business name, contact email, and payment method details.

**Acceptance Criteria:**
- Uses Angular Material form fields
- Business name: optional text input (max 200 chars)
- Contact email: required email input with validation
- Payment method section with radio buttons: Bank Transfer, PayPal, Check
- Conditional fields based on payment method selection
- Form validation with error messages
- Submit button disabled until valid

**REQ-AFF-FE-003** [Phase 5]: The registration form SHALL display payment method specific fields.

**Acceptance Criteria:**
- Bank Transfer: Account number, routing number, account holder name
- PayPal: PayPal email address
- Check: Full mailing address fields
- Fields appear/disappear based on radio selection
- All payment fields validated
- Uses Angular Material inputs

**REQ-AFF-FE-004** [Phase 5]: The system SHALL display success message and affiliate code upon successful registration.

**Acceptance Criteria:**
- Success message with mat-snackbar
- Displays generated affiliate code prominently
- Shows next steps (generate links, share links)
- Automatic redirect to dashboard after 3 seconds
- Copy-to-clipboard button for affiliate code

---

## 3. Affiliate Dashboard

### 3.1 Dashboard Page

**REQ-AFF-FE-005** [Phase 5]: The system SHALL provide an affiliate dashboard page at `/affiliate/dashboard`.

**Acceptance Criteria:**
- Route: `/affiliate/dashboard`
- Located in: `src/CoursesPlatform.WebApp/projects/CoursesPlatform/src/pages/affiliate-dashboard`
- Component files: `affiliate-dashboard.ts`, `affiliate-dashboard.html`, `affiliate-dashboard.scss`
- Guards: Requires authentication and affiliate status
- Responsive layout with mobile-first design

**REQ-AFF-FE-006** [Phase 5]: The dashboard SHALL display key performance metrics in Material cards.

**Acceptance Criteria:**
- Total clicks metric card
- Total conversions metric card
- Conversion rate metric card
- Total earnings metric card
- Pending earnings metric card
- Available balance metric card
- Uses mat-card component
- Icons from Material Icons
- Responsive grid layout (1 col mobile, 2 col tablet, 3 col desktop)

**REQ-AFF-FE-007** [Phase 5]: The dashboard SHALL provide time range filtering for metrics.

**Acceptance Criteria:**
- mat-button-toggle-group for time ranges
- Options: Last 7 Days, Last 30 Days, Last 90 Days, All Time
- Default: Last 30 Days
- Selection stored in component state (RxJS BehaviorSubject)
- Metrics update when range changes
- Loading indicator during data fetch

**REQ-AFF-FE-008** [Phase 5]: The dashboard SHALL display a quick actions section.

**Acceptance Criteria:**
- mat-card with action buttons
- Generate New Link button (navigates to link generator)
- View All Links button (navigates to links page)
- Request Payout button (navigates to payout request, disabled if below threshold)
- View Payouts button (navigates to payouts page)
- Uses mat-raised-button with primary color

### 3.2 Dashboard Components

**REQ-AFF-FE-009** [Phase 5]: The system SHALL implement a reusable metric card component.

**Acceptance Criteria:**
- Located in: `src/CoursesPlatform.WebApp/projects/CoursesPlatform/src/components/affiliate-metric-card`
- Component files: `affiliate-metric-card.ts`, `affiliate-metric-card.html`, `affiliate-metric-card.scss`
- Inputs: title, value, icon, change percentage (optional)
- Uses mat-card
- Displays trend indicator (up/down arrow) if change provided
- BEM naming: `affiliate-metric-card`, `affiliate-metric-card__value`, etc.

**REQ-AFF-FE-010** [Phase 5]: The system SHALL implement an affiliate service for state management.

**Acceptance Criteria:**
- Located in: `src/CoursesPlatform.WebApp/projects/CoursesPlatform/src/services/affiliate.service.ts`
- Uses RxJS BehaviorSubject for state
- Exposes observables for: dashboard data, links, commissions, payouts
- HTTP methods call backend API
- Error handling with observables
- No NgRx, no Signals
- Caching with shareReplay for dashboard data

---

## 4. Affiliate Link Management

### 4.1 Link Generator Page

**REQ-AFF-FE-011** [Phase 5]: The system SHALL provide a link generator page at `/affiliate/links/generate`.

**Acceptance Criteria:**
- Route: `/affiliate/links/generate`
- Located in: `src/CoursesPlatform.WebApp/projects/CoursesPlatform/src/pages/affiliate-link-generator`
- Component files: `affiliate-link-generator.ts`, `affiliate-link-generator.html`, `affiliate-link-generator.scss`
- Guards: Requires authentication and active affiliate status
- Form-based interface with Material components

**REQ-AFF-FE-012** [Phase 5]: The link generator SHALL allow course selection via autocomplete.

**Acceptance Criteria:**
- mat-autocomplete component
- Searches published courses by name
- Displays course name and price
- Required field validation
- Loads options from courses API
- Shows thumbnail image in dropdown options

**REQ-AFF-FE-013** [Phase 5]: The link generator SHALL allow optional campaign name input.

**Acceptance Criteria:**
- mat-form-field with text input
- Optional field (max 100 characters)
- Helper text explaining campaign tracking
- Character counter
- Validation error if exceeds max

**REQ-AFF-FE-014** [Phase 5]: The system SHALL display generated link with copy functionality.

**Acceptance Criteria:**
- Generated link shown in read-only mat-form-field
- Copy button with mat-icon (content_copy)
- mat-snackbar confirmation on copy
- Full URL including domain
- Link formatted and selectable

### 4.2 Links List Page

**REQ-AFF-FE-015** [Phase 5]: The system SHALL provide a links management page at `/affiliate/links`.

**Acceptance Criteria:**
- Route: `/affiliate/links`
- Located in: `src/CoursesPlatform.WebApp/projects/CoursesPlatform/src/pages/affiliate-links`
- Component files: `affiliate-links.ts`, `affiliate-links.html`, `affiliate-links.scss`
- Guards: Requires authentication and affiliate status
- Table-based layout with mat-table

**REQ-AFF-FE-016** [Phase 5]: The links list SHALL display all affiliate links in a Material table.

**Acceptance Criteria:**
- mat-table component
- Columns: Course Name, Campaign Name, Clicks, Conversions, Created Date, Actions
- Sortable columns (matSort)
- Pagination with mat-paginator (10, 25, 50 items per page)
- Copy link action in Actions column
- Responsive: stacks on mobile

**REQ-AFF-FE-017** [Phase 5]: The links list SHALL support filtering by course.

**Acceptance Criteria:**
- mat-select dropdown above table
- Option: All Courses, plus individual courses
- Filters table data on selection
- Updates URL query params
- Preserves filter on page refresh

**REQ-AFF-FE-018** [Phase 5]: The links list SHALL display link performance metrics.

**Acceptance Criteria:**
- Click count per link
- Conversion count per link
- Conversion rate calculated and displayed
- Trend indicators for comparison
- Tooltip with detailed stats on hover

---

## 5. Commission Tracking

### 5.1 Commissions Page

**REQ-AFF-FE-019** [Phase 5]: The system SHALL provide a commissions tracking page at `/affiliate/commissions`.

**Acceptance Criteria:**
- Route: `/affiliate/commissions`
- Located in: `src/CoursesPlatform.WebApp/projects/CoursesPlatform/src/pages/affiliate-commissions`
- Component files: `affiliate-commissions.ts`, `affiliate-commissions.html`, `affiliate-commissions.scss`
- Guards: Requires authentication and affiliate status
- Table-based layout with filtering

**REQ-AFF-FE-020** [Phase 5]: The commissions table SHALL display all commissions with status indicators.

**Acceptance Criteria:**
- mat-table component
- Columns: Date, Course, Amount, Status, Payout Reference (if paid)
- Status chips using mat-chip with colors: Pending (orange), Approved (blue), Paid (green), Rejected (red)
- Sortable by date and amount
- mat-paginator for pagination
- Currency formatting with currency pipe

**REQ-AFF-FE-021** [Phase 5]: The commissions page SHALL support status filtering.

**Acceptance Criteria:**
- mat-button-toggle-group for status filter
- Options: All, Pending, Approved, Paid, Rejected
- Updates table data on selection
- Count badges showing number per status
- URL query param for filter state

**REQ-AFF-FE-022** [Phase 5]: The commissions page SHALL support date range filtering.

**Acceptance Criteria:**
- mat-date-range-input with start and end date pickers
- Filter button to apply date range
- Clear filter button
- Default: Last 30 days
- Validates start date before end date
- Updates table on filter apply

**REQ-AFF-FE-023** [Phase 5]: The commissions page SHALL display summary totals.

**Acceptance Criteria:**
- Summary cards above table
- Total pending amount
- Total approved amount
- Total paid amount
- Uses currency formatting
- Updates when filters change

---

## 6. Earnings Reports

### 6.1 Earnings Report Page

**REQ-AFF-FE-024** [Phase 5]: The system SHALL provide an earnings report page at `/affiliate/earnings`.

**Acceptance Criteria:**
- Route: `/affiliate/earnings`
- Located in: `src/CoursesPlatform.WebApp/projects/CoursesPlatform/src/pages/affiliate-earnings`
- Component files: `affiliate-earnings.ts`, `affiliate-earnings.html`, `affiliate-earnings.scss`
- Guards: Requires authentication and affiliate status
- Chart-based visualizations using Angular Material components

**REQ-AFF-FE-025** [Phase 5]: The earnings page SHALL display earnings trend over time.

**Acceptance Criteria:**
- Monthly earnings visualization
- Data displayed in structured format (no external chart library)
- Last 12 months by default
- Separate series for pending, approved, and paid
- Responsive container
- Legend with mat-chip-list

**REQ-AFF-FE-026** [Phase 5]: The earnings page SHALL display top performing courses.

**Acceptance Criteria:**
- mat-list of top 10 courses by commission
- Course name, total commissions, number of sales
- Progress bar (mat-progress-bar) showing relative performance
- Sorted by total commission descending
- Currency formatted amounts

**REQ-AFF-FE-027** [Phase 5]: The earnings page SHALL provide export functionality.

**Acceptance Criteria:**
- Export to CSV button
- Exports current view data
- Filename includes date range
- Downloads via browser
- mat-snackbar confirmation

---

## 7. Payout Management

### 7.1 Payout Request Page

**REQ-AFF-FE-028** [Phase 5]: The system SHALL provide a payout request page at `/affiliate/payout/request`.

**Acceptance Criteria:**
- Route: `/affiliate/payout/request`
- Located in: `src/CoursesPlatform.WebApp/projects/CoursesPlatform/src/pages/affiliate-payout-request`
- Component files: `affiliate-payout-request.ts`, `affiliate-payout-request.html`, `affiliate-payout-request.scss`
- Guards: Requires authentication and active affiliate status
- Form-based interface

**REQ-AFF-FE-029** [Phase 5]: The payout request form SHALL display available balance and minimum threshold.

**Acceptance Criteria:**
- mat-card showing available balance prominently
- Minimum threshold amount displayed
- Eligible commissions count
- Warning if below threshold with mat-icon
- Balance formatted as currency
- Green check icon if eligible

**REQ-AFF-FE-030** [Phase 5]: The payout request form SHALL allow payment method selection.

**Acceptance Criteria:**
- Radio button group for saved payment methods
- Displays method type and masked details
- Option to add new payment method
- Shows last used date for each method
- Default selects most recently used
- Validation requires selection

**REQ-AFF-FE-031** [Phase 5]: The system SHALL display confirmation dialog before submitting payout request.

**Acceptance Criteria:**
- mat-dialog component
- Shows amount, payment method, processing time estimate
- Confirm and Cancel buttons
- Prevents accidental submissions
- Shows terms and conditions checkbox
- Disables confirm until terms accepted

**REQ-AFF-FE-032** [Phase 5]: The system SHALL display success message and payout details after request.

**Acceptance Criteria:**
- Success page with mat-card
- Payout reference number
- Estimated processing time
- Payment method confirmation
- Track Payout button (links to payout details)
- Back to Dashboard button

### 7.2 Payouts List Page

**REQ-AFF-FE-033** [Phase 5]: The system SHALL provide a payouts history page at `/affiliate/payouts`.

**Acceptance Criteria:**
- Route: `/affiliate/payouts`
- Located in: `src/CoursesPlatform.WebApp/projects/CoursesPlatform/src/pages/affiliate-payouts`
- Component files: `affiliate-payouts.ts`, `affiliate-payouts.html`, `affiliate-payouts.scss`
- Guards: Requires authentication and affiliate status
- Table-based layout

**REQ-AFF-FE-034** [Phase 5]: The payouts table SHALL display all payout requests with status.

**Acceptance Criteria:**
- mat-table component
- Columns: Reference, Amount, Method, Status, Requested Date, Completed Date
- Status chips: Requested (blue), Processing (orange), Completed (green), Failed (red)
- Sortable by date and amount
- mat-paginator for pagination
- Expandable row for payout details

**REQ-AFF-FE-035** [Phase 5]: The payout details expansion SHALL show commission breakdown.

**Acceptance Criteria:**
- Nested mat-table in expanded row
- Shows commissions included in payout
- Columns: Date, Course, Amount
- Total row at bottom
- Collapsible on row click
- Uses mat-expansion-panel

**REQ-AFF-FE-036** [Phase 5]: The payouts page SHALL support status filtering.

**Acceptance Criteria:**
- mat-button-toggle-group for status
- Options: All, Requested, Processing, Completed, Failed
- Updates table on selection
- URL query param for state
- Count badges per status

---

## 8. Administrative Interface

### 8.1 Admin Affiliates Page

**REQ-AFF-FE-037** [Phase 5]: The system SHALL provide an admin page to manage all affiliates at `/admin/affiliates`.

**Acceptance Criteria:**
- Route: `/admin/affiliates`
- Located in: `src/CoursesPlatform.WebApp/projects/CoursesPlatform/src/pages/admin-affiliates`
- Component files: `admin-affiliates.ts`, `admin-affiliates.html`, `admin-affiliates.scss`
- Guards: Requires admin role
- Table with action buttons

**REQ-AFF-FE-038** [Phase 5]: The admin affiliates table SHALL display all affiliates with performance metrics.

**Acceptance Criteria:**
- mat-table component
- Columns: Code, Name, Email, Status, Tier, Total Sales, Total Earnings, Join Date, Actions
- Sortable columns
- mat-paginator with configurable page size
- Search bar with mat-form-field
- Filters by name, email, or code

**REQ-AFF-FE-039** [Phase 5]: The admin interface SHALL allow changing affiliate status.

**Acceptance Criteria:**
- Status dropdown in Actions column (mat-select)
- Options: Pending, Active, Suspended, Terminated
- Confirmation dialog on change (mat-dialog)
- Reason input field for Suspended/Terminated
- Updates status via API
- mat-snackbar confirmation

**REQ-AFF-FE-040** [Phase 5]: The admin interface SHALL allow changing affiliate tier.

**Acceptance Criteria:**
- Tier dropdown in Actions column (mat-select)
- Options: Bronze, Silver, Gold, Platinum
- Shows current and new commission rates
- Confirmation dialog
- Updates tier via API
- Notification to affiliate

### 8.2 Admin Payout Processing

**REQ-AFF-FE-041** [Phase 5]: The system SHALL provide an admin page for payout processing at `/admin/payouts`.

**Acceptance Criteria:**
- Route: `/admin/payouts`
- Located in: `src/CoursesPlatform.WebApp/projects/CoursesPlatform/src/pages/admin-payouts`
- Component files: `admin-payouts.ts`, `admin-payouts.html`, `admin-payouts.scss`
- Guards: Requires admin role
- Table with action buttons

**REQ-AFF-FE-042** [Phase 5]: The admin payouts table SHALL display all payout requests.

**Acceptance Criteria:**
- mat-table component
- Columns: Affiliate, Amount, Method, Status, Request Date, Actions
- Sortable columns
- Pagination
- Status filter buttons above table
- Expandable rows for details

**REQ-AFF-FE-043** [Phase 5]: The admin interface SHALL allow processing payout requests.

**Acceptance Criteria:**
- Process button for Requested status
- Dialog for transaction reference input (mat-dialog)
- Updates status to Processing
- Complete button for Processing status
- Marks as Completed
- Fail button with reason input
- All actions confirmed via dialog

---

## 9. Navigation and Routing

### 9.1 Navigation Menu

**REQ-AFF-FE-044** [Phase 5]: The system SHALL add affiliate section to main navigation for affiliate users.

**Acceptance Criteria:**
- Menu item: "Affiliate Program" with mat-icon (link)
- Visible only to authenticated affiliates
- Submenu items: Dashboard, Links, Commissions, Earnings, Payouts
- Uses mat-menu component
- Highlights active route
- Mobile: collapsible menu

**REQ-AFF-FE-045** [Phase 5]: The system SHALL add affiliate management section to admin navigation.

**Acceptance Criteria:**
- Admin menu item: "Affiliates" with mat-icon (people)
- Visible only to admin users
- Submenu items: Manage Affiliates, Process Payouts, Program Analytics
- Uses mat-menu component
- Highlights active route

### 9.2 Route Guards

**REQ-AFF-FE-046** [Phase 5]: The system SHALL implement an AffiliateGuard for affiliate-only routes.

**Acceptance Criteria:**
- Located in: `src/CoursesPlatform.WebApp/projects/CoursesPlatform/src/guards/affiliate.guard.ts`
- Checks user is authenticated
- Checks user has affiliate status
- Redirects to `/affiliate/register` if not affiliate
- Returns Observable<boolean>
- Uses CanActivate interface

**REQ-AFF-FE-047** [Phase 5]: The system SHALL implement an ActiveAffiliateGuard for active affiliate routes.

**Acceptance Criteria:**
- Located in: `src/CoursesPlatform.WebApp/projects/CoursesPlatform/src/guards/active-affiliate.guard.ts`
- Checks user is authenticated affiliate
- Checks affiliate status is Active
- Redirects with error message if suspended/terminated
- Returns Observable<boolean>
- Uses CanActivate interface

---

## 10. Services and State Management

### 10.1 Affiliate Service

**REQ-AFF-FE-048** [Phase 5]: The system SHALL implement an AffiliateService for all affiliate-related API calls.

**Acceptance Criteria:**
- Located in: `src/CoursesPlatform.WebApp/projects/CoursesPlatform/src/services/affiliate.service.ts`
- Injectable with providedIn: 'root'
- Methods: registerAffiliate, getDashboard, generateLink, getLinks, getCommissions, requestPayout, getPayouts
- All methods return Observables
- HTTP calls use configured baseUrl + /api/affiliate
- Error handling with catchError

**REQ-AFF-FE-049** [Phase 5]: The AffiliateService SHALL manage dashboard state with RxJS.

**Acceptance Criteria:**
- BehaviorSubject for dashboard data
- Observable exposed for components to subscribe
- Refresh method to reload data
- Caching with shareReplay(1)
- Time range parameter support
- Loading state with BehaviorSubject

**REQ-AFF-FE-050** [Phase 5]: The AffiliateService SHALL manage links state with RxJS.

**Acceptance Criteria:**
- BehaviorSubject for links array
- Observable exposed for components
- Add link method updates state
- Refresh method reloads from API
- Pagination state management
- Filter state management

### 10.2 Admin Affiliate Service

**REQ-AFF-FE-051** [Phase 5]: The system SHALL implement an AdminAffiliateService for admin operations.

**Acceptance Criteria:**
- Located in: `src/CoursesPlatform.WebApp/projects/CoursesPlatform/src/services/admin-affiliate.service.ts`
- Injectable with providedIn: 'root'
- Methods: getAllAffiliates, updateStatus, updateTier, getAllPayouts, processPayout, completePayout, failPayout
- All methods return Observables
- HTTP calls use baseUrl + /api/admin/affiliates
- Authorization headers included

---

## 11. Models and DTOs

### 11.1 TypeScript Interfaces

**REQ-AFF-FE-052** [Phase 5]: The system SHALL define TypeScript interfaces for all DTOs.

**Acceptance Criteria:**
- Located in: `src/CoursesPlatform.WebApp/projects/CoursesPlatform/src/models/affiliate.models.ts`
- Interfaces: AffiliateDto, AffiliateLinkDto, CommissionDto, AffiliatePayoutDto, AffiliateDashboardDto, PartnerTierDto
- Properties match backend DTOs exactly
- Optional properties marked with ?
- Date properties as string (ISO format)
- Enums for Status types

**REQ-AFF-FE-053** [Phase 5]: The system SHALL define enums for status values.

**Acceptance Criteria:**
- AffiliateStatus enum: Pending, Active, Suspended, Terminated
- CommissionStatus enum: Pending, Approved, Rejected, Paid
- PayoutStatus enum: Requested, Processing, Completed, Failed
- PayoutMethod enum: BankTransfer, PayPal, Check
- Located in same file as interfaces

---

## 12. Forms and Validation

### 12.1 Form Validation

**REQ-AFF-FE-054** [Phase 5]: All forms SHALL use Angular Reactive Forms with validation.

**Acceptance Criteria:**
- FormBuilder for form creation
- Validators for required fields
- Email validator for email fields
- Custom validators for business rules
- Error messages with mat-error
- Form submission disabled when invalid

**REQ-AFF-FE-055** [Phase 5]: The system SHALL display validation errors using Material error components.

**Acceptance Criteria:**
- mat-error component for each field
- Error messages appear on touch/dirty
- Clear, user-friendly error text
- Multiple validators show appropriate error
- Error icon with mat-icon
- Red color from Material theme

---

## 13. Loading and Error States

### 13.1 Loading Indicators

**REQ-AFF-FE-056** [Phase 5]: The system SHALL display loading indicators during async operations.

**Acceptance Criteria:**
- mat-progress-spinner for page loads
- mat-progress-bar for form submissions
- Loading state in service observables
- Disable buttons during loading
- Loading overlay for table data refresh
- Consistent spinner placement

**REQ-AFF-FE-057** [Phase 5]: The system SHALL handle empty states gracefully.

**Acceptance Criteria:**
- Empty state messages for empty tables
- Helpful text explaining how to add data
- Call-to-action button where appropriate
- mat-icon for visual interest
- Centered layout
- Material typography

### 13.2 Error Handling

**REQ-AFF-FE-058** [Phase 5]: The system SHALL display error messages using Material snackbars.

**Acceptance Criteria:**
- mat-snackbar for error notifications
- Error duration: 5 seconds (configurable)
- Action button to dismiss
- Error icon in message
- Red color from theme
- Error logged to console

**REQ-AFF-FE-059** [Phase 5]: The system SHALL provide retry capability for failed requests.

**Acceptance Criteria:**
- Retry button in error snackbar
- Retry method in service
- Maximum retry attempts: 3
- Exponential backoff
- User feedback during retries
- Final error if all retries fail

---

## 14. Responsive Design

### 14.1 Mobile Responsiveness

**REQ-AFF-FE-060** [Phase 5]: All affiliate pages SHALL be fully responsive following mobile-first design.

**Acceptance Criteria:**
- Breakpoints: mobile (<600px), tablet (600-960px), desktop (>960px)
- Tables convert to cards on mobile
- Forms stack vertically on mobile
- Navigation collapses to hamburger menu
- Touch-friendly button sizes (min 44px)
- Tested on actual mobile devices

**REQ-AFF-FE-061** [Phase 5]: The system SHALL use Material responsive layout directives.

**Acceptance Criteria:**
- fxLayout, fxFlex directives for layout
- Material grid system where appropriate
- Responsive padding/margins
- Font sizes scale appropriately
- Images scale responsively
- No horizontal scroll on mobile

---

## 15. Styling and Theming

### 15.1 Material Theme

**REQ-AFF-FE-062** [Phase 5]: The system SHALL use default Angular Material colors and theme.

**Acceptance Criteria:**
- No custom colors introduced
- Primary, accent, warn from Material theme
- Background and foreground from theme
- Typography from Material theme
- Elevation levels from Material
- Complies with REQ-SYS-011

**REQ-AFF-FE-063** [Phase 5]: Component styles SHALL use BEM naming convention.

**Acceptance Criteria:**
- Block: component name
- Element: double underscore separator
- Modifier: double hyphen separator
- Example: `affiliate-dashboard__metric-card--highlighted`
- Scoped to component with SCSS
- No global style pollution

---

## 16. Accessibility

### 16.1 ARIA and Keyboard Navigation

**REQ-AFF-FE-064** [Phase 5]: All interactive elements SHALL be keyboard accessible.

**Acceptance Criteria:**
- Tab navigation works logically
- Focus indicators visible
- Enter/Space activates buttons
- Escape closes dialogs
- Arrow keys for lists/menus
- Skip navigation links

**REQ-AFF-FE-065** [Phase 5]: The system SHALL use appropriate ARIA labels and roles.

**Acceptance Criteria:**
- aria-label for icon buttons
- aria-describedby for form fields
- role attributes where needed
- aria-live for dynamic updates
- Semantic HTML elements
- Tested with screen reader

---

## 17. Performance

### 17.1 Optimization

**REQ-AFF-FE-066** [Phase 5]: The system SHALL implement lazy loading for affiliate feature module.

**Acceptance Criteria:**
- Affiliate module loaded on demand
- Route-based code splitting
- Shared components in core module
- Bundle size monitoring
- Tree shaking for unused code
- AOT compilation

**REQ-AFF-FE-067** [Phase 5]: The system SHALL cache API responses where appropriate.

**Acceptance Criteria:**
- Dashboard data cached for 5 minutes
- shareReplay operator for shared observables
- Cache invalidation on updates
- Loading from cache shows immediately
- Background refresh after cache hit
- Cache size limits

---

## 18. Testing

### 18.1 Unit Tests

**REQ-AFF-FE-068** [Phase 5]: All components SHALL have Jest unit tests.

**Acceptance Criteria:**
- Test files: `*.spec.ts`
- Tests for component initialization
- Tests for user interactions
- Tests for service calls
- Mock services with Jest
- Coverage target: >80%
- Tests pass in CI/CD

**REQ-AFF-FE-069** [Phase 5]: All services SHALL have Jest unit tests.

**Acceptance Criteria:**
- Test HTTP calls with HttpClientTestingModule
- Test state management observables
- Test error handling
- Test caching behavior
- Mock backend responses
- Coverage target: >80%

### 18.2 E2E Tests

**REQ-AFF-FE-070** [Phase 5]: Critical user flows SHALL have Playwright e2e tests.

**Acceptance Criteria:**
- Tests located in: `src/CoursesPlatform.WebApp/projects/CoursesPlatform/src/e2e/affiliate`
- Test: Affiliate registration flow
- Test: Link generation flow
- Test: Payout request flow
- Test: Dashboard data display
- Runs in CI/CD pipeline
- Test data cleanup after runs

---

## 19. Compliance

All requirements in this specification SHALL adhere to the system-wide frontend requirements defined in `/home/user/CoursesPlatform/docs/specs/implementstion-specs.md`, including:
- No "Component" suffix (REQ-FE-012)
- No "component" prefix in filenames (REQ-FE-013)
- RxJS for state management (REQ-FE-009)
- No NgRx (REQ-FE-007)
- No Angular Signals (REQ-FE-008)
- Angular Material 3 components (REQ-FE-006)
- BEM naming convention (REQ-FE-019)
- Mobile-first responsive design (REQ-FE-018)
- Jest for unit tests (REQ-FE-021)
- Playwright for e2e tests (REQ-FE-022)
- Default Material colors only (REQ-SYS-011)

---

**End of Affiliate Partner Frontend Specification**
