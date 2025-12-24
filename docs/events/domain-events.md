# Domain Events Catalog - Digital Courses Platform

## Overview

This document catalogs all domain events for a comprehensive digital courses platform, organized by bounded context and feature area. Domain events represent significant state changes within the system that other components may need to react to.

**Total Events Cataloged: 750+**

---

## 1. Identity & Access Management

### User Account Lifecycle
- `UserRegistered`
- `UserEmailVerified`
- `UserEmailVerificationExpired`
- `UserProfileCompleted`
- `UserActivated`
- `UserDeactivated`
- `UserSuspended`
- `UserUnsuspended`
- `UserAccountDeleted`
- `UserAccountRestored`
- `UserAccountMerged`

### Authentication
- `UserLoggedIn`
- `UserLoggedOut`
- `UserSessionStarted`
- `UserSessionExpired`
- `UserSessionTerminated`
- `LoginAttemptFailed`
- `UserLockedOut`
- `UserUnlocked`
- `PasswordChanged`
- `PasswordResetRequested`
- `PasswordResetCompleted`
- `PasswordResetExpired`

### Multi-Factor Authentication
- `MfaEnabled`
- `MfaDisabled`
- `MfaMethodAdded`
- `MfaMethodRemoved`
- `MfaChallengeIssued`
- `MfaChallengeCompleted`
- `MfaChallengeFailed`
- `BackupCodesGenerated`
- `BackupCodeUsed`

### Social Authentication
- `SocialAccountLinked`
- `SocialAccountUnlinked`
- `SocialLoginCompleted`
- `SocialLoginFailed`

### Profile Management
- `ProfileUpdated`
- `AvatarUploaded`
- `AvatarRemoved`
- `BiographyUpdated`
- `HeadlineUpdated`
- `SocialLinksUpdated`
- `WebsiteUrlUpdated`
- `LanguagePreferenceChanged`
- `TimezoneChanged`
- `CurrencyPreferenceChanged`

### Privacy & Consent
- `PrivacySettingsUpdated`
- `MarketingConsentGranted`
- `MarketingConsentRevoked`
- `DataExportRequested`
- `DataExportCompleted`
- `AccountDeletionRequested`
- `AccountDeletionCancelled`
- `GdprConsentRecorded`
- `CookiePreferencesUpdated`

---

## 2. Instructor Management

### Instructor Onboarding
- `InstructorApplicationSubmitted`
- `InstructorApplicationUnderReview`
- `InstructorApplicationApproved`
- `InstructorApplicationRejected`
- `InstructorOnboardingStarted`
- `InstructorOnboardingStepCompleted`
- `InstructorOnboardingCompleted`
- `InstructorAgreementAccepted`

### Instructor Profile
- `InstructorProfileCreated`
- `InstructorProfileUpdated`
- `InstructorProfilePublished`
- `InstructorProfileUnpublished`
- `InstructorBioUpdated`
- `InstructorCredentialsUpdated`
- `InstructorExpertiseAdded`
- `InstructorExpertiseRemoved`
- `InstructorVerificationRequested`
- `InstructorVerificationCompleted`
- `InstructorBadgeEarned`

### Instructor Status
- `InstructorStatusChanged`
- `InstructorSuspended`
- `InstructorReinstated`
- `InstructorPrivilegesRevoked`
- `PremiumInstructorStatusGranted`
- `PremiumInstructorStatusRevoked`

### Co-Instructors
- `CoInstructorInvited`
- `CoInstructorInvitationAccepted`
- `CoInstructorInvitationDeclined`
- `CoInstructorInvitationExpired`
- `CoInstructorAdded`
- `CoInstructorRemoved`
- `CoInstructorPermissionsUpdated`
- `RevenueShareAgreementCreated`
- `RevenueShareAgreementUpdated`

---

## 3. Course Creation & Management

### Course Lifecycle
- `CourseDraftCreated`
- `CourseDraftUpdated`
- `CourseDraftDeleted`
- `CourseSubmittedForReview`
- `CourseReviewStarted`
- `CourseApproved`
- `CourseRejected`
- `CourseRevisionRequested`
- `CoursePublished`
- `CourseUnpublished`
- `CourseRepublished`
- `CourseArchived`
- `CourseUnarchived`
- `CoursePermanentlyDeleted`
- `CourseDuplicated`
- `CourseVersionCreated`

### Course Metadata
- `CourseTitleChanged`
- `CourseSubtitleChanged`
- `CourseDescriptionUpdated`
- `CourseThumbnailUploaded`
- `CourseThumbnailRemoved`
- `CoursePromoVideoUploaded`
- `CoursePromoVideoRemoved`
- `CoursePromoVideoProcessed`
- `CourseCategoryAssigned`
- `CourseSubcategoryAssigned`
- `CourseCategoryChanged`
- `CourseTopicAdded`
- `CourseTopicRemoved`
- `CourseTagAdded`
- `CourseTagRemoved`
- `CourseLanguageSet`
- `CourseLanguageChanged`
- `CourseLevelSet`
- `CourseLevelChanged`

