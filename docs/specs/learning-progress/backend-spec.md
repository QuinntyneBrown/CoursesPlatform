# Learning Progress - Backend Specification

**Feature:** Learning Progress
**Version:** 1.0
**Last Updated:** December 2024

---

## 1. Overview

The Learning Progress feature provides comprehensive tracking of user learning activities including course enrollment, video playback, lecture completion, section progress, and bookmarks/notes management for the CoursesPlatform system.

---

## 2. Requirements

### 2.1 Course Progress

#### REQ-LRN-001: Course Enrollment [Phase 1]
The system SHALL track when a user enrolls in a course.

**Acceptance Criteria:**
- AC1: User can enroll in a course
- AC2: System creates CourseProgress record with NotStarted status
- AC3: EnrollmentDate is recorded
- AC4: CourseEnrolled event is published
- AC5: User can view enrolled courses list
- AC6: Duplicate enrollments are prevented

#### REQ-LRN-002: Course Start Tracking [Phase 1]
The system SHALL track when a user starts a course.

**Acceptance Criteria:**
- AC1: Status changes from NotStarted to InProgress when first lecture is accessed
- AC2: FirstAccessedAt timestamp is recorded
- AC3: CourseStarted event is published
- AC4: Progress percentage is initialized to 0%

#### REQ-LRN-003: Course Progress Calculation [Phase 1]
The system SHALL calculate course completion progress as a percentage.

**Acceptance Criteria:**
- AC1: Progress is calculated as (completed lectures / total lectures) * 100
- AC2: Progress is updated when any lecture is completed
- AC3: CourseProgressUpdated event is published on progress change
- AC4: Progress percentage is stored with 2 decimal precision

#### REQ-LRN-004: Course Completion [Phase 1]
The system SHALL mark a course as completed when all lectures are finished.

**Acceptance Criteria:**
- AC1: Status changes to Completed when progress reaches 100%
- AC2: CompletedAt timestamp is recorded
- AC3: CourseCompleted event is published
- AC4: Certificate eligibility is evaluated
- AC5: Completion is idempotent (can be recalculated)

#### REQ-LRN-005: Course Unenrollment [Phase 1]
The system SHALL allow users to unenroll from courses.

**Acceptance Criteria:**
- AC1: User can unenroll from NotStarted or InProgress courses
- AC2: Progress data is retained for 30 days
- AC3: CourseUnenrolled event is published
- AC4: Completed courses cannot be unenrolled
- AC5: Re-enrollment restores previous progress if within 30 days

### 2.2 Lecture Progress

#### REQ-LRN-006: Lecture Start Tracking [Phase 1]
The system SHALL track when a user starts watching a lecture.

**Acceptance Criteria:**
- AC1: LectureProgress record is created on first access
- AC2: Status is set to InProgress
- AC3: FirstAccessedAt timestamp is recorded
- AC4: LectureStarted event is published
- AC5: Parent section and course progress are updated

#### REQ-LRN-007: Lecture Completion Tracking [Phase 1]
The system SHALL mark lectures as completed when viewing criteria is met.

**Acceptance Criteria:**
- AC1: Lecture is marked complete when 90% of video duration is watched
- AC2: Status changes to Completed
- AC3: CompletedAt timestamp is recorded
- AC4: LectureCompleted event is published
- AC5: Course and section progress percentages are updated
- AC6: User can manually mark lecture as complete

#### REQ-LRN-008: Lecture Reopening [Phase 1]
The system SHALL allow users to rewatch completed lectures.

**Acceptance Criteria:**
- AC1: Completed lectures remain accessible
- AC2: Video position resets to 0 when reopened
- AC3: Completion status is retained
- AC4: LectureReopened event is published

#### REQ-LRN-009: Lecture Time Tracking [Phase 1]
The system SHALL track total time spent on each lecture.

**Acceptance Criteria:**
- AC1: TimeSpentSeconds is accumulated across sessions
- AC2: Time tracking pauses when video is paused
- AC3: Time tracking stops when video is stopped
- AC4: Maximum time per session is capped at video duration
- AC5: LectureTimeUpdated event is published periodically

