# System Infrastructure - Frontend Specification

**Feature:** System Infrastructure
**Version:** 1.0
**Last Updated:** December 2025

---

## 1. Overview

The System Infrastructure frontend provides administrative interfaces for monitoring system health, managing feature flags, viewing audit logs, managing cache, and configuring system settings.

---

## 2. Requirements

### 2.1 Admin Dashboard

#### REQ-SYS-FE-001: Dashboard Overview [Phase 5]
The system SHALL display an administrative dashboard with key metrics.

**Acceptance Criteria:**
- AC1: Dashboard shows overall system health status
- AC2: Key metrics are displayed in cards (CPU, memory, requests/sec)
- AC3: Status indicators use color coding (green/yellow/red)
- AC4: Dashboard auto-refreshes every 30 seconds
- AC5: Uses Angular Material Card and Grid List components

#### REQ-SYS-FE-002: System Health Display [Phase 5]
The system SHALL display detailed health check results.

**Acceptance Criteria:**
- AC1: All health checks are listed with status
- AC2: Response times are displayed
- AC3: Timestamp of last check is shown
- AC4: Failed checks show error details
- AC5: Uses Angular Material List and Expansion Panel components

#### REQ-SYS-FE-003: Health Metrics Chart [Phase 5]
The system SHALL display health metrics in time-series charts.

**Acceptance Criteria:**
- AC1: CPU and memory usage charts are displayed
- AC2: Time range can be selected (1h, 6h, 24h, 7d)
- AC3: Charts update in real-time
- AC4: Hover shows exact values
- AC5: Uses Angular Material Select for time range

#### REQ-SYS-FE-004: Alert Notifications [Phase 5]
The system SHALL display real-time health alerts.

**Acceptance Criteria:**
- AC1: Alerts appear as snackbar notifications
- AC2: Critical alerts are shown prominently
- AC3: Alert history is accessible
- AC4: Alerts can be acknowledged
- AC5: Uses Angular Material Snackbar component

### 2.2 Audit Log Viewer

#### REQ-SYS-FE-005: Audit Log List [Phase 5]
The system SHALL display audit logs in a searchable table.

**Acceptance Criteria:**
- AC1: Logs are displayed in paginated table
- AC2: Columns show timestamp, user, action, entity
- AC3: Sorting is supported on all columns
- AC4: Row expansion shows full details
- AC5: Uses Angular Material Table and Paginator components

#### REQ-SYS-FE-006: Audit Log Filtering [Phase 5]
The system SHALL allow filtering audit logs.

**Acceptance Criteria:**
- AC1: Filter by date range using date pickers
- AC2: Filter by user using autocomplete
- AC3: Filter by action type using select
- AC4: Filter by entity type using select
- AC5: Multiple filters can be applied simultaneously
- AC6: Uses Angular Material Date Picker, Autocomplete, and Select components

#### REQ-SYS-FE-007: Audit Log Export [Phase 5]
The system SHALL allow exporting audit logs.

**Acceptance Criteria:**
- AC1: Export button is available
- AC2: Export respects current filters
- AC3: CSV and JSON formats are supported
- AC4: Progress indicator shown during export
- AC5: Uses Angular Material Button and Progress Bar components

#### REQ-SYS-FE-008: Audit Log Details [Phase 5]
The system SHALL display detailed audit log information.

**Acceptance Criteria:**
- AC1: Full audit entry is shown in dialog
- AC2: Before/after state comparison is displayed
- AC3: Related entities are linked
- AC4: JSON view is available
- AC5: Uses Angular Material Dialog component

### 2.3 Cache Management

#### REQ-SYS-FE-009: Cache Statistics Dashboard [Phase 5]
The system SHALL display cache usage statistics.

**Acceptance Criteria:**
- AC1: Hit/miss ratio is displayed in pie chart
- AC2: Memory usage is shown in progress bar
- AC3: Top cached keys are listed
- AC4: Statistics refresh automatically
- AC5: Uses Angular Material Progress Bar and Card components

