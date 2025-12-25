// Copyright (c) Quinntyne Brown. All Rights Reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

using CoursesPlatform.Core;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace CoursesPlatform.Api;

public class ResetPasswordRequest : IRequest<ResetPasswordResponse>
{
    public string Token { get; set; } = string.Empty;

    public string NewPassword { get; set; } = string.Empty;
}

public class ResetPasswordResponse
{
    public bool Success { get; set; }

    public string Message { get; set; } = string.Empty;
}

public class ResetPasswordValidator : AbstractValidator<ResetPasswordRequest>
{
    public ResetPasswordValidator()
    {
        RuleFor(x => x.Token)
            .NotEmpty().WithMessage("Token is required");

        RuleFor(x => x.NewPassword)
            .NotEmpty().WithMessage("New password is required")
            .MinimumLength(8).WithMessage("Password must be at least 8 characters")
            .Matches("[A-Z]").WithMessage("Password must contain at least one uppercase letter")
            .Matches("[a-z]").WithMessage("Password must contain at least one lowercase letter")
            .Matches("[0-9]").WithMessage("Password must contain at least one number");
    }
}

public class ResetPasswordHandler : IRequestHandler<ResetPasswordRequest, ResetPasswordResponse>
{
    private readonly ICoursesPlatformContext _context;
    private readonly ILogger<ResetPasswordHandler> _logger;

    public ResetPasswordHandler(ICoursesPlatformContext context, ILogger<ResetPasswordHandler> logger)
    {
        _context = context;
        _logger = logger;
    }

    public async Task<ResetPasswordResponse> Handle(ResetPasswordRequest request, CancellationToken cancellationToken)
    {
        var user = await _context.Users
            .FirstOrDefaultAsync(u => u.PasswordResetToken == request.Token, cancellationToken);

        if (user == null)
        {
            return new ResetPasswordResponse { Success = false, Message = "Invalid reset token" };
        }

        if (user.PasswordResetTokenExpiry < DateTime.UtcNow)
        {
            return new ResetPasswordResponse { Success = false, Message = "Reset token has expired" };
        }

        user.SetPassword(request.NewPassword);
        user.PasswordResetToken = null;
        user.PasswordResetTokenExpiry = null;
        user.UpdatedAt = DateTime.UtcNow;

        // Invalidate all sessions
        var sessions = await _context.UserSessions
            .Where(s => s.UserId == user.UserId)
            .ToListAsync(cancellationToken);

        foreach (var session in sessions)
        {
            _context.UserSessions.Remove(session);
        }

        await _context.SaveChangesAsync(cancellationToken);

        _logger.LogInformation("Password reset for user: {Email}", user.Email);

        return new ResetPasswordResponse { Success = true, Message = "Password reset successfully" };
    }
}
