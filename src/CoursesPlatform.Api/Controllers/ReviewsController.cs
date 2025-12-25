namespace CoursesPlatform.Api;

using MediatR;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class ReviewsController : ControllerBase
{
    private readonly IMediator _mediator;

    public ReviewsController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpPost]
    public async Task<ActionResult<ReviewDto>> CreateReview([FromBody] CreateReviewCommand command, CancellationToken cancellationToken)
    {
        var review = await _mediator.Send(command, cancellationToken);
        return Created(string.Empty, review);
    }
}
