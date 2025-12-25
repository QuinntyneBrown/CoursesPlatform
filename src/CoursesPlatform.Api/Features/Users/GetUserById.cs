namespace CoursesPlatform.Api;

using CoursesPlatform.Core;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

public record GetUserByIdQuery(Guid UserId) : IRequest<UserDto?>;

public class GetUserByIdHandler : IRequestHandler<GetUserByIdQuery, UserDto?>
{
    private readonly ICoursesPlatformContext _context;
    private readonly ILogger<GetUserByIdHandler> _logger;

    public GetUserByIdHandler(ICoursesPlatformContext context, ILogger<GetUserByIdHandler> logger)
    {
        _context = context;
        _logger = logger;
    }

    public async Task<UserDto?> Handle(GetUserByIdQuery request, CancellationToken cancellationToken)
    {
        _logger.LogInformation("Getting user with ID {UserId}", request.UserId);

        var user = await _context.Users
            .FirstOrDefaultAsync(u => u.UserId == request.UserId, cancellationToken);

        if (user == null)
        {
            _logger.LogWarning("User with ID {UserId} not found", request.UserId);
            return null;
        }

        return user.ToDto();
    }
}
