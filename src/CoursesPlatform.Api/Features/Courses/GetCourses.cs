// Copyright (c) Quinntyne Brown. All Rights Reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

using CoursesPlatform.Core;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace CoursesPlatform.Api;

public class GetCoursesRequest : IRequest<GetCoursesResponse>
{
    public Guid? InstructorId { get; set; }

    public CourseStatus? Status { get; set; }

    public Guid? CategoryId { get; set; }

    public int Page { get; set; } = 1;

    public int PageSize { get; set; } = 10;
}

public class GetCoursesResponse
{
    public List<CourseDto> Courses { get; set; } = new();

    public int TotalCount { get; set; }

    public int Page { get; set; }

    public int PageSize { get; set; }
}

public class GetCoursesHandler : IRequestHandler<GetCoursesRequest, GetCoursesResponse>
{
    private readonly ICoursesPlatformContext _context;

    public GetCoursesHandler(ICoursesPlatformContext context)
    {
        _context = context;
    }

    public async Task<GetCoursesResponse> Handle(GetCoursesRequest request, CancellationToken cancellationToken)
    {
        var query = _context.Courses
            .Include(c => c.LearningObjectives.OrderBy(lo => lo.SortOrder))
            .Include(c => c.Category)
            .Include(c => c.Instructor)
            .AsQueryable();

        if (request.InstructorId.HasValue)
        {
            query = query.Where(c => c.InstructorId == request.InstructorId.Value);
        }

        if (request.Status.HasValue)
        {
            query = query.Where(c => c.Status == request.Status.Value);
        }

        if (request.CategoryId.HasValue)
        {
            query = query.Where(c => c.CategoryId == request.CategoryId.Value);
        }

        var totalCount = await query.CountAsync(cancellationToken);

        var courses = await query
            .OrderByDescending(c => c.UpdatedAt ?? c.CreatedAt)
            .Skip((request.Page - 1) * request.PageSize)
            .Take(request.PageSize)
            .ToListAsync(cancellationToken);

        return new GetCoursesResponse
        {
            Courses = courses.Select(c => c.ToDto()).ToList(),
            TotalCount = totalCount,
            Page = request.Page,
            PageSize = request.PageSize
        };
    }
}
