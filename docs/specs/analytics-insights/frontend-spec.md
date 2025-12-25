# Analytics & Insights - Frontend Specification

**Feature:** Analytics & Insights
**Version:** 1.0
**Last Updated:** December 2024

---

## 1. Overview

The Analytics & Insights frontend provides interactive dashboards, charts, and reporting interfaces for viewing course, student, instructor, and platform analytics.

---

## 2. Requirements

### 2.1 Course Analytics Dashboard

#### REQ-ANL-FE-001: Course Analytics Overview [Phase 4]
The application SHALL provide a comprehensive course analytics dashboard.

**Acceptance Criteria:**
- AC1: Dashboard displays key metrics (enrollments, completion rate, revenue, ratings)
- AC2: Metrics are displayed as cards with trend indicators
- AC3: Time range selector (7 days, 30 days, 90 days, 1 year, custom)
- AC4: Dashboard auto-refreshes every 5 minutes
- AC5: Loading states shown during data fetch
- AC6: Error states with retry option

#### REQ-ANL-FE-002: Course Enrollment Charts [Phase 4]
The application SHALL display course enrollment visualizations.

**Acceptance Criteria:**
- AC1: Line chart shows enrollment trend over time
- AC2: Bar chart shows enrollments by source (organic, paid, referral)
- AC3: Pie chart shows enrollment by geography
- AC4: Charts are interactive with tooltips
- AC5: Data points are clickable for drill-down
- AC6: Charts export to PNG/SVG

#### REQ-ANL-FE-003: Course Completion Analytics [Phase 4]
The application SHALL display course completion visualizations.

**Acceptance Criteria:**
- AC1: Completion funnel shows drop-off at each lesson
- AC2: Line chart shows completion rate over time
- AC3: Table lists lessons with highest drop-off
- AC4: Heat map shows completion by time of day
- AC5: Completion time distribution histogram
- AC6: Student cohort comparison

#### REQ-ANL-FE-004: Course Revenue Dashboard [Phase 4]
The application SHALL display course revenue analytics.

**Acceptance Criteria:**
- AC1: Revenue metrics with growth indicators
- AC2: Line chart shows revenue trend
- AC3: Bar chart shows revenue by pricing tier
- AC4: Table shows top revenue days
- AC5: Refund impact analysis
- AC6: Revenue forecasting chart

#### REQ-ANL-FE-005: Course Engagement Metrics [Phase 4]
The application SHALL display course engagement analytics.

**Acceptance Criteria:**
- AC1: Average video watch time per lesson
- AC2: Quiz attempt rate and success rate
- AC3: Discussion participation metrics
- AC4: Assignment submission rate
- AC5: Content engagement heat map
- AC6: Student activity timeline

### 2.2 Student Analytics Dashboard

#### REQ-ANL-FE-006: Student Progress Dashboard [Phase 4]
The application SHALL provide a student learning progress dashboard.

**Acceptance Criteria:**
- AC1: Progress percentage for each enrolled course
- AC2: Learning streak and consistency metrics
- AC3: Upcoming milestones and deadlines
- AC4: Progress comparison to cohort average
- AC5: Estimated time to completion
- AC6: Personalized recommendations

#### REQ-ANL-FE-007: Student Performance Metrics [Phase 4]
The application SHALL display student performance analytics.

**Acceptance Criteria:**
- AC1: Quiz scores with trend line
- AC2: Assignment grades distribution
- AC3: Skills mastery radar chart
- AC4: Certificates and achievements showcase
- AC5: Performance badges
- AC6: Areas for improvement highlights

#### REQ-ANL-FE-008: Student Engagement Analytics [Phase 4]
The application SHALL display student engagement metrics.

**Acceptance Criteria:**
- AC1: Daily/weekly active learning time
- AC2: Login frequency and patterns
- AC3: Feature usage breakdown
- AC4: Content interaction heat map
- AC5: Engagement score with trend
- AC6: Activity calendar view

### 2.3 Instructor Analytics Dashboard

