#!/bin/bash

# Pre-commit hook to check lockfile consistency
echo "🔍 Checking lockfile consistency..."

# Check backend
if [ -f "backend/package.json" ]; then
    echo "Checking backend lockfile..."
    cd backend
    if ! pnpm install --frozen-lockfile > /dev/null 2>&1; then
        echo "❌ Backend lockfile is out of sync with package.json"
        echo "Run: cd backend && pnpm install"
        exit 1
    fi
    cd ..
fi

# Check web
if [ -f "web/package.json" ]; then
    echo "Checking web lockfile..."
    cd web
    if ! pnpm install --frozen-lockfile > /dev/null 2>&1; then
        echo "❌ Web lockfile is out of sync with package.json"
        echo "Run: cd web && pnpm install"
        exit 1
    fi
    cd ..
fi

# Check mobile
if [ -f "mobile/package.json" ]; then
    echo "Checking mobile lockfile..."
    cd mobile
    if ! pnpm install --frozen-lockfile > /dev/null 2>&1; then
        echo "❌ Mobile lockfile is out of sync with package.json"
        echo "Run: cd mobile && pnpm install"
        exit 1
    fi
    cd ..
fi

echo "✅ All lockfiles are consistent"
exit 0 