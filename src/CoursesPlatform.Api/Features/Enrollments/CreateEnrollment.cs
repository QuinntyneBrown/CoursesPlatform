namespace CoursesPlatform.Api;

using CoursesPlatform.Core;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

public record CreateEnrollmentCommand(Guid UserId, Guid CourseId) : IRequest<EnrollmentDto>;

public class CreateEnrollmentHandler : IRequestHandler<CreateEnrollmentCommand, EnrollmentDto>
{
    private readonly ICoursesPlatformContext _context;
    private readonly ILogger<CreateEnrollmentHandler> _logger;

    public CreateEnrollmentHandler(ICoursesPlatformContext context, ILogger<CreateEnrollmentHandler> logger)
    {
        _context = context;
        _logger = logger;
    }

    public async Task<EnrollmentDto> Handle(CreateEnrollmentCommand request, CancellationToken cancellationToken)
    {
        _logger.LogInformation("Creating enrollment for user {UserId} in course {CourseId}", request.UserId, request.CourseId);

        var user = await _context.Users
            .FirstOrDefaultAsync(u => u.UserId == request.UserId, cancellationToken)
            ?? throw new InvalidOperationException($"User with ID {request.UserId} not found.");

        var course = await _context.Courses
            .FirstOrDefaultAsync(c => c.CourseId == request.CourseId, cancellationToken)
            ?? throw new InvalidOperationException($"Course with ID {request.CourseId} not found.");

        var existingEnrollment = await _context.Enrollments
            .FirstOrDefaultAsync(e => e.UserId == request.UserId && e.CourseId == request.CourseId, cancellationToken);

        if (existingEnrollment != null)
        {
            throw new InvalidOperationException("User is already enrolled in this course.");
        }

        var enrollment = Enrollment.Create(user, course);

        _context.Enrollments.Add(enrollment);
        await _context.SaveChangesAsync(cancellationToken);

        _logger.LogInformation("Enrollment created with ID {EnrollmentId}", enrollment.EnrollmentId);

        return enrollment.ToDto();
    }
}
