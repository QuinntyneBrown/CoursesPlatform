namespace CoursesPlatform.Api;

using MediatR;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class UsersController : ControllerBase
{
    private readonly IMediator _mediator;

    public UsersController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpGet]
    public async Task<ActionResult<List<UserDto>>> GetUsers(CancellationToken cancellationToken)
    {
        var users = await _mediator.Send(new GetUsersQuery(), cancellationToken);
        return Ok(users);
    }

    [HttpGet("{userId:guid}")]
    public async Task<ActionResult<UserDto>> GetUserById(Guid userId, CancellationToken cancellationToken)
    {
        var user = await _mediator.Send(new GetUserByIdQuery(userId), cancellationToken);
        if (user == null)
        {
            return NotFound();
        }

        return Ok(user);
    }

    [HttpPost]
    public async Task<ActionResult<UserDto>> CreateUser([FromBody] CreateUserCommand command, CancellationToken cancellationToken)
    {
        var user = await _mediator.Send(command, cancellationToken);
        return CreatedAtAction(nameof(GetUserById), new { userId = user.UserId }, user);
    }
}
