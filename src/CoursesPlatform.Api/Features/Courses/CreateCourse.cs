// Copyright (c) Quinntyne Brown. All Rights Reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

using CoursesPlatform.Core;
using FluentValidation;
using MediatR;

namespace CoursesPlatform.Api;

public class CreateCourseRequest : IRequest<CreateCourseResponse>
{
    public Guid InstructorId { get; set; }

    public string Title { get; set; } = string.Empty;

    public string? Subtitle { get; set; }

    public string? Description { get; set; }

    public CourseLevel Level { get; set; } = CourseLevel.AllLevels;

    public string? Language { get; set; }

    public Guid? CategoryId { get; set; }
}

public class CreateCourseResponse
{
    public Guid CourseId { get; set; }

    public CourseDto? Course { get; set; }
}

public class CreateCourseValidator : AbstractValidator<CreateCourseRequest>
{
    public CreateCourseValidator()
    {
        RuleFor(x => x.Title)
            .NotEmpty().WithMessage("Title is required")
            .MinimumLength(10).WithMessage("Title must be at least 10 characters")
            .MaximumLength(200).WithMessage("Title must not exceed 200 characters");

        RuleFor(x => x.Subtitle)
            .MaximumLength(300).WithMessage("Subtitle must not exceed 300 characters");

        RuleFor(x => x.Description)
            .MaximumLength(5000).WithMessage("Description must not exceed 5000 characters");

        RuleFor(x => x.Language)
            .MaximumLength(50).WithMessage("Language must not exceed 50 characters");
    }
}

public class CreateCourseHandler : IRequestHandler<CreateCourseRequest, CreateCourseResponse>
{
    private readonly ICoursesPlatformContext _context;
    private readonly ILogger<CreateCourseHandler> _logger;

    public CreateCourseHandler(ICoursesPlatformContext context, ILogger<CreateCourseHandler> logger)
    {
        _context = context;
        _logger = logger;
    }

    public async Task<CreateCourseResponse> Handle(CreateCourseRequest request, CancellationToken cancellationToken)
    {
        var course = new Course
        {
            CourseId = Guid.NewGuid(),
            InstructorId = request.InstructorId,
            Title = request.Title,
            Subtitle = request.Subtitle,
            Description = request.Description,
            Level = request.Level,
            Language = request.Language,
            CategoryId = request.CategoryId,
            Status = CourseStatus.Draft
        };

        _context.Courses.Add(course);
        await _context.SaveChangesAsync(cancellationToken);

        _logger.LogInformation("Course created: {CourseId} by instructor: {InstructorId}", course.CourseId, request.InstructorId);

        return new CreateCourseResponse
        {
            CourseId = course.CourseId,
            Course = course.ToDto()
        };
    }
}
