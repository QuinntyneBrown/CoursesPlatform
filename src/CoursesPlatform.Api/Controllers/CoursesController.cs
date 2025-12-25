// Copyright (c) Quinntyne Brown. All Rights Reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

using CoursesPlatform.Core;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CoursesPlatform.Api;

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
    public async Task<ActionResult<GetCoursesResponse>> GetCourses(
        [FromQuery] Guid? instructorId,
        [FromQuery] CourseStatus? status,
        [FromQuery] Guid? categoryId,
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 10,
        CancellationToken cancellationToken = default)
    {
        var request = new GetCoursesRequest
        {
            InstructorId = instructorId,
            Status = status,
            CategoryId = categoryId,
            Page = page,
            PageSize = pageSize
        };

        var response = await _mediator.Send(request, cancellationToken);
        return Ok(response);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<GetCourseResponse>> GetCourse(Guid id, CancellationToken cancellationToken)
    {
        var response = await _mediator.Send(new GetCourseRequest { CourseId = id }, cancellationToken);
        return response.Course != null ? Ok(response) : NotFound();
    }

    [Authorize]
    [HttpPost]
    public async Task<ActionResult<CreateCourseResponse>> CreateCourse([FromBody] CreateCourseRequest request, CancellationToken cancellationToken)
    {
        var userId = GetUserId();
        if (userId == null)
        {
            return Unauthorized();
        }

        request.InstructorId = userId.Value;
        var response = await _mediator.Send(request, cancellationToken);
        return CreatedAtAction(nameof(GetCourse), new { id = response.CourseId }, response);
    }

    [Authorize]
    [HttpPut("{id}")]
    public async Task<ActionResult<UpdateCourseResponse>> UpdateCourse(Guid id, [FromBody] UpdateCourseRequest request, CancellationToken cancellationToken)
    {
        var userId = GetUserId();
        if (userId == null)
        {
            return Unauthorized();
        }

        request.CourseId = id;
        request.UserId = userId.Value;
        var response = await _mediator.Send(request, cancellationToken);
        return response.Success ? Ok(response) : BadRequest(response);
    }

    [Authorize]
    [HttpDelete("{id}")]
    public async Task<ActionResult<DeleteCourseResponse>> DeleteCourse(Guid id, CancellationToken cancellationToken)
    {
        var userId = GetUserId();
        if (userId == null)
        {
            return Unauthorized();
        }

        var request = new DeleteCourseRequest { CourseId = id, UserId = userId.Value };
        var response = await _mediator.Send(request, cancellationToken);
        return response.Success ? Ok(response) : BadRequest(response);
    }

    [Authorize]
    [HttpPost("{id}/publish")]
    public async Task<ActionResult<PublishCourseResponse>> PublishCourse(Guid id, CancellationToken cancellationToken)
    {
        var userId = GetUserId();
        if (userId == null)
        {
            return Unauthorized();
        }

        var request = new PublishCourseRequest { CourseId = id, UserId = userId.Value };
        var response = await _mediator.Send(request, cancellationToken);
        return response.Success ? Ok(response) : BadRequest(response);
    }

    [Authorize]
    [HttpPost("{id}/unpublish")]
    public async Task<ActionResult<UnpublishCourseResponse>> UnpublishCourse(Guid id, CancellationToken cancellationToken)
    {
        var userId = GetUserId();
        if (userId == null)
        {
            return Unauthorized();
        }

        var request = new UnpublishCourseRequest { CourseId = id, UserId = userId.Value };
        var response = await _mediator.Send(request, cancellationToken);
        return response.Success ? Ok(response) : BadRequest(response);
    }

    [Authorize]
    [HttpPost("{id}/thumbnail")]
    public async Task<ActionResult<UploadThumbnailResponse>> UploadThumbnail(Guid id, IFormFile file, CancellationToken cancellationToken)
    {
        var userId = GetUserId();
        if (userId == null)
        {
            return Unauthorized();
        }

        if (file == null || file.Length == 0)
        {
            return BadRequest(new { error = "No file uploaded" });
        }

        if (file.Length > 10 * 1024 * 1024)
        {
            return BadRequest(new { error = "File size exceeds 10MB limit" });
        }

        var allowedTypes = new[] { "image/jpeg", "image/png", "image/webp" };
        if (!allowedTypes.Contains(file.ContentType))
        {
            return BadRequest(new { error = "Invalid file type. Allowed: JPEG, PNG, WebP" });
        }

        using var stream = file.OpenReadStream();
        var request = new UploadThumbnailRequest
        {
            CourseId = id,
            UserId = userId.Value,
            FileStream = stream,
            FileName = file.FileName
        };

        var response = await _mediator.Send(request, cancellationToken);
        return response.Success ? Ok(response) : BadRequest(response);
    }

    [Authorize]
    [HttpPost("{id}/objectives")]
    public async Task<ActionResult<AddLearningObjectiveResponse>> AddObjective(Guid id, [FromBody] AddLearningObjectiveRequest request, CancellationToken cancellationToken)
    {
        var userId = GetUserId();
        if (userId == null)
        {
            return Unauthorized();
        }

        request.CourseId = id;
        request.UserId = userId.Value;
        var response = await _mediator.Send(request, cancellationToken);
        return response.Success ? Ok(response) : BadRequest(response);
    }

    [Authorize]
    [HttpPut("{id}/objectives/{objectiveId}")]
    public async Task<ActionResult<UpdateLearningObjectiveResponse>> UpdateObjective(Guid id, Guid objectiveId, [FromBody] UpdateLearningObjectiveRequest request, CancellationToken cancellationToken)
    {
        var userId = GetUserId();
        if (userId == null)
        {
            return Unauthorized();
        }

        request.CourseId = id;
        request.ObjectiveId = objectiveId;
        request.UserId = userId.Value;
        var response = await _mediator.Send(request, cancellationToken);
        return response.Success ? Ok(response) : BadRequest(response);
    }

    [Authorize]
    [HttpDelete("{id}/objectives/{objectiveId}")]
    public async Task<ActionResult<DeleteLearningObjectiveResponse>> DeleteObjective(Guid id, Guid objectiveId, CancellationToken cancellationToken)
    {
        var userId = GetUserId();
        if (userId == null)
        {
            return Unauthorized();
        }

        var request = new DeleteLearningObjectiveRequest
        {
            CourseId = id,
            ObjectiveId = objectiveId,
            UserId = userId.Value
        };
        var response = await _mediator.Send(request, cancellationToken);
        return response.Success ? Ok(response) : BadRequest(response);
    }

    [Authorize]
    [HttpPut("{id}/objectives/reorder")]
    public async Task<ActionResult<ReorderLearningObjectivesResponse>> ReorderObjectives(Guid id, [FromBody] ReorderLearningObjectivesRequest request, CancellationToken cancellationToken)
    {
        var userId = GetUserId();
        if (userId == null)
        {
            return Unauthorized();
        }

        request.CourseId = id;
        request.UserId = userId.Value;
        var response = await _mediator.Send(request, cancellationToken);
        return response.Success ? Ok(response) : BadRequest(response);
    }

    private Guid? GetUserId()
    {
        var userIdClaim = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)
            ?? User.FindFirst("sub");

        if (userIdClaim != null && Guid.TryParse(userIdClaim.Value, out var userId))
        {
            return userId;
        }

        return null;
    }
}
