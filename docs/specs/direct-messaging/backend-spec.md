# Direct Messaging - Backend Specification

**Feature:** Direct Messaging
**Version:** 1.0
**Last Updated:** December 2024

---

## 1. Overview

The Direct Messaging feature provides secure, private messaging between users on the CoursesPlatform system. It supports one-on-one conversations, message delivery, read receipts, message moderation, and content management.

---

## 2. Requirements

### 2.1 Conversation Management

#### REQ-MSG-001: Start Conversation [Phase 4]
The system SHALL allow users to start a direct conversation with another user.

**Acceptance Criteria:**
- AC1: User can initiate conversation with another active user
- AC2: System creates conversation record with both participants
- AC3: Users cannot start duplicate conversations with the same participant
- AC4: ConversationStarted event is published
- AC5: Both participants are notified of new conversation
- AC6: Conversation is created with Active status

#### REQ-MSG-002: Archive Conversation [Phase 4]
The system SHALL allow users to archive conversations.

**Acceptance Criteria:**
- AC1: User can archive any conversation they participate in
- AC2: Archived conversations are hidden from main view
- AC3: ConversationArchived event is published
- AC4: User can unarchive conversations
- AC5: ConversationUnarchived event is published
- AC6: Archive action only affects the current user's view

#### REQ-MSG-003: Delete Conversation [Phase 4]
The system SHALL allow users to delete conversations.

**Acceptance Criteria:**
- AC1: User can delete any conversation they participate in
- AC2: Deleted conversations are removed from user's view
- AC3: ConversationDeleted event is published
- AC4: Deletion only affects the current user's view
- AC5: Other participant retains access to conversation
- AC6: Message history is preserved in database

#### REQ-MSG-004: Mute Conversation [Phase 4]
The system SHALL allow users to mute conversation notifications.

**Acceptance Criteria:**
- AC1: User can mute notifications for specific conversations
- AC2: ConversationMuted event is published
- AC3: User can unmute conversations
- AC4: ConversationUnmuted event is published
- AC5: Muted conversations do not trigger notifications

#### REQ-MSG-005: Block User [Phase 4]
The system SHALL allow users to block other users from messaging.

**Acceptance Criteria:**
- AC1: User can block another user
- AC2: UserBlocked event is published
- AC3: Blocked user cannot send messages to the blocker
- AC4: Existing conversations remain accessible
- AC5: User can unblock previously blocked users
- AC6: UserUnblocked event is published

### 2.2 Message Operations

#### REQ-MSG-006: Send Message [Phase 4]
The system SHALL allow users to send text messages in conversations.

**Acceptance Criteria:**
- AC1: User can send message to active conversation
- AC2: Message content is validated (max 10,000 characters)
- AC3: MessageSent event is published
- AC4: Recipient receives real-time notification
- AC5: Message is stored with timestamp
- AC6: Empty messages are rejected

#### REQ-MSG-007: Read Receipt [Phase 4]
The system SHALL track when messages are read.

**Acceptance Criteria:**
- AC1: System records when user views message
- AC2: MessageRead event is published
- AC3: Sender can see read status
- AC4: Read timestamp is stored
- AC5: Unread message count is maintained per conversation

#### REQ-MSG-008: Edit Message [Phase 4]
The system SHALL allow users to edit their sent messages.

**Acceptance Criteria:**
- AC1: User can edit their own messages within 15 minutes of sending
- AC2: MessageEdited event is published
- AC3: Edit history is maintained
- AC4: Message shows "edited" indicator
- AC5: Original content is preserved in audit log
- AC6: Cannot edit messages older than 15 minutes

#### REQ-MSG-009: Delete Message [Phase 4]
The system SHALL allow users to delete their sent messages.

**Acceptance Criteria:**
- AC1: User can delete their own messages
- AC2: MessageDeleted event is published
- AC3: Deleted message shows placeholder text
- AC4: Message content is preserved in audit log
- AC5: Deletion timestamp is recorded
- AC6: Both sender and recipient see deletion

