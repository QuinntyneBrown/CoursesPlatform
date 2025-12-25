# Content Moderation Frontend Specification

**Feature:** Content Moderation Frontend
**Phase:** 5 (Enterprise Feature)
**Version:** 1.0
**Date:** 2025-12-25
**Status:** Draft

---

## 1. Overview

The Content Moderation Frontend provides user interfaces for content flagging, moderation queue management, moderation actions, appeals, and trust score visualization. The frontend supports both regular users (flagging and appeals) and moderators (queue management and actions).

---

## 2. Functional Requirements

### 2.1 Content Flagging Interface

**REQ-MOD-FE-001** [Phase 5]
**Requirement:** The system SHALL provide a flag content dialog component.

**Acceptance Criteria:**
- Angular Material dialog component (MatDialog)
- Dialog triggered by flag button on content items
- Flag reason dropdown using MatSelect with predefined options
- Optional description textarea using MatFormField with 1000 character limit
- Character counter displayed for description field
- Submit and Cancel buttons using MatButton
- Form validation prevents submission without reason
- Loading state displayed during submission
- Success snackbar notification after successful flag
- Error handling with MatSnackBar for failures

---

**REQ-MOD-FE-002** [Phase 5]
**Requirement:** The system SHALL display flag status on flagged content.

**Acceptance Criteria:**
- Flagged indicator shown on user's own flagged content
- Indicator uses MatChip or MatBadge
- Shows "Under Review" status
- Users cannot re-flag already flagged content
- Indicator styled with Angular Material theme colors

---

**REQ-MOD-FE-003** [Phase 5]
**Requirement:** The system SHALL enforce client-side flag rate limiting.

**Acceptance Criteria:**
- Track flag count per 24-hour period in RxJS BehaviorSubject
- Disable flag button when limit reached (10 flags)
- Display warning message using MatSnackBar when approaching limit
- Show remaining flags count in tooltip using MatTooltip
- Reset count after 24 hours

---

### 2.2 Moderation Dashboard

**REQ-MOD-FE-004** [Phase 5]
**Requirement:** The system SHALL provide a moderation dashboard page for moderators.

**Acceptance Criteria:**
- Dedicated route /moderation/dashboard
- Moderator role required (route guard)
- Dashboard displays key metrics using MatCard components
- Metrics: Pending items, Items under review, Resolved today, Average resolution time
- Charts/graphs using Angular Material compatible library
- Real-time updates via RxJS polling (every 30 seconds)
- Mobile-responsive layout using Angular Flex Layout or Material grid

---

**REQ-MOD-FE-005** [Phase 5]
**Requirement:** The system SHALL display moderation statistics.

**Acceptance Criteria:**
- Statistics cards using MatCard
- Display total flags, actions taken, appeal rate
- Filter statistics by date range using MatDatepicker
- Export statistics to CSV using MatButton
- Statistics updated via RxJS observable streams
- Loading skeleton shown while fetching data

---

### 2.3 Moderation Queue UI

**REQ-MOD-FE-006** [Phase 5]
**Requirement:** The system SHALL provide a moderation queue page with filtering.

**Acceptance Criteria:**
- Route: /moderation/queue
- Table using MatTable with MatPaginator and MatSort
- Columns: Content Type, Priority, Flags Count, Flagged Date, Status, Assigned To, Actions
- Filter panel using MatExpansionPanel
- Status filter using MatButtonToggle or MatChip
- Priority filter using MatButtonToggle
- Content type filter using MatSelect
- Date range filter using MatDatepicker
- Assigned to filter using MatSelect (moderator list)
- Filters managed via RxJS combineLatest
- Filter state persisted in query parameters

---

**REQ-MOD-FE-007** [Phase 5]
**Requirement:** The system SHALL display queue items with priority indication.

**Acceptance Criteria:**
- Critical priority: Red MatChip or red row highlight
- High priority: Orange MatChip or orange row highlight
- Medium priority: Yellow MatChip or yellow row highlight
- Low priority: Default styling
- Colors use Angular Material theme palette
- Priority badge visible in list and detail views

---

**REQ-MOD-FE-008** [Phase 5]
**Requirement:** The system SHALL support queue item actions.

