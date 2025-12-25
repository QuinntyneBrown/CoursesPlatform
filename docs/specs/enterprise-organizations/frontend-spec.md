# Enterprise Organizations - Frontend Specification

**Feature:** Enterprise Organizations
**Version:** 1.0
**Last Updated:** December 2024

---

## 1. Overview

The Enterprise Organizations frontend provides comprehensive user interfaces for managing enterprise organizations, teams, licenses, billing, SSO configuration, and analytics dashboards.

---

## 2. Requirements

### 2.1 Organization Dashboard

#### REQ-ENT-FE-001: Organization Overview Dashboard [Phase 5]
The application SHALL provide a comprehensive organization dashboard.

**Acceptance Criteria:**
- AC1: Dashboard displays organization metrics (total members, active licenses, teams)
- AC2: Quick stats cards show enrollments, completions, and engagement rates
- AC3: Recent activity feed displays latest member actions
- AC4: License utilization chart shows allocated vs available licenses
- AC5: Responsive layout adapts to mobile, tablet, and desktop
- AC6: Real-time updates every 15 minutes using RxJS polling

#### REQ-ENT-FE-002: Organization Settings Page [Phase 5]
The application SHALL provide organization settings management.

**Acceptance Criteria:**
- AC1: Form allows editing organization name, description, industry, and size
- AC2: Domain management section shows verified domains
- AC3: Branding section allows logo upload and color customization
- AC4: Form validation with inline error messages
- AC5: Success notification on save
- AC6: Unsaved changes warning when navigating away

### 2.2 Team Management

#### REQ-ENT-FE-003: Team List Page [Phase 5]
The application SHALL display all organization teams.

**Acceptance Criteria:**
- AC1: Tree view shows team hierarchy with expand/collapse
- AC2: Search and filter teams by name or manager
- AC3: Each team card shows member count and description
- AC4: Create team button opens creation dialog
- AC5: Pagination for large team lists (50 per page)
- AC6: Sorting by name, created date, or member count

#### REQ-ENT-FE-004: Team Details Page [Phase 5]
The application SHALL provide detailed team view and management.

**Acceptance Criteria:**
- AC1: Page shows team information and member list
- AC2: Add members button opens member selection dialog
- AC3: Remove member action with confirmation dialog
- AC4: Assign courses section shows team-assigned courses
- AC5: Team performance metrics displayed in charts
- AC6: Breadcrumb navigation shows team hierarchy

#### REQ-ENT-FE-005: Create/Edit Team Dialog [Phase 5]
The application SHALL provide team creation and editing interface.

**Acceptance Criteria:**
- AC1: Modal dialog with form for team name and description
- AC2: Parent team selector with hierarchical dropdown
- AC3: Form validation for required fields
- AC4: Real-time name availability check
- AC5: Success message after creation
- AC6: Form reset on cancel

### 2.3 Member Management

#### REQ-ENT-FE-006: Member List Page [Phase 5]
The application SHALL display all organization members.

**Acceptance Criteria:**
- AC1: Data table with columns for name, email, teams, role, status
- AC2: Search members by name or email
- AC3: Filter by team, role, or status
- AC4: Bulk actions (invite, deactivate, assign role)
- AC5: Pagination with configurable page size
- AC6: Export member list to CSV

#### REQ-ENT-FE-007: Invite Members Dialog [Phase 5]
The application SHALL provide member invitation interface.

**Acceptance Criteria:**
- AC1: Modal with email input (comma-separated or textarea)
- AC2: CSV file upload for bulk invitations
- AC3: Pre-assign teams via multi-select dropdown
- AC4: Pre-assign role via dropdown
- AC5: Email validation with error highlighting
- AC6: Progress indicator during bulk processing

#### REQ-ENT-FE-008: Member Details Page [Phase 5]
The application SHALL provide detailed member view.

**Acceptance Criteria:**
- AC1: Page shows member profile, teams, and assigned courses
- AC2: Learning progress section with completion metrics
- AC3: Activity timeline shows recent actions
- AC4: Edit role button opens role assignment dialog
- AC5: Transfer member button opens team selection dialog
- AC6: Deactivate member button with confirmation

