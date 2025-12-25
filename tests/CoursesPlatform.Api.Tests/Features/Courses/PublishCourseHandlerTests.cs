// Copyright (c) Quinntyne Brown. All Rights Reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

using CoursesPlatform.Core;
using FluentAssertions;
using Microsoft.Extensions.Logging;
using Moq;
using Xunit;

namespace CoursesPlatform.Api.Tests.Features.Courses;

public class PublishCourseHandlerTests
{
    private readonly Mock<ILogger<PublishCourseHandler>> _mockLogger;

    public PublishCourseHandlerTests()
    {
        _mockLogger = TestHelpers.CreateMockLogger<PublishCourseHandler>();
    }

    [Fact]
    public async Task Handle_ValidCourse_PublishesCourse()
    {
        // Arrange
        using var context = TestHelpers.CreateInMemoryContext();
        var instructorId = Guid.NewGuid();
        var courseId = Guid.NewGuid();

        var course = new Course
        {
            CourseId = courseId,
            InstructorId = instructorId,
            Title = "Introduction to C# Programming",
            Description = "A comprehensive course",
            Status = CourseStatus.Draft
        };
        context.Courses.Add(course);
        await context.SaveChangesAsync();

        var handler = new PublishCourseHandler(context, _mockLogger.Object);

        var request = new PublishCourseRequest
        {
            CourseId = courseId,
            UserId = instructorId
        };

        // Act
        var response = await handler.Handle(request, CancellationToken.None);

        // Assert
        response.Success.Should().BeTrue();
        response.Course.Should().NotBeNull();
        response.Course!.Status.Should().Be(CourseStatus.Published);

        var updatedCourse = context.Courses.First(c => c.CourseId == courseId);
        updatedCourse.PublishedAt.Should().NotBeNull();
    }

    [Fact]
    public async Task Handle_CourseNotFound_ReturnsError()
    {
        // Arrange
        using var context = TestHelpers.CreateInMemoryContext();
        var handler = new PublishCourseHandler(context, _mockLogger.Object);

        var request = new PublishCourseRequest
        {
            CourseId = Guid.NewGuid(),
            UserId = Guid.NewGuid()
        };

        // Act
        var response = await handler.Handle(request, CancellationToken.None);

        // Assert
        response.Success.Should().BeFalse();
        response.Error.Should().Be("Course not found");
    }

    [Fact]
    public async Task Handle_UnauthorizedUser_ReturnsError()
    {
        // Arrange
        using var context = TestHelpers.CreateInMemoryContext();
        var courseId = Guid.NewGuid();

        var course = new Course
        {
            CourseId = courseId,
            InstructorId = Guid.NewGuid(),
            Title = "Introduction to C# Programming",
            Description = "A comprehensive course",
            Status = CourseStatus.Draft
        };
        context.Courses.Add(course);
        await context.SaveChangesAsync();

        var handler = new PublishCourseHandler(context, _mockLogger.Object);

        var request = new PublishCourseRequest
        {
            CourseId = courseId,
            UserId = Guid.NewGuid() // Different user
        };

        // Act
        var response = await handler.Handle(request, CancellationToken.None);

        // Assert
        response.Success.Should().BeFalse();
        response.Error.Should().Contain("Not authorized");
    }

    [Fact]
    public async Task Handle_CourseWithoutDescription_ReturnsError()
    {
        // Arrange
        using var context = TestHelpers.CreateInMemoryContext();
        var instructorId = Guid.NewGuid();
        var courseId = Guid.NewGuid();

        var course = new Course
        {
            CourseId = courseId,
            InstructorId = instructorId,
            Title = "Introduction to C# Programming",
            Description = null, // Missing description
            Status = CourseStatus.Draft
        };
        context.Courses.Add(course);
        await context.SaveChangesAsync();

        var handler = new PublishCourseHandler(context, _mockLogger.Object);

        var request = new PublishCourseRequest
        {
            CourseId = courseId,
            UserId = instructorId
        };

        // Act
        var response = await handler.Handle(request, CancellationToken.None);

        // Assert
        response.Success.Should().BeFalse();
        response.Error.Should().Contain("cannot be published");
    }
}
