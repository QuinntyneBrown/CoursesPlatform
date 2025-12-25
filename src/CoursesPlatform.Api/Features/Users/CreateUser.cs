namespace CoursesPlatform.Api;

using CoursesPlatform.Core;
using MediatR;
using Microsoft.Extensions.Logging;

public record CreateUserCommand(string Email, string FirstName, string LastName) : IRequest<UserDto>;

public class CreateUserHandler : IRequestHandler<CreateUserCommand, UserDto>
{
    private readonly ICoursesPlatformContext _context;
    private readonly ILogger<CreateUserHandler> _logger;

    public CreateUserHandler(ICoursesPlatformContext context, ILogger<CreateUserHandler> logger)
    {
        _context = context;
        _logger = logger;
    }

    public async Task<UserDto> Handle(CreateUserCommand request, CancellationToken cancellationToken)
    {
        _logger.LogInformation("Creating user with email {Email}", request.Email);

        var user = User.Create(request.Email, request.FirstName, request.LastName);

        _context.Users.Add(user);
        await _context.SaveChangesAsync(cancellationToken);

        _logger.LogInformation("User created successfully with ID {UserId}", user.UserId);

        return user.ToDto();
    }
}
