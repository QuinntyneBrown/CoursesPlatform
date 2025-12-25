# Curriculum Management - Backend Specification

**Feature:** Curriculum Management
**Version:** 1.0
**Last Updated:** December 2024

---

## 1. Overview

The Curriculum Management feature provides functionality for instructors to create, organize, and manage course content including sections, lectures, videos, articles, and downloadable resources.

---

## 2. Requirements

### 2.1 Section Management

#### REQ-CUR-001: Create Section [Phase 1]
The system SHALL allow instructors to create sections within a course.

**Acceptance Criteria:**
- AC1: Instructor can create section with title and optional learning objectives
- AC2: Section is created in draft status by default
- AC3: Section title is required and limited to 200 characters
- AC4: Section is assigned an order position at the end of existing sections
- AC5: SectionCreated event is published
- AC6: Instructor must be the course owner or authorized co-instructor

#### REQ-CUR-002: Update Section [Phase 1]
The system SHALL allow instructors to update section information.

**Acceptance Criteria:**
- AC1: Instructor can update section title and learning objectives
- AC2: Changes to published sections create audit trail
- AC3: SectionUpdated event is published
- AC4: Validation ensures title is not empty
- AC5: Instructor must be authorized to modify the course

#### REQ-CUR-003: Delete Section [Phase 1]
The system SHALL allow instructors to delete sections.

**Acceptance Criteria:**
- AC1: Section can only be deleted if it contains no lectures or all lectures are deleted
- AC2: Soft delete is performed, retaining data for recovery
- AC3: SectionDeleted event is published
- AC4: Student progress data is preserved for reporting
- AC5: Deletion requires confirmation for published sections

#### REQ-CUR-004: Reorder Sections [Phase 1]
The system SHALL allow instructors to change the order of sections.

**Acceptance Criteria:**
- AC1: Instructor can drag-and-drop sections to new positions
- AC2: Order positions are recalculated for all affected sections
- AC3: SectionsReordered event is published
- AC4: Changes are persisted atomically
- AC5: Published course structure changes trigger notification to enrolled students

#### REQ-CUR-005: Publish Section [Phase 1]
The system SHALL allow instructors to publish sections.

**Acceptance Criteria:**
- AC1: Section status changes from Draft to Published
- AC2: Section can only be published if it contains at least one published lecture
- AC3: SectionPublished event is published
- AC4: Published sections become visible to enrolled students
- AC5: Publication timestamp is recorded

#### REQ-CUR-006: Unpublish Section [Phase 1]
The system SHALL allow instructors to unpublish sections.

**Acceptance Criteria:**
- AC1: Section status changes from Published to Draft
- AC2: SectionUnpublished event is published
- AC3: Section becomes hidden from students
- AC4: Student progress is preserved
- AC5: Enrolled students are notified of content changes

### 2.2 Lecture Management

#### REQ-CUR-007: Create Lecture [Phase 1]
The system SHALL allow instructors to create lectures within sections.

**Acceptance Criteria:**
- AC1: Instructor can create lecture with title and type (video, article, quiz)
- AC2: Lecture is created in draft status
- AC3: Lecture title is required and limited to 200 characters
- AC4: Lecture is assigned order position at end of section
- AC5: LectureCreated event is published
- AC6: Lecture type cannot be changed after creation

#### REQ-CUR-008: Update Lecture [Phase 1]
The system SHALL allow instructors to update lecture metadata.

**Acceptance Criteria:**
- AC1: Instructor can update title, description, and preview status
- AC2: Preview flag determines if lecture is accessible without enrollment
- AC3: LectureUpdated event is published
- AC4: Description supports markdown format
- AC5: Changes to published lectures are audited

#### REQ-CUR-009: Delete Lecture [Phase 1]
The system SHALL allow instructors to delete lectures.

**Acceptance Criteria:**
- AC1: Lecture is soft deleted
- AC2: LectureDeleted event is published
- AC3: Associated resources (videos, files) are marked for deletion
- AC4: Student progress data is preserved
- AC5: Deletion confirmation required for published lectures

#### REQ-CUR-010: Reorder Lectures [Phase 1]
The system SHALL allow instructors to reorder lectures within sections.