### 2.3 Video Progress

#### REQ-LRN-010: Video Position Tracking [Phase 1]
The system SHALL track the current playback position for each lecture video.

**Acceptance Criteria:**
- AC1: LastPosition is saved every 5 seconds during playback
- AC2: Position is stored in seconds with 2 decimal precision
- AC3: VideoPositionUpdated event is published
- AC4: Position is retrieved when video is resumed
- AC5: Position resets to 0 when video completes

#### REQ-LRN-011: Video Watch Time Tracking [Phase 1]
The system SHALL track total watch time for each video.

**Acceptance Criteria:**
- AC1: WatchTimeSeconds accumulates actual viewing time
- AC2: Fast-forward does not count as watch time
- AC3: Rewind does not duplicate watch time
- AC4: Watch time can exceed video duration for rewatched segments
- AC5: VideoWatchTimeUpdated event is published

#### REQ-LRN-012: Video Completion Percentage [Phase 1]
The system SHALL calculate how much of a video has been watched.

**Acceptance Criteria:**
- AC1: CompletionPercentage = (LastPosition / VideoDuration) * 100
- AC2: Percentage is updated on position change
- AC3: Percentage caps at 100%
- AC4: Percentage is stored with 2 decimal precision

#### REQ-LRN-013: Video Playback Speed Tracking [Phase 1]
The system SHALL track the user's preferred playback speed for videos.

**Acceptance Criteria:**
- AC1: PlaybackSpeed is stored (0.5x to 2.0x range)
- AC2: Last used speed is remembered per lecture
- AC3: PlaybackSpeedChanged event is published
- AC4: Default speed is 1.0x for new lectures

#### REQ-LRN-014: Video Quality Preference [Phase 1]
The system SHALL track the user's preferred video quality setting.

**Acceptance Criteria:**
- AC1: PreferredQuality is stored (360p, 480p, 720p, 1080p, Auto)
- AC2: Quality preference is remembered per user
- AC3: VideoQualityChanged event is published
- AC4: Default quality is Auto for new users

### 2.4 Section Progress

#### REQ-LRN-015: Section Progress Calculation [Phase 1]
The system SHALL calculate section completion progress.

**Acceptance Criteria:**
- AC1: Progress = (completed lectures in section / total lectures in section) * 100
- AC2: Progress updates when any lecture in section changes status
- AC3: SectionProgressUpdated event is published
- AC4: Progress is stored with 2 decimal precision

#### REQ-LRN-016: Section Completion [Phase 1]
The system SHALL mark sections as completed when all lectures are finished.

**Acceptance Criteria:**
- AC1: Status changes to Completed when progress reaches 100%
- AC2: CompletedAt timestamp is recorded
- AC3: SectionCompleted event is published
- AC4: Course progress is recalculated
- AC5: Next section is unlocked if sequential access is required

### 2.5 Bookmarks & Notes

#### REQ-LRN-017: Bookmark Creation [Phase 2]
The system SHALL allow users to create bookmarks at specific video timestamps.

**Acceptance Criteria:**
- AC1: User can create bookmark with timestamp and title
- AC2: BookmarkId is generated
- AC3: BookmarkCreated event is published
- AC4: Bookmark includes lecture and course references
- AC5: Maximum 50 bookmarks per lecture

#### REQ-LRN-018: Bookmark Management [Phase 2]
The system SHALL allow users to view, update, and delete bookmarks.

**Acceptance Criteria:**
- AC1: User can list all bookmarks for a lecture
- AC2: User can update bookmark title
- AC3: User can delete bookmark
- AC4: BookmarkUpdated event is published on update
- AC5: BookmarkDeleted event is published on deletion
- AC6: Deleted bookmarks are soft-deleted for 30 days

#### REQ-LRN-019: Bookmark Navigation [Phase 2]
The system SHALL allow users to jump to bookmarked positions in videos.