**Acceptance Criteria:**
- Claim button using MatButton for unassigned items
- View Details button using MatIconButton with eye icon
- Reassign button for assigned items
- Actions disabled based on item status and user permissions
- Loading state on buttons during action execution
- Optimistic UI updates with rollback on error
- Success/error notifications using MatSnackBar

---

**REQ-MOD-FE-009** [Phase 5]
**Requirement:** The system SHALL implement real-time queue updates.

**Acceptance Criteria:**
- Queue refreshes automatically every 60 seconds using RxJS interval
- Manual refresh button available using MatIconButton
- New items highlighted with animation
- Items auto-removed when resolved
- RxJS switchMap used for query updates
- Handles concurrent filter changes gracefully

---

### 2.4 Queue Item Review Interface

**REQ-MOD-FE-010** [Phase 5]
**Requirement:** The system SHALL provide a detailed queue item review page.

**Acceptance Criteria:**
- Route: /moderation/queue/:id
- Layout using MatCard sections
- Content preview section showing flagged content in context
- Flags section listing all flags with reasons and descriptions
- Flag metadata: Flagger (anonymized), Date, AI flag indicator, Confidence score
- Content creator information section
- Content creator's trust score displayed
- Previous moderation history for creator shown in MatExpansionPanel
- Action panel with action buttons

---

**REQ-MOD-FE-011** [Phase 5]
**Requirement:** The system SHALL provide moderation action interface.

**Acceptance Criteria:**
- Action buttons: Approve, Remove, Hide, Warn, Ban
- Buttons styled with appropriate colors using Material theme
- Approve: Primary color (green tone from theme)
- Remove/Ban: Warn color (red tone from theme)
- Hide: Accent color
- Warn: Warn color (orange tone from theme)
- Action confirmation dialog using MatDialog
- Required notes field in dialog using MatFormField
- Notes minimum 20 characters with validation
- Character counter shown
- Submit disables until validation passes

---

**REQ-MOD-FE-012** [Phase 5]
**Requirement:** The system SHALL display content in moderation context.

**Acceptance Criteria:**
- Content displayed with surrounding context
- For reviews: Show course and review text
- For Q&A: Show question/answer thread
- For discussions: Show discussion thread
- For messages: Show message thread (with privacy considerations)
- Media content (images/videos) rendered inline
- Content displayed in read-only MatCard
- Offensive content blurred with reveal option

---

### 2.5 Appeal Interface

**REQ-MOD-FE-013** [Phase 5]
**Requirement:** The system SHALL provide an appeal submission form.

**Acceptance Criteria:**
- Accessible from moderation action notification
- Route: /moderation/appeals/create/:actionId
- Form using MatFormField components
- Reason textarea with 50 character minimum, 2000 maximum
- Character counter displayed
- Form validation prevents submission until valid
- Submit button using MatButton
- Eligibility check (within 30 days, no duplicate appeal)
- Success message redirects to appeals list
- Error handling with MatSnackBar

---

**REQ-MOD-FE-014** [Phase 5]
**Requirement:** The system SHALL display user's appeal history.

**Acceptance Criteria:**
- Route: /moderation/appeals/my-appeals
- List using MatList or MatTable
- Each appeal shows: Content, Action taken, Appeal date, Status
- Status badges using MatChip with color coding
- Pending: Primary color
- Under Review: Accent color
- Approved: Success color
- Rejected: Warn color
- Expandable details using MatExpansionPanel
- Shows original action, appeal reason, review notes (if reviewed)

---

**REQ-MOD-FE-015** [Phase 5]
**Requirement:** The system SHALL provide appeal review interface for moderators.

**Acceptance Criteria:**
- Route: /moderation/appeals/queue
- Moderator role required
- Table using MatTable with sorting and pagination
- Columns: Content Type, User, Original Action, Appeal Date, Status, Actions
- Review button opens appeal review dialog
- Dialog shows original action details, appeal reason, content
- Approve/Reject buttons with required review notes
- Notes field minimum 20 characters
- Action confirmation step
- Status updates reflected immediately

---

### 2.6 Trust Score Display

**REQ-MOD-FE-016** [Phase 5]
**Requirement:** The system SHALL display user trust score in profile.

