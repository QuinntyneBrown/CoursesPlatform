namespace CoursesPlatform.Core;

public class User
{
    public Guid UserId { get; private set; }

    public string Email { get; private set; } = string.Empty;

    public string FirstName { get; private set; } = string.Empty;

    public string LastName { get; private set; } = string.Empty;

    public string? AvatarUrl { get; private set; }

    public string? Biography { get; private set; }

    public string? Headline { get; private set; }

    public string? WebsiteUrl { get; private set; }

    public string PreferredLanguage { get; private set; } = "en";

    public string Timezone { get; private set; } = "UTC";

    public UserStatus Status { get; private set; }

    public bool IsEmailVerified { get; private set; }

    public DateTime CreatedAt { get; private set; }

    public DateTime? LastLoginAt { get; private set; }

    private User()
    {
    }

    public static User Create(string email, string firstName, string lastName)
    {
        return new User
        {
            UserId = Guid.NewGuid(),
            Email = email,
            FirstName = firstName,
            LastName = lastName,
            Status = UserStatus.Pending,
            IsEmailVerified = false,
            CreatedAt = DateTime.UtcNow,
        };
    }

    public void VerifyEmail()
    {
        IsEmailVerified = true;
        Status = UserStatus.Active;
    }

    public void UpdateProfile(string firstName, string lastName, string? biography, string? headline)
    {
        FirstName = firstName;
        LastName = lastName;
        Biography = biography;
        Headline = headline;
    }

    public void SetAvatar(string avatarUrl)
    {
        AvatarUrl = avatarUrl;
    }

    public void RemoveAvatar()
    {
        AvatarUrl = null;
    }

    public void UpdatePreferences(string preferredLanguage, string timezone)
    {
        PreferredLanguage = preferredLanguage;
        Timezone = timezone;
    }

    public void RecordLogin()
    {
        LastLoginAt = DateTime.UtcNow;
    }

    public void Suspend()
    {
        Status = UserStatus.Suspended;
    }

    public void Activate()
    {
        Status = UserStatus.Active;
    }

    public void Deactivate()
    {
        Status = UserStatus.Inactive;
    }
}
