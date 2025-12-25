# Instructor Revenue - Backend Specification

**Feature:** Instructor Revenue
**Version:** 1.0
**Last Updated:** December 2024

---

## 1. Overview

The Instructor Revenue feature provides earnings tracking, revenue calculation, payout management, and tax reporting for instructors on the CoursesPlatform system.

---

## 2. Requirements

### 2.1 Earnings Management

#### REQ-REV-001: Calculate Earnings [Phase 3]
The system SHALL calculate instructor earnings from course sales and enrollments.

**Acceptance Criteria:**
- AC1: Earnings are calculated when enrollment is created
- AC2: Revenue share percentage is applied based on instructor agreement
- AC3: Platform fee is deducted from gross revenue
- AC4: EarningsCalculated event is published
- AC5: Earnings are associated with the correct instructor and course
- AC6: Calculation includes tax jurisdiction determination

#### REQ-REV-002: Track Earnings [Phase 3]
The system SHALL track all earnings transactions with detailed metadata.

**Acceptance Criteria:**
- AC1: Each earning record includes enrollment reference
- AC2: Timestamp of earning creation is recorded
- AC3: Currency and amount are stored
- AC4: Revenue share percentage is recorded
- AC5: Platform fee amount is tracked
- AC6: Net instructor earnings are calculated

#### REQ-REV-003: Adjust Earnings [Phase 3]
The system SHALL support adjusting earnings for refunds and corrections.

**Acceptance Criteria:**
- AC1: Earnings can be adjusted when refund is issued
- AC2: Manual adjustments can be made with reason
- AC3: EarningsAdjusted event is published
- AC4: Adjustment history is maintained
- AC5: Adjustment references original earning
- AC6: Net earnings are recalculated after adjustment

#### REQ-REV-004: Earnings Summary [Phase 3]
The system SHALL provide earnings summary by time period.

**Acceptance Criteria:**
- AC1: Summary can be retrieved by month, quarter, or year
- AC2: Summary includes gross revenue, platform fees, net earnings
- AC3: Summary groups by course
- AC4: Summary includes pending and paid amounts
- AC5: Summary supports multiple currencies with conversion

### 2.2 Revenue Breakdown

#### REQ-REV-005: Revenue Share Configuration [Phase 3]
The system SHALL support configurable revenue share percentages.

**Acceptance Criteria:**
- AC1: Default revenue share is 70% instructor, 30% platform
- AC2: Custom revenue share can be configured per instructor
- AC3: Revenue share changes are versioned
- AC4: Historical earnings use the share percentage from transaction time
- AC5: RevenueShareUpdated event is published

#### REQ-REV-006: Platform Fee Calculation [Phase 3]
The system SHALL calculate platform fees based on revenue share.

**Acceptance Criteria:**
- AC1: Platform fee is calculated as percentage of gross revenue
- AC2: Fee calculation includes payment processing costs
- AC3: Minimum fee amount is enforced
- AC4: Fee is recorded separately from instructor earnings
- AC5: PlatformFeeCalculated event is published

#### REQ-REV-007: Revenue Breakdown Report [Phase 3]
The system SHALL provide detailed revenue breakdown.

**Acceptance Criteria:**
- AC1: Breakdown shows gross revenue by source
- AC2: Breakdown shows all deductions (platform fee, processing fee)
- AC3: Breakdown shows net instructor earnings
- AC4: Breakdown supports filtering by date range
- AC5: Breakdown can be exported to CSV

### 2.3 Payout Management

#### REQ-REV-008: Add Payout Method [Phase 3]
The system SHALL allow instructors to add payout methods.

**Acceptance Criteria:**
- AC1: Instructors can add bank account details
- AC2: Instructors can add PayPal account
- AC3: Instructors can add Stripe Connect account
- AC4: PayoutMethodAdded event is published
- AC5: Payout methods are validated before saving
- AC6: Only one payout method can be primary

#### REQ-REV-009: Update Payout Method [Phase 3]
The system SHALL allow instructors to update payout methods.

**Acceptance Criteria:**
- AC1: Instructors can update existing payout method details
- AC2: PayoutMethodUpdated event is published
- AC3: Changes require verification for security
- AC4: Primary payout method can be changed
- AC5: Inactive methods cannot be set as primary

#### REQ-REV-010: Remove Payout Method [Phase 3]
The system SHALL allow instructors to remove payout methods.

