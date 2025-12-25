# Referral Program - Frontend Specification

**Document Version:** 1.0
**Date:** 2025-12-25
**Status:** Final
**Phase:** 5 - Enterprise Features

---

## 1. Introduction

### 1.1 Purpose
This document specifies the frontend requirements for the Referral Program feature in the CoursesPlatform system. The frontend provides user interfaces for generating and sharing referral codes, tracking referrals, viewing rewards, and managing referral campaigns.

### 1.2 Scope
This specification covers the Angular-based frontend implementation for the referral program, including components, services, state management, and user interfaces.

### 1.3 Phase Classification
**Phase 5 - Enterprise Features**: The referral program frontend is part of the enterprise-level feature set.

---

## 2. Technology Stack Compliance

### 2.1 Framework Requirements

**REQ-REF-FE-001**: [Phase 5] The referral program frontend SHALL use Angular Material 3 for all UI components.

**Acceptance Criteria:**
- All components SHALL use Material 3 components
- Default Angular Material theme SHALL be used
- NO custom colors outside Material theme SHALL be introduced (REQ-FE-010)
- Material Design guidelines SHALL be strictly followed

**REQ-REF-FE-002**: [Phase 5] The referral program frontend SHALL use RxJS for state management.

**Acceptance Criteria:**
- BehaviorSubject SHALL be used for state streams
- NO NgRx SHALL be used (REQ-FE-007)
- NO Angular signals SHALL be used (REQ-FE-008)
- Observable patterns SHALL be used for async operations
- Subscriptions SHALL be properly managed and unsubscribed

**REQ-REF-FE-003**: [Phase 5] The referral program frontend SHALL be responsive and mobile-first.

**Acceptance Criteria:**
- All layouts SHALL be responsive (REQ-FE-018)
- Mobile viewports SHALL be prioritized in design
- Material breakpoints SHALL be used for responsiveness
- Touch interactions SHALL be optimized for mobile devices

---

## 3. Project Structure

### 3.1 Component Organization

**REQ-REF-FE-004**: [Phase 5] Referral page components SHALL be located in the `pages` folder.

**Acceptance Criteria:**
- Page components SHALL be in `src/CoursesPlatform.WebApp/projects/CoursesPlatform/src/app/pages/referrals`
- Child components SHALL be in the `components` folder (REQ-FE-016)
- Each component SHALL have separate files for HTML, SCSS, and TypeScript (REQ-FE-011)

**REQ-REF-FE-005**: [Phase 5] Reusable referral components SHALL be located in the `components` folder.

**Acceptance Criteria:**
- Reusable components SHALL be in `src/CoursesPlatform.WebApp/projects/CoursesPlatform/src/app/components/referrals`
- Components SHALL NOT include "Component" suffix in class names (REQ-FE-012)
- Component files SHALL NOT include "component" prefix (REQ-FE-013)

### 3.2 Service Organization

**REQ-REF-FE-006**: [Phase 5] Referral services SHALL be located in the `services` folder.

**Acceptance Criteria:**
- Services SHALL be in `src/CoursesPlatform.WebApp/projects/CoursesPlatform/src/app/services`
- Service files SHALL follow naming: `referral.service.ts`, `referral-campaign.service.ts`
- Services SHALL handle all HTTP communication with backend API

### 3.3 Module Exports

**REQ-REF-FE-007**: [Phase 5] Barrel exports SHALL be created for referral modules.

**Acceptance Criteria:**
- Each folder SHALL have an `index.ts` file (REQ-FE-017)
- All TypeScript code except tests SHALL be exported
- Exports SHALL enable clean import statements

---

## 4. Naming Conventions

### 4.1 Component Naming

**REQ-REF-FE-008**: [Phase 5] Component class names SHALL NOT include "Component" suffix.

**Acceptance Criteria:**
- Class names: `ReferralDashboard`, `ReferralCodeCard`, `RewardsList`
- NOT: `ReferralDashboardComponent`, `ReferralCodeCardComponent`
- Naming SHALL comply with REQ-FE-012