**Acceptance Criteria:**
- Trust score shown in user profile section
- Score displayed with MatProgressBar (0-100)
- Color coded: Red (0-30), Yellow (31-60), Green (61-100)
- Current restrictions displayed if any
- Tooltip using MatTooltip explains trust score
- Score history graph available in expansion panel
- Graph shows score changes over time

---

**REQ-MOD-FE-017** [Phase 5]
**Requirement:** The system SHALL display trust score in moderation context.

**Acceptance Criteria:**
- Moderators see full trust score details for content creators
- Trust score shown in queue item review
- Score history timeline using MatStepper or custom timeline
- Events that affected score listed with timestamps
- Moderators can view detailed score calculation

---

### 2.7 Notification Integration

**REQ-MOD-FE-018** [Phase 5]
**Requirement:** The system SHALL display moderation-related notifications.

**Acceptance Criteria:**
- Notifications for moderation actions on user's content
- Notifications for appeal outcomes
- Notifications for trust score changes
- Notification badge on bell icon using MatBadge
- Notification list using MatMenu
- Click notification navigates to relevant page
- Notifications marked as read on click
- Unread count updates via RxJS subject

---

### 2.8 Admin Configuration Interface

**REQ-MOD-FE-019** [Phase 5]
**Requirement:** The system SHALL provide moderation settings page for administrators.

**Acceptance Criteria:**
- Route: /admin/moderation/settings
- Administrator role required
- Settings form using reactive forms with MatFormField
- Configure: AI moderation thresholds, Flag rate limits, Auto-action rules
- Trust score adjustment values configurable
- Settings saved via PATCH API call
- Success/error feedback using MatSnackBar
- Settings changes logged

---

**REQ-MOD-FE-020** [Phase 5]
**Requirement:** The system SHALL display moderation audit logs for administrators.

**Acceptance Criteria:**
- Route: /admin/moderation/audit
- Administrator role required
- Table using MatTable with virtual scrolling for performance
- Columns: Timestamp, User, Moderator, Action Type, Content, Details
- Filter by date range, user, moderator, action type
- Search functionality using MatFormField
- Export to CSV option
- Pagination for large datasets using MatPaginator

---

## 3. Technical Requirements

### 3.1 Component Architecture

**REQ-MOD-FE-021** [Phase 5]
**Requirement:** The system SHALL organize components following project structure.

**Acceptance Criteria:**
- Pages in src/CoursesPlatform.WebApp/projects/CoursesPlatform/src/pages/
- Reusable components in src/CoursesPlatform.WebApp/projects/CoursesPlatform/src/components/
- Moderation pages: moderation-dashboard, moderation-queue, queue-item-review, appeal-form, appeal-list, moderation-settings, audit-log
- Reusable components: flag-content-dialog, moderation-action-dialog, trust-score-display, appeal-review-dialog
- No "Component" suffix in class names
- No "component" in file names (e.g., flag-content-dialog.ts, not flag-content-dialog.component.ts)
- Separate .html, .scss, .ts files

---

**REQ-MOD-FE-022** [Phase 5]
**Requirement:** The system SHALL use Angular Material 3 components exclusively.

**Acceptance Criteria:**
- MatDialog for all modal dialogs
- MatTable for data tables
- MatPaginator for pagination
- MatSort for table sorting
- MatFormField for all form inputs
- MatSelect for dropdowns
- MatDatepicker for date selection
- MatButton and MatIconButton for actions
- MatSnackBar for notifications
- MatChip for tags and status indicators
- MatBadge for counts and indicators
- MatTooltip for helpful hints
- MatExpansionPanel for expandable sections
- MatProgressBar and MatProgressSpinner for loading states
- MatCard for content grouping
- MatMenu for dropdown menus

---

**REQ-MOD-FE-023** [Phase 5]
**Requirement:** The system SHALL use default Angular Material theme colors only.

**Acceptance Criteria:**
- Primary, Accent, Warn colors from Material theme
- No custom colors defined
- Success states use primary green tone
- Warning states use warn color
- Error states use warn color
- Neutral states use default grey tones
- All colors sourced from Angular Material palette

---

### 3.2 State Management with RxJS

**REQ-MOD-FE-024** [Phase 5]
**Requirement:** The system SHALL use RxJS for state management.

