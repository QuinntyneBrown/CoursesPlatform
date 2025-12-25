# Direct Messaging - Frontend Specification

**Feature:** Direct Messaging
**Version:** 1.0
**Last Updated:** December 2024

---

## 1. Overview

The Direct Messaging frontend provides user interfaces for private messaging, conversation management, message composition, and moderation features.

---

## 2. Requirements

### 2.1 Conversation List

#### REQ-MSG-FE-001: Conversation List View [Phase 4]
The application SHALL provide a conversation list interface.

**Acceptance Criteria:**
- AC1: Page displays all user conversations
- AC2: Each conversation shows participant name, avatar, last message preview
- AC3: Unread message count badge is displayed
- AC4: Conversations are sorted by most recent activity
- AC5: List supports infinite scroll pagination
- AC6: Search bar filters conversations by participant name

#### REQ-MSG-FE-002: Conversation Actions [Phase 4]
The application SHALL provide conversation management actions.

**Acceptance Criteria:**
- AC1: Context menu shows archive, delete, mute options
- AC2: Archive action moves conversation to archived view
- AC3: Delete action removes conversation from list with confirmation
- AC4: Mute action disables notifications for conversation
- AC5: Actions update UI immediately
- AC6: Success/error notifications are displayed

#### REQ-MSG-FE-003: New Conversation [Phase 4]
The application SHALL provide interface to start new conversations.

**Acceptance Criteria:**
- AC1: Button opens new conversation dialog
- AC2: Dialog shows user search/select interface
- AC3: Cannot select blocked users
- AC4: Cannot select users who blocked current user
- AC5: Duplicate conversations are prevented
- AC6: Success redirects to new conversation

### 2.2 Message View

#### REQ-MSG-FE-004: Message Thread [Phase 4]
The application SHALL display message thread for selected conversation.

**Acceptance Criteria:**
- AC1: Messages are displayed in chronological order
- AC2: Sender messages align right, recipient messages align left
- AC3: Each message shows sender name, avatar, timestamp
- AC4: Read receipts are displayed for sent messages
- AC5: Edited indicator is shown for edited messages
- AC6: Auto-scroll to bottom on new message

#### REQ-MSG-FE-005: Message Composition [Phase 4]
The application SHALL provide message composition interface.

**Acceptance Criteria:**
- AC1: Text input area supports multiline text
- AC2: Character count shows remaining characters
- AC3: Send button is disabled for empty messages
- AC4: Enter key sends message, Shift+Enter adds new line
- AC5: Composition area shows typing indicator for recipient
- AC6: Attachment button opens file selector (Phase 5)

#### REQ-MSG-FE-006: Message Actions [Phase 4]
The application SHALL provide message action menu.

**Acceptance Criteria:**
- AC1: Hover/long-press shows action menu
- AC2: Own messages show edit and delete options
- AC3: All messages show report option
- AC4: Edit opens inline editor (15 minute time limit)
- AC5: Delete shows confirmation dialog
- AC6: Report opens report dialog

### 2.3 Real-time Features

#### REQ-MSG-FE-007: Real-time Message Delivery [Phase 4]
The application SHALL deliver messages in real-time.

**Acceptance Criteria:**
- AC1: New messages appear instantly without refresh
- AC2: SignalR connection is established on page load
- AC3: Connection status is displayed
- AC4: Reconnection is automatic on disconnect
- AC5: Messages sent during disconnect are queued
- AC6: Sound notification plays for new messages

#### REQ-MSG-FE-008: Typing Indicator [Phase 5]
The application SHALL show typing indicator.

**Acceptance Criteria:**
- AC1: Indicator appears when recipient is typing
- AC2: Indicator shows "User is typing..."
- AC3: Indicator disappears after 3 seconds of inactivity
- AC4: Typing status is sent via SignalR
- AC5: Multiple typing users are handled

#### REQ-MSG-FE-009: Read Receipts [Phase 4]
The application SHALL display read receipt status.

**Acceptance Criteria:**
- AC1: Sent messages show "Delivered" or "Read" status
- AC2: Read status shows timestamp on hover
- AC3: Status updates in real-time
- AC4: Checkmark icons indicate delivery and read states
- AC5: Read receipt is sent when message enters viewport