#### REQ-MSG-010: Attach Files [Phase 5]
The system SHALL support file attachments in messages.

**Acceptance Criteria:**
- AC1: User can attach files to messages
- AC2: Supported formats: images, documents, PDFs
- AC3: Maximum file size is 25MB
- AC4: FileAttached event is published
- AC5: Attachments are scanned for malware
- AC6: Thumbnails are generated for images

### 2.3 Message Moderation

#### REQ-MSG-011: Report Message [Phase 4]
The system SHALL allow users to report inappropriate messages.

**Acceptance Criteria:**
- AC1: User can report any message they receive
- AC2: Report requires a reason category
- AC3: MessageReported event is published
- AC4: Report is queued for moderator review
- AC5: Reporter remains anonymous to reported user
- AC6: Duplicate reports are prevented

#### REQ-MSG-012: Review Reports [Phase 4]
The system SHALL allow moderators to review message reports.

**Acceptance Criteria:**
- AC1: Moderators can view pending reports
- AC2: Report includes message content and context
- AC3: Moderator can approve or reject report
- AC4: MessageReportReviewed event is published
- AC5: Reporter is notified of outcome
- AC6: Review actions are logged for audit

#### REQ-MSG-013: Content Filtering [Phase 4]
The system SHALL automatically filter inappropriate content.

**Acceptance Criteria:**
- AC1: System scans messages for prohibited content
- AC2: Messages with prohibited content are flagged
- AC3: InappropriateContentDetected event is published
- AC4: Flagged messages are held for review
- AC5: User is notified of content violation
- AC6: Repeat violations result in account action

#### REQ-MSG-014: Ban User [Phase 4]
The system SHALL allow moderators to ban users from messaging.

**Acceptance Criteria:**
- AC1: Moderator can ban user from messaging feature
- AC2: UserBannedFromMessaging event is published
- AC3: Banned user cannot send new messages
- AC4: Ban can be temporary or permanent
- AC5: Ban reason is recorded
- AC6: User is notified of ban

### 2.4 Search and Filtering

#### REQ-MSG-015: Search Messages [Phase 4]
The system SHALL allow users to search their message history.

**Acceptance Criteria:**
- AC1: User can search messages by content
- AC2: Search results are paginated
- AC3: Search includes sender and timestamp
- AC4: MessageSearchPerformed event is published
- AC5: Search is case-insensitive
- AC6: Results are limited to user's accessible conversations

#### REQ-MSG-016: Filter Conversations [Phase 4]
The system SHALL allow users to filter conversations.

**Acceptance Criteria:**
- AC1: User can filter by unread conversations
- AC2: User can filter by archived conversations
- AC3: User can filter by participant name
- AC4: Filters can be combined
- AC5: Filter settings are preserved per session

### 2.5 Notifications

#### REQ-MSG-017: Message Notifications [Phase 4]
The system SHALL send notifications for new messages.

**Acceptance Criteria:**
- AC1: User receives notification when message is received
- AC2: Notification includes sender and preview
- AC3: MessageNotificationSent event is published
- AC4: Notifications respect mute settings
- AC5: Notifications are sent via in-app and email
- AC6: Notification preferences can be configured

#### REQ-MSG-018: Typing Indicator [Phase 5]
The system SHALL show when participant is typing.

**Acceptance Criteria:**
- AC1: System broadcasts typing status
- AC2: TypingStarted/TypingStopped events are published
- AC3: Indicator disappears after 3 seconds of inactivity
- AC4: Only shown to conversation participants
- AC5: Works in real-time via WebSocket

---

## 3. Domain Model

### 3.1 Entities

| Entity | Description |
|--------|-------------|
| Conversation | Container for messages between two users |
| Message | Individual text message with metadata |
| MessageEdit | History of message edits |
| MessageReport | User-submitted report of inappropriate content |
| ConversationParticipant | User participation in conversation with settings |
| MessageAttachment | File attached to a message |
| BlockedUser | Record of blocked user relationships |

