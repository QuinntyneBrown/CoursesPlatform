# Search & Discovery - Backend Specification

**Feature:** Search & Discovery
**Version:** 1.0
**Last Updated:** December 2024

---

## 1. Overview

The Search & Discovery feature provides course search, filtering, recommendations, trending courses, and search analytics for the CoursesPlatform system.

---

## 2. Requirements

### 2.1 Course Discovery

#### REQ-SRC-001: Basic Course Search [Phase 2]
The system SHALL allow users to search for courses using keywords.

**Acceptance Criteria:**
- AC1: User can search by course title, description, and instructor name
- AC2: Search supports partial matching and case-insensitive queries
- AC3: Results are paginated with configurable page size
- AC4: CourseSearched event is published
- AC5: Search query and user ID are logged for analytics
- AC6: Results return course ID, title, thumbnail, instructor, rating, and price

#### REQ-SRC-002: Course Filtering [Phase 2]
The system SHALL allow users to filter courses by multiple criteria.

**Acceptance Criteria:**
- AC1: User can filter by category, subcategory, and topic
- AC2: User can filter by price range (free, paid, price range)
- AC3: User can filter by difficulty level (beginner, intermediate, advanced)
- AC4: User can filter by rating (4+ stars, 3+ stars, etc.)
- AC5: User can filter by language
- AC6: Filters can be combined with search queries
- AC7: CourseFiltered event is published

#### REQ-SRC-003: Course Sorting [Phase 2]
The system SHALL allow users to sort search results.

**Acceptance Criteria:**
- AC1: User can sort by relevance (default)
- AC2: User can sort by popularity (enrollment count)
- AC3: User can sort by rating (highest first)
- AC4: User can sort by newest first
- AC5: User can sort by price (low to high, high to low)
- AC6: Sorting persists with pagination

#### REQ-SRC-004: Faceted Search [Phase 2]
The system SHALL provide facet counts for available filters.

**Acceptance Criteria:**
- AC1: System returns count of courses per category
- AC2: System returns count of courses per difficulty level
- AC3: System returns count of courses per language
- AC4: System returns count of courses per price range
- AC5: Facet counts update based on active filters

#### REQ-SRC-005: Search Autocomplete [Phase 2]
The system SHALL provide autocomplete suggestions as users type.

**Acceptance Criteria:**
- AC1: Suggestions appear after 3 characters typed
- AC2: Suggestions include course titles and instructor names
- AC3: Maximum 10 suggestions returned
- AC4: Suggestions ranked by popularity and relevance
- AC5: SearchAutoCompleteRequested event is published

#### REQ-SRC-006: Advanced Search [Phase 3]
The system SHALL support advanced search with multiple criteria.

**Acceptance Criteria:**
- AC1: User can search with boolean operators (AND, OR, NOT)
- AC2: User can search by exact phrase matching
- AC3: User can exclude keywords from results
- AC4: User can filter by course duration
- AC5: User can filter by video quality (HD, 4K)
- AC6: User can filter by last updated date

### 2.2 Recommendations

#### REQ-SRC-007: Personalized Recommendations [Phase 3]
The system SHALL provide personalized course recommendations.

**Acceptance Criteria:**
- AC1: Recommendations based on user's enrolled courses
- AC2: Recommendations based on user's browsing history
- AC3: Recommendations based on user's wishlist
- AC4: Recommendations based on user's learning preferences
- AC5: Maximum 20 recommendations returned
- AC6: RecommendationsGenerated event is published
- AC7: Results include relevance score

#### REQ-SRC-008: Similar Courses [Phase 3]
The system SHALL recommend similar courses based on current course.

**Acceptance Criteria:**
- AC1: Recommendations based on category and topic similarity
- AC2: Recommendations based on instructor's other courses
- AC3: Recommendations exclude already enrolled courses
- AC4: Maximum 12 similar courses returned
- AC5: SimilarCoursesRequested event is published
- AC6: Results ranked by similarity score

