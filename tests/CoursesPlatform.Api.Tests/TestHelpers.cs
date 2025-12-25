// Copyright (c) Quinntyne Brown. All Rights Reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Moq;

namespace CoursesPlatform.Api.Tests;

public static class TestHelpers
{
    public static TestDbContext CreateInMemoryContext()
    {
        var options = new DbContextOptionsBuilder<TestDbContext>()
            .UseInMemoryDatabase(Guid.NewGuid().ToString())
            .Options;

        return new TestDbContext(options);
    }

    public static Mock<ILogger<T>> CreateMockLogger<T>()
    {
        return new Mock<ILogger<T>>();
    }
}
