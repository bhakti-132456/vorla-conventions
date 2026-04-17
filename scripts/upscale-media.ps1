
$mediaFiles = Get-ChildItem -Path "images", "public" -Recurse -File | Where-Object { $_.Extension -match '\.(jpg|jpeg|png|webp|mp4|mov)$' }

Write-Host "Found $($mediaFiles.Count) media files to upscale."

foreach ($file in $mediaFiles) {
    $oldPath = $file.FullName
    $extension = $file.Extension
    $tempPath = "$($file.DirectoryName)\$($file.BaseName)_upscaled$($extension)"
    
    Write-Host "Upscaling: $($file.Name) using Lanczos + GPU..."
    
    if ($extension -match '\.(mp4|mov)$') {
        # Video: Use NVENC for GPU acceleration
        ffmpeg -i "$oldPath" -vf "scale=iw*2:ih*2:flags=lanczos" -c:v h264_nvenc -preset p7 -rc vbr -cq 24 -y "$tempPath"
    } else {
        # Image: Use Lanczos scale
        ffmpeg -i "$oldPath" -vf "scale=iw*2:ih*2:flags=lanczos" -y "$tempPath"
    }
    
    if ($LASTEXITCODE -eq 0) {
        Remove-Item "$oldPath"
        Move-Item "$tempPath" "$oldPath"
        Write-Host "Successfully upscaled $($file.Name)"
    } else {
        Write-Host "Failed to upscale $($file.Name)" -ForegroundColor Red
        if (Test-Path "$tempPath") { Remove-Item "$tempPath" }
    }
}

Write-Host "Done upscaling all media files."