**Acceptance Criteria:**
- AC1: Payout methods can be soft-deleted
- AC2: PayoutMethodRemoved event is published
- AC3: Primary method cannot be removed if it's the only method
- AC4: Methods with pending payouts cannot be removed
- AC5: Removal requires confirmation

#### REQ-REV-011: Schedule Payout [Phase 3]
The system SHALL support configurable payout schedules.

**Acceptance Criteria:**
- AC1: Default payout schedule is monthly
- AC2: Instructors can choose weekly or monthly schedule
- AC3: Minimum payout threshold is $100 USD
- AC4: PayoutScheduleUpdated event is published
- AC5: Schedule changes take effect next period

### 2.4 Payout Processing

#### REQ-REV-012: Create Payout [Phase 3]
The system SHALL automatically create payouts based on schedule.

**Acceptance Criteria:**
- AC1: Payouts are created for earnings exceeding threshold
- AC2: PayoutCreated event is published
- AC3: Payout includes all unpaid earnings for the period
- AC4: Payout status is set to Pending
- AC5: Payout amount is in instructor's preferred currency

#### REQ-REV-013: Process Payout [Phase 3]
The system SHALL process payouts through payment providers.

**Acceptance Criteria:**
- AC1: Payout is sent to instructor's primary payout method
- AC2: PayoutProcessing event is published when initiated
- AC3: PayoutCompleted event is published on success
- AC4: PayoutFailed event is published on failure
- AC5: Failed payouts can be retried
- AC6: Processing includes reconciliation with payment provider

#### REQ-REV-014: Payout Notifications [Phase 3]
The system SHALL notify instructors of payout status changes.

**Acceptance Criteria:**
- AC1: Email sent when payout is created
- AC2: Email sent when payout is completed
- AC3: Email sent when payout fails
- AC4: Notification includes payout amount and period
- AC5: Notification includes expected arrival date

#### REQ-REV-015: Payout History [Phase 3]
The system SHALL maintain complete payout history.

**Acceptance Criteria:**
- AC1: All payouts are stored with status history
- AC2: Payout details include earnings breakdown
- AC3: History includes transaction IDs from payment provider
- AC4: History can be filtered by date range and status
- AC5: History supports pagination

### 2.5 Tax Management

#### REQ-REV-016: Tax Form Collection [Phase 3]
The system SHALL collect tax forms from instructors.

**Acceptance Criteria:**
- AC1: US instructors must provide W-9 form
- AC2: Non-US instructors must provide W-8BEN form
- AC3: TaxFormSubmitted event is published
- AC4: Forms are validated for completeness
- AC5: Forms are stored securely with encryption
- AC6: Instructors are reminded to update forms annually

#### REQ-REV-017: Tax Information Validation [Phase 3]
The system SHALL validate tax information provided by instructors.

**Acceptance Criteria:**
- AC1: Tax ID numbers are validated for format
- AC2: Name matches account information
- AC3: Address is complete and valid
- AC4: TaxInformationValidated event is published
- AC5: Validation errors are reported with clear messages

#### REQ-REV-018: Tax Reporting [Phase 3]
The system SHALL generate tax reports for instructors.

**Acceptance Criteria:**
- AC1: 1099 forms are generated for US instructors earning $600+
- AC2: Reports include all earnings for the tax year
- AC3: Reports are available by January 31st
- AC4: TaxReportGenerated event is published
- AC5: Reports can be downloaded as PDF
- AC6: Reports are stored for 7 years

#### REQ-REV-019: Tax Withholding [Phase 3]
The system SHALL apply tax withholding where required.

**Acceptance Criteria:**
- AC1: US backup withholding (24%) applied if no W-9
- AC2: Foreign tax withholding (30%) applied if no W-8BEN
- AC3: TaxWithheld event is published
- AC4: Withheld amount is deducted from payout
- AC5: Withholding is reported on tax forms

#### REQ-REV-020: VAT/GST Handling [Phase 3]
The system SHALL handle VAT/GST for international instructors.

**Acceptance Criteria:**
- AC1: VAT registration status is collected
- AC2: VAT rates are applied based on instructor location
- AC3: VatApplied event is published
- AC4: VAT amount is calculated and recorded separately
- AC5: VAT reports are generated for compliance

---

## 3. Domain Model

### 3.1 Entities

| Entity | Description |
|--------|-------------|
| Earning | Individual earning record from course enrollment |
| RevenueShare | Revenue split configuration between instructor and platform |
| PayoutMethod | Instructor's payment method (bank, PayPal, Stripe) |
| Payout | Scheduled payment to instructor |
| PayoutLineItem | Individual earnings included in a payout |
| TaxForm | Tax documentation (W-9, W-8BEN) |
| TaxWithholding | Tax amounts withheld from payouts |

