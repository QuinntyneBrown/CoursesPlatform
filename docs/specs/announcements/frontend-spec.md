# Announcements - Frontend Specification

**Feature:** Announcements
**Version:** 1.0
**Last Updated:** December 2024

---

## 1. Overview

The Announcements frontend provides user interfaces for instructors to create, manage, and monitor announcements, and for students to view and track announcements from their enrolled courses.

---

## 2. Requirements

### 2.1 Instructor - Announcement Management

#### REQ-ANN-FE-001: Create Announcement Page [Phase 4]
The application SHALL provide an announcement creation page for instructors.

**Acceptance Criteria:**
- AC1: Page displays form with title, content editor, and target audience selector
- AC2: Rich text editor supports formatting, links, and lists
- AC3: Target audience selector includes options: All Students, Specific Sections, Specific Students
- AC4: Form validates title (required, max 200) and content (required, max 5000)
- AC5: Save as Draft and Publish Now buttons are available
- AC6: Schedule option allows selecting future date/time
- AC7: Success notification on creation

#### REQ-ANN-FE-002: Edit Announcement Page [Phase 4]
The application SHALL provide an announcement editing page for draft announcements.

**Acceptance Criteria:**
- AC1: Page displays existing announcement data
- AC2: All fields are editable for Draft status
- AC3: Published announcements show read-only view
- AC4: Update and Publish buttons are available
- AC5: Success notification on update
- AC6: Cancel button returns to list

#### REQ-ANN-FE-003: Announcements List Page [Phase 4]
The application SHALL provide an announcements list page for instructors.

**Acceptance Criteria:**
- AC1: Page displays table of all announcements for course
- AC2: Each row shows title, status, published date, recipients count, read rate
- AC3: Status badge shows Draft/Scheduled/Published/Archived with colors
- AC4: Actions menu includes Edit, Publish, Schedule, Archive, Delete
- AC5: Filter by status (All, Draft, Scheduled, Published, Archived)
- AC6: Search by title or content
- AC7: Pagination with 20 items per page
- AC8: Create New Announcement button

#### REQ-ANN-FE-004: Announcement Details Page [Phase 4]
The application SHALL provide an announcement details page for instructors.

**Acceptance Criteria:**
- AC1: Page displays full announcement content
- AC2: Engagement metrics section shows total recipients, delivered, viewed, read rate
- AC3: Progress bar visualizes read rate percentage
- AC4: Viewer list shows students who viewed with timestamps
- AC5: Non-viewer list shows students who haven't viewed
- AC6: Delivery status section shows email/push/in-app delivery counts
- AC7: Export viewer list as CSV option

#### REQ-ANN-FE-005: Schedule Announcement Dialog [Phase 4]
The application SHALL provide a scheduling dialog.

**Acceptance Criteria:**
- AC1: Dialog displays date picker and time picker
- AC2: Validation prevents selecting past dates
- AC3: Timezone is displayed
- AC4: Confirmation shows scheduled date/time before saving
- AC5: Success notification on scheduling
- AC6: Dialog closes on success or cancel

#### REQ-ANN-FE-006: Delete Confirmation Dialog [Phase 4]
The application SHALL provide a delete confirmation dialog.

**Acceptance Criteria:**
- AC1: Dialog shows warning about deletion
- AC2: Only available for Draft announcements
- AC3: Confirm and Cancel buttons
- AC4: Success notification on deletion
- AC5: Returns to list after deletion

### 2.2 Student - Announcement Viewing

#### REQ-ANN-FE-007: Announcements Feed Page [Phase 4]
The application SHALL provide an announcements feed page for students.

**Acceptance Criteria:**
- AC1: Page displays list of announcements from enrolled courses
- AC2: Each card shows course name, title, preview, timestamp
- AC3: Unread announcements are highlighted
- AC4: Badge shows course name/code
- AC5: Click to view full announcement
- AC6: Filter by course
- AC7: Pagination with 20 items per page

