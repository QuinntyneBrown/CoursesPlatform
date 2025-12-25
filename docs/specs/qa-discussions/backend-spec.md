# Q&A & Discussions - Backend Specification

**Feature:** Q&A & Discussions
**Version:** 1.0
**Last Updated:** December 2024

---

## 1. Overview

The Q&A & Discussions feature provides a platform for students to ask questions, receive answers, engage in discussions, and collaborate with instructors and peers within course contexts.

---

## 2. Requirements

### 2.1 Question Management

#### REQ-QNA-001: Post Question [Phase 2]
The system SHALL allow users to post questions within a course context.

**Acceptance Criteria:**
- AC1: User can create question with title, body, and optional tags
- AC2: Question is associated with a specific course and optional lecture
- AC3: Question body supports markdown formatting
- AC4: QuestionPosted event is published
- AC5: Course instructor receives notification
- AC6: Question author is automatically following the question

#### REQ-QNA-002: Edit Question [Phase 2]
The system SHALL allow question authors to edit their questions.

**Acceptance Criteria:**
- AC1: Only question author can edit their question
- AC2: Edit is allowed within 24 hours or if no answers exist
- AC3: Edit history is maintained
- AC4: QuestionUpdated event is published
- AC5: Followers receive notification of significant edits

#### REQ-QNA-003: Delete Question [Phase 2]
The system SHALL allow authorized users to delete questions.

**Acceptance Criteria:**
- AC1: Question author can delete their own question
- AC2: Course instructor can delete any question in their course
- AC3: Administrators can delete any question
- AC4: Deletion is soft delete (data retained)
- AC5: QuestionDeleted event is published
- AC6: Associated answers and comments are also soft deleted

#### REQ-QNA-004: Search Questions [Phase 2]
The system SHALL provide search functionality for questions.

**Acceptance Criteria:**
- AC1: Users can search by keywords in title and body
- AC2: Search results can be filtered by course, tags, status
- AC3: Search results are ranked by relevance and recency
- AC4: Full-text search is supported
- AC5: Results include answer count and vote score

#### REQ-QNA-005: Filter Questions [Phase 2]
The system SHALL allow filtering questions by various criteria.

**Acceptance Criteria:**
- AC1: Filter by status (unanswered, answered, accepted)
- AC2: Filter by tags
- AC3: Filter by date range
- AC4: Sort by newest, votes, activity, unanswered
- AC5: Multiple filters can be combined

### 2.2 Answer Management

#### REQ-QNA-006: Post Answer [Phase 2]
The system SHALL allow users to post answers to questions.

**Acceptance Criteria:**
- AC1: User can post answer with markdown body
- AC2: User can attach code snippets with syntax highlighting
- AC3: AnswerPosted event is published
- AC4: Question author receives notification
- AC5: Question followers receive notification
- AC6: Answer count is incremented on question

#### REQ-QNA-007: Edit Answer [Phase 2]
The system SHALL allow answer authors to edit their answers.

**Acceptance Criteria:**
- AC1: Only answer author can edit their answer
- AC2: Edit history is maintained
- AC3: AnswerUpdated event is published
- AC4: Last updated timestamp is recorded
- AC5: Significant edits trigger notifications

#### REQ-QNA-008: Delete Answer [Phase 2]
The system SHALL allow authorized users to delete answers.

**Acceptance Criteria:**
- AC1: Answer author can delete their own answer
- AC2: Question author can delete answers on their question
- AC3: Course instructor can delete any answer in their course
- AC4: Administrators can delete any answer
- AC5: AnswerDeleted event is published
- AC6: Associated comments are also soft deleted

#### REQ-QNA-009: Accept Answer [Phase 2]
The system SHALL allow question authors and instructors to mark answers as accepted.

**Acceptance Criteria:**
- AC1: Question author can accept one answer
- AC2: Course instructor can accept answer on behalf of student
- AC3: Only one answer can be accepted per question
- AC4: AnswerAccepted event is published
- AC5: Answer author receives reputation points
- AC6: Question status changes to "Answered"

#### REQ-QNA-010: Unaccept Answer [Phase 2]
The system SHALL allow removing accepted status from answers.

**Acceptance Criteria:**
- AC1: Question author can unaccept previously accepted answer
- AC2: Course instructor can unaccept answers
- AC3: AnswerUnaccepted event is published
- AC4: Reputation points adjustment is made
- AC5: Question status reverts to previous state

### 2.3 Voting System

#### REQ-QNA-011: Vote on Question [Phase 2]
The system SHALL allow users to vote on questions.

**Acceptance Criteria:**
- AC1: User can upvote or downvote a question
- AC2: User cannot vote on their own question
- AC3: User can change their vote
- AC4: QuestionVoted event is published
- AC5: Question vote score is updated
- AC6: Question author receives reputation points

#### REQ-QNA-012: Vote on Answer [Phase 2]
The system SHALL allow users to vote on answers.

**Acceptance Criteria:**
- AC1: User can upvote or downvote an answer
- AC2: User cannot vote on their own answer
- AC3: User can change their vote
- AC4: AnswerVoted event is published
- AC5: Answer vote score is updated
- AC6: Answer author receives reputation points

