namespace CoursesPlatform.Api;

using CoursesPlatform.Core;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

public record GetCoursesQuery : IRequest<List<CourseSummaryDto>>;

public class GetCoursesHandler : IRequestHandler<GetCoursesQuery, List<CourseSummaryDto>>
{
    private readonly ICoursesPlatformContext _context;
    private readonly ILogger<GetCoursesHandler> _logger;

    public GetCoursesHandler(ICoursesPlatformContext context, ILogger<GetCoursesHandler> logger)
    {
        _context = context;
        _logger = logger;
    }

    public async Task<List<CourseSummaryDto>> Handle(GetCoursesQuery request, CancellationToken cancellationToken)
    {
        _logger.LogInformation("Getting all courses");

        var courses = await _context.Courses
            .Where(c => c.Status == CourseStatus.Published)
            .ToListAsync(cancellationToken);

        return courses.Select(c => c.ToSummaryDto()).ToList();
    }
}
