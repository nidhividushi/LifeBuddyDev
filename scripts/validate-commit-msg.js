#!/usr/bin/env node

/**
 * Commit Message Validator
 * Validates that commit messages follow conventional commit format
 */

const fs = require('fs');
const path = require('path');

// Get commit message file path from command line arguments
const commitMsgFile = process.argv[2];

if (!commitMsgFile) {
  console.error('❌ No commit message file provided');
  process.exit(1);
}

// Read the commit message
const commitMsg = fs.readFileSync(commitMsgFile, 'utf8').trim();

// Conventional commit regex pattern
const commitRegex = /^(feat|fix|docs|style|refactor|test|chore)(\(.+\))?: .{1,50}$/;

// Valid scopes
const validScopes = [
  'mobile',
  'backend', 
  'ui',
  'auth',
  'goals',
  'chat',
  'db',
  'api',
  'config'
];

// Check if commit message matches pattern
if (!commitRegex.test(commitMsg)) {
  console.error('❌ Invalid commit message format!');
  console.error('');
  console.error('Commit message must follow the pattern:');
  console.error('  <type>(<scope>): <subject>');
  console.error('');
  console.error('Types: feat, fix, docs, style, refactor, test, chore');
  console.error('Scopes: ' + validScopes.join(', '));
  console.error('');
  console.error('Examples:');
  console.error('  feat(goals): add goal template system');
  console.error('  fix(auth): resolve token refresh issue');
  console.error('  docs(api): update authentication endpoints');
  console.error('');
  console.error('Current message:');
  console.error(`  ${commitMsg}`);
  console.error('');
  process.exit(1);
}

// Extract scope from commit message
const scopeMatch = commitMsg.match(/\((.*?)\)/);
if (scopeMatch) {
  const scope = scopeMatch[1];
  if (!validScopes.includes(scope)) {
    console.error('❌ Invalid scope in commit message!');
    console.error('');
    console.error('Valid scopes: ' + validScopes.join(', '));
    console.error(`Current scope: ${scope}`);
    console.error('');
    process.exit(1);
  }
}

console.log('✅ Commit message format is valid!');
process.exit(0); 