# Enterprise Organizations - Backend Specification

**Feature:** Enterprise Organizations
**Version:** 1.0
**Last Updated:** December 2024

---

## 1. Overview

The Enterprise Organizations feature provides comprehensive enterprise-level functionality for the CoursesPlatform system, including organization management, team hierarchies, license allocation, enterprise billing, SSO integration, and advanced reporting capabilities.

---

## 2. Requirements

### 2.1 Organization Management

#### REQ-ENT-001: Create Organization [Phase 5]
The system SHALL allow creation of enterprise organizations.

**Acceptance Criteria:**
- AC1: Organization admin can create organization with name, domain, and billing details
- AC2: System validates organization name uniqueness within tenant
- AC3: System validates domain ownership through DNS verification
- AC4: OrganizationCreated event is published
- AC5: Initial organization admin is automatically assigned
- AC6: Default billing settings are initialized

#### REQ-ENT-002: Update Organization [Phase 5]
The system SHALL allow organization admins to update organization details.

**Acceptance Criteria:**
- AC1: Admins can update organization name, description, industry, and company size
- AC2: Domain changes require re-verification
- AC3: OrganizationUpdated event is published
- AC4: Audit log records all changes with timestamp and user

#### REQ-ENT-003: Organization Branding [Phase 5]
The system SHALL support organization-specific branding.

**Acceptance Criteria:**
- AC1: Organization can upload logo (PNG, JPEG, max 2MB)
- AC2: Organization can set primary and secondary brand colors
- AC3: Organization can customize email templates
- AC4: OrganizationBrandingUpdated event is published
- AC5: Branding applies to all organization member interfaces

#### REQ-ENT-004: Organization Status Management [Phase 5]
The system SHALL support organization lifecycle management.

**Acceptance Criteria:**
- AC1: Organizations can be Active, Suspended, or Deactivated
- AC2: Suspended organizations cannot access platform features
- AC3: OrganizationSuspended/OrganizationDeactivated events are published
- AC4: Organization data is retained when deactivated
- AC5: Organization can be reactivated by platform admin

#### REQ-ENT-005: Organization Hierarchy [Phase 5]
The system SHALL support parent-child organization relationships.

**Acceptance Criteria:**
- AC1: Organizations can have parent organization
- AC2: Child organizations inherit parent billing settings
- AC3: Parent organization admins can view child organization metrics
- AC4: OrganizationHierarchyUpdated event is published
- AC5: Maximum 3 levels of hierarchy are supported

### 2.2 Team Management

#### REQ-ENT-006: Create Team [Phase 5]
The system SHALL allow organization admins to create teams.

**Acceptance Criteria:**
- AC1: Admin can create team with name, description, and parent team
- AC2: System validates team name uniqueness within organization
- AC3: TeamCreated event is published
- AC4: Team creator is automatically assigned as team manager
- AC5: Teams can be nested up to 5 levels deep

#### REQ-ENT-007: Update Team [Phase 5]
The system SHALL allow team managers to update team details.

**Acceptance Criteria:**
- AC1: Manager can update team name, description, and settings
- AC2: TeamUpdated event is published
- AC3: Changes are immediately visible to team members
- AC4: Audit trail records all modifications

#### REQ-ENT-008: Team Member Assignment [Phase 5]
The system SHALL allow adding and removing team members.

**Acceptance Criteria:**
- AC1: Team managers can add members by email
- AC2: System sends invitation email to new members
- AC3: TeamMemberAdded event is published
- AC4: TeamMemberRemoved event is published on removal
- AC5: Member removal does not delete user account
- AC6: Member can be in multiple teams simultaneously

#### REQ-ENT-009: Team Roles [Phase 5]
The system SHALL support team-level role assignments.

**Acceptance Criteria:**
- AC1: Roles include Team Manager, Team Lead, and Team Member
- AC2: Team Manager has full team administration rights
- AC3: Team Lead can assign courses and view reports
- AC4: TeamRoleAssigned event is published
- AC5: Multiple managers per team are supported

#### REQ-ENT-010: Team Deletion [Phase 5]
The system SHALL allow soft deletion of teams.

**Acceptance Criteria:**
- AC1: Only organization admin can delete teams
- AC2: Team members are unassigned before deletion
- AC3: TeamDeleted event is published
- AC4: Team data is retained for audit purposes
- AC5: Deleted teams can be restored within 30 days

