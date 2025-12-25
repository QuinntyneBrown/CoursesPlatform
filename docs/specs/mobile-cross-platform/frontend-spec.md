# Mobile Cross-Platform Frontend Specification

**Feature:** Mobile Cross-Platform Frontend (PWA + Mobile Responsive)
**Phase:** 5 (Enterprise Feature)
**Status:** Draft
**Version:** 1.0
**Date:** 2025-12-25

---

## 1. Overview

This specification defines the frontend requirements for mobile cross-platform support in the CoursesPlatform system, focusing on Progressive Web App (PWA) capabilities, offline-first architecture, responsive mobile design, and cross-device synchronization.

### 1.1 Key Capabilities
- Progressive Web App (PWA) with offline support
- Mobile-responsive design (mobile-first approach)
- Offline content access and synchronization
- Push notification handling
- Download management interface
- Cross-device state synchronization
- Native-like mobile experience
- Adaptive UI based on network conditions

---

## 2. Architecture Requirements

### REQ-MOB-FE-001: PWA Configuration
**Phase:** 5
**Priority:** High

The frontend SHALL be configured as a Progressive Web App (PWA).

**Acceptance Criteria:**
- Service Worker registered and active
- Web App Manifest (manifest.json) configured
- App name: "CoursesPlatform"
- Theme color: Angular Material primary color
- Background color: Angular Material background color
- Display mode: standalone
- Orientation: any
- Start URL: /
- Icons: 192x192, 512x512 (PNG format)
- Installable on mobile devices (iOS/Android)
- Add to homescreen prompt
- Offline page displayed when network unavailable

**Implementation:**
- Configuration: `src/CoursesPlatform.WebApp/projects/CoursesPlatform/src/manifest.json`
- Service Worker: `src/CoursesPlatform.WebApp/projects/CoursesPlatform/src/ngsw-config.json`
- Module: `@angular/service-worker` in app configuration

---

### REQ-MOB-FE-002: Offline-First Architecture
**Phase:** 5
**Priority:** High

The frontend SHALL implement offline-first architecture using service workers.

**Acceptance Criteria:**
- Service worker caches application shell (HTML, CSS, JS)
- API responses cached for offline access (cache-first strategy)
- Background sync for failed requests when online
- IndexedDB for offline data storage
- Automatic cache updates on app version change
- Cache size limit: 50MB
- Expired cache cleanup (7-day retention)
- Offline indicator in UI
- Graceful degradation when offline
- Queue failed mutations for retry when online

**Implementation:**
- Service Worker: Angular Service Worker (ngsw)
- Cache strategies in ngsw-config.json: cache-first for static, network-first for API
- Storage: IndexedDB via Dexie.js wrapper
- Service: `OfflineStorageService` in `src/CoursesPlatform.WebApp/projects/CoursesPlatform/src/services/offline-storage.service.ts`

---

### REQ-MOB-FE-003: State Management with RxJS
**Phase:** 5
**Priority:** High

The frontend SHALL use RxJS for state management (NO NgRx, NO Signals).

**Acceptance Criteria:**
- BehaviorSubject for state management
- Dedicated state services for each feature domain
- Immutable state updates
- State persistence to IndexedDB for offline
- Observable streams for reactive UI updates
- Subscription management (automatic cleanup)
- State initialization on app load
- State sync across tabs (BroadcastChannel)
- No NgRx store or effects
- No Angular signals

**Implementation:**
- Pattern: State service with BehaviorSubject
- Location: `src/CoursesPlatform.WebApp/projects/CoursesPlatform/src/services/state/`
- Services: `DeviceStateService`, `OfflineContentStateService`, `SyncStateService`, `DownloadQueueStateService`
- Base class: `BaseStateService` with common state operations
- Cleanup: takeUntil pattern with destroyed$ subject

---

### REQ-MOB-FE-004: Responsive Mobile-First Design
**Phase:** 5
**Priority:** High

The frontend SHALL use mobile-first responsive design.

**Acceptance Criteria:**
- Breakpoints: mobile (<600px), tablet (600-1024px), desktop (>1024px)
- Mobile-first CSS (base styles for mobile, media queries for larger screens)
- Touch-optimized UI (44px minimum touch target)
- Responsive images with srcset
- Responsive typography (viewport units)
- Layout adapts to screen size (single column mobile, multi-column desktop)
- Hamburger menu on mobile, full navigation on desktop
- Bottom navigation on mobile (top navigation on desktop)
- Swipe gestures for mobile (HammerJS)
- Viewport meta tag configured

