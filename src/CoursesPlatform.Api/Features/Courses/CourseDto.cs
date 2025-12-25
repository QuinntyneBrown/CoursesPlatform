// Copyright (c) Quinntyne Brown. All Rights Reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

using CoursesPlatform.Core;

namespace CoursesPlatform.Api;

public class CourseDto
{
    public Guid CourseId { get; set; }

    public string Title { get; set; } = string.Empty;

    public string? Subtitle { get; set; }

    public string? Description { get; set; }

    public string? ThumbnailUrl { get; set; }

    public CourseStatus Status { get; set; }

    public CourseLevel Level { get; set; }

    public string? Language { get; set; }

    public Guid? CategoryId { get; set; }

    public string? CategoryName { get; set; }

    public Guid InstructorId { get; set; }

    public string? InstructorName { get; set; }

    public DateTime CreatedAt { get; set; }

    public DateTime? UpdatedAt { get; set; }

    public DateTime? PublishedAt { get; set; }

    public List<LearningObjectiveDto> LearningObjectives { get; set; } = new();
}

public class LearningObjectiveDto
{
    public Guid LearningObjectiveId { get; set; }

    public string Description { get; set; } = string.Empty;

    public int SortOrder { get; set; }
}
