// Copyright (c) Quinntyne Brown. All Rights Reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

using CoursesPlatform.Core;
using Microsoft.EntityFrameworkCore;

namespace CoursesPlatform.Infrastructure;

public class CoursesPlatformContext : DbContext, ICoursesPlatformContext
{
    public CoursesPlatformContext(DbContextOptions<CoursesPlatformContext> options)
        : base(options)
    {
    }

    public DbSet<User> Users => Set<User>();

    public DbSet<UserSession> UserSessions => Set<UserSession>();

    public DbSet<Course> Courses => Set<Course>();

    public DbSet<Category> Categories => Set<Category>();

    public DbSet<LearningObjective> LearningObjectives => Set<LearningObjective>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(CoursesPlatformContext).Assembly);
    }
}
