namespace CoursesPlatform.Core;

public class LectureProgress
{
    public Guid LectureProgressId { get; private set; }

    public Guid EnrollmentId { get; private set; }

    public Enrollment Enrollment { get; private set; } = null!;

    public Guid LectureId { get; private set; }

    public Lecture Lecture { get; private set; } = null!;

    public bool IsCompleted { get; private set; }

    public int WatchedSeconds { get; private set; }

    public DateTime StartedAt { get; private set; }

    public DateTime? CompletedAt { get; private set; }

    public DateTime LastAccessedAt { get; private set; }

    private LectureProgress()
    {
    }

    internal static LectureProgress Create(Enrollment enrollment, Lecture lecture)
    {
        return new LectureProgress
        {
            LectureProgressId = Guid.NewGuid(),
            EnrollmentId = enrollment.EnrollmentId,
            Enrollment = enrollment,
            LectureId = lecture.LectureId,
            Lecture = lecture,
            IsCompleted = false,
            WatchedSeconds = 0,
            StartedAt = DateTime.UtcNow,
            LastAccessedAt = DateTime.UtcNow,
        };
    }

    public void UpdateWatchedSeconds(int seconds)
    {
        WatchedSeconds = seconds;
        LastAccessedAt = DateTime.UtcNow;
    }

    public void Complete()
    {
        IsCompleted = true;
        CompletedAt = DateTime.UtcNow;
        LastAccessedAt = DateTime.UtcNow;
    }
}
