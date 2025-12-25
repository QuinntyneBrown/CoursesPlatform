// Copyright (c) Quinntyne Brown. All Rights Reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

using FluentAssertions;
using FluentValidation.TestHelper;
using Xunit;

namespace CoursesPlatform.Api.Tests.Features.Validators;

public class RegisterValidatorTests
{
    private readonly RegisterValidator _validator;

    public RegisterValidatorTests()
    {
        _validator = new RegisterValidator();
    }

    [Fact]
    public void Validate_ValidRequest_Passes()
    {
        var request = new RegisterRequest
        {
            Email = "test@example.com",
            Password = "Password123!",
            FirstName = "John",
            LastName = "Doe"
        };

        var result = _validator.TestValidate(request);

        result.ShouldNotHaveAnyValidationErrors();
    }

    [Theory]
    [InlineData("")]
    [InlineData(null)]
    public void Validate_EmptyEmail_HasError(string? email)
    {
        var request = new RegisterRequest
        {
            Email = email!,
            Password = "Password123!",
            FirstName = "John",
            LastName = "Doe"
        };

        var result = _validator.TestValidate(request);

        result.ShouldHaveValidationErrorFor(x => x.Email);
    }

    [Theory]
    [InlineData("notanemail")]
    [InlineData("invalid@")]
    [InlineData("@invalid.com")]
    public void Validate_InvalidEmail_HasError(string email)
    {
        var request = new RegisterRequest
        {
            Email = email,
            Password = "Password123!",
            FirstName = "John",
            LastName = "Doe"
        };

        var result = _validator.TestValidate(request);

        result.ShouldHaveValidationErrorFor(x => x.Email);
    }

    [Theory]
    [InlineData("short")]
    [InlineData("nouppercase1")]
    [InlineData("NOLOWERCASE1")]
    [InlineData("NoNumbers")]
    public void Validate_WeakPassword_HasError(string password)
    {
        var request = new RegisterRequest
        {
            Email = "test@example.com",
            Password = password,
            FirstName = "John",
            LastName = "Doe"
        };

        var result = _validator.TestValidate(request);

        result.ShouldHaveValidationErrorFor(x => x.Password);
    }

    [Theory]
    [InlineData("")]
    [InlineData(null)]
    public void Validate_EmptyFirstName_HasError(string? firstName)
    {
        var request = new RegisterRequest
        {
            Email = "test@example.com",
            Password = "Password123!",
            FirstName = firstName!,
            LastName = "Doe"
        };

        var result = _validator.TestValidate(request);

        result.ShouldHaveValidationErrorFor(x => x.FirstName);
    }

    [Theory]
    [InlineData("")]
    [InlineData(null)]
    public void Validate_EmptyLastName_HasError(string? lastName)
    {
        var request = new RegisterRequest
        {
            Email = "test@example.com",
            Password = "Password123!",
            FirstName = "John",
            LastName = lastName!
        };

        var result = _validator.TestValidate(request);

        result.ShouldHaveValidationErrorFor(x => x.LastName);
    }
}
