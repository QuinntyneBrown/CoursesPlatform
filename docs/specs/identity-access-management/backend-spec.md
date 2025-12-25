# Identity & Access Management - Backend Specification

**Feature:** Identity & Access Management
**Version:** 1.0
**Last Updated:** December 2024

---

## 1. Overview

The Identity & Access Management feature provides user authentication, authorization, profile management, and privacy controls for the CoursesPlatform system.

---

## 2. Requirements

### 2.1 User Account Lifecycle

#### REQ-IAM-001: User Registration [Phase 1]
The system SHALL allow users to register with email and password.

**Acceptance Criteria:**
- AC1: User can submit registration with email, password, first name, and last name
- AC2: System validates email format and uniqueness
- AC3: Password meets minimum security requirements (8+ chars, mixed case, number)
- AC4: System creates user record with Pending status
- AC5: System sends verification email upon successful registration
- AC6: UserRegistered event is published

#### REQ-IAM-002: Email Verification [Phase 1]
The system SHALL verify user email addresses through a confirmation link.

**Acceptance Criteria:**
- AC1: Verification link expires after 24 hours
- AC2: Clicking valid link marks email as verified
- AC3: User status changes from Pending to Active upon verification
- AC4: UserEmailVerified event is published
- AC5: Expired links trigger UserEmailVerificationExpired event

#### REQ-IAM-003: User Activation/Deactivation [Phase 1]
The system SHALL support activating and deactivating user accounts.

**Acceptance Criteria:**
- AC1: Administrators can activate/deactivate accounts
- AC2: Deactivated users cannot log in
- AC3: UserActivated/UserDeactivated events are published
- AC4: User data is retained when deactivated

#### REQ-IAM-004: User Suspension [Phase 2]
The system SHALL support suspending user accounts for policy violations.

**Acceptance Criteria:**
- AC1: Administrators can suspend accounts with reason
- AC2: Suspended users cannot access the platform
- AC3: Suspension can be temporary or permanent
- AC4: UserSuspended/UserUnsuspended events are published

#### REQ-IAM-005: Account Deletion [Phase 3]
The system SHALL allow users to request account deletion.

**Acceptance Criteria:**
- AC1: User can request account deletion
- AC2: System provides 30-day grace period before permanent deletion
- AC3: User can cancel deletion during grace period
- AC4: UserAccountDeleted event is published after grace period
- AC5: Personal data is anonymized per GDPR requirements

#### REQ-IAM-006: Account Restoration [Phase 3]
The system SHALL support restoring deleted accounts within the grace period.

**Acceptance Criteria:**
- AC1: User can restore account within 30 days of deletion request
- AC2: All user data is preserved during grace period
- AC3: UserAccountRestored event is published

#### REQ-IAM-007: Account Merging [Phase 5]
The system SHALL support merging duplicate user accounts.

**Acceptance Criteria:**
- AC1: Administrators can initiate account merge
- AC2: All enrollments, progress, and purchases are consolidated
- AC3: UserAccountMerged event is published
- AC4: Source account is deactivated after merge

### 2.2 Authentication

#### REQ-IAM-008: User Login [Phase 1]
The system SHALL authenticate users with email and password.

**Acceptance Criteria:**
- AC1: User can log in with valid credentials
- AC2: System issues JWT access token and refresh token
- AC3: UserLoggedIn event is published on success
- AC4: LoginAttemptFailed event is published on failure
- AC5: Failed attempts are tracked for lockout

#### REQ-IAM-009: User Logout [Phase 1]
The system SHALL allow users to log out and invalidate sessions.

**Acceptance Criteria:**
- AC1: User can log out from current session
- AC2: Refresh token is invalidated
- AC3: UserLoggedOut event is published

#### REQ-IAM-010: Session Management [Phase 1]
The system SHALL manage user sessions with configurable timeouts.

