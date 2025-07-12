#!/bin/bash

# ========================================
# LifeBuddy iOS Development Script
# ========================================
# 
# This script provides comprehensive iOS development utilities:
# • iOS Simulator Management
# • Xcode Project Management
# • CocoaPods Management
# • Build and Archive Operations
# • Device Management
# • Troubleshooting Tools
#
# Usage: ./scripts/ios-dev.sh [command] [options]
# Commands:
#   setup          - Complete iOS setup (pods, clean, verify)
#   simulator      - Launch iOS simulator
#   device         - Launch on connected device
#   build          - Build iOS project
#   archive        - Create release archive
#   clean          - Clean iOS build artifacts
#   reset          - Complete iOS reset (clean + reinstall pods)
#   pods           - Manage CocoaPods
#   devices        - List available devices/simulators
#   doctor         - Run React Native doctor
#   info           - Show React Native info
#   logs           - Show iOS build logs
#   help           - Show this help
# ========================================

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Project root directory
PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
MOBILE_DIR="$PROJECT_ROOT/mobile"
IOS_DIR="$MOBILE_DIR/ios"

# Logging function
log() {
    echo -e "${GREEN}[$(date +'%Y-%m-%d %H:%M:%S')]${NC} $1"
}

warn() {
    echo -e "${YELLOW}[$(date +'%H:%M:%S')] WARNING:${NC} $1"
}

error() {
    echo -e "${RED}[$(date +'%H:%M:%S')] ERROR:${NC} $1"
}

info() {
    echo -e "${BLUE}[$(date +'%H:%M:%S')] INFO:${NC} $1"
}

success() {
    echo -e "${GREEN}[$(date +'%H:%M:%S')] SUCCESS:${NC} $1"
}

# Check if we're on macOS
check_macos() {
    if [[ "$OSTYPE" != "darwin"* ]]; then
        error "This script is designed for macOS only"
        exit 1
    fi
}

# Check Xcode installation
check_xcode() {
    if ! command -v xcodebuild &> /dev/null; then
        error "Xcode is not installed. Please install Xcode from the App Store"
        exit 1
    fi
    
    # Check Xcode version
    XCODE_VERSION=$(xcodebuild -version | head -n 1)
    info "Using $XCODE_VERSION"
}

# Check CocoaPods installation
check_cocoapods() {
    if ! command -v pod &> /dev/null; then
        error "CocoaPods is not installed. Please install CocoaPods: sudo gem install cocoapods"
        exit 1
    fi
    
    POD_VERSION=$(pod --version)
    info "Using CocoaPods $POD_VERSION"
}

# Check iOS project structure
check_ios_project() {
    if [ ! -d "$IOS_DIR" ]; then
        error "iOS project not found at $IOS_DIR"
        exit 1
    fi
    
    if [ ! -f "$IOS_DIR/LifeBuddyDev.xcworkspace" ]; then
        error "Xcode workspace not found. Please run setup first"
        exit 1
    fi
    
    if [ ! -d "$IOS_DIR/Pods" ]; then
        warn "CocoaPods dependencies not installed. Run 'pods install' first"
    fi
}

# Setup iOS development environment
setup_ios() {
    log "Setting up iOS development environment..."
    
    check_macos
    check_xcode
    check_cocoapods
    
    cd "$MOBILE_DIR"
    
    # Install dependencies
    info "Installing mobile dependencies..."
    pnpm install
    
    # Install CocoaPods dependencies
    info "Installing CocoaPods dependencies..."
    cd ios
    pod install
    cd ..
    
    # Clean build artifacts
    info "Cleaning build artifacts..."
    pnpm run clean:ios
    
    # Verify setup
    info "Verifying iOS setup..."
    if xcodebuild -list -workspace ios/LifeBuddyDev.xcworkspace | grep -q "LifeBuddyDev"; then
        success "iOS development environment setup complete"
    else
        error "iOS setup verification failed"
        exit 1
    fi
}

# Launch iOS simulator
launch_simulator() {
    log "Launching iOS simulator..."
    
    check_ios_project
    cd "$MOBILE_DIR"
    
    # Check if Metro is running
    if ! lsof -Pi :8083 -sTCP:LISTEN -t >/dev/null 2>&1; then
        warn "Metro bundler not running. Starting Metro..."
        pnpm start &
        sleep 10
    fi
    
    # Launch simulator
    pnpm run dev:ios
}

# Launch on device
launch_device() {
    log "Launching on connected device..."
    
    check_ios_project
    cd "$MOBILE_DIR"
    
    # Check if Metro is running
    if ! lsof -Pi :8083 -sTCP:LISTEN -t >/dev/null 2>&1; then
        warn "Metro bundler not running. Starting Metro..."
        pnpm start &
        sleep 10
    fi
    
    # Launch on device
    pnpm run dev:ios:device
}

# Build iOS project
build_ios() {
    log "Building iOS project..."
    
    check_ios_project
    cd "$MOBILE_DIR"
    
    pnpm run ios:build
}

