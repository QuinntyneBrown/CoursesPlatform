namespace CoursesPlatform.Api;

using CoursesPlatform.Core;

public static class ReviewExtensions
{
    public static ReviewDto ToDto(this Review review)
    {
        return new ReviewDto(
            review.ReviewId,
            review.UserId,
            review.CourseId,
            review.Rating,
            review.Content,
            review.Status.ToString(),
            review.CreatedAt,
            review.HelpfulCount,
            review.InstructorResponse,
            review.InstructorResponseAt);
    }
}