**REQ-REF-FE-009**: [Phase 5] Component file names SHALL NOT include "component" prefix.

**Acceptance Criteria:**
- File names: `referral-dashboard.ts`, `referral-dashboard.html`, `referral-dashboard.scss`
- NOT: `referral-dashboard.component.ts`, `referral-dashboard.component.html`
- Naming SHALL comply with REQ-FE-013

### 4.2 CSS Naming

**REQ-REF-FE-010**: [Phase 5] CSS classes SHALL use BEM (Block Element Modifier) naming strategy.

**Acceptance Criteria:**
- Block: `referral-card`
- Element: `referral-card__code`
- Modifier: `referral-card__code--highlighted`
- Naming SHALL comply with REQ-FE-019

---

## 5. Referral Dashboard

### 5.1 Dashboard Page

**REQ-REF-FE-011**: [Phase 5] The system SHALL provide a referral dashboard page.

**Acceptance Criteria:**
- Page component SHALL be named `ReferralDashboard`
- Route SHALL be `/referrals` or `/my-referrals`
- Dashboard SHALL display user's referral code
- Dashboard SHALL show referral statistics
- Dashboard SHALL list recent referrals
- Dashboard SHALL display total rewards earned
- Page SHALL be responsive for all device sizes

**REQ-REF-FE-012**: [Phase 5] The dashboard SHALL use Material 3 card components for layout.

**Acceptance Criteria:**
- mat-card SHALL be used for sectioned content
- mat-card-header, mat-card-content SHALL organize information
- Cards SHALL be responsive and stack on mobile devices
- Material elevation SHALL be applied appropriately

### 5.2 Dashboard Statistics

**REQ-REF-FE-013**: [Phase 5] The dashboard SHALL display referral statistics prominently.

**Acceptance Criteria:**
- Statistics SHALL include: total referrals, active referrals, completed referrals, total rewards
- Statistics SHALL use mat-card with appropriate styling
- Numbers SHALL be formatted for readability
- Loading state SHALL be shown while fetching data
- Error state SHALL be handled gracefully

**REQ-REF-FE-014**: [Phase 5] Statistics SHALL update in real-time using RxJS.

**Acceptance Criteria:**
- Statistics service SHALL expose Observable streams
- Component SHALL subscribe to statistics changes
- Updates SHALL be reflected automatically in UI
- Subscriptions SHALL be cleaned up on component destroy

---

## 6. Referral Code Display and Sharing

### 6.1 Referral Code Card

**REQ-REF-FE-015**: [Phase 5] The system SHALL provide a referral code display component.

**Acceptance Criteria:**
- Component SHALL be named `ReferralCodeCard`
- Component SHALL display the user's unique referral code
- Code SHALL be prominently visible and easy to read
- Component SHALL use mat-card for layout
- Typography SHALL use Material typography classes

**REQ-REF-FE-016**: [Phase 5] The referral code card SHALL include a copy button.

**Acceptance Criteria:**
- mat-button or mat-icon-button SHALL be used for copy action
- Button SHALL use Material icon: `content_copy`
- Click SHALL copy code to clipboard
- Success feedback SHALL be shown using mat-snackbar
- Error handling SHALL be implemented for clipboard failures

**REQ-REF-FE-017**: [Phase 5] The referral code card SHALL include a generate button if no code exists.

**Acceptance Criteria:**
- Button SHALL use mat-raised-button or mat-flat-button
- Button SHALL trigger code generation command
- Loading state SHALL be shown during generation
- Generated code SHALL be displayed immediately
- Error messages SHALL be shown if generation fails

### 6.2 Social Sharing

**REQ-REF-FE-018**: [Phase 5] The system SHALL provide social sharing functionality.