### 3.2 Domain Events

| Event | Trigger |
|-------|---------|
| ConversationStarted | New conversation created |
| ConversationArchived | User archives conversation |
| ConversationUnarchived | User unarchives conversation |
| ConversationDeleted | User deletes conversation |
| ConversationMuted | User mutes conversation |
| ConversationUnmuted | User unmutes conversation |
| MessageSent | New message sent |
| MessageDelivered | Message delivered to recipient |
| MessageRead | Recipient reads message |
| MessageEdited | Message content edited |
| MessageDeleted | Message deleted by sender |
| MessageReported | User reports message |
| MessageReportReviewed | Moderator reviews report |
| InappropriateContentDetected | Automated filter flags content |
| FileAttached | File attached to message |
| UserBlocked | User blocks another user |
| UserUnblocked | User unblocks another user |
| UserBannedFromMessaging | User banned from messaging |
| UserUnbannedFromMessaging | User unbanned from messaging |
| MessageNotificationSent | Notification sent to user |
| MessageSearchPerformed | User searches messages |
| TypingStarted | User starts typing |
| TypingStopped | User stops typing |

---

## 4. API Endpoints

### 4.1 Conversation Management

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/messaging/conversations | List user's conversations |
| POST | /api/messaging/conversations | Start new conversation |
| GET | /api/messaging/conversations/{id} | Get conversation details |
| POST | /api/messaging/conversations/{id}/archive | Archive conversation |
| POST | /api/messaging/conversations/{id}/unarchive | Unarchive conversation |
| DELETE | /api/messaging/conversations/{id} | Delete conversation |
| POST | /api/messaging/conversations/{id}/mute | Mute conversation |
| POST | /api/messaging/conversations/{id}/unmute | Unmute conversation |

### 4.2 Message Operations

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/messaging/conversations/{id}/messages | Get messages in conversation |
| POST | /api/messaging/conversations/{id}/messages | Send message |
| PUT | /api/messaging/messages/{id} | Edit message |
| DELETE | /api/messaging/messages/{id} | Delete message |
| POST | /api/messaging/messages/{id}/read | Mark message as read |
| POST | /api/messaging/messages/{id}/attach | Attach file to message |

### 4.3 Blocking

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/messaging/blocked-users | List blocked users |
| POST | /api/messaging/blocked-users | Block user |
| DELETE | /api/messaging/blocked-users/{userId} | Unblock user |

### 4.4 Moderation

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/messaging/messages/{id}/report | Report message |
| GET | /api/messaging/reports | List reports (moderator) |
| POST | /api/messaging/reports/{id}/review | Review report (moderator) |
| POST | /api/messaging/users/{userId}/ban | Ban user from messaging |
| DELETE | /api/messaging/users/{userId}/ban | Unban user from messaging |

### 4.5 Search

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/messaging/search | Search messages |
| GET | /api/messaging/conversations/unread | Get unread count |

---

## 5. Security Considerations

- All message content MUST be encrypted at rest
- Message access MUST be restricted to conversation participants
- File attachments MUST be scanned for malware
- Rate limiting MUST be applied to prevent spam
- Message reports MUST be handled securely and confidentially
- All moderation actions MUST be logged for audit
- HTTPS MUST be enforced for all endpoints
- User blocking MUST prevent all message delivery

---

## 6. Dependencies

- Serilog for structured logging
- MediatR for CQRS pattern
- Entity Framework Core for data access
- FluentValidation for request validation
- SignalR for real-time messaging
- Azure Blob Storage for file attachments

---

## 7. Implementation Notes

Per the implementation specification (REQ-SYS-005, REQ-SYS-006), all data access SHALL use ICoursesPlatformContext directly without repository pattern.

Real-time features (typing indicators, instant message delivery) SHALL use SignalR hubs for WebSocket communication.

---

*Document Version: 1.0*
*Phase Coverage: 4-5*
