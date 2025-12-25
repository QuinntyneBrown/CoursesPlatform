# Q&A & Discussions - Frontend Specification

**Feature:** Q&A & Discussions
**Version:** 1.0
**Last Updated:** December 2024

---

## 1. Overview

The Q&A & Discussions frontend provides user interfaces for asking questions, posting answers, voting, commenting, and moderating content within course contexts.

---

## 2. Requirements

### 2.1 Question Management

#### REQ-QNA-FE-001: Questions List Page [Phase 2]
The application SHALL provide a questions list page for each course.

**Acceptance Criteria:**
- AC1: Page displays all questions in the course
- AC2: Questions show title, excerpt, author, vote count, answer count, tags
- AC3: Filter controls for status, tags, date range
- AC4: Sort options: newest, votes, activity, unanswered
- AC5: Search bar for keyword search
- AC6: Pagination or infinite scroll
- AC7: Pinned questions appear at top

#### REQ-QNA-FE-002: Post Question Page [Phase 2]
The application SHALL provide a page to post new questions.

**Acceptance Criteria:**
- AC1: Form with title, body editor, and tag selector
- AC2: Rich text editor with markdown preview
- AC3: Title validation (minimum 15 characters)
- AC4: Body validation (minimum 30 characters)
- AC5: Tag autocomplete from existing tags
- AC6: Optional lecture association dropdown
- AC7: Preview mode before submission

#### REQ-QNA-FE-003: Question Detail Page [Phase 2]
The application SHALL provide a question detail view.

**Acceptance Criteria:**
- AC1: Displays question title, body, author, timestamps
- AC2: Shows vote controls with current score
- AC3: Lists all answers sorted by votes and acceptance
- AC4: Accepted answer appears first with indicator
- AC5: Follow/unfollow button
- AC6: Edit button for question author
- AC7: Pin/lock buttons for instructors
- AC8: Flag button for reporting

#### REQ-QNA-FE-004: Edit Question Page [Phase 2]
The application SHALL provide question editing interface.

**Acceptance Criteria:**
- AC1: Pre-populated form with current question data
- AC2: Edit history link displayed
- AC3: Validation same as post question
- AC4: Cancel button to discard changes
- AC5: Warning if answers exist

### 2.2 Answer Management

#### REQ-QNA-FE-005: Answer List Component [Phase 2]
The application SHALL display answers within question detail page.

**Acceptance Criteria:**
- AC1: Each answer shows body, author, vote score, timestamp
- AC2: Accepted answer has distinctive styling and appears first
- AC3: Vote controls for each answer
- AC4: Accept button visible to question author and instructor
- AC5: Edit/delete buttons for answer author
- AC6: Comment section below each answer
- AC7: Sort options: votes, newest, oldest

#### REQ-QNA-FE-006: Post Answer Component [Phase 2]
The application SHALL provide answer submission interface.

**Acceptance Criteria:**
- AC1: Rich text editor for answer body
- AC2: Code snippet support with syntax highlighting
- AC3: Preview mode
- AC4: Minimum 30 characters validation
- AC5: Submit button disabled until valid
- AC6: Cancel button to discard draft

#### REQ-QNA-FE-007: Edit Answer Component [Phase 2]
The application SHALL allow editing answers.

**Acceptance Criteria:**
- AC1: Inline or modal editor
- AC2: Pre-populated with current content
- AC3: Edit history indicator
- AC4: Save and cancel options

### 2.3 Voting Interface

#### REQ-QNA-FE-008: Vote Controls [Phase 2]
The application SHALL provide voting controls for questions and answers.

**Acceptance Criteria:**
- AC1: Upvote and downvote buttons
- AC2: Current vote score displayed between buttons
- AC3: User's vote is highlighted (active state)
- AC4: Click to vote, click again to remove vote
- AC5: Disabled state for own content
- AC6: Tooltip showing reputation requirement for downvote
- AC7: Optimistic UI update with rollback on error

### 2.4 Comment Management

#### REQ-QNA-FE-009: Comment Component [Phase 2]
The application SHALL display comments on questions and answers.

**Acceptance Criteria:**
- AC1: Comments displayed chronologically
- AC2: Each comment shows author, text, timestamp
- AC3: Edit link visible within 5 minutes (for author)
- AC4: Delete option for authorized users
- AC5: Add comment form below comment list
- AC6: Character counter (max 500)

#### REQ-QNA-FE-010: Add Comment Form [Phase 2]
The application SHALL provide comment input interface.

