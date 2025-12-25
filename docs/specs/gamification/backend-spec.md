# Gamification - Backend Specification

**Feature:** Gamification
**Version:** 1.0
**Last Updated:** December 2024

---

## 1. Overview

The Gamification feature provides engagement mechanisms including badges, achievements, points, XP, learning streaks, challenges, and leaderboards to motivate and reward learners on the CoursesPlatform system.

---

## 2. Requirements

### 2.1 Badges & Achievements

#### REQ-GAM-001: Badge Definition [Phase 4]
The system SHALL support defining badges with criteria and rewards.

**Acceptance Criteria:**
- AC1: Administrator can create badge with name, description, and icon
- AC2: Badge criteria can be based on courses completed, points earned, or streak days
- AC3: Badge can be marked as rare or common
- AC4: Badge can have multiple tiers (bronze, silver, gold)
- AC5: BadgeCreated event is published
- AC6: Badge can be activated or deactivated

#### REQ-GAM-002: Badge Earning [Phase 4]
The system SHALL automatically award badges when users meet criteria.

**Acceptance Criteria:**
- AC1: System evaluates badge criteria on relevant events
- AC2: Badge is awarded to user when criteria is met
- AC3: BadgeEarned event is published
- AC4: User cannot earn the same badge multiple times unless it's a tiered badge
- AC5: Notification is sent to user upon earning badge
- AC6: Badge appears in user profile immediately

#### REQ-GAM-003: Badge Display [Phase 4]
The system SHALL provide badge information for display.

**Acceptance Criteria:**
- AC1: API returns list of all available badges
- AC2: API returns user's earned badges with earned date
- AC3: API returns badge progress for in-progress badges
- AC4: Locked badges show criteria without spoiling surprises
- AC5: Badge rarity is indicated

#### REQ-GAM-004: Achievement Unlocking [Phase 4]
The system SHALL support achievement unlocking for milestones.

**Acceptance Criteria:**
- AC1: Achievements are unlocked based on specific milestones
- AC2: AchievementUnlocked event is published
- AC3: Achievement includes title, description, and reward points
- AC4: User can view achievement history
- AC5: Achievement can grant bonus XP or special badges

#### REQ-GAM-005: Achievement Categories [Phase 4]
The system SHALL organize achievements into categories.

**Acceptance Criteria:**
- AC1: Achievements can be categorized (learning, social, completion, mastery)
- AC2: Categories can be filtered in achievement list
- AC3: Category progress shows completion percentage
- AC4: CategoryCompleted event is published when all achievements in category are earned

### 2.2 Points & XP System

#### REQ-GAM-006: XP Earning [Phase 4]
The system SHALL award experience points (XP) for learning activities.

**Acceptance Criteria:**
- AC1: User earns XP for completing lessons (10 XP per lesson)
- AC2: User earns XP for completing quizzes (50 XP per quiz)
- AC3: User earns XP for completing courses (500 XP per course)
- AC4: User earns XP for daily logins (5 XP)
- AC5: User earns XP for maintaining streaks (bonus multiplier)
- AC6: XpEarned event is published with amount and source

#### REQ-GAM-007: Level Progression [Phase 4]
The system SHALL calculate user levels based on accumulated XP.

**Acceptance Criteria:**
- AC1: User starts at Level 1 with 0 XP
- AC2: Level thresholds increase exponentially (Level 2: 100 XP, Level 3: 250 XP, etc.)
- AC3: LevelUp event is published when user reaches new level
- AC4: Level up grants bonus rewards (badges, points, perks)
- AC5: User profile displays current level and progress to next level
- AC6: Maximum level is configurable

#### REQ-GAM-008: Point System [Phase 4]
The system SHALL maintain a separate point system for rewards.

**Acceptance Criteria:**
- AC1: Points are earned through achievements and special actions
- AC2: PointsEarned event is published
- AC3: Points can be redeemed for rewards (future phase)
- AC4: Point balance is displayed in user profile
- AC5: Point transaction history is maintained
- AC6: Points never expire

#### REQ-GAM-009: XP Multipliers [Phase 4]
The system SHALL support XP multipliers for special events.

