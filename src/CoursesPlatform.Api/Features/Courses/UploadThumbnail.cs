// Copyright (c) Quinntyne Brown. All Rights Reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

using CoursesPlatform.Core;
using MediatR;

namespace CoursesPlatform.Api;

public class UploadThumbnailRequest : IRequest<UploadThumbnailResponse>
{
    public Guid CourseId { get; set; }

    public Guid UserId { get; set; }

    public Stream FileStream { get; set; } = null!;

    public string FileName { get; set; } = string.Empty;
}

public class UploadThumbnailResponse
{
    public bool Success { get; set; }

    public string? ThumbnailUrl { get; set; }

    public string? Error { get; set; }
}

public class UploadThumbnailHandler : IRequestHandler<UploadThumbnailRequest, UploadThumbnailResponse>
{
    private readonly ICoursesPlatformContext _context;
    private readonly IFileStorageService _fileStorage;
    private readonly ILogger<UploadThumbnailHandler> _logger;

    public UploadThumbnailHandler(ICoursesPlatformContext context, IFileStorageService fileStorage, ILogger<UploadThumbnailHandler> logger)
    {
        _context = context;
        _fileStorage = fileStorage;
        _logger = logger;
    }

    public async Task<UploadThumbnailResponse> Handle(UploadThumbnailRequest request, CancellationToken cancellationToken)
    {
        var course = await _context.Courses.FindAsync(new object[] { request.CourseId }, cancellationToken);

        if (course == null)
        {
            return new UploadThumbnailResponse { Success = false, Error = "Course not found" };
        }

        if (course.InstructorId != request.UserId)
        {
            return new UploadThumbnailResponse { Success = false, Error = "Not authorized" };
        }

        // Delete old thumbnail if exists
        if (!string.IsNullOrEmpty(course.ThumbnailUrl))
        {
            await _fileStorage.DeleteFileAsync(course.ThumbnailUrl, cancellationToken);
        }

        var thumbnailUrl = await _fileStorage.UploadThumbnailAsync(request.FileStream, request.FileName, cancellationToken);

        course.ThumbnailUrl = thumbnailUrl;
        course.UpdatedAt = DateTime.UtcNow;

        await _context.SaveChangesAsync(cancellationToken);

        _logger.LogInformation("Thumbnail uploaded for course: {CourseId}", course.CourseId);

        return new UploadThumbnailResponse { Success = true, ThumbnailUrl = thumbnailUrl };
    }
}
