# Learning Progress - Frontend Specification

**Feature:** Learning Progress
**Version:** 1.0
**Last Updated:** December 2024

---

## 1. Overview

The Learning Progress frontend provides user interfaces for tracking course progress, viewing video lectures, managing bookmarks, and taking notes during learning activities.

---

## 2. Requirements

### 2.1 Course Progress

#### REQ-LRN-FE-001: My Learning Dashboard [Phase 1]
The application SHALL provide a dashboard showing all enrolled courses with progress.

**Acceptance Criteria:**
- AC1: Dashboard displays list of enrolled courses
- AC2: Each course shows progress bar and percentage
- AC3: Courses are filterable by status (NotStarted, InProgress, Completed)
- AC4: Courses are sortable by enrollment date, progress, last accessed
- AC5: Empty state shows "No enrolled courses" message
- AC6: Continue learning button navigates to last accessed lecture

#### REQ-LRN-FE-002: Course Progress Page [Phase 1]
The application SHALL display detailed progress for a specific course.

**Acceptance Criteria:**
- AC1: Page shows course title, description, and overall progress
- AC2: Section list displays with individual progress bars
- AC3: Lecture list shows completion status icons
- AC4: Completed lectures have checkmark indicators
- AC5: Current lecture is highlighted
- AC6: Progress statistics show completed/total lectures

#### REQ-LRN-FE-003: Course Enrollment [Phase 1]
The application SHALL provide course enrollment functionality.

**Acceptance Criteria:**
- AC1: Enroll button is visible on course detail page
- AC2: Enrollment shows confirmation message
- AC3: User is redirected to first lecture after enrollment
- AC4: Already enrolled courses show "Continue Learning" button
- AC5: Loading state during enrollment API call

#### REQ-LRN-FE-004: Course Completion Certificate [Phase 1]
The application SHALL display course completion status and certificate.

**Acceptance Criteria:**
- AC1: Completion badge appears when course is 100% complete
- AC2: Certificate download button is available
- AC3: Completion date is displayed
- AC4: Congratulations message on completion
- AC5: Social sharing options for achievement

### 2.2 Video Player

#### REQ-LRN-FE-005: Video Player Interface [Phase 1]
The application SHALL provide a video player for lecture content.

**Acceptance Criteria:**
- AC1: Video player supports play, pause, stop controls
- AC2: Progress bar shows current position and buffered content
- AC3: Volume control with mute option
- AC4: Fullscreen mode toggle
- AC5: Keyboard shortcuts (space=play/pause, f=fullscreen, m=mute)
- AC6: Player shows loading state while buffering

#### REQ-LRN-FE-006: Video Playback Controls [Phase 1]
The application SHALL provide advanced playback controls.

**Acceptance Criteria:**
- AC1: Playback speed selector (0.5x, 0.75x, 1x, 1.25x, 1.5x, 2x)
- AC2: Skip forward/backward 10 seconds buttons
- AC3: Quality selector (360p, 480p, 720p, 1080p, Auto)
- AC4: Current time and total duration display
- AC5: Remaining time display option
- AC6: Settings persist across lectures

#### REQ-LRN-FE-007: Video Progress Tracking [Phase 1]
The application SHALL automatically track video progress.

**Acceptance Criteria:**
- AC1: Playback position is saved every 5 seconds
- AC2: Video resumes from last position when reopened
- AC3: Progress indicator shows on course/lecture lists
- AC4: Watch time is tracked and displayed
- AC5: Completion percentage is calculated and shown

#### REQ-LRN-FE-008: Video Auto-Advance [Phase 1]
The application SHALL automatically advance to next lecture.

**Acceptance Criteria:**
- AC1: 5-second countdown appears before auto-advance
- AC2: User can cancel auto-advance during countdown
- AC3: Auto-advance preference is toggleable in settings
- AC4: Last lecture in course shows completion message instead

### 2.3 Lecture Navigation

#### REQ-LRN-FE-009: Lecture Sidebar [Phase 1]
The application SHALL display course curriculum in a sidebar.