**Acceptance Criteria:**
- NO NgRx used
- NO Angular Signals used
- BehaviorSubject for component state
- Observable streams for data flow
- shareReplay() for cached data
- switchMap for query updates
- combineLatest for multiple filter streams
- debounceTime for search inputs
- Subject for action events

---

**REQ-MOD-FE-025** [Phase 5]
**Requirement:** The system SHALL implement reactive data services.

**Acceptance Criteria:**
- ModerationService with observable-based methods
- getFlagQueue$(): Observable<QueueItem[]>
- getQueueItemDetails$(id): Observable<QueueItemDetails>
- flagContent$(data): Observable<void>
- takeModerationAction$(data): Observable<void>
- submitAppeal$(data): Observable<void>
- getTrustScore$(userId): Observable<TrustScore>
- Services use HttpClient with proper typing
- Services handle errors with catchError
- Services use retry logic for transient failures

---

**REQ-MOD-FE-026** [Phase 5]
**Requirement:** The system SHALL manage queue filter state reactively.

**Acceptance Criteria:**
- FilterService with BehaviorSubject for each filter
- Combine filters using combineLatest
- Filter changes trigger API calls via switchMap
- Filter state synced to query parameters
- Filter reset function available
- Active filters displayed with MatChip with remove option

---

### 3.3 Routing and Navigation

**REQ-MOD-FE-027** [Phase 5]
**Requirement:** The system SHALL implement moderation routes with guards.

**Acceptance Criteria:**
- Routes defined in moderation.routes.ts
- ModeratorGuard checks for Moderator role
- AdminGuard checks for Administrator role
- Routes:
  - /moderation/dashboard (ModeratorGuard)
  - /moderation/queue (ModeratorGuard)
  - /moderation/queue/:id (ModeratorGuard)
  - /moderation/appeals/my-appeals (authenticated)
  - /moderation/appeals/create/:actionId (authenticated)
  - /moderation/appeals/queue (ModeratorGuard)
  - /admin/moderation/settings (AdminGuard)
  - /admin/moderation/audit (AdminGuard)
- Guards redirect to login or error page on failure
- Route transitions include loading states

---

**REQ-MOD-FE-028** [Phase 5]
**Requirement:** The system SHALL provide navigation for moderation features.

**Acceptance Criteria:**
- Moderation menu item in main navigation (moderator only)
- Dashboard, Queue, Appeals submenus
- Active route highlighted using MatNav
- Unread counts displayed on menu items using MatBadge
- Quick actions accessible from toolbar
- Breadcrumb navigation for nested pages

---

### 3.4 Forms and Validation

**REQ-MOD-FE-029** [Phase 5]
**Requirement:** The system SHALL implement reactive forms with validation.

**Acceptance Criteria:**
- Reactive forms for all user input
- FormBuilder for form construction
- Validators for required fields, min/max length, patterns
- Custom validators for business rules
- Error messages displayed using MatError
- Validation messages clear and helpful
- Form submission disabled when invalid
- Validation triggered on blur and submit

---

**REQ-MOD-FE-030** [Phase 5]
**Requirement:** The system SHALL provide real-time character counting.

**Acceptance Criteria:**
- Character counter for all text fields with limits
- Counter updates as user types
- Counter shows remaining characters
- Counter turns red when limit approached (90%)
- Counter positioned below field using mat-hint
- Prevents input beyond limit

---

### 3.5 API Integration

**REQ-MOD-FE-031** [Phase 5]
**Requirement:** The system SHALL integrate with backend moderation API.

**Acceptance Criteria:**
- API base URL from configuration (no /api suffix)
- Full path constructed in service (e.g., ${baseUrl}/api/moderation/...)
- HttpClient with proper headers
- Authorization token included in requests
- Request/response typed with TypeScript interfaces
- Error interceptor handles 401, 403, 404, 500 errors
- Loading interceptor manages global loading state

---

**REQ-MOD-FE-032** [Phase 5]
**Requirement:** The system SHALL handle API errors gracefully.

**Acceptance Criteria:**
- Network errors display user-friendly messages
- 400 validation errors show field-specific messages
- 403 forbidden shows access denied message
- 404 shows content not found message
- 500 errors show generic error message
- All errors logged to console for debugging
- Retry option provided for transient failures
- Errors displayed using MatSnackBar

