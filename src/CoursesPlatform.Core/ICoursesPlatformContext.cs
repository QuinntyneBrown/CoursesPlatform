namespace CoursesPlatform.Core;

using Microsoft.EntityFrameworkCore;

public interface ICoursesPlatformContext
{
    DbSet<User> Users { get; }

    DbSet<Instructor> Instructors { get; }

    DbSet<Course> Courses { get; }

    DbSet<Section> Sections { get; }

    DbSet<Lecture> Lectures { get; }

    DbSet<Category> Categories { get; }

    DbSet<Enrollment> Enrollments { get; }

    DbSet<LectureProgress> LectureProgress { get; }

    DbSet<Review> Reviews { get; }

    Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);
}
