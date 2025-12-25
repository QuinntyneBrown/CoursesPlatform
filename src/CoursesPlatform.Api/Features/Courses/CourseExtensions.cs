namespace CoursesPlatform.Api;

using CoursesPlatform.Core;

public static class CourseExtensions
{
    public static CourseDto ToDto(this Course course)
    {
        return new CourseDto(
            course.CourseId,
            course.InstructorId,
            course.Title,
            course.Subtitle,
            course.Description,
            course.ThumbnailUrl,
            course.PromoVideoUrl,
            course.Language,
            course.Level.ToString(),
            course.Status.ToString(),
            course.CategoryId,
            course.Price,
            course.Currency,
            course.IsFree,
            course.CertificateEnabled,
            course.LearningObjectives,
            course.Prerequisites,
            course.TargetAudience,
            course.Tags,
            course.CreatedAt,
            course.PublishedAt);
    }

    public static CourseSummaryDto ToSummaryDto(this Course course)
    {
        return new CourseSummaryDto(
            course.CourseId,
            course.Title,
            course.Subtitle,
            course.ThumbnailUrl,
            course.Level.ToString(),
            course.Status.ToString(),
            course.Price,
            course.Currency,
            course.IsFree);
    }
}
