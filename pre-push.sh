#!/bin/bash

# Pre-push checks script
# Run this before pushing to GitHub to catch errors early

echo "🔍 Running pre-push checks..."
echo ""

# 1. Run linter
echo "1️⃣  Running ESLint..."
npm run lint
if [ $? -ne 0 ]; then
    echo "❌ ESLint failed! Fix the errors above before pushing."
    exit 1
fi
echo "✅ ESLint passed!"
echo ""

# 2. Run build
echo "2️⃣  Running build..."
npm run build
if [ $? -ne 0 ]; then
    echo "❌ Build failed! Fix the errors above before pushing."
    exit 1
fi
echo "✅ Build passed!"
echo ""

# 3. Check for sensitive files
echo "3️⃣  Checking for sensitive files..."
if git ls-files | grep -E "\.env$|\.env\.local$" > /dev/null; then
    echo "⚠️  Warning: .env files found in git!"
    git ls-files | grep -E "\.env$|\.env\.local$"
    echo "❌ Remove .env files before pushing!"
    exit 1
fi
echo "✅ No sensitive files found!"
echo ""

echo "🎉 All checks passed! Safe to push."
