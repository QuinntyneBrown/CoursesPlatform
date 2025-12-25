namespace CoursesPlatform.Infrastructure;

using CoursesPlatform.Core;
using Microsoft.EntityFrameworkCore;

public class CoursesPlatformContext : DbContext, ICoursesPlatformContext
{
    public CoursesPlatformContext(DbContextOptions<CoursesPlatformContext> options)
        : base(options)
    {
    }

    public DbSet<User> Users => Set<User>();

    public DbSet<Instructor> Instructors => Set<Instructor>();

    public DbSet<Course> Courses => Set<Course>();

    public DbSet<Section> Sections => Set<Section>();

    public DbSet<Lecture> Lectures => Set<Lecture>();

    public DbSet<Category> Categories => Set<Category>();

    public DbSet<Enrollment> Enrollments => Set<Enrollment>();

    public DbSet<LectureProgress> LectureProgress => Set<LectureProgress>();

    public DbSet<Review> Reviews => Set<Review>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(CoursesPlatformContext).Assembly);
    }
}
