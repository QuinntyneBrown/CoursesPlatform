# Gamification - Frontend Specification

**Feature:** Gamification
**Version:** 1.0
**Last Updated:** December 2024

---

## 1. Overview

The Gamification frontend provides user interfaces for viewing badges, achievements, XP progress, learning streaks, challenges, and leaderboards to enhance user engagement and motivation.

---

## 2. Requirements

### 2.1 Badges & Achievements

#### REQ-GAM-FE-001: Badge Gallery Page [Phase 4]
The application SHALL provide a badge gallery page.

**Acceptance Criteria:**
- AC1: Page displays all available badges in grid layout
- AC2: Earned badges are highlighted with color
- AC3: Locked badges show as greyscale with lock icon
- AC4: Hovering badge shows tooltip with description
- AC5: Click badge opens detail modal
- AC6: Filter badges by earned/locked/rarity
- AC7: Progress bar shows percentage of badges earned

#### REQ-GAM-FE-002: Badge Detail Modal [Phase 4]
The application SHALL provide badge detail modal.

**Acceptance Criteria:**
- AC1: Modal shows badge icon, name, description
- AC2: Earned date is displayed for earned badges
- AC3: Criteria is shown for locked badges
- AC4: Progress bar shows completion percentage
- AC5: Rarity indicator is displayed
- AC6: Related achievements are linked

#### REQ-GAM-FE-003: Achievement List [Phase 4]
The application SHALL provide achievement list page.

**Acceptance Criteria:**
- AC1: Achievements grouped by category
- AC2: Category progress shown as percentage
- AC3: Unlocked achievements show unlock date
- AC4: Locked achievements show requirements
- AC5: Recent achievements highlighted
- AC6: Achievement rewards displayed (XP, badges)

#### REQ-GAM-FE-004: Achievement Notification [Phase 4]
The application SHALL show achievement unlock notifications.

**Acceptance Criteria:**
- AC1: Toast notification appears on achievement unlock
- AC2: Notification shows achievement icon and name
- AC3: Confetti animation plays for major achievements
- AC4: Notification is dismissible
- AC5: Notification links to achievement detail

### 2.2 XP & Levels

#### REQ-GAM-FE-005: XP Dashboard Widget [Phase 4]
The application SHALL provide XP dashboard widget.

**Acceptance Criteria:**
- AC1: Widget displays current level
- AC2: Progress bar shows XP to next level
- AC3: Current XP and required XP are shown
- AC4: Recent XP gains are listed
- AC5: Click opens detailed XP page
- AC6: Level up animation plays on level increase

#### REQ-GAM-FE-006: XP History Page [Phase 4]
The application SHALL provide XP history page.

**Acceptance Criteria:**
- AC1: List shows all XP transactions
- AC2: Each transaction shows date, amount, source
- AC3: Filter by date range
- AC4: Chart visualizes XP over time
- AC5: Pagination for long history
- AC6: Export history as CSV

#### REQ-GAM-FE-007: Level Progress Display [Phase 4]
The application SHALL show level progression.

**Acceptance Criteria:**
- AC1: Level badge displayed in user profile
- AC2: Level displayed in navigation bar
- AC3: Progress ring shows percentage to next level
- AC4: Next level requirements clearly stated
- AC5: Level perks and rewards listed
- AC6: All levels displayed in level roadmap

#### REQ-GAM-FE-008: Points Balance Widget [Phase 4]
The application SHALL display point balance.

**Acceptance Criteria:**
- AC1: Points shown in header/navigation
- AC2: Icon indicates available points
- AC3: Click opens points detail page
- AC4: Recent point transactions shown
- AC5: Animated increment on points earned

### 2.3 Learning Streaks

#### REQ-GAM-FE-009: Streak Widget [Phase 4]
The application SHALL provide streak tracking widget.

**Acceptance Criteria:**
- AC1: Current streak displayed prominently
- AC2: Flame icon animated for active streak
- AC3: Longest streak shown
- AC4: Today's progress indicated
- AC5: Streak freeze count displayed
- AC6: Motivational message for milestones