### 2.4 License Management

#### REQ-ENT-FE-009: License Dashboard [Phase 5]
The application SHALL provide license overview dashboard.

**Acceptance Criteria:**
- AC1: Cards show total, allocated, and available licenses per course
- AC2: Utilization chart displays allocation trends over time
- AC3: Expiring licenses section highlights upcoming expirations
- AC4: Purchase licenses button opens purchase dialog
- AC5: Filters by course, status, or expiration date
- AC6: Export license data to Excel

#### REQ-ENT-FE-010: Purchase Licenses Dialog [Phase 5]
The application SHALL provide license purchase interface.

**Acceptance Criteria:**
- AC1: Modal with course selector and quantity input
- AC2: Price calculation displayed in real-time
- AC3: Expiration date picker for license duration
- AC4: Payment method selection
- AC5: Terms and conditions checkbox
- AC6: Confirmation summary before purchase

#### REQ-ENT-FE-011: Allocate Licenses Page [Phase 5]
The application SHALL provide license allocation interface.

**Acceptance Criteria:**
- AC1: Split view with available licenses and member list
- AC2: Drag-and-drop license to member for allocation
- AC3: Bulk allocation with member selection checkboxes
- AC4: Available license count updates in real-time
- AC5: Success notification per allocation
- AC6: Undo allocation within same session

#### REQ-ENT-FE-012: License History Page [Phase 5]
The application SHALL display license allocation history.

**Acceptance Criteria:**
- AC1: Timeline view shows all license allocations and revocations
- AC2: Filter by course, member, or date range
- AC3: Search by member name or email
- AC4: Expandable rows show allocation details
- AC5: Export history to PDF or Excel
- AC6: Audit trail shows who allocated/revoked

### 2.5 Billing Management

#### REQ-ENT-FE-013: Billing Dashboard [Phase 5]
The application SHALL provide billing overview dashboard.

**Acceptance Criteria:**
- AC1: Current billing period summary with total charges
- AC2: Payment status indicators (paid, pending, overdue)
- AC3: Spending chart shows costs over time
- AC4: Cost breakdown by course and team
- AC5: Quick actions for payment and invoice download
- AC6: Budget alerts displayed prominently

#### REQ-ENT-FE-014: Billing Profile Page [Phase 5]
The application SHALL provide billing profile management.

**Acceptance Criteria:**
- AC1: Form for billing contact, address, and tax information
- AC2: Payment methods section with add/remove options
- AC3: Tax ID validation by region
- AC4: PO number field for purchase order billing
- AC5: Auto-save on field blur
- AC6: Success notification on save

#### REQ-ENT-FE-015: Invoices Page [Phase 5]
The application SHALL display invoice history.

**Acceptance Criteria:**
- AC1: Table shows invoice number, date, amount, status
- AC2: Download PDF button per invoice
- AC3: View invoice detail in modal
- AC4: Filter by date range or status
- AC5: Search by invoice number
- AC6: Payment action for unpaid invoices

#### REQ-ENT-FE-016: Payment Processing Page [Phase 5]
The application SHALL provide payment interface.

**Acceptance Criteria:**
- AC1: Invoice selection with amount display
- AC2: Payment method selection (card, ACH, PO)
- AC3: Card payment form with validation
- AC4: PO upload for purchase order payments
- AC5: Processing indicator during payment
- AC6: Success/failure message with next steps

### 2.6 SSO Configuration

#### REQ-ENT-FE-017: SSO Settings Page [Phase 5]
The application SHALL provide SSO configuration interface.

**Acceptance Criteria:**
- AC1: SSO status toggle (enabled/disabled)
- AC2: IdP selection dropdown (SAML, OAuth, OIDC)
- AC3: Metadata XML upload for SAML configuration
- AC4: Manual field entry option for SSO parameters
- AC5: Test connection button with result display
- AC6: SP metadata download for IdP configuration

#### REQ-ENT-FE-018: SSO User Provisioning Settings [Phase 5]
The application SHALL provide user provisioning configuration.