#### REQ-QNA-013: Vote Fraud Prevention [Phase 2]
The system SHALL prevent vote manipulation.

**Acceptance Criteria:**
- AC1: One vote per user per question/answer
- AC2: Rate limiting on vote changes
- AC3: Suspicious voting patterns are flagged
- AC4: VoteFraudDetected event is published for review
- AC5: Serial voting is prevented

### 2.4 Comment Management

#### REQ-QNA-014: Add Comment [Phase 2]
The system SHALL allow users to add comments to questions and answers.

**Acceptance Criteria:**
- AC1: User can add comment to question or answer
- AC2: Comment body supports basic markdown
- AC3: Maximum 500 characters per comment
- AC4: CommentAdded event is published
- AC5: Parent author receives notification
- AC6: Comments are ordered chronologically

#### REQ-QNA-015: Edit Comment [Phase 2]
The system SHALL allow comment authors to edit their comments.

**Acceptance Criteria:**
- AC1: Only comment author can edit
- AC2: Edit allowed within 5 minutes of posting
- AC3: Edited indicator is shown
- AC4: CommentUpdated event is published

#### REQ-QNA-016: Delete Comment [Phase 2]
The system SHALL allow authorized users to delete comments.

**Acceptance Criteria:**
- AC1: Comment author can delete their own comment
- AC2: Parent question/answer author can delete comments
- AC3: Course instructor can delete any comment
- AC4: Administrators can delete any comment
- AC5: CommentDeleted event is published

### 2.5 Following & Notifications

#### REQ-QNA-017: Follow Question [Phase 2]
The system SHALL allow users to follow questions.

**Acceptance Criteria:**
- AC1: User can follow/unfollow any question
- AC2: Question author automatically follows their question
- AC3: QuestionFollowed/QuestionUnfollowed events are published
- AC4: Follower count is updated
- AC5: Followers receive notifications for answers and comments

#### REQ-QNA-018: Notification Preferences [Phase 2]
The system SHALL allow users to configure notification preferences.

**Acceptance Criteria:**
- AC1: User can set notification frequency (instant, daily digest, off)
- AC2: User can mute specific questions
- AC3: User can enable/disable email notifications
- AC4: NotificationPreferencesUpdated event is published

### 2.6 Moderation

#### REQ-QNA-019: Flag Content [Phase 2]
The system SHALL allow users to flag inappropriate content.

**Acceptance Criteria:**
- AC1: User can flag question, answer, or comment
- AC2: Flag reason must be provided (spam, offensive, duplicate, etc.)
- AC3: ContentFlagged event is published
- AC4: Moderators receive notification
- AC5: Multiple flags trigger automatic review

#### REQ-QNA-020: Review Flagged Content [Phase 2]
The system SHALL allow moderators to review flagged content.

**Acceptance Criteria:**
- AC1: Moderators can view all flagged content
- AC2: Moderators can approve, remove, or escalate flags
- AC3: ContentReviewed event is published
- AC4: Reporter receives notification of action taken
- AC5: Content author receives notification if content removed

#### REQ-QNA-021: Pin Question [Phase 2]
The system SHALL allow instructors to pin important questions.

**Acceptance Criteria:**
- AC1: Course instructor can pin questions to top
- AC2: Maximum 3 pinned questions per course
- AC3: QuestionPinned/QuestionUnpinned events are published
- AC4: Pinned questions appear first in course Q&A

#### REQ-QNA-022: Lock Question [Phase 2]
The system SHALL allow moderators to lock questions.

**Acceptance Criteria:**
- AC1: Instructors and administrators can lock questions
- AC2: Locked questions cannot receive new answers or comments
- AC3: QuestionLocked/QuestionUnlocked events are published
- AC4: Lock reason is displayed to users

### 2.7 Reputation System

#### REQ-QNA-023: Reputation Points [Phase 3]
The system SHALL track user reputation based on Q&A activity.

**Acceptance Criteria:**
- AC1: Question upvote: +5 points
- AC2: Question downvote: -2 points
- AC3: Answer upvote: +10 points
- AC4: Answer downvote: -2 points
- AC5: Accepted answer: +15 points
- AC6: ReputationChanged event is published

#### REQ-QNA-024: Reputation Badges [Phase 3]
The system SHALL award badges based on reputation milestones.

**Acceptance Criteria:**
- AC1: Bronze badge at 100 reputation
- AC2: Silver badge at 500 reputation
- AC3: Gold badge at 1000 reputation
- AC4: BadgeAwarded event is published
- AC5: Badges are displayed on user profile

---

## 3. Domain Model

### 3.1 Entities

| Entity | Description |
|--------|-------------|
| Question | User-posted question within a course |
| Answer | Response to a question |
| Comment | Brief comment on question or answer |
| Vote | Upvote or downvote on question or answer |
| QuestionFollower | User following a question for updates |
| Flag | Report of inappropriate content |
| Tag | Categorization label for questions |

### 3.2 Domain Events

