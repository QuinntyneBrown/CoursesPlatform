// Copyright (c) Quinntyne Brown. All Rights Reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

using CoursesPlatform.Core;

namespace CoursesPlatform.Api;

public static class DtoExtensions
{
    public static UserDto ToDto(this User user)
    {
        return new UserDto
        {
            UserId = user.UserId,
            Email = user.Email,
            FirstName = user.FirstName,
            LastName = user.LastName,
            Biography = user.Biography,
            Headline = user.Headline,
            AvatarUrl = user.AvatarUrl
        };
    }

    public static CourseDto ToDto(this Course course)
    {
        return new CourseDto
        {
            CourseId = course.CourseId,
            Title = course.Title,
            Subtitle = course.Subtitle,
            Description = course.Description,
            ThumbnailUrl = course.ThumbnailUrl,
            Status = course.Status,
            Level = course.Level,
            Language = course.Language,
            CategoryId = course.CategoryId,
            CategoryName = course.Category?.Name,
            InstructorId = course.InstructorId,
            InstructorName = course.Instructor != null ? $"{course.Instructor.FirstName} {course.Instructor.LastName}" : null,
            CreatedAt = course.CreatedAt,
            UpdatedAt = course.UpdatedAt,
            PublishedAt = course.PublishedAt,
            LearningObjectives = course.LearningObjectives?.Select(lo => lo.ToDto()).ToList() ?? new()
        };
    }

    public static LearningObjectiveDto ToDto(this LearningObjective objective)
    {
        return new LearningObjectiveDto
        {
            LearningObjectiveId = objective.LearningObjectiveId,
            Description = objective.Description,
            SortOrder = objective.SortOrder
        };
    }

    public static CategoryDto ToDto(this Category category)
    {
        return new CategoryDto
        {
            CategoryId = category.CategoryId,
            Name = category.Name,
            Description = category.Description,
            Subcategories = category.Subcategories?.Select(c => c.ToDto()).ToList() ?? new()
        };
    }
}
