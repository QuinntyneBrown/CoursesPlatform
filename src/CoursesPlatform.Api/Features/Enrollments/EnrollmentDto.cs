namespace CoursesPlatform.Api;

public record EnrollmentDto(
    Guid EnrollmentId,
    Guid UserId,
    Guid CourseId,
    string Status,
    DateTime EnrolledAt,
    DateTime? CompletedAt,
    int ProgressPercentage);
