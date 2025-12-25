// Copyright (c) Quinntyne Brown. All Rights Reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

using CoursesPlatform.Core;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace CoursesPlatform.Api;

public class UnpublishCourseRequest : IRequest<UnpublishCourseResponse>
{
    public Guid CourseId { get; set; }

    public Guid UserId { get; set; }
}

public class UnpublishCourseResponse
{
    public bool Success { get; set; }

    public CourseDto? Course { get; set; }

    public string? Error { get; set; }
}

public class UnpublishCourseHandler : IRequestHandler<UnpublishCourseRequest, UnpublishCourseResponse>
{
    private readonly ICoursesPlatformContext _context;
    private readonly ILogger<UnpublishCourseHandler> _logger;

    public UnpublishCourseHandler(ICoursesPlatformContext context, ILogger<UnpublishCourseHandler> logger)
    {
        _context = context;
        _logger = logger;
    }

    public async Task<UnpublishCourseResponse> Handle(UnpublishCourseRequest request, CancellationToken cancellationToken)
    {
        var course = await _context.Courses
            .Include(c => c.LearningObjectives)
            .Include(c => c.Category)
            .FirstOrDefaultAsync(c => c.CourseId == request.CourseId, cancellationToken);

        if (course == null)
        {
            return new UnpublishCourseResponse { Success = false, Error = "Course not found" };
        }

        if (course.InstructorId != request.UserId)
        {
            return new UnpublishCourseResponse { Success = false, Error = "Not authorized to unpublish this course" };
        }

        if (!course.CanUnpublish)
        {
            return new UnpublishCourseResponse { Success = false, Error = "Course cannot be unpublished" };
        }

        course.Status = CourseStatus.Unpublished;
        course.UpdatedAt = DateTime.UtcNow;

        await _context.SaveChangesAsync(cancellationToken);

        _logger.LogInformation("Course unpublished: {CourseId}", course.CourseId);

        return new UnpublishCourseResponse { Success = true, Course = course.ToDto() };
    }
}
