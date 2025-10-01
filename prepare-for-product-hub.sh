#!/bin/bash

# Script to prepare marq-demo-creator for Product Hub integration
# Run this script from the parent directory of both repos

echo "🚀 Preparing Demo Creator for Product Hub integration..."

# Check if Product Hub directory exists
if [ ! -d "product-hub" ]; then
    echo "❌ Product Hub directory not found. Please clone it first:"
    echo "git clone https://github.com/marqHQ/product-hub.git"
    exit 1
fi

echo "📁 Creating apps directory structure in Product Hub..."
mkdir -p product-hub/apps

echo "📦 Copying Demo Creator to Product Hub..."
cp -r marq-demo-creator product-hub/apps/demo-creator

echo "🧹 Cleaning up unnecessary files in the copied version..."
cd product-hub/apps/demo-creator

# Remove git-related files since this will be part of the main repo
rm -rf .git
rm -f .gitignore

# Remove node_modules if it exists
rm -rf node_modules

# Remove any VS Code settings (Product Hub might have its own)
rm -rf .vscode

echo "📝 Updating package.json for monorepo structure..."
# Update the name field in package.json
sed -i '' 's/"name": "marq-demo-creator"/"name": "@marq\/demo-creator"/g' package.json

echo "✅ Demo Creator has been prepared for Product Hub integration!"
echo ""
echo "Next steps:"
echo "1. Review the changes in product-hub/apps/demo-creator"
echo "2. Update the root Product Hub package.json if using a monorepo tool (lerna, nx, etc.)"
echo "3. Add demo-creator to any workspace configurations"
echo "4. Test the integration by running npm install from the Product Hub root"
echo "5. Update any deployment scripts or Vercel configuration"
echo ""
echo "The demo creator is now ready at: product-hub/apps/demo-creator"