### Learning Objectives
- `LearningObjectiveAdded`
- `LearningObjectiveUpdated`
- `LearningObjectiveRemoved`
- `LearningObjectiveReordered`
- `PrerequisiteAdded`
- `PrerequisiteUpdated`
- `PrerequisiteRemoved`
- `TargetAudienceAdded`
- `TargetAudienceUpdated`
- `TargetAudienceRemoved`

### Course Settings
- `CourseSettingsUpdated`
- `CourseFeedbackSettingsChanged`
- `CourseMessageSettingsChanged`
- `CourseCompletionSettingsUpdated`
- `CourseCertificateEnabled`
- `CourseCertificateDisabled`
- `CourseCertificateSettingsUpdated`

---

## 4. Curriculum Management

### Section Management
- `SectionCreated`
- `SectionUpdated`
- `SectionDeleted`
- `SectionReordered`
- `SectionPublished`
- `SectionUnpublished`
- `SectionTitleChanged`
- `SectionDescriptionUpdated`

### Lecture Management
- `LectureCreated`
- `LectureUpdated`
- `LectureDeleted`
- `LectureReordered`
- `LectureMoved`
- `LecturePublished`
- `LectureUnpublished`
- `LectureTitleChanged`
- `LectureDescriptionUpdated`
- `LecturePreviewEnabled`
- `LecturePreviewDisabled`

### Video Content
- `VideoUploadStarted`
- `VideoUploadCompleted`
- `VideoUploadFailed`
- `VideoUploadCancelled`
- `VideoProcessingStarted`
- `VideoProcessingCompleted`
- `VideoProcessingFailed`
- `VideoQualityVariantsGenerated`
- `VideoReplaced`
- `VideoDeleted`
- `VideoThumbnailGenerated`
- `VideoThumbnailCustomized`
- `VideoDurationCalculated`

### Captions & Subtitles
- `CaptionAutoGenerated`
- `CaptionUploaded`
- `CaptionUpdated`
- `CaptionDeleted`
- `CaptionLanguageAdded`
- `CaptionLanguageRemoved`
- `CaptionApproved`
- `CaptionRejected`
- `TranscriptGenerated`
- `TranscriptUpdated`

### Article Lectures
- `ArticleLectureCreated`
- `ArticleLectureUpdated`
- `ArticleContentSaved`
- `ArticleContentPublished`
- `ArticleMediaEmbedded`

### Downloadable Resources
- `ResourceUploaded`
- `ResourceUpdated`
- `ResourceDeleted`
- `ResourceRenamed`
- `ResourceDownloadTracked`
- `ExternalLinkAdded`
- `ExternalLinkUpdated`
- `ExternalLinkRemoved`
- `SourceCodeAttached`
- `SourceCodeUpdated`

---

## 5. Quiz & Assessment System

### Quiz Management
- `QuizCreated`
- `QuizUpdated`
- `QuizDeleted`
- `QuizPublished`
- `QuizUnpublished`
- `QuizTitleChanged`
- `QuizDescriptionUpdated`
- `QuizSettingsUpdated`
- `QuizTimeLimitSet`
- `QuizPassingScoreSet`
- `QuizShuffleEnabled`
- `QuizShuffleDisabled`
- `QuizRetakeSettingsChanged`

### Question Management
- `QuestionCreated`
- `QuestionUpdated`
- `QuestionDeleted`
- `QuestionReordered`
- `QuestionDuplicated`
- `QuestionImported`
- `QuestionExported`

### Question Types
- `MultipleChoiceQuestionAdded`
- `SingleChoiceQuestionAdded`
- `TrueFalseQuestionAdded`
- `FillInBlankQuestionAdded`
- `MatchingQuestionAdded`
- `ShortAnswerQuestionAdded`
- `EssayQuestionAdded`
- `CodingQuestionAdded`

### Question Content
- `QuestionTextUpdated`
- `QuestionImageAdded`
- `QuestionImageRemoved`
- `AnswerOptionAdded`
- `AnswerOptionUpdated`
- `AnswerOptionRemoved`
- `CorrectAnswerSet`
- `AnswerExplanationAdded`
- `AnswerExplanationUpdated`
- `QuestionPointsSet`
- `QuestionFeedbackAdded`

### Quiz Attempts
- `QuizAttemptStarted`
- `QuizAttemptResumed`
- `QuizAnswerSubmitted`
- `QuizAnswerChanged`
- `QuizAttemptPaused`
- `QuizAttemptSubmitted`
- `QuizAttemptTimedOut`
- `QuizAttemptAbandoned`
- `QuizAttemptGraded`
- `QuizPassed`
- `QuizFailed`
- `QuizRetakeInitiated`

### Coding Exercises
- `CodingExerciseCreated`
- `CodingExerciseUpdated`
- `CodingExerciseDeleted`
- `CodingLanguageSet`
- `StarterCodeProvided`
- `SolutionCodeProvided`
- `TestCaseAdded`
- `TestCaseUpdated`
- `TestCaseRemoved`
- `CodeSubmitted`
- `CodeEvaluated`
- `CodeTestsPassed`
- `CodeTestsFailed`
- `HintRequested`
- `SolutionViewed`

