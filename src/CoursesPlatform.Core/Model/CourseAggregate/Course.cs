namespace CoursesPlatform.Core;

public class Course
{
    public Guid CourseId { get; private set; }

    public Guid InstructorId { get; private set; }

    public Instructor Instructor { get; private set; } = null!;

    public string Title { get; private set; } = string.Empty;

    public string? Subtitle { get; private set; }

    public string Description { get; private set; } = string.Empty;

    public string? ThumbnailUrl { get; private set; }

    public string? PromoVideoUrl { get; private set; }

    public string Language { get; private set; } = "en";

    public CourseLevel Level { get; private set; }

    public CourseStatus Status { get; private set; }

    public Guid? CategoryId { get; private set; }

    public Category? Category { get; private set; }

    public decimal Price { get; private set; }

    public string Currency { get; private set; } = "USD";

    public bool IsFree { get; private set; }

    public bool CertificateEnabled { get; private set; }

    public DateTime CreatedAt { get; private set; }

    public DateTime? PublishedAt { get; private set; }

    public DateTime? LastUpdatedAt { get; private set; }

    private readonly List<Section> _sections = [];

    public IReadOnlyCollection<Section> Sections => _sections.AsReadOnly();

    private readonly List<string> _learningObjectives = [];

    public IReadOnlyCollection<string> LearningObjectives => _learningObjectives.AsReadOnly();

    private readonly List<string> _prerequisites = [];

    public IReadOnlyCollection<string> Prerequisites => _prerequisites.AsReadOnly();

    private readonly List<string> _targetAudience = [];

    public IReadOnlyCollection<string> TargetAudience => _targetAudience.AsReadOnly();

    private readonly List<string> _tags = [];

    public IReadOnlyCollection<string> Tags => _tags.AsReadOnly();

    private Course()
    {
    }

    public static Course CreateDraft(Instructor instructor, string title, string description)
    {
        return new Course
        {
            CourseId = Guid.NewGuid(),
            InstructorId = instructor.InstructorId,
            Instructor = instructor,
            Title = title,
            Description = description,
            Status = CourseStatus.Draft,
            Level = CourseLevel.Beginner,
            IsFree = false,
            CertificateEnabled = false,
            CreatedAt = DateTime.UtcNow,
        };
    }

    public void UpdateTitle(string title)
    {
        Title = title;
        LastUpdatedAt = DateTime.UtcNow;
    }

    public void UpdateSubtitle(string? subtitle)
    {
        Subtitle = subtitle;
        LastUpdatedAt = DateTime.UtcNow;
    }

    public void UpdateDescription(string description)
    {
        Description = description;
        LastUpdatedAt = DateTime.UtcNow;
    }

    public void SetThumbnail(string thumbnailUrl)
    {
        ThumbnailUrl = thumbnailUrl;
        LastUpdatedAt = DateTime.UtcNow;
    }

    public void RemoveThumbnail()
    {
        ThumbnailUrl = null;
        LastUpdatedAt = DateTime.UtcNow;
    }

    public void SetPromoVideo(string promoVideoUrl)
    {
        PromoVideoUrl = promoVideoUrl;
        LastUpdatedAt = DateTime.UtcNow;
    }

    public void RemovePromoVideo()
    {
        PromoVideoUrl = null;
        LastUpdatedAt = DateTime.UtcNow;
    }

    public void SetLanguage(string language)
    {
        Language = language;
        LastUpdatedAt = DateTime.UtcNow;
    }

    public void SetLevel(CourseLevel level)
    {
        Level = level;
        LastUpdatedAt = DateTime.UtcNow;
    }

    public void AssignCategory(Category category)
    {
        CategoryId = category.CategoryId;
        Category = category;
        LastUpdatedAt = DateTime.UtcNow;
    }

    public void SetPricing(decimal price, string currency, bool isFree)
    {
        Price = price;
        Currency = currency;
        IsFree = isFree;
        LastUpdatedAt = DateTime.UtcNow;
    }