# Create release archive
archive_ios() {
    log "Creating iOS release archive..."
    
    check_ios_project
    cd "$MOBILE_DIR"
    
    pnpm run ios:archive
}

# Clean iOS build artifacts
clean_ios() {
    log "Cleaning iOS build artifacts..."
    
    check_ios_project
    cd "$MOBILE_DIR"
    
    pnpm run clean:ios
}

# Reset iOS environment
reset_ios() {
    log "Resetting iOS environment..."
    
    check_ios_project
    cd "$MOBILE_DIR"
    
    pnpm run reset:ios
}

# Manage CocoaPods
manage_pods() {
    local action="$1"
    
    case "$action" in
        "install")
            log "Installing CocoaPods dependencies..."
            cd "$IOS_DIR"
            pod install
            ;;
        "update")
            log "Updating CocoaPods dependencies..."
            cd "$IOS_DIR"
            pod update
            ;;
        "deintegrate")
            log "Deintegrating CocoaPods..."
            cd "$IOS_DIR"
            pod deintegrate
            ;;
        "install-all")
            log "Installing all dependencies..."
            cd "$MOBILE_DIR"
            pnpm run install:all
            ;;
        *)
            error "Unknown pods action: $action"
            echo "Available actions: install, update, deintegrate, install-all"
            exit 1
            ;;
    esac
}

# List available devices and simulators
list_devices() {
    log "Available devices and simulators:"
    echo
    
    # List physical devices
    echo -e "${CYAN}Physical Devices:${NC}"
    xcrun xctrace list devices 2>/dev/null | grep -E "(iPhone|iPad)" | grep -v "Simulator" || echo "No physical devices found"
    echo
    
    # List simulators
    echo -e "${CYAN}Simulators:${NC}"
    xcrun simctl list devices | grep -E "(iPhone|iPad)" | grep "Shutdown\|Booted" || echo "No simulators found"
    echo
    
    # List running simulators
    echo -e "${CYAN}Running Simulators:${NC}"
    xcrun simctl list devices | grep -E "(iPhone|iPad)" | grep "Booted" || echo "No running simulators"
}

# Run React Native doctor
run_doctor() {
    log "Running React Native doctor..."
    cd "$MOBILE_DIR"
    pnpm run doctor
}

# Show React Native info
show_info() {
    log "React Native environment information:"
    cd "$MOBILE_DIR"
    pnpm run info
}

# Show iOS build logs
show_logs() {
    log "Recent iOS build logs:"
    
    if [ -f "$PROJECT_ROOT/logs/ios.log" ]; then
        echo -e "${CYAN}iOS Logs:${NC}"
        tail -n 50 "$PROJECT_ROOT/logs/ios.log"
    else
        echo "No iOS logs found"
    fi
    
    if [ -f "$PROJECT_ROOT/logs/mobile.log" ]; then
        echo -e "${CYAN}Mobile Metro Logs:${NC}"
        tail -n 30 "$PROJECT_ROOT/logs/mobile.log"
    fi
}

# Show help
show_help() {
    echo "LifeBuddy iOS Development Script"
    echo ""
    echo "Usage: $0 [command] [options]"
    echo ""
    echo "Commands:"
    echo "  setup          - Complete iOS setup (pods, clean, verify)"
    echo "  simulator      - Launch iOS simulator"
    echo "  device         - Launch on connected device"
    echo "  build          - Build iOS project"
    echo "  archive        - Create release archive"
    echo "  clean          - Clean iOS build artifacts"
    echo "  reset          - Complete iOS reset (clean + reinstall pods)"
    echo "  pods [action]  - Manage CocoaPods (install, update, deintegrate, install-all)"
    echo "  devices        - List available devices/simulators"
    echo "  doctor         - Run React Native doctor"
    echo "  info           - Show React Native info"
    echo "  logs           - Show iOS build logs"
    echo "  help           - Show this help"
    echo ""
    echo "Examples:"
    echo "  $0 setup"
    echo "  $0 simulator"
    echo "  $0 pods install"
    echo "  $0 devices"
}

# Main execution
main() {
    local command="$1"
    local action="$2"
    
    case "$command" in
        "setup")
            setup_ios
            ;;
        "simulator")
            launch_simulator
            ;;
        "device")
            launch_device
            ;;
        "build")
            build_ios
            ;;
        "archive")
            archive_ios
            ;;
        "clean")
            clean_ios
            ;;
        "reset")
            reset_ios
            ;;
        "pods")
            manage_pods "$action"
            ;;
        "devices")
            list_devices
            ;;
        "doctor")
            run_doctor
            ;;
        "info")
            show_info
            ;;
        "logs")
            show_logs
            ;;
        "help"|"-h"|"--help"|"")
            show_help
            ;;
        *)
            error "Unknown command: $command"
            show_help
            exit 1
            ;;
    esac
}

# Run main function
main "$@" 