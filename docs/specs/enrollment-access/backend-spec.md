# Enrollment & Access - Backend Specification

**Feature:** Enrollment & Access
**Version:** 1.0
**Last Updated:** December 2024

---

## 1. Overview

The Enrollment & Access feature manages course enrollments, access control, and various enrollment types for the CoursesPlatform system. It controls who can access course content and under what conditions.

---

## 2. Requirements

### 2.1 Enrollment Lifecycle (Phase 1)

#### REQ-ENR-001: Enroll in Course [Phase 1]
The system SHALL allow users to enroll in a course.

**Acceptance Criteria:**
- AC1: User can enroll in an available course
- AC2: System validates user is not already enrolled
- AC3: System validates course is available for enrollment
- AC4: Enrollment record is created with Active status
- AC5: UserEnrolled event is published
- AC6: AccessGrant is automatically created for the course

#### REQ-ENR-002: Unenroll from Course [Phase 1]
The system SHALL allow users to unenroll from a course.

**Acceptance Criteria:**
- AC1: User can unenroll from an active enrollment
- AC2: Enrollment status changes to Unenrolled
- AC3: UserUnenrolled event is published
- AC4: AccessGrant is automatically revoked
- AC5: User's progress data is retained but marked inactive

#### REQ-ENR-003: Suspend Enrollment [Phase 1]
The system SHALL support suspending enrollments.

**Acceptance Criteria:**
- AC1: Administrators can suspend enrollments with reason
- AC2: Suspended enrollments cannot access course content
- AC3: EnrollmentSuspended event is published
- AC4: AccessGrant is temporarily revoked
- AC5: Suspension reason is recorded

#### REQ-ENR-004: Resume Enrollment [Phase 1]
The system SHALL allow resuming suspended enrollments.

**Acceptance Criteria:**
- AC1: Administrators can resume suspended enrollments
- AC2: Enrollment status changes back to Active
- AC3: EnrollmentResumed event is published
- AC4: AccessGrant is restored
- AC5: User can continue from previous progress

#### REQ-ENR-005: Enrollment Expiration [Phase 2]
The system SHALL support time-based enrollment expiration.

**Acceptance Criteria:**
- AC1: Enrollments can have optional expiration dates
- AC2: Expired enrollments automatically change to Expired status
- AC3: EnrollmentExpired event is published
- AC4: Access is automatically revoked upon expiration
- AC5: Background job checks for expired enrollments daily

#### REQ-ENR-006: Extend Enrollment [Phase 2]
The system SHALL allow extending enrollment expiration dates.

**Acceptance Criteria:**
- AC1: Administrators can extend enrollment expiration
- AC2: EnrollmentExtended event is published
- AC3: New expiration date is validated to be in the future
- AC4: AccessGrant is extended accordingly

### 2.2 Enrollment Types (Phase 2)

#### REQ-ENR-007: Paid Enrollment [Phase 2]
The system SHALL support paid course enrollments.

**Acceptance Criteria:**
- AC1: Enrollment can be linked to a payment transaction
- AC2: Payment must be confirmed before enrollment is activated
- AC3: PaidEnrollmentCreated event is published
- AC4: Payment reference is stored with enrollment
- AC5: Refund request can cancel the enrollment

#### REQ-ENR-008: Free Enrollment [Phase 2]
The system SHALL support free course enrollments.

**Acceptance Criteria:**
- AC1: Users can enroll in free courses without payment
- AC2: FreeEnrollmentCreated event is published
- AC3: No payment information is required
- AC4: Enrollment is immediately active

#### REQ-ENR-009: Gift Enrollment [Phase 2]
The system SHALL support gifting course enrollments to other users.

**Acceptance Criteria:**
- AC1: User can purchase enrollment as a gift
- AC2: Gift recipient receives notification
- AC3: GiftEnrollmentCreated event is published
- AC4: Gift can be claimed by recipient
- AC5: GiftEnrollmentClaimed event is published when claimed

#### REQ-ENR-010: Coupon Enrollment [Phase 2]
The system SHALL support enrollment with discount coupons.

**Acceptance Criteria:**
- AC1: User can apply valid coupon code during enrollment
- AC2: System validates coupon code, expiration, and usage limits
- AC3: Discount is applied to enrollment price
- AC4: CouponEnrollmentCreated event is published
- AC5: Coupon usage count is incremented

### 2.3 Access Control (Phase 1)

#### REQ-ENR-011: Grant Access [Phase 1]
The system SHALL grant access to course content based on active enrollments.

**Acceptance Criteria:**
- AC1: AccessGrant is created when enrollment is activated
- AC2: AccessGranted event is published
- AC3: Grant includes course identifier and user identifier
- AC4: Grant records start date and optional end date
- AC5: Grant status is Active upon creation

