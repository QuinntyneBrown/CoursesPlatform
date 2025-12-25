namespace CoursesPlatform.Api;

using CoursesPlatform.Core;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

public record GetInstructorsQuery : IRequest<List<InstructorDto>>;

public class GetInstructorsHandler : IRequestHandler<GetInstructorsQuery, List<InstructorDto>>
{
    private readonly ICoursesPlatformContext _context;
    private readonly ILogger<GetInstructorsHandler> _logger;

    public GetInstructorsHandler(ICoursesPlatformContext context, ILogger<GetInstructorsHandler> logger)
    {
        _context = context;
        _logger = logger;
    }

    public async Task<List<InstructorDto>> Handle(GetInstructorsQuery request, CancellationToken cancellationToken)
    {
        _logger.LogInformation("Getting all instructors");

        var instructors = await _context.Instructors
            .Where(i => i.Status == InstructorStatus.Active)
            .ToListAsync(cancellationToken);

        return instructors.Select(i => i.ToDto()).ToList();
    }
}
