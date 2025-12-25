namespace CoursesPlatform.Api;

public record InstructorDto(
    Guid InstructorId,
    Guid UserId,
    string Biography,
    string? Credentials,
    string Status,
    bool IsVerified,
    bool IsPremium,
    IReadOnlyCollection<string> Expertise,
    DateTime ApplicationDate,
    DateTime? ApprovalDate);