#### REQ-SYS-FE-010: Cache Invalidation UI [Phase 5]
The system SHALL provide cache invalidation controls.

**Acceptance Criteria:**
- AC1: Invalidate by key using input field
- AC2: Invalidate by pattern using input field
- AC3: Invalidate by tag using select
- AC4: Confirmation dialog before invalidation
- AC5: Success/error feedback is shown
- AC6: Uses Angular Material Form Field, Input, and Dialog components

#### REQ-SYS-FE-011: Cache Warming Control [Phase 5]
The system SHALL allow triggering cache warming.

**Acceptance Criteria:**
- AC1: Warm cache button is available
- AC2: Progress is shown during warming
- AC3: Completion notification is displayed
- AC4: Warming can be cancelled
- AC5: Uses Angular Material Button and Progress Spinner components

### 2.4 Background Jobs Management

#### REQ-SYS-FE-012: Jobs List [Phase 5]
The system SHALL display background jobs in a table.

**Acceptance Criteria:**
- AC1: Jobs are listed with status, type, scheduled time
- AC2: Status badges use appropriate colors
- AC3: Pagination is supported
- AC4: Jobs can be filtered by status
- AC5: Uses Angular Material Table, Chip, and Select components

#### REQ-SYS-FE-013: Job Details View [Phase 5]
The system SHALL display detailed job information.

**Acceptance Criteria:**
- AC1: Job parameters are displayed
- AC2: Execution history is shown
- AC3: Error logs are displayed for failed jobs
- AC4: Retry count and next retry time shown
- AC5: Uses Angular Material Card and Expansion Panel components

#### REQ-SYS-FE-014: Job Actions [Phase 5]
The system SHALL allow job management actions.

**Acceptance Criteria:**
- AC1: Cancel button for running jobs
- AC2: Retry button for failed jobs
- AC3: Delete button for completed jobs
- AC4: Confirmation dialog for destructive actions
- AC5: Action buttons are disabled based on job state
- AC6: Uses Angular Material Button and Dialog components

#### REQ-SYS-FE-015: Job Monitoring [Phase 5]
The system SHALL provide real-time job monitoring.

**Acceptance Criteria:**
- AC1: Running jobs show progress indicator
- AC2: Job status updates automatically
- AC3: Queue depth is displayed
- AC4: Failed jobs are highlighted
- AC5: Uses Angular Material Progress Bar and Badge components

### 2.5 Feature Flags Management

#### REQ-SYS-FE-016: Feature Flags List [Phase 5]
The system SHALL display feature flags in a table.

**Acceptance Criteria:**
- AC1: Flags are listed with key, description, status
- AC2: Toggle switch for each flag
- AC3: Search functionality is available
- AC4: Active/inactive flags can be filtered
- AC5: Uses Angular Material Table and Slide Toggle components

#### REQ-SYS-FE-017: Feature Flag Toggle [Phase 5]
The system SHALL allow toggling feature flags.

**Acceptance Criteria:**
- AC1: Toggle switch updates flag state
- AC2: Confirmation dialog for critical flags
- AC3: Success/error feedback is shown
- AC4: Audit log entry is created
- AC5: Uses Angular Material Slide Toggle and Dialog components

#### REQ-SYS-FE-018: Feature Flag Creation [Phase 5]
The system SHALL allow creating new feature flags.

**Acceptance Criteria:**
- AC1: Create button opens dialog form
- AC2: Form validates required fields
- AC3: Key uniqueness is validated
- AC4: Default state is selectable
- AC5: Uses Angular Material Dialog and Form Field components

#### REQ-SYS-FE-019: Feature Flag Targeting [Phase 5]
The system SHALL allow configuring flag targeting.

**Acceptance Criteria:**
- AC1: User targeting can be configured
- AC2: Percentage rollout slider is available
- AC3: User segment selection is supported
- AC4: Preview shows affected users count
- AC5: Uses Angular Material Slider, Chip List, and Select components

#### REQ-SYS-FE-020: Feature Flag Analytics [Phase 5]
The system SHALL display feature flag usage analytics.

