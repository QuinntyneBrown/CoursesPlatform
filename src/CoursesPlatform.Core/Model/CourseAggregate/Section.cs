namespace CoursesPlatform.Core;

public class Section
{
    public Guid SectionId { get; private set; }

    public Guid CourseId { get; private set; }

    public Course Course { get; private set; } = null!;

    public string Title { get; private set; } = string.Empty;

    public int Order { get; private set; }

    public bool IsPublished { get; private set; }

    public DateTime CreatedAt { get; private set; }

    private readonly List<Lecture> _lectures = [];

    public IReadOnlyCollection<Lecture> Lectures => _lectures.AsReadOnly();

    private Section()
    {
    }

    internal static Section Create(Course course, string title, int order)
    {
        return new Section
        {
            SectionId = Guid.NewGuid(),
            CourseId = course.CourseId,
            Course = course,
            Title = title,
            Order = order,
            IsPublished = false,
            CreatedAt = DateTime.UtcNow,
        };
    }

    public void UpdateTitle(string title)
    {
        Title = title;
    }

    internal void SetOrder(int order)
    {
        Order = order;
    }

    public void Publish()
    {
        IsPublished = true;
    }

    public void Unpublish()
    {
        IsPublished = false;
    }

    public Lecture AddLecture(string title, LectureType type)
    {
        var lecture = Lecture.Create(this, title, type, _lectures.Count + 1);
        _lectures.Add(lecture);
        return lecture;
    }

    public void RemoveLecture(Lecture lecture)
    {
        _lectures.Remove(lecture);
        ReorderLectures();
    }

    private void ReorderLectures()
    {
        for (int i = 0; i < _lectures.Count; i++)
        {
            _lectures[i].SetOrder(i + 1);
        }
    }
}
