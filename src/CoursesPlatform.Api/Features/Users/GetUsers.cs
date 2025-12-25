namespace CoursesPlatform.Api;

using CoursesPlatform.Core;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

public record GetUsersQuery : IRequest<List<UserDto>>;

public class GetUsersHandler : IRequestHandler<GetUsersQuery, List<UserDto>>
{
    private readonly ICoursesPlatformContext _context;
    private readonly ILogger<GetUsersHandler> _logger;

    public GetUsersHandler(ICoursesPlatformContext context, ILogger<GetUsersHandler> logger)
    {
        _context = context;
        _logger = logger;
    }

    public async Task<List<UserDto>> Handle(GetUsersQuery request, CancellationToken cancellationToken)
    {
        _logger.LogInformation("Getting all users");

        var users = await _context.Users
            .ToListAsync(cancellationToken);

        return users.Select(u => u.ToDto()).ToList();
    }
}
