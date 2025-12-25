namespace CoursesPlatform.Infrastructure;

using CoursesPlatform.Core;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

public class LectureProgressConfiguration : IEntityTypeConfiguration<LectureProgress>
{
    public void Configure(EntityTypeBuilder<LectureProgress> builder)
    {
        builder.HasKey(lp => lp.LectureProgressId);

        builder.HasOne(lp => lp.Lecture)
            .WithMany()
            .HasForeignKey(lp => lp.LectureId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasIndex(lp => new { lp.EnrollmentId, lp.LectureId })
            .IsUnique();
    }
}
