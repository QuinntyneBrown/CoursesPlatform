# Search & Discovery - Frontend Specification

**Feature:** Search & Discovery
**Version:** 1.0
**Last Updated:** December 2024

---

## 1. Overview

The Search & Discovery frontend provides user interfaces for course search, filtering, recommendations, trending courses, and discovery features.

---

## 2. Requirements

### 2.1 Course Search

#### REQ-SRC-FE-001: Search Page [Phase 2]
The application SHALL provide a comprehensive course search page.

**Acceptance Criteria:**
- AC1: Page displays search input with autocomplete
- AC2: Filter panel shows available filters (category, price, level, rating, language)
- AC3: Results grid displays courses with thumbnail, title, instructor, rating, and price
- AC4: Pagination controls are displayed
- AC5: Sort dropdown allows sorting by relevance, popularity, rating, newest, price
- AC6: Loading skeleton shows while fetching results
- AC7: Empty state shows when no results found

#### REQ-SRC-FE-002: Search Input [Phase 2]
The application SHALL provide an autocomplete search input.

**Acceptance Criteria:**
- AC1: Input shows suggestions after 3 characters typed
- AC2: Suggestions include course titles and instructor names
- AC3: Keyboard navigation supported (arrow keys, enter, escape)
- AC4: Click or enter selects suggestion
- AC5: Search icon triggers search
- AC6: Clear button clears input
- AC7: Recent searches shown when input focused (if empty)

#### REQ-SRC-FE-003: Filter Panel [Phase 2]
The application SHALL provide a collapsible filter panel.

**Acceptance Criteria:**
- AC1: Panel shows category tree with expand/collapse
- AC2: Price range slider or radio buttons (free, paid, custom range)
- AC3: Difficulty level checkboxes (beginner, intermediate, advanced)
- AC4: Rating filter (4+, 3+, etc.)
- AC5: Language dropdown with search
- AC6: Filter counts displayed next to each option
- AC7: Clear all filters button visible when filters applied
- AC8: Mobile: filters in modal/drawer

#### REQ-SRC-FE-004: Search Results Grid [Phase 2]
The application SHALL display search results in a responsive grid.

**Acceptance Criteria:**
- AC1: Desktop: 3-4 columns grid
- AC2: Tablet: 2 columns grid
- AC3: Mobile: 1 column list
- AC4: Each card shows thumbnail, title, instructor, rating, enrollment count, price
- AC5: Hover effect shows additional details
- AC6: Click navigates to course detail page
- AC7: Wishlist button on each card
- AC8: Results update without page reload when filters change

#### REQ-SRC-FE-005: Faceted Navigation [Phase 2]
The application SHALL show facet counts for available filters.

**Acceptance Criteria:**
- AC1: Display count next to each category
- AC2: Display count next to each difficulty level
- AC3: Display count next to each language
- AC4: Counts update based on active filters
- AC5: Disabled state for options with zero results

#### REQ-SRC-FE-006: Advanced Search [Phase 3]
The application SHALL provide advanced search interface.

**Acceptance Criteria:**
- AC1: Toggle button to show advanced options
- AC2: Boolean operator selector (AND, OR, NOT)
- AC3: Exact phrase input
- AC4: Exclude keywords input
- AC5: Duration filter slider
- AC6: Last updated date filter
- AC7: Video quality filter

### 2.2 Recommendations

#### REQ-SRC-FE-007: Personalized Recommendations Section [Phase 3]
The application SHALL display personalized course recommendations.

**Acceptance Criteria:**
- AC1: Section shows on homepage for logged-in users
- AC2: Section title indicates personalization ("Recommended for you")
- AC3: Horizontal scrollable carousel with 6-8 courses
- AC4: Each card shows thumbnail, title, instructor, rating
- AC5: Refresh button to load new recommendations
- AC6: See all link to view full list

#### REQ-SRC-FE-008: Similar Courses Section [Phase 3]
The application SHALL display similar courses on course detail page.

