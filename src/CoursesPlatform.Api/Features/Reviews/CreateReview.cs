namespace CoursesPlatform.Api;

using CoursesPlatform.Core;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

public record CreateReviewCommand(Guid UserId, Guid CourseId, int Rating, string? Content) : IRequest<ReviewDto>;

public class CreateReviewHandler : IRequestHandler<CreateReviewCommand, ReviewDto>
{
    private readonly ICoursesPlatformContext _context;
    private readonly ILogger<CreateReviewHandler> _logger;

    public CreateReviewHandler(ICoursesPlatformContext context, ILogger<CreateReviewHandler> logger)
    {
        _context = context;
        _logger = logger;
    }

    public async Task<ReviewDto> Handle(CreateReviewCommand request, CancellationToken cancellationToken)
    {
        _logger.LogInformation("Creating review for course {CourseId} by user {UserId}", request.CourseId, request.UserId);

        var user = await _context.Users
            .FirstOrDefaultAsync(u => u.UserId == request.UserId, cancellationToken)
            ?? throw new InvalidOperationException($"User with ID {request.UserId} not found.");

        var course = await _context.Courses
            .FirstOrDefaultAsync(c => c.CourseId == request.CourseId, cancellationToken)
            ?? throw new InvalidOperationException($"Course with ID {request.CourseId} not found.");

        var existingReview = await _context.Reviews
            .FirstOrDefaultAsync(r => r.UserId == request.UserId && r.CourseId == request.CourseId, cancellationToken);

        if (existingReview != null)
        {
            throw new InvalidOperationException("User has already reviewed this course.");
        }

        var review = Review.Create(user, course, request.Rating, request.Content);

        _context.Reviews.Add(review);
        await _context.SaveChangesAsync(cancellationToken);

        _logger.LogInformation("Review created with ID {ReviewId}", review.ReviewId);

        return review.ToDto();
    }
}
