# Reviews & Ratings - Frontend Specification

**Feature:** Reviews & Ratings
**Version:** 1.0
**Last Updated:** December 2024

---

## 1. Overview

The Reviews & Ratings frontend provides user interfaces for viewing course reviews, submitting and editing reviews, instructor responses, and review interactions.

---

## 2. Requirements

### 2.1 Review Display

#### REQ-REV-FE-001: Course Reviews List [Phase 2]
The application SHALL display a list of reviews for each course.

**Acceptance Criteria:**
- AC1: Reviews are displayed in paginated list (10 per page)
- AC2: Each review shows rating, title, body, author, and date
- AC3: Verified purchase badge is displayed for verified reviews
- AC4: Helpful vote counts are displayed
- AC5: Instructor responses are displayed below reviews
- AC6: Sorting options: most recent, highest rating, most helpful

#### REQ-REV-FE-002: Rating Summary [Phase 2]
The application SHALL display course rating summary.

**Acceptance Criteria:**
- AC1: Average rating is displayed with star visualization
- AC2: Total review count is shown
- AC3: Rating distribution bar chart shows count per star level
- AC4: Percentage for each star level is calculated and displayed

#### REQ-REV-FE-003: Review Filtering [Phase 2]
The application SHALL provide review filtering options.

**Acceptance Criteria:**
- AC1: Filter by star rating (1-5 stars, all stars)
- AC2: Filter by verified purchase only
- AC3: Filter controls are clearly visible
- AC4: Active filters are indicated
- AC5: Filter results update without page reload

### 2.2 Review Submission

#### REQ-REV-FE-004: Submit Review Form [Phase 2]
The application SHALL provide a review submission form.

**Acceptance Criteria:**
- AC1: Form displays star rating selector (1-5 stars)
- AC2: Form includes optional title input field
- AC3: Form includes optional body textarea
- AC4: Character counters are shown for title and body
- AC5: Submit button is disabled until rating is selected
- AC6: Success message is shown after submission
- AC7: Form is cleared after successful submission

#### REQ-REV-FE-005: Edit Review Form [Phase 2]
The application SHALL provide review editing functionality.

**Acceptance Criteria:**
- AC1: Edit button is visible only on user's own reviews
- AC2: Clicking edit loads review into editable form
- AC3: Cancel button restores original review display
- AC4: Save button updates review
- AC5: Success message is shown after update

#### REQ-REV-FE-006: Delete Review [Phase 2]
The application SHALL provide review deletion functionality.

**Acceptance Criteria:**
- AC1: Delete button is visible only on user's own reviews
- AC2: Confirmation dialog is shown before deletion
- AC3: Review is removed from list after deletion
- AC4: Success message is shown after deletion
- AC5: Course rating is updated after deletion

### 2.3 Review Interactions

#### REQ-REV-FE-007: Helpful Voting [Phase 2]
The application SHALL provide helpful voting interface.

**Acceptance Criteria:**
- AC1: Helpful and Not Helpful buttons are displayed
- AC2: Active vote is visually indicated
- AC3: Vote counts update immediately
- AC4: Users can change their vote
- AC5: Users cannot vote on their own reviews
- AC6: Non-authenticated users see vote counts but cannot vote

#### REQ-REV-FE-008: Report Review [Phase 3]
The application SHALL provide review reporting interface.

**Acceptance Criteria:**
- AC1: Report button is visible on all reviews
- AC2: Clicking report opens modal with reason selection
- AC3: Reasons include: spam, offensive, misleading, other
- AC4: Optional comment field is provided
- AC5: Success message is shown after reporting

### 2.4 Instructor Responses

#### REQ-REV-FE-009: Submit Instructor Response [Phase 2]
The application SHALL allow instructors to respond to reviews.

**Acceptance Criteria:**
- AC1: Respond button is visible only to course instructor
- AC2: Response form appears below review
- AC3: Character counter shows remaining characters (max 2000)
- AC4: Submit button posts response
- AC5: Response appears immediately after submission
- AC6: Respond button is hidden after response is submitted

#### REQ-REV-FE-010: Edit Instructor Response [Phase 2]
The application SHALL allow instructors to edit responses.

**Acceptance Criteria:**
- AC1: Edit button is visible only to response author
- AC2: Clicking edit makes response editable inline
- AC3: Cancel button restores original response
- AC4: Save button updates response
- AC5: Success message is shown after update