**Acceptance Criteria:**
- AC1: Instructor can drag-and-drop lectures within same section
- AC2: Order positions are recalculated for affected lectures
- AC3: LecturesReordered event is published
- AC4: Changes persist atomically
- AC5: Reordering published lectures triggers student notification

#### REQ-CUR-011: Move Lecture [Phase 1]
The system SHALL allow instructors to move lectures between sections.

**Acceptance Criteria:**
- AC1: Instructor can move lecture to different section in same course
- AC2: Lecture is repositioned at end of target section
- AC3: LectureMoved event is published
- AC4: Student progress is maintained across move
- AC5: Cannot move to section in different course

#### REQ-CUR-012: Publish Lecture [Phase 1]
The system SHALL allow instructors to publish lectures.

**Acceptance Criteria:**
- AC1: Lecture status changes from Draft to Published
- AC2: Lecture can only be published if required content exists
- AC3: Video lectures require uploaded, processed video
- AC4: Article lectures require content body
- AC5: LecturePublished event is published
- AC6: Published lectures become visible to enrolled students

#### REQ-CUR-013: Unpublish Lecture [Phase 1]
The system SHALL allow instructors to unpublish lectures.

**Acceptance Criteria:**
- AC1: Lecture status changes from Published to Draft
- AC2: LectureUnpublished event is published
- AC3: Lecture becomes hidden from students
- AC4: Progress data is retained
- AC5: Students are notified of content removal

### 2.3 Video Content Management

#### REQ-CUR-014: Upload Video [Phase 2]
The system SHALL allow instructors to upload video content for video lectures.

**Acceptance Criteria:**
- AC1: Supported formats include MP4, MOV, AVI, WebM
- AC2: Maximum file size is 5GB
- AC3: Video is uploaded to cloud storage
- AC4: VideoUploadStarted event is published
- AC5: Upload progress is tracked
- AC6: VideoUploadCompleted event is published on success
- AC7: VideoUploadFailed event is published on failure

#### REQ-CUR-015: Process Video [Phase 2]
The system SHALL automatically process uploaded videos.

**Acceptance Criteria:**
- AC1: Video is transcoded to multiple resolutions (360p, 720p, 1080p)
- AC2: Video duration is extracted and stored
- AC3: Thumbnail is generated at 1 second mark
- AC4: VideoProcessingStarted event is published
- AC5: VideoProcessingCompleted event is published on success
- AC6: VideoProcessingFailed event is published on failure
- AC7: Processing status is tracked

#### REQ-CUR-016: Replace Video [Phase 2]
The system SHALL allow instructors to replace video content.

**Acceptance Criteria:**
- AC1: Instructor can upload new video for existing lecture
- AC2: Old video is marked for deletion after retention period
- AC3: VideoReplaced event is published
- AC4: Student progress is preserved
- AC5: Replacement triggers reprocessing

#### REQ-CUR-017: Delete Video [Phase 2]
The system SHALL allow instructors to delete video content.

**Acceptance Criteria:**
- AC1: Video files are removed from cloud storage
- AC2: All resolutions and thumbnails are deleted
- AC3: VideoDeleted event is published
- AC4: Lecture is marked as missing content
- AC5: Cannot delete video from published lecture without unpublishing

#### REQ-CUR-018: Video Quality Selection [Phase 2]
The system SHALL store multiple video quality levels.

**Acceptance Criteria:**
- AC1: Videos are available in SD (360p), HD (720p), FHD (1080p)
- AC2: Each quality level is stored separately
- AC3: Original video is retained for 30 days
- AC4: Quality metadata includes bitrate and file size
- AC5: Adaptive streaming manifest is generated

### 2.4 Captions & Subtitles

#### REQ-CUR-019: Auto-Generate Captions [Phase 3]
The system SHALL automatically generate captions for video lectures.

**Acceptance Criteria:**
- AC1: Speech-to-text service processes video audio
- AC2: Captions are generated in WebVTT format
- AC3: CaptionsGenerationStarted event is published
- AC4: CaptionsGenerationCompleted event is published on success
- AC5: Default language is detected from course settings
- AC6: Timestamp accuracy is within 500ms

