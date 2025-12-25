// Copyright (c) Quinntyne Brown. All Rights Reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

using CoursesPlatform.Core;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace CoursesPlatform.Api;

public class VerifyEmailRequest : IRequest<VerifyEmailResponse>
{
    public string Token { get; set; } = string.Empty;
}

public class VerifyEmailResponse
{
    public bool Success { get; set; }

    public string Message { get; set; } = string.Empty;
}

public class VerifyEmailValidator : AbstractValidator<VerifyEmailRequest>
{
    public VerifyEmailValidator()
    {
        RuleFor(x => x.Token)
            .NotEmpty().WithMessage("Token is required");
    }
}

public class VerifyEmailHandler : IRequestHandler<VerifyEmailRequest, VerifyEmailResponse>
{
    private readonly ICoursesPlatformContext _context;
    private readonly ILogger<VerifyEmailHandler> _logger;

    public VerifyEmailHandler(ICoursesPlatformContext context, ILogger<VerifyEmailHandler> logger)
    {
        _context = context;
        _logger = logger;
    }

    public async Task<VerifyEmailResponse> Handle(VerifyEmailRequest request, CancellationToken cancellationToken)
    {
        var user = await _context.Users
            .FirstOrDefaultAsync(u => u.EmailVerificationToken == request.Token, cancellationToken);

        if (user == null)
        {
            return new VerifyEmailResponse { Success = false, Message = "Invalid verification token" };
        }

        if (user.EmailVerificationTokenExpiry < DateTime.UtcNow)
        {
            return new VerifyEmailResponse { Success = false, Message = "Verification token has expired" };
        }

        user.EmailVerified = true;
        user.Status = UserStatus.Active;
        user.EmailVerificationToken = null;
        user.EmailVerificationTokenExpiry = null;
        user.UpdatedAt = DateTime.UtcNow;

        await _context.SaveChangesAsync(cancellationToken);

        _logger.LogInformation("Email verified for user: {Email}", user.Email);

        return new VerifyEmailResponse { Success = true, Message = "Email verified successfully" };
    }
}
