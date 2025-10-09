# Copy _css _font _img _js to anki collection media folder
# Usage: .\copy_to_media.ps1 -sourcePath "." -collectionPath "C:\path\to\Anki\User1\collection.media"
# default collection path to ANKI_COLLECTION_MEDIA environment variable if set
param (
    [string]$sourcePath = ".",
    [string]$mediaPath = "$env:ANKI_COLLECTION_MEDIA"
)

# check source path and media path absolute path is not the same
if ((Resolve-Path $sourcePath).ProviderPath -eq (Resolve-Path $mediaPath).ProviderPath) {
    Write-Host "Source path and media path cannot be the same."
    exit 1
}

# check mediaPath contains "collection.media"
if ($mediaPath -notlike "*collection.media*") {
    Write-Host "Media path must contain 'collection.media'."
    exit 1
}

$foldersToCopy = @("_css", "_font", "_img", "_js")
foreach ($folder in $foldersToCopy) {
    $sourceFolder = Join-Path $sourcePath $folder
    # check if source folder exists
    if (Test-Path $sourceFolder) {
        $destinationFolder = Join-Path $mediaPath $folder
        if (-not (Test-Path $destinationFolder)) {
            # create destination folder if not exists
            New-Item -ItemType Directory -Path $destinationFolder | Out-Null
        }
        # copy contents of source folder to destination folder
        Copy-Item -Path (Join-Path $sourceFolder "*") -Destination $destinationFolder -Recurse -Force
        Write-Host "Copied contents of $sourceFolder to $destinationFolder"
    } else {
        Write-Host "Source folder $sourceFolder does not exist. Skipping."
    }
}
