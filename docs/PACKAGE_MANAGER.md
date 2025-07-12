# Package Manager Policy

## 🎯 **pnpm Only - No npm Confusion**

This project uses **pnpm** exclusively as the package manager to avoid conflicts and ensure consistency.

## ✅ **What We Use: pnpm**

```bash
# Install dependencies
pnpm install

# Add new package
pnpm add package-name

# Run scripts
pnpm run script-name

# Start development
pnpm start
```

## ❌ **What We Don't Use: npm**

```bash
# ❌ DON'T use these
npm install
npm start
npm run dev
```

## 🧹 **Cleanup Commands**

If you accidentally use npm, clean up immediately:

```bash
# Remove npm files
rm -f package-lock.json
rm -rf node_modules

# Reinstall with pnpm
pnpm install
```

## 🔧 **Why pnpm?**

1. **Faster** - Efficient dependency resolution
2. **Disk Space** - Shared dependencies across projects
3. **Consistency** - Same lockfile format across all services
4. **Workspace Support** - Perfect for monorepo structure

## 📁 **Project Structure**

```
LifeBuddy/
├── package.json          # Root workspace
├── pnpm-workspace.yaml   # Workspace config
├── pnpm-lock.yaml        # Lock file (keep this!)
├── backend/              # Backend service
├── web/                  # Web app
└── mobile/               # Mobile app
```

## 🚀 **Quick Start**

```bash
# Install all dependencies
pnpm install

# Start all services
./start

# Or start individually
cd backend && pnpm run dev
cd web && pnpm run dev
cd mobile && pnpm start
```

## ⚠️ **Common Mistakes**

1. **Using npm install** → Use `pnpm install`
2. **Deleting pnpm-lock.yaml** → Keep this file!
3. **Mixing package managers** → Use pnpm only

## 🔍 **Verification**

Check you're using pnpm correctly:

```bash
# Should show pnpm version
pnpm --version

# Should NOT show npm files
ls -la | grep -E "(package-lock|npm-shrinkwrap)"
```

**Remember: pnpm only, no npm confusion!** 🎯 