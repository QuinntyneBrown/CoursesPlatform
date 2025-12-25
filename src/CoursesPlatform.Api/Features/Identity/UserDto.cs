// Copyright (c) Quinntyne Brown. All Rights Reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

namespace CoursesPlatform.Api;

public class UserDto
{
    public Guid UserId { get; set; }

    public string Email { get; set; } = string.Empty;

    public string FirstName { get; set; } = string.Empty;

    public string LastName { get; set; } = string.Empty;

    public string? Biography { get; set; }

    public string? Headline { get; set; }

    public string? AvatarUrl { get; set; }
}

public class SessionDto
{
    public Guid SessionId { get; set; }

    public string? DeviceType { get; set; }

    public string? Browser { get; set; }

    public string? OperatingSystem { get; set; }

    public string? Location { get; set; }

    public DateTime CreatedAt { get; set; }

    public DateTime? LastActivityAt { get; set; }
}
