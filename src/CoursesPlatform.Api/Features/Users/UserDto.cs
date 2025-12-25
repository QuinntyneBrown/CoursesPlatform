namespace CoursesPlatform.Api;

public record UserDto(
    Guid UserId,
    string Email,
    string FirstName,
    string LastName,
    string? AvatarUrl,
    string? Biography,
    string? Headline,
    string PreferredLanguage,
    string Timezone,
    string Status,
    bool IsEmailVerified,
    DateTime CreatedAt);