#### REQ-ANL-FE-009: Instructor Overview Dashboard [Phase 4]
The application SHALL provide an instructor analytics overview.

**Acceptance Criteria:**
- AC1: Total students taught metric
- AC2: Average course rating across all courses
- AC3: Total revenue and earnings
- AC4: Active enrollments count
- AC5: Recent activity feed
- AC6: Quick actions panel

#### REQ-ANL-FE-010: Instructor Performance Metrics [Phase 4]
The application SHALL display instructor performance analytics.

**Acceptance Criteria:**
- AC1: Course ratings comparison chart
- AC2: Student completion rates per course
- AC3: Average Q&A response time
- AC4: Student satisfaction score
- AC5: Performance trends over time
- AC6: Benchmarking against category average

#### REQ-ANL-FE-011: Instructor Revenue Dashboard [Phase 4]
The application SHALL display instructor revenue analytics.

**Acceptance Criteria:**
- AC1: Total earnings with payout schedule
- AC2: Revenue breakdown by course
- AC3: Monthly revenue trend chart
- AC4: Revenue per student metric
- AC5: Earnings projections
- AC6: Payout history table

#### REQ-ANL-FE-012: Instructor Student Analytics [Phase 4]
The application SHALL display instructor's student analytics.

**Acceptance Criteria:**
- AC1: Student enrollment growth chart
- AC2: Geographic distribution map
- AC3: Student retention metrics
- AC4: Top performing students list
- AC5: At-risk students identification
- AC6: Student demographics breakdown

### 2.4 Platform Analytics Dashboard

#### REQ-ANL-FE-013: Platform Usage Dashboard [Phase 4]
The application SHALL provide platform usage analytics (admin only).

**Acceptance Criteria:**
- AC1: Daily/monthly active users trend
- AC2: User registration growth chart
- AC3: User retention cohort analysis
- AC4: Geographic distribution map
- AC5: Device and browser breakdown
- AC6: Peak usage time analysis

#### REQ-ANL-FE-014: Platform Revenue Dashboard [Phase 4]
The application SHALL display platform revenue analytics (admin only).

**Acceptance Criteria:**
- AC1: Total platform revenue metrics
- AC2: Revenue by category breakdown
- AC3: Revenue growth trend chart
- AC4: Top revenue-generating courses
- AC5: Payment method distribution
- AC6: Regional revenue comparison

#### REQ-ANL-FE-015: Platform Content Analytics [Phase 4]
The application SHALL display platform content metrics (admin only).

**Acceptance Criteria:**
- AC1: Total courses published
- AC2: Content creation trend chart
- AC3: Category distribution pie chart
- AC4: Top instructors by course count
- AC5: Content quality metrics
- AC6: Trending topics analysis

### 2.5 Search Analytics Dashboard

#### REQ-ANL-FE-016: Search Analytics Dashboard [Phase 4]
The application SHALL provide search analytics interface (admin only).

**Acceptance Criteria:**
- AC1: Popular search terms word cloud
- AC2: Zero-result searches list
- AC3: Search-to-click conversion rate
- AC4: Search trends over time
- AC5: Filter usage statistics
- AC6: Search performance metrics

### 2.6 Reports & Export

#### REQ-ANL-FE-017: Analytics Data Export [Phase 4]
The application SHALL provide data export functionality.

**Acceptance Criteria:**
- AC1: Export button on each analytics view
- AC2: Format selector (CSV, JSON, Excel)
- AC3: Date range selector for export
- AC4: Export progress indicator
- AC5: Download link when ready
- AC6: Export history tracking

#### REQ-ANL-FE-018: Scheduled Reports Manager [Phase 4]
The application SHALL provide scheduled reports management interface.

**Acceptance Criteria:**
- AC1: List of active scheduled reports
- AC2: Create new scheduled report wizard
- AC3: Report frequency selector (daily, weekly, monthly)
- AC4: Email delivery configuration
- AC5: Report template selection
- AC6: Edit/delete existing schedules