**Acceptance Criteria:**
- Component SHALL be named `ReferralShare`
- Share options SHALL include: Email, WhatsApp, Facebook, Twitter, LinkedIn
- Each option SHALL use appropriate Material icon
- Click SHALL open share dialog or native sharing
- Referral URL SHALL be pre-populated with user's code
- Share message SHALL be customizable

**REQ-REF-FE-019**: [Phase 5] Social sharing SHALL use mat-menu for share options.

**Acceptance Criteria:**
- mat-menu SHALL contain share option buttons
- mat-icon-button SHALL be used for menu trigger
- Menu SHALL use `share` Material icon
- Each share option SHALL have icon and label
- Menu SHALL be positioned appropriately

**REQ-REF-FE-020**: [Phase 5] The system SHALL generate shareable referral links.

**Acceptance Criteria:**
- Service SHALL construct referral URL with code parameter
- URL SHALL point to registration page with referral code
- URL SHALL be properly encoded
- Copy link button SHALL be available
- Link preview SHALL be shown

---

## 7. Referral List

### 7.1 Referrals Table

**REQ-REF-FE-021**: [Phase 5] The system SHALL display a list of user's referrals.

**Acceptance Criteria:**
- Component SHALL be named `ReferralsList`
- mat-table SHALL be used for tabular display
- Columns SHALL include: Referee name, Applied date, Status, Conversion date, Reward
- Table SHALL support sorting on relevant columns
- Table SHALL support pagination using mat-paginator
- Empty state SHALL be shown when no referrals exist

**REQ-REF-FE-022**: [Phase 5] Referral status SHALL be visually distinguished.

**Acceptance Criteria:**
- mat-chip SHALL be used to display status
- Status colors SHALL use Material theme colors:
  - Pending: default
  - Active: primary
  - Completed: accent
  - Expired: warn
  - Cancelled: basic
- Status changes SHALL be reflected in real-time via RxJS

**REQ-REF-FE-023**: [Phase 5] The referrals table SHALL be responsive.

**Acceptance Criteria:**
- Table SHALL scroll horizontally on small screens
- On mobile, table MAY switch to card layout
- Important information SHALL remain visible on all screen sizes
- mat-table responsive patterns SHALL be followed

### 7.2 Referral Filters

**REQ-REF-FE-024**: [Phase 5] The system SHALL provide filtering options for referrals.

**Acceptance Criteria:**
- mat-form-field with mat-select SHALL be used for status filter
- Date range filter SHALL use mat-datepicker
- Campaign filter SHALL be available if user participated in multiple campaigns
- Filters SHALL update table data reactively using RxJS
- Clear filters button SHALL reset all filters

---

## 8. Rewards Display

### 8.1 Rewards List

**REQ-REF-FE-025**: [Phase 5] The system SHALL display a list of user rewards.

**Acceptance Criteria:**
- Component SHALL be named `RewardsList`
- mat-list or mat-table SHALL be used for display
- Each reward SHALL show: Type, Amount, Status, Issued date, Expiry date
- Rewards SHALL be grouped by status (Pending, Issued, Redeemed, Expired)
- Total rewards earned SHALL be displayed prominently

**REQ-REF-FE-026**: [Phase 5] Reward types SHALL be clearly indicated with icons.

**Acceptance Criteria:**
- Material icons SHALL represent reward types:
  - PercentageDiscount: `percent`
  - FixedAmount: `attach_money`
  - CourseCredits: `school`
  - FreeCourse: `card_giftcard`
  - PremiumAccess: `workspace_premium`
- Icons SHALL use Material icon component
- Icon colors SHALL follow Material theme

**REQ-REF-FE-027**: [Phase 5] Reward status SHALL be visually distinguished.

**Acceptance Criteria:**
- mat-chip SHALL display status
- Color coding SHALL use Material theme colors
- Redeemed rewards SHALL be visually de-emphasized
- Expiring rewards SHALL be highlighted

### 8.2 Reward Details

**REQ-REF-FE-028**: [Phase 5] The system SHALL provide detailed reward information.

