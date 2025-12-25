# Notifications - Frontend Specification

**Feature:** Notifications
**Version:** 1.0
**Last Updated:** December 2024

---

## 1. Overview

The Notifications frontend provides user interfaces for viewing in-app notifications, managing notification preferences, and enabling push notifications.

---

## 2. Requirements

### 2.1 Notification Display

#### REQ-NTF-FE-001: Notification Bell Icon [Phase 4]
The application SHALL display a notification bell icon in the header.

**Acceptance Criteria:**
- AC1: Bell icon shows unread notification count badge
- AC2: Badge displays count up to 99+ for higher numbers
- AC3: Bell icon changes color when unread notifications exist
- AC4: Click opens notification dropdown panel
- AC5: Badge updates in real-time via WebSocket or polling

#### REQ-NTF-FE-002: Notification Dropdown [Phase 4]
The application SHALL display a notification dropdown panel.

**Acceptance Criteria:**
- AC1: Panel shows recent 10 notifications
- AC2: Unread notifications are visually distinct (bold, background color)
- AC3: Each notification shows icon, title, message, timestamp
- AC4: Click on notification navigates to action URL
- AC5: "See All" link navigates to full notifications page
- AC6: "Mark All as Read" button is available

#### REQ-NTF-FE-003: Notifications Page [Phase 4]
The application SHALL provide a notifications page.

**Acceptance Criteria:**
- AC1: Page displays paginated list of all notifications
- AC2: Infinite scroll or load more pagination
- AC3: Filter by read/unread status
- AC4: Filter by notification type
- AC5: Empty state message when no notifications
- AC6: Pull to refresh on mobile

#### REQ-NTF-FE-004: Notification Item [Phase 4]
The application SHALL display individual notification items.

**Acceptance Criteria:**
- AC1: Item shows type icon, title, message, timestamp
- AC2: Relative timestamps (e.g., "2 hours ago")
- AC3: Unread indicator (dot or background)
- AC4: Swipe to delete on mobile
- AC5: Context menu for actions (mark read, delete)
- AC6: Click navigates to relevant content

#### REQ-NTF-FE-005: Real-Time Updates [Phase 4]
The application SHALL update notifications in real-time.

**Acceptance Criteria:**
- AC1: New notifications appear without page refresh
- AC2: Toast/snackbar shows for new notifications
- AC3: Browser/OS notification permission request
- AC4: Sound/vibration for new notifications (if enabled)
- AC5: Background sync when app is inactive

### 2.2 Push Notifications

#### REQ-NTF-FE-006: Push Notification Permission [Phase 4]
The application SHALL request push notification permission.

**Acceptance Criteria:**
- AC1: Permission prompt shows on first visit or in settings
- AC2: User can enable/disable push notifications
- AC3: Denied permission state is handled gracefully
- AC4: Re-prompt option available in settings
- AC5: Different flows for web, iOS, Android

#### REQ-NTF-FE-007: Service Worker Registration [Phase 4]
The application SHALL register service worker for push notifications.

**Acceptance Criteria:**
- AC1: Service worker registered on app load
- AC2: Push token sent to backend after registration
- AC3: Token refreshed when expired
- AC4: Token unregistered on logout
- AC5: Service worker handles background notifications

#### REQ-NTF-FE-008: Push Notification Display [Phase 4]
The application SHALL display push notifications.

**Acceptance Criteria:**
- AC1: Notifications show when app is in background
- AC2: Click on notification opens app to relevant page
- AC3: Multiple notifications grouped when appropriate
- AC4: Notification actions (accept, dismiss) supported
- AC5: Badge count updates on app icon

### 2.3 Notification Preferences

#### REQ-NTF-FE-009: Preferences Page [Phase 4]
The application SHALL provide notification preferences page.

**Acceptance Criteria:**
- AC1: Page shows all notification types
- AC2: Toggle for each notification channel (push, in-app, email)
- AC3: Changes save automatically or with save button
- AC4: Success message on save
- AC5: Reset to defaults option

