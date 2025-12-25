// Copyright (c) Quinntyne Brown. All Rights Reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

using CoursesPlatform.Core;
using FluentAssertions;
using FluentValidation.TestHelper;
using Xunit;

namespace CoursesPlatform.Api.Tests.Features.Validators;

public class CreateCourseValidatorTests
{
    private readonly CreateCourseValidator _validator;

    public CreateCourseValidatorTests()
    {
        _validator = new CreateCourseValidator();
    }

    [Fact]
    public void Validate_ValidRequest_Passes()
    {
        var request = new CreateCourseRequest
        {
            InstructorId = Guid.NewGuid(),
            Title = "Introduction to C# Programming",
            Subtitle = "Learn C# from scratch",
            Description = "A comprehensive course on C# programming",
            Level = CourseLevel.Beginner,
            Language = "English"
        };

        var result = _validator.TestValidate(request);

        result.ShouldNotHaveAnyValidationErrors();
    }

    [Theory]
    [InlineData("")]
    [InlineData(null)]
    public void Validate_EmptyTitle_HasError(string? title)
    {
        var request = new CreateCourseRequest
        {
            InstructorId = Guid.NewGuid(),
            Title = title!
        };

        var result = _validator.TestValidate(request);

        result.ShouldHaveValidationErrorFor(x => x.Title);
    }

    [Fact]
    public void Validate_TitleTooShort_HasError()
    {
        var request = new CreateCourseRequest
        {
            InstructorId = Guid.NewGuid(),
            Title = "Short"
        };

        var result = _validator.TestValidate(request);

        result.ShouldHaveValidationErrorFor(x => x.Title)
            .WithErrorMessage("Title must be at least 10 characters");
    }

    [Fact]
    public void Validate_TitleTooLong_HasError()
    {
        var request = new CreateCourseRequest
        {
            InstructorId = Guid.NewGuid(),
            Title = new string('a', 201)
        };

        var result = _validator.TestValidate(request);

        result.ShouldHaveValidationErrorFor(x => x.Title)
            .WithErrorMessage("Title must not exceed 200 characters");
    }

    [Fact]
    public void Validate_SubtitleTooLong_HasError()
    {
        var request = new CreateCourseRequest
        {
            InstructorId = Guid.NewGuid(),
            Title = "Valid Title for Course",
            Subtitle = new string('a', 301)
        };

        var result = _validator.TestValidate(request);

        result.ShouldHaveValidationErrorFor(x => x.Subtitle);
    }

    [Fact]
    public void Validate_DescriptionTooLong_HasError()
    {
        var request = new CreateCourseRequest
        {
            InstructorId = Guid.NewGuid(),
            Title = "Valid Title for Course",
            Description = new string('a', 5001)
        };

        var result = _validator.TestValidate(request);

        result.ShouldHaveValidationErrorFor(x => x.Description);
    }
}
