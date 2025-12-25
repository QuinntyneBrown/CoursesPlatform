# Frontend Specification: Instructor Management
**Feature**: Instructor Management
**Phase**: 5 (Enterprise)
**Document Version**: 1.0
**Date**: 2025-12-25
**Status**: Draft

---

## 1. Overview

### 1.1 Purpose
This document specifies the frontend requirements for the Instructor Management feature, providing instructors with a comprehensive dashboard to manage their profiles, view earnings, access analytics, and manage verification status.

### 1.2 Scope
This specification covers the Angular frontend implementation for:
- Instructor dashboard with overview metrics
- Profile editor with form validation
- Earnings dashboard with charts and transaction history
- Analytics views with performance metrics
- Payout settings configuration
- Verification request submission and status tracking

### 1.3 Technology Constraints
- **Angular Material 3**: All UI components SHALL use Angular Material 3
- **RxJS State Management**: State management SHALL use RxJS (NO NgRx, NO Signals)
- **Responsive Design**: Mobile-first responsive design using Material breakpoints
- **BEM Naming**: CSS classes SHALL follow BEM methodology
- **No Component Suffix**: Component classes SHALL NOT include "Component" suffix

---

## 2. Functional Requirements

### 2.1 Instructor Dashboard Page

**REQ-INS-FE-001**: The system SHALL provide an instructor dashboard page at route `/instructor/dashboard`.
- **Phase**: 5
- **Priority**: High
- **Acceptance Criteria**:
  - AC1: Dashboard displays overview cards with key metrics
  - AC2: Overview includes total earnings, students, courses, and rating
  - AC3: Dashboard shows recent transactions (last 5)
  - AC4: Dashboard displays quick stats with Material cards
  - AC5: Page requires authentication and Instructor role

**REQ-INS-FE-002**: The dashboard SHALL display earnings summary with visual indicators.
- **Phase**: 5
- **Priority**: High
- **Acceptance Criteria**:
  - AC1: Lifetime earnings displayed prominently
  - AC2: Current balance available for payout highlighted
  - AC3: Pending earnings shown separately
  - AC4: Last payout amount and date displayed
  - AC5: Earnings trend indicator (up/down) with percentage

**REQ-INS-FE-003**: The dashboard SHALL display student engagement summary.
- **Phase**: 5
- **Priority**: Medium
- **Acceptance Criteria**:
  - AC1: Total students enrolled across all courses
  - AC2: Active students in last 30 days
  - AC3: New enrollments this month
  - AC4: Student growth trend indicator
  - AC5: Visual chart showing enrollment trends

**REQ-INS-FE-004**: The dashboard SHALL display course performance summary.
- **Phase**: 5
- **Priority**: Medium
- **Acceptance Criteria**:
  - AC1: Total published courses count
  - AC2: Average rating across all courses
  - AC3: Total reviews count
  - AC4: Top performing course highlighted
  - AC5: Quick link to create new course

**REQ-INS-FE-005**: The dashboard SHALL provide quick action buttons for common tasks.
- **Phase**: 5
- **Priority**: Low
- **Acceptance Criteria**:
  - AC1: Button to create new course
  - AC2: Button to view full earnings
  - AC3: Button to request payout
  - AC4: Button to edit profile
  - AC5: Buttons styled with Material raised buttons

### 2.2 Profile Management

**REQ-INS-FE-006**: The system SHALL provide profile editor page at route `/instructor/profile`.
- **Phase**: 5
- **Priority**: High
- **Acceptance Criteria**:
  - AC1: Page displays current profile information
  - AC2: Form includes bio textarea with character counter
  - AC3: Form includes headline input field
  - AC4: Form includes website URL input
  - AC5: Form includes social media URL inputs

**REQ-INS-FE-007**: The profile editor SHALL validate all inputs before submission.
- **Phase**: 5
- **Priority**: High
- **Acceptance Criteria**:
  - AC1: Bio limited to 5000 characters with counter
  - AC2: Headline limited to 120 characters
  - AC3: URLs validated as properly formatted
  - AC4: Required fields marked with asterisk
  - AC5: Validation errors displayed with Material error messages