**Implementation:**
- SCSS breakpoint mixins in `src/CoursesPlatform.WebApp/projects/CoursesPlatform/src/styles/_breakpoints.scss`
- BEM naming convention for CSS classes
- Angular Material responsive utilities
- HammerJS for gesture support
- Viewport: `<meta name="viewport" content="width=device-width, initial-scale=1">`

---

## 3. UI Component Requirements

### REQ-MOB-FE-005: Mobile Navigation Component
**Phase:** 5
**Priority:** High

The frontend SHALL implement mobile-optimized navigation.

**Acceptance Criteria:**
- Bottom navigation bar on mobile (<600px)
- Icons with labels for navigation items
- Active state indication (Material primary color)
- Maximum 5 navigation items
- Navigation items: Home, My Courses, Downloads, Profile
- Swipe-able tabs for content within pages
- Drawer navigation for secondary items
- Back button support (browser history)
- Angular Material bottom navigation (mat-tab-nav-bar)

**Implementation:**
- Component: `MobileNavigation` in `src/CoursesPlatform.WebApp/projects/CoursesPlatform/src/components/mobile-navigation/`
- Files: `mobile-navigation.html`, `mobile-navigation.scss`, `mobile-navigation.ts`
- Material: `MatBottomNavigation`, `MatIcon`
- Responsive: Hidden on desktop, shown on mobile

---

### REQ-MOB-FE-006: Download Management Component
**Phase:** 5
**Priority:** High

The frontend SHALL provide download management interface.

**Acceptance Criteria:**
- Download queue list with progress indicators
- Each item shows: title, file size, progress percentage, status
- Actions: pause, resume, cancel, retry
- Priority reordering (drag and drop)
- Total download size and estimated time
- Network speed indicator
- Download on WiFi only option
- Storage usage display
- Empty state when no downloads
- Angular Material progress bars (mat-progress-bar)
- Virtual scrolling for large lists (CDK)

**Implementation:**
- Component: `DownloadManager` in `src/CoursesPlatform.WebApp/projects/CoursesPlatform/src/pages/download-manager/`
- Service: `DownloadService` for managing downloads
- Material: `MatList`, `MatProgressBar`, `MatIcon`, `MatButton`
- CDK: `CdkVirtualScrollViewport` for performance

---

### REQ-MOB-FE-007: Offline Content Viewer
**Phase:** 5
**Priority:** High

The frontend SHALL display offline-available content.

**Acceptance Criteria:**
- List of downloaded courses and lessons
- Offline indicator badge on downloaded content
- Filter: all content vs. offline-only
- Search within offline content
- Content expiration warnings
- Storage space per course
- Delete downloaded content option
- Sync status indicator (up-to-date, needs sync, syncing)
- Angular Material cards for content display
- Expansion panels for course lessons

**Implementation:**
- Component: `OfflineContentViewer` in `src/CoursesPlatform.WebApp/projects/CoursesPlatform/src/pages/offline-content/`
- Service: `OfflineContentService` to retrieve cached content
- Material: `MatCard`, `MatExpansionPanel`, `MatChip`, `MatIcon`
- Storage: Query IndexedDB for offline content

---

### REQ-MOB-FE-008: Sync Status Component
**Phase:** 5
**Priority:** Medium

The frontend SHALL display synchronization status to users.

**Acceptance Criteria:**
- Sync status badge in header (synced, syncing, error)
- Last sync timestamp display
- Manual sync trigger button
- Sync progress indicator
- Conflict resolution notifications
- Pending changes count
- Pull-to-refresh gesture for manual sync
- Background sync status
- Angular Material badge and progress spinner

**Implementation:**
- Component: `SyncStatus` in `src/CoursesPlatform.WebApp/projects/CoursesPlatform/src/components/sync-status/`
- Service: `SyncService` for synchronization operations
- Material: `MatBadge`, `MatProgressSpinner`, `MatIcon`, `MatSnackBar`
- Gesture: Pull-to-refresh using custom directive

---

### REQ-MOB-FE-009: Push Notification Handler
**Phase:** 5
**Priority:** High

The frontend SHALL handle push notifications.

**Acceptance Criteria:**
- Request notification permission on user opt-in
- Display notification permission prompt (non-intrusive)
- Handle notification click (navigate to relevant content)
- Notification badge count update
- In-app notification display when app is active
- Notification preferences UI
- Types: course updates, new content, messages, achievements
- Quiet hours configuration
- Notification history view
- Angular Material snack bar for in-app notifications

**Implementation:**
- Service: `PushNotificationService` in `src/CoursesPlatform.WebApp/projects/CoursesPlatform/src/services/push-notification.service.ts`
- Component: `NotificationPreferences` in pages folder
- Material: `MatSnackBar`, `MatSlideToggle`, `MatFormField`
- API: Firebase Cloud Messaging (FCM) for web
- Permissions: Notification API