| Event | Trigger |
|-------|---------|
| QuestionPosted | New question created |
| QuestionUpdated | Question edited |
| QuestionDeleted | Question removed |
| QuestionPinned | Question pinned by instructor |
| QuestionUnpinned | Question unpinned |
| QuestionLocked | Question locked from new content |
| QuestionUnlocked | Question reopened |
| QuestionFollowed | User starts following question |
| QuestionUnfollowed | User stops following question |
| QuestionVoted | Vote cast on question |
| AnswerPosted | New answer added |
| AnswerUpdated | Answer edited |
| AnswerDeleted | Answer removed |
| AnswerAccepted | Answer marked as accepted solution |
| AnswerUnaccepted | Accepted status removed |
| AnswerVoted | Vote cast on answer |
| CommentAdded | New comment posted |
| CommentUpdated | Comment edited |
| CommentDeleted | Comment removed |
| ContentFlagged | Content reported by user |
| ContentReviewed | Moderator reviewed flagged content |
| ReputationChanged | User reputation updated |
| BadgeAwarded | User earned reputation badge |
| NotificationPreferencesUpdated | User changed notification settings |
| VoteFraudDetected | Suspicious voting pattern identified |

---

## 4. API Endpoints

### 4.1 Questions

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/courses/{courseId}/questions | Create question |
| GET | /api/courses/{courseId}/questions | List questions in course |
| GET | /api/questions/{id} | Get question details |
| PUT | /api/questions/{id} | Update question |
| DELETE | /api/questions/{id} | Delete question |
| GET | /api/questions/search | Search questions |
| POST | /api/questions/{id}/follow | Follow question |
| DELETE | /api/questions/{id}/follow | Unfollow question |
| POST | /api/questions/{id}/pin | Pin question |
| DELETE | /api/questions/{id}/pin | Unpin question |
| POST | /api/questions/{id}/lock | Lock question |
| DELETE | /api/questions/{id}/lock | Unlock question |

### 4.2 Answers

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/questions/{questionId}/answers | Post answer |
| GET | /api/questions/{questionId}/answers | List answers |
| GET | /api/answers/{id} | Get answer details |
| PUT | /api/answers/{id} | Update answer |
| DELETE | /api/answers/{id} | Delete answer |
| POST | /api/answers/{id}/accept | Accept answer |
| DELETE | /api/answers/{id}/accept | Unaccept answer |

### 4.3 Voting

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/questions/{id}/vote | Vote on question |
| DELETE | /api/questions/{id}/vote | Remove vote |
| POST | /api/answers/{id}/vote | Vote on answer |
| DELETE | /api/answers/{id}/vote | Remove vote |

### 4.4 Comments

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/questions/{questionId}/comments | Add comment to question |
| POST | /api/answers/{answerId}/comments | Add comment to answer |
| GET | /api/questions/{questionId}/comments | List question comments |
| GET | /api/answers/{answerId}/comments | List answer comments |
| PUT | /api/comments/{id} | Update comment |
| DELETE | /api/comments/{id} | Delete comment |

### 4.5 Moderation

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/questions/{id}/flag | Flag question |
| POST | /api/answers/{id}/flag | Flag answer |
| POST | /api/comments/{id}/flag | Flag comment |
| GET | /api/moderation/flags | List flagged content |
| PUT | /api/moderation/flags/{id} | Review flag |

### 4.6 Reputation

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/users/{userId}/reputation | Get user reputation |
| GET | /api/users/{userId}/badges | Get user badges |

---

## 5. Business Rules

### 5.1 Voting Rules
- Users cannot vote on their own content
- Reputation threshold of 15 required to downvote
- Vote changes allowed unlimited times but rate-limited
- Serial voting (multiple votes on same user's content) is detected and reversed

### 5.2 Answer Acceptance
- Only one answer can be accepted per question
- Question author or course instructor can accept answers
- Accepted answers appear at the top of answer list
- Acceptance can be changed to different answer

### 5.3 Content Editing
- Questions editable within 24 hours or if no answers exist
- Answers editable anytime by author
- Comments editable within 5 minutes only
- Edit history is maintained for questions and answers

### 5.4 Reputation Scoring
- Question upvote: +5 points to author
- Question downvote: -2 points to author
- Answer upvote: +10 points to author
- Answer downvote: -2 points to author
- Answer accepted: +15 points to author
- Downvoting costs voter -1 point

---

## 6. Security Considerations

- All Q&A content MUST respect course enrollment status
- Users MUST be enrolled in course to post questions/answers
- Deleted content MUST be soft-deleted for audit trail
- Voting MUST be rate-limited to prevent abuse
- Flagged content MUST be reviewed within 24 hours
- User reputation MUST be protected from manipulation

---

## 7. Dependencies

- Serilog for structured logging
- MediatR for CQRS pattern
- Entity Framework Core for data access
- FluentValidation for request validation
- Markdown parser for content rendering
- Full-text search engine integration

---

## 8. Implementation Notes

Per the implementation specification (REQ-SYS-005, REQ-SYS-006), all data access SHALL use ICoursesPlatformContext directly without repository pattern.

All Q&A operations MUST verify user enrollment in the associated course before allowing access.

---

*Document Version: 1.0*
*Phase Coverage: 2-3*