#### REQ-GAM-FE-010: Streak Calendar [Phase 4]
The application SHALL show streak calendar view.

**Acceptance Criteria:**
- AC1: Calendar highlights active streak days
- AC2: Current day shows progress status
- AC3: Missed days shown in different color
- AC4: Freeze days indicated with icon
- AC5: Milestone days highlighted
- AC6: Hover shows activity details

#### REQ-GAM-FE-011: Streak Freeze Management [Phase 4]
The application SHALL provide streak freeze interface.

**Acceptance Criteria:**
- AC1: Available freezes shown with icons
- AC2: Activate freeze button when needed
- AC3: Confirmation dialog before activation
- AC4: Freeze expiry countdown shown
- AC5: How to earn more freezes explained

#### REQ-GAM-FE-012: Streak Recovery Interface [Phase 4]
The application SHALL show streak recovery option.

**Acceptance Criteria:**
- AC1: Recovery prompt appears after broken streak
- AC2: Cost to recover displayed (points)
- AC3: Confirm/cancel buttons
- AC4: Success message on recovery
- AC5: Limitation notice (once per week)

### 2.4 Challenges

#### REQ-GAM-FE-013: Challenge Browse Page [Phase 4]
The application SHALL provide challenge browsing.

**Acceptance Criteria:**
- AC1: Grid of available challenges
- AC2: Active/upcoming/past tabs
- AC3: Challenge card shows name, dates, rewards
- AC4: Participant count displayed
- AC5: Join button for available challenges
- AC6: Filter by type and difficulty

#### REQ-GAM-FE-014: Challenge Detail Page [Phase 4]
The application SHALL provide challenge detail view.

**Acceptance Criteria:**
- AC1: Full challenge description
- AC2: Start and end dates prominently shown
- AC3: Completion criteria clearly listed
- AC4: Rewards breakdown
- AC5: Join/Leave button based on enrollment
- AC6: User's progress if enrolled
- AC7: Leaderboard preview

#### REQ-GAM-FE-015: Challenge Progress Tracker [Phase 4]
The application SHALL show challenge progress.

**Acceptance Criteria:**
- AC1: Progress bar with percentage
- AC2: Current vs required metrics
- AC3: Days remaining countdown
- AC4: Daily progress chart
- AC5: Milestone indicators
- AC6: Rank in challenge leaderboard

#### REQ-GAM-FE-016: My Challenges Page [Phase 4]
The application SHALL provide user's challenges view.

**Acceptance Criteria:**
- AC1: List of enrolled challenges
- AC2: Quick progress view for each
- AC3: Active/completed tabs
- AC4: Click opens challenge detail
- AC5: Completion badges displayed

### 2.5 Leaderboards

#### REQ-GAM-FE-017: Global Leaderboard Page [Phase 4]
The application SHALL provide global leaderboard.

**Acceptance Criteria:**
- AC1: Top 100 users displayed in ranked list
- AC2: User's avatar, name, level, XP shown
- AC3: User's own rank always visible
- AC4: Scroll to user's position button
- AC5: Top 3 highlighted with special styling
- AC6: Real-time updates via WebSocket

#### REQ-GAM-FE-018: Challenge Leaderboard [Phase 4]
The application SHALL show challenge rankings.

**Acceptance Criteria:**
- AC1: Embedded in challenge detail page
- AC2: Top 10 displayed by default
- AC3: Expand to view more
- AC4: User's rank highlighted
- AC5: Progress metrics shown
- AC6: Final rankings frozen after challenge ends

#### REQ-GAM-FE-019: Category Leaderboard [Phase 4]
The application SHALL provide category leaderboards.

**Acceptance Criteria:**
- AC1: Tabs for different categories
- AC2: Top 50 per category
- AC3: Category-specific metrics
- AC4: Expert badge indicator
- AC5: User's rank in each category

