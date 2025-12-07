# analyze-simple.ps1
Write-Host "=== ANALYZING SRC FOLDER ===" -ForegroundColor Cyan

# Check if src exists
if (-not (Test-Path ".\src")) {
    Write-Host "ERROR: src folder not found!" -ForegroundColor Red
    exit
}

# 1. Show file count by type
Write-Host "`n1. FILE TYPES:" -ForegroundColor Yellow
Get-ChildItem -Path .\src -Recurse -File | 
    Group-Object Extension | 
    Sort-Object Count -Descending | 
    Format-Table @{Name="Extension";Expression={$_.Name}}, 
                 @{Name="Count";Expression={$_.Count}} -AutoSize

# 2. Show folder structure
Write-Host "`n2. FOLDER STRUCTURE:" -ForegroundColor Yellow
Get-ChildItem -Path .\src -Recurse | 
    Where-Object { $_.PSIsContainer } |
    Select-Object FullName

# 3. Find store/redux files
Write-Host "`n3. STORE/REDUX FILES:" -ForegroundColor Yellow
$storeFiles = Get-ChildItem -Path .\src -Recurse -File | 
    Where-Object { 
        $_.Name -match "store|redux|slice|reducer|action" -or
        $_.FullName -match "store|redux"
    }

if ($storeFiles.Count -eq 0) {
    Write-Host "No store/redux files found!" -ForegroundColor Yellow
} else {
    $storeFiles | ForEach-Object {
        $relativePath = $_.FullName.Replace((Get-Location).Path + "\", "")
        Write-Host "  - $relativePath" -ForegroundColor Green
    }
}

# 4. Show all TypeScript/JavaScript files
Write-Host "`n4. ALL TS/JS FILES:" -ForegroundColor Yellow
$tsFiles = Get-ChildItem -Path .\src -Recurse -Include *.ts, *.tsx, *.js, *.jsx -File
$tsFiles | Select-Object -First 20 | ForEach-Object {
    $relativePath = $_.FullName.Replace((Get-Location).Path + "\", "")
    Write-Host "  - $relativePath" -ForegroundColor Gray
}
Write-Host "  (Showing first 20 of $($tsFiles.Count) files)" -ForegroundColor DarkGray

# 5. Check for App.tsx in root
Write-Host "`n5. APP.TSX CHECK:" -ForegroundColor Yellow
if (Test-Path ".\App.tsx") {
    Write-Host "  Found App.tsx in root directory" -ForegroundColor Green
    Write-Host "  First 10 lines:" -ForegroundColor Gray
    Get-Content .\App.tsx -TotalCount 10
} else {
    Write-Host "  App.tsx not found in root" -ForegroundColor Yellow
}

# 6. Check package.json dependencies
Write-Host "`n6. DEPENDENCIES:" -ForegroundColor Yellow
if (Test-Path ".\package.json") {
    $package = Get-Content .\package.json | ConvertFrom-Json
    
    Write-Host "  React/Redux packages:" -ForegroundColor Gray
    @("react", "react-native", "redux", "@reduxjs/toolkit", "react-redux") | ForEach-Object {
        $pkg = $_
        $version = $package.dependencies.$pkg
        if ($version) {
            Write-Host "  - $pkg : $version" -ForegroundColor Green
        }
    }
}

Write-Host "`n=== ANALYSIS COMPLETE ===" -ForegroundColor Green