**Acceptance Criteria:**
- Click on reward SHALL show details in mat-dialog or expansion panel
- Details SHALL include: Description, Terms and conditions, How to redeem
- Redemption instructions SHALL be clear and actionable
- Dialog SHALL use mat-dialog-title, mat-dialog-content, mat-dialog-actions

---

## 9. Referral Application (New User Flow)

### 9.1 Referral Code Input

**REQ-REF-FE-029**: [Phase 5] The registration page SHALL include referral code input field.

**Acceptance Criteria:**
- mat-form-field SHALL contain referral code input
- Field SHALL be optional during registration
- Input SHALL validate code format (alphanumeric, 8-12 chars)
- Real-time validation SHALL verify code existence
- Invalid code SHALL show error message using mat-error
- Valid code SHALL show success indicator

**REQ-REF-FE-030**: [Phase 5] Referral code SHALL be auto-populated from URL parameter.

**Acceptance Criteria:**
- Registration component SHALL read `ref` or `referralCode` query parameter
- Parameter value SHALL pre-fill referral code field
- Auto-filled code SHALL be validated
- User SHALL be able to modify or clear the code

**REQ-REF-FE-031**: [Phase 5] Referrer information SHALL be displayed when valid code is entered.

**Acceptance Criteria:**
- mat-card or mat-expansion-panel SHALL show referrer details
- Display SHALL include: "Referred by [Name]" or similar message
- Reward information for new user SHALL be shown
- Display SHALL use Material typography and spacing

---

## 10. Campaign Information

### 10.1 Active Campaigns Display

**REQ-REF-FE-032**: [Phase 5] The system SHALL display active referral campaigns.

**Acceptance Criteria:**
- Component SHALL be named `ActiveCampaigns`
- mat-card SHALL be used for each campaign
- Campaign info SHALL include: Name, Description, Reward details, End date
- Campaigns SHALL be sorted by end date (soonest first)
- Empty state SHALL be shown if no active campaigns

**REQ-REF-FE-033**: [Phase 5] Campaign cards SHALL highlight reward benefits.

**Acceptance Criteria:**
- Referrer rewards SHALL be clearly stated
- Referee rewards SHALL be clearly stated
- mat-list SHALL organize reward details
- Visual emphasis SHALL be on reward amounts
- Call-to-action SHALL encourage participation

---

## 11. Services

### 11.1 Referral Service

**REQ-REF-FE-034**: [Phase 5] The system SHALL implement a ReferralService.

**Acceptance Criteria:**
- Service SHALL be named `ReferralService`
- Service SHALL handle all referral-related HTTP requests
- Service SHALL expose Observable streams for state
- Service file SHALL be `referral.service.ts`
- Service SHALL use HttpClient for API communication

**REQ-REF-FE-035**: [Phase 5] ReferralService SHALL implement the following methods:
- generateReferralCode(): Observable&lt;ReferralCodeDto&gt;
- getReferralCode(): Observable&lt;ReferralCodeDto&gt;
- validateReferralCode(code: string): Observable&lt;ValidationResultDto&gt;
- applyReferralCode(code: string): Observable&lt;void&gt;
- getUserReferrals(): Observable&lt;ReferralDto[]&gt;
- getReferralMetrics(): Observable&lt;ReferralMetricsDto&gt;

**Acceptance Criteria:**
- Each method SHALL return typed Observable
- HTTP errors SHALL be handled appropriately
- Methods SHALL use baseUrl configuration (REQ-FE-024, REQ-FE-026)
- API calls SHALL include `/api` path segment

**REQ-REF-FE-036**: [Phase 5] ReferralService SHALL manage referral state using RxJS.

**Acceptance Criteria:**
- BehaviorSubject SHALL hold current referral code state
- BehaviorSubject SHALL hold referrals list state
- Public Observable properties SHALL expose state
- State SHALL update when data changes
- Components SHALL subscribe to state observables

### 11.2 Rewards Service