#### REQ-NTF-FE-010: Channel Toggles [Phase 4]
The application SHALL provide channel-specific toggles.

**Acceptance Criteria:**
- AC1: Master toggle for each channel (push, in-app, email)
- AC2: Individual toggles for each notification type
- AC3: Disabled state when master toggle is off
- AC4: Visual indication of current state
- AC5: Confirmation dialog for critical changes

#### REQ-NTF-FE-011: Notification Types [Phase 4]
The application SHALL display all notification types.

**Acceptance Criteria:**
- AC1: Types include: Course Updates, New Content, Achievements, Social, System
- AC2: Each type shows description
- AC3: Each type has channel toggles (push, in-app, email)
- AC4: Types are grouped by category
- AC5: Search/filter for specific types

#### REQ-NTF-FE-012: Do Not Disturb [Phase 4]
The application SHALL provide Do Not Disturb settings.

**Acceptance Criteria:**
- AC1: Toggle to enable/disable DND
- AC2: Time picker for start and end time
- AC3: Timezone is user's local timezone
- AC4: Days of week selector (optional)
- AC5: Preview of DND schedule

#### REQ-NTF-FE-013: Digest Frequency [Phase 4]
The application SHALL provide digest frequency settings.

**Acceptance Criteria:**
- AC1: Radio buttons for: real-time, hourly, daily, weekly
- AC2: Time picker for daily/weekly digest delivery
- AC3: Preview of next digest time
- AC4: Option to send digest now (for testing)
- AC5: Explanation of how digest works

### 2.4 Email Preferences

#### REQ-NTF-FE-014: Email Subscriptions [Phase 4]
The application SHALL display email subscription options.

**Acceptance Criteria:**
- AC1: List of all email types (transactional, marketing, newsletters)
- AC2: Transactional emails cannot be disabled
- AC3: Unsubscribe from all option
- AC4: Confirmation dialog for unsubscribe all
- AC5: Resubscribe option available

#### REQ-NTF-FE-015: Unsubscribe Page [Phase 4]
The application SHALL provide unsubscribe page from email links.

**Acceptance Criteria:**
- AC1: Page loads from email unsubscribe link with token
- AC2: One-click unsubscribe without login
- AC3: Confirmation message after unsubscribe
- AC4: Option to manage all preferences (requires login)
- AC5: Feedback form for unsubscribe reason (optional)

---

## 3. Component Architecture

### 3.1 Pages

| Component | Route | Description |
|-----------|-------|-------------|
| NotificationsPage | /notifications | All notifications list |
| NotificationPreferencesPage | /settings/notifications | Notification preferences |
| UnsubscribePage | /unsubscribe | Email unsubscribe |

### 3.2 Components

| Component | Description |
|-----------|-------------|
| NotificationBell | Bell icon with badge in header |
| NotificationDropdown | Dropdown panel with recent notifications |
| NotificationList | List of notifications with pagination |
| NotificationItem | Individual notification item |
| NotificationFilter | Filter controls for notifications |
| PreferenceSection | Section for preference category |
| ChannelToggle | Toggle for notification channel |
| NotificationTypeRow | Row for single notification type |
| DndSchedule | Do Not Disturb schedule picker |
| DigestFrequency | Digest frequency selector |

### 3.3 Services

| Service | Description |
|---------|-------------|
| NotificationService | Notification API calls |
| PushService | Push notification registration |
| WebSocketService | Real-time notification updates |
| PreferencesService | Preferences API calls |

---

## 4. State Management

Per REQ-FE-009, state management SHALL use RxJS (not NgRx or Signals).

### 4.1 Notification State

```typescript
interface NotificationState {
  notifications: Notification[];
  unreadCount: number;
  isLoading: boolean;
  hasMore: boolean;
  filter: NotificationFilter;
}
```

### 4.2 Preference State

