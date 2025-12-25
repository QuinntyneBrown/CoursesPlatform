namespace CoursesPlatform.Api;

using CoursesPlatform.Core;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

public record CreateInstructorCommand(Guid UserId, string Biography) : IRequest<InstructorDto>;

public class CreateInstructorHandler : IRequestHandler<CreateInstructorCommand, InstructorDto>
{
    private readonly ICoursesPlatformContext _context;
    private readonly ILogger<CreateInstructorHandler> _logger;

    public CreateInstructorHandler(ICoursesPlatformContext context, ILogger<CreateInstructorHandler> logger)
    {
        _context = context;
        _logger = logger;
    }

    public async Task<InstructorDto> Handle(CreateInstructorCommand request, CancellationToken cancellationToken)
    {
        _logger.LogInformation("Creating instructor application for user {UserId}", request.UserId);

        var user = await _context.Users
            .FirstOrDefaultAsync(u => u.UserId == request.UserId, cancellationToken)
            ?? throw new InvalidOperationException($"User with ID {request.UserId} not found.");

        var instructor = Instructor.Apply(user, request.Biography);

        _context.Instructors.Add(instructor);
        await _context.SaveChangesAsync(cancellationToken);

        _logger.LogInformation("Instructor application created with ID {InstructorId}", instructor.InstructorId);

        return instructor.ToDto();
    }
}