---

## 6. Assignment System

### Assignment Management
- `AssignmentCreated`
- `AssignmentUpdated`
- `AssignmentDeleted`
- `AssignmentPublished`
- `AssignmentUnpublished`
- `AssignmentDueDateSet`
- `AssignmentDueDateExtended`
- `AssignmentInstructionsUpdated`
- `AssignmentRubricCreated`
- `AssignmentRubricUpdated`

### Assignment Submissions
- `AssignmentSubmissionStarted`
- `AssignmentDraftSaved`
- `AssignmentSubmitted`
- `AssignmentResubmitted`
- `AssignmentSubmissionWithdrawn`
- `AssignmentFileUploaded`
- `AssignmentLinkSubmitted`
- `AssignmentTextSubmitted`
- `LateSubmissionReceived`

### Assignment Grading
- `AssignmentGradingStarted`
- `AssignmentGraded`
- `AssignmentGradeUpdated`
- `AssignmentFeedbackProvided`
- `AssignmentFeedbackUpdated`
- `AssignmentReviewRequested`
- `AssignmentAppealed`
- `AssignmentAppealResolved`
- `RubricScoreAssigned`

### Peer Review
- `PeerReviewAssigned`
- `PeerReviewSubmitted`
- `PeerReviewReceived`
- `PeerFeedbackProvided`
- `PeerReviewDisputed`

---

## 7. Enrollment & Access

### Enrollment Lifecycle
- `StudentEnrolled`
- `StudentUnenrolled`
- `EnrollmentPending`
- `EnrollmentActivated`
- `EnrollmentSuspended`
- `EnrollmentResumed`
- `EnrollmentExpired`
- `EnrollmentExtended`
- `EnrollmentTransferred`
- `EnrollmentRefunded`

### Enrollment Types
- `PaidEnrollmentCompleted`
- `FreeEnrollmentCompleted`
- `GiftEnrollmentCreated`
- `GiftEnrollmentRedeemed`
- `GiftEnrollmentExpired`
- `CouponEnrollmentCompleted`
- `PromotionalEnrollmentGranted`
- `TrialEnrollmentStarted`
- `TrialEnrollmentConverted`
- `TrialEnrollmentExpired`

### Access Control
- `CourseAccessGranted`
- `CourseAccessRevoked`
- `CourseAccessExpired`
- `LifetimeAccessGranted`
- `LimitedAccessSet`
- `PreviewAccessGranted`
- `PreviewAccessExpired`

---

## 8. Learning Progress

### Course Progress
- `CourseStarted`
- `CourseResumed`
- `CourseProgressUpdated`
- `CourseCompleted`
- `CourseProgressReset`
- `CourseCompletionPercentageUpdated`
- `LastAccessedUpdated`

### Lecture Progress
- `LectureStarted`
- `LectureResumed`
- `LectureProgressUpdated`
- `LectureCompleted`
- `LectureMarkedComplete`
- `LectureMarkedIncomplete`
- `LectureSkipped`

### Video Progress
- `VideoPlaybackStarted`
- `VideoPlaybackPaused`
- `VideoPlaybackResumed`
- `VideoPlaybackCompleted`
- `VideoPositionUpdated`
- `VideoWatchTimeRecorded`
- `VideoPlaybackSpeedChanged`
- `VideoQualityChanged`
- `VideoFullscreenToggled`

### Section Progress
- `SectionStarted`
- `SectionCompleted`
- `SectionProgressUpdated`

### Bookmarks & Notes
- `BookmarkCreated`
- `BookmarkUpdated`
- `BookmarkDeleted`
- `NoteCreated`
- `NoteUpdated`
- `NoteDeleted`
- `NoteTimestampLinked`
- `HighlightCreated`
- `HighlightRemoved`

---

## 9. Reviews & Ratings

### Review Lifecycle
- `ReviewDraftSaved`
- `ReviewSubmitted`
- `ReviewUpdated`
- `ReviewDeleted`
- `ReviewApproved`
- `ReviewRejected`
- `ReviewPendingModeration`
- `ReviewRestored`

### Review Content
- `RatingGiven`
- `RatingUpdated`
- `WrittenFeedbackProvided`
- `ReviewMediaAttached`
- `ReviewMediaRemoved`

### Review Interactions
- `ReviewHelpfulMarked`
- `ReviewHelpfulUnmarked`
- `ReviewReported`
- `ReviewReportResolved`
- `ReviewFlagged`
- `ReviewFlagCleared`

### Instructor Responses
- `InstructorResponsePosted`
- `InstructorResponseUpdated`
- `InstructorResponseDeleted`

### Course Rating
- `CourseRatingRecalculated`
- `CourseRatingMilestoneReached`
- `FeaturedReviewSelected`
- `FeaturedReviewRemoved`

