// Copyright (c) Quinntyne Brown. All Rights Reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CoursesPlatform.Api;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class UsersController : ControllerBase
{
    private readonly IMediator _mediator;

    public UsersController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpGet("me")]
    public async Task<ActionResult<GetProfileResponse>> GetProfile(CancellationToken cancellationToken)
    {
        var userId = GetUserId();
        if (userId == null)
        {
            return Unauthorized();
        }

        var response = await _mediator.Send(new GetProfileRequest { UserId = userId.Value }, cancellationToken);
        return response.User != null ? Ok(response) : NotFound();
    }

    [HttpPut("me")]
    public async Task<ActionResult<UpdateProfileResponse>> UpdateProfile([FromBody] UpdateProfileRequest request, CancellationToken cancellationToken)
    {
        var userId = GetUserId();
        if (userId == null)
        {
            return Unauthorized();
        }

        request.UserId = userId.Value;
        var response = await _mediator.Send(request, cancellationToken);
        return response.Success ? Ok(response) : BadRequest(response);
    }

    [HttpPost("me/avatar")]
    public async Task<ActionResult<UploadAvatarResponse>> UploadAvatar(IFormFile file, CancellationToken cancellationToken)
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

        if (file.Length > 5 * 1024 * 1024)
        {
            return BadRequest(new { error = "File size exceeds 5MB limit" });
        }

        var allowedTypes = new[] { "image/jpeg", "image/png", "image/gif" };
        if (!allowedTypes.Contains(file.ContentType))
        {
            return BadRequest(new { error = "Invalid file type. Allowed: JPEG, PNG, GIF" });
        }

        using var stream = file.OpenReadStream();
        var request = new UploadAvatarRequest
        {
            UserId = userId.Value,
            FileStream = stream,
            FileName = file.FileName
        };

        var response = await _mediator.Send(request, cancellationToken);
        return response.Success ? Ok(response) : BadRequest(response);
    }

    [HttpDelete("me/avatar")]
    public async Task<ActionResult<DeleteAvatarResponse>> DeleteAvatar(CancellationToken cancellationToken)
    {
        var userId = GetUserId();
        if (userId == null)
        {
            return Unauthorized();
        }

        var response = await _mediator.Send(new DeleteAvatarRequest { UserId = userId.Value }, cancellationToken);
        return Ok(response);
    }

    [HttpGet("me/sessions")]
    public async Task<ActionResult<GetSessionsResponse>> GetSessions(CancellationToken cancellationToken)
    {
        var userId = GetUserId();
        if (userId == null)
        {
            return Unauthorized();
        }

        var response = await _mediator.Send(new GetSessionsRequest { UserId = userId.Value }, cancellationToken);
        return Ok(response);
    }

    [HttpDelete("me/sessions/{sessionId}")]
    public async Task<ActionResult<TerminateSessionResponse>> TerminateSession(Guid sessionId, CancellationToken cancellationToken)
    {
        var userId = GetUserId();
        if (userId == null)
        {
            return Unauthorized();
        }

        var request = new TerminateSessionRequest { UserId = userId.Value, SessionId = sessionId };
        var response = await _mediator.Send(request, cancellationToken);
        return response.Success ? Ok(response) : NotFound(response);
    }

    [HttpDelete("me/sessions")]
    public async Task<ActionResult<TerminateAllSessionsResponse>> TerminateAllSessions(CancellationToken cancellationToken)
    {
        var userId = GetUserId();
        if (userId == null)
        {
            return Unauthorized();
        }

        var request = new TerminateAllSessionsRequest { UserId = userId.Value };
        var response = await _mediator.Send(request, cancellationToken);
        return Ok(response);
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
