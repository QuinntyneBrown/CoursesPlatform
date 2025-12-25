namespace CoursesPlatform.Api;

using MediatR;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class EnrollmentsController : ControllerBase
{
    private readonly IMediator _mediator;

    public EnrollmentsController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpGet("user/{userId:guid}")]
    public async Task<ActionResult<List<EnrollmentDto>>> GetUserEnrollments(Guid userId, CancellationToken cancellationToken)
    {
        var enrollments = await _mediator.Send(new GetUserEnrollmentsQuery(userId), cancellationToken);
        return Ok(enrollments);
    }

    [HttpPost]
    public async Task<ActionResult<EnrollmentDto>> CreateEnrollment([FromBody] CreateEnrollmentCommand command, CancellationToken cancellationToken)
    {
        var enrollment = await _mediator.Send(command, cancellationToken);
        return CreatedAtAction(nameof(GetUserEnrollments), new { userId = enrollment.UserId }, enrollment);
    }
}
