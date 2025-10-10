# Copy src to anki collection media folder
# Usage 1: .\deploy.ps1
# Usage 2: .\deploy.ps1 -sourcePath "./src" -collectionPath "C:\path\to\Anki\User1\collection.media"
# Defaults media path to $env:ANKI_COLLECTION_MEDIA environment variable if set

param (
    [string]$sourcePath = "./src",
    [string]$mediaPath = "$env:ANKI_COLLECTION_MEDIA"
)

# check paths exist
if (-not (Test-Path $mediaPath)) {
    throw "Media path does not exist: $mediaPath"
}
if (-not (Test-Path $sourcePath)) {
    throw "Source path does not exist: $sourcePath"
}

# check source path and media path absolute path is not the same
if ((Resolve-Path $sourcePath).ProviderPath -eq (Resolve-Path $mediaPath).ProviderPath) {
    throw "Source path and media path cannot be the same."
}

# check mediaPath contains "collection.media"
if ($mediaPath -notlike "*collection.media*") {
    throw "Media path must contain 'collection.media'."
}

# copy contents of source folder to destination folder
Copy-Item -Path (Join-Path $sourcePath "*") -Destination $mediaPath -Recurse -Force
Write-Host "Copied contents of $sourcePath to $mediaPath"