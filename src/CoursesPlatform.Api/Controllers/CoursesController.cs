namespace CoursesPlatform.Api;

using MediatR;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class CoursesController : ControllerBase
{
    private readonly IMediator _mediator;

    public CoursesController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpGet]
    public async Task<ActionResult<List<CourseSummaryDto>>> GetCourses(CancellationToken cancellationToken)
    {
        var courses = await _mediator.Send(new GetCoursesQuery(), cancellationToken);
        return Ok(courses);
    }

    [HttpGet("{courseId:guid}")]
    public async Task<ActionResult<CourseDto>> GetCourseById(Guid courseId, CancellationToken cancellationToken)
    {
        var course = await _mediator.Send(new GetCourseByIdQuery(courseId), cancellationToken);
        if (course == null)
        {
            return NotFound();
        }

        return Ok(course);
    }

    [HttpPost]
    public async Task<ActionResult<CourseDto>> CreateCourse([FromBody] CreateCourseCommand command, CancellationToken cancellationToken)
    {
        var course = await _mediator.Send(command, cancellationToken);
        return CreatedAtAction(nameof(GetCourseById), new { courseId = course.CourseId }, course);
    }

    [HttpGet("{courseId:guid}/reviews")]
    public async Task<ActionResult<List<ReviewDto>>> GetCourseReviews(Guid courseId, CancellationToken cancellationToken)
    {
        var reviews = await _mediator.Send(new GetCourseReviewsQuery(courseId), cancellationToken);
        return Ok(reviews);
    }
}
