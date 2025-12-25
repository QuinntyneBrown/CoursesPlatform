namespace CoursesPlatform.Api;

using CoursesPlatform.Core;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

public record CreateCourseCommand(Guid InstructorId, string Title, string Description) : IRequest<CourseDto>;

public class CreateCourseHandler : IRequestHandler<CreateCourseCommand, CourseDto>
{
    private readonly ICoursesPlatformContext _context;
    private readonly ILogger<CreateCourseHandler> _logger;

    public CreateCourseHandler(ICoursesPlatformContext context, ILogger<CreateCourseHandler> logger)
    {
        _context = context;
        _logger = logger;
    }

    public async Task<CourseDto> Handle(CreateCourseCommand request, CancellationToken cancellationToken)
    {
        _logger.LogInformation("Creating course for instructor {InstructorId}", request.InstructorId);

        var instructor = await _context.Instructors
            .FirstOrDefaultAsync(i => i.InstructorId == request.InstructorId, cancellationToken)
            ?? throw new InvalidOperationException($"Instructor with ID {request.InstructorId} not found.");

        var course = Course.CreateDraft(instructor, request.Title, request.Description);

        _context.Courses.Add(course);
        await _context.SaveChangesAsync(cancellationToken);

        _logger.LogInformation("Course created successfully with ID {CourseId}", course.CourseId);

        return course.ToDto();
    }
}