**Acceptance Criteria:**
- AC1: Just-in-time provisioning toggle
- AC2: Attribute mapping table (IdP to platform fields)
- AC3: Group-to-team mapping interface
- AC4: Default role assignment dropdown
- AC5: Preview provisioning with sample data
- AC6: Validation of required attribute mappings

#### REQ-ENT-FE-019: SSO Audit Log [Phase 5]
The application SHALL display SSO authentication logs.

**Acceptance Criteria:**
- AC1: Table shows timestamp, user, IdP, result
- AC2: Failed attempts highlighted in red
- AC3: Filter by date range, user, or result
- AC4: Expandable rows show detailed SAML response
- AC5: Export logs to CSV
- AC6: Real-time updates for new login attempts

### 2.7 Reporting & Analytics

#### REQ-ENT-FE-020: Analytics Dashboard [Phase 5]
The application SHALL provide comprehensive analytics dashboard.

**Acceptance Criteria:**
- AC1: Charts show enrollment, completion, and engagement trends
- AC2: Date range selector with presets (7d, 30d, 90d, 1y)
- AC3: Segmentation by team, course, or member
- AC4: Drill-down capability from charts to detailed data
- AC5: Export dashboard as PDF or PowerPoint
- AC6: Refresh data button with loading indicator

#### REQ-ENT-FE-021: Member Activity Reports [Phase 5]
The application SHALL provide member activity reporting.

**Acceptance Criteria:**
- AC1: Table shows member login frequency and course activity
- AC2: Inactive members filter (no activity in 30 days)
- AC3: Time spent calculation per member
- AC4: Sort by activity level, name, or last login
- AC5: Schedule report delivery via email
- AC6: Export to Excel or CSV

#### REQ-ENT-FE-022: Team Performance Reports [Phase 5]
The application SHALL provide team performance analytics.

**Acceptance Criteria:**
- AC1: Comparison chart of team completion rates
- AC2: Average scores by team displayed in bar chart
- AC3: Identify top and bottom performing teams
- AC4: Drill down to individual team members
- AC5: Export report to PDF
- AC6: Share report link with other admins

#### REQ-ENT-FE-023: Compliance Reports [Phase 5]
The application SHALL provide compliance tracking interface.

**Acceptance Criteria:**
- AC1: Table shows mandatory course compliance status
- AC2: Expiring certifications highlighted with warning icon
- AC3: Filter by course, team, or compliance status
- AC4: Export compliance data for audit
- AC5: Automated notification setup for managers
- AC6: Compliance percentage by team displayed

#### REQ-ENT-FE-024: Custom Report Builder [Phase 5]
The application SHALL provide custom report creation interface.

**Acceptance Criteria:**
- AC1: Drag-and-drop interface for metrics and dimensions
- AC2: Chart type selector (bar, line, pie, table)
- AC3: Filter builder with conditional logic
- AC4: Save report template with name
- AC5: Preview report before saving
- AC6: Share saved reports with other admins

---

## 3. Component Architecture

### 3.1 Pages

| Component | Route | Description |
|-----------|-------|-------------|
| OrganizationDashboard | /org/dashboard | Organization overview |
| OrganizationSettings | /org/settings | Organization configuration |
| TeamList | /org/teams | All teams list |
| TeamDetails | /org/teams/:id | Team detail view |
| MemberList | /org/members | All members list |
| MemberDetails | /org/members/:id | Member detail view |
| LicenseDashboard | /org/licenses | License overview |
| LicenseAllocation | /org/licenses/allocate | Allocate licenses |
| LicenseHistory | /org/licenses/history | Allocation history |
| BillingDashboard | /org/billing | Billing overview |
| BillingProfile | /org/billing/profile | Billing settings |
| Invoices | /org/billing/invoices | Invoice list |
| SSOSettings | /org/sso | SSO configuration |
| SSOAuditLog | /org/sso/audit | SSO logs |
| AnalyticsDashboard | /org/analytics | Analytics overview |
| MemberActivityReport | /org/reports/members | Member activity |
| TeamPerformanceReport | /org/reports/teams | Team performance |
| ComplianceReport | /org/reports/compliance | Compliance tracking |
| CustomReportBuilder | /org/reports/custom | Custom reports |

