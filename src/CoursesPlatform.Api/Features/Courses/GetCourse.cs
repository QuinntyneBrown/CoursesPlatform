// Copyright (c) Quinntyne Brown. All Rights Reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

using CoursesPlatform.Core;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace CoursesPlatform.Api;

public class GetCourseRequest : IRequest<GetCourseResponse>
{
    public Guid CourseId { get; set; }
}

public class GetCourseResponse
{
    public CourseDto? Course { get; set; }
}

public class GetCourseHandler : IRequestHandler<GetCourseRequest, GetCourseResponse>
{
    private readonly ICoursesPlatformContext _context;

    public GetCourseHandler(ICoursesPlatformContext context)
    {
        _context = context;
    }

    public async Task<GetCourseResponse> Handle(GetCourseRequest request, CancellationToken cancellationToken)
    {
        var course = await _context.Courses
            .Include(c => c.LearningObjectives.OrderBy(lo => lo.SortOrder))
            .Include(c => c.Category)
            .Include(c => c.Instructor)
            .FirstOrDefaultAsync(c => c.CourseId == request.CourseId, cancellationToken);

        return new GetCourseResponse { Course = course?.ToDto() };
    }
}