**REQ-REF-FE-037**: [Phase 5] The system SHALL implement a RewardsService.

**Acceptance Criteria:**
- Service SHALL be named `RewardsService`
- Service file SHALL be `rewards.service.ts`
- Service SHALL handle rewards-related HTTP requests

**REQ-REF-FE-038**: [Phase 5] RewardsService SHALL implement the following methods:
- getUserRewards(): Observable&lt;RewardDto[]&gt;
- getRewardDetails(rewardId: string): Observable&lt;RewardDetailsDto&gt;

**Acceptance Criteria:**
- Methods SHALL return typed Observables
- Error handling SHALL be implemented
- State management SHALL use RxJS patterns

### 11.3 Campaign Service

**REQ-REF-FE-039**: [Phase 5] The system SHALL implement a ReferralCampaignService.

**Acceptance Criteria:**
- Service SHALL be named `ReferralCampaignService`
- Service file SHALL be `referral-campaign.service.ts`
- Service SHALL handle campaign-related HTTP requests

**REQ-REF-FE-040**: [Phase 5] ReferralCampaignService SHALL implement the following methods:
- getActiveCampaigns(): Observable&lt;CampaignDto[]&gt;
- getCampaignDetails(campaignId: string): Observable&lt;CampaignDetailsDto&gt;

**Acceptance Criteria:**
- Methods SHALL return typed Observables
- Active campaigns SHALL be cached appropriately
- State SHALL be managed with BehaviorSubject

---

## 12. Models and DTOs

### 12.1 TypeScript Interfaces

**REQ-REF-FE-041**: [Phase 5] The system SHALL define TypeScript interfaces for all DTOs.

**Acceptance Criteria:**
- Interfaces SHALL be in `src/CoursesPlatform.WebApp/projects/CoursesPlatform/src/app/models`
- Interface names SHALL match backend DTO names
- Properties SHALL match backend DTO properties
- Date properties SHALL use string type (ISO format)

**REQ-REF-FE-042**: [Phase 5] The system SHALL define the following interfaces:
- ReferralCodeDto
- ReferralDto
- RewardDto
- CampaignDto
- ReferralMetricsDto
- ValidationResultDto
- RewardDetailsDto
- CampaignDetailsDto

**Acceptance Criteria:**
- Each interface SHALL be in a separate file
- File naming: `referral-code.dto.ts`, `referral.dto.ts`, etc.
- Interfaces SHALL be exported via barrel index.ts

---

## 13. State Management

### 13.1 RxJS Patterns

**REQ-REF-FE-043**: [Phase 5] State management SHALL use RxJS BehaviorSubject pattern.

**Acceptance Criteria:**
- Private BehaviorSubject properties SHALL hold state
- Public Observable properties SHALL expose state
- State updates SHALL use .next() method
- Initial state SHALL be defined
- NO NgRx SHALL be used (REQ-FE-007)

**REQ-REF-FE-044**: [Phase 5] Component subscriptions SHALL be properly managed.

**Acceptance Criteria:**
- Subscriptions SHALL be stored in Subscription array or use async pipe
- ngOnDestroy SHALL unsubscribe from all subscriptions
- Memory leaks SHALL be prevented
- async pipe SHALL be preferred when possible

**REQ-REF-FE-045**: [Phase 5] Services SHALL expose state through Observable streams.

**Acceptance Criteria:**
- State streams SHALL use BehaviorSubject internally
- Public APIs SHALL expose Observable (not Subject)
- Multiple components SHALL be able to subscribe to same stream
- State SHALL be shared across subscribers using shareReplay or similar

---

## 14. Routing

### 14.1 Route Configuration

**REQ-REF-FE-046**: [Phase 5] The system SHALL configure routes for referral pages.

**Acceptance Criteria:**
- Route path `/referrals` SHALL navigate to ReferralDashboard
- Route path `/referrals/rewards` MAY navigate to dedicated rewards page
- Routes SHALL require authentication
- Route guards SHALL protect referral pages