### 2.3 Organization Member Management

#### REQ-ENT-011: Invite Members [Phase 5]
The system SHALL support bulk member invitations.

**Acceptance Criteria:**
- AC1: Admin can invite members via CSV upload or email list
- AC2: System validates email format and uniqueness
- AC3: OrganizationMemberInvited event is published per member
- AC4: Invitation expires after 7 days
- AC5: Members can be pre-assigned to teams during invitation

#### REQ-ENT-012: Member Onboarding [Phase 5]
The system SHALL support automated member onboarding.

**Acceptance Criteria:**
- AC1: New members receive welcome email with organization details
- AC2: Members can set password and complete profile
- AC3: OrganizationMemberOnboarded event is published
- AC4: Pre-assigned courses are auto-enrolled
- AC5: Member receives license automatically if available

#### REQ-ENT-013: Member Role Assignment [Phase 5]
The system SHALL support organization-level role assignments.

**Acceptance Criteria:**
- AC1: Roles include Org Admin, Billing Admin, Team Manager, and Member
- AC2: Org Admin has full organization administration rights
- AC3: Billing Admin manages billing and licenses only
- AC4: OrganizationMemberRoleAssigned event is published
- AC5: Multiple admins per organization are supported

#### REQ-ENT-014: Member Deactivation [Phase 5]
The system SHALL allow deactivating organization members.

**Acceptance Criteria:**
- AC1: Admin can deactivate members from organization
- AC2: Deactivated members lose access to organization resources
- AC3: OrganizationMemberDeactivated event is published
- AC4: Member's user account remains active
- AC5: Member can be reactivated with preserved team assignments

#### REQ-ENT-015: Member Transfer [Phase 5]
The system SHALL support transferring members between teams.

**Acceptance Criteria:**
- AC1: Admin can move members to different teams
- AC2: Member's learning progress is preserved
- AC3: OrganizationMemberTransferred event is published
- AC4: Member receives notification of transfer

### 2.4 License Management

#### REQ-ENT-016: Purchase Licenses [Phase 5]
The system SHALL allow organizations to purchase course licenses.

**Acceptance Criteria:**
- AC1: Admin can purchase licenses for specific courses
- AC2: System supports quantity-based license packages
- AC3: LicensesPurchased event is published
- AC4: Licenses are immediately available for allocation
- AC5: Purchase is recorded in billing system

#### REQ-ENT-017: Allocate Licenses [Phase 5]
The system SHALL allow admins to allocate licenses to members.

**Acceptance Criteria:**
- AC1: Admin can assign available licenses to specific members
- AC2: System validates license availability before allocation
- AC3: LicenseAllocated event is published
- AC4: Member receives notification and automatic enrollment
- AC5: Allocated license is marked as used

#### REQ-ENT-018: Revoke Licenses [Phase 5]
The system SHALL allow revoking allocated licenses.

**Acceptance Criteria:**
- AC1: Admin can revoke license from member
- AC2: Member's course access is immediately terminated
- AC3: LicenseRevoked event is published
- AC4: License returns to available pool
- AC5: Member's progress is preserved but access locked

#### REQ-ENT-019: License Pool Management [Phase 5]
The system SHALL track license pool availability.

**Acceptance Criteria:**
- AC1: System maintains count of total, allocated, and available licenses
- AC2: Dashboard displays license utilization metrics
- AC3: LicensePoolUpdated event is published on changes
- AC4: Alerts sent when license pool reaches threshold (90%)
- AC5: Auto-renewal option for expiring licenses

#### REQ-ENT-020: License Expiration [Phase 5]
The system SHALL manage license expiration.

**Acceptance Criteria:**
- AC1: Licenses have configurable expiration dates
- AC2: LicenseExpiring event is published 30 days before expiry
- AC3: LicenseExpired event is published on expiration date
- AC4: Member access is revoked automatically on expiration
- AC5: Grace period of 7 days before hard cutoff

### 2.5 Enterprise Billing

#### REQ-ENT-021: Billing Profile [Phase 5]
The system SHALL support enterprise billing profiles.

**Acceptance Criteria:**
- AC1: Organization can set billing contact, address, and tax information
- AC2: Multiple payment methods are supported
- AC3: BillingProfileUpdated event is published
- AC4: System validates tax ID format by region
- AC5: PO (Purchase Order) payment option is available

