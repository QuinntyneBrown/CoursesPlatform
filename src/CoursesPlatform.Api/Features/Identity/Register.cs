// Copyright (c) Quinntyne Brown. All Rights Reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

using CoursesPlatform.Core;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace CoursesPlatform.Api;

public class RegisterRequest : IRequest<RegisterResponse>
{
    public string Email { get; set; } = string.Empty;

    public string Password { get; set; } = string.Empty;

    public string FirstName { get; set; } = string.Empty;

    public string LastName { get; set; } = string.Empty;
}

public class RegisterResponse
{
    public Guid UserId { get; set; }

    public string Message { get; set; } = string.Empty;
}

public class RegisterValidator : AbstractValidator<RegisterRequest>
{
    public RegisterValidator()
    {
        RuleFor(x => x.Email)
            .NotEmpty().WithMessage("Email is required")
            .EmailAddress().WithMessage("Invalid email format")
            .MaximumLength(256).WithMessage("Email must not exceed 256 characters");

        RuleFor(x => x.Password)
            .NotEmpty().WithMessage("Password is required")
            .MinimumLength(8).WithMessage("Password must be at least 8 characters")
            .Matches("[A-Z]").WithMessage("Password must contain at least one uppercase letter")
            .Matches("[a-z]").WithMessage("Password must contain at least one lowercase letter")
            .Matches("[0-9]").WithMessage("Password must contain at least one number");

        RuleFor(x => x.FirstName)
            .NotEmpty().WithMessage("First name is required")
            .MaximumLength(100).WithMessage("First name must not exceed 100 characters");

        RuleFor(x => x.LastName)
            .NotEmpty().WithMessage("Last name is required")
            .MaximumLength(100).WithMessage("Last name must not exceed 100 characters");
    }
}

public class RegisterHandler : IRequestHandler<RegisterRequest, RegisterResponse>
{
    private readonly ICoursesPlatformContext _context;
    private readonly IEmailService _emailService;
    private readonly ILogger<RegisterHandler> _logger;

    public RegisterHandler(ICoursesPlatformContext context, IEmailService emailService, ILogger<RegisterHandler> logger)
    {
        _context = context;
        _emailService = emailService;
        _logger = logger;
    }

    public async Task<RegisterResponse> Handle(RegisterRequest request, CancellationToken cancellationToken)
    {
        var existingUser = await _context.Users
            .FirstOrDefaultAsync(u => u.Email == request.Email, cancellationToken);

        if (existingUser != null)
        {
            throw new InvalidOperationException("Email already registered");
        }

        var user = new User
        {
            UserId = Guid.NewGuid(),
            Email = request.Email,
            FirstName = request.FirstName,
            LastName = request.LastName,
            Status = UserStatus.Pending
        };

        user.SetPassword(request.Password);
        var token = user.GenerateEmailVerificationToken();

        _context.Users.Add(user);
        await _context.SaveChangesAsync(cancellationToken);

        await _emailService.SendVerificationEmailAsync(user.Email, token, cancellationToken);

        _logger.LogInformation("User registered: {Email}", user.Email);

        return new RegisterResponse
        {
            UserId = user.UserId,
            Message = "Registration successful. Please check your email to verify your account."
        };
    }
}