---

## 10. Q&A & Discussions

### Questions
- `QuestionPosted`
- `QuestionUpdated`
- `QuestionDeleted`
- `QuestionTitleEdited`
- `QuestionBodyEdited`
- `QuestionTagsAdded`
- `QuestionTagsRemoved`
- `QuestionClosed`
- `QuestionReopened`
- `QuestionMarkedFeatured`
- `QuestionUnmarkedFeatured`
- `QuestionPinned`
- `QuestionUnpinned`

### Answers
- `AnswerPosted`
- `AnswerUpdated`
- `AnswerDeleted`
- `AnswerAccepted`
- `AnswerUnaccepted`
- `InstructorAnswerPosted`
- `TAAnswerPosted`

### Voting & Engagement
- `QuestionUpvoted`
- `QuestionDownvoted`
- `QuestionVoteRemoved`
- `AnswerUpvoted`
- `AnswerDownvoted`
- `AnswerVoteRemoved`
- `CommentPosted`
- `CommentUpdated`
- `CommentDeleted`

### Moderation
- `DiscussionPostFlagged`
- `DiscussionPostReported`
- `DiscussionPostHidden`
- `DiscussionPostRestored`
- `DiscussionPostLocked`
- `DiscussionPostUnlocked`
- `UserMutedInDiscussion`
- `UserUnmutedInDiscussion`
- `DiscussionWarningIssued`

### Following & Notifications
- `QuestionFollowed`
- `QuestionUnfollowed`
- `DiscussionSubscribed`
- `DiscussionUnsubscribed`
- `MentionNotificationTriggered`

---

## 11. Direct Messaging

### Conversations
- `ConversationStarted`
- `ConversationContinued`
- `ConversationArchived`
- `ConversationUnarchived`
- `ConversationDeleted`
- `ConversationMarkedRead`
- `ConversationMarkedUnread`
- `ConversationMuted`
- `ConversationUnmuted`

### Messages
- `DirectMessageSent`
- `DirectMessageDelivered`
- `DirectMessageRead`
- `DirectMessageEdited`
- `DirectMessageDeleted`
- `MessageAttachmentAdded`
- `BulkMessageSent`

### Message Moderation
- `MessageFlagged`
- `MessageReported`
- `MessageBlocked`
- `UserBlockedFromMessaging`
- `UserUnblockedFromMessaging`
- `SpamMessageDetected`

---

## 12. Announcements

### Announcement Lifecycle
- `AnnouncementDraftCreated`
- `AnnouncementDraftUpdated`
- `AnnouncementPublished`
- `AnnouncementScheduled`
- `AnnouncementRescheduled`
- `AnnouncementCancelled`
- `AnnouncementUpdated`
- `AnnouncementDeleted`
- `AnnouncementExpired`

### Announcement Delivery
- `AnnouncementEmailSent`
- `AnnouncementEmailDelivered`
- `AnnouncementEmailFailed`
- `AnnouncementPushSent`
- `AnnouncementViewed`
- `AnnouncementDismissed`
- `AnnouncementLinkClicked`

---

## 13. Certificates

### Certificate Templates
- `CertificateTemplateCreated`
- `CertificateTemplateUpdated`
- `CertificateTemplateDeleted`
- `CertificateTemplateActivated`
- `CertificateTemplateDeactivated`
- `CertificateBrandingUpdated`

### Certificate Issuance
- `CertificateEarned`
- `CertificateGenerated`
- `CertificateRegenerationRequested`
- `CertificateRegenerated`
- `CertificateRevoked`
- `CertificateRestored`

### Certificate Distribution
- `CertificateDownloaded`
- `CertificateEmailed`
- `CertificateSharedToLinkedIn`
- `CertificateSharedToTwitter`
- `CertificateSharedToFacebook`
- `CertificateLinkGenerated`
- `CertificateLinkAccessed`

### Certificate Verification
- `CertificateVerificationRequested`
- `CertificateVerified`
- `CertificateVerificationFailed`
- `InvalidCertificateDetected`

---

## 14. Shopping & Cart

### Cart Management
- `CartCreated`
- `CartItemAdded`
- `CartItemRemoved`
- `CartCleared`
- `CartExpired`
- `CartAbandoned`
- `CartRecovered`
- `AbandonedCartReminderSent`

### Coupon & Discounts
- `CouponApplied`
- `CouponRemoved`
- `CouponValidationFailed`
- `CouponExpired`
- `InvalidCouponAttempted`
- `BundleDiscountApplied`
- `ReferralDiscountApplied`

### Wishlist
- `WishlistItemAdded`
- `WishlistItemRemoved`
- `WishlistCleared`
- `WishlistItemMovedToCart`
- `WishlistPriceDropAlert`

---

## 15. Checkout & Payments

### Checkout Process
- `CheckoutStarted`
- `CheckoutStepCompleted`
- `CheckoutAbandoned`
- `BillingInfoProvided`
- `BillingInfoUpdated`
- `TaxCalculated`
- `OrderSummaryViewed`