### 2.4 Blocking and Moderation

#### REQ-MSG-FE-010: Block User [Phase 4]
The application SHALL provide user blocking interface.

**Acceptance Criteria:**
- AC1: Block option in conversation menu
- AC2: Confirmation dialog explains blocking effects
- AC3: Blocked user list is accessible from settings
- AC4: Unblock option available in blocked user list
- AC5: Blocking prevents new messages from blocked user
- AC6: Existing conversation remains accessible

#### REQ-MSG-FE-011: Report Message [Phase 4]
The application SHALL provide message reporting interface.

**Acceptance Criteria:**
- AC1: Report option in message action menu
- AC2: Report dialog shows reason categories
- AC3: Optional description field for details
- AC4: Submit button sends report
- AC5: Success confirmation is displayed
- AC6: Cannot report same message twice

#### REQ-MSG-FE-012: Moderator Dashboard [Phase 4]
The application SHALL provide moderator interface for reports.

**Acceptance Criteria:**
- AC1: Dashboard shows pending reports
- AC2: Each report displays message content and context
- AC3: Reporter and reported user information shown
- AC4: Moderator can approve or reject report
- AC5: Ban user option is available
- AC6: Actions are logged and confirmed

### 2.5 Search and Filtering

#### REQ-MSG-FE-013: Message Search [Phase 4]
The application SHALL provide message search functionality.

**Acceptance Criteria:**
- AC1: Search input in conversation view
- AC2: Search highlights matching messages
- AC3: Results show message preview and timestamp
- AC4: Click result scrolls to message
- AC5: Search is performed as user types (debounced)
- AC6: Clear button resets search

#### REQ-MSG-FE-014: Conversation Filters [Phase 4]
The application SHALL provide conversation filtering.

**Acceptance Criteria:**
- AC1: Filter tabs for All, Unread, Archived
- AC2: Active filter is highlighted
- AC3: Filter changes update list immediately
- AC4: Unread count shown on Unread tab
- AC5: Archived conversations in separate tab
- AC6: Filters persist across page reloads

### 2.6 Notifications

#### REQ-MSG-FE-015: In-App Notifications [Phase 4]
The application SHALL display in-app notifications for messages.

**Acceptance Criteria:**
- AC1: Toast notification for new messages
- AC2: Notification shows sender and message preview
- AC3: Click notification navigates to conversation
- AC4: Notifications are dismissed automatically
- AC5: Multiple notifications are stacked
- AC6: Muted conversations do not trigger notifications

#### REQ-MSG-FE-016: Notification Badge [Phase 4]
The application SHALL display unread message count badge.

**Acceptance Criteria:**
- AC1: Badge shows total unread count
- AC2: Badge appears on messaging icon in navigation
- AC3: Count updates in real-time
- AC4: Badge disappears when count is zero
- AC5: Maximum displayed count is 99+

---

## 3. Component Architecture

### 3.1 Pages

| Component | Route | Description |
|-----------|-------|-------------|
| MessagingPage | /messages | Main messaging interface |
| ConversationPage | /messages/:id | Conversation detail view |
| BlockedUsersPage | /messages/blocked | Blocked users list |
| ModeratorDashboardPage | /messages/moderation | Report moderation (admin) |

### 3.2 Components

| Component | Description |
|-----------|-------------|
| ConversationList | List of conversations with preview |
| ConversationItem | Single conversation preview item |
| MessageThread | Display messages in conversation |
| MessageBubble | Individual message display |
| MessageComposer | Message input and send interface |
| TypingIndicator | Shows when user is typing |
| ReadReceipt | Read/delivered status indicator |
| NewConversationDialog | Start new conversation modal |
| ReportMessageDialog | Report message modal |
| BlockUserDialog | Block user confirmation modal |
| MessageActionMenu | Context menu for messages |
| ConversationActionMenu | Context menu for conversations |
| UserSearchSelect | Search and select user component |

### 3.3 Services

| Service | Description |
|---------|-------------|
| MessagingService | Messaging API calls |
| SignalRService | Real-time messaging connection |
| NotificationService | In-app notification handling |
| MessageCacheService | Local message caching |