#### REQ-ENT-022: Invoice Generation [Phase 5]
The system SHALL generate monthly invoices for organizations.

**Acceptance Criteria:**
- AC1: Invoices are generated automatically on billing cycle date
- AC2: Invoice includes license fees, usage charges, and taxes
- AC3: InvoiceGenerated event is published
- AC4: PDF invoice is sent to billing contact
- AC5: Invoice is accessible in billing dashboard

#### REQ-ENT-023: Payment Processing [Phase 5]
The system SHALL process enterprise payments.

**Acceptance Criteria:**
- AC1: System supports credit card and ACH payments
- AC2: PO payments are tracked manually by billing admin
- AC3: PaymentProcessed event is published on successful payment
- AC4: PaymentFailed event is published on failure
- AC5: Automatic retries for failed payments (3 attempts)

#### REQ-ENT-024: Billing Analytics [Phase 5]
The system SHALL provide billing analytics and reporting.

**Acceptance Criteria:**
- AC1: Dashboard shows current and historical spending
- AC2: Cost breakdown by course and team is available
- AC3: Export billing data to CSV or Excel
- AC4: Forecast future costs based on usage trends
- AC5: Budget alerts when spending exceeds threshold

#### REQ-ENT-025: Payment History [Phase 5]
The system SHALL maintain complete payment history.

**Acceptance Criteria:**
- AC1: All payments and invoices are logged permanently
- AC2: Payment history is searchable and filterable
- AC3: Transaction details include date, amount, status, and method
- AC4: Receipt downloads are available
- AC5: Audit trail for all billing changes

### 2.6 SSO Integration

#### REQ-ENT-026: Configure SSO [Phase 5]
The system SHALL support SAML 2.0 SSO configuration.

**Acceptance Criteria:**
- AC1: Admin can configure SSO with IdP metadata XML
- AC2: System validates SAML configuration before activation
- AC3: SSOConfigured event is published
- AC4: Multiple IdPs can be configured (SAML, OAuth, OIDC)
- AC5: Test SSO connection before enabling

#### REQ-ENT-027: SSO Authentication [Phase 5]
The system SHALL authenticate users via SSO.

**Acceptance Criteria:**
- AC1: Users from SSO-enabled domain are redirected to IdP
- AC2: System validates SAML assertion signature
- AC3: SSOAuthenticationSucceeded event is published on success
- AC4: SSOAuthenticationFailed event is published on failure
- AC5: Just-in-time (JIT) user provisioning is supported

#### REQ-ENT-028: SSO User Provisioning [Phase 5]
The system SHALL support automatic user provisioning via SSO.

**Acceptance Criteria:**
- AC1: Users are created automatically on first SSO login
- AC2: User attributes are mapped from SAML assertions
- AC3: UserProvisionedViaSSO event is published
- AC4: Team assignments based on group claims
- AC5: User profile syncs on each SSO login

#### REQ-ENT-029: SSO Session Management [Phase 5]
The system SHALL support SSO session lifecycle.

**Acceptance Criteria:**
- AC1: Single logout (SLO) terminates both platform and IdP sessions
- AC2: Session timeout syncs with IdP policies
- AC3: SSOSessionTerminated event is published
- AC4: Force re-authentication for sensitive operations
- AC5: Session duration is configurable per organization

#### REQ-ENT-030: SSO Audit Logging [Phase 5]
The system SHALL log all SSO activities.

**Acceptance Criteria:**
- AC1: All SSO login attempts are logged
- AC2: Logs include user, timestamp, IdP, and result
- AC3: Failed attempts are flagged for security review
- AC4: Logs are tamper-proof and retained for 1 year
- AC5: Searchable audit log in admin dashboard

### 2.7 Reporting & Analytics

#### REQ-ENT-031: Learning Analytics [Phase 5]
The system SHALL provide organization-wide learning analytics.

**Acceptance Criteria:**
- AC1: Dashboard shows enrollment, completion, and engagement metrics
- AC2: Analytics are segmented by team, course, and time period
- AC3: Trend analysis shows progress over time
- AC4: Export reports to PDF, Excel, or PowerPoint
- AC5: Real-time data updates every 15 minutes

#### REQ-ENT-032: Member Activity Reports [Phase 5]
The system SHALL generate member activity reports.