### Payment Processing
- `PaymentInitiated`
- `PaymentProcessing`
- `PaymentSucceeded`
- `PaymentFailed`
- `PaymentDeclined`
- `PaymentCancelled`
- `PaymentRetried`
- `PaymentPending`
- `PaymentExpired`

### Payment Methods
- `PaymentMethodAdded`
- `PaymentMethodUpdated`
- `PaymentMethodRemoved`
- `PaymentMethodVerified`
- `PaymentMethodSetAsDefault`
- `PaymentMethodExpiring`
- `PaymentMethodExpired`

### Refunds
- `RefundRequested`
- `RefundApproved`
- `RefundDenied`
- `RefundProcessing`
- `RefundCompleted`
- `RefundFailed`
- `PartialRefundIssued`

### Disputes & Chargebacks
- `PaymentDisputeOpened`
- `PaymentDisputeEvidenceSubmitted`
- `PaymentDisputeWon`
- `PaymentDisputeLost`
- `ChargebackReceived`
- `ChargebackReversed`

---

## 16. Orders & Transactions

### Order Lifecycle
- `OrderCreated`
- `OrderConfirmed`
- `OrderProcessing`
- `OrderFulfilled`
- `OrderCancelled`
- `OrderFailed`
- `OrderRefunded`
- `OrderPartiallyRefunded`

### Invoicing
- `InvoiceGenerated`
- `InvoiceSent`
- `InvoiceDownloaded`
- `InvoiceVoided`
- `CreditNoteIssued`
- `TaxReceiptGenerated`

---

## 17. Pricing & Promotions

### Course Pricing
- `CoursePriceSet`
- `CoursePriceUpdated`
- `CourseMarkedFree`
- `CourseMarkedPaid`
- `RegionalPricingSet`
- `RegionalPricingUpdated`
- `PriceTierAssigned`

### Coupons
- `CouponCreated`
- `CouponUpdated`
- `CouponActivated`
- `CouponDeactivated`
- `CouponExpired`
- `CouponDeleted`
- `CouponRedeemed`
- `CouponUsageLimitReached`
- `CouponBulkGenerated`

### Promotions
- `PromotionCreated`
- `PromotionUpdated`
- `PromotionScheduled`
- `PromotionStarted`
- `PromotionEnded`
- `PromotionCancelled`
- `CourseAddedToPromotion`
- `CourseRemovedFromPromotion`

### Sales Events
- `FlashSaleStarted`
- `FlashSaleEnded`
- `SeasonalSaleStarted`
- `SeasonalSaleEnded`
- `SitewideDiscountActivated`
- `SitewideDiscountDeactivated`
- `PersonalizedOfferGenerated`

### Bundles
- `BundleCreated`
- `BundleUpdated`
- `BundlePublished`
- `BundleUnpublished`
- `BundleDeleted`
- `CourseAddedToBundle`
- `CourseRemovedFromBundle`
- `BundlePriceSet`
- `BundlePurchased`

---

## 18. Instructor Revenue

### Earnings
- `SaleRecorded`
- `RevenueShareCalculated`
- `InstructorEarningsUpdated`
- `EarningsAdjusted`
- `RefundDeducted`
- `BonusEarningsAdded`

### Revenue Breakdown
- `OrganicSaleRecorded`
- `PromotedSaleRecorded`
- `AffiliateSaleRecorded`
- `SubscriptionRevenueAllocated`
- `BundleSaleRevenueAllocated`

### Payout Management
- `PayoutMethodAdded`
- `PayoutMethodUpdated`
- `PayoutMethodRemoved`
- `PayoutMethodVerified`
- `PayoutPreferenceSet`
- `PayoutThresholdSet`

### Payout Processing
- `PayoutRequested`
- `PayoutScheduled`
- `PayoutProcessing`
- `PayoutCompleted`
- `PayoutFailed`
- `PayoutCancelled`
- `PayoutHeld`
- `PayoutReleased`

### Tax Management
- `TaxFormSubmitted`
- `TaxFormVerified`
- `TaxFormRejected`
- `TaxWithholdingCalculated`
- `TaxReportGenerated`
- `W9Submitted`
- `W8Submitted`
- `VATNumberVerified`

---

## 19. Subscription & Membership

### Subscription Lifecycle
- `SubscriptionCreated`
- `SubscriptionActivated`
- `SubscriptionPaused`
- `SubscriptionResumed`
- `SubscriptionCancelled`
- `SubscriptionExpired`
- `SubscriptionReactivated`

### Plan Management
- `SubscriptionPlanSelected`
- `SubscriptionUpgraded`
- `SubscriptionDowngraded`
- `SubscriptionPlanChanged`
- `SubscriptionAddOnAdded`
- `SubscriptionAddOnRemoved`

### Billing Cycle
- `SubscriptionBillingCycleStarted`
- `SubscriptionRenewalScheduled`
- `SubscriptionRenewed`
- `SubscriptionRenewalFailed`
- `SubscriptionGracePeriodStarted`
- `SubscriptionGracePeriodEnded`