#### REQ-ENR-012: Revoke Access [Phase 1]
The system SHALL revoke access when enrollments are terminated.

**Acceptance Criteria:**
- AC1: AccessGrant is revoked when enrollment ends
- AC2: AccessRevoked event is published
- AC3: Grant status changes to Revoked
- AC4: Revocation reason is recorded
- AC5: User cannot access course content after revocation

#### REQ-ENR-013: Check Access [Phase 1]
The system SHALL verify user access before allowing content viewing.

**Acceptance Criteria:**
- AC1: System checks for valid AccessGrant before displaying content
- AC2: Access check validates grant is Active and not expired
- AC3: AccessChecked event is published for audit
- AC4: Unauthorized access attempts are logged
- AC5: Access check performance is under 100ms

#### REQ-ENR-014: Access History [Phase 3]
The system SHALL maintain history of access grants and revocations.

**Acceptance Criteria:**
- AC1: All access grants are logged with timestamps
- AC2: All revocations are logged with reason and timestamp
- AC3: Administrators can view access history
- AC4: History includes who granted/revoked access
- AC5: History is retained for audit purposes

### 2.4 Enrollment Validation (Phase 1)

#### REQ-ENR-015: Prevent Duplicate Enrollment [Phase 1]
The system SHALL prevent users from enrolling in the same course multiple times.

**Acceptance Criteria:**
- AC1: System checks for existing active enrollment
- AC2: DuplicateEnrollmentAttempted event is published if duplicate found
- AC3: User receives clear error message
- AC4: Check includes all enrollment statuses except Unenrolled

#### REQ-ENR-016: Course Availability Check [Phase 1]
The system SHALL validate course availability before enrollment.

**Acceptance Criteria:**
- AC1: System verifies course exists and is published
- AC2: System checks course enrollment capacity if applicable
- AC3: CourseUnavailable event is published if not available
- AC4: Unpublished courses cannot be enrolled

#### REQ-ENR-017: Prerequisite Validation [Phase 3]
The system SHALL enforce course prerequisite requirements.

**Acceptance Criteria:**
- AC1: System checks if user completed prerequisite courses
- AC2: PrerequisiteNotMet event is published if requirements missing
- AC3: User receives list of required prerequisites
- AC4: Completion status is verified from progress data

### 2.5 Enrollment Management (Phase 2)

#### REQ-ENR-018: Transfer Enrollment [Phase 3]
The system SHALL support transferring enrollments between users.

**Acceptance Criteria:**
- AC1: Administrators can transfer enrollment to another user
- AC2: Original enrollment is cancelled
- AC3: New enrollment is created for target user
- AC4: EnrollmentTransferred event is published
- AC5: Progress data can optionally be transferred

#### REQ-ENR-019: Bulk Enrollment [Phase 3]
The system SHALL support enrolling multiple users at once.

**Acceptance Criteria:**
- AC1: Administrators can upload CSV with user identifiers
- AC2: System validates all users before enrolling
- AC3: BulkEnrollmentInitiated event is published
- AC4: Individual UserEnrolled events for each enrollment
- AC5: Summary report shows success and failures

#### REQ-ENR-020: Enrollment Waitlist [Phase 4]
The system SHALL support waitlists for full courses.

**Acceptance Criteria:**
- AC1: Users can join waitlist when course is full
- AC2: WaitlistJoined event is published
- AC3: Users are notified when spots become available
- AC4: Waitlist position is tracked
- AC5: WaitlistPromoted event when user gets spot

### 2.6 Reporting & Analytics (Phase 3)

#### REQ-ENR-021: Enrollment Metrics [Phase 3]
The system SHALL provide enrollment metrics and statistics.

**Acceptance Criteria:**
- AC1: Track total enrollments per course
- AC2: Track enrollment trends over time
- AC3: Calculate enrollment conversion rates
- AC4: Report enrollment by type (paid, free, gift, coupon)
- AC5: Metrics updated in real-time

#### REQ-ENR-022: Access Audit Logs [Phase 3]
The system SHALL maintain audit logs for access control.

**Acceptance Criteria:**
- AC1: All access checks are logged with timestamp
- AC2: Failed access attempts are logged separately
- AC3: Administrators can search audit logs
- AC4: Logs include user, course, timestamp, and result
- AC5: Logs retained for 90 days minimum

---

## 3. Domain Model

### 3.1 Entities

| Entity | Description |
|--------|-------------|
| Enrollment | User's enrollment in a specific course |
| AccessGrant | Permission to access course content |
| EnrollmentCoupon | Discount coupon for course enrollment |
| GiftEnrollment | Course enrollment purchased as a gift |
| EnrollmentWaitlist | Waitlist entry for full courses |
| AccessAuditLog | Audit log for access control operations |

