# Stop script on any error
$ErrorActionPreference = "Stop"

# Folder names relative to root
$frontendDir = "frontend"
$backendDir = "backend"

# Docker Hub repo names
$frontendImage = "esheleyni/fatal-combat-frontend:latest"
$backendImage = "esheleyni/fatal-combat-backend:latest"

Write-Host "🚀 Starting Docker build + push process..." -ForegroundColor Cyan


# -----------------------------
# FRONTEND
# -----------------------------
Write-Host "`n=== Building FRONTEND ===" -ForegroundColor Yellow

if (!(Test-Path $frontendDir)) {
    Write-Host "❌ Frontend directory '$frontendDir' not found!" -ForegroundColor Red
    exit 1
}

Set-Location $frontendDir

docker build -t fatal-combat-frontend .
docker tag fatal-combat-frontend $frontendImage
docker push $frontendImage

Set-Location ..

Write-Host "✔ Frontend build + push completed!" -ForegroundColor Green


# -----------------------------
# BACKEND
# -----------------------------
Write-Host "`n=== Building BACKEND ===" -ForegroundColor Yellow

if (!(Test-Path $backendDir)) {
    Write-Host "❌ Backend directory '$backendDir' not found!" -ForegroundColor Red
    exit 1
}

Set-Location $backendDir

docker build -t fatal-combat-backend .
docker tag fatal-combat-backend $backendImage
docker push $backendImage

Set-Location ..

Write-Host "✔ Backend build + push completed!" -ForegroundColor Green


Write-Host "`n🎉 All images built and pushed successfully!" -ForegroundColor Cyan
