// Copyright (c) Quinntyne Brown. All Rights Reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

using CoursesPlatform.Core;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace CoursesPlatform.Api;

public class DeleteLearningObjectiveRequest : IRequest<DeleteLearningObjectiveResponse>
{
    public Guid CourseId { get; set; }

    public Guid ObjectiveId { get; set; }

    public Guid UserId { get; set; }
}

public class DeleteLearningObjectiveResponse
{
    public bool Success { get; set; }

    public string Message { get; set; } = string.Empty;
}

public class DeleteLearningObjectiveHandler : IRequestHandler<DeleteLearningObjectiveRequest, DeleteLearningObjectiveResponse>
{
    private readonly ICoursesPlatformContext _context;
    private readonly ILogger<DeleteLearningObjectiveHandler> _logger;

    public DeleteLearningObjectiveHandler(ICoursesPlatformContext context, ILogger<DeleteLearningObjectiveHandler> logger)
    {
        _context = context;
        _logger = logger;
    }

    public async Task<DeleteLearningObjectiveResponse> Handle(DeleteLearningObjectiveRequest request, CancellationToken cancellationToken)
    {
        var course = await _context.Courses.FindAsync(new object[] { request.CourseId }, cancellationToken);

        if (course == null)
        {
            return new DeleteLearningObjectiveResponse { Success = false, Message = "Course not found" };
        }

        if (course.InstructorId != request.UserId)
        {
            return new DeleteLearningObjectiveResponse { Success = false, Message = "Not authorized" };
        }

        var objective = await _context.LearningObjectives
            .FirstOrDefaultAsync(o => o.LearningObjectiveId == request.ObjectiveId && o.CourseId == request.CourseId, cancellationToken);

        if (objective == null)
        {
            return new DeleteLearningObjectiveResponse { Success = false, Message = "Objective not found" };
        }

        _context.LearningObjectives.Remove(objective);
        course.UpdatedAt = DateTime.UtcNow;

        await _context.SaveChangesAsync(cancellationToken);

        _logger.LogInformation("Learning objective deleted: {ObjectiveId}", request.ObjectiveId);

        return new DeleteLearningObjectiveResponse { Success = true, Message = "Objective deleted successfully" };
    }
}