**Acceptance Criteria:**
- AC1: Access tokens expire after 15 minutes
- AC2: Refresh tokens expire after 7 days
- AC3: UserSessionStarted event is published on new session
- AC4: UserSessionExpired event is published on timeout
- AC5: User can terminate sessions from other devices

#### REQ-IAM-011: Account Lockout [Phase 1]
The system SHALL lock accounts after repeated failed login attempts.

**Acceptance Criteria:**
- AC1: Account locks after 5 consecutive failed attempts
- AC2: Lockout duration is 15 minutes
- AC3: UserLockedOut event is published
- AC4: UserUnlocked event is published when lockout expires

#### REQ-IAM-012: Password Reset [Phase 1]
The system SHALL allow users to reset forgotten passwords.

**Acceptance Criteria:**
- AC1: User can request password reset via email
- AC2: Reset link expires after 1 hour
- AC3: PasswordResetRequested event is published
- AC4: PasswordResetCompleted event is published on success
- AC5: PasswordResetExpired event is published if link expires

#### REQ-IAM-013: Password Change [Phase 1]
The system SHALL allow authenticated users to change their password.

**Acceptance Criteria:**
- AC1: User must provide current password
- AC2: New password must meet security requirements
- AC3: PasswordChanged event is published
- AC4: All other sessions are invalidated

### 2.3 Multi-Factor Authentication

#### REQ-IAM-014: MFA Enable/Disable [Phase 3]
The system SHALL allow users to enable/disable multi-factor authentication.

**Acceptance Criteria:**
- AC1: User can enable MFA from security settings
- AC2: MfaEnabled/MfaDisabled events are published
- AC3: Backup codes are generated when MFA is enabled

#### REQ-IAM-015: MFA Methods [Phase 3]
The system SHALL support multiple MFA methods.

**Acceptance Criteria:**
- AC1: System supports TOTP authenticator apps
- AC2: System supports SMS verification (optional)
- AC3: MfaMethodAdded/MfaMethodRemoved events are published

#### REQ-IAM-016: MFA Challenge [Phase 3]
The system SHALL challenge users with MFA during login when enabled.

**Acceptance Criteria:**
- AC1: MFA challenge is presented after password verification
- AC2: MfaChallengeIssued event is published
- AC3: MfaChallengeCompleted event is published on success
- AC4: MfaChallengeFailed event is published on failure

#### REQ-IAM-017: Backup Codes [Phase 3]
The system SHALL provide backup codes for MFA recovery.

**Acceptance Criteria:**
- AC1: 10 single-use backup codes are generated
- AC2: BackupCodesGenerated event is published
- AC3: BackupCodeUsed event is published when code is used
- AC4: User can regenerate codes (invalidates old codes)

### 2.4 Social Authentication

#### REQ-IAM-018: Social Account Linking [Phase 4]
The system SHALL allow users to link social accounts.

**Acceptance Criteria:**
- AC1: User can link Google, Facebook, Apple, GitHub accounts
- AC2: SocialAccountLinked event is published
- AC3: User can unlink social accounts
- AC4: SocialAccountUnlinked event is published

#### REQ-IAM-019: Social Login [Phase 4]
The system SHALL allow users to log in with social accounts.

**Acceptance Criteria:**
- AC1: User can log in with linked social account
- AC2: SocialLoginCompleted event is published on success
- AC3: SocialLoginFailed event is published on failure
- AC4: New users are created if email matches

### 2.5 Profile Management

#### REQ-IAM-020: Profile Update [Phase 1]
The system SHALL allow users to update their profile information.

**Acceptance Criteria:**
- AC1: User can update first name, last name, biography, headline
- AC2: ProfileUpdated event is published
- AC3: Changes are validated before saving

#### REQ-IAM-021: Avatar Management [Phase 1]
The system SHALL allow users to upload and manage profile avatars.

