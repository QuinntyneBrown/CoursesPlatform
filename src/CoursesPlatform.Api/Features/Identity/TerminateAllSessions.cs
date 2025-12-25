// Copyright (c) Quinntyne Brown. All Rights Reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

using CoursesPlatform.Core;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace CoursesPlatform.Api;

public class TerminateAllSessionsRequest : IRequest<TerminateAllSessionsResponse>
{
    public Guid UserId { get; set; }

    public Guid? CurrentSessionId { get; set; }
}

public class TerminateAllSessionsResponse
{
    public bool Success { get; set; }

    public int TerminatedCount { get; set; }

    public string Message { get; set; } = string.Empty;
}

public class TerminateAllSessionsHandler : IRequestHandler<TerminateAllSessionsRequest, TerminateAllSessionsResponse>
{
    private readonly ICoursesPlatformContext _context;
    private readonly ILogger<TerminateAllSessionsHandler> _logger;

    public TerminateAllSessionsHandler(ICoursesPlatformContext context, ILogger<TerminateAllSessionsHandler> logger)
    {
        _context = context;
        _logger = logger;
    }

    public async Task<TerminateAllSessionsResponse> Handle(TerminateAllSessionsRequest request, CancellationToken cancellationToken)
    {
        var sessions = await _context.UserSessions
            .Where(s => s.UserId == request.UserId && s.UserSessionId != request.CurrentSessionId)
            .ToListAsync(cancellationToken);

        foreach (var session in sessions)
        {
            _context.UserSessions.Remove(session);
        }

        await _context.SaveChangesAsync(cancellationToken);

        _logger.LogInformation("Terminated {Count} sessions for user: {UserId}", sessions.Count, request.UserId);

        return new TerminateAllSessionsResponse
        {
            Success = true,
            TerminatedCount = sessions.Count,
            Message = $"Terminated {sessions.Count} session(s)"
        };
    }
}