#### REQ-SRC-009: Collaborative Filtering [Phase 3]
The system SHALL use collaborative filtering for recommendations.

**Acceptance Criteria:**
- AC1: Recommendations based on similar users' enrollments
- AC2: System identifies users with similar learning patterns
- AC3: Recommendations weighted by user similarity score
- AC4: Minimum 10 similar users required for recommendations
- AC5: CollaborativeFilteringApplied event is published

#### REQ-SRC-010: Content-Based Filtering [Phase 3]
The system SHALL use content-based filtering for recommendations.

**Acceptance Criteria:**
- AC1: System analyzes course content and metadata
- AC2: Recommendations based on topic and skill matching
- AC3: Recommendations based on difficulty level progression
- AC4: Content similarity calculated using TF-IDF or similar
- AC5: ContentBasedFilteringApplied event is published

#### REQ-SRC-011: Recommendation Refresh [Phase 3]
The system SHALL periodically refresh user recommendations.

**Acceptance Criteria:**
- AC1: Recommendations refreshed daily for active users
- AC2: Recommendations refreshed after enrollment or completion
- AC3: Recommendations refreshed after wishlist changes
- AC4: RecommendationsRefreshed event is published
- AC5: Stale recommendations (30+ days) are regenerated

### 2.3 Trending & Popular

#### REQ-SRC-012: Trending Courses [Phase 3]
The system SHALL identify and display trending courses.

**Acceptance Criteria:**
- AC1: Trending based on enrollment velocity (last 7 days)
- AC2: Trending based on rating improvements
- AC3: Trending based on social shares and reviews
- AC4: Trending score calculated hourly
- AC5: Maximum 24 trending courses displayed
- AC6: TrendingCoursesCalculated event is published

#### REQ-SRC-013: Popular Courses [Phase 2]
The system SHALL display popular courses by category.

**Acceptance Criteria:**
- AC1: Popularity based on total enrollment count
- AC2: Popularity based on average rating (minimum 10 ratings)
- AC3: Popularity calculated per category
- AC4: Maximum 12 popular courses per category
- AC5: PopularCoursesRequested event is published

#### REQ-SRC-014: New & Noteworthy [Phase 3]
The system SHALL highlight new and noteworthy courses.

**Acceptance Criteria:**
- AC1: New courses published within last 30 days
- AC2: Minimum rating of 4.0 required
- AC3: Minimum 20 enrollments required
- AC4: Sorted by rating and enrollment velocity
- AC5: NewCoursesHighlighted event is published

#### REQ-SRC-015: Instructor Trending [Phase 3]
The system SHALL identify trending instructors.

**Acceptance Criteria:**
- AC1: Trending based on total student enrollments
- AC2: Trending based on average course ratings
- AC3: Trending based on new course publications
- AC4: Maximum 20 trending instructors
- AC5: TrendingInstructorsCalculated event is published

### 2.4 Search Analytics

#### REQ-SRC-016: Search Query Logging [Phase 4]
The system SHALL log all search queries for analytics.

**Acceptance Criteria:**
- AC1: Log search query text, user ID, and timestamp
- AC2: Log applied filters and sort criteria
- AC3: Log result count and clicked courses
- AC4: Log user session and device information
- AC5: SearchQueryLogged event is published
- AC6: PII is anonymized per GDPR requirements

#### REQ-SRC-017: Search Analytics Dashboard [Phase 4]
The system SHALL provide search analytics dashboard for administrators.

**Acceptance Criteria:**
- AC1: Display top search queries (last 7/30/90 days)
- AC2: Display zero-result searches
- AC3: Display average results per query
- AC4: Display click-through rates
- AC5: Display search-to-enrollment conversion rate
- AC6: Export analytics data in CSV format

#### REQ-SRC-018: Popular Search Terms [Phase 4]
The system SHALL track and display popular search terms.

**Acceptance Criteria:**
- AC1: Track search term frequency
- AC2: Track search term trends (rising, falling)
- AC3: Display top 100 search terms
- AC4: Filter by date range
- AC5: PopularSearchTermsCalculated event is published

