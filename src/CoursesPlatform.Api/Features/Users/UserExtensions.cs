namespace CoursesPlatform.Api;

using CoursesPlatform.Core;

public static class UserExtensions
{
    public static UserDto ToDto(this User user)
    {
        return new UserDto(
            user.UserId,
            user.Email,
            user.FirstName,
            user.LastName,
            user.AvatarUrl,
            user.Biography,
            user.Headline,
            user.PreferredLanguage,
            user.Timezone,
            user.Status.ToString(),
            user.IsEmailVerified,
            user.CreatedAt);
    }
}
