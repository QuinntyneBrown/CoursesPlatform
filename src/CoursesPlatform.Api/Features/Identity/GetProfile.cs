// Copyright (c) Quinntyne Brown. All Rights Reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

using CoursesPlatform.Core;
using MediatR;

namespace CoursesPlatform.Api;

public class GetProfileRequest : IRequest<GetProfileResponse>
{
    public Guid UserId { get; set; }
}

public class GetProfileResponse
{
    public UserDto? User { get; set; }
}

public class GetProfileHandler : IRequestHandler<GetProfileRequest, GetProfileResponse>
{
    private readonly ICoursesPlatformContext _context;

    public GetProfileHandler(ICoursesPlatformContext context)
    {
        _context = context;
    }

    public async Task<GetProfileResponse> Handle(GetProfileRequest request, CancellationToken cancellationToken)
    {
        var user = await _context.Users.FindAsync(new object[] { request.UserId }, cancellationToken);

        return new GetProfileResponse { User = user?.ToDto() };
    }
}
