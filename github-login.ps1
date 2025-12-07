# github-login.ps1
Write-Host "🔐 GitHub Login Setup" -ForegroundColor Cyan

# Check git config
Write-Host "`n📋 Current Git Configuration:" -ForegroundColor Yellow
git config --global --list | Select-String "user.name|user.email"

# Set if not configured
$name = Read-Host "Enter your name (for commits)"
$email = Read-Host "Enter your GitHub email"

git config --global user.name "$name"
git config --global user.email "$email"

Write-Host "`n🔑 GitHub Authentication:" -ForegroundColor Yellow
Write-Host "1. Use Personal Access Token (Recommended for Windows)"
Write-Host "2. Use GitHub Password (Classic - less secure)"
Write-Host "3. Setup SSH (Advanced)"

$choice = Read-Host "Enter choice (1, 2, or 3)"

if ($choice -eq "1") {
    # Personal Access Token
    Write-Host "`n🔑 Personal Access Token Method:" -ForegroundColor Cyan
    Write-Host "1. Go to: https://github.com/settings/tokens" -ForegroundColor Yellow
    Write-Host "2. Click 'Generate new token (classic)'" -ForegroundColor Yellow
    Write-Host "3. Select these scopes: repo, write:packages, read:packages" -ForegroundColor Yellow
    Write-Host "4. Generate token and copy it" -ForegroundColor Yellow
    Write-Host "5. Paste it below when prompted" -ForegroundColor Yellow
    
    $token = Read-Host "`nPaste your GitHub Personal Access Token" -AsSecureString
    $BSTR = [System.Runtime.InteropServices.Marshal]::SecureStringToBSTR($token)
    $plainToken = [System.Runtime.InteropServices.Marshal]::PtrToStringAuto($BSTR)
    
    # Configure git to use token
    git config --global credential.helper manager
    
    # Store credentials
    $credential = "https://${plainToken}:x-oauth-basic@github.com"
    git config --global credential.https://github.com.helper store
    git config --global credential.https://github.com.username $email
    
    Write-Host "✓ Token configured!" -ForegroundColor Green
    
} elseif ($choice -eq "2") {
    # Password Login
    Write-Host "`n🔑 Password Login (Classic):" -ForegroundColor Cyan
    $password = Read-Host "Enter your GitHub password" -AsSecureString
    $BSTR = [System.Runtime.InteropServices.Marshal]::SecureStringToBSTR($password)
    $plainPassword = [System.Runtime.InteropServices.Marshal]::PtrToStringAuto($BSTR)
    
    # Configure git credentials
    git config --global credential.helper manager
    
    Write-Host "✓ Password configured!" -ForegroundColor Green
    
} elseif ($choice -eq "3") {
    # SSH Setup
    Write-Host "`n🔧 Setting up SSH..." -ForegroundColor Cyan
    
    # Check for existing key
    if (Test-Path "$env:USERPROFILE\.ssh\id_ed25519.pub") {
        Write-Host "✓ SSH key found!" -ForegroundColor Green
        Get-Content "$env:USERPROFILE\.ssh\id_ed25519.pub"
        Write-Host "`nCopy the above key to GitHub: https://github.com/settings/keys" -ForegroundColor Yellow
    } else {
        Write-Host "Creating new SSH key..." -ForegroundColor Yellow
        ssh-keygen -t ed25519 -C "$email"
        Write-Host "`nSSH key created! Copy it from $env:USERPROFILE\.ssh\id_ed25519.pub" -ForegroundColor Green
    }
    
    # Test connection
    Write-Host "`n🔍 Testing connection..." -ForegroundColor Cyan
    ssh -T git@github.com
}

Write-Host "`n✅ Setup complete!" -ForegroundColor Green

# Test the login
Write-Host "`n🧪 Testing GitHub access..." -ForegroundColor Cyan
try {
    $result = git ls-remote https://github.com/Tjsutar/prototype-ReactNative.git 2>&1
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ Successfully connected to GitHub!" -ForegroundColor Green
    } else {
        Write-Host "❌ Connection failed. Please check your credentials." -ForegroundColor Red
    }
} catch {
    Write-Host "❌ Error: $_" -ForegroundColor Red
}