#### REQ-ANL-FE-019: Custom Dashboard Builder [Phase 4]
The application SHALL provide custom dashboard creation interface.

**Acceptance Criteria:**
- AC1: Drag-and-drop widget placement
- AC2: Widget library with preview
- AC3: Grid layout with resize handles
- AC4: Dashboard save and load
- AC5: Dashboard sharing options
- AC6: Dashboard template gallery

### 2.7 Real-time Updates

#### REQ-ANL-FE-020: Real-time Analytics Updates [Phase 4]
The application SHALL support real-time analytics updates.

**Acceptance Criteria:**
- AC1: Critical metrics update without page refresh
- AC2: Live indicator shows real-time status
- AC3: Smooth animations for metric changes
- AC4: Connection status indicator
- AC5: Auto-reconnect on disconnect
- AC6: Fallback to polling if WebSocket unavailable

---

## 3. Component Architecture

### 3.1 Pages

| Component | Route | Description |
|-----------|-------|-------------|
| CourseAnalyticsPage | /analytics/courses/:id | Course analytics dashboard |
| StudentAnalyticsPage | /analytics/students/:id | Student analytics dashboard |
| InstructorAnalyticsPage | /analytics/instructors/:id | Instructor analytics dashboard |
| PlatformAnalyticsPage | /analytics/platform | Platform analytics (admin) |
| SearchAnalyticsPage | /analytics/search | Search analytics (admin) |
| CustomDashboardPage | /analytics/dashboards/:id | Custom dashboard view |
| ReportsManagerPage | /analytics/reports | Scheduled reports manager |

### 3.2 Components

| Component | Description |
|-----------|-------------|
| MetricCard | Displays single metric with trend |
| LineChart | Time-series line chart |
| BarChart | Bar chart for comparisons |
| PieChart | Pie chart for distributions |
| FunnelChart | Conversion funnel visualization |
| HeatMap | Heat map for temporal data |
| DataTable | Sortable, filterable data table |
| TimeRangeSelector | Date range picker |
| ExportButton | Export data button with format selector |
| TrendIndicator | Up/down trend arrow with percentage |
| LoadingChart | Chart skeleton loader |
| DashboardGrid | Drag-and-drop grid layout |
| WidgetLibrary | Widget selection palette |

### 3.3 Chart Library

Per REQ-FE-008, charts SHALL use Chart.js or D3.js for data visualization.

Recommended: Chart.js for standard charts (line, bar, pie) and D3.js for custom visualizations (funnel, heat map).

### 3.4 Services

| Service | Description |
|---------|-------------|
| AnalyticsService | Analytics API calls |
| ExportService | Data export functionality |
| ReportService | Scheduled reports management |
| DashboardService | Custom dashboard CRUD |
| RealtimeAnalyticsService | WebSocket connection for real-time updates |

---

## 4. State Management

Per REQ-FE-009, state management SHALL use RxJS (not NgRx or Signals).

### 4.1 Analytics State

```typescript
interface AnalyticsState {
  courseAnalytics: CourseAnalytics | null;
  studentAnalytics: StudentAnalytics | null;
  instructorAnalytics: InstructorAnalytics | null;
  platformAnalytics: PlatformAnalytics | null;
  timeRange: TimeRange;
  isLoading: boolean;
  error: string | null;
  lastUpdated: Date | null;
}
```

### 4.2 Dashboard State

```typescript
interface DashboardState {
  customDashboards: CustomDashboard[];
  activeDashboard: CustomDashboard | null;
  widgets: Widget[];
  layout: GridLayout;
  isEditing: boolean;
}
```

---

## 5. UI/UX Requirements

### 5.1 Design System

Per REQ-FE-006 and REQ-FE-010, the application SHALL use Angular Material with Material 3 guidelines and default theme colors.

### 5.2 Chart Color Scheme

