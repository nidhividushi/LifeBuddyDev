# Lockfile Management Guide

## Overview
This guide explains how to prevent and fix lockfile inconsistencies in the LifeBuddy project.

## The Problem
Lockfile mismatches occur when:
- Dependencies are added to `package.json` but `pnpm install` isn't run
- Different developers have different versions of dependencies
- CI/CD builds fail due to frozen lockfile checks

## Prevention Measures

### 1. Automatic Checks in Start Script
The `start` script now automatically checks lockfile consistency:
```bash
./start
```
- Checks if lockfiles are in sync with package.json
- Updates lockfiles if mismatches are found
- Continues with service startup

### 2. Pre-commit Hook
A Git pre-commit hook prevents commits with mismatched lockfiles:
```bash
# Automatically runs before each commit
git commit -m "your message"
```
- Checks all packages (backend, web, mobile)
- Blocks commit if lockfiles are out of sync
- Provides clear error messages

### 3. Manual Lockfile Commands
Use these commands to manage lockfiles:

```bash
# Check if all lockfiles are consistent
pnpm lockfile:check

# Update all lockfiles to match package.json
pnpm lockfile:update

# Update and verify lockfiles
pnpm lockfile:fix
```

## How to Fix Lockfile Issues

### When Adding Dependencies
1. Add dependency to `package.json`
2. Run `pnpm install` in that package directory
3. Commit both `package.json` and `pnpm-lock.yaml`

### When Lockfile is Out of Sync
```bash
# Option 1: Use the script command
pnpm lockfile:fix

# Option 2: Manual fix
cd backend && pnpm install
cd ../web && pnpm install  
cd ../mobile && pnpm install
```

### When Docker Build Fails
If Docker build fails with lockfile errors:
1. Run `pnpm lockfile:fix` locally
2. Commit the updated lockfiles
3. Re-run Docker build

## Best Practices

1. **Always run `pnpm install`** after modifying `package.json`
2. **Commit lockfiles** along with package.json changes
3. **Use the pre-commit hook** to catch issues early
4. **Run `pnpm lockfile:check`** before pushing to CI/CD
5. **Keep dependencies consistent** across all packages

## Troubleshooting

### Common Error Messages
- `ERR_PNPM_OUTDATED_LOCKFILE`: Run `pnpm install` in the package directory
- `Cannot find module`: Check if dependency is in package.json and run `pnpm install`
- `Docker build fails`: Update lockfiles locally first

### Reset Everything
```bash
# Remove all node_modules and lockfiles
rm -rf node_modules backend/node_modules web/node_modules mobile/node_modules
rm pnpm-lock.yaml backend/pnpm-lock.yaml web/pnpm-lock.yaml mobile/pnpm-lock.yaml

# Reinstall everything
pnpm install
cd backend && pnpm install && cd ..
cd web && pnpm install && cd ..
cd mobile && pnpm install && cd ..
``` 