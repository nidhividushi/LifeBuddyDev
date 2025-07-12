#!/bin/bash

# LifeBuddy Git Setup Script
# Configures git with commit message template and Husky hooks

echo "🔧 Setting up Git configuration for LifeBuddy..."

# Set commit message template
git config commit.template .gitmessage

# Initialize Husky
echo "📦 Installing Husky hooks..."
npx husky install

# Make hooks executable
chmod +x .husky/pre-commit
chmod +x .husky/commit-msg

# Set up git aliases for common commit types
echo "📝 Setting up Git aliases..."

git config alias.cf "commit --template=.gitmessage"
git config alias.cfeat "commit -m \"feat: \""
git config alias.cfix "commit -m \"fix: \""
git config alias.cdocs "commit -m \"docs: \""
git config alias.cstyle "commit -m \"style: \""
git config alias.crefactor "commit -m \"refactor: \""
git config alias.ctest "commit -m \"test: \""
git config alias.cchore "commit -m \"chore: \""

echo "✅ Git setup complete!"
echo ""
echo "📋 Available commit aliases:"
echo "  git cf      - Commit with template"
echo "  git cfeat   - Commit with feat type"
echo "  git cfix    - Commit with fix type"
echo "  git cdocs   - Commit with docs type"
echo "  git cstyle  - Commit with style type"
echo "  git crefactor - Commit with refactor type"
echo "  git ctest   - Commit with test type"
echo "  git cchore  - Commit with chore type"
echo ""
echo "💡 Tip: Use 'git cf' to open the commit template editor" 