**Acceptance Criteria:**
- AC1: Section appears below course content
- AC2: Section title indicates relationship ("Students also viewed")
- AC3: Horizontal carousel with 6 similar courses
- AC4: Excludes current course
- AC5: Shows similarity indicator (if available)

#### REQ-SRC-FE-009: Recommendations Page [Phase 3]
The application SHALL provide a dedicated recommendations page.

**Acceptance Criteria:**
- AC1: Page displays all personalized recommendations
- AC2: Recommendations grouped by category
- AC3: Each group has section title and view all link
- AC4: Grid layout similar to search results
- AC5: Filter and sort options available
- AC6: Explanation of why course is recommended (optional)

### 2.3 Discovery Pages

#### REQ-SRC-FE-010: Trending Courses Page [Phase 3]
The application SHALL display trending courses.

**Acceptance Criteria:**
- AC1: Page shows courses sorted by trending score
- AC2: Trending indicator badge on each course
- AC3: Time filter (today, this week, this month)
- AC4: Category filter to view trending by category
- AC5: Grid layout with pagination
- AC6: Trending rank displayed (1-24)

#### REQ-SRC-FE-011: Popular Courses Page [Phase 2]
The application SHALL display popular courses.

**Acceptance Criteria:**
- AC1: Page shows most popular courses
- AC2: Category tabs to filter by category
- AC3: Sort by enrollment or rating
- AC4: Grid layout with pagination
- AC5: Enrollment count and rating prominently displayed

#### REQ-SRC-FE-012: New & Noteworthy Page [Phase 3]
The application SHALL display new and noteworthy courses.

**Acceptance Criteria:**
- AC1: Page shows recently published high-quality courses
- AC2: New badge on courses published within 30 days
- AC3: Published date displayed
- AC4: Grid layout with filtering options
- AC5: Sort by newest, rating, or enrollment

#### REQ-SRC-FE-013: Categories Browse Page [Phase 2]
The application SHALL provide category browsing interface.

**Acceptance Criteria:**
- AC1: Page shows all categories with icons
- AC2: Grid of category cards with course count
- AC3: Click navigates to category detail page
- AC4: Category detail shows top courses and subcategories
- AC5: Breadcrumb navigation for subcategories

### 2.4 Homepage Sections

#### REQ-SRC-FE-014: Featured Courses Carousel [Phase 2]
The application SHALL display featured courses on homepage.

**Acceptance Criteria:**
- AC1: Hero carousel with 3-5 featured courses
- AC2: Auto-advance every 5 seconds
- AC3: Manual navigation with arrows and dots
- AC4: Each slide shows course image, title, instructor, CTA button
- AC5: Responsive layout for mobile

#### REQ-SRC-FE-015: Trending Section [Phase 3]
The application SHALL display trending courses on homepage.

**Acceptance Criteria:**
- AC1: Section shows top 8 trending courses
- AC2: Section title with view all link
- AC3: Horizontal carousel or grid layout
- AC4: Trending badge on each course

#### REQ-SRC-FE-016: Popular Categories Section [Phase 2]
The application SHALL display popular categories on homepage.

**Acceptance Criteria:**
- AC1: Grid of 8-12 category cards
- AC2: Each card shows icon, name, course count
- AC3: Hover effect with animation
- AC4: Click navigates to category page
- AC5: View all categories link

#### REQ-SRC-FE-017: Based on Your History Section [Phase 3]
The application SHALL display recommendations based on browsing history.

**Acceptance Criteria:**
- AC1: Section visible for logged-in users with history
- AC2: Shows 6-8 courses related to recently viewed
- AC3: Horizontal carousel layout
- AC4: Not shown if user has no history

### 2.5 Search Analytics (Admin)

#### REQ-SRC-FE-018: Search Analytics Dashboard [Phase 4]
The application SHALL provide search analytics dashboard for administrators.

**Acceptance Criteria:**
- AC1: Dashboard shows key metrics (total searches, CTR, conversion rate)
- AC2: Top search queries table with counts
- AC3: Zero-result searches table
- AC4: Search trends line chart
- AC5: Date range selector
- AC6: Export to CSV button

