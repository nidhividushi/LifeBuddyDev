# Contributing to LifeBuddy

Thank you for your interest in contributing to LifeBuddy! This document provides guidelines and information for contributors.

## Table of Contents

- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Coding Standards](#coding-standards)
- [Git Workflow](#git-workflow)
- [Testing](#testing)
- [Code Review Process](#code-review-process)
- [Bug Reports](#bug-reports)
- [Feature Requests](#feature-requests)

## Getting Started

### Prerequisites

- Node.js >= 18.0.0
- pnpm >= 8.0.0
- Docker and Docker Compose
- React Native development environment (for mobile development)
- Git

### Quick Setup

1. **Fork and clone the repository**
   ```bash
   git clone https://github.com/your-username/lifebuddy-app.git
   cd lifebuddy-app
   ```

2. **Install dependencies**
   ```bash
   make setup
   # or manually:
   pnpm install
   cd backend && pnpm install
   cd mobile && pnpm install
   ```

3. **Start development environment**
   ```bash
   make dev:docker  # Start Docker services
   make dev         # Start development servers
   ```

## Development Setup

### Environment Variables

1. Copy the environment template:
   ```bash
   cp env.example .env
   ```

2. Update the `.env` file with your configuration:
   - Database credentials
   - API keys (OpenAI, AWS, etc.)
   - Service URLs

### Database Setup

The project uses Docker Compose for local development:

```bash
# Start all services
make docker:up

# Run migrations
make db:migrate

# Seed with sample data
make db:seed
```

### Mobile Development

For React Native development:

```bash
# Install iOS dependencies
cd mobile && pnpm run pod-install

# Start Metro bundler
pnpm run dev:mobile

# Run on iOS simulator
pnpm run dev:ios

# Run on Android emulator
pnpm run dev:android
```

## Coding Standards

### General Principles

1. **Code Quality**: Write clean, readable, and maintainable code
2. **Documentation**: Document all public APIs and complex logic
3. **Error Handling**: Handle errors gracefully with proper logging
4. **Testing**: Write tests for new features and bug fixes
5. **Performance**: Consider performance implications of your changes

### Code Style

#### JavaScript/TypeScript

- Use TypeScript for all new code
- Follow ESLint and Prettier configurations
- Use meaningful variable and function names
- Add JSDoc comments for public functions
- Use async/await instead of promises when possible

```typescript
/**
 * Creates a new goal for the user
 * @param userId - The user's ID
 * @param goalData - The goal data
 * @returns Promise<Goal> - The created goal
 */
async function createGoal(userId: string, goalData: GoalData): Promise<Goal> {
  try {
    const goal = await Goal.create({ ...goalData, userId });
    logger.info(`Goal created for user ${userId}`, { goalId: goal.id });
    return goal;
  } catch (error) {
    logger.error('Failed to create goal', { userId, error });
    throw new Error('Failed to create goal');
  }
}
```

#### React Native

- Use functional components with hooks
- Follow the established component structure
- Use the theme system for styling
- Implement proper error boundaries

```typescript
import React from 'react';
import { View, Text } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';

interface GoalCardProps {
  goal: Goal;
  onPress: () => void;
}

export const GoalCard: React.FC<GoalCardProps> = ({ goal, onPress }) => {
  const { colors, spacing } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.card }]}>
      <Text style={[styles.title, { color: colors.text }]}>
        {goal.title}
      </Text>
    </View>
  );
};
```

#### Backend (Node.js/Express)

- Use TypeScript for all backend code
- Follow RESTful API design principles
- Implement proper middleware for authentication and validation
- Use dependency injection where appropriate

```typescript
import { Router } from 'express';
import { GoalController } from '../controllers/GoalController';
import { authMiddleware } from '../middleware/auth';
import { validateGoal } from '../middleware/validation';

const router = Router();
const goalController = new GoalController();

router.get('/goals', authMiddleware, goalController.getGoals);
router.post('/goals', authMiddleware, validateGoal, goalController.createGoal);

export default router;
```

### File Organization

```
src/
├── components/          # Reusable UI components
├── screens/            # Screen components
├── navigation/         # Navigation configuration
├── contexts/           # React contexts
├── hooks/              # Custom React hooks
├── services/           # API and external services
├── utils/              # Utility functions
├── types/              # TypeScript type definitions
└── assets/             # Images, fonts, etc.
```

## Git Workflow

### Branch Naming

Use descriptive branch names with prefixes:

- `feature/` - New features
- `bugfix/` - Bug fixes
- `hotfix/` - Critical fixes
- `refactor/` - Code refactoring
- `docs/` - Documentation updates

Examples:
- `feature/goal-templates`
- `bugfix/conversation-audio-upload`
- `refactor/theme-system`

### Commit Messages

Follow conventional commit format:

```
type(scope): description

[optional body]

[optional footer]
```

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes
- `refactor`: Code refactoring
- `test`: Test changes
- `chore`: Build/tooling changes

Examples:
```
feat(goals): add goal template system
fix(auth): resolve token refresh issue
docs(api): update authentication endpoints
```

### Pull Request Process

1. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**
   - Write code following the coding standards
   - Add tests for new functionality
   - Update documentation if needed

3. **Test your changes**
   ```bash
   make test
   make lint
   ```

4. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat(scope): description"
   ```

5. **Push and create a PR**
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Submit a Pull Request**
   - Use the PR template
   - Describe your changes clearly
   - Link any related issues
   - Request reviews from team members

## Testing

### Backend Testing

```bash
# Run all tests
make test:backend

# Run tests with coverage
make test:coverage

# Run specific test file
cd backend && pnpm test -- --testNamePattern="Goal API"
```

### Mobile Testing

```bash
# Run unit tests
make test:mobile

# Run tests with coverage
cd mobile && pnpm test -- --coverage
```

### Testing Guidelines

- Write unit tests for all new functions
- Write integration tests for API endpoints
- Test error scenarios and edge cases
- Maintain test coverage above 80%
- Use meaningful test descriptions

## Code Review Process

### Review Checklist

- [ ] Code follows the established patterns
- [ ] All tests pass
- [ ] No linting errors
- [ ] Documentation is updated
- [ ] Error handling is implemented
- [ ] Performance considerations are addressed
- [ ] Security implications are considered

### Review Guidelines

- Be constructive and respectful
- Focus on the code, not the person
- Suggest improvements with explanations
- Use inline comments for specific issues
- Approve only when all concerns are addressed

## Bug Reports

### Before Submitting

1. Check if the bug has already been reported
2. Try to reproduce the issue
3. Check the latest version

### Bug Report Template

```markdown
**Bug Description**
A clear description of the bug.

**Steps to Reproduce**
1. Go to '...'
2. Click on '...'
3. See error

**Expected Behavior**
What you expected to happen.

**Actual Behavior**
What actually happened.

**Environment**
- OS: [e.g., iOS 15, Android 12]
- App Version: [e.g., 1.0.0]
- Device: [e.g., iPhone 13, Samsung Galaxy S21]

**Additional Context**
Screenshots, logs, or other relevant information.
```

## Feature Requests

### Feature Request Template

```markdown
**Feature Description**
A clear description of the feature you'd like to see.

**Use Case**
How would this feature be used?

**Proposed Implementation**
Any ideas on how this could be implemented?

**Additional Context**
Any other relevant information.
```

## Getting Help

- **Documentation**: Check the project documentation
- **Issues**: Search existing issues for similar problems
- **Discussions**: Use GitHub Discussions for questions
- **Team Chat**: Join our development team chat

## Code of Conduct

We are committed to providing a welcoming and inclusive environment for all contributors. Please read our [Code of Conduct](CODE_OF_CONDUCT.md) for details.

## License

By contributing to LifeBuddy, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to LifeBuddy! 🚀 