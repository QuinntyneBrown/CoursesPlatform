namespace CoursesPlatform.Core;

public class Review
{
    public Guid ReviewId { get; private set; }

    public Guid UserId { get; private set; }

    public User User { get; private set; } = null!;

    public Guid CourseId { get; private set; }

    public Course Course { get; private set; } = null!;

    public int Rating { get; private set; }

    public string? Content { get; private set; }

    public ReviewStatus Status { get; private set; }

    public DateTime CreatedAt { get; private set; }

    public DateTime? UpdatedAt { get; private set; }

    public int HelpfulCount { get; private set; }

    public string? InstructorResponse { get; private set; }

    public DateTime? InstructorResponseAt { get; private set; }

    private Review()
    {
    }

    public static Review Create(User user, Course course, int rating, string? content)
    {
        if (rating < 1 || rating > 5)
        {
            throw new ArgumentException("Rating must be between 1 and 5.", nameof(rating));
        }

        return new Review
        {
            ReviewId = Guid.NewGuid(),
            UserId = user.UserId,
            User = user,
            CourseId = course.CourseId,
            Course = course,
            Rating = rating,
            Content = content,
            Status = ReviewStatus.Pending,
            CreatedAt = DateTime.UtcNow,
            HelpfulCount = 0,
        };
    }

    public void Update(int rating, string? content)
    {
        if (rating < 1 || rating > 5)
        {
            throw new ArgumentException("Rating must be between 1 and 5.", nameof(rating));
        }

        Rating = rating;
        Content = content;
        UpdatedAt = DateTime.UtcNow;
        Status = ReviewStatus.Pending;
    }

    public void Approve()
    {
        Status = ReviewStatus.Approved;
    }

    public void Reject()
    {
        Status = ReviewStatus.Rejected;
    }

    public void Flag()
    {
        Status = ReviewStatus.Flagged;
    }

    public void MarkHelpful()
    {
        HelpfulCount++;
    }

    public void AddInstructorResponse(string response)
    {
        InstructorResponse = response;
        InstructorResponseAt = DateTime.UtcNow;
    }

    public void RemoveInstructorResponse()
    {
        InstructorResponse = null;
        InstructorResponseAt = null;
    }
}