### 3.2 Domain Events

| Event | Trigger |
|-------|---------|
| EarningsCalculated | Earning created from enrollment |
| EarningsAdjusted | Earning amount modified |
| RevenueShareUpdated | Revenue split percentage changed |
| PlatformFeeCalculated | Platform fee computed |
| PayoutMethodAdded | New payment method added |
| PayoutMethodUpdated | Payment method details changed |
| PayoutMethodRemoved | Payment method deleted |
| PayoutMethodVerified | Payment method verified |
| PayoutScheduleUpdated | Payout frequency changed |
| PayoutCreated | Payout scheduled |
| PayoutProcessing | Payout sent to provider |
| PayoutCompleted | Payout successfully transferred |
| PayoutFailed | Payout transfer failed |
| PayoutRetried | Failed payout retried |
| PayoutCancelled | Payout cancelled |
| TaxFormSubmitted | Tax form uploaded |
| TaxFormExpired | Tax form needs renewal |
| TaxInformationValidated | Tax data verified |
| TaxReportGenerated | Tax report created |
| TaxWithheld | Tax withheld from payout |
| VatApplied | VAT calculated on transaction |

---

## 4. API Endpoints

### 4.1 Earnings

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/instructors/me/earnings | Get earnings list |
| GET | /api/instructors/me/earnings/{id} | Get earning details |
| GET | /api/instructors/me/earnings/summary | Get earnings summary |
| POST | /api/instructors/me/earnings/{id}/adjust | Adjust earning amount |

### 4.2 Revenue Breakdown

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/instructors/me/revenue-breakdown | Get revenue breakdown |
| GET | /api/instructors/me/revenue-share | Get revenue share config |
| GET | /api/instructors/me/revenue/export | Export revenue data |

### 4.3 Payout Methods

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/instructors/me/payout-methods | List payout methods |
| POST | /api/instructors/me/payout-methods | Add payout method |
| PUT | /api/instructors/me/payout-methods/{id} | Update payout method |
| DELETE | /api/instructors/me/payout-methods/{id} | Remove payout method |
| POST | /api/instructors/me/payout-methods/{id}/set-primary | Set as primary |

### 4.4 Payouts

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/instructors/me/payouts | List payouts |
| GET | /api/instructors/me/payouts/{id} | Get payout details |
| GET | /api/instructors/me/payout-schedule | Get payout schedule |
| PUT | /api/instructors/me/payout-schedule | Update payout schedule |
| POST | /api/instructors/me/payouts/{id}/retry | Retry failed payout |

### 4.5 Tax Management

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/instructors/me/tax-forms | List tax forms |
| POST | /api/instructors/me/tax-forms | Upload tax form |
| GET | /api/instructors/me/tax-forms/{id} | Get tax form |
| GET | /api/instructors/me/tax-reports | List tax reports |
| GET | /api/instructors/me/tax-reports/{year} | Download tax report |

---

## 5. Security Considerations

- All payout methods MUST be encrypted at rest
- Tax forms MUST be stored with AES-256 encryption
- Access to earnings data MUST be restricted to instructor or admin
- Payout processing MUST use secure payment provider APIs
- Tax ID numbers MUST be masked in UI (show last 4 digits only)
- All financial operations MUST be logged for audit
- Rate limiting MUST be applied to payout method changes

---

## 6. Dependencies

- Serilog for structured logging
- MediatR for CQRS pattern
- Entity Framework Core for data access
- FluentValidation for request validation
- Stripe SDK for payment processing
- PayPal SDK for PayPal payouts
- iTextSharp or similar for PDF generation

---

## 7. Implementation Notes

Per the implementation specification (REQ-SYS-005, REQ-SYS-006), all data access SHALL use ICoursesPlatformContext directly without repository pattern.

### 7.1 Currency Handling

All monetary amounts SHALL be stored using decimal type with 2 decimal places. Currency codes SHALL follow ISO 4217 standard.

### 7.2 Payment Provider Integration

The system SHALL integrate with Stripe Connect for payout processing. PayPal integration is optional for Phase 3.

### 7.3 Tax Compliance

Tax calculations and withholding SHALL comply with IRS regulations for US instructors and applicable international tax treaties.

---

*Document Version: 1.0*
*Phase Coverage: 3*
