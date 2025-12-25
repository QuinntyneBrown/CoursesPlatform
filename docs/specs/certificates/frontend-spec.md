# Certificates - Frontend Specification

**Feature:** Certificates
**Version:** 1.0
**Last Updated:** December 2024

---

## 1. Overview

The Certificates frontend provides user interfaces for viewing, downloading, sharing, and verifying certificates, as well as administrative interfaces for template management.

---

## 2. Requirements

### 2.1 Certificate Viewing

#### REQ-CRT-FE-001: My Certificates Page [Phase 2]
The application SHALL provide a page to view earned certificates.

**Acceptance Criteria:**
- AC1: Page displays list of all earned certificates
- AC2: Each certificate shows course name, completion date, thumbnail
- AC3: Certificates are sorted by completion date (newest first)
- AC4: Empty state shows encouraging message
- AC5: Loading state is displayed while fetching

#### REQ-CRT-FE-002: Certificate Detail View [Phase 2]
The application SHALL provide a detailed certificate view.

**Acceptance Criteria:**
- AC1: Page displays full certificate preview
- AC2: Shows student name, course title, completion date, certificate ID
- AC3: Displays download, email, and share buttons
- AC4: Shows verification URL
- AC5: QR code preview is visible

### 2.2 Certificate Download

#### REQ-CRT-FE-003: Download Certificate [Phase 2]
The application SHALL allow downloading certificates as PDF.

**Acceptance Criteria:**
- AC1: Download button triggers PDF download
- AC2: Loading indicator shows during generation
- AC3: Success notification confirms download
- AC4: Error handling for failed downloads
- AC5: Downloaded file has meaningful name (e.g., "Certificate-CourseName.pdf")

#### REQ-CRT-FE-004: Email Certificate [Phase 2]
The application SHALL allow emailing certificates.

**Acceptance Criteria:**
- AC1: Email button opens email dialog
- AC2: User can enter recipient email address
- AC3: Optional message field is provided
- AC4: Success notification confirms email sent
- AC5: Error handling for invalid email or delivery failure

### 2.3 Certificate Sharing

#### REQ-CRT-FE-005: Share Certificate Link [Phase 2]
The application SHALL provide shareable certificate links.

**Acceptance Criteria:**
- AC1: Share button displays shareable URL
- AC2: Copy to clipboard functionality
- AC3: Success notification on copy
- AC4: Link preview shows certificate details

#### REQ-CRT-FE-006: Social Media Sharing [Phase 4]
The application SHALL support social media sharing.

**Acceptance Criteria:**
- AC1: Social sharing buttons for LinkedIn, Twitter, Facebook
- AC2: Pre-populated message with course name and achievement
- AC3: Certificate image included in share
- AC4: Verification link included in post

### 2.4 Certificate Verification

#### REQ-CRT-FE-007: Public Verification Page [Phase 3]
The application SHALL provide a public certificate verification page.

**Acceptance Criteria:**
- AC1: Page accessible without authentication
- AC2: Input field for certificate ID
- AC3: Verify button triggers verification
- AC4: Results display student name, course, date, status
- AC5: Invalid certificates show appropriate message
- AC6: Revoked certificates show revocation status

#### REQ-CRT-FE-008: QR Code Verification [Phase 3]
The application SHALL support QR code verification.

**Acceptance Criteria:**
- AC1: QR code URL opens verification page
- AC2: Certificate details display automatically
- AC3: Mobile-friendly layout
- AC4: Print-friendly view available

### 2.5 Template Management (Admin)

#### REQ-CRT-FE-009: Template List Page [Phase 3]
The application SHALL provide a certificate template management page.

**Acceptance Criteria:**
- AC1: Page displays list of all templates
- AC2: Shows template name, status, usage count
- AC3: Create new template button
- AC4: Edit and deactivate actions available
- AC5: Default template is highlighted

#### REQ-CRT-FE-010: Template Editor [Phase 3]
The application SHALL provide a template editor interface.

