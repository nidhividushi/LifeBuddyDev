# =============================================================================
# LifeBuddy Development Makefile
# =============================================================================

.PHONY: help setup install dev build test lint clean docker-up docker-down ios

# Default target
help:
	@echo "LifeBuddy Development Commands:"
	@echo ""
	@echo "Setup & Installation:"
	@echo "  setup          - Complete project setup (install dependencies, setup databases)"
	@echo "  install        - Install all dependencies"
	@echo "  install:mobile - Install mobile app dependencies"
	@echo "  install:backend- Install backend dependencies"
	@echo ""
	@echo "Development:"
	@echo "  dev            - Start development servers (backend + mobile)"
	@echo "  dev:backend    - Start backend development server"
	@echo "  dev:mobile     - Start mobile development server"
	@echo "  dev:docker     - Start all services with Docker"
	@echo ""
	@echo "iOS Development:"
	@echo "  ios            - Show iOS development commands"
	@echo "  ios:setup      - Setup iOS development environment"
	@echo "  ios:simulator  - Launch iOS simulator"
	@echo "  ios:device     - Launch on connected device"
	@echo "  ios:build      - Build iOS project"
	@echo "  ios:clean      - Clean iOS build artifacts"
	@echo "  ios:reset      - Reset iOS environment"
	@echo "  ios:pods       - Manage CocoaPods dependencies"
	@echo "  ios:devices    - List available devices/simulators"
	@echo "  ios:doctor     - Run React Native doctor"
	@echo ""
	@echo "Building:"
	@echo "  build          - Build all projects"
	@echo "  build:backend  - Build backend"
	@echo "  build:mobile   - Build mobile app"
	@echo "  build:ios      - Build iOS project"
	@echo ""
	@echo "Testing:"
	@echo "  test           - Run all tests"
	@echo "  test:backend   - Run backend tests"
	@echo "  test:mobile    - Run mobile tests"
	@echo "  test:coverage  - Run tests with coverage"
	@echo ""
	@echo "Code Quality:"
	@echo "  lint           - Run linting on all projects"
	@echo "  lint:fix       - Fix linting issues"
	@echo "  format         - Format code with Prettier"
	@echo ""
	@echo "Docker:"
	@echo "  docker:up      - Start Docker services"
	@echo "  docker:down    - Stop Docker services"
	@echo "  docker:build   - Build Docker images"
	@echo ""
	@echo "Cleaning:"
	@echo "  clean          - Clean all build artifacts"
	@echo "  clean:mobile   - Clean mobile build artifacts"
	@echo "  clean:backend  - Clean backend build artifacts"
	@echo "  clean:ios      - Clean iOS build artifacts"

# =============================================================================
# Setup & Installation
# =============================================================================

setup: install docker-up setup-git
	@echo "✅ LifeBuddy setup complete!"
	@echo "📱 Mobile app: pnpm run dev:mobile"
	@echo "🔧 Backend: pnpm run dev:backend"
	@echo "🐳 Docker services: docker-compose up -d"

install:
	@echo "📦 Installing dependencies..."
	pnpm install
	cd backend && pnpm install
	cd mobile && pnpm install
	@echo "✅ Dependencies installed!"

install-mobile:
	@echo "📱 Installing mobile dependencies..."
	cd mobile && pnpm install
	cd mobile && pnpm run pod-install
	@echo "✅ Mobile dependencies installed!"

install-backend:
	@echo "🔧 Installing backend dependencies..."
	cd backend && pnpm install
	@echo "✅ Backend dependencies installed!"

setup-git:
	@echo "🔧 Setting up Git configuration..."
	chmod +x scripts/setup-git.sh
	./scripts/setup-git.sh
	@echo "✅ Git configuration complete!"

# =============================================================================
# Development
# =============================================================================

dev:
	@echo "🚀 Starting development servers..."
	pnpm run dev

dev-backend:
	@echo "🔧 Starting backend development server..."
	cd backend && pnpm run dev

dev-mobile:
	@echo "📱 Starting mobile development server..."
	cd mobile && pnpm start

dev-docker:
	@echo "🐳 Starting development environment with Docker..."
	docker-compose up -d
	@echo "✅ Docker services started!"
	@echo "📊 MongoDB: http://localhost:27017"
	@echo "🔴 Redis: http://localhost:6379"
	@echo "🔍 Elasticsearch: http://localhost:9200"
	@echo "📈 Kibana: http://localhost:5601"
	@echo "🗄️  MinIO: http://localhost:9001"

# =============================================================================
# iOS Development
# =============================================================================

ios:
	@echo "📱 iOS Development Commands:"
	@echo ""
	@echo "Setup:"
	@echo "  make ios:setup      - Setup iOS development environment"
	@echo "  make ios:reset      - Reset iOS environment"
	@echo ""
	@echo "Development:"
	@echo "  make ios:simulator  - Launch iOS simulator"
	@echo "  make ios:device     - Launch on connected device"
	@echo ""
	@echo "Building:"
	@echo "  make ios:build      - Build iOS project"
	@echo "  make ios:clean      - Clean iOS build artifacts"
	@echo ""
	@echo "Management:"
	@echo "  make ios:pods       - Manage CocoaPods dependencies"
	@echo "  make ios:devices    - List available devices/simulators"
	@echo "  make ios:doctor     - Run React Native doctor"
	@echo ""
	@echo "Or use the dedicated script:"
	@echo "  ./scripts/ios-dev.sh [command]"

