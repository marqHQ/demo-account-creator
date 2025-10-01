#!/bin/bash

# Git Integration Workflow for Product Hub + Demo Creator
# This script helps you properly integrate the demo creator using git best practices

echo "🌿 Setting up Demo Creator integration branch in Product Hub..."

# Step 1: Navigate to Product Hub and create feature branch
echo "📁 Navigating to Product Hub directory..."
if [ ! -d "../product-hub" ] && [ ! -d "product-hub" ]; then
    echo "❌ Product Hub not found. Please clone it first:"
    echo "git clone https://github.com/marqHQ/product-hub.git"
    exit 1
fi

# Find product hub directory
PRODUCT_HUB_DIR=""
if [ -d "product-hub" ]; then
    PRODUCT_HUB_DIR="product-hub"
elif [ -d "../product-hub" ]; then
    PRODUCT_HUB_DIR="../product-hub"
fi

echo "📦 Found Product Hub at: $PRODUCT_HUB_DIR"

# Step 2: Create and checkout feature branch
echo "🌿 Creating feature branch for demo creator..."
cd "$PRODUCT_HUB_DIR"

# Make sure we're on main and up to date
git checkout main
git pull origin main

# Create feature branch
BRANCH_NAME="feature/add-demo-creator"
echo "Creating branch: $BRANCH_NAME"
git checkout -b "$BRANCH_NAME"

# Step 3: Create apps directory if it doesn't exist
echo "📁 Setting up directory structure..."
mkdir -p apps
mkdir -p packages

# Step 4: Copy demo creator files
echo "📦 Copying Demo Creator files..."
DEMO_CREATOR_SOURCE="../marq-demo-creator"
if [ ! -d "$DEMO_CREATOR_SOURCE" ]; then
    DEMO_CREATOR_SOURCE="../Demo Account Creator/marq-demo-creator"
fi

if [ -d "$DEMO_CREATOR_SOURCE" ]; then
    cp -r "$DEMO_CREATOR_SOURCE" apps/demo-creator

    # Clean up git-related files
    rm -rf apps/demo-creator/.git
    rm -f apps/demo-creator/.gitignore

    # Remove node_modules and build artifacts
    rm -rf apps/demo-creator/node_modules
    rm -rf apps/demo-creator/dist
    rm -rf apps/demo-creator/.vscode

    echo "✅ Demo Creator copied to apps/demo-creator"
else
    echo "❌ Could not find demo creator source directory"
    echo "Expected at: $DEMO_CREATOR_SOURCE"
    exit 1
fi

# Step 5: Update package.json name for monorepo
echo "📝 Updating package.json for monorepo structure..."
cd apps/demo-creator
sed -i '' 's/"name": "marq-demo-creator"/"name": "@marq\/demo-creator"/g' package.json
cd ../..

# Step 6: Update root package.json if it exists
echo "🔧 Checking root package.json..."
if [ -f "package.json" ]; then
    echo "Found existing package.json - you may need to manually add workspace configuration"
else
    echo "No root package.json found - you may want to create one with workspace support"
fi

# Step 7: Stage changes
echo "📋 Staging changes for commit..."
git add apps/demo-creator/
git add -A

# Step 8: Create commit
echo "💾 Creating commit..."
git commit -m "feat: add demo creator app

- Add Marq Demo Creator as new app in monorepo
- Modern React + TypeScript + Tailwind implementation
- Responsive dashboard with demo account management
- Search, filter, and table view functionality
- Marq-branded UI with user profile integration
- Ready for production deployment

Co-authored-by: Claude <noreply@anthropic.com>"

echo ""
echo "🎉 Integration complete! Next steps:"
echo ""
echo "1. Review the changes:"
echo "   cd $PRODUCT_HUB_DIR"
echo "   git status"
echo "   git log --oneline -1"
echo ""
echo "2. Test the integration:"
echo "   cd apps/demo-creator"
echo "   npm install"
echo "   npm run dev"
echo ""
echo "3. Update root package.json (if needed) with workspaces:"
echo "   Add: \"workspaces\": [\"apps/*\", \"packages/*\"]"
echo ""
echo "4. Push the branch:"
echo "   git push origin $BRANCH_NAME"
echo ""
echo "5. Create Pull Request on GitHub"
echo ""
echo "🌿 Branch created: $BRANCH_NAME"
echo "📁 Demo Creator location: apps/demo-creator"