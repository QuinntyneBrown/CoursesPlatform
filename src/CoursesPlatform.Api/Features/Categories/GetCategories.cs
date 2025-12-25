// Copyright (c) Quinntyne Brown. All Rights Reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

using CoursesPlatform.Core;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace CoursesPlatform.Api;

public class GetCategoriesRequest : IRequest<GetCategoriesResponse>
{
}

public class GetCategoriesResponse
{
    public List<CategoryDto> Categories { get; set; } = new();
}

public class GetCategoriesHandler : IRequestHandler<GetCategoriesRequest, GetCategoriesResponse>
{
    private readonly ICoursesPlatformContext _context;

    public GetCategoriesHandler(ICoursesPlatformContext context)
    {
        _context = context;
    }

    public async Task<GetCategoriesResponse> Handle(GetCategoriesRequest request, CancellationToken cancellationToken)
    {
        var categories = await _context.Categories
            .Include(c => c.Subcategories)
            .Where(c => c.ParentCategoryId == null)
            .OrderBy(c => c.Name)
            .ToListAsync(cancellationToken);

        return new GetCategoriesResponse
        {
            Categories = categories.Select(c => c.ToDto()).ToList()
        };
    }
}
