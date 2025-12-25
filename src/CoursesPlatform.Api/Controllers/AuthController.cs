// Copyright (c) Quinntyne Brown. All Rights Reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CoursesPlatform.Api;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly IMediator _mediator;

    public AuthController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpPost("register")]
    public async Task<ActionResult<RegisterResponse>> Register([FromBody] RegisterRequest request, CancellationToken cancellationToken)
    {
        try
        {
            var response = await _mediator.Send(request, cancellationToken);
            return Ok(response);
        }
        catch (InvalidOperationException ex)
        {
            return Conflict(new { error = ex.Message });
        }
    }

    [HttpPost("verify-email")]
    public async Task<ActionResult<VerifyEmailResponse>> VerifyEmail([FromBody] VerifyEmailRequest request, CancellationToken cancellationToken)
    {
        var response = await _mediator.Send(request, cancellationToken);
        return response.Success ? Ok(response) : BadRequest(response);
    }

    [HttpPost("login")]
    public async Task<ActionResult<LoginResponse>> Login([FromBody] LoginRequest request, CancellationToken cancellationToken)
    {
        request.IpAddress = HttpContext.Connection.RemoteIpAddress?.ToString();
        var response = await _mediator.Send(request, cancellationToken);
        return response.Success ? Ok(response) : Unauthorized(response);
    }

    [Authorize]
    [HttpPost("logout")]
    public async Task<ActionResult<LogoutResponse>> Logout(CancellationToken cancellationToken)
    {
        var userId = GetUserId();
        if (userId == null)
        {
            return Unauthorized();
        }

        var request = new LogoutRequest { UserId = userId.Value, SessionId = Guid.Empty };
        var response = await _mediator.Send(request, cancellationToken);
        return Ok(response);
    }

    [HttpPost("refresh")]
    public async Task<ActionResult<RefreshTokenResponse>> RefreshToken([FromBody] RefreshTokenRequest request, CancellationToken cancellationToken)
    {
        var response = await _mediator.Send(request, cancellationToken);
        return response.Success ? Ok(response) : Unauthorized(response);
    }

    [HttpPost("forgot-password")]
    public async Task<ActionResult<ForgotPasswordResponse>> ForgotPassword([FromBody] ForgotPasswordRequest request, CancellationToken cancellationToken)
    {
        var response = await _mediator.Send(request, cancellationToken);
        return Ok(response);
    }

    [HttpPost("reset-password")]
    public async Task<ActionResult<ResetPasswordResponse>> ResetPassword([FromBody] ResetPasswordRequest request, CancellationToken cancellationToken)
    {
        var response = await _mediator.Send(request, cancellationToken);
        return response.Success ? Ok(response) : BadRequest(response);
    }

    [Authorize]
    [HttpPut("change-password")]
    public async Task<ActionResult<ChangePasswordResponse>> ChangePassword([FromBody] ChangePasswordRequest request, CancellationToken cancellationToken)
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
