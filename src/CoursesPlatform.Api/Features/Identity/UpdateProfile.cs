// Copyright (c) Quinntyne Brown. All Rights Reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

using CoursesPlatform.Core;
using FluentValidation;
using MediatR;

namespace CoursesPlatform.Api;

public class UpdateProfileRequest : IRequest<UpdateProfileResponse>
{
    public Guid UserId { get; set; }

    public string FirstName { get; set; } = string.Empty;

    public string LastName { get; set; } = string.Empty;

    public string? Biography { get; set; }

    public string? Headline { get; set; }
}

public class UpdateProfileResponse
{
    public bool Success { get; set; }

    public UserDto? User { get; set; }

    public string? Error { get; set; }
}

public class UpdateProfileValidator : AbstractValidator<UpdateProfileRequest>
{
    public UpdateProfileValidator()
    {
        RuleFor(x => x.FirstName)
            .NotEmpty().WithMessage("First name is required")
            .MaximumLength(100).WithMessage("First name must not exceed 100 characters");

        RuleFor(x => x.LastName)
            .NotEmpty().WithMessage("Last name is required")
            .MaximumLength(100).WithMessage("Last name must not exceed 100 characters");

        RuleFor(x => x.Biography)
            .MaximumLength(2000).WithMessage("Biography must not exceed 2000 characters");

        RuleFor(x => x.Headline)
            .MaximumLength(200).WithMessage("Headline must not exceed 200 characters");
    }
}

public class UpdateProfileHandler : IRequestHandler<UpdateProfileRequest, UpdateProfileResponse>
{
    private readonly ICoursesPlatformContext _context;
    private readonly ILogger<UpdateProfileHandler> _logger;

    public UpdateProfileHandler(ICoursesPlatformContext context, ILogger<UpdateProfileHandler> logger)
    {
        _context = context;
        _logger = logger;
    }

    public async Task<UpdateProfileResponse> Handle(UpdateProfileRequest request, CancellationToken cancellationToken)
    {
        var user = await _context.Users.FindAsync(new object[] { request.UserId }, cancellationToken);

        if (user == null)
        {
            return new UpdateProfileResponse { Success = false, Error = "User not found" };
        }

        user.FirstName = request.FirstName;
        user.LastName = request.LastName;
        user.Biography = request.Biography;
        user.Headline = request.Headline;
        user.UpdatedAt = DateTime.UtcNow;

        await _context.SaveChangesAsync(cancellationToken);

        _logger.LogInformation("Profile updated for user: {UserId}", user.UserId);

        return new UpdateProfileResponse { Success = true, User = user.ToDto() };
    }
}