---

## 4. State Management

Per REQ-FE-009, state management SHALL use RxJS (not NgRx or Signals).

### 4.1 Messaging State

```typescript
interface MessagingState {
  conversations: Conversation[];
  activeConversationId: string | null;
  messages: Record<string, Message[]>;
  unreadCount: number;
  isLoading: boolean;
  error: string | null;
}
```

### 4.2 Real-time State

```typescript
interface RealtimeState {
  isConnected: boolean;
  typingUsers: Record<string, string[]>;
  pendingMessages: Message[];
}
```

---

## 5. UI/UX Requirements

### 5.1 Design System

Per REQ-FE-006 and REQ-FE-010, the application SHALL use Angular Material with Material 3 guidelines and default theme colors.

### 5.2 Layout

- Two-column layout: conversation list (left) and message thread (right)
- Mobile: Single column with navigation between list and thread
- Message bubbles use different colors for sender/recipient
- Timestamps are right-aligned and subtle
- Unread messages have bold text and background highlight

### 5.3 Responsive Design

Per REQ-FE-018, all pages SHALL be responsive and follow mobile-first design:
- Mobile: Stacked layout with back navigation
- Tablet: Two-column layout
- Desktop: Two-column with wider message area

### 5.4 Accessibility

- All interactive elements MUST be keyboard accessible
- Message content MUST be readable by screen readers
- Focus management for modals and dialogs
- ARIA labels for icons and actions
- High contrast mode support

### 5.5 Component Naming

Per REQ-FE-012 and REQ-FE-013:
- Class names SHALL NOT have "Component" suffix
- File names SHALL NOT have "component" prefix

---

## 6. Form Validation

### 6.1 Message Validation
- Maximum 10,000 characters
- Cannot be empty or only whitespace
- HTML tags are escaped

### 6.2 Report Validation
- Reason category is required
- Optional description maximum 1,000 characters

### 6.3 File Attachment Validation (Phase 5)
- Maximum file size: 25MB
- Supported types: images (JPEG, PNG, GIF), documents (PDF, DOCX)
- Malware scanning before upload

---

## 7. Error Handling

### 7.1 API Errors

| Error Code | User Message |
|------------|--------------|
| 400 | Invalid message content. |
| 403 | You are blocked from messaging this user. |
| 404 | Conversation not found. |
| 413 | File size exceeds maximum limit. |
| 429 | Too many messages. Please slow down. |
| 500 | Failed to send message. Please try again. |

### 7.2 Real-time Errors

- Connection lost: Show reconnecting indicator
- Message send failed: Show retry button
- Message not delivered: Show error icon on message

---

## 8. Testing Requirements

### 8.1 Unit Tests (Jest)

Per REQ-FE-021, unit tests SHALL use Jest:
- Test message validation logic
- Test state management for conversations and messages
- Test service API calls with mocks
- Test SignalR connection handling
- Minimum 80% code coverage

### 8.2 E2E Tests (Playwright)

Per REQ-FE-022, E2E tests SHALL use Playwright:
- Test send and receive message flow
- Test conversation creation
- Test message editing and deletion
- Test blocking user
- Test reporting message
- Test real-time message delivery

---

## 9. Implementation Notes

### 9.1 API Base URL

Per REQ-FE-026, the baseUrl configuration SHALL contain ONLY the base URI:
```typescript
// Correct
baseUrl = "http://localhost:7200"
this.http.get(`${baseUrl}/api/messaging/conversations`)

// Incorrect
baseUrl = "http://localhost:7200/api"
```

### 9.2 SignalR Integration

Real-time messaging SHALL use SignalR with the following hub endpoints:
- `/hubs/messaging` - Main messaging hub
- Events: `ReceiveMessage`, `MessageRead`, `UserTyping`, `UserStoppedTyping`

### 9.3 File Structure

Per REQ-FE-015 and REQ-FE-016:
- Pages in `pages/messaging/` folder
- Reusable components in `components/messaging/` folder
- Barrel exports in each folder

---

*Document Version: 1.0*
*Phase Coverage: 4-5*
