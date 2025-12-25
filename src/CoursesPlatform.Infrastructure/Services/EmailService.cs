// Copyright (c) Quinntyne Brown. All Rights Reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

using CoursesPlatform.Core;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

namespace CoursesPlatform.Infrastructure;

public class EmailService : IEmailService
{
    private readonly IConfiguration _configuration;
    private readonly ILogger<EmailService> _logger;

    public EmailService(IConfiguration configuration, ILogger<EmailService> logger)
    {
        _configuration = configuration;
        _logger = logger;
    }

    public Task SendVerificationEmailAsync(string email, string token, CancellationToken cancellationToken = default)
    {
        var frontendUrl = _configuration["FrontendUrl"] ?? "http://localhost:4200";
        var verificationUrl = $"{frontendUrl}/verify-email?token={token}";

        _logger.LogInformation("Sending verification email to {Email} with URL {Url}", email, verificationUrl);

        // In production, integrate with actual email service (SendGrid, AWS SES, etc.)
        return Task.CompletedTask;
    }

    public Task SendPasswordResetEmailAsync(string email, string token, CancellationToken cancellationToken = default)
    {
        var frontendUrl = _configuration["FrontendUrl"] ?? "http://localhost:4200";
        var resetUrl = $"{frontendUrl}/reset-password?token={token}";

        _logger.LogInformation("Sending password reset email to {Email} with URL {Url}", email, resetUrl);

        // In production, integrate with actual email service
        return Task.CompletedTask;
    }
}