**Acceptance Criteria:**
- AC1: Sidebar shows sections and lectures in hierarchy
- AC2: Current lecture is highlighted
- AC3: Completed lectures show checkmark icon
- AC4: Locked lectures show lock icon (if sequential access)
- AC5: Clicking lecture navigates to that lecture
- AC6: Sidebar is collapsible on mobile devices

#### REQ-LRN-FE-010: Next/Previous Navigation [Phase 1]
The application SHALL provide navigation between lectures.

**Acceptance Criteria:**
- AC1: Next lecture button at bottom of page
- AC2: Previous lecture button at bottom of page
- AC3: Buttons disabled at course boundaries
- AC4: Keyboard shortcuts (n=next, p=previous)
- AC5: Next button shows next lecture title

#### REQ-LRN-FE-011: Lecture Completion Toggle [Phase 1]
The application SHALL allow manual lecture completion marking.

**Acceptance Criteria:**
- AC1: "Mark as complete" checkbox/button is visible
- AC2: Checkbox state syncs with automatic completion
- AC3: Checking box updates progress immediately
- AC4: Success notification on completion
- AC5: Confetti animation for course completion

### 2.4 Bookmarks

#### REQ-LRN-FE-012: Bookmark Creation [Phase 2]
The application SHALL allow users to create bookmarks during video playback.

**Acceptance Criteria:**
- AC1: Bookmark button in video player controls
- AC2: Clicking opens bookmark creation dialog
- AC3: Dialog shows current timestamp
- AC4: User can enter bookmark title
- AC5: Success notification after creation
- AC6: Bookmark appears in sidebar list

#### REQ-LRN-FE-013: Bookmark List [Phase 2]
The application SHALL display list of bookmarks for current lecture.

**Acceptance Criteria:**
- AC1: Bookmarks panel shows all lecture bookmarks
- AC2: Each bookmark shows timestamp and title
- AC3: Bookmarks are sorted chronologically by timestamp
- AC4: Empty state shows "No bookmarks yet" message
- AC5: Bookmark count is displayed in panel header

#### REQ-LRN-FE-014: Bookmark Navigation [Phase 2]
The application SHALL allow navigation using bookmarks.

**Acceptance Criteria:**
- AC1: Clicking bookmark seeks video to timestamp
- AC2: Current bookmark is highlighted during playback
- AC3: Bookmark markers appear on video progress bar
- AC4: Hover over marker shows bookmark title tooltip

#### REQ-LRN-FE-015: Bookmark Management [Phase 2]
The application SHALL provide bookmark editing and deletion.

**Acceptance Criteria:**
- AC1: Edit button opens bookmark edit dialog
- AC2: User can update bookmark title
- AC3: Delete button with confirmation dialog
- AC4: Success notification after update/delete
- AC5: Keyboard shortcut (b) to create bookmark

### 2.5 Notes

#### REQ-LRN-FE-016: Note Creation [Phase 2]
The application SHALL allow users to create notes for lectures.

**Acceptance Criteria:**
- AC1: Add note button is visible on lecture page
- AC2: Note editor supports markdown formatting
- AC3: Toolbar with formatting options (bold, italic, lists, links)
- AC4: Optional timestamp association with current playback position
- AC5: Auto-save draft while typing
- AC6: Success notification after saving

#### REQ-LRN-FE-017: Note List [Phase 2]
The application SHALL display list of notes for current lecture.

**Acceptance Criteria:**
- AC1: Notes panel shows all lecture notes
- AC2: Each note shows title, preview, and timestamp (if any)
- AC3: Notes are sorted by creation date (newest first)
- AC4: Empty state shows "No notes yet" message
- AC5: Note count is displayed in panel header
- AC6: Notes are filterable by has-timestamp

#### REQ-LRN-FE-018: Note Viewer [Phase 2]
The application SHALL provide a note viewing interface.

**Acceptance Criteria:**
- AC1: Clicking note opens in expanded view
- AC2: Markdown content is rendered with formatting
- AC3: Timestamp link (if present) seeks video to position
- AC4: Edit and delete buttons are visible
- AC5: Created and last updated dates are shown

#### REQ-LRN-FE-019: Note Editor [Phase 2]
The application SHALL provide a rich text editor for notes.

