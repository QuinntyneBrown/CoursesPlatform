namespace CoursesPlatform.Infrastructure;

using CoursesPlatform.Core;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

public class SectionConfiguration : IEntityTypeConfiguration<Section>
{
    public void Configure(EntityTypeBuilder<Section> builder)
    {
        builder.HasKey(s => s.SectionId);

        builder.Property(s => s.Title)
            .IsRequired()
            .HasMaxLength(200);

        builder.HasMany(s => s.Lectures)
            .WithOne(l => l.Section)
            .HasForeignKey(l => l.SectionId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}
