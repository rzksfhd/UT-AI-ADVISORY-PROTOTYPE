#!/bin/bash
# Deploy Script untuk UT-AI-ADVISORY-PROTOTYPE
# Usage: ./deploy-to-github.sh <GITHUB_USERNAME> <GITHUB_TOKEN>

set -e

USERNAME=${1:-rzksfhd}
REPO_NAME="UT-AI-ADVISORY-PROTOTYPE"
TOKEN=$2

echo "🚀 DEPLOY AI ADVISORY PROTOTYPE TO GITHUB PAGES"
echo "================================================"
echo ""

if [ -z "$TOKEN" ]; then
    echo "❌ Error: GitHub token diperlukan"
    echo "Usage: ./deploy-to-github.sh <username> <token>"
    echo ""
    echo "Untuk mendapatkan token:"
    echo "1. Buka https://github.com/settings/tokens"
    echo "2. Generate new token (classic)"
    echo "3. Centang 'repo' dan 'workflow'"
    exit 1
fi

cd /home/ubuntu/UT-AI-ADVISORY-PROTOTYPE

echo "📦 Step 1: Creating GitHub Repository..."
curl -H "Authorization: token $TOKEN" \
     -H "Accept: application/vnd.github.v3+json" \
     -X POST \
     -d "{\"name\":\"$REPO_NAME\",\"private\":false,\"auto_init\":false}" \
     https://api.github.com/user/repos

echo ""
echo "🔗 Step 2: Adding remote repository..."
git remote add origin "https://$USERNAME:$TOKEN@github.com/$USERNAME/$REPO_NAME.git" 2>/dev/null || git remote set-url origin "https://$USERNAME:$TOKEN@github.com/$USERNAME/$REPO_NAME.git"

echo ""
echo "📤 Step 3: Pushing code to GitHub..."
git push -u origin main --force

echo ""
echo "⚙️  Step 4: Enabling GitHub Pages..."
curl -H "Authorization: token $TOKEN" \
     -H "Accept: application/vnd.github.v3+json" \
     -X POST \
     -d '{"source":{"branch":"main","path":"/"}}' \
     "https://api.github.com/repos/$USERNAME/$REPO_NAME/pages" 2>/dev/null || echo "Pages might already be enabled"

echo ""
echo "✅ DEPLOYMENT COMPLETE!"
echo ""
echo "🔗 URL Repository: https://github.com/$USERNAME/$REPO_NAME"
echo "🌐 URL Demo: https://$USERNAME.github.io/$REPO_NAME/"
echo ""
echo "⏳ Tunggu 2-3 menit untuk build dan deploy..."
echo "📊 Cek status di: https://github.com/$USERNAME/$REPO_NAME/actions"