#### REQ-SRC-FE-019: Popular Search Terms [Phase 4]
The application SHALL display popular search terms.

**Acceptance Criteria:**
- AC1: Word cloud visualization of top terms
- AC2: Table view with frequency counts
- AC3: Trend indicators (rising, falling, stable)
- AC4: Filter by date range
- AC5: Search term click shows detailed analytics

#### REQ-SRC-FE-020: Search Performance Metrics [Phase 4]
The application SHALL display search performance metrics.

**Acceptance Criteria:**
- AC1: Average response time chart
- AC2: Error rate and timeout metrics
- AC3: Cache hit rate display
- AC4: Performance by query type breakdown
- AC5: Alerts for performance degradation

---

## 3. Component Architecture

### 3.1 Pages

| Component | Route | Description |
|-----------|-------|-------------|
| SearchPage | /search | Main search and filter page |
| RecommendationsPage | /recommendations | Personalized recommendations |
| TrendingPage | /trending | Trending courses |
| PopularPage | /popular | Popular courses |
| NewCourses | /new | New and noteworthy courses |
| CategoryBrowse | /categories | Browse all categories |
| CategoryDetail | /category/:id | Category detail page |
| SearchAnalyticsDashboard | /admin/analytics/search | Search analytics (admin) |

### 3.2 Components

| Component | Description |
|-----------|-------------|
| SearchInput | Autocomplete search input |
| FilterPanel | Collapsible filter sidebar |
| CourseCard | Course display card |
| CourseGrid | Responsive course grid |
| CategoryCard | Category card with icon |
| TrendingBadge | Trending indicator badge |
| RecommendationCarousel | Horizontal course carousel |
| FacetFilter | Filter with counts |
| SearchSortDropdown | Sort options dropdown |
| SearchPagination | Pagination controls |
| FeaturedCarousel | Hero carousel for featured courses |
| SearchAnalyticsChart | Analytics visualization |

### 3.3 Services

| Service | Description |
|---------|-------------|
| SearchService | Course search API calls |
| RecommendationService | Recommendations API calls |
| DiscoveryService | Trending and popular API calls |
| AnalyticsService | Search analytics API calls |

---

## 4. State Management

Per REQ-FE-009, state management SHALL use RxJS (not NgRx or Signals).

### 4.1 Search State

```typescript
interface SearchState {
  query: string;
  filters: SearchFilters;
  results: Course[];
  facets: FacetCounts;
  totalResults: number;
  currentPage: number;
  pageSize: number;
  sortBy: SortOption;
  isLoading: boolean;
  error: string | null;
}

interface SearchFilters {
  categories: string[];
  priceRange: { min: number; max: number } | null;
  levels: DifficultyLevel[];
  minRating: number | null;
  languages: string[];
  duration: { min: number; max: number } | null;
}
```

### 4.2 Recommendation State

```typescript
interface RecommendationState {
  personalized: Course[];
  similar: Course[];
  trending: Course[];
  isLoading: boolean;
  lastRefreshed: Date | null;
}
```

### 4.3 Discovery State

```typescript
interface DiscoveryState {
  trending: Course[];
  popular: Course[];
  newCourses: Course[];
  categories: Category[];
  isLoading: boolean;
}
```

---

## 5. UI/UX Requirements

### 5.1 Design System

Per REQ-FE-006 and REQ-FE-010, the application SHALL use Angular Material with Material 3 guidelines and default theme colors.

**Material Components to Use:**
- mat-form-field for search input
- mat-autocomplete for suggestions
- mat-checkbox for filter checkboxes
- mat-slider for price range
- mat-select for dropdowns
- mat-chip for active filters
- mat-card for course cards
- mat-paginator for pagination
- mat-menu for sort options

### 5.2 Responsive Design

Per REQ-FE-018, all pages SHALL be responsive and follow mobile-first design:
- Mobile: Single column, filters in drawer, stacked layout
- Tablet: Two column grid, sidebar filters
- Desktop: Three-four column grid, fixed filter panel

