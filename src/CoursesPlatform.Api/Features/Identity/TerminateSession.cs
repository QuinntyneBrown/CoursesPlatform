// Copyright (c) Quinntyne Brown. All Rights Reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

using CoursesPlatform.Core;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace CoursesPlatform.Api;

public class TerminateSessionRequest : IRequest<TerminateSessionResponse>
{
    public Guid UserId { get; set; }

    public Guid SessionId { get; set; }
}

public class TerminateSessionResponse
{
    public bool Success { get; set; }

    public string Message { get; set; } = string.Empty;
}

public class TerminateSessionHandler : IRequestHandler<TerminateSessionRequest, TerminateSessionResponse>
{
    private readonly ICoursesPlatformContext _context;
    private readonly ILogger<TerminateSessionHandler> _logger;

    public TerminateSessionHandler(ICoursesPlatformContext context, ILogger<TerminateSessionHandler> logger)
    {
        _context = context;
        _logger = logger;
    }

    public async Task<TerminateSessionResponse> Handle(TerminateSessionRequest request, CancellationToken cancellationToken)
    {
        var session = await _context.UserSessions
            .FirstOrDefaultAsync(s => s.UserSessionId == request.SessionId && s.UserId == request.UserId, cancellationToken);

        if (session == null)
        {
            return new TerminateSessionResponse { Success = false, Message = "Session not found" };
        }

        _context.UserSessions.Remove(session);
        await _context.SaveChangesAsync(cancellationToken);

        _logger.LogInformation("Session terminated: {SessionId} for user: {UserId}", request.SessionId, request.UserId);

        return new TerminateSessionResponse { Success = true, Message = "Session terminated successfully" };
    }
}
