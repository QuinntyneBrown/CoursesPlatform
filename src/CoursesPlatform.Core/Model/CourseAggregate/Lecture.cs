namespace CoursesPlatform.Core;

public class Lecture
{
    public Guid LectureId { get; private set; }

    public Guid SectionId { get; private set; }

    public Section Section { get; private set; } = null!;

    public string Title { get; private set; } = string.Empty;

    public string? Description { get; private set; }

    public LectureType Type { get; private set; }

    public int Order { get; private set; }

    public bool IsPublished { get; private set; }

    public bool IsPreview { get; private set; }

    public string? ContentUrl { get; private set; }

    public int? DurationInSeconds { get; private set; }

    public DateTime CreatedAt { get; private set; }

    private Lecture()
    {
    }

    internal static Lecture Create(Section section, string title, LectureType type, int order)
    {
        return new Lecture
        {
            LectureId = Guid.NewGuid(),
            SectionId = section.SectionId,
            Section = section,
            Title = title,
            Type = type,
            Order = order,
            IsPublished = false,
            IsPreview = false,
            CreatedAt = DateTime.UtcNow,
        };
    }

    public void UpdateTitle(string title)
    {
        Title = title;
    }

    public void UpdateDescription(string? description)
    {
        Description = description;
    }

    internal void SetOrder(int order)
    {
        Order = order;
    }

    public void SetContent(string contentUrl, int? durationInSeconds = null)
    {
        ContentUrl = contentUrl;
        DurationInSeconds = durationInSeconds;
    }

    public void Publish()
    {
        IsPublished = true;
    }

    public void Unpublish()
    {
        IsPublished = false;
    }

    public void EnablePreview()
    {
        IsPreview = true;
    }

    public void DisablePreview()
    {
        IsPreview = false;
    }
}