#### REQ-CUR-020: Upload Captions [Phase 3]
The system SHALL allow instructors to upload caption files.

**Acceptance Criteria:**
- AC1: Supported formats include VTT, SRT, SBV
- AC2: Captions are converted to WebVTT format
- AC3: Language code must be specified
- AC4: CaptionsUploaded event is published
- AC5: Validation ensures proper format and timestamps
- AC6: Maximum file size is 5MB

#### REQ-CUR-021: Edit Captions [Phase 3]
The system SHALL allow instructors to edit caption content.

**Acceptance Criteria:**
- AC1: Instructor can edit caption text and timestamps
- AC2: Changes are validated for format compliance
- AC3: CaptionsUpdated event is published
- AC4: Version history is maintained
- AC5: Auto-save prevents data loss

#### REQ-CUR-022: Delete Captions [Phase 3]
The system SHALL allow instructors to delete caption files.

**Acceptance Criteria:**
- AC1: Caption file is removed from storage
- AC2: CaptionsDeleted event is published
- AC3: Lecture remains accessible without captions
- AC4: Language-specific captions can be deleted individually
- AC5: Deletion is permanent

#### REQ-CUR-023: Multiple Language Captions [Phase 3]
The system SHALL support captions in multiple languages.

**Acceptance Criteria:**
- AC1: Multiple caption files can exist per video
- AC2: Each caption file has unique language code
- AC3: Default language is course primary language
- AC4: Students can select caption language during playback
- AC5: LanguageCaptionsAdded event is published

### 2.5 Article Lectures

#### REQ-CUR-024: Create Article Content [Phase 2]
The system SHALL allow instructors to create article-based lectures.

**Acceptance Criteria:**
- AC1: Article content supports rich text markdown
- AC2: Content is stored in structured format
- AC3: ArticleContentCreated event is published
- AC4: Minimum content length is 100 characters
- AC5: Maximum content length is 100,000 characters

#### REQ-CUR-025: Update Article Content [Phase 2]
The system SHALL allow instructors to update article content.

**Acceptance Criteria:**
- AC1: Instructor can edit article body
- AC2: ArticleContentUpdated event is published
- AC3: Version history is maintained
- AC4: Auto-save drafts every 30 seconds
- AC5: Read time estimate is calculated

#### REQ-CUR-026: Embed Media in Articles [Phase 2]
The system SHALL allow embedding media in articles.

**Acceptance Criteria:**
- AC1: Images can be embedded via upload or URL
- AC2: Videos can be embedded from external sources
- AC3: Code snippets support syntax highlighting
- AC4: Embedded media is validated for security
- AC5: MediaEmbedded event is published

#### REQ-CUR-027: Delete Article Content [Phase 2]
The system SHALL allow instructors to delete article content.

**Acceptance Criteria:**
- AC1: Article content is removed
- AC2: ArticleContentDeleted event is published
- AC3: Embedded media is marked for deletion
- AC4: Deletion requires lecture to be unpublished
- AC5: Student progress is preserved

### 2.6 Downloadable Resources

#### REQ-CUR-028: Upload Resource [Phase 2]
The system SHALL allow instructors to attach downloadable resources to lectures.

**Acceptance Criteria:**
- AC1: Supported formats include PDF, DOCX, XLSX, ZIP, code files
- AC2: Maximum file size per resource is 100MB
- AC3: Resource includes title and optional description
- AC4: ResourceUploaded event is published
- AC5: Virus scanning is performed
- AC6: File is stored in cloud storage

#### REQ-CUR-029: Update Resource [Phase 2]
The system SHALL allow instructors to update resource metadata.

**Acceptance Criteria:**
- AC1: Instructor can update title and description
- AC2: ResourceUpdated event is published
- AC3: Cannot change file without re-uploading
- AC4: Download URL remains stable
- AC5: Update timestamp is tracked

#### REQ-CUR-030: Replace Resource File [Phase 2]
The system SHALL allow instructors to replace resource files.