#### REQ-SRC-019: Search Performance Metrics [Phase 4]
The system SHALL track search performance metrics.

**Acceptance Criteria:**
- AC1: Track average search response time
- AC2: Track search error rate
- AC3: Track search timeout rate
- AC4: Alert when performance degrades
- AC5: SearchPerformanceMetricsCalculated event is published

#### REQ-SRC-020: A/B Testing Support [Phase 5]
The system SHALL support A/B testing for search algorithms.

**Acceptance Criteria:**
- AC1: System can route users to different search variants
- AC2: Track conversion metrics per variant
- AC3: ABTestVariantAssigned event is published
- AC4: Results can be compared in analytics dashboard
- AC5: Support for multiple concurrent experiments

### 2.5 Search Optimization

#### REQ-SRC-021: Search Indexing [Phase 2]
The system SHALL maintain search indexes for fast retrieval.

**Acceptance Criteria:**
- AC1: Indexes updated when course is created or modified
- AC2: Indexes updated when course is published or unpublished
- AC3: Full reindex can be triggered manually
- AC4: SearchIndexUpdated event is published
- AC5: Index includes course metadata, instructor info, and reviews

#### REQ-SRC-022: Search Result Caching [Phase 3]
The system SHALL cache frequently requested search results.

**Acceptance Criteria:**
- AC1: Cache popular search queries for 15 minutes
- AC2: Cache invalidated when courses are updated
- AC3: Cache hit rate tracked in metrics
- AC4: SearchResultsCached event is published

#### REQ-SRC-023: Search Query Normalization [Phase 2]
The system SHALL normalize search queries for better results.

**Acceptance Criteria:**
- AC1: Remove special characters and punctuation
- AC2: Convert to lowercase
- AC3: Remove common stop words
- AC4: Apply stemming for keyword matching
- AC5: Handle typos with fuzzy matching

#### REQ-SRC-024: Search Relevance Tuning [Phase 3]
The system SHALL support relevance tuning for search results.

**Acceptance Criteria:**
- AC1: Administrators can adjust field weights (title, description, etc.)
- AC2: Administrators can boost courses by category
- AC3: Administrators can configure minimum score threshold
- AC4: SearchRelevanceTuned event is published

---

## 3. Domain Model

### 3.1 Entities

| Entity | Description |
|--------|-------------|
| SearchQuery | User search query with filters and results |
| SearchResult | Individual course in search results |
| Recommendation | Personalized course recommendation |
| TrendingCourse | Course with trending score and rank |
| SearchAnalytics | Aggregated search analytics data |
| SearchIndex | Indexed course data for search |
| UserSearchHistory | User's past search queries |
| SearchSuggestion | Autocomplete suggestion |

### 3.2 Domain Events

| Event | Trigger |
|-------|---------|
| CourseSearched | User performs search |
| CourseFiltered | User applies filters |
| SearchAutoCompleteRequested | User types in search box |
| RecommendationsGenerated | System generates recommendations |
| SimilarCoursesRequested | User views similar courses |
| CollaborativeFilteringApplied | Collaborative filtering runs |
| ContentBasedFilteringApplied | Content-based filtering runs |
| RecommendationsRefreshed | User recommendations updated |
| TrendingCoursesCalculated | Trending scores calculated |
| PopularCoursesRequested | User views popular courses |
| NewCoursesHighlighted | New courses featured |
| TrendingInstructorsCalculated | Trending instructors identified |
| SearchQueryLogged | Search query logged for analytics |
| PopularSearchTermsCalculated | Popular terms aggregated |
| SearchPerformanceMetricsCalculated | Performance metrics computed |
| ABTestVariantAssigned | User assigned to A/B test |
| SearchIndexUpdated | Search index updated |
| SearchResultsCached | Results cached |
| SearchRelevanceTuned | Relevance parameters adjusted |

---

## 4. API Endpoints

