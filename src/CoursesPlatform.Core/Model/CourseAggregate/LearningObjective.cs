// Copyright (c) Quinntyne Brown. All Rights Reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

namespace CoursesPlatform.Core;

public class LearningObjective
{
    public Guid LearningObjectiveId { get; set; }

    public Guid CourseId { get; set; }

    public Course Course { get; set; } = null!;

    public string Description { get; set; } = string.Empty;

    public int SortOrder { get; set; }
}
