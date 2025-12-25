namespace CoursesPlatform.Api;

using CoursesPlatform.Core;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

public record GetCourseByIdQuery(Guid CourseId) : IRequest<CourseDto?>;

public class GetCourseByIdHandler : IRequestHandler<GetCourseByIdQuery, CourseDto?>
{
    private readonly ICoursesPlatformContext _context;
    private readonly ILogger<GetCourseByIdHandler> _logger;

    public GetCourseByIdHandler(ICoursesPlatformContext context, ILogger<GetCourseByIdHandler> logger)
    {
        _context = context;
        _logger = logger;
    }

    public async Task<CourseDto?> Handle(GetCourseByIdQuery request, CancellationToken cancellationToken)
    {
        _logger.LogInformation("Getting course with ID {CourseId}", request.CourseId);

        var course = await _context.Courses
            .FirstOrDefaultAsync(c => c.CourseId == request.CourseId, cancellationToken);

        if (course == null)
        {
            _logger.LogWarning("Course with ID {CourseId} not found", request.CourseId);
            return null;
        }

        return course.ToDto();
    }
}
