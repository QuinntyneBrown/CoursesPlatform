// Copyright (c) Quinntyne Brown. All Rights Reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

using CoursesPlatform.Core;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace CoursesPlatform.Api;

public class ChangePasswordRequest : IRequest<ChangePasswordResponse>
{
    public Guid UserId { get; set; }

    public string CurrentPassword { get; set; } = string.Empty;

    public string NewPassword { get; set; } = string.Empty;
}

public class ChangePasswordResponse
{
    public bool Success { get; set; }

    public string Message { get; set; } = string.Empty;
}

public class ChangePasswordValidator : AbstractValidator<ChangePasswordRequest>
{
    public ChangePasswordValidator()
    {
        RuleFor(x => x.CurrentPassword)
            .NotEmpty().WithMessage("Current password is required");

        RuleFor(x => x.NewPassword)
            .NotEmpty().WithMessage("New password is required")
            .MinimumLength(8).WithMessage("Password must be at least 8 characters")
            .Matches("[A-Z]").WithMessage("Password must contain at least one uppercase letter")
            .Matches("[a-z]").WithMessage("Password must contain at least one lowercase letter")
            .Matches("[0-9]").WithMessage("Password must contain at least one number");
    }
}

public class ChangePasswordHandler : IRequestHandler<ChangePasswordRequest, ChangePasswordResponse>
{
    private readonly ICoursesPlatformContext _context;
    private readonly ILogger<ChangePasswordHandler> _logger;

    public ChangePasswordHandler(ICoursesPlatformContext context, ILogger<ChangePasswordHandler> logger)
    {
        _context = context;
        _logger = logger;
    }

    public async Task<ChangePasswordResponse> Handle(ChangePasswordRequest request, CancellationToken cancellationToken)
    {
        var user = await _context.Users.FindAsync(new object[] { request.UserId }, cancellationToken);

        if (user == null)
        {
            return new ChangePasswordResponse { Success = false, Message = "User not found" };
        }

        if (!user.VerifyPassword(request.CurrentPassword))
        {
            return new ChangePasswordResponse { Success = false, Message = "Current password is incorrect" };
        }

        user.SetPassword(request.NewPassword);
        user.UpdatedAt = DateTime.UtcNow;

        // Invalidate all other sessions
        var sessions = await _context.UserSessions
            .Where(s => s.UserId == user.UserId)
            .ToListAsync(cancellationToken);

        foreach (var session in sessions)
        {
            _context.UserSessions.Remove(session);
        }

        await _context.SaveChangesAsync(cancellationToken);

        _logger.LogInformation("Password changed for user: {Email}", user.Email);

        return new ChangePasswordResponse { Success = true, Message = "Password changed successfully" };
    }
}