**Acceptance Criteria:**
- AC1: Form fields for template name and description
- AC2: Design editor with placeholder insertion
- AC3: Background image upload
- AC4: Logo and signature upload
- AC5: Live preview of template
- AC6: Save and cancel buttons

#### REQ-CRT-FE-011: Template Preview [Phase 3]
The application SHALL show template preview with sample data.

**Acceptance Criteria:**
- AC1: Preview displays template with placeholder values
- AC2: Sample includes typical student and course names
- AC3: Preview updates in real-time during editing
- AC4: Full-screen preview mode available

#### REQ-CRT-FE-012: Set Default Template [Phase 3]
The application SHALL allow setting default templates per course.

**Acceptance Criteria:**
- AC1: Course settings show template selector
- AC2: Available templates listed in dropdown
- AC3: Current default is pre-selected
- AC4: Success notification on save

### 2.6 Certificate Issuance (Admin/Instructor)

#### REQ-CRT-FE-013: Manual Issuance Page [Phase 3]
The application SHALL provide manual certificate issuance interface.

**Acceptance Criteria:**
- AC1: Form to select student and course
- AC2: Optional custom completion date
- AC3: Reason for manual issuance field
- AC4: Preview before issuance
- AC5: Confirmation dialog

#### REQ-CRT-FE-014: Bulk Issuance [Phase 4]
The application SHALL support bulk certificate issuance.

**Acceptance Criteria:**
- AC1: CSV upload for student list
- AC2: Validation of uploaded data
- AC3: Progress indicator for batch processing
- AC4: Summary report of issued certificates

### 2.7 Certificate Revocation (Admin)

#### REQ-CRT-FE-015: Revoke Certificate [Phase 3]
The application SHALL provide certificate revocation interface.

**Acceptance Criteria:**
- AC1: Revoke button on certificate details
- AC2: Reason for revocation field (required)
- AC3: Confirmation dialog with warning
- AC4: Success notification
- AC5: Revoked status displayed immediately

#### REQ-CRT-FE-016: Revocation History [Phase 4]
The application SHALL display certificate revocation history.

**Acceptance Criteria:**
- AC1: Timeline of revocation and reinstatement events
- AC2: Shows date, admin, and reason
- AC3: Current status is highlighted

### 2.8 Certificate Analytics (Admin)

#### REQ-CRT-FE-017: Issuance Dashboard [Phase 4]
The application SHALL provide certificate issuance dashboard.

**Acceptance Criteria:**
- AC1: Chart showing certificates issued over time
- AC2: Breakdown by course
- AC3: Filter by date range
- AC4: Export to CSV

#### REQ-CRT-FE-018: Verification Analytics [Phase 4]
The application SHALL display verification analytics.

**Acceptance Criteria:**
- AC1: Chart showing verification attempts over time
- AC2: Success vs. failure rates
- AC3: Most verified certificates list
- AC4: Geographic distribution (if available)

---

## 3. Component Architecture

### 3.1 Pages

| Component | Route | Description |
|-----------|-------|-------------|
| MyCertificatesPage | /certificates | List of earned certificates |
| CertificateDetailPage | /certificates/{id} | Certificate detail view |
| VerifyCertificatePage | /verify-certificate | Public verification |
| ManageTemplatesPage | /admin/certificates/templates | Template management |
| TemplateEditorPage | /admin/certificates/templates/{id}/edit | Template editor |
| IssueCertificatePage | /admin/certificates/issue | Manual issuance |
| CertificateAnalyticsPage | /admin/certificates/analytics | Analytics dashboard |

### 3.2 Components

| Component | Description |
|-----------|-------------|
| CertificateCard | Certificate thumbnail with actions |
| CertificatePreview | Full certificate preview |
| CertificateShareDialog | Share options dialog |
| CertificateEmailDialog | Email certificate dialog |
| TemplateEditor | Template design editor |
| TemplatePreview | Template preview with sample data |
| VerificationResult | Verification result display |
| IssuanceForm | Manual issuance form |
| RevocationDialog | Certificate revocation dialog |

### 3.3 Services

