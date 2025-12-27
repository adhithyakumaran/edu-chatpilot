$ErrorActionPreference = "Stop"

$backendPath = "../edu-chatpilot-backend"

if (-not (Test-Path $backendPath)) {
    Write-Error "Backend directory '$backendPath' not found."
    exit 1
}

Push-Location $backendPath

Write-Host "Reading package.json..."
$pkgContent = Get-Content -Path "package.json" -Raw | ConvertFrom-Json

# Update the start script
$newStart = "npx prisma db push && node dist/index.js"
Write-Host "Setting 'start' script to: $newStart"
$pkgContent.scripts.start = $newStart

# Save back to file
$pkgContent | ConvertTo-Json -Depth 10 | Set-Content -Path "package.json" -Encoding UTF8

Write-Host "package.json updated."

# Git operations
Write-Host "Pushing changes..."
git add package.json
try {
    git commit -m "Fix: Ensure DB schema exists on startup (prisma db push)"
    git push
    Write-Host "Successfully pushed changes to backend repo."
} catch {
    Write-Warning "Git commit/push failed or nothing to commit. Check manually if needed."
    Write-Host $_
}

Pop-Location