---

### REQ-MOB-FE-010: Network Status Indicator
**Phase:** 5
**Priority:** Medium

The frontend SHALL display network connectivity status.

**Acceptance Criteria:**
- Online/offline indicator in header
- Network quality indicator (fast, slow, offline)
- Connection type display (WiFi, cellular, offline)
- Bandwidth estimation
- Offline mode banner (dismissible)
- Reconnection notification
- Network-aware content loading
- Angular Material chip for status display

**Implementation:**
- Component: `NetworkStatus` in `src/CoursesPlatform.WebApp/projects/CoursesPlatform/src/components/network-status/`
- Service: `NetworkStatusService` monitoring connection
- Material: `MatChip`, `MatIcon`, `MatSnackBar`
- API: Navigator.connection (Network Information API)

---

## 4. Service Layer Requirements

### REQ-MOB-FE-011: Device Registration Service
**Phase:** 5
**Priority:** High

The frontend SHALL implement device registration service.

**Acceptance Criteria:**
- Register device on first app load
- Store deviceId in localStorage
- Include platform detection (iOS, Android, Web)
- Browser fingerprinting for web
- Device token generation
- Auto-update device info on app version change
- Deregister device on logout (optional)
- Error handling with retry mechanism
- RxJS observable pattern

**Implementation:**
- Service: `DeviceRegistrationService` in `src/CoursesPlatform.WebApp/projects/CoursesPlatform/src/services/device-registration.service.ts`
- API endpoint: POST /api/devices/register
- Storage: deviceId in localStorage
- Detection: User-Agent parsing, platform APIs
- HTTP: Angular HttpClient

---

### REQ-MOB-FE-012: Offline Storage Service
**Phase:** 5
**Priority:** High

The frontend SHALL implement offline storage service using IndexedDB.

**Acceptance Criteria:**
- IndexedDB wrapper service
- Object stores: courses, lessons, videos, resources, progress, queue
- CRUD operations for each store
- Bulk operations support
- Query with filtering and sorting
- Storage quota management
- Automatic cleanup of expired data
- Error handling and fallback
- TypeScript typed interfaces
- Observable API (RxJS)

**Implementation:**
- Service: `OfflineStorageService` in `src/CoursesPlatform.WebApp/projects/CoursesPlatform/src/services/offline-storage.service.ts`
- Library: Dexie.js for IndexedDB
- Schema: Version 1 with defined object stores
- Indexes: for efficient querying
- Size limit: 50MB total

---

### REQ-MOB-FE-013: Content Download Service
**Phase:** 5
**Priority:** High

The frontend SHALL implement content download service.

**Acceptance Criteria:**
- Download content for offline access
- Queue management (add, remove, reorder)
- Progress tracking per download
- Pause/resume support
- Cancel download capability
- Retry failed downloads (max 3 attempts)
- WiFi-only download option
- Concurrent download limit (3 simultaneous)
- Download completion notification
- Save downloaded content to IndexedDB
- RxJS observable streams for progress

**Implementation:**
- Service: `ContentDownloadService` in `src/CoursesPlatform.WebApp/projects/CoursesPlatform/src/services/content-download.service.ts`
- API: GET /api/offline/content/download
- Storage: Save to IndexedDB via OfflineStorageService
- Progress: XMLHttpRequest for progress events or Fetch with Response.body streams
- State: BehaviorSubject for download queue state

---

### REQ-MOB-FE-014: Sync Service
**Phase:** 5
**Priority:** High

The frontend SHALL implement synchronization service for progress and content.

**Acceptance Criteria:**
- Background sync when online
- Manual sync trigger
- Sync progress data (upload local changes)
- Sync content updates (download server changes)
- Conflict detection and resolution
- Sync state management (idle, syncing, error)
- Last sync timestamp tracking
- Incremental sync (delta updates)
- Sync queue for failed operations
- Retry mechanism with exponential backoff
- Observable sync status

**Implementation:**
- Service: `SyncService` in `src/CoursesPlatform.WebApp/projects/CoursesPlatform/src/services/sync.service.ts`
- API: POST /api/sync/progress, GET /api/sync/progress
- Storage: Update IndexedDB after sync
- State: BehaviorSubject for sync state
- Background Sync: Service Worker background sync API
- Interval: Auto-sync every 5 minutes when online

---

### REQ-MOB-FE-015: Network Status Service
**Phase:** 5
**Priority:** Medium

The frontend SHALL implement network status monitoring service.

**Acceptance Criteria:**
- Monitor online/offline status
- Detect connection changes
- Network quality estimation (effective connection type)
- Bandwidth estimation
- Connection type (WiFi, cellular, etc.)
- Observable streams for status changes
- Emit events on connection change
- Persist last known status
- Support for Network Information API