**Acceptance Criteria:**
- AC1: New file replaces existing file
- AC2: Old file is retained for 30 days
- AC3: ResourceReplaced event is published
- AC4: Download counters are preserved
- AC5: Students see updated file

#### REQ-CUR-031: Delete Resource [Phase 2]
The system SHALL allow instructors to delete downloadable resources.

**Acceptance Criteria:**
- AC1: Resource file is removed from storage
- AC2: ResourceDeleted event is published
- AC3: Download links become invalid
- AC4: Soft delete for 30-day recovery period
- AC5: Download statistics are preserved

#### REQ-CUR-032: Resource Download Tracking [Phase 2]
The system SHALL track resource downloads.

**Acceptance Criteria:**
- AC1: Download count is incremented per student
- AC2: ResourceDownloaded event is published
- AC3: Download timestamp is recorded
- AC4: Duplicate downloads by same student are tracked
- AC5: Statistics are available to instructor

---

## 3. Domain Model

### 3.1 Entities

| Entity | Description |
|--------|-------------|
| Section | Organizational unit within course containing lectures |
| Lecture | Individual learning unit (video, article, quiz) |
| VideoContent | Video file metadata and streaming information |
| ArticleContent | Rich text article content |
| Caption | Video caption/subtitle file |
| DownloadableResource | File attached to lecture for download |

### 3.2 Domain Events

| Event | Trigger |
|-------|---------|
| SectionCreated | New section created |
| SectionUpdated | Section metadata changed |
| SectionDeleted | Section removed |
| SectionsReordered | Section order changed |
| SectionPublished | Section made visible to students |
| SectionUnpublished | Section hidden from students |
| LectureCreated | New lecture created |
| LectureUpdated | Lecture metadata changed |
| LectureDeleted | Lecture removed |
| LecturesReordered | Lecture order changed within section |
| LectureMoved | Lecture moved to different section |
| LecturePublished | Lecture made visible to students |
| LectureUnpublished | Lecture hidden from students |
| VideoUploadStarted | Video upload initiated |
| VideoUploadCompleted | Video upload finished |
| VideoUploadFailed | Video upload failed |
| VideoProcessingStarted | Video transcoding started |
| VideoProcessingCompleted | Video processing finished |
| VideoProcessingFailed | Video processing failed |
| VideoReplaced | Video file replaced |
| VideoDeleted | Video removed |
| CaptionsGenerationStarted | Auto-caption generation started |
| CaptionsGenerationCompleted | Auto-caption generation finished |
| CaptionsUploaded | Caption file uploaded |
| CaptionsUpdated | Caption content edited |
| CaptionsDeleted | Caption file removed |
| LanguageCaptionsAdded | Captions added for new language |
| ArticleContentCreated | Article lecture content created |
| ArticleContentUpdated | Article content modified |
| ArticleContentDeleted | Article content removed |
| MediaEmbedded | Media embedded in article |
| ResourceUploaded | Downloadable resource uploaded |
| ResourceUpdated | Resource metadata changed |
| ResourceReplaced | Resource file replaced |
| ResourceDeleted | Resource removed |
| ResourceDownloaded | Student downloaded resource |

---

## 4. API Endpoints

### 4.1 Sections

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/courses/{courseId}/sections | Create section |
| GET | /api/courses/{courseId}/sections | List sections |
| GET | /api/sections/{sectionId} | Get section details |
| PUT | /api/sections/{sectionId} | Update section |
| DELETE | /api/sections/{sectionId} | Delete section |
| POST | /api/sections/reorder | Reorder sections |
| POST | /api/sections/{sectionId}/publish | Publish section |
| POST | /api/sections/{sectionId}/unpublish | Unpublish section |

### 4.2 Lectures

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/sections/{sectionId}/lectures | Create lecture |
| GET | /api/sections/{sectionId}/lectures | List lectures |
| GET | /api/lectures/{lectureId} | Get lecture details |
| PUT | /api/lectures/{lectureId} | Update lecture |
| DELETE | /api/lectures/{lectureId} | Delete lecture |
| POST | /api/lectures/reorder | Reorder lectures |
| POST | /api/lectures/{lectureId}/move | Move lecture |
| POST | /api/lectures/{lectureId}/publish | Publish lecture |
| POST | /api/lectures/{lectureId}/unpublish | Unpublish lecture |

