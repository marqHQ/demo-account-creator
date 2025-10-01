#!/bin/bash

# VS Code Tasks Setup Script
# This script creates VS Code tasks that work from the parent directory
# by using the "cwd" option to run commands in subdirectories

set -e  # Exit on any error

echo "🚀 Setting up VS Code tasks for nested project structure..."

# Get the project subdirectory name
PROJECT_DIR=""
if [ -d "marq-demo-creator" ]; then
    PROJECT_DIR="marq-demo-creator"
elif [ -f "package.json" ]; then
    # If we're already in the project directory, use current directory
    PROJECT_DIR="."
else
    echo "❌ Error: Could not find project directory with package.json"
    echo "Please run this script from the parent directory of your project"
    exit 1
fi

echo "📁 Found project directory: $PROJECT_DIR"

# Create .vscode directory if it doesn't exist
mkdir -p .vscode

echo "📝 Creating tasks.json..."

# Create tasks.json with proper cwd configuration
cat > .vscode/tasks.json << 'EOF'
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "🚀 Start Dev (Clean)",
      "type": "shell",
      "command": "npm",
      "args": ["run", "dev"],
      "options": {
        "cwd": "${workspaceFolder}/PROJECT_PLACEHOLDER"
      },
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
      "options": {
        "cwd": "${workspaceFolder}/PROJECT_PLACEHOLDER"
      },
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
      "options": {
        "cwd": "${workspaceFolder}/PROJECT_PLACEHOLDER"
      },
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
      "options": {
        "cwd": "${workspaceFolder}/PROJECT_PLACEHOLDER"
      },
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
      "options": {
        "cwd": "${workspaceFolder}/PROJECT_PLACEHOLDER"
      },
      "group": "build",
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

# Replace the placeholder with actual project directory
if [[ "$OSTYPE" == "darwin"* ]]; then
    # macOS
    sed -i '' "s/PROJECT_PLACEHOLDER/$PROJECT_DIR/g" .vscode/tasks.json
else
    # Linux
    sed -i "s/PROJECT_PLACEHOLDER/$PROJECT_DIR/g" .vscode/tasks.json
fi

echo "⌨️  Creating keybindings.json..."

# Create keybindings.json
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

echo ""
echo "✅ VS Code tasks setup complete!"
echo ""
echo "📋 Available keyboard shortcuts:"
echo "  Cmd+Shift+D - 🚀 Start Dev (Clean)"
echo "  Cmd+Shift+T - 🧪 Test with Coverage"
echo "  Cmd+Shift+L - 🔍 Lint & Fix"
echo "  Cmd+Shift+B - 🏗️ Build Production"
echo "  Cmd+Shift+G - 📊 Git Status"
echo "  Cmd+Shift+F - 🌿 Create Feature Branch"
echo "  Cmd+Shift+C - 💾 Quick Commit"
echo "  Cmd+Shift+U - 🚀 Push Current Branch"
echo ""
echo "🔑 Key insight: The 'cwd' option in tasks.json allows VS Code to run"
echo "   commands in subdirectories even when the workspace is opened at the parent level."
echo ""
echo "💡 To use: Open VS Code at this directory level, then use the shortcuts above!"
echo "   Or press Cmd+Shift+P → 'Tasks: Run Task' → select from the list"