| Service | Description |
|---------|-------------|
| CertificateService | Certificate API calls |
| TemplateService | Template management API calls |
| VerificationService | Verification API calls |
| PdfService | PDF generation and download |

---

## 4. State Management

Per REQ-FE-009, state management SHALL use RxJS (not NgRx or Signals).

### 4.1 Certificate State

```typescript
interface CertificateState {
  certificates: Certificate[];
  currentCertificate: Certificate | null;
  isLoading: boolean;
  error: string | null;
}
```

### 4.2 Template State

```typescript
interface TemplateState {
  templates: CertificateTemplate[];
  currentTemplate: CertificateTemplate | null;
  isLoading: boolean;
}
```

---

## 5. UI/UX Requirements

### 5.1 Design System

Per REQ-FE-006 and REQ-FE-010, the application SHALL use Angular Material with Material 3 guidelines and default theme colors.

### 5.2 Responsive Design

Per REQ-FE-018, all pages SHALL be responsive and follow mobile-first design:
- Mobile: Single column, stacked certificates
- Tablet: Two column grid
- Desktop: Three column grid with sidebar

### 5.3 Accessibility

- Certificate images MUST have alt text
- Verification form MUST have proper labels
- Keyboard navigation for all actions
- Screen reader support for verification results

### 5.4 Component Naming

Per REQ-FE-012 and REQ-FE-013:
- Class names SHALL NOT have "Component" suffix
- File names SHALL NOT have "component" prefix

---

## 6. Certificate Display

### 6.1 Certificate Card
- Course name as heading
- Completion date
- Certificate thumbnail (if available)
- Action buttons (Download, Share, View)
- Status indicator (Active, Revoked)

### 6.2 Certificate Preview
- Full certificate image
- Student name prominently displayed
- Course title and completion date
- Unique certificate ID
- QR code for verification
- Verification URL

---

## 7. Validation

### 7.1 Email Validation
- Required for email certificate feature
- Valid email format
- Maximum 256 characters

### 7.2 Certificate ID Validation
- Required for verification
- Format: UUID or specific pattern
- Case-insensitive matching

### 7.3 Template Validation
- Template name required (1-100 chars)
- Background image max 5MB
- Logo/signature max 2MB each
- At least one placeholder must be present

---

## 8. Error Handling

### 8.1 API Errors

| Error Code | User Message |
|------------|--------------|
| 404 | Certificate not found. |
| 403 | You don't have permission to access this certificate. |
| 409 | Certificate already exists for this course. |
| 500 | Failed to generate certificate. Please try again. |

### 8.2 Download Errors
- Network error: "Download failed. Please check your connection."
- Timeout: "Download is taking longer than expected. Please try again."
- Invalid format: "Unable to generate PDF. Please contact support."

---

## 9. Testing Requirements

### 9.1 Unit Tests (Jest)

Per REQ-FE-021, unit tests SHALL use Jest:
- Test certificate list rendering
- Test download functionality
- Test sharing functionality
- Test verification logic
- Minimum 80% code coverage

### 9.2 E2E Tests (Playwright)

Per REQ-FE-022, E2E tests SHALL use Playwright:
- Test complete certificate viewing flow
- Test download certificate
- Test email certificate
- Test public verification
- Test template creation (admin)

---

## 10. Implementation Notes

### 10.1 API Base URL

Per REQ-FE-026, the baseUrl configuration SHALL contain ONLY the base URI:
```typescript
// Correct
baseUrl = "http://localhost:7200"
this.http.get(`${baseUrl}/api/certificates`)

// Incorrect
baseUrl = "http://localhost:7200/api"
```

### 10.2 File Structure

Per REQ-FE-015 and REQ-FE-016:
- Pages in `pages/` folder
- Reusable components in `components/` folder
- Barrel exports in each folder

### 10.3 PDF Handling
- Use browser native download for PDFs
- Display loading indicator during generation
- Handle large files gracefully
- Provide fallback for unsupported browsers

---

*Document Version: 1.0*
*Phase Coverage: 2-4*