**Implementation:**
- Service: `NetworkStatusService` in `src/CoursesPlatform.WebApp/projects/CoursesPlatform/src/services/network-status.service.ts`
- Events: window online/offline events
- API: Navigator.onLine, Navigator.connection
- State: BehaviorSubject for network status
- Types: NetworkStatus interface with quality, type, online properties

---

## 5. State Management Requirements

### REQ-MOB-FE-016: Device State Service
**Phase:** 5
**Priority:** High

The frontend SHALL implement device state management.

**Acceptance Criteria:**
- BehaviorSubject for device state
- State properties: deviceId, platform, isRegistered, registeredAt, lastActiveAt
- State persistence to localStorage
- State initialization on app start
- State updates on device registration
- Observable stream for reactive UI
- Immutable state updates
- TypeScript typed state interface

**Implementation:**
- Service: `DeviceStateService` in `src/CoursesPlatform.WebApp/projects/CoursesPlatform/src/services/state/device-state.service.ts`
- Pattern: BehaviorSubject with private setter
- Storage: localStorage for persistence
- Interface: DeviceState with all properties

---

### REQ-MOB-FE-017: Offline Content State Service
**Phase:** 5
**Priority:** High

The frontend SHALL implement offline content state management.

**Acceptance Criteria:**
- BehaviorSubject for offline content list
- State includes: contentId, contentType, title, fileSize, downloadedAt, expiresAt, version
- State loaded from IndexedDB on init
- State updates on download/delete
- Filtering methods (by type, by expiration)
- Search functionality
- Total storage calculation
- Observable stream for UI binding
- Immutable state updates

**Implementation:**
- Service: `OfflineContentStateService` in `src/CoursesPlatform.WebApp/projects/CoursesPlatform/src/services/state/offline-content-state.service.ts`
- Pattern: BehaviorSubject with computed observables
- Storage: Query IndexedDB on state load
- Interface: OfflineContentState, OfflineContentItem

---

### REQ-MOB-FE-018: Download Queue State Service
**Phase:** 5
**Priority:** High

The frontend SHALL implement download queue state management.

**Acceptance Criteria:**
- BehaviorSubject for download queue
- Queue items: contentId, title, priority, status, progress, estimatedSize
- Status types: queued, downloading, completed, failed, cancelled
- State updates on queue operations (add, remove, update)
- Priority reordering methods
- Active downloads count
- Total queue size calculation
- Observable stream for UI
- Immutable state updates

**Implementation:**
- Service: `DownloadQueueStateService` in `src/CoursesPlatform.WebApp/projects/CoursesPlatform/src/services/state/download-queue-state.service.ts`
- Pattern: BehaviorSubject with action methods
- Interface: DownloadQueueState, QueueItem
- Methods: addToQueue(), removeFromQueue(), updateProgress(), reorderQueue()

---

### REQ-MOB-FE-019: Sync State Service
**Phase:** 5
**Priority:** Medium

The frontend SHALL implement sync state management.

**Acceptance Criteria:**
- BehaviorSubject for sync state
- State properties: isSyncing, lastSyncTimestamp, pendingChanges, syncErrors
- State updates during sync operations
- Error state management
- Pending changes count
- Observable stream for UI indicators
- Sync trigger methods
- Immutable state updates

**Implementation:**
- Service: `SyncStateService` in `src/CoursesPlatform.WebApp/projects/CoursesPlatform/src/services/state/sync-state.service.ts`
- Pattern: BehaviorSubject with sync methods
- Interface: SyncState with status properties
- Methods: startSync(), completSync(), errorSync()

---

## 6. Routing and Navigation Requirements

### REQ-MOB-FE-020: Mobile Route Configuration
**Phase:** 5
**Priority:** Medium

The frontend SHALL configure routes for mobile pages.

**Acceptance Criteria:**
- Routes: /downloads, /offline, /sync, /notifications, /device-settings
- Lazy loading for mobile feature modules
- Route guards for authentication
- Preloading strategy for frequently accessed routes
- Route transitions with animations
- Deep linking support
- Browser back button handling
- Route metadata for page titles

**Implementation:**
- Routes: `src/CoursesPlatform.WebApp/projects/CoursesPlatform/src/app-routes.ts`
- Modules: Lazy loaded feature modules for mobile pages
- Guards: AuthGuard for protected routes
- Preloading: PreloadAllModules or custom strategy

---

### REQ-MOB-FE-021: Mobile Navigation Guards
**Phase:** 5
**Priority:** Medium

The frontend SHALL implement navigation guards for mobile features.