- Primary: Use Material theme primary color
- Success: Green (#4CAF50)
- Warning: Orange (#FF9800)
- Danger: Red (#F44336)
- Info: Blue (#2196F3)
- Neutral: Gray (#9E9E9E)

### 5.3 Responsive Design

Per REQ-FE-018, all dashboards SHALL be responsive:
- Mobile: Single column, stacked charts
- Tablet: Two column layout
- Desktop: Multi-column grid with drag-and-drop

### 5.4 Accessibility

- All charts MUST have text alternatives
- Data tables MUST be keyboard navigable
- Color MUST not be the only visual indicator
- Screen reader support for metric changes
- High contrast mode support

### 5.5 Component Naming

Per REQ-FE-012 and REQ-FE-013:
- Class names SHALL NOT have "Component" suffix
- File names SHALL NOT have "component" prefix

---

## 6. Data Visualization Best Practices

### 6.1 Chart Selection

- **Line charts**: Trends over time
- **Bar charts**: Comparisons across categories
- **Pie charts**: Part-to-whole relationships (max 6 segments)
- **Funnel charts**: Conversion processes
- **Heat maps**: Temporal patterns
- **Tables**: Detailed data exploration

### 6.2 Chart Interaction

- Tooltips on hover with formatted values
- Click to drill down to detailed view
- Zoom and pan for time-series charts
- Legend toggle to show/hide series
- Export chart as image

### 6.3 Data Formatting

- Numbers: Use thousands separator (1,234,567)
- Percentages: Show to 1 decimal place (85.5%)
- Currency: Show with currency symbol ($1,234.56)
- Dates: Use locale-appropriate format
- Large numbers: Use abbreviations (1.2M, 3.5K)

---

## 7. Performance Optimization

### 7.1 Chart Rendering

- Lazy load charts as they enter viewport
- Use virtual scrolling for large tables
- Debounce chart updates during real-time updates
- Cache chart data for quick navigation
- Show loading skeleton during data fetch

### 7.2 Data Loading

- Paginate large datasets
- Use query parameters for filtering
- Implement progressive loading
- Cache API responses
- Prefetch likely next views

---

## 8. Error Handling

### 8.1 API Errors

| Error Code | User Message |
|------------|--------------|
| 401 | Please log in to view analytics. |
| 403 | You don't have permission to view this data. |
| 404 | Analytics data not found. |
| 429 | Too many requests. Please wait. |
| 500 | Failed to load analytics. Please try again. |

### 8.2 Chart Errors

- Show error state with retry button
- Display empty state for no data
- Show partial data with warning if incomplete
- Graceful degradation if chart library fails

---

## 9. Testing Requirements

### 9.1 Unit Tests (Jest)

Per REQ-FE-021, unit tests SHALL use Jest:
- Test analytics service API calls
- Test data transformations for charts
- Test state management
- Test metric calculations
- Minimum 80% code coverage

### 9.2 E2E Tests (Playwright)

Per REQ-FE-022, E2E tests SHALL use Playwright:
- Test dashboard navigation
- Test time range filtering
- Test data export
- Test custom dashboard creation
- Test real-time updates

---

## 10. Implementation Notes

### 10.1 API Base URL

Per REQ-FE-026, the baseUrl configuration SHALL contain ONLY the base URI:
```typescript
// Correct
baseUrl = "http://localhost:7200"
this.http.get(`${baseUrl}/api/analytics/courses/${courseId}`)

// Incorrect
baseUrl = "http://localhost:7200/api"
```

### 10.2 File Structure

Per REQ-FE-015 and REQ-FE-016:
- Pages in `pages/` folder
- Reusable components in `components/` folder
- Chart components in `components/charts/` folder
- Barrel exports in each folder

### 10.3 Real-time Updates

Use SignalR client for WebSocket connections:
```typescript
import * as signalR from '@microsoft/signalr';

const connection = new signalR.HubConnectionBuilder()
  .withUrl(`${baseUrl}/hubs/analytics`)
  .withAutomaticReconnect()
  .build();
```

---

*Document Version: 1.0*
*Phase Coverage: 4*
