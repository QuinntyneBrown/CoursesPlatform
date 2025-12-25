// Copyright (c) Quinntyne Brown. All Rights Reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

using CoursesPlatform.Core;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace CoursesPlatform.Api;

public class UpdateLearningObjectiveRequest : IRequest<UpdateLearningObjectiveResponse>
{
    public Guid CourseId { get; set; }

    public Guid ObjectiveId { get; set; }

    public Guid UserId { get; set; }

    public string Description { get; set; } = string.Empty;
}

public class UpdateLearningObjectiveResponse
{
    public bool Success { get; set; }

    public LearningObjectiveDto? Objective { get; set; }

    public string? Error { get; set; }
}

public class UpdateLearningObjectiveValidator : AbstractValidator<UpdateLearningObjectiveRequest>
{
    public UpdateLearningObjectiveValidator()
    {
        RuleFor(x => x.Description)
            .NotEmpty().WithMessage("Description is required")
            .MinimumLength(10).WithMessage("Description must be at least 10 characters")
            .MaximumLength(200).WithMessage("Description must not exceed 200 characters");
    }
}

public class UpdateLearningObjectiveHandler : IRequestHandler<UpdateLearningObjectiveRequest, UpdateLearningObjectiveResponse>
{
    private readonly ICoursesPlatformContext _context;
    private readonly ILogger<UpdateLearningObjectiveHandler> _logger;

    public UpdateLearningObjectiveHandler(ICoursesPlatformContext context, ILogger<UpdateLearningObjectiveHandler> logger)
    {
        _context = context;
        _logger = logger;
    }

    public async Task<UpdateLearningObjectiveResponse> Handle(UpdateLearningObjectiveRequest request, CancellationToken cancellationToken)
    {
        var course = await _context.Courses.FindAsync(new object[] { request.CourseId }, cancellationToken);

        if (course == null)
        {
            return new UpdateLearningObjectiveResponse { Success = false, Error = "Course not found" };
        }

        if (course.InstructorId != request.UserId)
        {
            return new UpdateLearningObjectiveResponse { Success = false, Error = "Not authorized" };
        }

        var objective = await _context.LearningObjectives
            .FirstOrDefaultAsync(o => o.LearningObjectiveId == request.ObjectiveId && o.CourseId == request.CourseId, cancellationToken);

        if (objective == null)
        {
            return new UpdateLearningObjectiveResponse { Success = false, Error = "Objective not found" };
        }

        objective.Description = request.Description;
        course.UpdatedAt = DateTime.UtcNow;

        await _context.SaveChangesAsync(cancellationToken);

        _logger.LogInformation("Learning objective updated: {ObjectiveId}", request.ObjectiveId);

        return new UpdateLearningObjectiveResponse { Success = true, Objective = objective.ToDto() };
    }
}