#### REQ-REV-FE-011: Delete Instructor Response [Phase 2]
The application SHALL allow instructors to delete responses.

**Acceptance Criteria:**
- AC1: Delete button is visible only to response author
- AC2: Confirmation dialog is shown before deletion
- AC3: Response is removed after deletion
- AC4: Respond button becomes visible again

### 2.5 User Reviews Dashboard

#### REQ-REV-FE-012: My Reviews Page [Phase 2]
The application SHALL provide a user dashboard for managing reviews.

**Acceptance Criteria:**
- AC1: Page lists all user's submitted reviews
- AC2: Each review shows course name, rating, and date
- AC3: Edit and delete actions are available
- AC4: Quick navigation to course page
- AC5: Empty state message when no reviews exist

---

## 3. Component Architecture

### 3.1 Pages

| Component | Route | Description |
|-----------|-------|-------------|
| CourseReviewsPage | /courses/{id}/reviews | Course reviews display |
| MyReviewsPage | /my-reviews | User's review dashboard |

### 3.2 Components

| Component | Description |
|-----------|-------------|
| ReviewList | List of reviews with pagination |
| ReviewItem | Individual review display |
| ReviewForm | Review submission/edit form |
| RatingSummary | Course rating summary display |
| RatingDistribution | Star rating distribution chart |
| StarRating | Star rating input/display |
| InstructorResponse | Instructor response display |
| InstructorResponseForm | Response submission/edit form |
| HelpfulVoting | Helpful/Not helpful buttons |
| ReportReviewDialog | Review reporting modal |
| ReviewFilters | Review filtering controls |

### 3.3 Services

| Service | Description |
|---------|-------------|
| ReviewService | Review CRUD API calls |
| RatingService | Rating statistics API calls |
| ReviewInteractionService | Vote and report API calls |

---

## 4. State Management

Per REQ-FE-009, state management SHALL use RxJS (not NgRx or Signals).

### 4.1 Review State

```typescript
interface ReviewState {
  reviews: Review[];
  currentPage: number;
  totalPages: number;
  totalCount: number;
  sortBy: SortOption;
  filterBy: FilterOptions;
  isLoading: boolean;
  error: string | null;
}
```

### 4.2 Rating State

```typescript
interface RatingState {
  averageRating: number;
  totalReviews: number;
  distribution: RatingDistribution;
  isLoading: boolean;
}

interface RatingDistribution {
  fiveStars: number;
  fourStars: number;
  threeStars: number;
  twoStars: number;
  oneStar: number;
}
```

---

## 5. UI/UX Requirements

### 5.1 Design System

Per REQ-FE-006 and REQ-FE-010, the application SHALL use Angular Material with Material 3 guidelines and default theme colors.

### 5.2 Review Card Layout

```
┌─────────────────────────────────────────┐
│ ★★★★★ 5.0                              │
│ Excellent Course                        │
│ By John Doe • Verified • 2 days ago     │
│                                         │
│ This is the review body text with      │
│ detailed feedback about the course...   │
│                                         │
│ [👍 Helpful (15)] [👎 Not Helpful (2)] │
│ [Report]                                │
│                                         │
│ ┌─ Instructor Response ───────────────┐│
│ │ Thank you for your feedback!        ││
│ │ By Jane Smith • 1 day ago           ││
│ │ [Edit] [Delete]                     ││
│ └─────────────────────────────────────┘│
└─────────────────────────────────────────┘
```

### 5.3 Rating Summary Layout

```
┌─────────────────────────────────────────┐
│ Course Rating                           │
│                                         │
│ ★★★★★ 4.7                              │
│ Based on 1,234 reviews                  │
│                                         │
│ 5★ ████████████████████ 85% (1,048)   │
│ 4★ ████ 10% (123)                      │
│ 3★ ██ 3% (37)                          │
│ 2★ █ 1% (12)                           │
│ 1★ █ 1% (14)                           │
└─────────────────────────────────────────┘
```

### 5.4 Responsive Design

Per REQ-FE-018, all pages SHALL be responsive:
- Mobile: Single column, stacked layout
- Tablet: Single column with better spacing
- Desktop: Rating summary sidebar + review list

### 5.5 Accessibility