**Acceptance Criteria:**
- AC1: Streak multiplier increases XP by 1.5x for 7+ day streaks
- AC2: Weekend multiplier can be configured
- AC3: Special event multipliers can be applied system-wide
- AC4: MultiplierApplied event is published
- AC5: Multipliers stack additively
- AC6: Active multipliers are displayed to user

### 2.3 Learning Streaks

#### REQ-GAM-010: Streak Tracking [Phase 4]
The system SHALL track consecutive days of learning activity.

**Acceptance Criteria:**
- AC1: Streak increments when user completes at least one lesson in a day
- AC2: Streak resets to 0 if no activity for 24+ hours
- AC3: StreakUpdated event is published daily
- AC4: Longest streak is recorded separately
- AC5: Current streak is displayed in user profile
- AC6: Timezone is considered for day calculation

#### REQ-GAM-011: Streak Freeze [Phase 4]
The system SHALL allow users to freeze streaks to prevent loss.

**Acceptance Criteria:**
- AC1: User can activate streak freeze for 1 day
- AC2: Streak freeze must be earned through achievements or purchased
- AC3: StreakFreezeActivated event is published
- AC4: Maximum of 2 streak freezes can be held
- AC5: Streak freeze expires after use
- AC6: Active freeze is displayed to user

#### REQ-GAM-012: Streak Milestones [Phase 4]
The system SHALL reward streak milestones.

**Acceptance Criteria:**
- AC1: Milestones at 7, 30, 100, 365 days
- AC2: StreakMilestoneReached event is published
- AC3: Milestone rewards include badges and bonus XP
- AC4: Milestone notifications are sent to user
- AC5: Milestone achievements are permanent

#### REQ-GAM-013: Streak Recovery [Phase 4]
The system SHALL allow streak recovery within grace period.

**Acceptance Criteria:**
- AC1: 2-hour grace period after missed day
- AC2: Recovery costs earned points or requires streak freeze
- AC3: StreakRecovered event is published
- AC4: Recovery is limited to once per week
- AC5: Recovery option is displayed in streak widget

### 2.4 Challenges

#### REQ-GAM-014: Challenge Creation [Phase 4]
The system SHALL support creating time-bound challenges.

**Acceptance Criteria:**
- AC1: Administrator can create challenge with goals and duration
- AC2: Challenge has start and end dates
- AC3: Challenge specifies completion criteria
- AC4: ChallengeCreated event is published
- AC5: Challenge rewards are defined (XP, badges, points)
- AC6: Challenge can be individual or team-based

#### REQ-GAM-015: Challenge Enrollment [Phase 4]
The system SHALL allow users to join active challenges.

**Acceptance Criteria:**
- AC1: User can browse available challenges
- AC2: User can join challenge before deadline
- AC3: ChallengeJoined event is published
- AC4: User can view enrolled challenges
- AC5: User can leave challenge before completion
- AC6: ChallengeLeft event is published on leave

#### REQ-GAM-016: Challenge Progress Tracking [Phase 4]
The system SHALL track user progress in challenges.

**Acceptance Criteria:**
- AC1: Progress is calculated based on challenge criteria
- AC2: ChallengeProgressUpdated event is published
- AC3: Progress percentage is visible to user
- AC4: Daily progress updates are calculated
- AC5: Progress data is used for leaderboard ranking

#### REQ-GAM-017: Challenge Completion [Phase 4]
The system SHALL detect and reward challenge completion.

**Acceptance Criteria:**
- AC1: Challenge is marked complete when criteria met
- AC2: ChallengeCompleted event is published
- AC3: Rewards are automatically granted
- AC4: Completion certificate or badge is awarded
- AC5: Challenge cannot be rejoined after completion
- AC6: Completion is displayed in user profile

### 2.5 Leaderboards

#### REQ-GAM-018: Global Leaderboard [Phase 4]
The system SHALL maintain global XP-based leaderboards.

**Acceptance Criteria:**
- AC1: Leaderboard ranks all users by total XP
- AC2: Leaderboard updates in near real-time
- AC3: Top 100 users are displayed
- AC4: User's rank is always visible
- AC5: LeaderboardUpdated event is published hourly
- AC6: Leaderboard resets monthly