**REQ-INS-FE-008**: The profile editor SHALL use Angular Material form controls.
- **Phase**: 5
- **Priority**: High
- **Acceptance Criteria**:
  - AC1: mat-form-field used for all inputs
  - AC2: mat-textarea used for bio field
  - AC3: mat-input used for text fields
  - AC4: Form uses reactive forms approach
  - AC5: Material styling applied throughout

**REQ-INS-FE-009**: The profile editor SHALL display expertise areas with chip selection.
- **Phase**: 5
- **Priority**: Medium
- **Acceptance Criteria**:
  - AC1: mat-chip-list used for expertise areas
  - AC2: Instructors can add new expertise chips
  - AC3: Instructors can remove expertise chips
  - AC4: Predefined expertise options available
  - AC5: Custom expertise can be added

**REQ-INS-FE-010**: The profile editor SHALL show save confirmation feedback.
- **Phase**: 5
- **Priority**: Medium
- **Acceptance Criteria**:
  - AC1: Material snackbar shown on successful save
  - AC2: Error snackbar shown on save failure
  - AC3: Save button disabled during submission
  - AC4: Loading spinner shown during save
  - AC5: Form marked as pristine after successful save

### 2.3 Earnings Dashboard

**REQ-INS-FE-011**: The system SHALL provide earnings dashboard page at route `/instructor/earnings`.
- **Phase**: 5
- **Priority**: High
- **Acceptance Criteria**:
  - AC1: Page displays comprehensive earnings overview
  - AC2: Earnings summary cards at top of page
  - AC3: Earnings chart showing trends over time
  - AC4: Per-course earnings breakdown table
  - AC5: Transaction history section

**REQ-INS-FE-012**: The earnings dashboard SHALL display earnings trends chart.
- **Phase**: 5
- **Priority**: High
- **Acceptance Criteria**:
  - AC1: Line chart showing earnings over time
  - AC2: Chart library integrated (Chart.js or similar)
  - AC3: Period selector (30/90/365 days)
  - AC4: Chart responsive to screen size
  - AC5: Tooltip shows exact values on hover

**REQ-INS-FE-013**: The earnings dashboard SHALL display per-course earnings table.
- **Phase**: 5
- **Priority**: High
- **Acceptance Criteria**:
  - AC1: mat-table used for course earnings
  - AC2: Columns: Course Name, Enrollments, Revenue, Avg per Enrollment
  - AC3: Table sortable by any column
  - AC4: Table shows top 10 courses by default
  - AC5: Link to view full course list

**REQ-INS-FE-014**: The earnings dashboard SHALL display transaction history with pagination.
- **Phase**: 5
- **Priority**: High
- **Acceptance Criteria**:
  - AC1: mat-table used for transactions
  - AC2: Columns: Date, Course, Amount, Status
  - AC3: mat-paginator used for pagination
  - AC4: Page size options: 10, 25, 50
  - AC5: Total transaction count displayed

**REQ-INS-FE-015**: The earnings dashboard SHALL provide date range filter.
- **Phase**: 5
- **Priority**: Medium
- **Acceptance Criteria**:
  - AC1: mat-datepicker for start date
  - AC2: mat-datepicker for end date
  - AC3: Apply filter button to refresh data
  - AC4: Clear filter button to reset
  - AC5: Filter state persisted in URL query params

**REQ-INS-FE-016**: The earnings dashboard SHALL provide export functionality.
- **Phase**: 5
- **Priority**: Low
- **Acceptance Criteria**:
  - AC1: Export button in toolbar
  - AC2: Export to CSV format
  - AC3: Export includes all transactions (not just current page)
  - AC4: Filename includes date range
  - AC5: Loading indicator during export

### 2.4 Analytics Dashboard

**REQ-INS-FE-017**: The system SHALL provide analytics dashboard at route `/instructor/analytics`.
- **Phase**: 5
- **Priority**: High
- **Acceptance Criteria**:
  - AC1: Tab navigation for different analytics views
  - AC2: Tabs: Engagement, Performance, Revenue
  - AC3: Material tab component used
  - AC4: Tab state persisted in URL
  - AC5: Analytics refresh button in toolbar

