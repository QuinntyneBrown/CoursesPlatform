// Copyright (c) Quinntyne Brown. All Rights Reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

namespace CoursesPlatform.Core;

public class Course
{
    public Guid CourseId { get; set; }

    public string Title { get; set; } = string.Empty;

    public string? Subtitle { get; set; }

    public string? Description { get; set; }

    public string? ThumbnailUrl { get; set; }

    public CourseStatus Status { get; set; } = CourseStatus.Draft;

    public CourseLevel Level { get; set; } = CourseLevel.AllLevels;

    public string? Language { get; set; }

    public Guid? CategoryId { get; set; }

    public Category? Category { get; set; }

    public Guid InstructorId { get; set; }

    public User Instructor { get; set; } = null!;

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public DateTime? UpdatedAt { get; set; }

    public DateTime? PublishedAt { get; set; }

    public ICollection<LearningObjective> LearningObjectives { get; set; } = new List<LearningObjective>();

    public bool CanPublish => Status == CourseStatus.Draft && !string.IsNullOrEmpty(Title) && !string.IsNullOrEmpty(Description);

    public bool CanUnpublish => Status == CourseStatus.Published;

    public bool CanDelete => Status == CourseStatus.Draft;
}
