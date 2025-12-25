// Copyright (c) Quinntyne Brown. All Rights Reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

using CoursesPlatform.Core;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace CoursesPlatform.Api;

public class UpdateCourseRequest : IRequest<UpdateCourseResponse>
{
    public Guid CourseId { get; set; }

    public Guid UserId { get; set; }

    public string Title { get; set; } = string.Empty;

    public string? Subtitle { get; set; }

    public string? Description { get; set; }

    public CourseLevel Level { get; set; }

    public string? Language { get; set; }

    public Guid? CategoryId { get; set; }
}

public class UpdateCourseResponse
{
    public bool Success { get; set; }

    public CourseDto? Course { get; set; }

    public string? Error { get; set; }
}

public class UpdateCourseValidator : AbstractValidator<UpdateCourseRequest>
{
    public UpdateCourseValidator()
    {
        RuleFor(x => x.Title)
            .NotEmpty().WithMessage("Title is required")
            .MinimumLength(10).WithMessage("Title must be at least 10 characters")
            .MaximumLength(200).WithMessage("Title must not exceed 200 characters");

        RuleFor(x => x.Subtitle)
            .MaximumLength(300).WithMessage("Subtitle must not exceed 300 characters");

        RuleFor(x => x.Description)
            .MaximumLength(5000).WithMessage("Description must not exceed 5000 characters");
    }
}

public class UpdateCourseHandler : IRequestHandler<UpdateCourseRequest, UpdateCourseResponse>
{
    private readonly ICoursesPlatformContext _context;
    private readonly ILogger<UpdateCourseHandler> _logger;

    public UpdateCourseHandler(ICoursesPlatformContext context, ILogger<UpdateCourseHandler> logger)
    {
        _context = context;
        _logger = logger;
    }

    public async Task<UpdateCourseResponse> Handle(UpdateCourseRequest request, CancellationToken cancellationToken)
    {
        var course = await _context.Courses
            .Include(c => c.LearningObjectives)
            .Include(c => c.Category)
            .FirstOrDefaultAsync(c => c.CourseId == request.CourseId, cancellationToken);

        if (course == null)
        {
            return new UpdateCourseResponse { Success = false, Error = "Course not found" };
        }

        if (course.InstructorId != request.UserId)
        {
            return new UpdateCourseResponse { Success = false, Error = "Not authorized to update this course" };
        }

        course.Title = request.Title;
        course.Subtitle = request.Subtitle;
        course.Description = request.Description;
        course.Level = request.Level;
        course.Language = request.Language;
        course.CategoryId = request.CategoryId;
        course.UpdatedAt = DateTime.UtcNow;

        await _context.SaveChangesAsync(cancellationToken);

        _logger.LogInformation("Course updated: {CourseId}", course.CourseId);

        return new UpdateCourseResponse { Success = true, Course = course.ToDto() };
    }
}