#### REQ-GAM-FE-020: Friend Leaderboard [Phase 4]
The application SHALL show friend rankings.

**Acceptance Criteria:**
- AC1: List of connected friends
- AC2: Weekly and all-time tabs
- AC3: Friend's level and XP shown
- AC4: Direct compare with friend
- AC5: Invite friends button
- AC6: Empty state with invite prompt

#### REQ-GAM-FE-021: Leaderboard Rank Widget [Phase 4]
The application SHALL display user's rank widget.

**Acceptance Criteria:**
- AC1: Current rank number shown
- AC2: Rank change indicator (up/down arrow)
- AC3: Position in percentile
- AC4: Click opens leaderboard
- AC5: Animated rank change

---

## 3. Component Architecture

### 3.1 Pages

| Component | Route | Description |
|-----------|-------|-------------|
| BadgeGalleryPage | /gamification/badges | Badge collection view |
| AchievementListPage | /gamification/achievements | Achievement list |
| XpDashboardPage | /gamification/xp | XP history and levels |
| StreakPage | /gamification/streak | Streak tracking |
| ChallengeBrowsePage | /gamification/challenges | Challenge discovery |
| ChallengeDetailPage | /gamification/challenges/:id | Challenge details |
| MyChallengesPage | /gamification/my-challenges | User's challenges |
| LeaderboardPage | /gamification/leaderboards | Global leaderboard |
| CategoryLeaderboardPage | /gamification/leaderboards/categories | Category rankings |
| FriendLeaderboardPage | /gamification/leaderboards/friends | Friend rankings |

### 3.2 Components

| Component | Description |
|-----------|-------------|
| BadgeCard | Individual badge display |
| BadgeDetailModal | Badge detail popup |
| AchievementCard | Achievement display card |
| AchievementNotification | Toast for unlocks |
| XpProgressBar | XP to next level bar |
| LevelBadge | User level indicator |
| StreakWidget | Streak counter widget |
| StreakCalendar | Monthly calendar view |
| StreakFreezeButton | Freeze activation |
| ChallengeCard | Challenge summary card |
| ChallengeProgressBar | Challenge progress |
| LeaderboardList | Ranked user list |
| LeaderboardEntry | Single rank entry |
| RankWidget | User rank display |
| PointsBalance | Points display |

### 3.3 Services

| Service | Description |
|---------|-------------|
| GamificationService | Main gamification API |
| BadgeService | Badge operations |
| AchievementService | Achievement API |
| XpService | XP and level API |
| StreakService | Streak tracking API |
| ChallengeService | Challenge API |
| LeaderboardService | Leaderboard API |
| NotificationService | Achievement notifications |

---

## 4. State Management

Per REQ-FE-009, state management SHALL use RxJS (not NgRx or Signals).

### 4.1 Gamification State

```typescript
interface GamificationState {
  badges: {
    all: Badge[];
    earned: UserBadge[];
    isLoading: boolean;
  };
  achievements: {
    all: Achievement[];
    unlocked: UserAchievement[];
    progress: Record<string, number>;
    isLoading: boolean;
  };
  xp: {
    currentXp: number;
    level: number;
    nextLevelXp: number;
    history: XpTransaction[];
    isLoading: boolean;
  };
  points: {
    balance: number;
    history: PointTransaction[];
    isLoading: boolean;
  };
  streak: {
    current: number;
    longest: number;
    freezes: number;
    milestones: number[];
    isActive: boolean;
    isLoading: boolean;
  };
  challenges: {
    active: Challenge[];
    enrolled: ChallengeEnrollment[];
    progress: Record<string, ChallengeProgress>;
    isLoading: boolean;
  };
  leaderboards: {
    global: LeaderboardEntry[];
    friends: LeaderboardEntry[];
    userRank: number;
    isLoading: boolean;
  };
}
```

---

## 5. UI/UX Requirements

### 5.1 Design System

