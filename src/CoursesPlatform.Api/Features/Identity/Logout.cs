// Copyright (c) Quinntyne Brown. All Rights Reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

using CoursesPlatform.Core;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace CoursesPlatform.Api;

public class LogoutRequest : IRequest<LogoutResponse>
{
    public Guid UserId { get; set; }

    public Guid SessionId { get; set; }
}

public class LogoutResponse
{
    public bool Success { get; set; }

    public string Message { get; set; } = string.Empty;
}

public class LogoutHandler : IRequestHandler<LogoutRequest, LogoutResponse>
{
    private readonly ICoursesPlatformContext _context;
    private readonly ILogger<LogoutHandler> _logger;

    public LogoutHandler(ICoursesPlatformContext context, ILogger<LogoutHandler> logger)
    {
        _context = context;
        _logger = logger;
    }

    public async Task<LogoutResponse> Handle(LogoutRequest request, CancellationToken cancellationToken)
    {
        var session = await _context.UserSessions
            .FirstOrDefaultAsync(s => s.UserSessionId == request.SessionId && s.UserId == request.UserId, cancellationToken);

        if (session != null)
        {
            _context.UserSessions.Remove(session);
            await _context.SaveChangesAsync(cancellationToken);
            _logger.LogInformation("User logged out: {UserId}", request.UserId);
        }

        return new LogoutResponse { Success = true, Message = "Logged out successfully" };
    }
}
