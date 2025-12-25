// Copyright (c) Quinntyne Brown. All Rights Reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace CoursesPlatform.Api;

[ApiController]
[Route("api/[controller]")]
public class CategoriesController : ControllerBase
{
    private readonly IMediator _mediator;

    public CategoriesController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpGet]
    public async Task<ActionResult<GetCategoriesResponse>> GetCategories(CancellationToken cancellationToken)
    {
        var response = await _mediator.Send(new GetCategoriesRequest(), cancellationToken);
        return Ok(response);
    }
}
