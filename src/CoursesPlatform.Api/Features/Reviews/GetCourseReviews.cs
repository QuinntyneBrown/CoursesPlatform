namespace CoursesPlatform.Api;

using CoursesPlatform.Core;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

public record GetCourseReviewsQuery(Guid CourseId) : IRequest<List<ReviewDto>>;

public class GetCourseReviewsHandler : IRequestHandler<GetCourseReviewsQuery, List<ReviewDto>>
{
    private readonly ICoursesPlatformContext _context;
    private readonly ILogger<GetCourseReviewsHandler> _logger;

    public GetCourseReviewsHandler(ICoursesPlatformContext context, ILogger<GetCourseReviewsHandler> logger)
    {
        _context = context;
        _logger = logger;
    }

    public async Task<List<ReviewDto>> Handle(GetCourseReviewsQuery request, CancellationToken cancellationToken)
    {
        _logger.LogInformation("Getting reviews for course {CourseId}", request.CourseId);

        var reviews = await _context.Reviews
            .Where(r => r.CourseId == request.CourseId && r.Status == ReviewStatus.Approved)
            .ToListAsync(cancellationToken);

        return reviews.Select(r => r.ToDto()).ToList();
    }
}
