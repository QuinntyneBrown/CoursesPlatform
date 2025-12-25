// Copyright (c) Quinntyne Brown. All Rights Reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

using CoursesPlatform.Core;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CoursesPlatform.Infrastructure;

public class LearningObjectiveConfiguration : IEntityTypeConfiguration<LearningObjective>
{
    public void Configure(EntityTypeBuilder<LearningObjective> builder)
    {
        builder.HasKey(lo => lo.LearningObjectiveId);

        builder.Property(lo => lo.Description)
            .IsRequired()
            .HasMaxLength(200);
    }
}
