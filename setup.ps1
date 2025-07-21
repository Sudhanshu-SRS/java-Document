# Java Documentation Project Setup Script
# Run this script to initialize your local Git repository and push to GitHub

param(
    [Parameter(Mandatory=$true)]
    [string]$GitHubUsername,
    
    [Parameter(Mandatory=$true)]
    [string]$RepositoryName = "java-fullstack-documentation",
    
    [string]$YourName = "",
    
    [string]$YourEmail = ""
)

Write-Host "🚀 Setting up Java Documentation Project" -ForegroundColor Green

# Check if Git is installed
try {
    git --version | Out-Null
    Write-Host "✅ Git is installed" -ForegroundColor Green
} catch {
    Write-Host "❌ Git is not installed. Please install Git first." -ForegroundColor Red
    Write-Host "Download from: https://git-scm.com/download/win" -ForegroundColor Yellow
    exit 1
}

# Configure Git if name and email provided
if ($YourName -and $YourEmail) {
    Write-Host "🔧 Configuring Git..." -ForegroundColor Yellow
    git config --global user.name $YourName
    git config --global user.email $YourEmail
    Write-Host "✅ Git configured with name: $YourName and email: $YourEmail" -ForegroundColor Green
}

# Initialize Git repository
Write-Host "📁 Initializing Git repository..." -ForegroundColor Yellow
git init

# Create .gitignore file
Write-Host "📝 Creating .gitignore..." -ForegroundColor Yellow
@"
# Compiled class file
*.class

# Log file
*.log

# BlueJ files
*.ctxt

# Mobile Tools for Java (J2ME)
.mtj.tmp/

# Package Files #
*.jar
*.war
*.nar
*.ear
*.zip
*.tar.gz
*.rar

# virtual machine crash logs
hs_err_pid*

# IDE files
.idea/
*.iml
.vscode/
.eclipse/

# OS files
.DS_Store
Thumbs.db

# Temporary files
*.tmp
*.temp
*~

# Documentation build files
_site/
.sass-cache/
.jekyll-cache/
.jekyll-metadata
"@ | Out-File -FilePath ".gitignore" -Encoding UTF8

# Add all files
Write-Host "📦 Adding all files to Git..." -ForegroundColor Yellow
git add .

# Initial commit
Write-Host "💾 Creating initial commit..." -ForegroundColor Yellow
git commit -m "Initial documentation structure setup

- Add README with team overview and topic assignments
- Add CONTRIBUTING guidelines for team collaboration  
- Add ASSIGNMENT_TRACKER for progress monitoring
- Add GITHUB_SETUP guide for repository configuration
- Add documentation templates and examples
- Set up folder structure for organized documentation"

# Add remote origin
$remoteUrl = "https://github.com/$GitHubUsername/$RepositoryName.git"
Write-Host "🔗 Adding remote origin: $remoteUrl" -ForegroundColor Yellow
git remote add origin $remoteUrl

# Push to GitHub
Write-Host "⬆️ Pushing to GitHub..." -ForegroundColor Yellow
try {
    git push -u origin main
    Write-Host "✅ Successfully pushed to GitHub!" -ForegroundColor Green
} catch {
    Write-Host "⚠️ Push failed. This might mean:" -ForegroundColor Yellow
    Write-Host "   1. Repository doesn't exist on GitHub yet" -ForegroundColor Yellow
    Write-Host "   2. You need to authenticate with GitHub" -ForegroundColor Yellow
    Write-Host "   3. Repository name is incorrect" -ForegroundColor Yellow
    Write-Host "" -ForegroundColor Yellow
    Write-Host "Manual steps:" -ForegroundColor Cyan
    Write-Host "1. Create repository '$RepositoryName' on GitHub" -ForegroundColor Cyan
    Write-Host "2. Run: git push -u origin main" -ForegroundColor Cyan
}

Write-Host ""
Write-Host "🎉 Project setup complete!" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "1. Create the repository on GitHub: https://github.com/new" -ForegroundColor White
Write-Host "2. Repository name: $RepositoryName" -ForegroundColor White
Write-Host "3. Set it to Public so team can see it" -ForegroundColor White
Write-Host "4. Don't add README, .gitignore, or license (we already have them)" -ForegroundColor White
Write-Host "5. If push failed above, run: git push -u origin main" -ForegroundColor White
Write-Host ""
Write-Host "For team collaboration:" -ForegroundColor Cyan
Write-Host "1. Add team members as collaborators in GitHub Settings" -ForegroundColor White
Write-Host "2. Send them the repository link" -ForegroundColor White
Write-Host "3. They can clone with: git clone $remoteUrl" -ForegroundColor White
Write-Host ""
Write-Host "📖 Read GITHUB_SETUP.md for detailed team setup instructions" -ForegroundColor Yellow
Write-Host ""
Write-Host "🌐 Live Website Deployment:" -ForegroundColor Cyan
Write-Host "1. Go to https://netlify.com and sign up" -ForegroundColor White
Write-Host "2. Drag your project folder to netlify.com/drop" -ForegroundColor White
Write-Host "3. Or connect your GitHub repository for auto-deploy" -ForegroundColor White
Write-Host "4. Share the live URL with your team!" -ForegroundColor White
Write-Host ""
Write-Host "📚 Read DEPLOYMENT_GUIDE.md for complete setup instructions" -ForegroundColor Yellow
