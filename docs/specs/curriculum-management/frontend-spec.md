# Curriculum Management - Frontend Specification

**Feature:** Curriculum Management
**Version:** 1.0
**Last Updated:** December 2024

---

## 1. Overview

The Curriculum Management frontend provides user interfaces for instructors to create, organize, and manage course curriculum including sections, lectures, videos, articles, and resources.

---

## 2. Requirements

### 2.1 Section Management UI

#### REQ-CUR-FE-001: Curriculum Builder Page [Phase 1]
The application SHALL provide a curriculum builder page for course structure management.

**Acceptance Criteria:**
- AC1: Page displays hierarchical list of sections and lectures
- AC2: Drag-and-drop interface for reordering
- AC3: Add section button creates new section inline
- AC4: Expand/collapse sections for better organization
- AC5: Visual indicators for published/draft status
- AC6: Bulk actions available (publish, delete multiple items)

#### REQ-CUR-FE-002: Section Creation Form [Phase 1]
The application SHALL provide a section creation interface.

**Acceptance Criteria:**
- AC1: Inline form displays with title input field
- AC2: Optional learning objectives text area
- AC3: Save button creates section
- AC4: Cancel button discards changes
- AC5: Validation shows error for empty title
- AC6: Success notification on creation

#### REQ-CUR-FE-003: Section Edit Interface [Phase 1]
The application SHALL provide section editing functionality.

**Acceptance Criteria:**
- AC1: Click section title to edit inline
- AC2: Title field auto-focuses on edit mode
- AC3: Save/cancel buttons appear in edit mode
- AC4: ESC key cancels edit
- AC5: Enter key saves changes
- AC6: Validation prevents empty title

#### REQ-CUR-FE-004: Section Actions Menu [Phase 1]
The application SHALL provide section action menu.

**Acceptance Criteria:**
- AC1: Three-dot menu shows actions
- AC2: Edit, Delete, Publish/Unpublish options
- AC3: Add Lecture option
- AC4: Confirmation dialog for delete action
- AC5: Disabled delete if section contains lectures
- AC6: Status badge shows published/draft state

### 2.2 Lecture Management UI

#### REQ-CUR-FE-005: Lecture Creation Modal [Phase 1]
The application SHALL provide a lecture creation dialog.

**Acceptance Criteria:**
- AC1: Modal displays lecture type selection (Video, Article, Quiz)
- AC2: Title input field with validation
- AC3: Description textarea with markdown support
- AC4: Preview checkbox for free preview
- AC5: Create button validates and saves
- AC6: Cancel button closes modal

#### REQ-CUR-FE-006: Lecture List Item [Phase 1]
The application SHALL display lectures in expandable list items.

**Acceptance Criteria:**
- AC1: Shows lecture icon based on type
- AC2: Displays title, duration/read time
- AC3: Status badge (Draft, Published, Processing)
- AC4: Drag handle for reordering
- AC5: Action menu (Edit, Delete, Move, Publish)
- AC6: Expand to show lecture details

#### REQ-CUR-FE-007: Lecture Details Panel [Phase 1]
The application SHALL provide expandable lecture details.

**Acceptance Criteria:**
- AC1: Shows lecture metadata (type, duration, status)
- AC2: Displays description with markdown rendering
- AC3: Content management section based on type
- AC4: Resources list with upload button
- AC5: Quick actions (Edit, Delete, Publish)
- AC6: Preview button to view as student

#### REQ-CUR-FE-008: Move Lecture Dialog [Phase 1]
The application SHALL provide lecture move functionality.

**Acceptance Criteria:**
- AC1: Modal displays list of sections
- AC2: Current section is highlighted
- AC3: Cannot select current section
- AC4: Move button updates lecture position
- AC5: Confirmation message on success
- AC6: Lecture appears at end of target section

### 2.3 Video Content UI

#### REQ-CUR-FE-009: Video Upload Interface [Phase 2]
The application SHALL provide video upload functionality.

**Acceptance Criteria:**
- AC1: Drag-and-drop or click to browse
- AC2: File type validation (MP4, MOV, AVI, WebM)
- AC3: File size validation (max 5GB)
- AC4: Upload progress bar with percentage
- AC5: Cancel upload button
- AC6: Success message on upload completion