**Acceptance Criteria:**
- DeviceRegistrationGuard: ensure device registered before accessing mobile features
- OfflineGuard: check offline content availability
- SyncGuard: prevent navigation during critical sync
- Authentication guard integration
- Redirect to appropriate pages on guard failure
- User notifications for guard blocks

**Implementation:**
- Guards: `src/CoursesPlatform.WebApp/projects/CoursesPlatform/src/guards/`
- Files: `device-registration.guard.ts`, `offline.guard.ts`
- Interface: CanActivate implementation
- Redirect: Router navigation to appropriate pages

---

## 7. Material Design Component Requirements

### REQ-MOB-FE-022: Angular Material 3 Components
**Phase:** 5
**Priority:** High

The frontend SHALL use Angular Material 3 components exclusively.

**Acceptance Criteria:**
- Material 3 theme configured
- Default Material color palette (no custom colors)
- Components: MatButton, MatCard, MatList, MatIcon, MatProgressBar, MatProgressSpinner, MatChip, MatBadge, MatSnackBar, MatDialog, MatBottomSheet, MatExpansionPanel, MatSlideToggle, MatFormField, MatInput, MatSelect
- Consistent component usage across mobile pages
- Material elevation for depth
- Material typography
- Material icons (Material Symbols)
- Accessibility labels on all interactive elements

**Implementation:**
- Theme: `src/CoursesPlatform.WebApp/projects/CoursesPlatform/src/styles/theme.scss`
- Imports: Material modules in feature modules
- Icons: Google Material Symbols
- Typography: Material typography utilities

---

### REQ-MOB-FE-023: Touch-Optimized Components
**Phase:** 5
**Priority:** High

The frontend SHALL ensure all components are touch-optimized.

**Acceptance Criteria:**
- Minimum touch target: 44x44 pixels
- Increased spacing on mobile
- Large buttons for primary actions
- Swipe gestures for lists (delete, archive)
- Pull-to-refresh gesture
- Long-press context menus
- Touch feedback (ripple effect)
- Prevent accidental touches (debounce)
- Disabled double-tap zoom on controls

**Implementation:**
- CSS: Touch target sizing in component styles
- HammerJS: Gesture configuration
- Material: Ripple effect built-in
- Directives: Custom directives for gestures (pull-to-refresh, swipe)

---

### REQ-MOB-FE-024: Loading States
**Phase:** 5
**Priority:** Medium

The frontend SHALL provide clear loading states for all async operations.

**Acceptance Criteria:**
- Skeleton screens for initial content load
- Progress spinners for operations
- Progress bars for downloads
- Shimmer effect for loading cards
- Disable buttons during operations
- Loading text feedback
- Error states with retry options
- Empty states for no content
- Material loading indicators

**Implementation:**
- Components: Skeleton components for each page
- Material: MatProgressSpinner, MatProgressBar
- CSS: Shimmer animation keyframes
- Pattern: isLoading$ observable in components

---

## 8. Offline Functionality Requirements

### REQ-MOB-FE-025: Offline Content Access
**Phase:** 5
**Priority:** High

The frontend SHALL enable full offline content access.

**Acceptance Criteria:**
- View downloaded courses offline
- Play downloaded videos offline
- Read downloaded documents offline
- Take quizzes offline (save answers locally)
- Track progress offline
- Offline indicator on all pages
- Graceful handling of unavailable content
- Cache expiration warnings
- Refresh content when online

**Implementation:**
- Storage: All content in IndexedDB
- Video: HTML5 video player with blob URLs
- Documents: PDF.js for PDF viewing, Markdown rendering
- Progress: Save to IndexedDB, sync when online
- Service Worker: Intercept fetch requests for offline content

---

### REQ-MOB-FE-026: Offline Queue Management
**Phase:** 5
**Priority:** High

The frontend SHALL queue operations when offline.

**Acceptance Criteria:**
- Queue mutations (progress updates, quiz submissions, comments)
- Store queue in IndexedDB
- Auto-retry when connection restored
- Display queued operations count
- Manual retry for failed items
- Remove from queue after successful sync
- Conflict handling for queued items
- User notification on sync completion

**Implementation:**
- Service: `OfflineQueueService` in services folder
- Storage: IndexedDB queue table
- Sync: Process queue on connection change
- UI: Badge with pending count

---

### REQ-MOB-FE-027: Cache Management
**Phase:** 5
**Priority:** Medium

The frontend SHALL provide cache management capabilities.

**Acceptance Criteria:**
- View total cache size
- View cache by category (videos, images, documents, data)
- Clear cache options (all, by category, by age)
- Cache size limit enforcement (50MB)
- Automatic cleanup of old cache
- LRU (Least Recently Used) eviction
- User control over cache settings
- Cache statistics display

