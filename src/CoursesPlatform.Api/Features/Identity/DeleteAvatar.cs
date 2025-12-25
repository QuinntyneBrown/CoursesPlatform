// Copyright (c) Quinntyne Brown. All Rights Reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

using CoursesPlatform.Core;
using MediatR;

namespace CoursesPlatform.Api;

public class DeleteAvatarRequest : IRequest<DeleteAvatarResponse>
{
    public Guid UserId { get; set; }
}

public class DeleteAvatarResponse
{
    public bool Success { get; set; }

    public string Message { get; set; } = string.Empty;
}

public class DeleteAvatarHandler : IRequestHandler<DeleteAvatarRequest, DeleteAvatarResponse>
{
    private readonly ICoursesPlatformContext _context;
    private readonly IFileStorageService _fileStorage;
    private readonly ILogger<DeleteAvatarHandler> _logger;

    public DeleteAvatarHandler(ICoursesPlatformContext context, IFileStorageService fileStorage, ILogger<DeleteAvatarHandler> logger)
    {
        _context = context;
        _fileStorage = fileStorage;
        _logger = logger;
    }

    public async Task<DeleteAvatarResponse> Handle(DeleteAvatarRequest request, CancellationToken cancellationToken)
    {
        var user = await _context.Users.FindAsync(new object[] { request.UserId }, cancellationToken);

        if (user == null)
        {
            return new DeleteAvatarResponse { Success = false, Message = "User not found" };
        }

        if (!string.IsNullOrEmpty(user.AvatarUrl))
        {
            await _fileStorage.DeleteFileAsync(user.AvatarUrl, cancellationToken);
            user.AvatarUrl = null;
            user.UpdatedAt = DateTime.UtcNow;
            await _context.SaveChangesAsync(cancellationToken);

            _logger.LogInformation("Avatar deleted for user: {UserId}", user.UserId);
        }

        return new DeleteAvatarResponse { Success = true, Message = "Avatar deleted successfully" };
    }
}
