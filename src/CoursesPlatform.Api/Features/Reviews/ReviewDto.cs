namespace CoursesPlatform.Api;

public record ReviewDto(
    Guid ReviewId,
    Guid UserId,
    Guid CourseId,
    int Rating,
    string? Content,
    string Status,
    DateTime CreatedAt,
    int HelpfulCount,
    string? InstructorResponse,
    DateTime? InstructorResponseAt);
