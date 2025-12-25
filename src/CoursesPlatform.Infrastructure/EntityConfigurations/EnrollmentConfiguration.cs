namespace CoursesPlatform.Infrastructure;

using CoursesPlatform.Core;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

public class EnrollmentConfiguration : IEntityTypeConfiguration<Enrollment>
{
    public void Configure(EntityTypeBuilder<Enrollment> builder)
    {
        builder.HasKey(e => e.EnrollmentId);

        builder.HasOne(e => e.User)
            .WithMany()
            .HasForeignKey(e => e.UserId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasOne(e => e.Course)
            .WithMany()
            .HasForeignKey(e => e.CourseId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasIndex(e => new { e.UserId, e.CourseId })
            .IsUnique();

        builder.Property(e => e.Status)
            .IsRequired()
            .HasConversion<string>()
            .HasMaxLength(20);

        builder.HasMany(e => e.LectureProgress)
            .WithOne(lp => lp.Enrollment)
            .HasForeignKey(lp => lp.EnrollmentId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}
