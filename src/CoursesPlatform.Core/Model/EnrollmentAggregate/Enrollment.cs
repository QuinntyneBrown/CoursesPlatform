namespace CoursesPlatform.Core;

public class Enrollment
{
    public Guid EnrollmentId { get; private set; }

    public Guid UserId { get; private set; }

    public User User { get; private set; } = null!;

    public Guid CourseId { get; private set; }

    public Course Course { get; private set; } = null!;

    public EnrollmentStatus Status { get; private set; }

    public DateTime EnrolledAt { get; private set; }

    public DateTime? CompletedAt { get; private set; }

    public DateTime? LastAccessedAt { get; private set; }

    public int ProgressPercentage { get; private set; }

    private readonly List<LectureProgress> _lectureProgress = [];

    public IReadOnlyCollection<LectureProgress> LectureProgress => _lectureProgress.AsReadOnly();

    private Enrollment()
    {
    }

    public static Enrollment Create(User user, Course course)
    {
        return new Enrollment
        {
            EnrollmentId = Guid.NewGuid(),
            UserId = user.UserId,
            User = user,
            CourseId = course.CourseId,
            Course = course,
            Status = EnrollmentStatus.Active,
            EnrolledAt = DateTime.UtcNow,
            ProgressPercentage = 0,
        };
    }

    public void RecordAccess()
    {
        LastAccessedAt = DateTime.UtcNow;
    }

    public void UpdateProgress(int progressPercentage)
    {
        ProgressPercentage = progressPercentage;

        if (progressPercentage >= 100 && Status != EnrollmentStatus.Completed)
        {
            Status = EnrollmentStatus.Completed;
            CompletedAt = DateTime.UtcNow;
        }
    }

    public LectureProgress StartLecture(Lecture lecture)
    {
        var existingProgress = _lectureProgress.FirstOrDefault(lp => lp.LectureId == lecture.LectureId);
        if (existingProgress != null)
        {
            return existingProgress;
        }

        var progress = CoursesPlatform.Core.LectureProgress.Create(this, lecture);
        _lectureProgress.Add(progress);
        return progress;
    }

    public void CompleteLecture(Guid lectureId)
    {
        var progress = _lectureProgress.FirstOrDefault(lp => lp.LectureId == lectureId);
        progress?.Complete();
        RecalculateProgress();
    }

    public void Suspend()
    {
        Status = EnrollmentStatus.Suspended;
    }

    public void Reactivate()
    {
        Status = EnrollmentStatus.Active;
    }

    public void Refund()
    {
        Status = EnrollmentStatus.Refunded;
    }

    private void RecalculateProgress()
    {
        if (_lectureProgress.Count == 0)
        {
            ProgressPercentage = 0;
            return;
        }

        var completedCount = _lectureProgress.Count(lp => lp.IsCompleted);
        ProgressPercentage = (completedCount * 100) / _lectureProgress.Count;

        if (ProgressPercentage >= 100 && Status != EnrollmentStatus.Completed)
        {
            Status = EnrollmentStatus.Completed;
            CompletedAt = DateTime.UtcNow;
        }
    }
}
