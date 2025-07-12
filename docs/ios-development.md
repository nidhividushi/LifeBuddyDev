# iOS Development Guide

This guide covers iOS development setup, best practices, and troubleshooting for the LifeBuddy mobile app.

## Quick Start

### Prerequisites

- macOS (required for iOS development)
- Xcode 15+ (from App Store)
- CocoaPods (`sudo gem install cocoapods`)
- Node.js 18+ and pnpm

### Initial Setup

```bash
# Complete iOS setup
make ios:setup

# Or use the dedicated script
./scripts/ios-dev.sh setup
```

### Launch iOS Simulator

```bash
# Launch simulator (auto-starts Metro if needed)
make ios:simulator

# Or use the dedicated script
./scripts/ios-dev.sh simulator
```

## Development Commands

### Package.json Scripts

The mobile app includes comprehensive iOS development scripts:

```bash
# Development
pnpm run dev:ios              # Launch iOS simulator
pnpm run dev:ios:device       # Launch on connected device
pnpm run start:metro          # Start Metro with cache reset

# Building
pnpm run ios:build            # Build iOS project
pnpm run ios:archive          # Create release archive
pnpm run ios:clean            # Clean build artifacts

# CocoaPods Management
pnpm run pod-install          # Install CocoaPods dependencies
pnpm run pod-update           # Update CocoaPods dependencies
pnpm run pod-deintegrate      # Remove CocoaPods integration

# Setup & Maintenance
pnpm run setup:ios            # Complete iOS setup
pnpm run reset:ios            # Reset iOS environment
pnpm run clean:all            # Clean everything and reinstall

# Diagnostics
pnpm run doctor               # Run React Native doctor
pnpm run info                 # Show React Native info
```

### Makefile Commands

```bash
# iOS Development
make ios                      # Show all iOS commands
make ios:setup               # Setup iOS environment
make ios:simulator           # Launch simulator
make ios:device              # Launch on device
make ios:build               # Build iOS project
make ios:clean               # Clean iOS artifacts
make ios:reset               # Reset iOS environment
make ios:pods                # Manage CocoaPods
make ios:devices             # List devices/simulators
make ios:doctor              # Run React Native doctor
```

### Dedicated iOS Script

```bash
# Comprehensive iOS development script
./scripts/ios-dev.sh [command]

# Available commands:
./scripts/ios-dev.sh setup          # Complete iOS setup
./scripts/ios-dev.sh simulator      # Launch iOS simulator
./scripts/ios-dev.sh device         # Launch on connected device
./scripts/ios-dev.sh build          # Build iOS project
./scripts/ios-dev.sh archive        # Create release archive
./scripts/ios-dev.sh clean          # Clean iOS build artifacts
./scripts/ios-dev.sh reset          # Complete iOS reset
./scripts/ios-dev.sh pods install   # Install CocoaPods
./scripts/ios-dev.sh pods update    # Update CocoaPods
./scripts/ios-dev.sh pods deintegrate # Remove CocoaPods
./scripts/ios-dev.sh devices        # List available devices/simulators
./scripts/ios-dev.sh doctor         # Run React Native doctor
./scripts/ios-dev.sh info           # Show React Native info
./scripts/ios-dev.sh logs           # Show iOS build logs
./scripts/ios-dev.sh help           # Show help
```

## Environment Detection

The start script now includes intelligent environment detection:

### Development Mode (Default)
```bash
./start                    # Auto-detects iOS environment
./start --dev              # Explicitly set dev mode
./start --ios              # Force iOS simulator launch
```

### Production Mode
```bash
./start --prod             # Production mode, no simulator
./start --no-simulator     # Skip simulator even in dev mode
```

### Auto-Detection
- Automatically detects macOS + Xcode environment
- Enables iOS simulator in development mode
- Disables simulator in production mode
- Provides clear status reporting

## Project Structure