**Acceptance Criteria:**
- AC1: Evaluation count is displayed
- AC2: User distribution chart is shown
- AC3: Performance impact is displayed
- AC4: Time series chart shows usage over time
- AC5: Uses Angular Material Card component

### 2.6 Configuration Management

#### REQ-SYS-FE-021: Configuration List [Phase 5]
The system SHALL display configuration settings.

**Acceptance Criteria:**
- AC1: Settings are grouped by category
- AC2: Current values are displayed
- AC3: Sensitive values are masked
- AC4: Search functionality is available
- AC5: Uses Angular Material Expansion Panel and List components

#### REQ-SYS-FE-022: Configuration Editing [Phase 5]
The system SHALL allow editing configuration values.

**Acceptance Criteria:**
- AC1: Inline editing for simple values
- AC2: Dialog editor for complex values
- AC3: Data type validation is enforced
- AC4: Changes require confirmation
- AC5: Uses Angular Material Form Field and Dialog components

#### REQ-SYS-FE-023: Configuration Validation [Phase 5]
The system SHALL validate configuration changes.

**Acceptance Criteria:**
- AC1: Format validation before save
- AC2: Range validation for numeric values
- AC3: Required fields are enforced
- AC4: Validation errors are clearly displayed
- AC5: Uses Angular Material Error component

#### REQ-SYS-FE-024: Configuration History [Phase 5]
The system SHALL display configuration change history.

**Acceptance Criteria:**
- AC1: Change history is accessible per setting
- AC2: Timestamp and user are displayed
- AC3: Previous values are shown
- AC4: Rollback option is available
- AC5: Uses Angular Material Timeline or List component

### 2.7 State Management

#### REQ-SYS-FE-025: RxJS State Management [Phase 5]
The system SHALL use RxJS for state management.

**Acceptance Criteria:**
- AC1: BehaviorSubjects hold component state
- AC2: Observable streams for async data
- AC3: Subscriptions are properly unsubscribed
- AC4: State changes trigger UI updates
- AC5: No NgRx or Signals are used

#### REQ-SYS-FE-026: Real-Time Updates [Phase 5]
The system SHALL implement real-time data updates.

**Acceptance Criteria:**
- AC1: Polling interval is configurable
- AC2: WebSocket connection for critical updates (optional)
- AC3: Auto-refresh can be enabled/disabled
- AC4: Last update timestamp is displayed
- AC5: Uses RxJS interval and switchMap operators

#### REQ-SYS-FE-027: Error Handling [Phase 5]
The system SHALL handle errors gracefully.

**Acceptance Criteria:**
- AC1: HTTP errors are caught and displayed
- AC2: Retry logic for transient failures
- AC3: User-friendly error messages
- AC4: Error state is managed in RxJS streams
- AC5: Uses RxJS catchError and retry operators

### 2.8 UI Components

#### REQ-SYS-FE-028: Material Design 3 Compliance [Phase 5]
The system SHALL strictly follow Material Design 3 guidelines.

**Acceptance Criteria:**
- AC1: Only Angular Material 3 components used
- AC2: Default Material theme colors only
- AC3: Material elevation and spacing
- AC4: Material typography scale
- AC5: No custom colors outside Material palette

#### REQ-SYS-FE-029: Responsive Layout [Phase 5]
The system SHALL be fully responsive.

**Acceptance Criteria:**
- AC1: Mobile-first design approach
- AC2: Breakpoints for tablet and desktop
- AC3: Responsive grid layout
- AC4: Mobile-optimized navigation
- AC5: Uses Angular Material Grid List and Layout module

#### REQ-SYS-FE-030: Accessibility [Phase 5]
The system SHALL meet accessibility standards.

**Acceptance Criteria:**
- AC1: ARIA labels on interactive elements
- AC2: Keyboard navigation support
- AC3: Screen reader compatibility
- AC4: Sufficient color contrast
- AC5: Focus indicators visible

---

## 3. Component Structure

### 3.1 Pages

