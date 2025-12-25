// Copyright (c) Quinntyne Brown. All Rights Reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

using CoursesPlatform.Core;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

namespace CoursesPlatform.Infrastructure;

public class FileStorageService : IFileStorageService
{
    private readonly IConfiguration _configuration;
    private readonly ILogger<FileStorageService> _logger;
    private readonly string _uploadPath;

    public FileStorageService(IConfiguration configuration, ILogger<FileStorageService> logger)
    {
        _configuration = configuration;
        _logger = logger;
        _uploadPath = configuration["Storage:UploadPath"] ?? Path.Combine(Directory.GetCurrentDirectory(), "uploads");

        if (!Directory.Exists(_uploadPath))
        {
            Directory.CreateDirectory(_uploadPath);
        }
    }

    public async Task<string> UploadAvatarAsync(Stream fileStream, string fileName, CancellationToken cancellationToken = default)
    {
        var avatarsPath = Path.Combine(_uploadPath, "avatars");
        if (!Directory.Exists(avatarsPath))
        {
            Directory.CreateDirectory(avatarsPath);
        }

        var uniqueFileName = $"{Guid.NewGuid()}{Path.GetExtension(fileName)}";
        var filePath = Path.Combine(avatarsPath, uniqueFileName);

        using var file = File.Create(filePath);
        await fileStream.CopyToAsync(file, cancellationToken);

        _logger.LogInformation("Avatar uploaded: {FileName}", uniqueFileName);

        return $"/uploads/avatars/{uniqueFileName}";
    }

    public async Task<string> UploadThumbnailAsync(Stream fileStream, string fileName, CancellationToken cancellationToken = default)
    {
        var thumbnailsPath = Path.Combine(_uploadPath, "thumbnails");
        if (!Directory.Exists(thumbnailsPath))
        {
            Directory.CreateDirectory(thumbnailsPath);
        }

        var uniqueFileName = $"{Guid.NewGuid()}{Path.GetExtension(fileName)}";
        var filePath = Path.Combine(thumbnailsPath, uniqueFileName);

        using var file = File.Create(filePath);
        await fileStream.CopyToAsync(file, cancellationToken);

        _logger.LogInformation("Thumbnail uploaded: {FileName}", uniqueFileName);

        return $"/uploads/thumbnails/{uniqueFileName}";
    }

    public Task DeleteFileAsync(string fileUrl, CancellationToken cancellationToken = default)
    {
        if (string.IsNullOrEmpty(fileUrl))
        {
            return Task.CompletedTask;
        }

        var relativePath = fileUrl.TrimStart('/').Replace("uploads/", string.Empty);
        var filePath = Path.Combine(_uploadPath, relativePath);

        if (File.Exists(filePath))
        {
            File.Delete(filePath);
            _logger.LogInformation("File deleted: {FilePath}", filePath);
        }

        return Task.CompletedTask;
    }
}
