namespace CoursesPlatform.Infrastructure;

using CoursesPlatform.Core;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

public class UserConfiguration : IEntityTypeConfiguration<User>
{
    public void Configure(EntityTypeBuilder<User> builder)
    {
        builder.HasKey(u => u.UserId);

        builder.Property(u => u.Email)
            .IsRequired()
            .HasMaxLength(256);

        builder.HasIndex(u => u.Email)
            .IsUnique();

        builder.Property(u => u.FirstName)
            .IsRequired()
            .HasMaxLength(100);

        builder.Property(u => u.LastName)
            .IsRequired()
            .HasMaxLength(100);

        builder.Property(u => u.AvatarUrl)
            .HasMaxLength(2048);

        builder.Property(u => u.Biography)
            .HasMaxLength(2000);

        builder.Property(u => u.Headline)
            .HasMaxLength(200);

        builder.Property(u => u.WebsiteUrl)
            .HasMaxLength(2048);

        builder.Property(u => u.PreferredLanguage)
            .IsRequired()
            .HasMaxLength(10);

        builder.Property(u => u.Timezone)
            .IsRequired()
            .HasMaxLength(50);

        builder.Property(u => u.Status)
            .IsRequired()
            .HasConversion<string>()
            .HasMaxLength(20);
    }
}
