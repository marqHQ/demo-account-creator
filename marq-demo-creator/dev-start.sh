#!/bin/bash

# Marq Demo Creator - Development Start Script
# This script cleans up, installs dependencies, and starts the development server

echo "🚀 Starting Marq Demo Creator Development Environment..."
echo "=============================================="

# Check if node_modules exists and is up to date
if [ ! -d "node_modules" ] || [ "package.json" -nt "node_modules" ]; then
  echo "📦 Installing dependencies..."
  npm install
fi

# Clean previous build artifacts
echo "🧹 Cleaning build artifacts..."
npm run clean

# Run type check
echo "🔍 Running TypeScript type check..."
npm run typecheck

# Run linter
echo "🔧 Running ESLint..."
npm run lint

# Start development server
echo "🌐 Starting development server..."
echo "Access your app at: http://localhost:5173"
echo "=============================================="

npm run dev