# LifeBuddy Mobile App

AI-powered personal growth mobile application built with React Native.

## 🚀 Quick Start

```bash
# Start all services (recommended)
cd .. && ./start

# Start mobile only
pnpm start
```

## 📱 iOS Setup

### Prerequisites
- Xcode installed
- CocoaPods installed (`brew install cocoapods`)
- iOS Simulator or device

### Setup Steps
```bash
# Install CocoaPods dependencies
pnpm run pod-install

# Run on iOS Simulator
pnpm run ios

# Or open in Xcode
open ios/LifeBuddy.xcworkspace
```

### Troubleshooting
- If you get React Native version errors, update dependencies:
  ```bash
  pnpm update
  pnpm run pod-install
  ```

## 🤖 Android Setup

```bash
# Run on Android device/emulator
pnpm run android
```

## 📦 Package Manager

This project uses **pnpm** consistently across all services:
- ✅ Backend: pnpm
- ✅ Web: pnpm  
- ✅ Mobile: pnpm
- ❌ No npm conflicts

## 🔧 Development

```bash
# Start Metro bundler
pnpm start

# Type checking
pnpm run type-check

# Linting
pnpm run lint
pnpm run lint:fix
``` 