**REQ-REF-FE-047**: [Phase 5] Registration route SHALL support referral code parameter.

**Acceptance Criteria:**
- Route `/register` SHALL accept query parameter `referralCode` or `ref`
- Parameter SHALL be optional
- Registration component SHALL read and apply parameter

---

## 15. User Experience

### 15.1 Loading States

**REQ-REF-FE-048**: [Phase 5] All async operations SHALL display loading indicators.

**Acceptance Criteria:**
- mat-progress-spinner SHALL be used for loading states
- Loading indicators SHALL be centered and appropriate size
- Loading state SHALL be managed via RxJS
- User SHALL not be able to submit duplicate requests during loading

**REQ-REF-FE-049**: [Phase 5] Skeleton loaders MAY be used for content placeholders.

**Acceptance Criteria:**
- Skeleton screens MAY show expected layout while loading
- Skeletons SHALL match final content structure
- Transition from skeleton to content SHALL be smooth

### 15.2 Error Handling

**REQ-REF-FE-050**: [Phase 5] All errors SHALL be displayed to users appropriately.

**Acceptance Criteria:**
- mat-snackbar SHALL be used for transient error messages
- mat-error SHALL be used for form validation errors
- Error messages SHALL be user-friendly and actionable
- Technical details SHALL NOT be exposed to users
- Retry options SHALL be provided where appropriate

**REQ-REF-FE-051**: [Phase 5] Network errors SHALL be handled gracefully.

**Acceptance Criteria:**
- Offline state SHALL be detected and communicated
- Retry mechanism SHALL be available
- Error state component or message SHALL guide user
- Previous data SHALL be retained when possible

### 15.3 Success Feedback

**REQ-REF-FE-052**: [Phase 5] Successful operations SHALL provide clear feedback.

**Acceptance Criteria:**
- mat-snackbar SHALL show success messages
- Success messages SHALL be concise and confirmatory
- Actions like "Code copied" SHALL provide immediate feedback
- Duration SHALL be appropriate (2-3 seconds for simple confirmations)

### 15.4 Empty States

**REQ-REF-FE-053**: [Phase 5] Empty states SHALL provide helpful guidance.

**Acceptance Criteria:**
- Empty states SHALL include Material icon
- Message SHALL explain why content is empty
- Call-to-action SHALL guide user to next step
- Empty state component SHALL be visually centered and styled

---

## 16. Responsive Design

### 16.1 Mobile Layout

**REQ-REF-FE-054**: [Phase 5] Referral dashboard SHALL be optimized for mobile devices.

**Acceptance Criteria:**
- Layout SHALL stack vertically on mobile
- Cards SHALL take full width on small screens
- Touch targets SHALL be minimum 48px
- Text SHALL be readable without zooming
- Material breakpoints SHALL be used: xs, sm, md, lg, xl

**REQ-REF-FE-055**: [Phase 5] Tables SHALL adapt to mobile screens.

**Acceptance Criteria:**
- Tables SHALL scroll horizontally OR
- Tables SHALL transform to card layout on mobile
- Most important information SHALL remain visible
- Horizontal scrolling SHALL be indicated

### 16.2 Tablet and Desktop Layout

**REQ-REF-FE-056**: [Phase 5] Referral dashboard SHALL utilize available screen space on larger devices.

**Acceptance Criteria:**
- Multi-column layouts SHALL be used on tablets and desktops
- Grid system SHALL organize content efficiently
- Cards SHALL have appropriate max-width
- White space SHALL be balanced

---

## 17. Accessibility

### 17.1 ARIA Attributes

**REQ-REF-FE-057**: [Phase 5] All interactive elements SHALL include appropriate ARIA attributes.

**Acceptance Criteria:**
- Buttons SHALL have aria-label when icon-only
- Status changes SHALL be announced with aria-live
- Form inputs SHALL have aria-describedby for errors
- Material components SHALL provide ARIA support