```
mobile/
├── ios/
│   ├── LifeBuddyDev.xcworkspace    # Xcode workspace
│   ├── LifeBuddyDev.xcodeproj/     # Xcode project
│   ├── Podfile                     # CocoaPods configuration
│   ├── Podfile.lock                # Locked dependencies
│   └── Pods/                       # Installed dependencies
├── src/                            # React Native source code
├── package.json                    # Mobile app dependencies
└── metro.config.js                 # Metro bundler config
```

## Troubleshooting

### Common Issues

#### 1. Scheme Not Found
```bash
# Error: Could not find scheme LifeBuddyDev
# Solution: Reset iOS environment
make ios:reset
# or
./scripts/ios-dev.sh reset
```

#### 2. CocoaPods Issues
```bash
# Clean and reinstall pods
cd mobile/ios
pod deintegrate
pod install
cd ../..

# Or use the script
./scripts/ios-dev.sh pods deintegrate
./scripts/ios-dev.sh pods install
```

#### 3. Metro Bundler Issues
```bash
# Reset Metro cache
cd mobile
pnpm run start:metro

# Or kill and restart
lsof -ti:8083 | xargs kill -9
pnpm start
```

#### 4. Build Failures
```bash
# Clean build artifacts
make ios:clean

# Reset entire environment
make ios:reset
```

### Diagnostic Commands

```bash
# Check React Native environment
make ios:doctor

# List available devices/simulators
make ios:devices

# Show build logs
./scripts/ios-dev.sh logs

# Check Xcode installation
xcodebuild -version

# Check CocoaPods installation
pod --version
```

### Log Files

- `logs/ios.log` - iOS simulator launch logs
- `logs/mobile.log` - Metro bundler logs
- `logs/backend.log` - Backend API logs

## Best Practices

### 1. Development Workflow

```bash
# Start development environment
./start --dev

# In another terminal, launch iOS simulator
make ios:simulator

# For device testing
make ios:device
```

### 2. Dependency Management

```bash
# Always use pnpm for Node.js dependencies
pnpm install

# Use dedicated scripts for CocoaPods
pnpm run pod-install
```

### 3. Environment Management

```bash
# Development (with simulator)
./start --dev

# Production (no simulator)
./start --prod

# Custom configuration
./start --no-simulator
```

### 4. Clean Development

```bash
# Regular cleanup
make ios:clean

# Complete reset when needed
make ios:reset
```

## Configuration

### Environment Variables

The start script automatically configures environment variables:

```bash
# Development mode
NODE_ENV=development

# Production mode  
NODE_ENV=production
```

### Metro Configuration

Metro bundler runs on port 8083 by default:

```bash
# Start Metro
cd mobile
pnpm start

# Reset cache
pnpm run start:metro
```

### Xcode Configuration

- Workspace: `LifeBuddyDev.xcworkspace`
- Scheme: `LifeBuddyDev`
- Configuration: Debug (development) / Release (production)

## Integration with Main Start Script

The main start script (`./start`) now includes:

- **Environment Detection**: Auto-detects dev/prod mode
- **iOS Integration**: Automatically launches simulator in dev mode
- **Status Reporting**: Shows iOS simulator status
- **Error Handling**: Comprehensive error handling for iOS issues
- **Logging**: Dedicated iOS logs

### Usage Examples

```bash
# Development with iOS simulator
./start

# Production without simulator
./start --prod

# Development without simulator
./start --no-simulator

# Force iOS simulator
./start --ios
```

## Maintenance

### Regular Maintenance

```bash
# Weekly cleanup
make ios:clean

# Monthly reset
make ios:reset

# Update dependencies
pnpm update
pnpm run pod-update
```

### Before Commits

```bash
# Run tests
pnpm test

# Check linting
pnpm run lint

# Type checking
pnpm run type-check
```

This comprehensive iOS development setup provides a robust, maintainable, and developer-friendly environment for iOS development with proper environment detection and simulator integration. 