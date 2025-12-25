// Copyright (c) Quinntyne Brown. All Rights Reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

namespace CoursesPlatform.Core;

public interface IEmailService
{
    Task SendVerificationEmailAsync(string email, string token, CancellationToken cancellationToken = default);

    Task SendPasswordResetEmailAsync(string email, string token, CancellationToken cancellationToken = default);
}