**REQ-INS-FE-018**: The engagement tab SHALL display student engagement metrics.
- **Phase**: 5
- **Priority**: High
- **Acceptance Criteria**:
  - AC1: Total enrollments by course chart
  - AC2: Active students percentage
  - AC3: Course completion rates
  - AC4: Average progress per course
  - AC5: Engagement trends over time

**REQ-INS-FE-019**: The performance tab SHALL display course performance metrics.
- **Phase**: 5
- **Priority**: High
- **Acceptance Criteria**:
  - AC1: Average rating per course
  - AC2: Rating distribution chart (5-4-3-2-1 stars)
  - AC3: Recent reviews section
  - AC4: Review count trends
  - AC5: Course comparison view

**REQ-INS-FE-020**: The revenue tab SHALL display revenue analytics.
- **Phase**: 5
- **Priority**: High
- **Acceptance Criteria**:
  - AC1: Monthly revenue trend chart
  - AC2: Growth rate percentage
  - AC3: Revenue projection for next month
  - AC4: Top revenue generating courses
  - AC5: Revenue by category breakdown

**REQ-INS-FE-021**: Analytics charts SHALL be interactive and responsive.
- **Phase**: 5
- **Priority**: Medium
- **Acceptance Criteria**:
  - AC1: Charts resize based on screen width
  - AC2: Tooltips show detailed information
  - AC3: Legend can toggle series visibility
  - AC4: Charts use Material color palette
  - AC5: Loading skeleton shown while data loads

### 2.5 Payout Settings

**REQ-INS-FE-022**: The system SHALL provide payout settings page at route `/instructor/payout-settings`.
- **Phase**: 5
- **Priority**: High
- **Acceptance Criteria**:
  - AC1: Form displays current payout configuration
  - AC2: Payout method selector with radio buttons
  - AC3: Dynamic form fields based on selected method
  - AC4: Minimum threshold input with validation
  - AC5: Payout frequency selector

**REQ-INS-FE-023**: The payout settings SHALL provide method-specific form sections.
- **Phase**: 5
- **Priority**: High
- **Acceptance Criteria**:
  - AC1: Bank transfer section shows account fields
  - AC2: PayPal section shows email field
  - AC3: Stripe section shows connect button
  - AC4: Only active method section visible
  - AC5: Sensitive data masked when displayed

**REQ-INS-FE-024**: The payout settings SHALL validate payout configuration.
- **Phase**: 5
- **Priority**: High
- **Acceptance Criteria**:
  - AC1: Bank account number validated as numeric
  - AC2: Routing number validated as numeric
  - AC3: PayPal email validated as email format
  - AC4: Minimum threshold between $50-$1000
  - AC5: All required fields validated before save

**REQ-INS-FE-025**: The payout settings SHALL display current balance and next payout date.
- **Phase**: 5
- **Priority**: Medium
- **Acceptance Criteria**:
  - AC1: Current available balance shown
  - AC2: Next scheduled payout date calculated
  - AC3: Warning if balance below threshold
  - AC4: Payout history link provided
  - AC5: Information cards use Material styling

**REQ-INS-FE-026**: The payout settings SHALL provide manual payout request button.
- **Phase**: 5
- **Priority**: Medium
- **Acceptance Criteria**:
  - AC1: Request payout button visible
  - AC2: Button disabled if below threshold
  - AC3: Confirmation dialog before request
  - AC4: Success message after request
  - AC5: Error handling for failed requests

### 2.6 Verification

**REQ-INS-FE-027**: The system SHALL provide verification page at route `/instructor/verification`.
- **Phase**: 5
- **Priority**: High
- **Acceptance Criteria**:
  - AC1: Page shows current verification status
  - AC2: Status badge with color coding
  - AC3: Status message explains current state
  - AC4: Verification benefits listed
  - AC5: Action button based on status

