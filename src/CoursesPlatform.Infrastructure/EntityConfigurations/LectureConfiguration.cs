namespace CoursesPlatform.Infrastructure;

using CoursesPlatform.Core;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

public class LectureConfiguration : IEntityTypeConfiguration<Lecture>
{
    public void Configure(EntityTypeBuilder<Lecture> builder)
    {
        builder.HasKey(l => l.LectureId);

        builder.Property(l => l.Title)
            .IsRequired()
            .HasMaxLength(200);

        builder.Property(l => l.Description)
            .HasMaxLength(2000);

        builder.Property(l => l.Type)
            .IsRequired()
            .HasConversion<string>()
            .HasMaxLength(20);

        builder.Property(l => l.ContentUrl)
            .HasMaxLength(2048);
    }
}
