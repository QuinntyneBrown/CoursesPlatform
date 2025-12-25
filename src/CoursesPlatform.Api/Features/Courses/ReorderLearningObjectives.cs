// Copyright (c) Quinntyne Brown. All Rights Reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

using CoursesPlatform.Core;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace CoursesPlatform.Api;

public class ReorderLearningObjectivesRequest : IRequest<ReorderLearningObjectivesResponse>
{
    public Guid CourseId { get; set; }

    public Guid UserId { get; set; }

    public List<Guid> ObjectiveIds { get; set; } = new();
}

public class ReorderLearningObjectivesResponse
{
    public bool Success { get; set; }

    public List<LearningObjectiveDto> Objectives { get; set; } = new();

    public string? Error { get; set; }
}

public class ReorderLearningObjectivesHandler : IRequestHandler<ReorderLearningObjectivesRequest, ReorderLearningObjectivesResponse>
{
    private readonly ICoursesPlatformContext _context;
    private readonly ILogger<ReorderLearningObjectivesHandler> _logger;

    public ReorderLearningObjectivesHandler(ICoursesPlatformContext context, ILogger<ReorderLearningObjectivesHandler> logger)
    {
        _context = context;
        _logger = logger;
    }

    public async Task<ReorderLearningObjectivesResponse> Handle(ReorderLearningObjectivesRequest request, CancellationToken cancellationToken)
    {
        var course = await _context.Courses
            .Include(c => c.LearningObjectives)
            .FirstOrDefaultAsync(c => c.CourseId == request.CourseId, cancellationToken);

        if (course == null)
        {
            return new ReorderLearningObjectivesResponse { Success = false, Error = "Course not found" };
        }

        if (course.InstructorId != request.UserId)
        {
            return new ReorderLearningObjectivesResponse { Success = false, Error = "Not authorized" };
        }

        for (int i = 0; i < request.ObjectiveIds.Count; i++)
        {
            var objective = course.LearningObjectives.FirstOrDefault(o => o.LearningObjectiveId == request.ObjectiveIds[i]);
            if (objective != null)
            {
                objective.SortOrder = i + 1;
            }
        }

        course.UpdatedAt = DateTime.UtcNow;
        await _context.SaveChangesAsync(cancellationToken);

        _logger.LogInformation("Learning objectives reordered for course: {CourseId}", request.CourseId);

        return new ReorderLearningObjectivesResponse
        {
            Success = true,
            Objectives = course.LearningObjectives.OrderBy(o => o.SortOrder).Select(o => o.ToDto()).ToList()
        };
    }
}