```typescript
interface PreferenceState {
  preferences: NotificationPreferences;
  isLoading: boolean;
  isSaving: boolean;
}
```

---

## 5. UI/UX Requirements

### 5.1 Design System

Per REQ-FE-006 and REQ-FE-010, the application SHALL use Angular Material with Material 3 guidelines and default theme colors.

### 5.2 Notification Icons

| Type | Icon |
|------|------|
| Course Update | school |
| New Content | new_releases |
| Achievement | emoji_events |
| Social | people |
| System | info |
| Error | error |
| Success | check_circle |

### 5.3 Responsive Design

Per REQ-FE-018, all pages SHALL be responsive and follow mobile-first design:
- Mobile: Full-width notification items, swipe gestures
- Tablet: Two-column layout for preferences
- Desktop: Sidebar navigation with content area

### 5.4 Accessibility

- All notifications MUST be keyboard accessible
- Screen reader support for notification count
- ARIA live regions for real-time updates
- Focus management for dropdown
- High contrast mode support

### 5.5 Component Naming

Per REQ-FE-012 and REQ-FE-013:
- Class names SHALL NOT have "Component" suffix
- File names SHALL NOT have "component" prefix

---

## 6. Real-Time Communication

### 6.1 WebSocket Connection

- Connect to WebSocket on app load
- Subscribe to user-specific notification channel
- Reconnect on connection loss
- Heartbeat to keep connection alive

### 6.2 Polling Fallback

- Poll notifications every 60 seconds if WebSocket unavailable
- Exponential backoff on errors
- Stop polling when tab is inactive

---

## 7. Browser Notifications

### 7.1 Permission States

| State | Behavior |
|-------|----------|
| default | Show permission prompt |
| granted | Enable notifications |
| denied | Show settings link |

### 7.2 Notification Format

```typescript
{
  title: string;
  body: string;
  icon: string;
  badge: string;
  tag: string;
  data: {
    url: string;
    notificationId: string;
  }
}
```

---

## 8. Error Handling

### 8.1 API Errors

| Error Code | User Message |
|------------|--------------|
| 401 | Please log in to view notifications. |
| 403 | Access denied. |
| 404 | Notification not found. |
| 429 | Too many requests. Please wait. |
| 500 | Unable to load notifications. Please try again. |

### 8.2 Push Notification Errors

| Error | User Message |
|-------|--------------|
| Permission denied | Enable notifications in browser settings. |
| Not supported | Push notifications not supported in this browser. |
| Registration failed | Unable to register for notifications. |

---

## 9. Performance Considerations

- Virtualize long notification lists
- Lazy load notification images
- Debounce real-time updates (max 1 update per second)
- Cache preferences locally
- Prefetch notification content on hover

---

## 10. Testing Requirements

### 10.1 Unit Tests (Jest)

Per REQ-FE-021, unit tests SHALL use Jest:
- Test notification filtering logic
- Test state management
- Test service API calls with mocks
- Test timestamp formatting
- Minimum 80% code coverage

### 10.2 E2E Tests (Playwright)

Per REQ-FE-022, E2E tests SHALL use Playwright:
- Test notification bell interaction
- Test marking notifications as read
- Test filtering notifications
- Test updating preferences
- Test push notification registration

---

## 11. Implementation Notes

### 11.1 API Base URL

Per REQ-FE-026, the baseUrl configuration SHALL contain ONLY the base URI:
```typescript
// Correct
baseUrl = "http://localhost:7200"
this.http.get(`${baseUrl}/api/notifications`)

// Incorrect
baseUrl = "http://localhost:7200/api"
```

### 11.2 File Structure

Per REQ-FE-015 and REQ-FE-016:
- Pages in `pages/` folder
- Reusable components in `components/` folder
- Barrel exports in each folder

### 11.3 Service Worker

Service worker file SHALL be placed in `src/` root as `sw.js` and registered in `main.ts`.

---

*Document Version: 1.0*
*Phase Coverage: Phase 4*