#### REQ-CUR-FE-010: Video Processing Status [Phase 2]
The application SHALL display video processing status.

**Acceptance Criteria:**
- AC1: Status indicator shows processing state
- AC2: Progress bar for transcoding progress
- AC3: Estimated time remaining
- AC4: Error message if processing fails
- AC5: Retry button for failed processing
- AC6: Notification when processing completes

#### REQ-CUR-FE-011: Video Player Preview [Phase 2]
The application SHALL provide video preview player.

**Acceptance Criteria:**
- AC1: Video player with standard controls
- AC2: Quality selector for different resolutions
- AC3: Playback speed control
- AC4: Fullscreen mode
- AC5: Current time and duration display
- AC6: Volume control

#### REQ-CUR-FE-012: Video Replace Interface [Phase 2]
The application SHALL allow video replacement.

**Acceptance Criteria:**
- AC1: Replace button opens upload dialog
- AC2: Warning message about replacing existing video
- AC3: Upload progress for new video
- AC4: Old video remains until processing completes
- AC5: Success notification on replacement
- AC6: Processing status for new video

### 2.4 Caption Management UI

#### REQ-CUR-FE-013: Caption Upload Interface [Phase 3]
The application SHALL provide caption file upload.

**Acceptance Criteria:**
- AC1: Upload button for caption files
- AC2: Language selector dropdown
- AC3: File type validation (VTT, SRT, SBV)
- AC4: File size validation (max 5MB)
- AC5: Upload progress indicator
- AC6: Success notification with preview

#### REQ-CUR-FE-014: Caption Editor [Phase 3]
The application SHALL provide caption editing interface.

**Acceptance Criteria:**
- AC1: List of caption entries with timestamps
- AC2: Inline editing of caption text
- AC3: Timestamp editing with validation
- AC4: Add/delete caption entries
- AC5: Video preview synced with captions
- AC6: Auto-save with save indicator

#### REQ-CUR-FE-015: Auto-Generate Captions [Phase 3]
The application SHALL provide auto-caption generation.

**Acceptance Criteria:**
- AC1: Generate captions button
- AC2: Language selection for generation
- AC3: Progress indicator during generation
- AC4: Preview generated captions
- AC5: Edit generated captions
- AC6: Error message if generation fails

#### REQ-CUR-FE-016: Caption Language Management [Phase 3]
The application SHALL display multiple caption languages.

**Acceptance Criteria:**
- AC1: List shows all available caption languages
- AC2: Primary language is highlighted
- AC3: Add language button
- AC4: Delete language confirmation
- AC5: Edit/preview buttons per language
- AC6: Download button for caption file

### 2.5 Article Content UI

#### REQ-CUR-FE-017: Article Editor [Phase 2]
The application SHALL provide rich text article editor.

**Acceptance Criteria:**
- AC1: Markdown editor with toolbar
- AC2: Preview mode toggle
- AC3: Split view (edit and preview side-by-side)
- AC4: Auto-save every 30 seconds
- AC5: Save indicator (saving/saved)
- AC6: Character count display

#### REQ-CUR-FE-018: Article Formatting Toolbar [Phase 2]
The application SHALL provide formatting toolbar.

**Acceptance Criteria:**
- AC1: Basic formatting (bold, italic, underline)
- AC2: Headings (H1-H6)
- AC3: Lists (ordered, unordered)
- AC4: Links and images
- AC5: Code blocks with syntax highlighting
- AC6: Blockquotes and horizontal rules

#### REQ-CUR-FE-019: Media Embed Interface [Phase 2]
The application SHALL allow media embedding in articles.

**Acceptance Criteria:**
- AC1: Image upload with drag-and-drop
- AC2: Image URL input option
- AC3: Video embed via URL
- AC4: Code snippet insert with language selection
- AC5: Preview embedded media
- AC6: Alt text for images

#### REQ-CUR-FE-020: Article Preview [Phase 2]
The application SHALL provide article preview.

**Acceptance Criteria:**
- AC1: Preview button shows rendered article
- AC2: Renders markdown to HTML
- AC3: Displays estimated read time
- AC4: Shows as students would see
- AC5: Close preview to return to edit
- AC6: Responsive preview on different screen sizes

