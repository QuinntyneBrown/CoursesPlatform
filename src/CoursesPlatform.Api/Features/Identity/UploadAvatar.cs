// Copyright (c) Quinntyne Brown. All Rights Reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

using CoursesPlatform.Core;
using MediatR;

namespace CoursesPlatform.Api;

public class UploadAvatarRequest : IRequest<UploadAvatarResponse>
{
    public Guid UserId { get; set; }

    public Stream FileStream { get; set; } = null!;

    public string FileName { get; set; } = string.Empty;
}

public class UploadAvatarResponse
{
    public bool Success { get; set; }

    public string? AvatarUrl { get; set; }

    public string? Error { get; set; }
}

public class UploadAvatarHandler : IRequestHandler<UploadAvatarRequest, UploadAvatarResponse>
{
    private readonly ICoursesPlatformContext _context;
    private readonly IFileStorageService _fileStorage;
    private readonly ILogger<UploadAvatarHandler> _logger;

    public UploadAvatarHandler(ICoursesPlatformContext context, IFileStorageService fileStorage, ILogger<UploadAvatarHandler> logger)
    {
        _context = context;
        _fileStorage = fileStorage;
        _logger = logger;
    }

    public async Task<UploadAvatarResponse> Handle(UploadAvatarRequest request, CancellationToken cancellationToken)
    {
        var user = await _context.Users.FindAsync(new object[] { request.UserId }, cancellationToken);

        if (user == null)
        {
            return new UploadAvatarResponse { Success = false, Error = "User not found" };
        }

        // Delete old avatar if exists
        if (!string.IsNullOrEmpty(user.AvatarUrl))
        {
            await _fileStorage.DeleteFileAsync(user.AvatarUrl, cancellationToken);
        }

        var avatarUrl = await _fileStorage.UploadAvatarAsync(request.FileStream, request.FileName, cancellationToken);

        user.AvatarUrl = avatarUrl;
        user.UpdatedAt = DateTime.UtcNow;

        await _context.SaveChangesAsync(cancellationToken);

        _logger.LogInformation("Avatar uploaded for user: {UserId}", user.UserId);

        return new UploadAvatarResponse { Success = true, AvatarUrl = avatarUrl };
    }
}
