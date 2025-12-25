// Copyright (c) Quinntyne Brown. All Rights Reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

using Microsoft.EntityFrameworkCore;

namespace CoursesPlatform.Core;

public interface ICoursesPlatformContext
{
    DbSet<User> Users { get; }

    DbSet<UserSession> UserSessions { get; }

    DbSet<Course> Courses { get; }

    DbSet<Category> Categories { get; }

    DbSet<LearningObjective> LearningObjectives { get; }

    Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);
}
