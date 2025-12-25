// Copyright (c) Quinntyne Brown. All Rights Reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

using CoursesPlatform.Core;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace CoursesPlatform.Api;

public class DeleteCourseRequest : IRequest<DeleteCourseResponse>
{
    public Guid CourseId { get; set; }

    public Guid UserId { get; set; }
}

public class DeleteCourseResponse
{
    public bool Success { get; set; }

    public string Message { get; set; } = string.Empty;
}

public class DeleteCourseHandler : IRequestHandler<DeleteCourseRequest, DeleteCourseResponse>
{
    private readonly ICoursesPlatformContext _context;
    private readonly IFileStorageService _fileStorage;
    private readonly ILogger<DeleteCourseHandler> _logger;

    public DeleteCourseHandler(ICoursesPlatformContext context, IFileStorageService fileStorage, ILogger<DeleteCourseHandler> logger)
    {
        _context = context;
        _fileStorage = fileStorage;
        _logger = logger;
    }

    public async Task<DeleteCourseResponse> Handle(DeleteCourseRequest request, CancellationToken cancellationToken)
    {
        var course = await _context.Courses
            .Include(c => c.LearningObjectives)
            .FirstOrDefaultAsync(c => c.CourseId == request.CourseId, cancellationToken);

        if (course == null)
        {
            return new DeleteCourseResponse { Success = false, Message = "Course not found" };
        }

        if (course.InstructorId != request.UserId)
        {
            return new DeleteCourseResponse { Success = false, Message = "Not authorized to delete this course" };
        }

        if (!course.CanDelete)
        {
            return new DeleteCourseResponse { Success = false, Message = "Only draft courses can be deleted" };
        }

        // Delete thumbnail if exists
        if (!string.IsNullOrEmpty(course.ThumbnailUrl))
        {
            await _fileStorage.DeleteFileAsync(course.ThumbnailUrl, cancellationToken);
        }

        _context.Courses.Remove(course);
        await _context.SaveChangesAsync(cancellationToken);

        _logger.LogInformation("Course deleted: {CourseId}", request.CourseId);

        return new DeleteCourseResponse { Success = true, Message = "Course deleted successfully" };
    }
}