Per REQ-FE-006 and REQ-FE-010, the application SHALL use Angular Material with Material 3 guidelines and default theme colors.

### 5.2 Animations

- Badge earn: Scale up with glow effect
- Level up: Confetti and celebration animation
- Streak milestone: Flame burst animation
- Achievement unlock: Slide in from top with sound
- Rank change: Number count-up animation
- XP gain: Progress bar fill animation

### 5.3 Responsive Design

Per REQ-FE-018, all pages SHALL be responsive and follow mobile-first design:
- Mobile: Single column, stacked widgets
- Tablet: Two column grid
- Desktop: Three column dashboard layout

### 5.4 Accessibility

- All icons MUST have aria-labels
- Progress bars MUST have accessible values
- Animations MUST respect prefers-reduced-motion
- Keyboard navigation for all interactive elements
- Screen reader announcements for achievements

### 5.5 Component Naming

Per REQ-FE-012 and REQ-FE-013:
- Class names SHALL NOT have "Component" suffix
- File names SHALL NOT have "component" prefix

---

## 6. Real-time Features

### 6.1 WebSocket Events

- Listen for BadgeEarned to show notification
- Listen for LevelUp to trigger animation
- Listen for StreakUpdated to refresh widget
- Listen for LeaderboardUpdated to refresh rankings
- Listen for AchievementUnlocked to show toast

### 6.2 Polling

- Challenge progress: Poll every 30 seconds during active challenge
- Leaderboard: Fallback polling every 5 minutes if WebSocket unavailable

---

## 7. Gamification Widgets

### 7.1 Dashboard Widgets

The following widgets SHALL be embeddable in dashboard:
- Mini XP progress widget
- Streak counter widget
- Next achievement widget
- Current rank widget
- Active challenges widget

### 7.2 Profile Widgets

The following SHALL appear in user profile:
- Badge showcase (top 6 badges)
- Level badge with progress
- Streak count
- Leaderboard rank

---

## 8. Error Handling

### 8.1 API Errors

| Error Code | User Message |
|------------|--------------|
| 400 | Invalid request. Please try again. |
| 403 | You don't have permission to join this challenge. |
| 404 | Challenge not found. |
| 409 | You're already enrolled in this challenge. |
| 429 | Too many requests. Please wait. |
| 500 | Something went wrong. Please try again. |

### 8.2 Empty States

- No badges earned: "Start learning to earn your first badge!"
- No challenges available: "Check back soon for new challenges!"
- No friends on leaderboard: "Invite friends to compete!"
- Broken streak: "Don't give up! Start a new streak today."

---

## 9. Testing Requirements

### 9.1 Unit Tests (Jest)

Per REQ-FE-021, unit tests SHALL use Jest:
- Test badge filtering logic
- Test XP calculation displays
- Test streak calendar rendering
- Test leaderboard sorting
- Minimum 80% code coverage

### 9.2 E2E Tests (Playwright)

Per REQ-FE-022, E2E tests SHALL use Playwright:
- Test badge gallery browsing
- Test challenge enrollment flow
- Test leaderboard navigation
- Test streak freeze activation
- Test achievement notification display

---

## 10. Implementation Notes

### 10.1 API Base URL

Per REQ-FE-026, the baseUrl configuration SHALL contain ONLY the base URI:
```typescript
// Correct
baseUrl = "http://localhost:7200"
this.http.get(`${baseUrl}/api/gamification/badges`)

// Incorrect
baseUrl = "http://localhost:7200/api"
```

### 10.2 File Structure

Per REQ-FE-015 and REQ-FE-016:
- Pages in `pages/` folder
- Reusable components in `components/` folder
- Barrel exports in each folder

### 10.3 Performance

- Badge images SHALL be lazy-loaded
- Leaderboard SHALL use virtual scrolling for large lists
- Achievement notifications SHALL be queued to avoid spam
- XP animations SHALL be throttled

---

*Document Version: 1.0*
*Phase Coverage: 4*