#### REQ-GAM-019: Challenge Leaderboards [Phase 4]
The system SHALL provide leaderboards for active challenges.

**Acceptance Criteria:**
- AC1: Each challenge has dedicated leaderboard
- AC2: Ranking based on challenge-specific criteria
- AC3: Leaderboard is frozen when challenge ends
- AC4: Top 10 winners are highlighted
- AC5: All participants can view final rankings
- AC6: Challenge leaderboard is archived

#### REQ-GAM-020: Category Leaderboards [Phase 4]
The system SHALL support leaderboards by course category.

**Acceptance Criteria:**
- AC1: Leaderboards exist for each major course category
- AC2: Ranking based on category-specific learning activity
- AC3: User can view multiple category leaderboards
- AC4: Category expert badge awarded to top performers
- AC5: Leaderboard shows top 50 per category

#### REQ-GAM-021: Friend Leaderboards [Phase 4]
The system SHALL provide friend-based leaderboards.

**Acceptance Criteria:**
- AC1: User can view leaderboard of connected friends
- AC2: Friend leaderboard uses same XP ranking
- AC3: Friend invites can be sent from leaderboard
- AC4: Friend leaderboard shows weekly and all-time rankings
- AC5: Privacy settings are respected

#### REQ-GAM-022: Leaderboard Rewards [Phase 4]
The system SHALL reward top leaderboard performers.

**Acceptance Criteria:**
- AC1: Top 10 monthly receive special badges
- AC2: LeaderboardRewardGranted event is published
- AC3: Rank 1 receives unique title/flair
- AC4: Rewards are distributed automatically at period end
- AC5: Reward history is maintained

---

## 3. Domain Model

### 3.1 Entities

| Entity | Description |
|--------|-------------|
| Badge | Earnable badge with criteria and tiers |
| UserBadge | Junction tracking user's earned badges |
| Achievement | Milestone achievement definition |
| UserAchievement | User's unlocked achievements |
| XpTransaction | Record of XP earned from activities |
| UserLevel | User's current level and XP progress |
| PointTransaction | Record of points earned and spent |
| Streak | User's learning streak tracking |
| StreakFreeze | Available streak freeze items |
| Challenge | Time-bound challenge definition |
| ChallengeEnrollment | User's enrollment in challenge |
| ChallengeProgress | User's progress in challenge |
| Leaderboard | Leaderboard definition and type |
| LeaderboardEntry | User's position in leaderboard |

### 3.2 Domain Events

| Event | Trigger |
|-------|---------|
| BadgeCreated | New badge is defined |
| BadgeUpdated | Badge definition is modified |
| BadgeEarned | User earns a badge |
| BadgeRemoved | Badge is revoked from user |
| AchievementUnlocked | User unlocks achievement |
| AchievementCategoryCompleted | All achievements in category completed |
| XpEarned | User earns experience points |
| LevelUp | User reaches new level |
| PointsEarned | User earns points |
| PointsSpent | User redeems points |
| MultiplierApplied | XP multiplier activated |
| MultiplierExpired | XP multiplier ended |
| StreakUpdated | Streak count changes |
| StreakMilestoneReached | Streak hits milestone |
| StreakBroken | Streak resets to zero |
| StreakFreezeEarned | User receives streak freeze |
| StreakFreezeActivated | Streak freeze is used |
| StreakRecovered | Broken streak is restored |
| ChallengeCreated | New challenge is created |
| ChallengeStarted | Challenge begins |
| ChallengeEnded | Challenge period ends |
| ChallengeJoined | User enrolls in challenge |
| ChallengeLeft | User leaves challenge |
| ChallengeProgressUpdated | User's challenge progress changes |
| ChallengeCompleted | User completes challenge |
| ChallengeFailed | User fails to complete challenge |
| LeaderboardCreated | New leaderboard established |
| LeaderboardUpdated | Rankings recalculated |
| LeaderboardReset | Leaderboard cleared for new period |
| LeaderboardRewardGranted | Top performer receives reward |
| RankImproved | User's rank increases |
| RankDecreased | User's rank decreases |