**Acceptance Criteria:**
- AC1: Editor supports markdown syntax
- AC2: Live preview of formatted content
- AC3: Title field with character count (max 200)
- AC4: Content field with character count (max 10,000)
- AC5: Timestamp toggle to link with video position
- AC6: Cancel and save buttons

#### REQ-LRN-FE-020: Note Search [Phase 2]
The application SHALL provide note search functionality.

**Acceptance Criteria:**
- AC1: Search bar in notes section
- AC2: Search across all user notes
- AC3: Results show course and lecture context
- AC4: Search highlights matching keywords
- AC5: Filter by course option
- AC6: Empty state for no search results

#### REQ-LRN-FE-021: Note Export [Phase 2]
The application SHALL allow users to export notes.

**Acceptance Criteria:**
- AC1: Export button in notes section
- AC2: Export options: current lecture, current course, all notes
- AC3: Format options: PDF, Markdown
- AC4: Export includes course/lecture metadata
- AC5: Download starts automatically when ready

### 2.6 Progress Statistics

#### REQ-LRN-FE-022: Learning Statistics Dashboard [Phase 1]
The application SHALL display learning statistics.

**Acceptance Criteria:**
- AC1: Total courses enrolled count
- AC2: Total courses completed count
- AC3: Total learning time (hours)
- AC4: Current streak (consecutive days learning)
- AC5: Progress chart over time
- AC6: Most active courses list

---

## 3. Component Architecture

### 3.1 Pages

| Component | Route | Description |
|-----------|-------|-------------|
| MyLearningPage | /my-learning | Dashboard with enrolled courses |
| CoursePlayerPage | /courses/{id}/learn | Video player and course content |
| CourseProgressPage | /courses/{id}/progress | Detailed progress view |
| NotesPage | /notes | All user notes across courses |
| LearningStatsPage | /stats | Learning statistics and insights |

### 3.2 Components

| Component | Description |
|-----------|-------------|
| VideoPlayer | Custom video player with controls |
| CourseProgressCard | Course card with progress bar |
| LectureSidebar | Course curriculum navigation |
| BookmarkPanel | Bookmarks list and management |
| NotePanel | Notes list and management |
| NoteEditor | Rich text editor for notes |
| ProgressBar | Reusable progress indicator |
| CompletionBadge | Course completion indicator |
| LectureListItem | Individual lecture in curriculum |
| SectionAccordion | Collapsible section container |

### 3.3 Services

| Service | Description |
|---------|-------------|
| ProgressService | Course/lecture progress API calls |
| VideoService | Video playback and tracking API calls |
| BookmarkService | Bookmark CRUD operations |
| NoteService | Note CRUD and search operations |
| VideoPlayerService | Video player state management |

---

## 4. State Management

Per REQ-FE-009, state management SHALL use RxJS (not NgRx or Signals).

### 4.1 Course Progress State

```typescript
interface CourseProgressState {
  enrolledCourses: CourseProgress[];
  currentCourse: CourseProgress | null;
  sections: SectionProgress[];
  isLoading: boolean;
  error: string | null;
}
```

### 4.2 Video Player State

```typescript
interface VideoPlayerState {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  playbackSpeed: number;
  quality: VideoQuality;
  isFullscreen: boolean;
  buffered: number;
}
```

### 4.3 Lecture State

```typescript
interface LectureState {
  currentLecture: Lecture | null;
  progress: LectureProgress | null;
  bookmarks: Bookmark[];
  notes: Note[];
  isLoading: boolean;
}
```

---

## 5. UI/UX Requirements

### 5.1 Design System

Per REQ-FE-006 and REQ-FE-010, the application SHALL use Angular Material with Material 3 guidelines and default theme colors.

### 5.2 Video Player Design

- Player controls fade out after 3 seconds of inactivity
- Controls reappear on mouse movement or tap
- Progress bar highlights on hover with timestamp tooltip
- Buffering spinner overlay during loading
- Error state with retry button for playback failures

### 5.3 Progress Visualization

- Circular progress indicators for overall course completion
- Linear progress bars for section/lecture progress
- Green checkmarks for completed items
- Blue indicators for in-progress items
- Gray indicators for not-started items

