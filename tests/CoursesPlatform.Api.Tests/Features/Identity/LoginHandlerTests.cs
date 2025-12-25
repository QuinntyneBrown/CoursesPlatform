// Copyright (c) Quinntyne Brown. All Rights Reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

using CoursesPlatform.Core;
using FluentAssertions;
using Microsoft.Extensions.Logging;
using Moq;
using Xunit;

namespace CoursesPlatform.Api.Tests.Features.Identity;

public class LoginHandlerTests
{
    private readonly Mock<ITokenService> _mockTokenService;
    private readonly Mock<ILogger<LoginHandler>> _mockLogger;

    public LoginHandlerTests()
    {
        _mockTokenService = new Mock<ITokenService>();
        _mockTokenService.Setup(t => t.GenerateAccessToken(It.IsAny<User>())).Returns("mock-access-token");
        _mockTokenService.Setup(t => t.GenerateRefreshToken()).Returns("mock-refresh-token");
        _mockLogger = TestHelpers.CreateMockLogger<LoginHandler>();
    }

    [Fact]
    public async Task Handle_ValidCredentials_ReturnsSuccessWithTokens()
    {
        // Arrange
        using var context = TestHelpers.CreateInMemoryContext();
        var user = new User
        {
            UserId = Guid.NewGuid(),
            Email = "test@example.com",
            FirstName = "John",
            LastName = "Doe",
            Status = UserStatus.Active
        };
        user.SetPassword("Password123!");
        context.Users.Add(user);
        await context.SaveChangesAsync();

        var handler = new LoginHandler(context, _mockTokenService.Object, _mockLogger.Object);

        var request = new LoginRequest
        {
            Email = "test@example.com",
            Password = "Password123!"
        };

        // Act
        var response = await handler.Handle(request, CancellationToken.None);

        // Assert
        response.Success.Should().BeTrue();
        response.AccessToken.Should().Be("mock-access-token");
        response.RefreshToken.Should().Be("mock-refresh-token");
        response.User.Should().NotBeNull();
        response.User!.Email.Should().Be("test@example.com");
    }

    [Fact]
    public async Task Handle_InvalidEmail_ReturnsFailure()
    {
        // Arrange
        using var context = TestHelpers.CreateInMemoryContext();
        var handler = new LoginHandler(context, _mockTokenService.Object, _mockLogger.Object);

        var request = new LoginRequest
        {
            Email = "nonexistent@example.com",
            Password = "Password123!"
        };

        // Act
        var response = await handler.Handle(request, CancellationToken.None);

        // Assert
        response.Success.Should().BeFalse();
        response.Error.Should().Contain("Invalid email or password");
    }

    [Fact]
    public async Task Handle_InvalidPassword_ReturnsFailureAndIncrementsAttempts()
    {
        // Arrange
        using var context = TestHelpers.CreateInMemoryContext();
        var user = new User
        {
            UserId = Guid.NewGuid(),
            Email = "test@example.com",
            FirstName = "John",
            LastName = "Doe",
            Status = UserStatus.Active
        };
        user.SetPassword("Password123!");
        context.Users.Add(user);
        await context.SaveChangesAsync();

        var handler = new LoginHandler(context, _mockTokenService.Object, _mockLogger.Object);

        var request = new LoginRequest
        {
            Email = "test@example.com",
            Password = "WrongPassword!"
        };

        // Act
        var response = await handler.Handle(request, CancellationToken.None);

        // Assert
        response.Success.Should().BeFalse();
        response.Error.Should().Contain("Invalid email or password");

        var updatedUser = context.Users.First(u => u.Email == "test@example.com");
        updatedUser.FailedLoginAttempts.Should().Be(1);
    }

    [Fact]
    public async Task Handle_InactiveUser_ReturnsFailure()
    {
        // Arrange
        using var context = TestHelpers.CreateInMemoryContext();
        var user = new User
        {
            UserId = Guid.NewGuid(),
            Email = "test@example.com",
            FirstName = "John",
            LastName = "Doe",
            Status = UserStatus.Pending
        };
        user.SetPassword("Password123!");
        context.Users.Add(user);
        await context.SaveChangesAsync();

        var handler = new LoginHandler(context, _mockTokenService.Object, _mockLogger.Object);

        var request = new LoginRequest
        {
            Email = "test@example.com",
            Password = "Password123!"
        };

        // Act
        var response = await handler.Handle(request, CancellationToken.None);

        // Assert
        response.Success.Should().BeFalse();
        response.Error.Should().Contain("not active");
    }

    [Fact]
    public async Task Handle_LockedOutUser_ReturnsFailureWithLockoutMessage()
    {
        // Arrange
        using var context = TestHelpers.CreateInMemoryContext();
        var user = new User
        {
            UserId = Guid.NewGuid(),
            Email = "test@example.com",
            FirstName = "John",
            LastName = "Doe",
            Status = UserStatus.Active,
            LockoutEnd = DateTime.UtcNow.AddMinutes(30)
        };
        user.SetPassword("Password123!");
        context.Users.Add(user);
        await context.SaveChangesAsync();

        var handler = new LoginHandler(context, _mockTokenService.Object, _mockLogger.Object);

        var request = new LoginRequest
        {
            Email = "test@example.com",
            Password = "Password123!"
        };

        // Act
        var response = await handler.Handle(request, CancellationToken.None);

        // Assert
        response.Success.Should().BeFalse();
        response.Error.Should().Contain("locked");
    }
}
