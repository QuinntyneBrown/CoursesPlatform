// Copyright (c) Quinntyne Brown. All Rights Reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

using CoursesPlatform.Core;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace CoursesPlatform.Api;

public class ForgotPasswordRequest : IRequest<ForgotPasswordResponse>
{
    public string Email { get; set; } = string.Empty;
}

public class ForgotPasswordResponse
{
    public bool Success { get; set; }

    public string Message { get; set; } = string.Empty;
}

public class ForgotPasswordValidator : AbstractValidator<ForgotPasswordRequest>
{
    public ForgotPasswordValidator()
    {
        RuleFor(x => x.Email)
            .NotEmpty().WithMessage("Email is required")
            .EmailAddress().WithMessage("Invalid email format");
    }
}

public class ForgotPasswordHandler : IRequestHandler<ForgotPasswordRequest, ForgotPasswordResponse>
{
    private readonly ICoursesPlatformContext _context;
    private readonly IEmailService _emailService;
    private readonly ILogger<ForgotPasswordHandler> _logger;

    public ForgotPasswordHandler(ICoursesPlatformContext context, IEmailService emailService, ILogger<ForgotPasswordHandler> logger)
    {
        _context = context;
        _emailService = emailService;
        _logger = logger;
    }

    public async Task<ForgotPasswordResponse> Handle(ForgotPasswordRequest request, CancellationToken cancellationToken)
    {
        var user = await _context.Users
            .FirstOrDefaultAsync(u => u.Email == request.Email, cancellationToken);

        // Always return success to prevent email enumeration
        if (user == null)
        {
            return new ForgotPasswordResponse { Success = true, Message = "If the email exists, a password reset link has been sent." };
        }

        var token = user.GeneratePasswordResetToken();
        await _context.SaveChangesAsync(cancellationToken);

        await _emailService.SendPasswordResetEmailAsync(user.Email, token, cancellationToken);

        _logger.LogInformation("Password reset requested for user: {Email}", user.Email);

        return new ForgotPasswordResponse { Success = true, Message = "If the email exists, a password reset link has been sent." };
    }
}