**Acceptance Criteria:**
- AC1: Clicking bookmark navigates to timestamp
- AC2: BookmarkAccessed event is published
- AC3: AccessCount is incremented for bookmark
- AC4: LastAccessedAt is updated

#### REQ-LRN-020: Note Creation [Phase 2]
The system SHALL allow users to create notes for lectures.

**Acceptance Criteria:**
- AC1: User can create note with content and optional timestamp
- AC2: Notes support rich text formatting (markdown)
- AC3: NoteCreated event is published
- AC4: Note includes lecture and course references
- AC5: Maximum 100 notes per lecture
- AC6: Content length limited to 10,000 characters

#### REQ-LRN-021: Note Management [Phase 2]
The system SHALL allow users to view, update, and delete notes.

**Acceptance Criteria:**
- AC1: User can list all notes for a lecture
- AC2: User can update note content and title
- AC3: User can delete note
- AC4: NoteUpdated event is published on update
- AC5: NoteDeleted event is published on deletion
- AC6: Note version history is maintained
- AC7: Deleted notes are soft-deleted for 30 days

#### REQ-LRN-022: Note Search [Phase 2]
The system SHALL allow users to search notes across all courses.

**Acceptance Criteria:**
- AC1: User can search notes by keyword
- AC2: Search includes note title and content
- AC3: Results are ranked by relevance
- AC4: Results include course and lecture context
- AC5: NoteSearchPerformed event is published

#### REQ-LRN-023: Note Export [Phase 2]
The system SHALL allow users to export notes.

**Acceptance Criteria:**
- AC1: User can export notes for a lecture, course, or all courses
- AC2: Export formats include PDF and Markdown
- AC3: NoteExported event is published
- AC4: Export includes course and lecture metadata

---

## 3. Domain Model

### 3.1 Entities

| Entity | Description |
|--------|-------------|
| CourseProgress | Tracks user progress through an entire course |
| SectionProgress | Tracks user progress through a course section |
| LectureProgress | Tracks user progress through an individual lecture |
| VideoProgress | Tracks video playback position and watch time |
| Bookmark | User-created bookmark at a video timestamp |
| Note | User-created note for a lecture |

### 3.2 Domain Events

| Event | Trigger |
|-------|---------|
| CourseEnrolled | User enrolls in a course |
| CourseStarted | User accesses first lecture of a course |
| CourseProgressUpdated | Course progress percentage changes |
| CourseCompleted | All lectures in course are completed |
| CourseUnenrolled | User unenrolls from a course |
| SectionProgressUpdated | Section progress percentage changes |
| SectionCompleted | All lectures in section are completed |
| LectureStarted | User accesses a lecture for the first time |
| LectureCompleted | Lecture viewing criteria is met |
| LectureReopened | User reopens a completed lecture |
| LectureTimeUpdated | Time spent on lecture is updated |
| VideoPositionUpdated | Video playback position is saved |
| VideoWatchTimeUpdated | Video watch time is updated |
| PlaybackSpeedChanged | User changes video playback speed |
| VideoQualityChanged | User changes video quality setting |
| BookmarkCreated | User creates a bookmark |
| BookmarkUpdated | Bookmark is modified |
| BookmarkDeleted | Bookmark is removed |
| BookmarkAccessed | User navigates to a bookmark |
| NoteCreated | User creates a note |
| NoteUpdated | Note is modified |
| NoteDeleted | Note is removed |
| NoteSearchPerformed | User searches notes |
| NoteExported | User exports notes |

---

## 4. API Endpoints

### 4.1 Course Progress

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/courses/{courseId}/enroll | Enroll in a course |
| DELETE | /api/courses/{courseId}/enrollment | Unenroll from a course |
| GET | /api/users/me/course-progress | Get all course progress |
| GET | /api/courses/{courseId}/progress | Get specific course progress |
| PUT | /api/courses/{courseId}/complete | Mark course as complete |