---

### 3.6 Performance Optimization

**REQ-MOD-FE-033** [Phase 5]
**Requirement:** The system SHALL optimize large list rendering.

**Acceptance Criteria:**
- Virtual scrolling for tables with >100 items using MatVirtualScroll
- Pagination for queue and audit logs
- Lazy loading for detail views
- Debounce search inputs (300ms)
- Throttle scroll events
- Unsubscribe from observables in ngOnDestroy
- Use trackBy for ngFor loops

---

**REQ-MOD-FE-034** [Phase 5]
**Requirement:** The system SHALL implement efficient data caching.

**Acceptance Criteria:**
- shareReplay() for reference data (moderators list, content types)
- Cache queue data for 60 seconds
- Invalidate cache on mutations
- Cache trust scores for 5 minutes
- Configurable cache durations
- Manual cache clear option available

---

### 3.7 Responsive Design

**REQ-MOD-FE-035** [Phase 5]
**Requirement:** The system SHALL be fully responsive.

**Acceptance Criteria:**
- Mobile-first design approach
- Breakpoints: xs (<600px), sm (600-960px), md (960-1280px), lg (>1280px)
- Tables convert to cards on mobile using MatCard
- Filters collapse into expansion panel on mobile
- Actions move to bottom sheet on mobile using MatBottomSheet
- Touch-friendly button sizes (min 44x44px)
- Horizontal scrolling for wide tables on mobile

---

**REQ-MOD-FE-036** [Phase 5]
**Requirement:** The system SHALL use BEM naming for custom CSS.

**Acceptance Criteria:**
- Block: .moderation-queue
- Element: .moderation-queue__header
- Modifier: .moderation-queue__item--critical
- Consistent naming across all components
- No nested BEM beyond one level
- Custom CSS minimal due to Material components

---

### 3.8 Accessibility

**REQ-MOD-FE-037** [Phase 5]
**Requirement:** The system SHALL meet WCAG 2.1 AA accessibility standards.

**Acceptance Criteria:**
- All interactive elements keyboard accessible
- Proper ARIA labels on all controls
- Focus indicators visible
- Color contrast ratios meet 4.5:1 minimum
- Screen reader friendly
- Tab order logical
- Error messages associated with form fields
- Loading states announced to screen readers

---

### 3.9 Testing

**REQ-MOD-FE-038** [Phase 5]
**Requirement:** The system SHALL include comprehensive unit tests using Jest.

**Acceptance Criteria:**
- Unit tests for all components
- Unit tests for all services
- Mock HTTP calls using HttpClientTestingModule
- Test component rendering and user interactions
- Test form validation
- Test RxJS observable streams
- Minimum 80% code coverage
- Tests in .spec.ts files

---

**REQ-MOD-FE-039** [Phase 5]
**Requirement:** The system SHALL include E2E tests using Playwright.

**Acceptance Criteria:**
- E2E tests in src/CoursesPlatform.WebApp/projects/CoursesPlatform/src/e2e/
- Test flag content workflow
- Test moderation queue workflow
- Test taking moderation action
- Test appeal submission and review
- Test filters and sorting
- Mock backend API for consistent testing
- Tests run in CI/CD pipeline

---

## 4. User Experience Requirements

**REQ-MOD-FE-040** [Phase 5]
**Requirement:** The system SHALL provide clear user feedback.

**Acceptance Criteria:**
- Loading spinners during async operations
- Success messages for completed actions
- Error messages for failed actions
- Confirmation dialogs for destructive actions
- Progress indicators for multi-step workflows
- Disabled states clearly indicated
- Tooltips provide helpful information

---

**REQ-MOD-FE-041** [Phase 5]
**Requirement:** The system SHALL support keyboard shortcuts for moderators.

**Acceptance Criteria:**
- Ctrl/Cmd+K: Focus search
- A: Approve selected item
- R: Remove selected item
- H: Hide selected item
- N: Next item in queue
- P: Previous item in queue
- Esc: Close dialog/cancel action
- Shortcuts displayed in help overlay (?)

---

**REQ-MOD-FE-042** [Phase 5]
**Requirement:** The system SHALL provide contextual help.