**REQ-REF-FE-058**: [Phase 5] Color SHALL NOT be the only means of conveying information.

**Acceptance Criteria:**
- Status SHALL use icons in addition to colors
- Error states SHALL include text messages, not just red color
- Success states SHALL include confirmatory text

### 17.2 Keyboard Navigation

**REQ-REF-FE-059**: [Phase 5] All functionality SHALL be accessible via keyboard.

**Acceptance Criteria:**
- Tab order SHALL be logical
- Focus indicators SHALL be visible
- Enter/Space SHALL activate buttons
- Escape SHALL close dialogs and menus
- Material components SHALL provide keyboard support

---

## 18. Styling and Theming

### 18.1 Material Theme Compliance

**REQ-REF-FE-060**: [Phase 5] All styling SHALL use default Angular Material theme colors.

**Acceptance Criteria:**
- NO custom colors SHALL be introduced (REQ-SYS-011, REQ-FE-010)
- Theme palette colors SHALL be used: primary, accent, warn
- Material color APIs SHALL be used for programmatic colors
- Color contrast SHALL meet WCAG AA standards

**REQ-REF-FE-061**: [Phase 5] Typography SHALL use Material typography system.

**Acceptance Criteria:**
- Material typography classes SHALL be used
- Custom font sizes SHALL be avoided
- Typography scale SHALL be consistent
- Line height and letter spacing SHALL follow Material guidelines

### 18.2 Spacing and Layout

**REQ-REF-FE-062**: [Phase 5] Spacing SHALL use design tokens.

**Acceptance Criteria:**
- Consistent spacing units SHALL be defined (e.g., 4px, 8px, 16px, 24px)
- Spacing variables SHALL be used instead of hardcoded values
- Material spacing guidelines SHALL be followed (REQ-FE-020)
- Padding and margins SHALL be consistent throughout

**REQ-REF-FE-063**: [Phase 5] BEM naming SHALL be used for custom CSS classes.

**Acceptance Criteria:**
- Block names SHALL represent components
- Element names SHALL represent parts of components
- Modifiers SHALL represent states or variations
- Naming SHALL comply with REQ-FE-019

---

## 19. Testing

### 19.1 Unit Testing

**REQ-REF-FE-064**: [Phase 5] All components and services SHALL have Jest unit tests.

**Acceptance Criteria:**
- Test files SHALL be named: `referral.service.spec.ts`, `referral-dashboard.spec.ts`
- Tests SHALL cover component logic and service methods
- Tests SHALL mock HTTP requests
- Tests SHALL verify Observable streams
- Test coverage SHALL be meaningful, not just percentage-driven

**REQ-REF-FE-065**: [Phase 5] Unit tests SHALL use Angular testing utilities.

**Acceptance Criteria:**
- TestBed SHALL configure test modules
- ComponentFixture SHALL be used for component testing
- HttpClientTestingModule SHALL mock HTTP calls
- Jest matchers SHALL be used for assertions

### 19.2 End-to-End Testing

**REQ-REF-FE-066**: [Phase 5] Critical referral flows SHALL have Playwright e2e tests.

**Acceptance Criteria:**
- Tests SHALL be in `src/CoursesPlatform.WebApp/projects/CoursesPlatform/src/e2e`
- Test flows SHALL include: Generate code, Share code, Apply code, View rewards
- Tests SHALL verify UI elements and user interactions
- Tests SHALL be stable and not flaky

---

## 20. Admin Interface (Bonus)

### 20.1 Campaign Management UI

**REQ-REF-FE-067**: [Phase 5] Admin interface SHALL provide campaign management pages.

**Acceptance Criteria:**
- Admin pages SHALL be in separate admin project or protected routes
- CRUD operations SHALL be available for campaigns
- mat-table SHALL display campaigns list
- mat-dialog or dedicated page SHALL handle create/edit forms
- Authorization SHALL restrict access to admin users

**REQ-REF-FE-068**: [Phase 5] Campaign form SHALL use Material form components.