ios:setup:
	@echo "📱 Setting up iOS development environment..."
	./scripts/ios-dev.sh setup

ios:simulator:
	@echo "📱 Launching iOS simulator..."
	./scripts/ios-dev.sh simulator

ios:device:
	@echo "📱 Launching on connected device..."
	./scripts/ios-dev.sh device

ios:build:
	@echo "📱 Building iOS project..."
	./scripts/ios-dev.sh build

ios:clean:
	@echo "📱 Cleaning iOS build artifacts..."
	./scripts/ios-dev.sh clean

ios:reset:
	@echo "📱 Resetting iOS environment..."
	./scripts/ios-dev.sh reset

ios:pods:
	@echo "📱 Managing CocoaPods dependencies..."
	./scripts/ios-dev.sh pods install

ios:devices:
	@echo "📱 Listing available devices/simulators..."
	./scripts/ios-dev.sh devices

ios:doctor:
	@echo "📱 Running React Native doctor..."
	./scripts/ios-dev.sh doctor

# =============================================================================
# Building
# =============================================================================

build:
	@echo "🏗️  Building all projects..."
	pnpm run build

build-backend:
	@echo "🔧 Building backend..."
	cd backend && pnpm run build

build-mobile:
	@echo "📱 Building mobile app..."
	cd mobile && pnpm run build:android

build-ios:
	@echo "📱 Building iOS project..."
	./scripts/ios-dev.sh build

# =============================================================================
# Testing
# =============================================================================

test:
	@echo "🧪 Running all tests..."
	pnpm run test

test-backend:
	@echo "🔧 Running backend tests..."
	cd backend && pnpm test

test-mobile:
	@echo "📱 Running mobile tests..."
	cd mobile && pnpm test

test-coverage:
	@echo "📊 Running tests with coverage..."
	cd backend && pnpm run test:coverage
	cd mobile && pnpm test -- --coverage

# =============================================================================
# Code Quality
# =============================================================================

lint:
	@echo "🔍 Running linting..."
	pnpm run lint

lint-fix:
	@echo "🔧 Fixing linting issues..."
	pnpm run lint:fix

format:
	@echo "✨ Formatting code..."
	pnpm run format

# =============================================================================
# Docker
# =============================================================================

docker-up:
	@echo "🐳 Starting Docker services..."
	docker-compose up -d
	@echo "✅ Docker services started!"

docker-down:
	@echo "🛑 Stopping Docker services..."
	docker-compose down
	@echo "✅ Docker services stopped!"

docker-build:
	@echo "🏗️  Building Docker images..."
	docker-compose build
	@echo "✅ Docker images built!"

docker-logs:
	@echo "📋 Showing Docker logs..."
	docker-compose logs -f

# =============================================================================
# Cleaning
# =============================================================================

clean:
	@echo "🧹 Cleaning all build artifacts..."
	pnpm run clean
	rm -rf node_modules
	cd backend && rm -rf node_modules dist
	cd mobile && rm -rf node_modules
	@echo "✅ Clean complete!"

clean-mobile:
	@echo "📱 Cleaning mobile build artifacts..."
	cd mobile && pnpm run clean
	cd mobile && rm -rf node_modules

clean-backend:
	@echo "🔧 Cleaning backend build artifacts..."
	cd backend && pnpm run clean
	cd backend && rm -rf node_modules dist

clean-ios:
	@echo "📱 Cleaning iOS build artifacts..."
	./scripts/ios-dev.sh clean

# =============================================================================
# Database
# =============================================================================

db-migrate:
	@echo "🗄️  Running database migrations..."
	cd backend && pnpm run migrate

db-seed:
	@echo "🌱 Seeding database..."
	cd backend && pnpm run seed

db-reset:
	@echo "🔄 Resetting database..."
	docker-compose down -v
	docker-compose up -d mongodb redis elasticsearch
	@echo "⏳ Waiting for databases to start..."
	sleep 10
	cd backend && pnpm run migrate
	cd backend && pnpm run seed
	@echo "✅ Database reset complete!"

# =============================================================================
# Deployment
# =============================================================================

deploy-staging:
	@echo "🚀 Deploying to staging..."
	# Add staging deployment commands here

deploy-production:
	@echo "🚀 Deploying to production..."
	# Add production deployment commands here

# =============================================================================
# Utilities
# =============================================================================

logs:
	@echo "📋 Showing application logs..."
	docker-compose logs -f backend

status:
	@echo "📊 Service Status:"
	@echo "Backend: $(shell curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/health || echo "Not running")"
	@echo "MongoDB: $(shell docker-compose ps mongodb | grep -q "Up" && echo "Running" || echo "Not running")"
	@echo "Redis: $(shell docker-compose ps redis | grep -q "Up" && echo "Running" || echo "Not running")"
	@echo "Elasticsearch: $(shell docker-compose ps elasticsearch | grep -q "Up" && echo "Running" || echo "Not running")"

backup:
	@echo "💾 Creating database backup..."
	docker-compose exec mongodb mongodump --out /data/backup/$(shell date +%Y%m%d_%H%M%S)
	@echo "✅ Backup created!"

restore:
	@echo "📥 Restoring database from backup..."
	# Add restore command here
	@echo "✅ Database restored!" 