**Acceptance Criteria:**
- Help icon on complex pages
- Tooltips on all action buttons
- Inline help text for forms
- FAQ link in moderation dashboard
- Video tutorials embedded in help section
- Help content using MatExpansionPanel

---

## 5. File Organization

Following the implementation specs:

```
src/CoursesPlatform.WebApp/projects/CoursesPlatform/src/
  pages/
    moderation-dashboard/
      moderation-dashboard.ts
      moderation-dashboard.html
      moderation-dashboard.scss
      moderation-dashboard.spec.ts
    moderation-queue/
      moderation-queue.ts
      moderation-queue.html
      moderation-queue.scss
      moderation-queue.spec.ts
    queue-item-review/
      queue-item-review.ts
      queue-item-review.html
      queue-item-review.scss
      queue-item-review.spec.ts
    appeal-form/
      appeal-form.ts
      appeal-form.html
      appeal-form.scss
      appeal-form.spec.ts
    my-appeals/
      my-appeals.ts
      my-appeals.html
      my-appeals.scss
      my-appeals.spec.ts
    appeal-queue/
      appeal-queue.ts
      appeal-queue.html
      appeal-queue.scss
      appeal-queue.spec.ts
    moderation-settings/
      moderation-settings.ts
      moderation-settings.html
      moderation-settings.scss
      moderation-settings.spec.ts
    audit-log/
      audit-log.ts
      audit-log.html
      audit-log.scss
      audit-log.spec.ts
  components/
    flag-content-dialog/
      flag-content-dialog.ts
      flag-content-dialog.html
      flag-content-dialog.scss
      flag-content-dialog.spec.ts
    moderation-action-dialog/
      moderation-action-dialog.ts
      moderation-action-dialog.html
      moderation-action-dialog.scss
      moderation-action-dialog.spec.ts
    trust-score-display/
      trust-score-display.ts
      trust-score-display.html
      trust-score-display.scss
      trust-score-display.spec.ts
    appeal-review-dialog/
      appeal-review-dialog.ts
      appeal-review-dialog.html
      appeal-review-dialog.scss
      appeal-review-dialog.spec.ts
    queue-filters/
      queue-filters.ts
      queue-filters.html
      queue-filters.scss
      queue-filters.spec.ts
  services/
    moderation.service.ts
    moderation.service.spec.ts
    trust-score.service.ts
    trust-score.service.spec.ts
    appeal.service.ts
    appeal.service.spec.ts
  models/
    content-flag.model.ts
    moderation-queue.model.ts
    moderation-action.model.ts
    appeal.model.ts
    trust-score.model.ts
    flag-reason.enum.ts
    moderation-action-type.enum.ts
    queue-status.enum.ts
    queue-priority.enum.ts
    appeal-status.enum.ts
  guards/
    moderator.guard.ts
    moderator.guard.spec.ts
  e2e/
    moderation/
      flag-content.spec.ts
      moderation-queue.spec.ts
      take-action.spec.ts
      appeal-flow.spec.ts
```

---

## 6. Integration with Existing Features

**REQ-MOD-FE-043** [Phase 5]
**Requirement:** The system SHALL integrate flag buttons into existing content components.

**Acceptance Criteria:**
- Flag button added to course detail page
- Flag button added to review cards
- Flag button added to Q&A posts
- Flag button added to discussion posts
- Flag button styled consistently using MatIconButton
- Flag icon from Material Icons (flag or outlined_flag)
- Button shows flag count if content has been flagged

---

**REQ-MOD-FE-044** [Phase 5]
**Requirement:** The system SHALL integrate with existing notification system.

**Acceptance Criteria:**
- Moderation notifications appear in notification panel
- Notification service extended with moderation notification types
- Notifications link to relevant moderation pages
- Notification preferences include moderation categories

---

## 7. Success Metrics

- Flag submission completes in <2 seconds
- Queue page loads in <1 second with 100 items
- Filter updates apply in <500ms
- Mobile usability score >90
- Accessibility audit passes with no critical issues
- User task completion rate >95%
- Moderator productivity increases by 30%
- User satisfaction with appeal process >80%

---

**End of Content Moderation Frontend Specification**
