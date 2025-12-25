// Copyright (c) Quinntyne Brown. All Rights Reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

using CoursesPlatform.Core;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace CoursesPlatform.Api;

public class PublishCourseRequest : IRequest<PublishCourseResponse>
{
    public Guid CourseId { get; set; }

    public Guid UserId { get; set; }
}

public class PublishCourseResponse
{
    public bool Success { get; set; }

    public CourseDto? Course { get; set; }

    public string? Error { get; set; }
}

public class PublishCourseHandler : IRequestHandler<PublishCourseRequest, PublishCourseResponse>
{
    private readonly ICoursesPlatformContext _context;
    private readonly ILogger<PublishCourseHandler> _logger;

    public PublishCourseHandler(ICoursesPlatformContext context, ILogger<PublishCourseHandler> logger)
    {
        _context = context;
        _logger = logger;
    }

    public async Task<PublishCourseResponse> Handle(PublishCourseRequest request, CancellationToken cancellationToken)
    {
        var course = await _context.Courses
            .Include(c => c.LearningObjectives)
            .Include(c => c.Category)
            .FirstOrDefaultAsync(c => c.CourseId == request.CourseId, cancellationToken);

        if (course == null)
        {
            return new PublishCourseResponse { Success = false, Error = "Course not found" };
        }

        if (course.InstructorId != request.UserId)
        {
            return new PublishCourseResponse { Success = false, Error = "Not authorized to publish this course" };
        }

        if (!course.CanPublish)
        {
            return new PublishCourseResponse { Success = false, Error = "Course cannot be published. Ensure it has a title and description." };
        }

        course.Status = CourseStatus.Published;
        course.PublishedAt = DateTime.UtcNow;
        course.UpdatedAt = DateTime.UtcNow;

        await _context.SaveChangesAsync(cancellationToken);

        _logger.LogInformation("Course published: {CourseId}", course.CourseId);

        return new PublishCourseResponse { Success = true, Course = course.ToDto() };
    }
}