- Star ratings MUST have ARIA labels
- Form inputs MUST have proper labels
- Error messages MUST be announced to screen readers
- Keyboard navigation for voting buttons
- Focus management in modals

### 5.6 Component Naming

Per REQ-FE-012 and REQ-FE-013:
- Class names SHALL NOT have "Component" suffix
- File names SHALL NOT have "component" prefix

---

## 6. Form Validation

### 6.1 Review Form Validation

```
Rating:
- Required: Yes
- Range: 1-5 stars
- Error: "Please select a rating"

Title:
- Required: No
- Max Length: 200 characters
- Error: "Title cannot exceed 200 characters"

Body:
- Required: No
- Max Length: 5000 characters
- Error: "Review cannot exceed 5000 characters"
```

### 6.2 Instructor Response Validation

```
Response Text:
- Required: Yes
- Max Length: 2000 characters
- Error: "Response is required"
- Error: "Response cannot exceed 2000 characters"
```

---

## 7. User Interactions

### 7.1 Star Rating Input

- Hovering over stars shows tentative selection
- Clicking star sets rating
- Clear visual feedback for selected rating
- Display as read-only stars when not editable

### 7.2 Helpful Voting

- Single click to vote helpful or not helpful
- Second click on same button removes vote
- Click on opposite button changes vote
- Visual indication of user's current vote
- Debounced API calls to prevent spam

### 7.3 Review Pagination

- Load next page on "Load More" button click
- Maintain scroll position after loading
- Loading indicator during fetch
- Smooth transition when new reviews appear

---

## 8. Error Handling

### 8.1 API Errors

| Error Code | User Message |
|------------|--------------|
| 400 | Invalid review data. Please check your input. |
| 401 | Please log in to submit a review. |
| 403 | You don't have permission to perform this action. |
| 404 | Review not found. |
| 409 | You have already reviewed this course. |
| 429 | Too many requests. Please try again later. |
| 500 | Something went wrong. Please try again. |

### 8.2 Validation Errors

- Display inline below the field
- Use red color for error state
- Clear error when field is corrected
- Disable submit until all errors are resolved

### 8.3 Network Errors

- Show retry button on network failure
- Display offline indicator
- Queue actions when offline (Phase 3)

---

## 9. Loading States

### 9.1 Review List Loading

- Skeleton cards while loading initial reviews
- Inline spinner when loading more reviews
- Shimmer effect on skeleton cards

### 9.2 Submit/Edit Actions

- Disable submit button during submission
- Show spinner on submit button
- Prevent duplicate submissions

### 9.3 Vote Actions

- Optimistic UI update
- Revert on error with notification
- Disable vote buttons during request

---

## 10. Notifications

### 10.1 Success Notifications

- "Review submitted successfully"
- "Review updated successfully"
- "Review deleted successfully"
- "Response posted successfully"
- "Thank you for your feedback" (after voting)

### 10.2 Error Notifications

- Display as toast/snackbar at top/bottom
- Auto-dismiss after 5 seconds
- Close button available
- Error icon with message

---

## 11. Testing Requirements

### 11.1 Unit Tests (Jest)

Per REQ-FE-021, unit tests SHALL use Jest:
- Test star rating component interactions
- Test review form validation
- Test vote state management
- Test service API calls with mocks
- Minimum 80% code coverage

### 11.2 E2E Tests (Playwright)

Per REQ-FE-022, E2E tests SHALL use Playwright:
- Test complete review submission flow
- Test edit and delete review flow
- Test helpful voting interaction
- Test instructor response flow
- Test review filtering and sorting

---

## 12. Implementation Notes

### 12.1 API Base URL

Per REQ-FE-026, the baseUrl configuration SHALL contain ONLY the base URI:
```typescript
// Correct
baseUrl = "http://localhost:7200"
this.http.post(`${baseUrl}/api/courses/${courseId}/reviews`)

// Incorrect
baseUrl = "http://localhost:7200/api"
```

### 12.2 File Structure

Per REQ-FE-015 and REQ-FE-016:
- Pages in `pages/` folder
- Reusable components in `components/` folder
- Barrel exports in each folder

### 12.3 Star Rating Display

- Use Material Icons for stars
- Filled star: `star`
- Half star: `star_half`
- Empty star: `star_border`
- Support decimal ratings (e.g., 4.7 shows 4 full, 1 half)

---

*Document Version: 1.0*
*Phase Coverage: 2-3*