### 4.1 Course Search

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/search/courses | Search courses with filters |
| GET | /api/search/autocomplete | Get search suggestions |
| GET | /api/search/facets | Get facet counts |

### 4.2 Recommendations

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/recommendations/personalized | Get personalized recommendations |
| GET | /api/recommendations/similar/{courseId} | Get similar courses |
| POST | /api/recommendations/refresh | Refresh user recommendations |

### 4.3 Trending & Popular

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/discovery/trending | Get trending courses |
| GET | /api/discovery/popular | Get popular courses |
| GET | /api/discovery/new-noteworthy | Get new and noteworthy courses |
| GET | /api/discovery/trending-instructors | Get trending instructors |

### 4.4 Search Analytics

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/analytics/search/queries | Get top search queries |
| GET | /api/analytics/search/terms | Get popular search terms |
| GET | /api/analytics/search/performance | Get search performance metrics |
| POST | /api/analytics/search/export | Export analytics data |

### 4.5 Search Administration

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/admin/search/reindex | Trigger full reindex |
| PUT | /api/admin/search/relevance | Update relevance settings |
| GET | /api/admin/search/index-status | Get index status |

---

## 5. Search Algorithm

### 5.1 Relevance Scoring

Search results are ranked using a weighted scoring algorithm:

```
Score = (TitleMatch × 3.0) + (DescriptionMatch × 1.5) + (InstructorMatch × 2.0)
      + (RatingBoost) + (PopularityBoost) + (RecencyBoost)
```

Where:
- TitleMatch: TF-IDF score for query terms in course title
- DescriptionMatch: TF-IDF score for query terms in description
- InstructorMatch: TF-IDF score for query terms in instructor name
- RatingBoost: 0.1 × (average rating - 3.0)
- PopularityBoost: log(enrollment count + 1) × 0.2
- RecencyBoost: 0.05 if published within last 30 days

### 5.2 Recommendation Algorithm

Hybrid recommendation combining:
- 40% Collaborative Filtering (user-based)
- 40% Content-Based Filtering (course similarity)
- 20% Trending/Popular courses

### 5.3 Trending Score

```
TrendingScore = (EnrollmentVelocity × 0.5) + (RatingImprovement × 0.3)
              + (SocialEngagement × 0.2)
```

Where:
- EnrollmentVelocity: (Enrollments last 7 days) / (Average enrollments per week)
- RatingImprovement: Rating change in last 30 days
- SocialEngagement: (Reviews + Shares) in last 7 days

---

## 6. Performance Requirements

- Search response time MUST be < 500ms for 95th percentile
- Autocomplete response time MUST be < 200ms
- Recommendations MUST be pre-calculated and cached
- Search index updates MUST complete within 5 seconds
- Support 1000 concurrent search requests

---

## 7. Security Considerations

- Search queries MUST be sanitized to prevent injection attacks
- Rate limiting MUST be applied (60 requests per minute per user)
- Search analytics data MUST anonymize PII
- Admin endpoints MUST require administrator role
- Search index MUST exclude unpublished courses for non-instructors

---

## 8. Dependencies

- Elasticsearch or similar for full-text search and indexing
- Redis for caching search results and recommendations
- Serilog for structured logging
- MediatR for CQRS pattern
- Entity Framework Core for data access
- FluentValidation for request validation

---

## 9. Implementation Notes

Per the implementation specification (REQ-SYS-005, REQ-SYS-006), all data access SHALL use ICoursesPlatformContext directly without repository pattern.

Search indexing can be implemented using:
- Option 1: Elasticsearch for advanced full-text search
- Option 2: SQL Server Full-Text Search for simpler implementation
- Option 3: PostgreSQL with pg_trgm for similarity search

Recommendation engine can be implemented using:
- Collaborative filtering with user-item matrix
- Content-based filtering with TF-IDF and cosine similarity
- Hybrid approach combining both methods

---

*Document Version: 1.0*
*Phase Coverage: 2-5*
