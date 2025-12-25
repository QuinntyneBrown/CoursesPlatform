namespace CoursesPlatform.Api;

using CoursesPlatform.Core;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

public record GetUserEnrollmentsQuery(Guid UserId) : IRequest<List<EnrollmentDto>>;

public class GetUserEnrollmentsHandler : IRequestHandler<GetUserEnrollmentsQuery, List<EnrollmentDto>>
{
    private readonly ICoursesPlatformContext _context;
    private readonly ILogger<GetUserEnrollmentsHandler> _logger;

    public GetUserEnrollmentsHandler(ICoursesPlatformContext context, ILogger<GetUserEnrollmentsHandler> logger)
    {
        _context = context;
        _logger = logger;
    }

    public async Task<List<EnrollmentDto>> Handle(GetUserEnrollmentsQuery request, CancellationToken cancellationToken)
    {
        _logger.LogInformation("Getting enrollments for user {UserId}", request.UserId);

        var enrollments = await _context.Enrollments
            .Where(e => e.UserId == request.UserId)
            .ToListAsync(cancellationToken);

        return enrollments.Select(e => e.ToDto()).ToList();
    }
}
