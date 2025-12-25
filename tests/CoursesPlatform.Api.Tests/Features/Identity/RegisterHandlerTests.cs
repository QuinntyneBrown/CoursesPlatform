// Copyright (c) Quinntyne Brown. All Rights Reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

using CoursesPlatform.Core;
using FluentAssertions;
using Microsoft.Extensions.Logging;
using Moq;
using Xunit;

namespace CoursesPlatform.Api.Tests.Features.Identity;

public class RegisterHandlerTests
{
    private readonly Mock<IEmailService> _mockEmailService;
    private readonly Mock<ILogger<RegisterHandler>> _mockLogger;

    public RegisterHandlerTests()
    {
        _mockEmailService = new Mock<IEmailService>();
        _mockLogger = TestHelpers.CreateMockLogger<RegisterHandler>();
    }

    [Fact]
    public async Task Handle_ValidRequest_CreatesUserAndSendsEmail()
    {
        // Arrange
        using var context = TestHelpers.CreateInMemoryContext();
        var handler = new RegisterHandler(context, _mockEmailService.Object, _mockLogger.Object);

        var request = new RegisterRequest
        {
            Email = "test@example.com",
            Password = "Password123!",
            FirstName = "John",
            LastName = "Doe"
        };

        // Act
        var response = await handler.Handle(request, CancellationToken.None);

        // Assert
        response.UserId.Should().NotBeEmpty();
        response.Message.Should().Contain("Registration successful");

        var user = context.Users.FirstOrDefault(u => u.Email == request.Email);
        user.Should().NotBeNull();
        user!.FirstName.Should().Be("John");
        user.LastName.Should().Be("Doe");
        user.Status.Should().Be(UserStatus.Pending);

        _mockEmailService.Verify(
            e => e.SendVerificationEmailAsync(request.Email, It.IsAny<string>(), It.IsAny<CancellationToken>()),
            Times.Once);
    }

    [Fact]
    public async Task Handle_DuplicateEmail_ThrowsException()
    {
        // Arrange
        using var context = TestHelpers.CreateInMemoryContext();
        var existingUser = new User
        {
            UserId = Guid.NewGuid(),
            Email = "existing@example.com",
            FirstName = "Existing",
            LastName = "User",
            Status = UserStatus.Active
        };
        existingUser.SetPassword("Password123!");
        context.Users.Add(existingUser);
        await context.SaveChangesAsync();

        var handler = new RegisterHandler(context, _mockEmailService.Object, _mockLogger.Object);

        var request = new RegisterRequest
        {
            Email = "existing@example.com",
            Password = "Password123!",
            FirstName = "John",
            LastName = "Doe"
        };

        // Act & Assert
        await Assert.ThrowsAsync<InvalidOperationException>(() =>
            handler.Handle(request, CancellationToken.None));
    }
}