**REQ-INS-FE-028**: The verification page SHALL display verification request form when not verified.
- **Phase**: 5
- **Priority**: High
- **Acceptance Criteria**:
  - AC1: File upload for ID document
  - AC2: File upload for expertise proof
  - AC3: File upload for credentials
  - AC4: File size validation (max 10MB)
  - AC5: File type validation (PDF, JPG, PNG)

**REQ-INS-FE-029**: The verification form SHALL use Material file upload components.
- **Phase**: 5
- **Priority**: Medium
- **Acceptance Criteria**:
  - AC1: Custom file input styled with Material
  - AC2: File name displayed after selection
  - AC3: Remove file button available
  - AC4: Upload progress indicator
  - AC5: Preview thumbnail for images

**REQ-INS-FE-030**: The verification page SHALL display status timeline.
- **Phase**: 5
- **Priority**: Medium
- **Acceptance Criteria**:
  - AC1: Stepper component shows progress
  - AC2: Steps: Submit, Under Review, Approved/Rejected
  - AC3: Current step highlighted
  - AC4: Timestamps shown for completed steps
  - AC5: Material stepper component used

**REQ-INS-FE-031**: The verification page SHALL show rejection reasons if applicable.
- **Phase**: 5
- **Priority**: Medium
- **Acceptance Criteria**:
  - AC1: Rejection message displayed prominently
  - AC2: Detailed reasons listed
  - AC3: Resubmit button available after 30 days
  - AC4: Material expansion panel for details
  - AC5: Support contact information provided

### 2.7 Navigation and Layout

**REQ-INS-FE-032**: The system SHALL provide instructor navigation menu.
- **Phase**: 5
- **Priority**: High
- **Acceptance Criteria**:
  - AC1: mat-sidenav used for navigation
  - AC2: Menu items: Dashboard, Profile, Earnings, Analytics, Settings
  - AC3: Active route highlighted
  - AC4: Responsive - drawer on mobile, permanent on desktop
  - AC5: Material icons used for menu items

**REQ-INS-FE-033**: The instructor section SHALL use consistent layout template.
- **Phase**: 5
- **Priority**: High
- **Acceptance Criteria**:
  - AC1: mat-toolbar for header
  - AC2: Breadcrumb navigation
  - AC3: Page title in header
  - AC4: Consistent padding using design tokens
  - AC5: Material elevation for cards

**REQ-INS-FE-034**: The navigation SHALL indicate verification status.
- **Phase**: 5
- **Priority**: Low
- **Acceptance Criteria**:
  - AC1: Verified badge in header if verified
  - AC2: Verification alert if not verified
  - AC3: Link to verification page from alert
  - AC4: Material badge component used
  - AC5: Status updates in real-time

---

## 3. Component Architecture

### 3.1 Page Components

**REQ-INS-FE-035**: Instructor pages SHALL be created in `src/pages/instructor/` folder.
- **Phase**: 5
- **Priority**: Critical
- **Acceptance Criteria**:
  - AC1: dashboard folder with dashboard page
  - AC2: profile folder with profile page
  - AC3: earnings folder with earnings page
  - AC4: analytics folder with analytics page
  - AC5: verification folder with verification page

**REQ-INS-FE-036**: Page components SHALL NOT include "Component" suffix.
- **Phase**: 5
- **Priority**: Critical
- **Acceptance Criteria**:
  - AC1: InstructorDashboard class name (not InstructorDashboardComponent)
  - AC2: InstructorProfile class name
  - AC3: InstructorEarnings class name
  - AC4: InstructorAnalytics class name
  - AC5: InstructorVerification class name

### 3.2 Reusable Components

**REQ-INS-FE-037**: Instructor-specific components SHALL be created in `src/components/instructor/` folder.
- **Phase**: 5
- **Priority**: High
- **Acceptance Criteria**:
  - AC1: earnings-summary component for earnings cards
  - AC2: stats-card component for metric display
  - AC3: earnings-chart component for trend visualization
  - AC4: course-earnings-table component
  - AC5: transaction-list component