### 3.2 Components

| Component | Description |
|-----------|-------------|
| OrganizationHeader | Organization context header |
| MetricCard | Dashboard metric display |
| TeamTree | Hierarchical team tree view |
| MemberTable | Member data table |
| LicensePoolCard | License pool status card |
| InvoiceCard | Invoice summary card |
| ChartContainer | Reusable chart wrapper |
| DateRangeSelector | Date range picker |
| TeamSelector | Team selection dropdown |
| MemberSelector | Member multi-select |
| LicenseAllocator | License allocation interface |
| BrandingUpload | Logo and color picker |
| SSOMetadataUpload | SAML metadata uploader |
| AttributeMapper | SSO attribute mapping table |
| ReportFilters | Report filter panel |
| ExportButton | Report export actions |

### 3.3 Services

| Service | Description |
|---------|-------------|
| OrganizationService | Organization API calls |
| TeamService | Team management API calls |
| MemberService | Member management API calls |
| LicenseService | License API calls |
| BillingService | Billing API calls |
| SSOService | SSO configuration API calls |
| ReportService | Reporting API calls |
| AnalyticsService | Analytics data API calls |

---

## 4. State Management

Per REQ-FE-009, state management SHALL use RxJS (not NgRx or Signals).

### 4.1 Organization State

```typescript
interface OrganizationState {
  current: Organization | null;
  members: OrganizationMember[];
  teams: Team[];
  isLoading: boolean;
  error: string | null;
}
```

### 4.2 License State

```typescript
interface LicenseState {
  pools: LicensePool[];
  allocations: LicenseAllocation[];
  available: number;
  isLoading: boolean;
}
```

### 4.3 Billing State

```typescript
interface BillingState {
  profile: BillingProfile | null;
  invoices: Invoice[];
  payments: Payment[];
  currentCharges: number;
  isLoading: boolean;
}
```

### 4.4 Analytics State

```typescript
interface AnalyticsState {
  metrics: AnalyticsMetrics | null;
  dateRange: DateRange;
  selectedTeam: string | null;
  isLoading: boolean;
}
```

---

## 5. UI/UX Requirements

### 5.1 Design System

Per REQ-FE-006 and REQ-FE-010, the application SHALL use Angular Material 3 with default theme colors:

**Components to use:**
- MatCard for metric cards and containers
- MatTable for data tables
- MatDialog for modals and confirmations
- MatButton for actions
- MatFormField for form inputs
- MatSelect for dropdowns
- MatChip for tags and status indicators
- MatDatepicker for date selection
- MatPaginator for table pagination
- MatSort for sortable columns
- MatTree for team hierarchy
- MatTabs for tabbed interfaces
- MatProgressBar for loading states
- MatSnackBar for notifications
- MatBadge for counts and alerts
- MatIcon for icons throughout

### 5.2 Responsive Design

Per REQ-FE-018, all pages SHALL be responsive and follow mobile-first design:

**Mobile (320px-767px):**
- Single column layout
- Stacked metric cards
- Simplified tables with horizontal scroll
- Hamburger menu for navigation
- Bottom sheet for dialogs

**Tablet (768px-1023px):**
- Two column grid for cards
- Full tables with pagination
- Side navigation panel
- Modal dialogs

**Desktop (1024px+):**
- Three or four column grid
- Wide tables with all columns
- Persistent side navigation
- Large modal dialogs
- Split view for allocation interfaces

### 5.3 Accessibility

- All forms MUST have proper ARIA labels
- Error messages MUST be announced to screen readers
- Keyboard navigation for all interactive elements
- Focus indicators on all focusable elements
- Color contrast MUST meet WCAG AA standards
- Alternative text for all charts and visualizations

### 5.4 Component Naming

Per REQ-FE-012 and REQ-FE-013:
- Class names SHALL NOT have "Component" suffix
- File names SHALL NOT have "component" prefix

Example:
```typescript
// Correct
export class OrganizationDashboard { }

// Files:
// organization-dashboard.ts
// organization-dashboard.html
// organization-dashboard.scss
```

---

## 6. Form Validation

