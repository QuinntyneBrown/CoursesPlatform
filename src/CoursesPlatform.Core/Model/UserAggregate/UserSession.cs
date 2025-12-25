// Copyright (c) Quinntyne Brown. All Rights Reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

namespace CoursesPlatform.Core;

public class UserSession
{
    public Guid UserSessionId { get; set; }

    public Guid UserId { get; set; }

    public User User { get; set; } = null!;

    public string RefreshTokenHash { get; set; } = string.Empty;

    public string? DeviceType { get; set; }

    public string? Browser { get; set; }

    public string? OperatingSystem { get; set; }

    public string? IpAddress { get; set; }

    public string? Location { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public DateTime ExpiresAt { get; set; }

    public DateTime? LastActivityAt { get; set; }

    public bool IsExpired => DateTime.UtcNow > ExpiresAt;

    public void SetRefreshToken(string token)
    {
        RefreshTokenHash = BCrypt.Net.BCrypt.HashPassword(token);
    }

    public bool VerifyRefreshToken(string token)
    {
        return BCrypt.Net.BCrypt.Verify(token, RefreshTokenHash);
    }
}