---

## 4. API Endpoints

### 4.1 Badges & Achievements

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/gamification/badges | List all available badges |
| GET | /api/gamification/badges/{id} | Get badge details |
| GET | /api/gamification/users/me/badges | Get user's earned badges |
| GET | /api/gamification/achievements | List all achievements |
| GET | /api/gamification/users/me/achievements | Get user's achievements |
| POST | /api/admin/gamification/badges | Create badge (admin) |
| PUT | /api/admin/gamification/badges/{id} | Update badge (admin) |

### 4.2 Points & XP

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/gamification/users/me/xp | Get user XP and level |
| GET | /api/gamification/users/me/xp/history | Get XP transaction history |
| GET | /api/gamification/users/me/points | Get point balance |
| GET | /api/gamification/users/me/points/history | Get point transaction history |
| GET | /api/gamification/levels | Get level definitions |

### 4.3 Streaks

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/gamification/users/me/streak | Get current streak |
| POST | /api/gamification/users/me/streak/freeze | Activate streak freeze |
| POST | /api/gamification/users/me/streak/recover | Recover broken streak |
| GET | /api/gamification/users/me/streak/milestones | Get streak milestones |

### 4.4 Challenges

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/gamification/challenges | List active challenges |
| GET | /api/gamification/challenges/{id} | Get challenge details |
| POST | /api/gamification/challenges/{id}/join | Join challenge |
| DELETE | /api/gamification/challenges/{id}/leave | Leave challenge |
| GET | /api/gamification/challenges/{id}/progress | Get user progress |
| GET | /api/gamification/users/me/challenges | Get user's challenges |
| POST | /api/admin/gamification/challenges | Create challenge (admin) |

### 4.5 Leaderboards

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/gamification/leaderboards/global | Get global leaderboard |
| GET | /api/gamification/leaderboards/challenges/{id} | Get challenge leaderboard |
| GET | /api/gamification/leaderboards/categories/{id} | Get category leaderboard |
| GET | /api/gamification/leaderboards/friends | Get friend leaderboard |
| GET | /api/gamification/users/me/rank | Get user's current rank |

---

## 5. Business Rules

### 5.1 XP Calculation
- Lesson completion: 10 XP
- Quiz completion (passed): 50 XP
- Course completion: 500 XP
- Daily login: 5 XP
- Streak bonus: +50% XP at 7 days, +100% at 30 days

### 5.2 Level Thresholds
- Level 1: 0 XP
- Level 2: 100 XP
- Level 3: 250 XP
- Level 4: 500 XP
- Level 5: 1000 XP
- Formula: XP_required = 100 * (level - 1) ^ 1.5

### 5.3 Streak Rules
- Activity window: User's timezone, midnight to midnight
- Grace period: 2 hours after midnight
- Minimum activity: Complete at least 1 lesson
- Freeze limit: Maximum 2 freezes in inventory

### 5.4 Badge Tiers
- Bronze: Basic achievement
- Silver: Intermediate achievement
- Gold: Advanced achievement
- Platinum: Rare achievement (top 1% of users)

---

## 6. Performance Considerations

- Leaderboards SHALL be cached and updated hourly
- XP calculations SHALL be processed asynchronously
- Streak calculations SHALL run daily at 1 AM UTC
- Badge evaluation SHALL be event-driven, not polling
- Leaderboard queries SHALL use read replicas

---

## 7. Security Considerations

- Users can only view their own detailed statistics
- Leaderboard displays are public but anonymization is optional
- Admin endpoints require Administrator role
- Point transactions are immutable once recorded
- Badge criteria are not exposed to prevent gaming

---

## 8. Dependencies

- Serilog for structured logging
- MediatR for CQRS pattern
- Entity Framework Core for data access
- FluentValidation for request validation
- Hangfire for background job processing

---

## 9. Implementation Notes

Per the implementation specification (REQ-SYS-005, REQ-SYS-006), all data access SHALL use ICoursesPlatformContext directly without repository pattern.

---

*Document Version: 1.0*
*Phase Coverage: 4*
