namespace CoursesPlatform.Infrastructure;

using CoursesPlatform.Core;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

public class CourseConfiguration : IEntityTypeConfiguration<Course>
{
    public void Configure(EntityTypeBuilder<Course> builder)
    {
        builder.HasKey(c => c.CourseId);

        builder.HasOne(c => c.Instructor)
            .WithMany()
            .HasForeignKey(c => c.InstructorId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasOne(c => c.Category)
            .WithMany()
            .HasForeignKey(c => c.CategoryId)
            .OnDelete(DeleteBehavior.SetNull);

        builder.Property(c => c.Title)
            .IsRequired()
            .HasMaxLength(200);

        builder.Property(c => c.Subtitle)
            .HasMaxLength(300);

        builder.Property(c => c.Description)
            .IsRequired()
            .HasMaxLength(5000);

        builder.Property(c => c.ThumbnailUrl)
            .HasMaxLength(2048);

        builder.Property(c => c.PromoVideoUrl)
            .HasMaxLength(2048);

        builder.Property(c => c.Language)
            .IsRequired()
            .HasMaxLength(10);

        builder.Property(c => c.Level)
            .IsRequired()
            .HasConversion<string>()
            .HasMaxLength(20);

        builder.Property(c => c.Status)
            .IsRequired()
            .HasConversion<string>()
            .HasMaxLength(20);

        builder.Property(c => c.Price)
            .HasPrecision(18, 2);

        builder.Property(c => c.Currency)
            .IsRequired()
            .HasMaxLength(3);

        builder.Property(c => c.LearningObjectives)
            .HasConversion(
                v => string.Join("|||", v),
                v => v.Split("|||", StringSplitOptions.RemoveEmptyEntries).ToList());

        builder.Property(c => c.Prerequisites)
            .HasConversion(
                v => string.Join("|||", v),
                v => v.Split("|||", StringSplitOptions.RemoveEmptyEntries).ToList());

        builder.Property(c => c.TargetAudience)
            .HasConversion(
                v => string.Join("|||", v),
                v => v.Split("|||", StringSplitOptions.RemoveEmptyEntries).ToList());

        builder.Property(c => c.Tags)
            .HasConversion(
                v => string.Join(',', v),
                v => v.Split(',', StringSplitOptions.RemoveEmptyEntries).ToList());

        builder.HasMany(c => c.Sections)
            .WithOne(s => s.Course)
            .HasForeignKey(s => s.CourseId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}