**Acceptance Criteria:**
- mat-form-field SHALL wrap all inputs
- mat-datepicker SHALL be used for dates
- mat-select SHALL be used for dropdowns
- Form validation SHALL use Reactive Forms
- Validation errors SHALL display with mat-error

### 20.2 Analytics Dashboard

**REQ-REF-FE-069**: [Phase 5] Admin interface SHALL display referral analytics.

**Acceptance Criteria:**
- Analytics page SHALL show key metrics
- Charts MAY be used to visualize data (using compatible charting library)
- mat-table SHALL display detailed analytics data
- Filters SHALL allow date range and campaign selection
- Export functionality MAY be provided

---

## 21. API Integration

### 21.1 Base URL Configuration

**REQ-REF-FE-070**: [Phase 5] API base URL SHALL be configured per REQ-FE-024 and REQ-FE-026.

**Acceptance Criteria:**
- baseUrl SHALL contain ONLY the base URI (e.g., `http://localhost:3200`)
- baseUrl SHALL NOT include `/api` path segment
- Services SHALL append `/api/referrals` or `/api/referral-campaigns` to baseUrl
- Configuration SHALL be in a single location (environment file or config service)

**REQ-REF-FE-071**: [Phase 5] HTTP requests SHALL include appropriate headers.

**Acceptance Criteria:**
- Content-Type: application/json SHALL be set for POST/PUT requests
- Authorization header SHALL include JWT token
- HttpInterceptor MAY be used to add headers globally

### 21.2 Error Response Handling

**REQ-REF-FE-072**: [Phase 5] HTTP error responses SHALL be handled consistently.

**Acceptance Criteria:**
- 400 Bad Request SHALL show validation error messages
- 401 Unauthorized SHALL redirect to login
- 403 Forbidden SHALL show access denied message
- 404 Not Found SHALL show appropriate message
- 500 Server Error SHALL show generic error message
- Error handling MAY use HttpInterceptor

---

## 22. Performance

### 22.1 Optimization

**REQ-REF-FE-073**: [Phase 5] Components SHALL use OnPush change detection where appropriate.

**Acceptance Criteria:**
- ChangeDetectionStrategy.OnPush MAY be used for performance
- Immutable data patterns SHALL support OnPush
- Manual change detection SHALL be triggered when necessary

**REQ-REF-FE-074**: [Phase 5] Large lists SHALL use virtual scrolling.

**Acceptance Criteria:**
- mat-virtual-scroll MAY be used for long referral or reward lists
- Viewport SHALL be configured appropriately
- Item height SHALL be defined for consistent scrolling

### 22.2 Lazy Loading

**REQ-REF-FE-075**: [Phase 5] Referral module MAY be lazy loaded.

**Acceptance Criteria:**
- Referral feature MAY be in a separate Angular module
- Module MAY be loaded on demand via router
- Lazy loading SHALL reduce initial bundle size

---

## 23. Compliance

### 23.1 Frontend Architecture Compliance

**REQ-REF-FE-076**: [Phase 5] The referral program frontend SHALL comply with all frontend requirements in the SRS.

**Acceptance Criteria:**
- NO "Component" suffix in class names (REQ-FE-012)
- NO "component" prefix in file names (REQ-FE-013)
- Separate HTML, SCSS, TypeScript files (REQ-FE-011)
- Barrel exports for all folders (REQ-FE-017)
- BEM naming for CSS classes (REQ-FE-019)
- Design tokens for spacing (REQ-FE-020)
- Jest for unit tests (REQ-FE-021)
- Playwright for e2e tests (REQ-FE-022)
- RxJS for state management (REQ-FE-009)
- NO NgRx (REQ-FE-007)
- NO Angular signals (REQ-FE-008)
- Material 3 components only (REQ-FE-006)
- Default Material theme colors (REQ-FE-010, REQ-SYS-011)

---

**End of Referral Program Frontend Specification**