#### REQ-ANN-FE-008: Announcement View Page [Phase 4]
The application SHALL provide a full announcement view page for students.

**Acceptance Criteria:**
- AC1: Page displays full announcement content
- AC2: Course name and instructor name are shown
- AC3: Published timestamp is displayed
- AC4: Content is rendered with formatting
- AC5: Back to feed button
- AC6: View is tracked automatically on page load
- AC7: Unread badge changes to read on first view

#### REQ-ANN-FE-009: Notification Center [Phase 4]
The application SHALL provide a notification center for announcements.

**Acceptance Criteria:**
- AC1: Icon in header shows unread count badge
- AC2: Dropdown displays recent announcements (last 10)
- AC3: Unread items are highlighted
- AC4: Click on item opens full announcement
- AC5: Mark all as read option
- AC6: View all announcements link
- AC7: Real-time updates when new announcements arrive

#### REQ-ANN-FE-010: Course Announcements Tab [Phase 4]
The application SHALL provide an announcements tab on course page.

**Acceptance Criteria:**
- AC1: Tab displays announcements for current course only
- AC2: List shows title, preview, and timestamp
- AC3: Click to view full announcement
- AC4: Instructor sees Create Announcement button
- AC5: Students see read-only list
- AC6: Empty state shows helpful message

### 2.3 Delivery Preferences

#### REQ-ANN-FE-011: Notification Preferences Page [Phase 4]
The application SHALL provide notification preferences management.

**Acceptance Criteria:**
- AC1: Page displays preferences per enrolled course
- AC2: Toggle for email notifications per course
- AC3: Toggle for push notifications per course
- AC4: In-app notifications cannot be disabled
- AC5: Changes save automatically
- AC6: Success notification on save
- AC7: Global toggle for all courses

---

## 3. Component Architecture

### 3.1 Instructor Pages

| Component | Route | Description |
|-----------|-------|-------------|
| AnnouncementListPage | /courses/{id}/announcements | List of announcements |
| CreateAnnouncementPage | /courses/{id}/announcements/new | Create announcement |
| EditAnnouncementPage | /courses/{id}/announcements/{id}/edit | Edit announcement |
| AnnouncementDetailsPage | /courses/{id}/announcements/{id} | View announcement details |

### 3.2 Student Pages

| Component | Route | Description |
|-----------|-------|-------------|
| AnnouncementsFeedPage | /announcements | All announcements feed |
| AnnouncementViewPage | /announcements/{id} | View single announcement |
| NotificationPreferencesPage | /settings/notifications | Manage preferences |

### 3.3 Components

| Component | Description |
|-----------|-------------|
| AnnouncementCard | Announcement preview card |
| AnnouncementList | List of announcements with filters |
| AnnouncementEditor | Rich text editor for content |
| TargetAudienceSelector | Multi-select for recipients |
| ScheduleDialog | Date/time picker for scheduling |
| EngagementMetrics | Metrics visualization |
| ViewersList | List of students who viewed |
| StatusBadge | Colored badge for status |
| NotificationCenter | Dropdown notification panel |
| UnreadBadge | Unread count indicator |

### 3.4 Services

| Service | Description |
|---------|-------------|
| AnnouncementService | Announcement CRUD operations |
| DeliveryService | Delivery preferences management |
| NotificationService | Real-time notification updates |

---

## 4. State Management

Per REQ-FE-009, state management SHALL use RxJS (not NgRx or Signals).

### 4.1 Announcement State

```typescript
interface AnnouncementState {
  announcements: Announcement[];
  currentAnnouncement: Announcement | null;
  unreadCount: number;
  isLoading: boolean;
  error: string | null;
}
```

### 4.2 Notification State

```typescript
interface NotificationState {
  recentAnnouncements: Announcement[];
  unreadCount: number;
  preferences: DeliveryPreference[];
}
```

---

## 5. UI/UX Requirements

### 5.1 Design System