**Acceptance Criteria:**
- AC1: Reports show member login frequency and course progress
- AC2: Identify inactive members (no activity in 30 days)
- AC3: Track time spent on platform per member
- AC4: MemberActivityReportGenerated event is published
- AC5: Schedule automated report delivery via email

#### REQ-ENT-033: Team Performance Reports [Phase 5]
The system SHALL provide team performance analytics.

**Acceptance Criteria:**
- AC1: Compare team performance against organization average
- AC2: Track team completion rates and average scores
- AC3: Identify high and low performing teams
- AC4: TeamPerformanceReportGenerated event is published
- AC5: Drill down to individual member details

#### REQ-ENT-034: Compliance Reporting [Phase 5]
The system SHALL support compliance and certification tracking.

**Acceptance Criteria:**
- AC1: Track mandatory course compliance by member
- AC2: Alert on upcoming certification expirations
- AC3: ComplianceReportGenerated event is published
- AC4: Export compliance data for regulatory audits
- AC5: Automated compliance notifications to managers

#### REQ-ENT-035: Custom Reports [Phase 5]
The system SHALL allow creating custom reports.

**Acceptance Criteria:**
- AC1: Admin can define custom metrics and dimensions
- AC2: Report builder with drag-and-drop interface
- AC3: Save and reuse custom report templates
- AC4: CustomReportCreated event is published
- AC5: Share reports with other organization admins

---

## 3. Domain Model

### 3.1 Entities

| Entity | Description |
|--------|-------------|
| Organization | Enterprise organization entity |
| Team | Team within organization hierarchy |
| OrganizationMember | Member of an organization |
| License | Course license for organization |
| LicenseAllocation | License assigned to member |
| SSOConfiguration | SSO settings for organization |
| BillingProfile | Billing details for organization |
| Invoice | Generated invoice for organization |
| Payment | Payment transaction record |
| ActivityReport | Generated activity report |

### 3.2 Value Objects

| Value Object | Description |
|--------------|-------------|
| Address | Billing address |
| TaxInformation | Tax ID and region details |
| BrandingSettings | Logo, colors, and theme |
| LicensePool | License availability tracking |
| SAMLSettings | SAML IdP configuration |

### 3.3 Domain Events

| Event | Trigger |
|-------|---------|
| OrganizationCreated | Organization is created |
| OrganizationUpdated | Organization details changed |
| OrganizationBrandingUpdated | Branding settings changed |
| OrganizationSuspended | Organization suspended |
| OrganizationDeactivated | Organization deactivated |
| OrganizationHierarchyUpdated | Parent-child relationship changed |
| TeamCreated | New team created |
| TeamUpdated | Team details changed |
| TeamMemberAdded | Member added to team |
| TeamMemberRemoved | Member removed from team |
| TeamRoleAssigned | Role assigned within team |
| TeamDeleted | Team soft deleted |
| OrganizationMemberInvited | Member invitation sent |
| OrganizationMemberOnboarded | Member completed onboarding |
| OrganizationMemberRoleAssigned | Organization role assigned |
| OrganizationMemberDeactivated | Member deactivated |
| OrganizationMemberTransferred | Member moved to different team |
| LicensesPurchased | Licenses purchased |
| LicenseAllocated | License assigned to member |
| LicenseRevoked | License removed from member |
| LicensePoolUpdated | License pool changed |
| LicenseExpiring | License approaching expiration |
| LicenseExpired | License expired |
| BillingProfileUpdated | Billing details changed |
| InvoiceGenerated | Invoice created |
| PaymentProcessed | Payment completed |
| PaymentFailed | Payment failed |
| SSOConfigured | SSO settings configured |
| SSOAuthenticationSucceeded | SSO login successful |
| SSOAuthenticationFailed | SSO login failed |
| UserProvisionedViaSSO | User auto-created via SSO |
| SSOSessionTerminated | SSO session ended |
| MemberActivityReportGenerated | Activity report created |
| TeamPerformanceReportGenerated | Team report created |
| ComplianceReportGenerated | Compliance report created |
| CustomReportCreated | Custom report created |

---

## 4. API Endpoints

### 4.1 Organization Management

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/organizations | Create organization |
| GET | /api/organizations/{id} | Get organization details |
| PUT | /api/organizations/{id} | Update organization |
| DELETE | /api/organizations/{id} | Deactivate organization |
| POST | /api/organizations/{id}/branding | Update branding |
| GET | /api/organizations/{id}/hierarchy | Get organization hierarchy |

