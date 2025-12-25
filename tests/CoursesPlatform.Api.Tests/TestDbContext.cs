// Copyright (c) Quinntyne Brown. All Rights Reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

using CoursesPlatform.Core;
using Microsoft.EntityFrameworkCore;

namespace CoursesPlatform.Api.Tests;

public class TestDbContext : DbContext, ICoursesPlatformContext
{
    public TestDbContext(DbContextOptions<TestDbContext> options) : base(options)
    {
    }

    public DbSet<User> Users => Set<User>();

    public DbSet<UserSession> UserSessions => Set<UserSession>();

    public DbSet<Course> Courses => Set<Course>();

    public DbSet<Category> Categories => Set<Category>();

    public DbSet<LearningObjective> LearningObjectives => Set<LearningObjective>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<User>().HasKey(u => u.UserId);
        modelBuilder.Entity<UserSession>().HasKey(s => s.UserSessionId);
        modelBuilder.Entity<Course>().HasKey(c => c.CourseId);
        modelBuilder.Entity<Category>().HasKey(c => c.CategoryId);
        modelBuilder.Entity<LearningObjective>().HasKey(l => l.LearningObjectiveId);

        modelBuilder.Entity<User>()
            .HasMany(u => u.Sessions)
            .WithOne(s => s.User)
            .HasForeignKey(s => s.UserId);

        modelBuilder.Entity<Course>()
            .HasMany(c => c.LearningObjectives)
            .WithOne(l => l.Course)
            .HasForeignKey(l => l.CourseId);
    }
}