**Implementation:**
- Service: `CacheManagementService` in services folder
- Page: Cache settings in device-settings page
- Storage: Query IndexedDB for size calculations
- Cleanup: Background job for old cache removal

---

## 9. Performance Optimization Requirements

### REQ-MOB-FE-028: Lazy Loading
**Phase:** 5
**Priority:** High

The frontend SHALL implement lazy loading for optimal performance.

**Acceptance Criteria:**
- Lazy load feature modules
- Lazy load images (Intersection Observer)
- Lazy load below-the-fold content
- Preload critical resources
- Code splitting by route
- Dynamic imports for heavy libraries
- Progressive image loading
- Virtual scrolling for long lists

**Implementation:**
- Modules: Lazy loaded in routing configuration
- Images: loading="lazy" attribute, custom directive
- CDK: CdkVirtualScrollViewport for lists
- Webpack: Code splitting configuration

---

### REQ-MOB-FE-029: Bundle Optimization
**Phase:** 5
**Priority:** High

The frontend SHALL optimize bundle size for mobile.

**Acceptance Criteria:**
- Main bundle < 300KB (gzipped)
- Lazy bundles < 200KB each
- Tree shaking enabled
- AOT compilation
- Production build optimization
- Minification and uglification
- Differential loading (ES2015+ and ES5)
- Source maps for production debugging

**Implementation:**
- Configuration: angular.json optimization settings
- Build: ng build --configuration production
- Analysis: webpack-bundle-analyzer
- Differential: Angular CLI automatic differential loading

---

### REQ-MOB-FE-030: Rendering Performance
**Phase:** 5
**Priority:** High

The frontend SHALL optimize rendering performance.

**Acceptance Criteria:**
- OnPush change detection strategy
- trackBy functions for ngFor
- Debounce user inputs
- Throttle scroll events
- Avoid expensive operations in templates
- Async pipe for observables
- Unsubscribe from observables (takeUntil pattern)
- Avoid memory leaks
- 60fps smooth scrolling

**Implementation:**
- Components: ChangeDetectionStrategy.OnPush
- Templates: trackBy functions for lists
- RxJS: debounceTime, throttleTime operators
- Pattern: takeUntil(destroyed$) for subscriptions

---

## 10. Accessibility Requirements

### REQ-MOB-FE-031: Mobile Accessibility
**Phase:** 5
**Priority:** High

The frontend SHALL be fully accessible on mobile devices.

**Acceptance Criteria:**
- WCAG 2.1 Level AA compliance
- Keyboard navigation support
- Screen reader compatible (TalkBack, VoiceOver)
- ARIA labels on all interactive elements
- Sufficient color contrast (4.5:1 for text)
- Focus indicators visible
- Touch target size minimum 44x44px
- Alt text for images
- Semantic HTML
- Skip navigation links

**Implementation:**
- ARIA: aria-label, aria-describedby on components
- HTML: Semantic elements (nav, main, article, section)
- Focus: CSS focus styles
- Testing: Lighthouse accessibility audits
- Linting: eslint-plugin-jsx-a11y rules

---

### REQ-MOB-FE-032: Internationalization Support
**Phase:** 5
**Priority:** Low

The frontend SHALL support internationalization for mobile.

**Acceptance Criteria:**
- i18n configuration for translations
- Language selection in settings
- RTL (Right-to-Left) layout support
- Locale-specific date/time formatting
- Locale-specific number formatting
- Translation files for supported languages
- Language persistence across sessions

**Implementation:**
- Library: @angular/localize
- Files: Translation JSON files in assets/i18n
- Service: TranslateService for runtime language switching
- Configuration: angular.json i18n settings

---

## 11. Testing Requirements

### REQ-MOB-FE-033: Unit Testing
**Phase:** 5
**Priority:** High

The frontend SHALL include comprehensive unit tests for mobile features.

**Acceptance Criteria:**
- Jest configuration for unit tests
- Test coverage > 80%
- Test all services (device, download, sync, offline storage)
- Test all components (snapshot tests, interaction tests)
- Test state management (BehaviorSubject behavior)
- Mock external dependencies
- Test async operations
- Test error scenarios

**Implementation:**
- Framework: Jest
- Configuration: jest.config.js
- Location: *.spec.ts files alongside components/services
- Mocking: Jest mock functions
- Coverage: npm run test:coverage

---

### REQ-MOB-FE-034: E2E Testing
**Phase:** 5
**Priority:** Medium

The frontend SHALL include E2E tests for mobile user flows.

**Acceptance Criteria:**
- Playwright configuration for E2E tests
- Test critical mobile flows (download, offline access, sync)
- Mobile viewport emulation
- Touch event simulation
- Network condition simulation (offline mode)
- Test on multiple browsers (Chrome, Safari, Firefox)
- Test PWA installation
- Screenshot comparison