### Trials
- `TrialStarted`
- `TrialExtended`
- `TrialConverted`
- `TrialExpired`
- `TrialCancelled`
- `TrialEndingReminder`

---

## 20. Enterprise & Organizations

### Organization Management
- `OrganizationCreated`
- `OrganizationUpdated`
- `OrganizationActivated`
- `OrganizationSuspended`
- `OrganizationDeactivated`
- `OrganizationDeleted`
- `OrganizationSettingsUpdated`
- `OrganizationBrandingUpdated`
- `OrganizationDomainVerified`

### Team Structure
- `DepartmentCreated`
- `DepartmentUpdated`
- `DepartmentDeleted`
- `TeamCreated`
- `TeamUpdated`
- `TeamDeleted`
- `TeamHierarchyUpdated`

### User Management
- `OrganizationUserInvited`
- `OrganizationUserJoined`
- `OrganizationUserRemoved`
- `OrganizationUserSuspended`
- `UserRoleAssigned`
- `UserRoleRevoked`
- `UserMovedToTeam`
- `BulkUserImportStarted`
- `BulkUserImportCompleted`
- `BulkUserImportFailed`

### License Management
- `LicensePoolCreated`
- `LicensesPurchased`
- `LicenseAssigned`
- `LicenseUnassigned`
- `LicenseTransferred`
- `LicenseExpired`
- `LicenseRenewed`
- `LicenseLimitReached`

### Learning Paths
- `LearningPathCreated`
- `LearningPathUpdated`
- `LearningPathPublished`
- `LearningPathUnpublished`
- `LearningPathArchived`
- `LearningPathDeleted`
- `CourseAddedToPath`
- `CourseRemovedFromPath`
- `PathMilestoneSet`

### Path Assignments
- `LearningPathAssigned`
- `LearningPathUnassigned`
- `PathAssignmentDueDateSet`
- `PathStarted`
- `PathMilestoneReached`
- `PathCompleted`
- `PathProgressUpdated`
- `PathOverdue`

### Content Curation
- `CollectionCreated`
- `CollectionUpdated`
- `CollectionDeleted`
- `CollectionPublished`
- `CourseAddedToCollection`
- `CourseRemovedFromCollection`
- `CustomContentUploaded`
- `CustomContentApproved`
- `CustomContentRejected`

### Enterprise Reporting
- `LearningReportGenerated`
- `TeamProgressReportGenerated`
- `ComplianceReportGenerated`
- `UsageReportGenerated`
- `ROIReportGenerated`
- `SkillsGapReportGenerated`
- `CustomReportCreated`
- `ReportScheduled`
- `ScheduledReportDelivered`

### SSO & Integration
- `SSOConfigured`
- `SSOEnabled`
- `SSODisabled`
- `SSOLoginSucceeded`
- `SSOLoginFailed`
- `SCIMProvisioningEnabled`
- `SCIMUserProvisioned`
- `SCIMUserDeprovisioned`
- `SCIMGroupSynced`

---

## 21. Analytics & Insights

### Course Analytics
- `CourseViewRecorded`
- `CoursePreviewViewed`
- `CoursePageBounced`
- `CourseLandingPageViewed`
- `EnrollmentConversionTracked`
- `CourseEngagementScoreCalculated`

### Student Analytics
- `StudentActivityRecorded`
- `LearningStreakUpdated`
- `LearningStreakBroken`
- `LearningTimeTracked`
- `StudentEngagementScored`
- `AtRiskStudentIdentified`
- `InactiveStudentIdentified`

### Instructor Analytics
- `InstructorDashboardViewed`
- `InstructorPerformanceCalculated`
- `StudentFeedbackAnalyzed`
- `RevenueAnalyticsUpdated`
- `AudienceInsightsGenerated`

### Platform Analytics
- `DailyMetricsAggregated`
- `WeeklyMetricsAggregated`
- `MonthlyMetricsAggregated`
- `ConversionFunnelAnalyzed`
- `RetentionMetricsCalculated`
- `ChurnRiskIdentified`

### Search Analytics
- `SearchPerformed`
- `SearchResultsReturned`
- `SearchResultClicked`
- `SearchResultsEmpty`
- `SearchFilterApplied`
- `SearchQueryLogged`
- `PopularSearchIdentified`

---

## 22. Search & Discovery

### Course Discovery
- `CategoryBrowsed`
- `SubcategoryBrowsed`
- `TopicExplored`
- `CoursePreviewPlayed`
- `CourseDetailsViewed`
- `CourseCurriculumExpanded`
- `CourseCompared`

### Recommendations
- `RecommendationsGenerated`
- `RecommendationViewed`
- `RecommendationClicked`
- `RecommendationDismissed`
- `PersonalizedSuggestionsUpdated`

### Trending & Popular
- `TrendingCoursesUpdated`
- `PopularCoursesUpdated`
- `NewReleasesUpdated`
- `TopRatedCoursesUpdated`
- `BestSellersUpdated`

