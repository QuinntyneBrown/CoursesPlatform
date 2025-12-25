// Copyright (c) Quinntyne Brown. All Rights Reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

using CoursesPlatform.Core;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CoursesPlatform.Infrastructure;

public class UserSessionConfiguration : IEntityTypeConfiguration<UserSession>
{
    public void Configure(EntityTypeBuilder<UserSession> builder)
    {
        builder.HasKey(s => s.UserSessionId);

        builder.Property(s => s.RefreshTokenHash)
            .IsRequired();

        builder.Property(s => s.DeviceType)
            .HasMaxLength(100);

        builder.Property(s => s.Browser)
            .HasMaxLength(100);

        builder.Property(s => s.OperatingSystem)
            .HasMaxLength(100);

        builder.Property(s => s.IpAddress)
            .HasMaxLength(50);

        builder.Property(s => s.Location)
            .HasMaxLength(200);
    }
}