| Page | Route | Description |
|------|-------|-------------|
| SystemDashboard | /admin/system | Main dashboard overview |
| HealthMonitoring | /admin/system/health | Health check details |
| AuditLogs | /admin/system/audit | Audit log viewer |
| CacheManagement | /admin/system/cache | Cache management |
| BackgroundJobs | /admin/system/jobs | Job monitoring |
| FeatureFlags | /admin/system/features | Feature flag management |
| SystemConfiguration | /admin/system/config | Configuration management |

### 3.2 Reusable Components

| Component | Purpose |
|-----------|---------|
| HealthStatusCard | Display individual health check |
| MetricsChart | Time-series chart for metrics |
| AuditLogTable | Searchable audit log table |
| CacheStatsPie | Cache hit/miss pie chart |
| JobStatusBadge | Job status indicator |
| FeatureFlagToggle | Feature flag switch |
| ConfigEditor | Configuration value editor |

---

## 4. Services

### 4.1 Data Services

| Service | Purpose |
|---------|---------|
| HealthService | Fetch health check data |
| AuditLogService | Query audit logs |
| CacheService | Manage cache operations |
| JobService | Manage background jobs |
| FeatureFlagService | Manage feature flags |
| ConfigurationService | Manage configuration |

### 4.2 State Services

| Service | Purpose |
|---------|---------|
| SystemStateService | Global system state |
| RefreshService | Auto-refresh coordination |
| NotificationService | Alert notifications |

---

## 5. API Integration

### 5.1 Base URL Configuration
Per REQ-FE-026, the frontend SHALL use `baseUrl` without `/api` path. Services append full path:

```typescript
// Configuration
baseUrl = "http://localhost:3200"

// Service usage
this.http.get(`${baseUrl}/api/health`)
```

### 5.2 HTTP Interceptors

| Interceptor | Purpose |
|-------------|---------|
| AuthInterceptor | Add JWT token to requests |
| ErrorInterceptor | Handle HTTP errors globally |
| LoadingInterceptor | Show loading indicators |

---

## 6. Testing

### 6.1 Unit Tests
- Jest for component and service testing
- Mock HTTP responses
- Test RxJS streams
- Minimum 80% code coverage

### 6.2 E2E Tests
- Playwright for end-to-end testing
- Test critical admin workflows
- Located in `src/CoursesPlatform.WebApp/projects/CoursesPlatform-admin/src/e2e`

---

## 7. UI/UX Requirements

### 7.1 Color Scheme
Use Angular Material default theme colors only (no custom colors).

### 7.2 Typography
Use Material typography scale for all text elements.

### 7.3 Spacing
Use design tokens for consistent spacing throughout.

### 7.4 Loading States
- Skeleton loaders for initial page load
- Progress bars for operations
- Spinners for inline actions

### 7.5 Empty States
- Clear messaging when no data
- Helpful actions to get started
- Illustrations (optional, Material icons preferred)

---

## 8. Performance Requirements

- Initial page load < 2 seconds
- Health dashboard updates without flicker
- Smooth scrolling in large tables
- Debounced search inputs
- Virtual scrolling for 1000+ items
- Lazy loading for charts and heavy components

---

## 9. Security Requirements

- Admin-only access to all infrastructure pages
- Role-based permissions enforced
- Sensitive configuration values masked
- Audit trail for all admin actions
- Session timeout after inactivity
- CSRF protection on all mutations

---

## 10. Implementation Notes

### 10.1 File Structure
Per frontend requirements:
- Pages in `pages` folder
- Reusable components in `components` folder
- Services in `services` folder
- No "Component" suffix in class names
- No "component" in file names
- Barrel exports (index.ts) in every folder

### 10.2 BEM Naming
Use BEM (Block Element Modifier) for CSS classes:
```html
<div class="health-card">
  <div class="health-card__header">
    <span class="health-card__status health-card__status--healthy"></span>
  </div>
</div>
```

### 10.3 RxJS Best Practices
- Use async pipe in templates
- Unsubscribe in ngOnDestroy
- Use shareReplay for expensive observables
- Avoid nested subscriptions

---

*Document Version: 1.0*
*Phase Coverage: 5*