### 4.3 Video Content

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/lectures/{lectureId}/video | Upload video |
| GET | /api/lectures/{lectureId}/video | Get video metadata |
| PUT | /api/lectures/{lectureId}/video | Replace video |
| DELETE | /api/lectures/{lectureId}/video | Delete video |
| GET | /api/lectures/{lectureId}/video/status | Get processing status |

### 4.4 Captions

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/lectures/{lectureId}/captions/generate | Auto-generate captions |
| POST | /api/lectures/{lectureId}/captions | Upload caption file |
| GET | /api/lectures/{lectureId}/captions | List captions |
| GET | /api/lectures/{lectureId}/captions/{language} | Get captions by language |
| PUT | /api/lectures/{lectureId}/captions/{language} | Update captions |
| DELETE | /api/lectures/{lectureId}/captions/{language} | Delete captions |

### 4.5 Article Content

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/lectures/{lectureId}/article | Create article content |
| GET | /api/lectures/{lectureId}/article | Get article content |
| PUT | /api/lectures/{lectureId}/article | Update article content |
| DELETE | /api/lectures/{lectureId}/article | Delete article content |
| POST | /api/lectures/{lectureId}/article/media | Embed media |

### 4.6 Downloadable Resources

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/lectures/{lectureId}/resources | Upload resource |
| GET | /api/lectures/{lectureId}/resources | List resources |
| GET | /api/resources/{resourceId} | Get resource metadata |
| PUT | /api/resources/{resourceId} | Update resource metadata |
| DELETE | /api/resources/{resourceId} | Delete resource |
| GET | /api/resources/{resourceId}/download | Download resource |
| GET | /api/resources/{resourceId}/stats | Get download statistics |

---

## 5. Business Rules

### 5.1 Publishing Rules
- Section cannot be published without at least one published lecture
- Lecture cannot be published without required content (video or article)
- Video lecture requires completed video processing
- Unpublishing section does not unpublish individual lectures

### 5.2 Deletion Rules
- Section deletion requires no lectures or all lectures deleted
- Lecture deletion is soft delete with 30-day retention
- Video deletion removes all quality levels
- Resource deletion has 30-day recovery period

### 5.3 Authorization Rules
- Only course owner and authorized instructors can manage curriculum
- Students have read-only access to published content
- Draft content is invisible to students

### 5.4 Ordering Rules
- Sections are ordered within course scope
- Lectures are ordered within section scope
- Order positions start at 1
- Gaps in order positions are automatically corrected

---

## 6. Storage & Media

### 6.1 Video Storage
- Videos stored in cloud storage (Azure Blob Storage)
- Original video retained for 30 days
- Multiple quality levels stored permanently
- CDN distribution for streaming

### 6.2 Resource Storage
- Resources stored in cloud storage
- Virus scanning required before storage
- Secure download URLs with expiration
- Maximum 100MB per file

### 6.3 Caption Storage
- Captions stored as WebVTT format
- Separate file per language
- Stored with video metadata
- Maximum 5MB per caption file

---

## 7. Security Considerations

- All video uploads MUST be scanned for malware
- Resource files MUST be virus scanned
- Download URLs MUST be time-limited and signed
- Instructor authorization MUST be verified for all operations
- Students MUST be enrolled to access non-preview content
- HTTPS MUST be enforced for all media uploads

---

## 8. Dependencies

- Serilog for structured logging
- MediatR for CQRS pattern
- Entity Framework Core for data access
- FluentValidation for request validation
- Azure Blob Storage for media storage
- Azure Media Services for video processing
- Azure Cognitive Services for caption generation

---

## 9. Implementation Notes

Per the implementation specification (REQ-SYS-005, REQ-SYS-006), all data access SHALL use ICoursesPlatformContext directly without repository pattern.

Video processing SHALL be handled asynchronously using background workers.

Caption generation SHALL use Azure Cognitive Services Speech-to-Text API.

---

*Document Version: 1.0*
*Phase Coverage: 1-3*
