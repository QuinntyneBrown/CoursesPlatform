// Copyright (c) Quinntyne Brown. All Rights Reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

using CoursesPlatform.Core;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace CoursesPlatform.Api;

public class LoginRequest : IRequest<LoginResponse>
{
    public string Email { get; set; } = string.Empty;

    public string Password { get; set; } = string.Empty;

    public bool RememberMe { get; set; }

    public string? DeviceType { get; set; }

    public string? Browser { get; set; }

    public string? OperatingSystem { get; set; }

    public string? IpAddress { get; set; }
}

public class LoginResponse
{
    public bool Success { get; set; }

    public string? AccessToken { get; set; }

    public string? RefreshToken { get; set; }

    public DateTime? ExpiresAt { get; set; }

    public UserDto? User { get; set; }

    public string? Error { get; set; }
}

public class LoginValidator : AbstractValidator<LoginRequest>
{
    public LoginValidator()
    {
        RuleFor(x => x.Email)
            .NotEmpty().WithMessage("Email is required")
            .EmailAddress().WithMessage("Invalid email format");

        RuleFor(x => x.Password)
            .NotEmpty().WithMessage("Password is required");
    }
}

public class LoginHandler : IRequestHandler<LoginRequest, LoginResponse>
{
    private readonly ICoursesPlatformContext _context;
    private readonly ITokenService _tokenService;
    private readonly ILogger<LoginHandler> _logger;

    public LoginHandler(ICoursesPlatformContext context, ITokenService tokenService, ILogger<LoginHandler> logger)
    {
        _context = context;
        _tokenService = tokenService;
        _logger = logger;
    }

    public async Task<LoginResponse> Handle(LoginRequest request, CancellationToken cancellationToken)
    {
        var user = await _context.Users
            .FirstOrDefaultAsync(u => u.Email == request.Email, cancellationToken);

        if (user == null)
        {
            return new LoginResponse { Success = false, Error = "Invalid email or password" };
        }

        if (user.IsLockedOut)
        {
            var remainingMinutes = (int)(user.LockoutEnd!.Value - DateTime.UtcNow).TotalMinutes + 1;
            return new LoginResponse { Success = false, Error = $"Account is locked. Try again in {remainingMinutes} minutes." };
        }

        if (user.Status != UserStatus.Active)
        {
            return new LoginResponse { Success = false, Error = "Account is not active" };
        }

        if (!user.VerifyPassword(request.Password))
        {
            user.IncrementFailedLoginAttempts();
            await _context.SaveChangesAsync(cancellationToken);

            _logger.LogWarning("Failed login attempt for user: {Email}", user.Email);
            return new LoginResponse { Success = false, Error = "Invalid email or password" };
        }

        user.ResetFailedLoginAttempts();

        var accessToken = _tokenService.GenerateAccessToken(user);
        var refreshToken = _tokenService.GenerateRefreshToken();

        var session = new UserSession
        {
            UserSessionId = Guid.NewGuid(),
            UserId = user.UserId,
            DeviceType = request.DeviceType,
            Browser = request.Browser,
            OperatingSystem = request.OperatingSystem,
            IpAddress = request.IpAddress,
            ExpiresAt = request.RememberMe ? DateTime.UtcNow.AddDays(30) : DateTime.UtcNow.AddDays(7),
            LastActivityAt = DateTime.UtcNow
        };

        session.SetRefreshToken(refreshToken);

        _context.UserSessions.Add(session);
        await _context.SaveChangesAsync(cancellationToken);

        _logger.LogInformation("User logged in: {Email}", user.Email);

        return new LoginResponse
        {
            Success = true,
            AccessToken = accessToken,
            RefreshToken = refreshToken,
            ExpiresAt = DateTime.UtcNow.AddMinutes(15),
            User = user.ToDto()
        };
    }
}