    public void EnableCertificate()
    {
        CertificateEnabled = true;
        LastUpdatedAt = DateTime.UtcNow;
    }

    public void DisableCertificate()
    {
        CertificateEnabled = false;
        LastUpdatedAt = DateTime.UtcNow;
    }

    public void AddLearningObjective(string objective)
    {
        if (!_learningObjectives.Contains(objective))
        {
            _learningObjectives.Add(objective);
            LastUpdatedAt = DateTime.UtcNow;
        }
    }

    public void RemoveLearningObjective(string objective)
    {
        _learningObjectives.Remove(objective);
        LastUpdatedAt = DateTime.UtcNow;
    }

    public void AddPrerequisite(string prerequisite)
    {
        if (!_prerequisites.Contains(prerequisite))
        {
            _prerequisites.Add(prerequisite);
            LastUpdatedAt = DateTime.UtcNow;
        }
    }

    public void RemovePrerequisite(string prerequisite)
    {
        _prerequisites.Remove(prerequisite);
        LastUpdatedAt = DateTime.UtcNow;
    }

    public void AddTargetAudience(string audience)
    {
        if (!_targetAudience.Contains(audience))
        {
            _targetAudience.Add(audience);
            LastUpdatedAt = DateTime.UtcNow;
        }
    }

    public void RemoveTargetAudience(string audience)
    {
        _targetAudience.Remove(audience);
        LastUpdatedAt = DateTime.UtcNow;
    }

    public void AddTag(string tag)
    {
        if (!_tags.Contains(tag))
        {
            _tags.Add(tag);
            LastUpdatedAt = DateTime.UtcNow;
        }
    }

    public void RemoveTag(string tag)
    {
        _tags.Remove(tag);
        LastUpdatedAt = DateTime.UtcNow;
    }

    public Section AddSection(string title)
    {
        var section = Section.Create(this, title, _sections.Count + 1);
        _sections.Add(section);
        LastUpdatedAt = DateTime.UtcNow;
        return section;
    }

    public void RemoveSection(Section section)
    {
        _sections.Remove(section);
        ReorderSections();
        LastUpdatedAt = DateTime.UtcNow;
    }

    public void SubmitForReview()
    {
        if (Status != CourseStatus.Draft)
        {
            throw new InvalidOperationException("Only draft courses can be submitted for review.");
        }

        Status = CourseStatus.PendingReview;
        LastUpdatedAt = DateTime.UtcNow;
    }

    public void Approve()
    {
        if (Status != CourseStatus.PendingReview)
        {
            throw new InvalidOperationException("Only courses pending review can be approved.");
        }

        Status = CourseStatus.Approved;
        LastUpdatedAt = DateTime.UtcNow;
    }

    public void Reject()
    {
        if (Status != CourseStatus.PendingReview)
        {
            throw new InvalidOperationException("Only courses pending review can be rejected.");
        }

        Status = CourseStatus.Rejected;
        LastUpdatedAt = DateTime.UtcNow;
    }

    public void Publish()
    {
        if (Status != CourseStatus.Approved && Status != CourseStatus.Unpublished)
        {
            throw new InvalidOperationException("Only approved or unpublished courses can be published.");
        }

        Status = CourseStatus.Published;
        PublishedAt = DateTime.UtcNow;
        LastUpdatedAt = DateTime.UtcNow;
    }

    public void Unpublish()
    {
        if (Status != CourseStatus.Published)
        {
            throw new InvalidOperationException("Only published courses can be unpublished.");
        }

        Status = CourseStatus.Unpublished;
        LastUpdatedAt = DateTime.UtcNow;
    }

    public void Archive()
    {
        Status = CourseStatus.Archived;
        LastUpdatedAt = DateTime.UtcNow;
    }

    private void ReorderSections()
    {
        for (int i = 0; i < _sections.Count; i++)
        {
            _sections[i].SetOrder(i + 1);
        }
    }
}
