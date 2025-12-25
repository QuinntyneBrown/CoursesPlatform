namespace CoursesPlatform.Api;

public record CourseDto(
    Guid CourseId,
    Guid InstructorId,
    string Title,
    string? Subtitle,
    string Description,
    string? ThumbnailUrl,
    string? PromoVideoUrl,
    string Language,
    string Level,
    string Status,
    Guid? CategoryId,
    decimal Price,
    string Currency,
    bool IsFree,
    bool CertificateEnabled,
    IReadOnlyCollection<string> LearningObjectives,
    IReadOnlyCollection<string> Prerequisites,
    IReadOnlyCollection<string> TargetAudience,
    IReadOnlyCollection<string> Tags,
    DateTime CreatedAt,
    DateTime? PublishedAt);

public record CourseSummaryDto(
    Guid CourseId,
    string Title,
    string? Subtitle,
    string? ThumbnailUrl,
    string Level,
    string Status,
    decimal Price,
    string Currency,
    bool IsFree);