**Acceptance Criteria:**
- AC1: User can upload avatar image (JPEG, PNG, max 5MB)
- AC2: Images are resized to standard dimensions
- AC3: AvatarUploaded event is published
- AC4: AvatarRemoved event is published when removed

#### REQ-IAM-022: User Preferences [Phase 2]
The system SHALL allow users to set language, timezone, and currency preferences.

**Acceptance Criteria:**
- AC1: User can select preferred language
- AC2: User can select timezone
- AC3: User can select currency for pricing display
- AC4: LanguagePreferenceChanged, TimezoneChanged, CurrencyPreferenceChanged events are published

### 2.6 Privacy & Consent

#### REQ-IAM-023: Privacy Settings [Phase 2]
The system SHALL allow users to manage privacy settings.

**Acceptance Criteria:**
- AC1: User can control profile visibility
- AC2: User can control learning activity visibility
- AC3: PrivacySettingsUpdated event is published

#### REQ-IAM-024: Marketing Consent [Phase 2]
The system SHALL track marketing consent per GDPR requirements.

**Acceptance Criteria:**
- AC1: User can opt-in/out of marketing communications
- AC2: MarketingConsentGranted/MarketingConsentRevoked events are published
- AC3: Consent history is maintained

#### REQ-IAM-025: Data Export [Phase 3]
The system SHALL allow users to export their personal data.

**Acceptance Criteria:**
- AC1: User can request data export
- AC2: Export is generated within 72 hours
- AC3: DataExportRequested/DataExportCompleted events are published
- AC4: Export includes all personal data in machine-readable format

#### REQ-IAM-026: GDPR Consent [Phase 3]
The system SHALL record GDPR consent for EU users.

**Acceptance Criteria:**
- AC1: Users are presented with consent options
- AC2: GdprConsentRecorded event is published
- AC3: CookiePreferencesUpdated event is published when preferences change

---

## 3. Domain Model

### 3.1 Entities

| Entity | Description |
|--------|-------------|
| User | Core user account with authentication credentials |
| UserSession | Active login session with tokens |
| MfaConfiguration | MFA settings and methods for a user |
| BackupCode | Single-use recovery code for MFA |
| SocialAccount | Linked social authentication provider |
| UserPreferences | User's language, timezone, currency preferences |
| PrivacySettings | User's privacy configuration |
| ConsentRecord | GDPR and marketing consent tracking |

### 3.2 Domain Events

| Event | Trigger |
|-------|---------|
| UserRegistered | User completes registration |
| UserEmailVerified | User verifies email address |
| UserEmailVerificationExpired | Verification link expires |
| UserProfileCompleted | User completes profile setup |
| UserActivated | Account is activated |
| UserDeactivated | Account is deactivated |
| UserSuspended | Account is suspended |
| UserUnsuspended | Account suspension is lifted |
| UserAccountDeleted | Account is permanently deleted |
| UserAccountRestored | Deleted account is restored |
| UserAccountMerged | Two accounts are merged |
| UserLoggedIn | Successful login |
| UserLoggedOut | User logs out |
| UserSessionStarted | New session created |
| UserSessionExpired | Session times out |
| UserSessionTerminated | Session manually ended |
| LoginAttemptFailed | Failed login attempt |
| UserLockedOut | Account locked after failures |
| UserUnlocked | Account lockout expires |
| PasswordChanged | Password updated |
| PasswordResetRequested | Password reset initiated |
| PasswordResetCompleted | Password reset successful |
| PasswordResetExpired | Reset link expired |
| MfaEnabled | MFA turned on |
| MfaDisabled | MFA turned off |
| MfaMethodAdded | MFA method added |
| MfaMethodRemoved | MFA method removed |
| MfaChallengeIssued | MFA challenge sent |
| MfaChallengeCompleted | MFA challenge passed |
| MfaChallengeFailed | MFA challenge failed |
| BackupCodesGenerated | Backup codes created |
| BackupCodeUsed | Backup code consumed |
| SocialAccountLinked | Social account connected |
| SocialAccountUnlinked | Social account disconnected |
| SocialLoginCompleted | Social login successful |
| SocialLoginFailed | Social login failed |
| ProfileUpdated | Profile information changed |
| AvatarUploaded | Avatar image uploaded |
| AvatarRemoved | Avatar image removed |
| BiographyUpdated | Biography text changed |
| HeadlineUpdated | Headline text changed |
| SocialLinksUpdated | Social links changed |
| WebsiteUrlUpdated | Website URL changed |
| LanguagePreferenceChanged | Language preference changed |
| TimezoneChanged | Timezone preference changed |
| CurrencyPreferenceChanged | Currency preference changed |
| PrivacySettingsUpdated | Privacy settings changed |
| MarketingConsentGranted | Marketing consent given |
| MarketingConsentRevoked | Marketing consent withdrawn |
| DataExportRequested | Data export requested |
| DataExportCompleted | Data export ready |
| AccountDeletionRequested | Account deletion initiated |
| AccountDeletionCancelled | Account deletion cancelled |
| GdprConsentRecorded | GDPR consent recorded |
| CookiePreferencesUpdated | Cookie preferences changed |

