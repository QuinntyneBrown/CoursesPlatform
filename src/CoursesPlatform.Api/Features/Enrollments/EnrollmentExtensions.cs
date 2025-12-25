namespace CoursesPlatform.Api;

using CoursesPlatform.Core;

public static class EnrollmentExtensions
{
    public static EnrollmentDto ToDto(this Enrollment enrollment)
    {
        return new EnrollmentDto(
            enrollment.EnrollmentId,
            enrollment.UserId,
            enrollment.CourseId,
            enrollment.Status.ToString(),
            enrollment.EnrolledAt,
            enrollment.CompletedAt,
            enrollment.ProgressPercentage);
    }
}