### 6.1 Organization Name
- Required
- Minimum 2 characters
- Maximum 200 characters
- Unique within tenant

### 6.2 Email Validation
- Required for member invitations
- Valid email format
- Maximum 256 characters
- Unique check against existing members

### 6.3 Domain Validation
- Valid domain format (e.g., company.com)
- DNS TXT record verification
- No www prefix

### 6.4 License Quantity
- Required
- Minimum 1
- Maximum 10,000 per purchase
- Integer only

### 6.5 Tax ID Validation
- Required for enterprise billing
- Format validation by region (US EIN, EU VAT, etc.)
- Checksum validation where applicable

---

## 7. Error Handling

### 7.1 API Errors

| Error Code | User Message |
|------------|--------------|
| 400 | Invalid request. Please check your input. |
| 401 | Authentication required. Please log in. |
| 403 | Access denied. Insufficient permissions. |
| 404 | Resource not found. |
| 409 | Conflict. Name already exists. |
| 422 | Validation failed. Please correct errors. |
| 429 | Too many requests. Please wait. |
| 500 | Something went wrong. Please try again. |

### 7.2 Validation Errors

- Display inline below the field using mat-error
- Use red color (Material theme error color)
- Clear error when field is corrected
- Show all errors simultaneously, not just first

### 7.3 Network Errors

- Display retry option for failed requests
- Show offline indicator when network unavailable
- Queue actions when offline (if applicable)
- Resume on reconnection

---

## 8. Charts and Visualizations

### 8.1 Chart Library

Use Chart.js or similar compatible with Angular Material:
- Line charts for trends over time
- Bar charts for comparisons
- Pie charts for distributions
- Donut charts for proportions
- Stacked bar charts for segmented data

### 8.2 Chart Requirements

- Responsive sizing
- Tooltips on hover
- Legend with toggle
- Export to image
- Accessibility labels
- Material theme colors

---

## 9. Testing Requirements

### 9.1 Unit Tests (Jest)

Per REQ-FE-021, unit tests SHALL use Jest:
- Test all form validations
- Test state management observables
- Test service API calls with HTTP mocks
- Test component logic and calculations
- Minimum 80% code coverage

### 9.2 E2E Tests (Playwright)

Per REQ-FE-022, E2E tests SHALL use Playwright:
- Test organization creation flow
- Test team creation and member assignment
- Test license allocation flow
- Test invoice viewing and payment
- Test SSO configuration
- Test report generation and export

---

## 10. Implementation Notes

### 10.1 API Base URL

Per REQ-FE-026, the baseUrl configuration SHALL contain ONLY the base URI:
```typescript
// Correct
baseUrl = "http://localhost:7200"
this.http.get(`${baseUrl}/api/organizations`)

// Incorrect
baseUrl = "http://localhost:7200/api"
```

### 10.2 File Structure

Per REQ-FE-015 and REQ-FE-016:
- Pages in `pages/` folder
- Reusable components in `components/` folder
- Barrel exports (index.ts) in each folder

Example structure:
```
src/
  pages/
    organization-dashboard/
      organization-dashboard.ts
      organization-dashboard.html
      organization-dashboard.scss
    index.ts
  components/
    metric-card/
      metric-card.ts
      metric-card.html
      metric-card.scss
    index.ts
  services/
    organization.service.ts
    index.ts
```

### 10.3 RxJS State Management Pattern

```typescript
export class OrganizationService {
  private organizationSubject = new BehaviorSubject<Organization | null>(null);
  public organization$ = this.organizationSubject.asObservable();

  loadOrganization(id: string): Observable<Organization> {
    return this.http.get<Organization>(`${baseUrl}/api/organizations/${id}`)
      .pipe(
        tap(org => this.organizationSubject.next(org)),
        catchError(this.handleError)
      );
  }
}
```

### 10.4 Real-time Updates

Use RxJS interval for polling:
```typescript
interval(900000) // 15 minutes
  .pipe(
    switchMap(() => this.analyticsService.loadMetrics())
  )
  .subscribe(metrics => this.metrics = metrics);
```

---

*Document Version: 1.0*
*Phase Coverage: Phase 5 (Enterprise)*