**Implementation:**
- Framework: Playwright
- Configuration: playwright.config.ts
- Location: e2e/ folder
- Tests: download.spec.ts, offline.spec.ts, sync.spec.ts
- Run: npm run e2e

---

### REQ-MOB-FE-035: Performance Testing
**Phase:** 5
**Priority:** Medium

The frontend SHALL include performance testing for mobile.

**Acceptance Criteria:**
- Lighthouse performance score > 90
- First Contentful Paint < 1.5s
- Largest Contentful Paint < 2.5s
- Time to Interactive < 3.5s
- Cumulative Layout Shift < 0.1
- First Input Delay < 100ms
- Bundle size monitoring
- Memory leak detection

**Implementation:**
- Tool: Lighthouse CI
- Monitoring: Bundle size tracked in CI/CD
- Analysis: Chrome DevTools performance profiling
- Automation: Performance budgets in angular.json

---

## 12. Security Requirements

### REQ-MOB-FE-036: Secure Data Storage
**Phase:** 5
**Priority:** Critical

The frontend SHALL securely store sensitive data.

**Acceptance Criteria:**
- No sensitive data in localStorage (use secure storage)
- Encrypt device tokens before storage
- Clear sensitive data on logout
- Session timeout on inactivity (30 minutes)
- Secure cookie flags (HttpOnly, Secure, SameSite)
- No sensitive data in URLs
- Content Security Policy headers
- XSS protection

**Implementation:**
- Storage: IndexedDB for non-sensitive, encrypted storage for tokens
- Encryption: Web Crypto API for encryption
- Cookies: Configured on backend
- CSP: Meta tag in index.html or HTTP headers

---

### REQ-MOB-FE-037: API Security
**Phase:** 5
**Priority:** Critical

The frontend SHALL implement secure API communication.

**Acceptance Criteria:**
- HTTPS only for API calls
- JWT token authentication
- Token refresh mechanism
- CORS configuration
- Request signing for sensitive operations
- Rate limiting awareness (handle 429 responses)
- CSRF token for mutations
- Input validation and sanitization

**Implementation:**
- HTTP: Angular HttpClient with interceptors
- Interceptor: AuthInterceptor for JWT tokens
- Interceptor: ErrorInterceptor for error handling
- Validation: Reactive form validators

---

## 13. DevOps and Build Requirements

### REQ-MOB-FE-038: Build Configuration
**Phase:** 5
**Priority:** High

The frontend SHALL have optimized build configuration for mobile.

**Acceptance Criteria:**
- Production build configuration
- Service Worker build integration
- PWA manifest generation
- Environment-specific configurations
- Source maps for debugging
- Build size analysis
- Differential loading
- Build time < 2 minutes

**Implementation:**
- Configuration: angular.json with production optimization
- Environments: environment.ts, environment.prod.ts
- Scripts: package.json build scripts
- Analysis: npm run build:stats && webpack-bundle-analyzer

---

### REQ-MOB-FE-039: Deployment Configuration
**Phase:** 5
**Priority:** Medium

The frontend SHALL support PWA deployment.

**Acceptance Criteria:**
- Static file hosting configuration (Azure Static Web Apps, Netlify, etc.)
- HTTPS enforced
- Service Worker served with correct headers
- Cache headers for assets
- Redirect HTTP to HTTPS
- Custom domain support
- CDN integration
- Automated deployment on commit (CI/CD)

**Implementation:**
- Hosting: Azure Static Web Apps or similar
- Headers: web.config or platform-specific configuration
- CI/CD: GitHub Actions or Azure Pipelines
- CDN: Azure CDN or CloudFlare

---

## 14. Documentation Requirements

### REQ-MOB-FE-040: Code Documentation
**Phase:** 5
**Priority:** Medium

The frontend SHALL include comprehensive code documentation.

**Acceptance Criteria:**
- JSDoc comments on public methods
- README for each feature module
- Inline comments for complex logic
- Component usage examples
- Service API documentation
- State management documentation
- Barrel exports (index.ts) for all folders

**Implementation:**
- Documentation: JSDoc comments in TypeScript
- README: Markdown files in feature folders
- Exports: index.ts files for clean imports

---

## 15. User Experience Requirements

### REQ-MOB-FE-041: Progressive Enhancement
**Phase:** 5
**Priority:** Medium

The frontend SHALL follow progressive enhancement principles.

**Acceptance Criteria:**
- Core functionality works without JavaScript
- Enhanced features with JavaScript
- Graceful degradation for unsupported features
- Feature detection (not browser detection)
- Fallbacks for modern APIs
- Works on older mobile browsers (last 2 versions)
- Polyfills for missing features

