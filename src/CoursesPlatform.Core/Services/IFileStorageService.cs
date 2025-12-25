// Copyright (c) Quinntyne Brown. All Rights Reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

namespace CoursesPlatform.Core;

public interface IFileStorageService
{
    Task<string> UploadAvatarAsync(Stream fileStream, string fileName, CancellationToken cancellationToken = default);

    Task<string> UploadThumbnailAsync(Stream fileStream, string fileName, CancellationToken cancellationToken = default);

    Task DeleteFileAsync(string fileUrl, CancellationToken cancellationToken = default);
}
