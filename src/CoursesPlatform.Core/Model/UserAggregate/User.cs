// Copyright (c) Quinntyne Brown. All Rights Reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

namespace CoursesPlatform.Core;

public class User
{
    public Guid UserId { get; set; }

    public string Email { get; set; } = string.Empty;

    public string PasswordHash { get; set; } = string.Empty;

    public string FirstName { get; set; } = string.Empty;

    public string LastName { get; set; } = string.Empty;

    public string? Biography { get; set; }

    public string? Headline { get; set; }

    public string? AvatarUrl { get; set; }

    public UserStatus Status { get; set; } = UserStatus.Pending;

    public bool EmailVerified { get; set; }

    public string? EmailVerificationToken { get; set; }

    public DateTime? EmailVerificationTokenExpiry { get; set; }

    public string? PasswordResetToken { get; set; }

    public DateTime? PasswordResetTokenExpiry { get; set; }

    public int FailedLoginAttempts { get; set; }

    public DateTime? LockoutEnd { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public DateTime? UpdatedAt { get; set; }

    public ICollection<UserSession> Sessions { get; set; } = new List<UserSession>();

    public ICollection<Course> Courses { get; set; } = new List<Course>();

    public bool IsLockedOut => LockoutEnd.HasValue && LockoutEnd > DateTime.UtcNow;

    public void SetPassword(string password)
    {
        PasswordHash = BCrypt.Net.BCrypt.HashPassword(password);
    }

    public bool VerifyPassword(string password)
    {
        return BCrypt.Net.BCrypt.Verify(password, PasswordHash);
    }

    public void IncrementFailedLoginAttempts()
    {
        FailedLoginAttempts++;
        if (FailedLoginAttempts >= 5)
        {
            LockoutEnd = DateTime.UtcNow.AddMinutes(15);
        }
    }

    public void ResetFailedLoginAttempts()
    {
        FailedLoginAttempts = 0;
        LockoutEnd = null;
    }

    public string GenerateEmailVerificationToken()
    {
        EmailVerificationToken = Guid.NewGuid().ToString("N");
        EmailVerificationTokenExpiry = DateTime.UtcNow.AddHours(24);
        return EmailVerificationToken;
    }

    public string GeneratePasswordResetToken()
    {
        PasswordResetToken = Guid.NewGuid().ToString("N");
        PasswordResetTokenExpiry = DateTime.UtcNow.AddHours(1);
        return PasswordResetToken;
    }
}