### 2.6 Resource Management UI

#### REQ-CUR-FE-021: Resource Upload Interface [Phase 2]
The application SHALL provide resource file upload.

**Acceptance Criteria:**
- AC1: Drag-and-drop or click to browse
- AC2: Multiple file selection supported
- AC3: File type and size validation
- AC4: Title and description fields per file
- AC5: Upload progress for each file
- AC6: Success notification on upload

#### REQ-CUR-FE-022: Resource List Display [Phase 2]
The application SHALL display downloadable resources.

**Acceptance Criteria:**
- AC1: List shows file name and type icon
- AC2: Displays file size
- AC3: Shows download count
- AC4: Action menu (Edit, Replace, Delete, Download)
- AC5: Drag to reorder resources
- AC6: Empty state with upload prompt

#### REQ-CUR-FE-023: Resource Edit Dialog [Phase 2]
The application SHALL provide resource editing.

**Acceptance Criteria:**
- AC1: Modal displays title and description fields
- AC2: File name is read-only
- AC3: Save button updates metadata
- AC4: Cancel button discards changes
- AC5: Validation for required title
- AC6: Success notification on save

#### REQ-CUR-FE-024: Resource Replace Interface [Phase 2]
The application SHALL allow resource file replacement.

**Acceptance Criteria:**
- AC1: Replace button opens file upload
- AC2: Warning about replacing existing file
- AC3: Upload progress indicator
- AC4: Title and description preserved
- AC5: Success notification on replacement
- AC6: Download count preserved

---

## 3. Component Architecture

### 3.1 Pages

| Component | Route | Description |
|-----------|-------|-------------|
| CurriculumBuilderPage | /courses/{id}/curriculum | Main curriculum management |
| LectureEditorPage | /lectures/{id}/edit | Edit lecture content |
| VideoUploadPage | /lectures/{id}/video | Video upload and management |
| ArticleEditorPage | /lectures/{id}/article | Article content editor |

### 3.2 Components

| Component | Description |
|-----------|-------------|
| SectionList | Hierarchical section/lecture list |
| SectionItem | Individual section with actions |
| LectureItem | Individual lecture list item |
| LectureCreateModal | Lecture creation dialog |
| LectureDetailsPanel | Expandable lecture details |
| VideoUploader | Video file upload component |
| VideoPlayer | Video preview player |
| CaptionUploader | Caption file upload |
| CaptionEditor | Caption editing interface |
| ArticleEditor | Markdown article editor |
| ArticlePreview | Rendered article preview |
| ResourceUploader | Resource file upload |
| ResourceList | Downloadable resources list |
| DragDropList | Reorderable list component |
| PublishToggle | Publish/unpublish toggle |

### 3.3 Services

| Service | Description |
|---------|-------------|
| CurriculumService | Section/lecture CRUD operations |
| VideoService | Video upload and processing |
| CaptionService | Caption management API calls |
| ArticleService | Article content API calls |
| ResourceService | Resource upload and management |
| FileUploadService | Multipart file upload handling |

---

## 4. State Management

Per REQ-FE-009, state management SHALL use RxJS (not NgRx or Signals).

### 4.1 Curriculum State

```typescript
interface CurriculumState {
  sections: Section[];
  isLoading: boolean;
  error: string | null;
  selectedLectureId: string | null;
  isDirty: boolean;
}
```

### 4.2 Video State

```typescript
interface VideoState {
  uploadProgress: number;
  processingStatus: ProcessingStatus;
  isUploading: boolean;
  error: string | null;
}
```

### 4.3 Article State

```typescript
interface ArticleState {
  content: string;
  isDirty: boolean;
  lastSaved: Date | null;
  isSaving: boolean;
}
```

---

## 5. UI/UX Requirements

### 5.1 Design System

Per REQ-FE-006 and REQ-FE-010, the application SHALL use Angular Material with Material 3 guidelines and default theme colors.

### 5.2 Drag and Drop

- Visual feedback during drag operation
- Drop zones clearly indicated
- Smooth animations on reorder
- Undo option for accidental drops

### 5.3 Upload Experience