**Implementation:**
- Detection: Feature detection using window.hasOwnProperty
- Fallbacks: Conditional rendering based on feature availability
- Polyfills: core-js for ES6+ features
- Support: Browserslist configuration

---

### REQ-MOB-FE-042: User Feedback
**Phase:** 5
**Priority:** High

The frontend SHALL provide clear user feedback for all actions.

**Acceptance Criteria:**
- Success messages for completed actions
- Error messages for failed actions
- Loading indicators during operations
- Confirmation dialogs for destructive actions
- Toast notifications (MatSnackBar)
- Progress indicators for long operations
- Empty states for no data
- Help text and tooltips

**Implementation:**
- Material: MatSnackBar for toasts, MatDialog for confirmations
- Components: Loading, error, empty state components
- UX: Consistent messaging and timing

---

## Appendix A: Technology Stack

### Frontend Technologies
- **Framework:** Angular 18+ (latest stable)
- **UI Library:** Angular Material 3
- **State Management:** RxJS (BehaviorSubject pattern)
- **Storage:** IndexedDB (via Dexie.js)
- **Service Worker:** @angular/service-worker
- **Testing:** Jest (unit), Playwright (E2E)
- **Build:** Angular CLI
- **Styling:** SCSS with BEM methodology
- **Gestures:** HammerJS
- **HTTP:** Angular HttpClient
- **Icons:** Material Symbols

### External Services
- Firebase Cloud Messaging (push notifications)
- Azure Static Web Apps (hosting)
- Azure CDN (content delivery)

---

## Appendix B: Mobile Pages Structure

```
src/CoursesPlatform.WebApp/projects/CoursesPlatform/src/
├── pages/
│   ├── download-manager/
│   │   ├── download-manager.html
│   │   ├── download-manager.scss
│   │   ├── download-manager.ts
│   │   └── index.ts
│   ├── offline-content/
│   │   ├── offline-content.html
│   │   ├── offline-content.scss
│   │   ├── offline-content.ts
│   │   └── index.ts
│   ├── device-settings/
│   │   ├── device-settings.html
│   │   ├── device-settings.scss
│   │   ├── device-settings.ts
│   │   └── index.ts
│   └── notification-preferences/
│       ├── notification-preferences.html
│       ├── notification-preferences.scss
│       ├── notification-preferences.ts
│       └── index.ts
├── components/
│   ├── mobile-navigation/
│   ├── sync-status/
│   ├── network-status/
│   └── download-progress/
├── services/
│   ├── device-registration.service.ts
│   ├── offline-storage.service.ts
│   ├── content-download.service.ts
│   ├── sync.service.ts
│   ├── push-notification.service.ts
│   ├── network-status.service.ts
│   └── state/
│       ├── device-state.service.ts
│       ├── offline-content-state.service.ts
│       ├── download-queue-state.service.ts
│       └── sync-state.service.ts
├── guards/
│   ├── device-registration.guard.ts
│   └── offline.guard.ts
└── models/
    ├── device.model.ts
    ├── offline-content.model.ts
    ├── download-queue.model.ts
    └── sync-state.model.ts
```

---

## Appendix C: Implementation Checklist

- [ ] Configure PWA (manifest.json, service worker)
- [ ] Install and configure @angular/service-worker
- [ ] Install and configure Dexie.js for IndexedDB
- [ ] Create OfflineStorageService
- [ ] Create DeviceRegistrationService
- [ ] Create ContentDownloadService
- [ ] Create SyncService
- [ ] Create PushNotificationService
- [ ] Create NetworkStatusService
- [ ] Create state services (Device, OfflineContent, DownloadQueue, Sync)
- [ ] Create MobileNavigation component
- [ ] Create DownloadManager page
- [ ] Create OfflineContent page
- [ ] Create DeviceSettings page
- [ ] Create NotificationPreferences page
- [ ] Create SyncStatus component
- [ ] Create NetworkStatus component
- [ ] Implement responsive breakpoints and styles
- [ ] Configure HammerJS for gestures
- [ ] Implement pull-to-refresh
- [ ] Configure Angular Material 3 theme
- [ ] Add mobile routing configuration
- [ ] Create navigation guards
- [ ] Implement offline queue management
- [ ] Add cache management capabilities
- [ ] Optimize bundle size
- [ ] Implement lazy loading
- [ ] Add unit tests (Jest)
- [ ] Add E2E tests (Playwright)
- [ ] Configure Lighthouse CI
- [ ] Set up deployment pipeline
- [ ] Test on iOS devices
- [ ] Test on Android devices
- [ ] Accessibility audit
- [ ] Performance optimization

---

**End of Mobile Cross-Platform Frontend Specification**