---

## 23. Notifications & Communications

### Push Notifications
- `PushNotificationSent`
- `PushNotificationDelivered`
- `PushNotificationFailed`
- `PushNotificationOpened`
- `PushNotificationDismissed`
- `PushTokenRegistered`
- `PushTokenInvalidated`

### In-App Notifications
- `InAppNotificationCreated`
- `InAppNotificationDisplayed`
- `InAppNotificationRead`
- `InAppNotificationDismissed`
- `AllNotificationsMarkedRead`

### Email Communications
- `TransactionalEmailSent`
- `TransactionalEmailDelivered`
- `TransactionalEmailOpened`
- `TransactionalEmailClicked`
- `TransactionalEmailBounced`
- `MarketingEmailSent`
- `MarketingEmailOpened`
- `MarketingEmailUnsubscribed`

### Notification Preferences
- `NotificationPreferencesUpdated`
- `EmailPreferencesUpdated`
- `PushPreferencesUpdated`
- `ChannelOptedIn`
- `ChannelOptedOut`
- `DigestFrequencyChanged`

---

## 24. Mobile & Cross-Platform

### Device Management
- `DeviceRegistered`
- `DeviceUnregistered`
- `DeviceTrustEstablished`
- `DeviceLimitReached`
- `DeviceSessionStarted`
- `DeviceSessionEnded`

### Offline Learning
- `CourseDownloadStarted`
- `CourseDownloadCompleted`
- `CourseDownloadFailed`
- `CourseDownloadPaused`
- `CourseDownloadResumed`
- `CourseDownloadCancelled`
- `OfflineContentAccessed`
- `OfflineContentExpired`
- `OfflineContentDeleted`
- `OfflineStorageLimitReached`

### Sync Events
- `ProgressSyncStarted`
- `ProgressSyncCompleted`
- `ProgressSyncFailed`
- `ProgressConflictDetected`
- `ProgressConflictResolved`
- `BookmarksSynced`
- `NotesSynced`

### App Events
- `AppInstalled`
- `AppUninstalled`
- `AppOpened`
- `AppBackgrounded`
- `AppCrashed`
- `AppUpdated`
- `AppRated`
- `DeepLinkOpened`

---

## 25. Affiliate & Partner Program

### Affiliate Management
- `AffiliateApplicationSubmitted`
- `AffiliateApplicationApproved`
- `AffiliateApplicationRejected`
- `AffiliateActivated`
- `AffiliateDeactivated`
- `AffiliateSuspended`
- `AffiliateProfileUpdated`
- `AffiliateTierUpgraded`

### Affiliate Links
- `AffiliateLinkGenerated`
- `AffiliateLinkClicked`
- `AffiliateLinkExpired`
- `AffiliateReferralTracked`
- `AffiliateConversionTracked`
- `AffiliateCookieSet`
- `AffiliateCookieExpired`

### Affiliate Earnings
- `AffiliateCommissionEarned`
- `AffiliateCommissionPending`
- `AffiliateCommissionApproved`
- `AffiliateCommissionRejected`
- `AffiliatePayoutRequested`
- `AffiliatePayoutProcessed`
- `AffiliatePayoutFailed`

---

## 26. Referral Program

### Referral Tracking
- `ReferralProgramJoined`
- `ReferralLinkGenerated`
- `ReferralCodeCreated`
- `ReferralLinkShared`
- `ReferralLinkClicked`
- `ReferralSignupCompleted`
- `ReferralPurchaseCompleted`
- `ReferralQualified`
- `ReferralRejected`

### Referral Rewards
- `ReferrerRewardEarned`
- `RefereeRewardEarned`
- `ReferralRewardCredited`
- `ReferralRewardRedeemed`
- `ReferralRewardExpired`
- `ReferralBonusMilestoneReached`

---

## 27. Gamification & Achievements

### Badges & Achievements
- `BadgeEarned`
- `BadgeDisplayed`
- `BadgeHidden`
- `AchievementUnlocked`
- `AchievementProgressUpdated`
- `MilestoneReached`
- `StreakBadgeEarned`

### Points & XP
- `PointsEarned`
- `PointsDeducted`
- `PointsRedeemed`
- `XPGained`
- `LevelUp`
- `LeaderboardRankChanged`
- `LeaderboardUpdated`

### Learning Streaks
- `DailyStreakStarted`
- `DailyStreakExtended`
- `DailyStreakBroken`
- `WeeklyGoalSet`
- `WeeklyGoalAchieved`
- `WeeklyGoalMissed`

### Challenges
- `ChallengeCreated`
- `ChallengeJoined`
- `ChallengeProgressUpdated`
- `ChallengeCompleted`
- `ChallengeFailed`
- `ChallengeRewardClaimed`

---

## 28. Content Moderation & Trust & Safety

### Content Review
- `ContentFlaggedForReview`
- `ContentReviewAssigned`
- `ContentReviewStarted`
- `ContentReviewCompleted`
- `ContentApproved`
- `ContentRejected`
- `ContentEscalated`
- `ContentAppealed`
- `ContentAppealResolved`