### 3.2 Domain Events

| Event | Trigger |
|-------|---------|
| UserEnrolled | User successfully enrolls in course |
| UserUnenrolled | User unenrolls from course |
| EnrollmentSuspended | Enrollment is suspended |
| EnrollmentResumed | Suspended enrollment is resumed |
| EnrollmentExpired | Enrollment expires due to time limit |
| EnrollmentExtended | Enrollment expiration is extended |
| PaidEnrollmentCreated | Paid enrollment is created |
| FreeEnrollmentCreated | Free enrollment is created |
| GiftEnrollmentCreated | Gift enrollment is purchased |
| GiftEnrollmentClaimed | Gift enrollment is claimed |
| CouponEnrollmentCreated | Enrollment with coupon is created |
| AccessGranted | Access to course is granted |
| AccessRevoked | Access to course is revoked |
| AccessChecked | Access verification is performed |
| DuplicateEnrollmentAttempted | Duplicate enrollment prevented |
| CourseUnavailable | Course not available for enrollment |
| PrerequisiteNotMet | Course prerequisites not satisfied |
| EnrollmentTransferred | Enrollment transferred to another user |
| BulkEnrollmentInitiated | Bulk enrollment process started |
| WaitlistJoined | User joins course waitlist |
| WaitlistPromoted | Waitlist user gets enrollment spot |

---

## 4. API Endpoints

### 4.1 Enrollment Management

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/enrollments | Create new enrollment |
| GET | /api/enrollments | List user's enrollments |
| GET | /api/enrollments/{id} | Get enrollment details |
| DELETE | /api/enrollments/{id} | Unenroll from course |
| POST | /api/enrollments/{id}/suspend | Suspend enrollment |
| POST | /api/enrollments/{id}/resume | Resume enrollment |
| PUT | /api/enrollments/{id}/extend | Extend enrollment expiration |

### 4.2 Enrollment Types

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/enrollments/free | Enroll in free course |
| POST | /api/enrollments/paid | Enroll with payment |
| POST | /api/enrollments/gift | Purchase gift enrollment |
| POST | /api/enrollments/gift/{id}/claim | Claim gift enrollment |
| POST | /api/enrollments/coupon | Enroll with coupon |
| POST | /api/enrollments/validate-coupon | Validate coupon code |

### 4.3 Access Control

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/access/course/{courseId} | Check access to course |
| GET | /api/access/lesson/{lessonId} | Check access to lesson |
| GET | /api/access/grants | List access grants |
| POST | /api/access/grant | Grant access manually |
| DELETE | /api/access/grant/{id} | Revoke access |

### 4.4 Waitlist

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/waitlist/join | Join course waitlist |
| DELETE | /api/waitlist/{id} | Leave waitlist |
| GET | /api/waitlist/course/{courseId} | Get waitlist for course |

### 4.5 Administration

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/admin/enrollments/bulk | Bulk enroll users |
| POST | /api/admin/enrollments/{id}/transfer | Transfer enrollment |
| GET | /api/admin/enrollments/metrics | Get enrollment metrics |
| GET | /api/admin/access/audit-logs | Get access audit logs |

---

## 5. Business Rules

- Users cannot enroll in the same course multiple times with active status
- Access is automatically granted upon active enrollment
- Access is automatically revoked when enrollment ends or is suspended
- Paid enrollments require confirmed payment before activation
- Gift enrollments can only be claimed once
- Coupon codes must be valid and not exceed usage limits
- Expired enrollments cannot be resumed without extension
- Course prerequisites must be completed before enrollment
- Waitlist users are promoted in FIFO order

---

## 6. Security Considerations

- All enrollment operations MUST verify user authentication
- Access checks MUST be performed before displaying content
- Gift enrollment codes MUST be securely generated
- Coupon codes MUST be validated server-side
- Access audit logs MUST be tamper-proof
- Bulk enrollment operations MUST be admin-only
- Enrollment transfers MUST be admin-only

---

## 7. Dependencies

- Serilog for structured logging
- MediatR for CQRS pattern
- Entity Framework Core for data access
- FluentValidation for request validation
- Course Management feature for course data
- Identity & Access Management for user authentication

---

## 8. Implementation Notes

Per the implementation specification (REQ-SYS-005, REQ-SYS-006), all data access SHALL use ICoursesPlatformContext directly without repository pattern.

All enrollment and access operations SHALL publish domain events for integration with other bounded contexts.

---

*Document Version: 1.0*
*Phase Coverage: 1-4*