---

## 4. API Endpoints

### 4.1 Registration & Verification

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/register | Register new user |
| POST | /api/auth/verify-email | Verify email with token |
| POST | /api/auth/resend-verification | Resend verification email |

### 4.2 Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/login | Login with credentials |
| POST | /api/auth/logout | Logout current session |
| POST | /api/auth/refresh | Refresh access token |
| POST | /api/auth/forgot-password | Request password reset |
| POST | /api/auth/reset-password | Reset password with token |
| PUT | /api/auth/change-password | Change password |

### 4.3 MFA

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/mfa/enable | Enable MFA |
| POST | /api/auth/mfa/disable | Disable MFA |
| POST | /api/auth/mfa/verify | Verify MFA code |
| POST | /api/auth/mfa/backup-codes | Generate backup codes |

### 4.4 Social Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/social/{provider} | Initiate social login |
| POST | /api/auth/social/{provider}/callback | Handle OAuth callback |
| DELETE | /api/auth/social/{provider} | Unlink social account |

### 4.5 Profile

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/users/me | Get current user profile |
| PUT | /api/users/me | Update profile |
| POST | /api/users/me/avatar | Upload avatar |
| DELETE | /api/users/me/avatar | Remove avatar |

### 4.6 Sessions

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/users/me/sessions | List active sessions |
| DELETE | /api/users/me/sessions/{id} | Terminate session |
| DELETE | /api/users/me/sessions | Terminate all sessions |

### 4.7 Privacy & Preferences

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/users/me/preferences | Get preferences |
| PUT | /api/users/me/preferences | Update preferences |
| GET | /api/users/me/privacy | Get privacy settings |
| PUT | /api/users/me/privacy | Update privacy settings |
| POST | /api/users/me/data-export | Request data export |
| POST | /api/users/me/delete-account | Request account deletion |
| POST | /api/users/me/cancel-deletion | Cancel deletion request |

---

## 5. Security Considerations

- All passwords MUST be hashed using bcrypt with cost factor 12
- JWT tokens MUST use RS256 algorithm
- Refresh tokens MUST be stored hashed in database
- All sensitive operations MUST be logged for audit
- Rate limiting MUST be applied to authentication endpoints
- HTTPS MUST be enforced for all endpoints

---

## 6. Dependencies

- Serilog for structured logging
- MediatR for CQRS pattern
- Entity Framework Core for data access
- FluentValidation for request validation

---

## 7. Implementation Notes

Per the implementation specification (REQ-SYS-005, REQ-SYS-006), all data access SHALL use ICoursesPlatformContext directly without repository pattern.

---

*Document Version: 1.0*
*Phase Coverage: 1-5*
