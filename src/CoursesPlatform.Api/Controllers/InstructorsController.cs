namespace CoursesPlatform.Api;

using MediatR;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class InstructorsController : ControllerBase
{
    private readonly IMediator _mediator;

    public InstructorsController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpGet]
    public async Task<ActionResult<List<InstructorDto>>> GetInstructors(CancellationToken cancellationToken)
    {
        var instructors = await _mediator.Send(new GetInstructorsQuery(), cancellationToken);
        return Ok(instructors);
    }

    [HttpPost]
    public async Task<ActionResult<InstructorDto>> CreateInstructor([FromBody] CreateInstructorCommand command, CancellationToken cancellationToken)
    {
        var instructor = await _mediator.Send(command, cancellationToken);
        return CreatedAtAction(nameof(GetInstructors), instructor);
    }
}