### 4.2 Team Management

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/organizations/{orgId}/teams | Create team |
| GET | /api/organizations/{orgId}/teams | List teams |
| GET | /api/organizations/{orgId}/teams/{id} | Get team details |
| PUT | /api/organizations/{orgId}/teams/{id} | Update team |
| DELETE | /api/organizations/{orgId}/teams/{id} | Delete team |
| POST | /api/organizations/{orgId}/teams/{id}/members | Add team member |
| DELETE | /api/organizations/{orgId}/teams/{id}/members/{memberId} | Remove team member |

### 4.3 Member Management

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/organizations/{orgId}/members/invite | Invite members |
| GET | /api/organizations/{orgId}/members | List members |
| GET | /api/organizations/{orgId}/members/{id} | Get member details |
| PUT | /api/organizations/{orgId}/members/{id}/role | Assign role |
| DELETE | /api/organizations/{orgId}/members/{id} | Deactivate member |
| POST | /api/organizations/{orgId}/members/{id}/transfer | Transfer member |

### 4.4 License Management

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/organizations/{orgId}/licenses | Purchase licenses |
| GET | /api/organizations/{orgId}/licenses | List licenses |
| POST | /api/organizations/{orgId}/licenses/{id}/allocate | Allocate license |
| DELETE | /api/organizations/{orgId}/licenses/{id}/allocations/{allocationId} | Revoke license |
| GET | /api/organizations/{orgId}/licenses/pool | Get license pool status |

### 4.5 Billing

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/organizations/{orgId}/billing/profile | Get billing profile |
| PUT | /api/organizations/{orgId}/billing/profile | Update billing profile |
| GET | /api/organizations/{orgId}/billing/invoices | List invoices |
| GET | /api/organizations/{orgId}/billing/invoices/{id} | Get invoice |
| POST | /api/organizations/{orgId}/billing/payments | Process payment |
| GET | /api/organizations/{orgId}/billing/history | Get payment history |

### 4.6 SSO

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/organizations/{orgId}/sso/configure | Configure SSO |
| GET | /api/organizations/{orgId}/sso/configuration | Get SSO configuration |
| POST | /api/organizations/{orgId}/sso/test | Test SSO connection |
| DELETE | /api/organizations/{orgId}/sso | Disable SSO |
| POST | /api/sso/login | SSO login endpoint |
| POST | /api/sso/logout | SSO logout endpoint |

### 4.7 Reporting

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/organizations/{orgId}/reports/analytics | Get learning analytics |
| GET | /api/organizations/{orgId}/reports/members | Get member activity report |
| GET | /api/organizations/{orgId}/reports/teams | Get team performance report |
| GET | /api/organizations/{orgId}/reports/compliance | Get compliance report |
| POST | /api/organizations/{orgId}/reports/custom | Create custom report |
| GET | /api/organizations/{orgId}/reports/{id}/export | Export report |

---

## 5. Security Considerations

- Organization data MUST be isolated using row-level security
- SSO assertions MUST be validated and signed
- License allocations MUST be atomic to prevent double-allocation
- All administrative actions MUST be audit logged
- Billing data MUST be encrypted at rest and in transit
- PCI compliance MUST be maintained for payment processing
- RBAC MUST enforce organization and team boundaries
- API rate limiting MUST prevent abuse

---

## 6. Dependencies

- Serilog for structured logging
- MediatR for CQRS pattern
- Entity Framework Core for data access
- FluentValidation for request validation
- Sustainsys.Saml2 for SAML SSO integration
- Stripe or similar for payment processing

---

## 7. Implementation Notes

Per the implementation specification:
- REQ-SYS-005, REQ-SYS-006: All data access SHALL use ICoursesPlatformContext directly without repository pattern
- REQ-CORE-007: Business logic and domain services SHALL be implemented in CoursesPlatform.Core\Services
- REQ-SYS-013 through REQ-SYS-022: Structured logging with Serilog SHALL be implemented across all operations
- REQ-API-002: Commands and Queries SHALL be organized in CoursesPlatform.Api\Features using MediatR

---

*Document Version: 1.0*
*Phase Coverage: Phase 5 (Enterprise)*