**REQ-INS-FE-038**: Each component SHALL have separate HTML, SCSS, and TS files.
- **Phase**: 5
- **Priority**: Critical
- **Acceptance Criteria**:
  - AC1: component-name.html for template
  - AC2: component-name.scss for styles
  - AC3: component-name.ts for logic
  - AC4: NO component-name.component.* naming
  - AC5: Files organized in component folder

**REQ-INS-FE-039**: Components SHALL use BEM naming for CSS classes.
- **Phase**: 5
- **Priority**: High
- **Acceptance Criteria**:
  - AC1: Block: instructor-dashboard
  - AC2: Element: instructor-dashboard__header
  - AC3: Modifier: instructor-dashboard__card--highlighted
  - AC4: Consistent naming throughout
  - AC5: No nested BEM blocks

### 3.3 Services

**REQ-INS-FE-040**: Instructor API services SHALL be created in `src/services/` folder.
- **Phase**: 5
- **Priority**: Critical
- **Acceptance Criteria**:
  - AC1: instructor-profile.service.ts
  - AC2: instructor-earnings.service.ts
  - AC3: instructor-analytics.service.ts
  - AC4: instructor-payout.service.ts
  - AC5: instructor-verification.service.ts

**REQ-INS-FE-041**: Services SHALL use HttpClient for API communication.
- **Phase**: 5
- **Priority**: Critical
- **Acceptance Criteria**:
  - AC1: Base URL from environment configuration
  - AC2: Complete paths including /api segment
  - AC3: Proper error handling with catchError
  - AC4: Type-safe responses with interfaces
  - AC5: Observable-based async operations

**REQ-INS-FE-042**: Services SHALL implement proper error handling.
- **Phase**: 5
- **Priority**: High
- **Acceptance Criteria**:
  - AC1: HTTP errors caught and transformed
  - AC2: User-friendly error messages
  - AC3: Errors logged to console
  - AC4: Error state propagated to components
  - AC5: Retry logic for transient failures

### 3.4 State Management

**REQ-INS-FE-043**: State management SHALL use RxJS BehaviorSubject pattern.
- **Phase**: 5
- **Priority**: High
- **Acceptance Criteria**:
  - AC1: InstructorStateService created
  - AC2: BehaviorSubject for instructor profile
  - AC3: BehaviorSubject for earnings summary
  - AC4: Observable streams exposed via public methods
  - AC5: State updates trigger UI refresh

**REQ-INS-FE-044**: State service SHALL provide loading and error states.
- **Phase**: 5
- **Priority**: High
- **Acceptance Criteria**:
  - AC1: isLoading$ observable
  - AC2: error$ observable
  - AC3: Loading state shown in UI
  - AC4: Error messages displayed to user
  - AC5: State reset on navigation

**REQ-INS-FE-045**: Components SHALL subscribe to state observables.
- **Phase**: 5
- **Priority**: High
- **Acceptance Criteria**:
  - AC1: Subscriptions in ngOnInit
  - AC2: Unsubscribe in ngOnDestroy
  - AC3: Async pipe used in templates
  - AC4: takeUntil pattern for cleanup
  - AC5: No memory leaks from subscriptions

---

## 4. Data Models (TypeScript Interfaces)

### 4.1 Profile Models

**REQ-INS-FE-046**: InstructorProfile interface SHALL be defined.
- **Phase**: 5
- **Priority**: Critical
- **Properties**:
```typescript
interface InstructorProfile {
  instructorId: string;
  userId: string;
  bio: string;
  headline: string;
  website?: string;
  expertiseAreas: string[];
  socialLinks: SocialLinks;
  statistics: InstructorStatistics;
  isVerified: boolean;
  verifiedDate?: Date;
}
```

**REQ-INS-FE-047**: InstructorStatistics interface SHALL be defined.
- **Phase**: 5
- **Priority**: High
- **Properties**:
```typescript
interface InstructorStatistics {
  totalStudents: number;
  totalCourses: number;
  averageRating: number;
  totalReviews: number;
}
```

### 4.2 Earnings Models

