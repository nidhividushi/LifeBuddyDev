# Commit Message Guide

## Quick Reference

### Commit Types
- `feat` - New feature
- `fix` - Bug fix
- `docs` - Documentation changes
- `style` - Code style changes (formatting, etc.)
- `refactor` - Code refactoring
- `test` - Test changes
- `chore` - Build/tooling changes

### Scopes
- `mobile` - Mobile app changes
- `backend` - Backend API changes
- `ui` - UI/UX changes
- `auth` - Authentication related
- `goals` - Goal management features
- `chat` - Conversation/AI features
- `db` - Database changes
- `api` - API changes
- `config` - Configuration changes

## Examples

```bash
# New features
git commit -m "feat(goals): add goal template system"
git commit -m "feat(chat): implement voice-to-text conversion"

# Bug fixes
git commit -m "fix(auth): resolve token refresh issue"
git commit -m "fix(mobile): fix navigation crash on iOS"

# Documentation
git commit -m "docs(api): update authentication endpoints"
git commit -m "docs(setup): add development environment guide"

# Code style
git commit -m "style(mobile): fix linting issues"
git commit -m "style(backend): format code with prettier"

# Refactoring
git commit -m "refactor(backend): improve error handling"
git commit -m "refactor(ui): extract reusable components"

# Tests
git commit -m "test(mobile): add unit tests for GoalCard"
git commit -m "test(backend): add integration tests for auth"

# Build/tooling
git commit -m "chore(config): update dependencies"
git commit -m "chore(build): optimize bundle size"
```

## Using the Template

To use the commit message template:

```bash
# Method 1: Use the alias
git cf

# Method 2: Use the template directly
git commit --template=.gitmessage

# Method 3: Quick commits with type
git cfeat "add new feature"
git cfix "fix bug"
git cdocs "update docs"
```

## Rules

1. **Use imperative mood** ("add" not "added" or "adds")
2. **Don't capitalize** first letter
3. **No dot (.)** at the end
4. **Limit subject line** to 50 characters
5. **Wrap body** at 72 characters
6. **Use footer** to reference issues

## Validation

The project uses Husky hooks to validate commit messages. Invalid commits will be rejected with helpful error messages.

## Tips

- Use `git cf` for detailed commits with template
- Use quick aliases (`git cfeat`, `git cfix`, etc.) for simple commits
- Reference issues in commit messages: `Closes #123`, `Fixes #456`
- Use body for detailed explanations when needed 