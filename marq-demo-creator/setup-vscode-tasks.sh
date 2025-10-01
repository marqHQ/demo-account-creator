#!/bin/bash

# VS Code Tasks Setup Script for Marq Demo Creator
# This script sets up VS Code tasks configuration for your project

set -e  # Exit on any error

echo "🛠️ Setting up VS Code tasks for Marq Demo Creator..."

# Check if package.json exists
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Please run this script in your project root directory."
    exit 1
fi

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo "📦 Installing project dependencies..."
    if command -v npm &> /dev/null; then
        npm install
    elif command -v yarn &> /dev/null; then
        yarn install
    elif command -v pnpm &> /dev/null; then
        pnpm install
    else
        echo "❌ Error: No package manager found (npm, yarn, or pnpm). Please install one first."
        exit 1
    fi
    echo "✅ Dependencies installed successfully!"
else
    echo "✅ Dependencies already installed"
fi

# Create .vscode directory if it doesn't exist
if [ ! -d ".vscode" ]; then
    echo "📁 Creating .vscode directory..."
    mkdir -p .vscode
fi

# Create the tasks.json file with proper formatting
echo "📝 Creating tasks.json configuration..."
cat > .vscode/tasks.json << 'EOF'
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "🚀 Start Dev (Clean)",
      "type": "shell",
      "command": "npm",
      "args": ["run", "dev"],
      "group": {
        "kind": "build",
        "isDefault": true
      },
      "presentation": {
        "echo": true,
        "reveal": "always",
        "focus": false,
        "panel": "new"
      },
      "isBackground": true,
      "problemMatcher": []
    },
    {
      "label": "🧪 Test with Coverage",
      "type": "shell",
      "command": "npm",
      "args": ["run", "test:ci"],
      "group": "test",
      "presentation": {
        "echo": true,
        "reveal": "always",
        "focus": false,
        "panel": "shared"
      }
    },
    {
      "label": "🔍 Lint & Fix",
      "type": "shell",
      "command": "npm",
      "args": ["run", "lint:fix"],
      "group": "test",
      "presentation": {
        "echo": true,
        "reveal": "always",
        "focus": false,
        "panel": "shared"
      }
    },
    {
      "label": "🏗️ Build Production",
      "type": "shell",
      "command": "npm",
      "args": ["run", "build"],
      "group": "build",
      "presentation": {
        "echo": true,
        "reveal": "always",
        "focus": false,
        "panel": "shared"
      }
    },
    {
      "label": "📊 Git Status",
      "type": "shell",
      "command": "git",
      "args": ["status", "-sb"],
      "group": "build",
      "presentation": {
        "echo": true,
        "reveal": "always",
        "focus": false,
        "panel": "shared"
      }
    },
    {
      "label": "🌿 Create Feature Branch",
      "type": "shell",
      "command": "bash",
      "args": ["-c", "echo 'Enter feature name:' && read FEATURE_NAME && SAFE_NAME=$(echo \"$FEATURE_NAME\" | tr '[:upper:]' '[:lower:]' | sed 's/[^a-z0-9]/-/g' | sed 's/--*/-/g' | sed 's/^-\\|-$//g') && git checkout -b feature/$SAFE_NAME && echo \"✅ Created feature/$SAFE_NAME branch\""],
      "group": "build",
      "presentation": {
        "echo": true,
        "reveal": "always",
        "focus": true,
        "panel": "shared"
      }
    },
    {
      "label": "💾 Quick Commit",
      "type": "shell",
      "command": "bash",
      "args": ["-c", "git add . && echo 'Enter commit message:' && read COMMIT_MSG && git commit -m \"$COMMIT_MSG\""],
      "group": "build",
      "presentation": {
        "echo": true,
        "reveal": "always",
        "focus": true,
        "panel": "shared"
      }
    },
    {
      "label": "🚀 Push Current Branch",
      "type": "shell",
      "command": "bash",
      "args": ["-c", "BRANCH=$(git branch --show-current) && git push -u origin $BRANCH && echo '✅ Pushed to origin/$BRANCH'"],
      "group": "build",
      "presentation": {
        "echo": true,
        "reveal": "always",
        "focus": false,
        "panel": "shared"
      }
    },
    {
      "label": "🧹 Clean & Reset",
      "type": "shell",
      "command": "bash",
      "args": ["-c", "npm run clean && rm -rf node_modules && npm install && echo '✅ Project cleaned and dependencies reinstalled'"],
      "group": "build",
      "presentation": {
        "echo": true,
        "reveal": "always",
        "focus": false,
        "panel": "shared"
      }
    },
    {
      "label": "dev",
      "type": "shell",
      "command": "npm",
      "args": ["run", "dev"],
      "group": "build",
      "presentation": {
        "echo": true,
        "reveal": "always",
        "focus": false,
        "panel": "shared"
      },
      "isBackground": true
    },
    {
      "label": "build",
      "type": "shell",
      "command": "npm",
      "args": ["run", "build"],
      "group": "build",
      "presentation": {
        "echo": true,
        "reveal": "always",
        "focus": false,
        "panel": "shared"
      }
    },
    {
      "label": "lint",
      "type": "shell",
      "command": "npm",
      "args": ["run", "lint"],
      "group": "test",
      "presentation": {
        "echo": true,
        "reveal": "always",
        "focus": false,
        "panel": "shared"
      }
    },
    {
      "label": "typecheck",
      "type": "shell",
      "command": "npm",
      "args": ["run", "typecheck"],
      "group": "test",
      "presentation": {
        "echo": true,
        "reveal": "always",
        "focus": false,
        "panel": "shared"
      }
    }
  ]
}
EOF