### 4.2 Lecture Progress

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/lectures/{lectureId}/progress | Get lecture progress |
| PUT | /api/lectures/{lectureId}/start | Mark lecture as started |
| PUT | /api/lectures/{lectureId}/complete | Mark lecture as completed |
| PUT | /api/lectures/{lectureId}/time | Update time spent |

### 4.3 Video Progress

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/lectures/{lectureId}/video/progress | Get video progress |
| PUT | /api/lectures/{lectureId}/video/position | Update playback position |
| PUT | /api/lectures/{lectureId}/video/speed | Update playback speed |
| PUT | /api/lectures/{lectureId}/video/quality | Update video quality |

### 4.4 Section Progress

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/sections/{sectionId}/progress | Get section progress |
| GET | /api/courses/{courseId}/sections/progress | Get all section progress |

### 4.5 Bookmarks

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/lectures/{lectureId}/bookmarks | Create bookmark |
| GET | /api/lectures/{lectureId}/bookmarks | List lecture bookmarks |
| GET | /api/users/me/bookmarks | List all user bookmarks |
| PUT | /api/bookmarks/{bookmarkId} | Update bookmark |
| DELETE | /api/bookmarks/{bookmarkId} | Delete bookmark |

### 4.6 Notes

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/lectures/{lectureId}/notes | Create note |
| GET | /api/lectures/{lectureId}/notes | List lecture notes |
| GET | /api/users/me/notes | List all user notes |
| PUT | /api/notes/{noteId} | Update note |
| DELETE | /api/notes/{noteId} | Delete note |
| GET | /api/notes/search | Search notes |
| POST | /api/notes/export | Export notes |

---

## 5. Business Rules

### 5.1 Progress Calculation
- Course progress is based on lecture completion, not video watch time
- A lecture is considered complete when 90% of video duration is watched OR manually marked complete
- Section progress updates automatically when lecture status changes
- Progress percentages are rounded to 2 decimal places

### 5.2 Enrollment Rules
- Users cannot enroll in a course twice simultaneously
- Unenrollment is only allowed for NotStarted or InProgress courses
- Unenrolled course data is retained for 30 days for re-enrollment
- Re-enrollment within 30 days restores previous progress

### 5.3 Completion Rules
- Lectures can be completed in any order within a section
- Sections can be completed in any order unless course requires sequential access
- Course completion requires 100% of lectures to be completed
- Completion timestamps are immutable once set

### 5.4 Video Tracking Rules
- Video position is saved every 5 seconds during active playback
- Watch time does not include paused or buffering time
- Fast-forward skips do not count toward watch time
- Playback speed affects real-time but not watch time calculation

### 5.5 Bookmark Rules
- Maximum 50 bookmarks per lecture
- Bookmark timestamps must be within video duration
- Deleted bookmarks are soft-deleted for 30 days
- Bookmark titles are limited to 200 characters

### 5.6 Note Rules
- Maximum 100 notes per lecture
- Note content limited to 10,000 characters
- Notes support markdown formatting
- Deleted notes are soft-deleted for 30 days
- Note version history is maintained for edits

---

## 6. Performance Requirements

- Video position updates SHALL complete within 100ms
- Progress calculation SHALL complete within 500ms
- Bookmark/note creation SHALL complete within 200ms
- Note search SHALL return results within 1 second
- Course progress query SHALL complete within 300ms

---

## 7. Security Considerations

- Users can only access their own progress data
- Progress data is private by default
- Instructors can view aggregate progress statistics
- Administrators can view individual user progress
- All progress modifications require authentication
- Rate limiting applied to progress update endpoints (max 100 requests/minute)

---

## 8. Dependencies

- Serilog for structured logging
- MediatR for CQRS pattern
- Entity Framework Core for data access
- FluentValidation for request validation
- Hangfire for background job processing (progress calculations)

---

## 9. Implementation Notes

Per the implementation specification (REQ-SYS-005, REQ-SYS-006), all data access SHALL use ICoursesPlatformContext directly without repository pattern.

---

*Document Version: 1.0*
*Phase Coverage: 1-2*