### Automated Moderation
- `AutoModTriggered`
- `ContentAutoFlagged`
- `ContentAutoRemoved`
- `ContentAutoApproved`
- `SpamDetected`
- `ProfanityDetected`
- `ToxicContentDetected`

### User Reports
- `UserReportSubmitted`
- `UserReportAssigned`
- `UserReportInvestigated`
- `UserReportResolved`
- `UserReportDismissed`
- `UserReportEscalated`

### Enforcement Actions
- `WarningIssued`
- `ContentRemoved`
- `ContentRestored`
- `UserRestricted`
- `UserUnrestricted`
- `UserBanned`
- `UserUnbanned`
- `IPBanned`
- `AppealReceived`
- `AppealGranted`
- `AppealDenied`

### Copyright & DMCA
- `CopyrightClaimFiled`
- `DMCATakedownReceived`
- `ContentTakenDown`
- `CounterNotificationFiled`
- `ContentReinstated`
- `CopyrightStrikeIssued`
- `CopyrightStrikeRemoved`

### Quality Control
- `CourseQualityReviewInitiated`
- `CourseQualityScoreCalculated`
- `QualityThresholdBreached`
- `QualityImprovementRequired`
- `CourseQualityRestored`
- `CourseRemovedForQuality`

---

## 29. API & Webhooks

### API Keys
- `APIKeyCreated`
- `APIKeyUpdated`
- `APIKeyRevoked`
- `APIKeyExpired`
- `APIKeyUsed`
- `APIRateLimitExceeded`

### Webhooks
- `WebhookEndpointRegistered`
- `WebhookEndpointUpdated`
- `WebhookEndpointDeleted`
- `WebhookEnabled`
- `WebhookDisabled`
- `WebhookDelivered`
- `WebhookDeliveryFailed`
- `WebhookRetried`

### OAuth & Integrations
- `OAuthAppCreated`
- `OAuthAppUpdated`
- `OAuthAppDeleted`
- `OAuthTokenGranted`
- `OAuthTokenRefreshed`
- `OAuthTokenRevoked`
- `OAuthConsentGranted`
- `OAuthConsentRevoked`

---

## 30. System & Infrastructure

### System Health
- `SystemHealthCheckPassed`
- `SystemHealthCheckFailed`
- `ServiceStarted`
- `ServiceStopped`
- `ServiceDegraded`
- `ServiceRestored`

### Maintenance
- `MaintenanceScheduled`
- `MaintenanceStarted`
- `MaintenanceCompleted`
- `MaintenanceCancelled`
- `EmergencyMaintenanceStarted`

### Data Operations
- `DataExportRequested`
- `DataExportCompleted`
- `DataExportFailed`
- `DataImportStarted`
- `DataImportCompleted`
- `DataImportFailed`
- `DataMigrationStarted`
- `DataMigrationCompleted`
- `DataPurgeScheduled`
- `DataPurgeCompleted`

### Backups
- `BackupStarted`
- `BackupCompleted`
- `BackupFailed`
- `BackupRestoreInitiated`
- `BackupRestoreCompleted`

### Security Events
- `SecurityScanCompleted`
- `VulnerabilityDetected`
- `VulnerabilityPatched`
- `SuspiciousActivityDetected`
- `SecurityAlertTriggered`
- `SecurityIncidentReported`
- `SecurityIncidentResolved`

### Fraud Detection
- `FraudSignalDetected`
- `FraudRiskScoreCalculated`
- `FraudulentActivityConfirmed`
- `FraudAlertTriggered`
- `AccountFlaggedForFraud`
- `FraudCaseOpened`
- `FraudCaseResolved`

### Audit Logging
- `AuditLogEntryCreated`
- `AuditLogExported`
- `ComplianceReportGenerated`
- `DataAccessLogged`
- `PrivilegedActionLogged`

---

## Event Naming Conventions

All events follow these standards:

1. **Past Tense Verbs**: Events describe completed actions (`UserRegistered`, not `RegisterUser`)
2. **Subject-First**: Entity name precedes the action (`CoursePublished`, not `PublishedCourse`)
3. **Domain Language**: Uses ubiquitous language from the digital learning domain
4. **Specific & Actionable**: Events are granular enough to trigger specific workflows
5. **No Technical Implementation**: Events describe business occurrences, not database operations

## Event Metadata Standards

Each event should include:

| Field | Description |
|-------|-------------|
| `eventId` | Unique identifier (UUID) |
| `eventType` | Full event name |
| `aggregateId` | ID of the entity that changed |
| `aggregateType` | Type of the entity |
| `occurredAt` | ISO 8601 timestamp |
| `version` | Event schema version |
| `correlationId` | For tracing related events |
| `causationId` | ID of the event/command that caused this |
| `userId` | Actor who triggered the event (if applicable) |
| `metadata` | Additional context |

---

*Document Version: 2.0*
*Total Events Cataloged: 750+*
*Last Updated: December 2024*