# Create keybindings.json
echo "⌨️ Creating keybindings.json..."
cat > .vscode/keybindings.json << 'EOF'
[
  {
    "key": "cmd+shift+d",
    "command": "workbench.action.tasks.runTask",
    "args": "🚀 Start Dev (Clean)"
  },
  {
    "key": "cmd+shift+t",
    "command": "workbench.action.tasks.runTask",
    "args": "🧪 Test with Coverage"
  },
  {
    "key": "cmd+shift+l",
    "command": "workbench.action.tasks.runTask",
    "args": "🔍 Lint & Fix"
  },
  {
    "key": "cmd+shift+b",
    "command": "workbench.action.tasks.runTask",
    "args": "🏗️ Build Production"
  },
  {
    "key": "cmd+shift+g",
    "command": "workbench.action.tasks.runTask",
    "args": "📊 Git Status"
  },
  {
    "key": "cmd+shift+f",
    "command": "workbench.action.tasks.runTask",
    "args": "🌿 Create Feature Branch"
  },
  {
    "key": "cmd+shift+c",
    "command": "workbench.action.tasks.runTask",
    "args": "💾 Quick Commit"
  },
  {
    "key": "cmd+shift+u",
    "command": "workbench.action.tasks.runTask",
    "args": "🚀 Push Current Branch"
  }
]
EOF

echo "✅ VS Code tasks have been set up successfully!"
echo ""
echo "🔧 Setup complete! Your project is ready with:"
echo "  ✅ Dependencies installed"
echo "  ✅ VS Code tasks configured"
echo "  ✅ Keyboard shortcuts configured"
echo ""
echo "📋 Available tasks (accessible via Cmd+Shift+P → 'Tasks: Run Task'):"
echo "  • 🚀 Start Dev (Clean) - Start development server (Cmd+Shift+D)"
echo "  • 🧪 Test with Coverage - Run tests with coverage (Cmd+Shift+T)"
echo "  • 🔍 Lint & Fix - Run linting with auto-fix (Cmd+Shift+L)"
echo "  • 🏗️ Build Production - Production build (Cmd+Shift+B)"
echo "  • 📊 Git Status - Show git status (Cmd+Shift+G)"
echo "  • 🌿 Create Feature Branch - Create a new feature branch (Cmd+Shift+F)"
echo "  • 💾 Quick Commit - Stage all files and commit (Cmd+Shift+C)"
echo "  • 🚀 Push Current Branch - Push current branch to origin (Cmd+Shift+U)"
echo "  • 🧹 Clean & Reset - Clean project and reinstall dependencies"
echo ""
echo "🚀 To use these tasks in VS Code:"
echo "  1. Reload VS Code window (Cmd+R or Cmd+Shift+P → 'Developer: Reload Window')"
echo "  2. Press Cmd+Shift+P"
echo "  3. Type 'Tasks: Run Task'"
echo "  4. Select the task you want to run"
echo ""
echo "💡 Or use the keyboard shortcuts listed above!"

# Make the script executable
chmod +x "$0"