# Identity & Access Management - Frontend Specification

**Feature:** Identity & Access Management
**Version:** 1.0
**Last Updated:** December 2024

---

## 1. Overview

The Identity & Access Management frontend provides user interfaces for authentication, registration, profile management, and security settings.

---

## 2. Requirements

### 2.1 Registration

#### REQ-IAM-FE-001: Registration Page [Phase 1]
The application SHALL provide a registration page for new users.

**Acceptance Criteria:**
- AC1: Page displays form with email, password, confirm password, first name, last name fields
- AC2: Form validates input in real-time with error messages
- AC3: Password strength indicator is displayed
- AC4: Submit button is disabled until form is valid
- AC5: Success message directs user to check email for verification
- AC6: Error messages are displayed for validation failures

#### REQ-IAM-FE-002: Email Verification Page [Phase 1]
The application SHALL provide an email verification confirmation page.

**Acceptance Criteria:**
- AC1: Page displays verification status (success/expired/invalid)
- AC2: Success state shows login link
- AC3: Expired state shows resend verification option
- AC4: Page handles token from URL parameter

### 2.2 Authentication

#### REQ-IAM-FE-003: Login Page [Phase 1]
The application SHALL provide a login page.

**Acceptance Criteria:**
- AC1: Page displays email and password fields
- AC2: Remember me checkbox is available
- AC3: Forgot password link is visible
- AC4: Social login buttons are displayed (Phase 4)
- AC5: Error messages show for invalid credentials
- AC6: Lockout message shows remaining time

#### REQ-IAM-FE-004: Forgot Password Page [Phase 1]
The application SHALL provide a forgot password page.

**Acceptance Criteria:**
- AC1: Page displays email input field
- AC2: Success message confirms email sent
- AC3: Rate limiting message shows if too many requests

#### REQ-IAM-FE-005: Reset Password Page [Phase 1]
The application SHALL provide a password reset page.

**Acceptance Criteria:**
- AC1: Page displays new password and confirm password fields
- AC2: Password strength indicator is shown
- AC3: Expired token shows error with resend option
- AC4: Success redirects to login page

#### REQ-IAM-FE-006: MFA Challenge Page [Phase 3]
The application SHALL provide an MFA verification page.

**Acceptance Criteria:**
- AC1: Page displays 6-digit code input
- AC2: Backup code option is available
- AC3: Error message shows for invalid code
- AC4: Resend code option (for SMS method)

### 2.3 Profile Management

#### REQ-IAM-FE-007: Profile Page [Phase 1]
The application SHALL provide a profile viewing and editing page.

**Acceptance Criteria:**
- AC1: Page displays user profile information
- AC2: Edit mode allows updating fields
- AC3: Avatar upload with preview is supported
- AC4: Form validates input before submission
- AC5: Success notification on save

#### REQ-IAM-FE-008: Avatar Upload [Phase 1]
The application SHALL provide avatar upload functionality.

**Acceptance Criteria:**
- AC1: Drag and drop or click to upload
- AC2: Image preview before upload
- AC3: Crop/resize tool available
- AC4: File size and type validation
- AC5: Remove avatar option

### 2.4 Security Settings

#### REQ-IAM-FE-009: Change Password Page [Phase 1]
The application SHALL provide a change password page.

**Acceptance Criteria:**
- AC1: Page requires current password
- AC2: New password and confirm fields
- AC3: Password strength indicator
- AC4: Success logs out other sessions

#### REQ-IAM-FE-010: Session Management [Phase 1]
The application SHALL display active sessions.

**Acceptance Criteria:**
- AC1: List shows all active sessions
- AC2: Current session is highlighted
- AC3: Device type and location are shown
- AC4: User can terminate individual sessions
- AC5: User can terminate all other sessions

#### REQ-IAM-FE-011: MFA Settings [Phase 3]
The application SHALL provide MFA configuration interface.

**Acceptance Criteria:**
- AC1: Toggle to enable/disable MFA
- AC2: QR code displayed for authenticator setup
- AC3: Manual entry key provided
- AC4: Verification code required to enable
- AC5: Backup codes displayed after setup

#### REQ-IAM-FE-012: Social Accounts [Phase 4]
The application SHALL display linked social accounts.

**Acceptance Criteria:**
- AC1: List of supported providers shown
- AC2: Connected accounts show as linked
- AC3: Connect/disconnect buttons available
- AC4: OAuth flow opens in popup

### 2.5 Privacy & Preferences

#### REQ-IAM-FE-013: Preferences Page [Phase 2]
The application SHALL provide user preferences page.

**Acceptance Criteria:**
- AC1: Language selector with available options
- AC2: Timezone selector with search
- AC3: Currency selector
- AC4: Changes apply immediately

#### REQ-IAM-FE-014: Privacy Settings [Phase 2]
The application SHALL provide privacy settings interface.

**Acceptance Criteria:**
- AC1: Profile visibility toggle
- AC2: Activity visibility toggle
- AC3: Marketing consent toggle
- AC4: Cookie preferences button

