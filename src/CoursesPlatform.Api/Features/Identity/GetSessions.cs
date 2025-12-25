// Copyright (c) Quinntyne Brown. All Rights Reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

using CoursesPlatform.Core;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace CoursesPlatform.Api;

public class GetSessionsRequest : IRequest<GetSessionsResponse>
{
    public Guid UserId { get; set; }
}

public class GetSessionsResponse
{
    public List<SessionDto> Sessions { get; set; } = new();
}

public class GetSessionsHandler : IRequestHandler<GetSessionsRequest, GetSessionsResponse>
{
    private readonly ICoursesPlatformContext _context;

    public GetSessionsHandler(ICoursesPlatformContext context)
    {
        _context = context;
    }

    public async Task<GetSessionsResponse> Handle(GetSessionsRequest request, CancellationToken cancellationToken)
    {
        var sessions = await _context.UserSessions
            .Where(s => s.UserId == request.UserId && !s.IsExpired)
            .OrderByDescending(s => s.LastActivityAt ?? s.CreatedAt)
            .Select(s => new SessionDto
            {
                SessionId = s.UserSessionId,
                DeviceType = s.DeviceType,
                Browser = s.Browser,
                OperatingSystem = s.OperatingSystem,
                Location = s.Location,
                CreatedAt = s.CreatedAt,
                LastActivityAt = s.LastActivityAt
            })
            .ToListAsync(cancellationToken);

        return new GetSessionsResponse { Sessions = sessions };
    }
}
