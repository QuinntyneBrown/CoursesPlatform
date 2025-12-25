// Copyright (c) Quinntyne Brown. All Rights Reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

using CoursesPlatform.Core;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace CoursesPlatform.Api;

public class RefreshTokenRequest : IRequest<RefreshTokenResponse>
{
    public string RefreshToken { get; set; } = string.Empty;
}

public class RefreshTokenResponse
{
    public bool Success { get; set; }

    public string? AccessToken { get; set; }

    public string? RefreshToken { get; set; }

    public DateTime? ExpiresAt { get; set; }

    public string? Error { get; set; }
}

public class RefreshTokenValidator : AbstractValidator<RefreshTokenRequest>
{
    public RefreshTokenValidator()
    {
        RuleFor(x => x.RefreshToken)
            .NotEmpty().WithMessage("Refresh token is required");
    }
}

public class RefreshTokenHandler : IRequestHandler<RefreshTokenRequest, RefreshTokenResponse>
{
    private readonly ICoursesPlatformContext _context;
    private readonly ITokenService _tokenService;
    private readonly ILogger<RefreshTokenHandler> _logger;

    public RefreshTokenHandler(ICoursesPlatformContext context, ITokenService tokenService, ILogger<RefreshTokenHandler> logger)
    {
        _context = context;
        _tokenService = tokenService;
        _logger = logger;
    }

    public async Task<RefreshTokenResponse> Handle(RefreshTokenRequest request, CancellationToken cancellationToken)
    {
        var sessions = await _context.UserSessions
            .Include(s => s.User)
            .Where(s => !s.IsExpired)
            .ToListAsync(cancellationToken);

        var session = sessions.FirstOrDefault(s => s.VerifyRefreshToken(request.RefreshToken));

        if (session == null)
        {
            return new RefreshTokenResponse { Success = false, Error = "Invalid refresh token" };
        }

        if (session.User.Status != UserStatus.Active)
        {
            return new RefreshTokenResponse { Success = false, Error = "Account is not active" };
        }

        var newAccessToken = _tokenService.GenerateAccessToken(session.User);
        var newRefreshToken = _tokenService.GenerateRefreshToken();

        session.SetRefreshToken(newRefreshToken);
        session.LastActivityAt = DateTime.UtcNow;

        await _context.SaveChangesAsync(cancellationToken);

        _logger.LogInformation("Token refreshed for user: {UserId}", session.UserId);

        return new RefreshTokenResponse
        {
            Success = true,
            AccessToken = newAccessToken,
            RefreshToken = newRefreshToken,
            ExpiresAt = DateTime.UtcNow.AddMinutes(15)
        };
    }
}