**REQ-INS-FE-048**: EarningsSummary interface SHALL be defined.
- **Phase**: 5
- **Priority**: Critical
- **Properties**:
```typescript
interface EarningsSummary {
  lifetimeEarnings: number;
  currentBalance: number;
  pendingEarnings: number;
  lastPayoutAmount?: number;
  lastPayoutDate?: Date;
  earningsTrend: number;
}
```

**REQ-INS-FE-049**: CourseEarnings interface SHALL be defined.
- **Phase**: 5
- **Priority**: High
- **Properties**:
```typescript
interface CourseEarnings {
  courseId: string;
  courseName: string;
  totalRevenue: number;
  enrollmentCount: number;
  averageRevenuePerEnrollment: number;
}
```

**REQ-INS-FE-050**: Transaction interface SHALL be defined.
- **Phase**: 5
- **Priority**: High
- **Properties**:
```typescript
interface Transaction {
  transactionId: string;
  date: Date;
  courseId: string;
  courseName: string;
  amount: number;
  status: TransactionStatus;
}
```

### 4.3 Analytics Models

**REQ-INS-FE-051**: StudentEngagement interface SHALL be defined.
- **Phase**: 5
- **Priority**: High
- **Properties**:
```typescript
interface StudentEngagement {
  totalEnrollments: number;
  activeStudents: number;
  completionRate: number;
  averageProgress: number;
  engagementByСourse: CourseEngagement[];
}
```

**REQ-INS-FE-052**: CoursePerformance interface SHALL be defined.
- **Phase**: 5
- **Priority**: High
- **Properties**:
```typescript
interface CoursePerformance {
  courseId: string;
  courseName: string;
  averageRating: number;
  totalReviews: number;
  ratingDistribution: RatingDistribution;
  recentReviews: Review[];
}
```

### 4.4 Payout Models

**REQ-INS-FE-053**: PayoutSettings interface SHALL be defined.
- **Phase**: 5
- **Priority**: Critical
- **Properties**:
```typescript
interface PayoutSettings {
  payoutMethod: PayoutMethod;
  bankAccount?: BankAccountInfo;
  paypalEmail?: string;
  stripeAccountId?: string;
  minimumThreshold: number;
  payoutFrequency: PayoutFrequency;
}
```

### 4.5 Verification Models

**REQ-INS-FE-054**: VerificationStatus interface SHALL be defined.
- **Phase**: 5
- **Priority**: High
- **Properties**:
```typescript
interface VerificationStatus {
  status: VerificationState;
  submittedDate?: Date;
  reviewedDate?: Date;
  approvedDate?: Date;
  rejectionReason?: string;
}
```

---

## 5. Routing

**REQ-INS-FE-055**: Instructor routes SHALL be defined in instructor routing module.
- **Phase**: 5
- **Priority**: Critical
- **Routes**:
  - `/instructor/dashboard` → InstructorDashboard
  - `/instructor/profile` → InstructorProfile
  - `/instructor/earnings` → InstructorEarnings
  - `/instructor/analytics` → InstructorAnalytics
  - `/instructor/payout-settings` → InstructorPayoutSettings
  - `/instructor/verification` → InstructorVerification

**REQ-INS-FE-056**: All instructor routes SHALL require authentication.
- **Phase**: 5
- **Priority**: Critical
- **Acceptance Criteria**:
  - AC1: AuthGuard applied to all routes
  - AC2: Instructor role required
  - AC3: Redirect to login if not authenticated
  - AC4: Redirect to unauthorized if not instructor
  - AC5: Route guards properly configured

**REQ-INS-FE-057**: Route guards SHALL verify instructor role.
- **Phase**: 5
- **Priority**: Critical
- **Acceptance Criteria**:
  - AC1: InstructorGuard created
  - AC2: User claims checked for instructor role
  - AC3: Guard applied to instructor routes
  - AC4: Access denied page shown if unauthorized
  - AC5: Guard implements CanActivate interface

---

## 6. UI/UX Requirements

### 6.1 Material Design

**REQ-INS-FE-058**: ALL UI components SHALL use Angular Material 3.
- **Phase**: 5
- **Priority**: Critical
- **Acceptance Criteria**:
  - AC1: Material theme configured
  - AC2: Material components imported
  - AC3: NO custom components that duplicate Material
  - AC4: Material typography used
  - AC5: Material color palette adhered to