- Clear progress indicators
- Cancel upload capability
- Error recovery options
- Background upload support

### 5.4 Responsive Design

Per REQ-FE-018, all pages SHALL be responsive:
- Mobile: Stacked layout, touch-friendly controls
- Tablet: Side-by-side panels where appropriate
- Desktop: Multi-panel layout with sidebar

### 5.5 Auto-Save

- Article editor auto-saves every 30 seconds
- Visual indicator (Saving.../Saved)
- No data loss on navigation
- Conflict resolution for concurrent edits

### 5.6 Component Naming

Per REQ-FE-012 and REQ-FE-013:
- Class names SHALL NOT have "Component" suffix
- File names SHALL NOT have "component" prefix

---

## 6. Form Validation

### 6.1 Section Validation
- Title required, max 200 characters
- Learning objectives max 2000 characters

### 6.2 Lecture Validation
- Title required, max 200 characters
- Description max 5000 characters
- Type required and immutable

### 6.3 Video Validation
- File formats: MP4, MOV, AVI, WebM
- Maximum size: 5GB
- Minimum duration: 10 seconds

### 6.4 Caption Validation
- File formats: VTT, SRT, SBV
- Maximum size: 5MB
- Language code required

### 6.5 Article Validation
- Minimum length: 100 characters
- Maximum length: 100,000 characters

### 6.6 Resource Validation
- File formats: PDF, DOCX, XLSX, ZIP, code files
- Maximum size: 100MB
- Title required, max 200 characters

---

## 7. Error Handling

### 7.1 Upload Errors

| Error Type | User Message |
|------------|--------------|
| File too large | File exceeds maximum size of {limit}. |
| Invalid format | File format not supported. Accepted: {formats}. |
| Upload failed | Upload failed. Please try again. |
| Processing failed | Video processing failed. Please re-upload. |
| Network error | Connection lost. Upload will resume automatically. |

### 7.2 Validation Errors

- Display inline below the field
- Use red color for error state
- Clear error when field is corrected
- Prevent submission until valid

### 7.3 API Errors

| Error Code | User Message |
|------------|--------------|
| 400 | Invalid data. Please check your input. |
| 401 | Session expired. Please log in again. |
| 403 | You don't have permission to perform this action. |
| 404 | Resource not found. |
| 409 | Conflict. Another user may have modified this item. |
| 413 | File too large. |
| 500 | Something went wrong. Please try again. |

---

## 8. Testing Requirements

### 8.1 Unit Tests (Jest)

Per REQ-FE-021, unit tests SHALL use Jest:
- Test drag-and-drop reordering logic
- Test file upload validation
- Test auto-save functionality
- Test markdown rendering
- Minimum 80% code coverage

### 8.2 E2E Tests (Playwright)

Per REQ-FE-022, E2E tests SHALL use Playwright:
- Test complete section/lecture creation flow
- Test video upload and processing
- Test article creation and editing
- Test resource upload and download
- Test publish/unpublish workflow

---

## 9. Performance Requirements

### 9.1 Load Times
- Curriculum page loads in < 2 seconds
- Lecture details expand in < 500ms
- Video player initializes in < 1 second

### 9.2 Upload Performance
- Chunked upload for files > 10MB
- Resume capability for interrupted uploads
- Background upload continues during navigation

### 9.3 Auto-Save Performance
- Auto-save debounced at 30 seconds
- No blocking UI during save
- Save queue for rapid changes

---

## 10. Implementation Notes

### 10.1 API Base URL

Per REQ-FE-026, the baseUrl configuration SHALL contain ONLY the base URI:
```typescript
// Correct
baseUrl = "http://localhost:7200"
this.http.get(`${baseUrl}/api/courses/${id}/sections`)

// Incorrect
baseUrl = "http://localhost:7200/api"
```

### 10.2 File Structure

Per REQ-FE-015 and REQ-FE-016:
- Pages in `pages/` folder
- Reusable components in `components/` folder
- Barrel exports in each folder

### 10.3 File Upload

- Use multipart/form-data for uploads
- Implement chunked upload for large files
- Support upload resume after network interruption
- Display upload progress with cancel option

---

*Document Version: 1.0*
*Phase Coverage: 1-3*