### 5.4 Responsive Design

Per REQ-FE-018, all pages SHALL be responsive and follow mobile-first design:
- Mobile: Single column, collapsible sidebar, floating player controls
- Tablet: Two column with sidebar, integrated player controls
- Desktop: Three column layout (sidebar, player, notes/bookmarks)

### 5.5 Accessibility

- Video player controls are keyboard accessible
- Screen reader announcements for progress updates
- ARIA labels for all interactive elements
- High contrast mode support
- Focus indicators visible throughout

### 5.6 Component Naming

Per REQ-FE-012 and REQ-FE-013:
- Class names SHALL NOT have "Component" suffix
- File names SHALL NOT have "component" prefix

---

## 6. Interactions

### 6.1 Video Player Interactions

- Click video to toggle play/pause
- Click progress bar to seek to position
- Drag volume slider to adjust volume
- Double-click video for fullscreen
- Hover progress bar to show timestamp preview

### 6.2 Bookmark Interactions

- Click bookmark in list to seek video
- Drag bookmark to reorder (optional)
- Swipe to delete on mobile
- Long press for edit menu on mobile

### 6.3 Note Interactions

- Auto-save every 2 seconds while typing
- Ctrl+B for bold, Ctrl+I for italic (markdown shortcuts)
- Click timestamp chip to seek video
- Expand/collapse notes in list view

---

## 7. Error Handling

### 7.1 API Errors

| Error Code | User Message |
|------------|--------------|
| 401 | Please log in to continue learning. |
| 403 | You don't have access to this course. |
| 404 | Course or lecture not found. |
| 409 | Already enrolled in this course. |
| 429 | Too many requests. Please wait. |
| 500 | Something went wrong. Please try again. |

### 7.2 Video Playback Errors

- Network error: "Connection lost. Retrying..."
- Format not supported: "This video format is not supported."
- Video not found: "Video unavailable. Please contact support."

### 7.3 Validation Errors

- Empty bookmark title: "Bookmark title cannot be empty"
- Note too long: "Note exceeds maximum length of 10,000 characters"
- Too many bookmarks: "Maximum 50 bookmarks per lecture reached"

---

## 8. Performance Optimization

### 8.1 Video Loading

- Progressive loading with adaptive bitrate streaming
- Preload next lecture video in background
- Lazy load video thumbnails in course list
- Cache video quality and speed preferences

### 8.2 Data Loading

- Infinite scroll for notes list
- Virtual scrolling for long course curricula
- Debounce progress updates (5 seconds)
- Cache course progress data locally

### 8.3 Rendering

- Virtual scrolling for lecture lists with 100+ items
- Lazy load bookmark/note panels until opened
- Optimize re-renders with change detection strategy

---

## 9. Testing Requirements

### 9.1 Unit Tests (Jest)

Per REQ-FE-021, unit tests SHALL use Jest:
- Test video player state management
- Test progress calculation logic
- Test bookmark/note CRUD operations
- Test service API calls with mocks
- Minimum 80% code coverage

### 9.2 E2E Tests (Playwright)

Per REQ-FE-022, E2E tests SHALL use Playwright:
- Test complete course enrollment flow
- Test video playback and progress tracking
- Test bookmark creation and navigation
- Test note creation and editing
- Test course completion flow

---

## 10. Implementation Notes

### 10.1 API Base URL

Per REQ-FE-026, the baseUrl configuration SHALL contain ONLY the base URI:
```typescript
// Correct
baseUrl = "http://localhost:7200"
this.http.get(`${baseUrl}/api/courses/{id}/progress`)

// Incorrect
baseUrl = "http://localhost:7200/api"
```

### 10.2 File Structure

Per REQ-FE-015 and REQ-FE-016:
- Pages in `pages/` folder
- Reusable components in `components/` folder
- Barrel exports in each folder

### 10.3 Video Player

- Use HTML5 video element as base
- Consider integrating video.js or plyr.io for advanced features
- Implement custom controls overlay for brand consistency

---

*Document Version: 1.0*
*Phase Coverage: 1-2*