**REQ-INS-FE-059**: Color scheme SHALL use only Material theme colors.
- **Phase**: 5
- **Priority**: Critical
- **Acceptance Criteria**:
  - AC1: Primary color from theme
  - AC2: Accent color from theme
  - AC3: Warn color from theme
  - AC4: NO custom colors introduced
  - AC5: Background and surface colors from theme

### 6.2 Responsive Design

**REQ-INS-FE-060**: All instructor pages SHALL be fully responsive.
- **Phase**: 5
- **Priority**: High
- **Acceptance Criteria**:
  - AC1: Mobile breakpoint: < 600px
  - AC2: Tablet breakpoint: 600px - 960px
  - AC3: Desktop breakpoint: > 960px
  - AC4: Layouts adapt to screen size
  - AC5: Touch-friendly on mobile

**REQ-INS-FE-061**: Charts and tables SHALL be responsive.
- **Phase**: 5
- **Priority**: High
- **Acceptance Criteria**:
  - AC1: Charts resize with viewport
  - AC2: Tables horizontal scroll on mobile
  - AC3: Data visibility maintained
  - AC4: Touch gestures supported
  - AC5: Performance optimized for mobile

### 6.3 Loading States

**REQ-INS-FE-062**: Loading states SHALL be displayed during async operations.
- **Phase**: 5
- **Priority**: High
- **Acceptance Criteria**:
  - AC1: mat-spinner shown during data load
  - AC2: Skeleton screens for content
  - AC3: Progress bar for uploads
  - AC4: Button loading state with spinner
  - AC5: Disabled state during processing

### 6.4 Error Handling

**REQ-INS-FE-063**: Error messages SHALL be user-friendly and actionable.
- **Phase**: 5
- **Priority**: High
- **Acceptance Criteria**:
  - AC1: mat-snackbar for error notifications
  - AC2: Clear error message text
  - AC3: Retry action where applicable
  - AC4: Error details in console for debugging
  - AC5: Form validation errors inline

---

## 7. Performance Requirements

**REQ-INS-FE-064**: Dashboard SHALL load within 2 seconds on 3G connection.
- **Phase**: 5
- **Priority**: High

**REQ-INS-FE-065**: Charts SHALL render smoothly without lag.
- **Phase**: 5
- **Priority**: Medium

**REQ-INS-FE-066**: Large tables SHALL use virtual scrolling for performance.
- **Phase**: 5
- **Priority**: Medium

**REQ-INS-FE-067**: Images and documents SHALL be lazy loaded.
- **Phase**: 5
- **Priority**: Low

---

## 8. Accessibility Requirements

**REQ-INS-FE-068**: All interactive elements SHALL be keyboard accessible.
- **Phase**: 5
- **Priority**: High

**REQ-INS-FE-069**: ARIA labels SHALL be provided for screen readers.
- **Phase**: 5
- **Priority**: High

**REQ-INS-FE-070**: Color contrast SHALL meet WCAG AA standards.
- **Phase**: 5
- **Priority**: High

**REQ-INS-FE-071**: Focus indicators SHALL be visible on all interactive elements.
- **Phase**: 5
- **Priority**: Medium

---

## 9. Testing Requirements

**REQ-INS-FE-072**: Unit tests SHALL be written using Jest.
- **Phase**: 5
- **Priority**: High

**REQ-INS-FE-073**: Component tests SHALL achieve 80% code coverage.
- **Phase**: 5
- **Priority**: Medium

**REQ-INS-FE-074**: E2E tests SHALL be written using Playwright.
- **Phase**: 5
- **Priority**: Medium

**REQ-INS-FE-075**: Critical user journeys SHALL have E2E test coverage.
- **Phase**: 5
- **Priority**: High
- **Journeys**:
  - Login as instructor → View dashboard
  - Update profile → Save successfully
  - View earnings → Filter by date range
  - Request payout → Confirm success
  - Submit verification → Track status

---

**End of Frontend Specification**