**Acceptance Criteria:**
- AC1: Single-line or expandable textarea
- AC2: Basic markdown support (bold, italic, code)
- AC3: Character limit indicator
- AC4: Submit on Enter key (optional Shift+Enter for newline)
- AC5: Cancel button to clear

### 2.5 Search & Filter

#### REQ-QNA-FE-011: Search Interface [Phase 2]
The application SHALL provide question search functionality.

**Acceptance Criteria:**
- AC1: Search input with autocomplete suggestions
- AC2: Search highlights matching terms in results
- AC3: Recent searches saved locally
- AC4: Clear search button
- AC5: Search scope indicator (current course)

#### REQ-QNA-FE-012: Filter Panel [Phase 2]
The application SHALL provide filtering controls.

**Acceptance Criteria:**
- AC1: Checkbox filters for status (unanswered, answered, accepted)
- AC2: Tag selector with multi-select
- AC3: Date range picker
- AC4: Active filters shown as removable chips
- AC5: Clear all filters button
- AC6: Filter count indicator

### 2.6 Moderation Interface

#### REQ-QNA-FE-013: Flag Content Dialog [Phase 2]
The application SHALL provide content flagging interface.

**Acceptance Criteria:**
- AC1: Modal dialog with flag reason options
- AC2: Reasons: spam, offensive, duplicate, off-topic, other
- AC3: Additional details textarea for "other"
- AC4: Confirmation message on submission
- AC5: Prevents duplicate flags by same user

#### REQ-QNA-FE-014: Moderation Dashboard [Phase 2]
The application SHALL provide moderation interface for instructors.

**Acceptance Criteria:**
- AC1: Lists all flagged content with flag count
- AC2: Shows flag reasons and reporters
- AC3: Preview of flagged content
- AC4: Actions: approve, remove, escalate
- AC5: Filter by flag status (pending, reviewed)
- AC6: Bulk actions support

### 2.7 Notifications

#### REQ-QNA-FE-015: Notification Panel [Phase 2]
The application SHALL display Q&A notifications.

**Acceptance Criteria:**
- AC1: Notification icon with unread count badge
- AC2: Dropdown panel with recent notifications
- AC3: Notification types: new answer, comment, vote, accepted
- AC4: Mark as read functionality
- AC5: Link to relevant question/answer
- AC6: Mark all as read option

#### REQ-QNA-FE-016: Notification Preferences [Phase 2]
The application SHALL allow configuring Q&A notification settings.

**Acceptance Criteria:**
- AC1: Toggle for email notifications
- AC2: Frequency selector (instant, daily, weekly, off)
- AC3: Notification type checkboxes
- AC4: Muted questions list
- AC5: Save preferences button

### 2.8 Reputation & Badges

#### REQ-QNA-FE-017: Reputation Display [Phase 3]
The application SHALL display user reputation scores.

**Acceptance Criteria:**
- AC1: Reputation score shown on user avatar/profile
- AC2: Reputation breakdown by activity type
- AC3: Recent reputation changes list
- AC4: Reputation history graph

#### REQ-QNA-FE-018: Badge Display [Phase 3]
The application SHALL display earned badges.

**Acceptance Criteria:**
- AC1: Badge icons next to username
- AC2: Badge details on hover
- AC3: Badge collection on user profile
- AC4: Progress toward next badge

---

## 3. Component Architecture

### 3.1 Pages

| Component | Route | Description |
|-----------|-------|-------------|
| QuestionsListPage | /courses/{id}/questions | Course questions list |
| QuestionDetailPage | /questions/{id} | Question detail and answers |
| PostQuestionPage | /courses/{id}/questions/new | Create new question |
| EditQuestionPage | /questions/{id}/edit | Edit question |
| ModerationDashboardPage | /courses/{id}/moderation | Moderation interface |

### 3.2 Components

| Component | Description |
|-----------|-------------|
| QuestionCard | Question summary in list view |
| QuestionDetail | Full question display |
| QuestionForm | Create/edit question form |
| AnswerList | List of answers to question |
| AnswerCard | Individual answer display |
| AnswerForm | Post/edit answer form |
| VoteControls | Upvote/downvote buttons |
| CommentList | Comments display |
| CommentForm | Add comment input |
| TagSelector | Tag selection component |
| SearchBar | Question search input |
| FilterPanel | Question filter controls |
| FlagDialog | Content flagging modal |
| NotificationPanel | Notifications dropdown |
| ReputationBadge | User reputation display |

### 3.3 Services

| Service | Description |
|---------|-------------|
| QuestionService | Question CRUD operations |
| AnswerService | Answer CRUD operations |
| VoteService | Voting operations |
| CommentService | Comment operations |
| ModerationService | Flagging and moderation |
| NotificationService | Notification management |

