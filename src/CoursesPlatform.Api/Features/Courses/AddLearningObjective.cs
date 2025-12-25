// Copyright (c) Quinntyne Brown. All Rights Reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

using CoursesPlatform.Core;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace CoursesPlatform.Api;

public class AddLearningObjectiveRequest : IRequest<AddLearningObjectiveResponse>
{
    public Guid CourseId { get; set; }

    public Guid UserId { get; set; }

    public string Description { get; set; } = string.Empty;
}

public class AddLearningObjectiveResponse
{
    public bool Success { get; set; }

    public LearningObjectiveDto? Objective { get; set; }

    public string? Error { get; set; }
}

public class AddLearningObjectiveValidator : AbstractValidator<AddLearningObjectiveRequest>
{
    public AddLearningObjectiveValidator()
    {
        RuleFor(x => x.Description)
            .NotEmpty().WithMessage("Description is required")
            .MinimumLength(10).WithMessage("Description must be at least 10 characters")
            .MaximumLength(200).WithMessage("Description must not exceed 200 characters");
    }
}

public class AddLearningObjectiveHandler : IRequestHandler<AddLearningObjectiveRequest, AddLearningObjectiveResponse>
{
    private readonly ICoursesPlatformContext _context;
    private readonly ILogger<AddLearningObjectiveHandler> _logger;

    public AddLearningObjectiveHandler(ICoursesPlatformContext context, ILogger<AddLearningObjectiveHandler> logger)
    {
        _context = context;
        _logger = logger;
    }

    public async Task<AddLearningObjectiveResponse> Handle(AddLearningObjectiveRequest request, CancellationToken cancellationToken)
    {
        var course = await _context.Courses
            .Include(c => c.LearningObjectives)
            .FirstOrDefaultAsync(c => c.CourseId == request.CourseId, cancellationToken);

        if (course == null)
        {
            return new AddLearningObjectiveResponse { Success = false, Error = "Course not found" };
        }

        if (course.InstructorId != request.UserId)
        {
            return new AddLearningObjectiveResponse { Success = false, Error = "Not authorized" };
        }

        if (course.LearningObjectives.Count >= 10)
        {
            return new AddLearningObjectiveResponse { Success = false, Error = "Maximum 10 objectives allowed" };
        }

        var maxOrder = course.LearningObjectives.Any()
            ? course.LearningObjectives.Max(o => o.SortOrder)
            : 0;

        var objective = new LearningObjective
        {
            LearningObjectiveId = Guid.NewGuid(),
            CourseId = request.CourseId,
            Description = request.Description,
            SortOrder = maxOrder + 1
        };

        _context.LearningObjectives.Add(objective);
        course.UpdatedAt = DateTime.UtcNow;
        await _context.SaveChangesAsync(cancellationToken);

        _logger.LogInformation("Learning objective added to course: {CourseId}", request.CourseId);

        return new AddLearningObjectiveResponse
        {
            Success = true,
            Objective = objective.ToDto()
        };
    }
}
