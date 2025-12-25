// Copyright (c) Quinntyne Brown. All Rights Reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

using CoursesPlatform.Core;
using FluentAssertions;
using Microsoft.Extensions.Logging;
using Moq;
using Xunit;

namespace CoursesPlatform.Api.Tests.Features.Courses;

public class CreateCourseHandlerTests
{
    private readonly Mock<ILogger<CreateCourseHandler>> _mockLogger;

    public CreateCourseHandlerTests()
    {
        _mockLogger = TestHelpers.CreateMockLogger<CreateCourseHandler>();
    }

    [Fact]
    public async Task Handle_ValidRequest_CreatesCourse()
    {
        // Arrange
        using var context = TestHelpers.CreateInMemoryContext();
        var handler = new CreateCourseHandler(context, _mockLogger.Object);
        var instructorId = Guid.NewGuid();

        var request = new CreateCourseRequest
        {
            InstructorId = instructorId,
            Title = "Introduction to C# Programming",
            Subtitle = "Learn C# from scratch",
            Description = "A comprehensive course on C# programming",
            Level = CourseLevel.Beginner,
            Language = "English"
        };

        // Act
        var response = await handler.Handle(request, CancellationToken.None);

        // Assert
        response.CourseId.Should().NotBeEmpty();
        response.Course.Should().NotBeNull();
        response.Course!.Title.Should().Be("Introduction to C# Programming");
        response.Course.Status.Should().Be(CourseStatus.Draft);

        var course = context.Courses.FirstOrDefault(c => c.CourseId == response.CourseId);
        course.Should().NotBeNull();
        course!.InstructorId.Should().Be(instructorId);
        course.Level.Should().Be(CourseLevel.Beginner);
    }

    [Fact]
    public async Task Handle_WithCategory_CreatesCourseWithCategory()
    {
        // Arrange
        using var context = TestHelpers.CreateInMemoryContext();
        var categoryId = Guid.NewGuid();
        var category = new Category
        {
            CategoryId = categoryId,
            Name = "Programming"
        };
        context.Categories.Add(category);
        await context.SaveChangesAsync();

        var handler = new CreateCourseHandler(context, _mockLogger.Object);

        var request = new CreateCourseRequest
        {
            InstructorId = Guid.NewGuid(),
            Title = "Advanced C# Programming Course",
            CategoryId = categoryId,
            Level = CourseLevel.Advanced
        };

        // Act
        var response = await handler.Handle(request, CancellationToken.None);

        // Assert
        response.Course.Should().NotBeNull();
        response.Course!.CategoryId.Should().Be(categoryId);
    }

    [Fact]
    public async Task Handle_DefaultLevel_UsesAllLevels()
    {
        // Arrange
        using var context = TestHelpers.CreateInMemoryContext();
        var handler = new CreateCourseHandler(context, _mockLogger.Object);

        var request = new CreateCourseRequest
        {
            InstructorId = Guid.NewGuid(),
            Title = "Course for All Skill Levels"
        };

        // Act
        var response = await handler.Handle(request, CancellationToken.None);

        // Assert
        response.Course!.Level.Should().Be(CourseLevel.AllLevels);
    }
}