#### REQ-IAM-FE-015: Data Export [Phase 3]
The application SHALL provide data export functionality.

**Acceptance Criteria:**
- AC1: Request export button
- AC2: Progress/status indicator
- AC3: Download link when ready
- AC4: Email notification option

#### REQ-IAM-FE-016: Account Deletion [Phase 3]
The application SHALL provide account deletion interface.

**Acceptance Criteria:**
- AC1: Delete account button with warning
- AC2: Confirmation dialog with password
- AC3: Grace period information displayed
- AC4: Cancel deletion option during grace period

---

## 3. Component Architecture

### 3.1 Pages

| Component | Route | Description |
|-----------|-------|-------------|
| RegisterPage | /register | User registration |
| LoginPage | /login | User login |
| VerifyEmailPage | /verify-email | Email verification |
| ForgotPasswordPage | /forgot-password | Password reset request |
| ResetPasswordPage | /reset-password | Password reset |
| MfaChallengePage | /mfa-challenge | MFA verification |
| ProfilePage | /profile | Profile view/edit |
| SecuritySettingsPage | /settings/security | Security settings |
| PreferencesPage | /settings/preferences | User preferences |
| PrivacySettingsPage | /settings/privacy | Privacy settings |

### 3.2 Components

| Component | Description |
|-----------|-------------|
| LoginForm | Email/password login form |
| RegisterForm | Registration form with validation |
| PasswordInput | Password field with strength indicator |
| MfaCodeInput | 6-digit MFA code input |
| AvatarUpload | Avatar upload with preview |
| SessionList | Active sessions list |
| SocialAccountsList | Linked social accounts |
| LanguageSelector | Language dropdown |
| TimezoneSelector | Timezone searchable dropdown |
| CurrencySelector | Currency dropdown |

### 3.3 Services

| Service | Description |
|---------|-------------|
| AuthService | Authentication API calls |
| UserService | User profile API calls |
| SessionService | Session management API calls |
| PreferencesService | Preferences API calls |

---

## 4. State Management

Per REQ-FE-009, state management SHALL use RxJS (not NgRx or Signals).

### 4.1 Auth State

```typescript
interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  accessToken: string | null;
  isLoading: boolean;
  error: string | null;
}
```

### 4.2 User State

```typescript
interface UserState {
  profile: UserProfile | null;
  preferences: UserPreferences | null;
  sessions: Session[];
  isLoading: boolean;
}
```

---

## 5. UI/UX Requirements

### 5.1 Design System

Per REQ-FE-006 and REQ-FE-010, the application SHALL use Angular Material with Material 3 guidelines and default theme colors.

### 5.2 Responsive Design

Per REQ-FE-018, all pages SHALL be responsive and follow mobile-first design:
- Mobile: Single column layout
- Tablet: Two column layout where appropriate
- Desktop: Sidebar navigation with content area

### 5.3 Accessibility

- All forms MUST have proper labels
- Error messages MUST be associated with fields
- Focus management for modals and dialogs
- Keyboard navigation support

### 5.4 Component Naming

Per REQ-FE-012 and REQ-FE-013:
- Class names SHALL NOT have "Component" suffix
- File names SHALL NOT have "component" prefix

---

## 6. Form Validation

### 6.1 Email Validation
- Required
- Valid email format
- Maximum 256 characters

### 6.2 Password Validation
- Required
- Minimum 8 characters
- At least one uppercase letter
- At least one lowercase letter
- At least one number

### 6.3 Name Validation
- Required
- Minimum 1 character
- Maximum 100 characters

---

## 7. Error Handling

### 7.1 API Errors

| Error Code | User Message |
|------------|--------------|
| 401 | Invalid credentials. Please try again. |
| 403 | Access denied. |
| 404 | Resource not found. |
| 409 | Email already registered. |
| 429 | Too many attempts. Please wait. |
| 500 | Something went wrong. Please try again. |

### 7.2 Validation Errors

- Display inline below the field
- Use red color for error state
- Clear error when field is corrected

---

## 8. Testing Requirements

### 8.1 Unit Tests (Jest)

Per REQ-FE-021, unit tests SHALL use Jest:
- Test all form validations
- Test state management
- Test service API calls with mocks
- Minimum 80% code coverage

### 8.2 E2E Tests (Playwright)

Per REQ-FE-022, E2E tests SHALL use Playwright:
- Test complete registration flow
- Test login/logout flow
- Test password reset flow
- Test profile update flow

---

## 9. Implementation Notes

### 9.1 API Base URL

Per REQ-FE-026, the baseUrl configuration SHALL contain ONLY the base URI:
```typescript
// Correct
baseUrl = "http://localhost:7200"
this.http.get(`${baseUrl}/api/auth/login`)

// Incorrect
baseUrl = "http://localhost:7200/api"
```

### 9.2 File Structure

Per REQ-FE-015 and REQ-FE-016:
- Pages in `pages/` folder
- Reusable components in `components/` folder
- Barrel exports in each folder

---

*Document Version: 1.0*
*Phase Coverage: 1-5*