---

## 4. State Management

Per REQ-FE-009, state management SHALL use RxJS (not NgRx or Signals).

### 4.1 Question State

```typescript
interface QuestionState {
  questions: Question[];
  currentQuestion: Question | null;
  filters: QuestionFilters;
  isLoading: boolean;
  totalCount: number;
}
```

### 4.2 Answer State

```typescript
interface AnswerState {
  answers: Answer[];
  isLoading: boolean;
  sortBy: 'votes' | 'newest' | 'oldest';
}
```

### 4.3 Notification State

```typescript
interface NotificationState {
  notifications: QnaNotification[];
  unreadCount: number;
  isLoading: boolean;
}
```

---

## 5. UI/UX Requirements

### 5.1 Design System

Per REQ-FE-006 and REQ-FE-010, the application SHALL use Angular Material with Material 3 guidelines and default theme colors.

### 5.2 Responsive Design

Per REQ-FE-018, all pages SHALL be responsive:
- Mobile: Single column, stacked layout
- Tablet: Two column where appropriate
- Desktop: Sidebar filters with main content area

### 5.3 Rich Text Editor

- Markdown support with preview
- Toolbar with formatting options
- Code block with syntax highlighting
- Image upload support
- Link insertion
- Real-time character count

### 5.4 Accessibility

- All forms MUST have proper ARIA labels
- Keyboard navigation for vote controls
- Screen reader support for notifications
- Focus management for modals
- Semantic HTML structure

### 5.5 Component Naming

Per REQ-FE-012 and REQ-FE-013:
- Class names SHALL NOT have "Component" suffix
- File names SHALL NOT have "component" prefix

---

## 6. Form Validation

### 6.1 Question Validation
- Title: Required, 15-200 characters
- Body: Required, minimum 30 characters
- Tags: Maximum 5 tags per question
- Lecture: Optional, must be valid lecture in course

### 6.2 Answer Validation
- Body: Required, minimum 30 characters
- Code snippets: Optional, valid syntax

### 6.3 Comment Validation
- Body: Required, 1-500 characters
- No markdown validation for comments

---

## 7. Error Handling

### 7.1 API Errors

| Error Code | User Message |
|------------|--------------|
| 400 | Invalid input. Please check your submission. |
| 401 | You must be logged in to perform this action. |
| 403 | You don't have permission to perform this action. |
| 404 | Question or answer not found. |
| 409 | This content has been modified. Please refresh. |
| 429 | Too many requests. Please wait before trying again. |
| 500 | Something went wrong. Please try again. |

### 7.2 Validation Errors

- Display inline below the field
- Use red color for error state
- Clear error when field is corrected
- Show all validation errors simultaneously

---

## 8. Performance Considerations

### 8.1 Loading States
- Skeleton loaders for question cards
- Spinner for infinite scroll
- Optimistic updates for votes
- Debounced search input (300ms)

### 8.2 Caching
- Cache question list for 5 minutes
- Invalidate cache on new post/edit
- Cache user votes locally
- Cache reputation scores

### 8.3 Pagination
- Load 20 questions per page
- Infinite scroll on desktop
- "Load more" button on mobile
- Prefetch next page

---

## 9. Testing Requirements

### 9.1 Unit Tests (Jest)

Per REQ-FE-021, unit tests SHALL use Jest:
- Test vote logic and optimistic updates
- Test form validations
- Test filter and search logic
- Test state management
- Minimum 80% code coverage

### 9.2 E2E Tests (Playwright)

Per REQ-FE-022, E2E tests SHALL use Playwright:
- Test post question flow
- Test answer and accept flow
- Test voting flow
- Test comment flow
- Test search and filter
- Test flag content flow

---

## 10. Implementation Notes

### 10.1 API Base URL

Per REQ-FE-026, the baseUrl configuration SHALL contain ONLY the base URI:
```typescript
// Correct
baseUrl = "http://localhost:7200"
this.http.get(`${baseUrl}/api/courses/123/questions`)

// Incorrect
baseUrl = "http://localhost:7200/api"
```

### 10.2 File Structure

Per REQ-FE-015 and REQ-FE-016:
- Pages in `pages/qa/` folder
- Reusable components in `components/qa/` folder
- Barrel exports in each folder

### 10.3 Markdown Rendering

- Use secure markdown parser to prevent XSS
- Sanitize HTML output
- Support code syntax highlighting
- Allow safe HTML subset (no scripts)

---

*Document Version: 1.0*
*Phase Coverage: 2-3*