Per REQ-FE-006 and REQ-FE-010, the application SHALL use Angular Material with Material 3 guidelines and default theme colors.

### 5.2 Status Colors

| Status | Color | Material Token |
|--------|-------|----------------|
| Draft | Grey | mat-gray-500 |
| Scheduled | Blue | mat-blue-500 |
| Published | Green | mat-green-500 |
| Archived | Orange | mat-orange-500 |

### 5.3 Responsive Design

Per REQ-FE-018, all pages SHALL be responsive and follow mobile-first design:
- Mobile: Single column, stacked cards
- Tablet: Two column grid for list views
- Desktop: Full table view with sidebar

### 5.4 Rich Text Editor

- Support bold, italic, underline, strikethrough
- Support bullet and numbered lists
- Support hyperlinks
- Toolbar with formatting options
- Character count indicator
- Preview mode

### 5.5 Accessibility

- All forms MUST have proper labels
- Status badges MUST have ARIA labels
- Notification count MUST be announced to screen readers
- Keyboard navigation for announcement list
- Focus management in dialogs

### 5.6 Component Naming

Per REQ-FE-012 and REQ-FE-013:
- Class names SHALL NOT have "Component" suffix
- File names SHALL NOT have "component" prefix

---

## 6. Form Validation

### 6.1 Title Validation
- Required
- Maximum 200 characters
- No HTML tags allowed

### 6.2 Content Validation
- Required
- Maximum 5000 characters
- HTML sanitization applied

### 6.3 Schedule Date Validation
- Required when scheduling
- Must be future date/time
- Must be within 1 year from now

---

## 7. Error Handling

### 7.1 API Errors

| Error Code | User Message |
|------------|--------------|
| 400 | Invalid announcement data. Please check your input. |
| 403 | You don't have permission to manage announcements. |
| 404 | Announcement not found. |
| 409 | Cannot modify published announcement. |
| 500 | Failed to save announcement. Please try again. |

### 7.2 Validation Errors

- Display inline below the field
- Use red color for error state
- Clear error when field is corrected

---

## 8. Real-Time Updates

### 8.1 WebSocket Integration

- Connect to notification WebSocket on app start
- Subscribe to announcement updates for enrolled courses
- Update unread count in real-time
- Show toast notification for new announcements
- Auto-refresh feed when new announcement arrives

### 8.2 Polling Fallback

- Poll for updates every 60 seconds if WebSocket fails
- Check unread count endpoint
- Update UI when count changes

---

## 9. Performance Optimizations

### 9.1 Lazy Loading

- Announcements feed loads 20 items at a time
- Infinite scroll for feed page
- Virtual scrolling for long lists

### 9.2 Caching

- Cache announcement list for 5 minutes
- Cache individual announcements for 10 minutes
- Invalidate cache on create/update/delete

---

## 10. Testing Requirements

### 10.1 Unit Tests (Jest)

Per REQ-FE-021, unit tests SHALL use Jest:
- Test all form validations
- Test state management
- Test service API calls with mocks
- Test component rendering
- Minimum 80% code coverage

### 10.2 E2E Tests (Playwright)

Per REQ-FE-022, E2E tests SHALL use Playwright:
- Test create announcement flow (instructor)
- Test publish announcement flow (instructor)
- Test view announcement flow (student)
- Test notification center interactions
- Test delivery preferences update

---

## 11. Implementation Notes

### 11.1 API Base URL

Per REQ-FE-026, the baseUrl configuration SHALL contain ONLY the base URI:
```typescript
// Correct
baseUrl = "http://localhost:7200"
this.http.get(`${baseUrl}/api/courses/${courseId}/announcements`)

// Incorrect
baseUrl = "http://localhost:7200/api"
```

### 11.2 File Structure

Per REQ-FE-015 and REQ-FE-016:
- Pages in `pages/` folder
- Reusable components in `components/` folder
- Barrel exports in each folder

---

*Document Version: 1.0*
*Phase Coverage: 4*