### 5.3 Loading States

- Search results: Skeleton cards (6-12 cards)
- Autocomplete: Loading spinner in input
- Carousels: Shimmer effect
- Filters: Disabled state while loading

### 5.4 Empty States

- No search results: Helpful message with search tips
- No recommendations: Message for new users
- No history: Encourage browsing categories
- Error state: Retry button and error message

### 5.5 Accessibility

- Search input MUST have clear label
- Filter controls MUST be keyboard accessible
- Course cards MUST have proper ARIA labels
- Screen reader announcements for results count
- Focus management for modal filters

### 5.6 Component Naming

Per REQ-FE-012 and REQ-FE-013:
- Class names SHALL NOT have "Component" suffix
- File names SHALL NOT have "component" prefix

---

## 6. Performance Optimization

### 6.1 Lazy Loading

- Course images lazy loaded with placeholders
- Infinite scroll for search results (optional)
- Below-fold carousels loaded on demand

### 6.2 Debouncing

- Search input debounced (300ms)
- Autocomplete debounced (200ms)
- Filter changes debounced (150ms)

### 6.3 Caching

- Search results cached for 5 minutes
- Recommendations cached until page refresh
- Category data cached in session storage

---

## 7. Search Interactions

### 7.1 Search Flow

1. User types in search input
2. Autocomplete appears after 3 characters
3. User selects suggestion or presses enter
4. Results load with loading skeleton
5. Filters and facets update
6. User can refine with filters
7. Results update in real-time

### 7.2 Filter Flow

1. User clicks filter option
2. Filter chip appears above results
3. Results update immediately
4. Facet counts recalculate
5. User can remove filter by clicking chip X
6. Clear all resets to default state

### 7.3 Pagination

- Server-side pagination preferred
- Page size options: 12, 24, 48
- URL updates with page number
- Scroll to top on page change

---

## 8. Analytics Tracking

Track the following user interactions:
- Search query submitted
- Autocomplete suggestion clicked
- Filter applied/removed
- Sort option changed
- Course card clicked from search
- Recommendation clicked
- Category browsed
- Trending course viewed

---

## 9. Error Handling

### 9.1 API Errors

| Error Code | User Message |
|------------|--------------|
| 400 | Invalid search query. Please try again. |
| 404 | No courses found. Try different keywords. |
| 429 | Too many requests. Please wait a moment. |
| 500 | Search is unavailable. Please try again later. |

### 9.2 Network Errors

- Show offline message if network unavailable
- Retry button for failed requests
- Cache previous results if available

---

## 10. Testing Requirements

### 10.1 Unit Tests (Jest)

Per REQ-FE-021, unit tests SHALL use Jest:
- Test search input validation
- Test filter state management
- Test sort and pagination logic
- Test service API calls with mocks
- Minimum 80% code coverage

### 10.2 E2E Tests (Playwright)

Per REQ-FE-022, E2E tests SHALL use Playwright:
- Test complete search flow
- Test filter application and removal
- Test autocomplete interaction
- Test pagination navigation
- Test recommendation carousel
- Test responsive layouts

---

## 11. Implementation Notes

### 11.1 API Base URL

Per REQ-FE-026, the baseUrl configuration SHALL contain ONLY the base URI:
```typescript
// Correct
baseUrl = "http://localhost:7200"
this.http.get(`${baseUrl}/api/search/courses`)

// Incorrect
baseUrl = "http://localhost:7200/api"
```

### 11.2 File Structure

Per REQ-FE-015 and REQ-FE-016:
- Pages in `pages/` folder
- Reusable components in `components/` folder
- Barrel exports in each folder

### 11.3 URL Query Parameters

Search state SHALL be reflected in URL query parameters:
```
/search?q=python&category=programming&level=beginner&sort=rating&page=2
```

This allows:
- Direct link sharing
- Browser back/forward navigation
- Bookmark specific searches

---

*Document Version: 1.0*
*Phase Coverage: 2-5*
