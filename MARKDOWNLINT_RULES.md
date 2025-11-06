# Markdown Linting Configuration

## Overview

This directory contains markdown linting configuration for the App Builder documentation.

## Rules Configuration

The `.markdownlint.json` file configures markdown-lint with rules suitable for technical documentation and DocFX compatibility:

### Enabled Rules
<!-- - **MD001**: Heading levels should only increment by one level at a time
- **MD003**: Heading style (ATX style with #) -->
- **MD004**: Unordered list style (dash)
<!-- - **MD007**: Unordered list indentation (2 spaces) -->
- **MD009**: Trailing spaces (allow 2 for line breaks)
- **MD010**: Hard tabs
- **MD012**: Multiple consecutive blank lines (max 2)
- **MD014**: Dollar signs used before commands without showing output
- **MD018**: No space after hash on atx style heading
- **MD019**: Multiple spaces after hash on atx style heading
- **MD022**: Headings should be surrounded by blank lines
- **MD023**: Headings must start at the beginning of the line
- **MD024**: Multiple headings with the same content (allow different nesting)
- **MD026**: Trailing punctuation in heading
- **MD027**: Multiple spaces after blockquote symbol
<!-- - **MD028**: Blank line inside blockquote
- **MD029**: Ordered list item prefix (ordered style) -->
- **MD030**: Spaces after list markers
- **MD031**: Fenced code blocks should be surrounded by blank lines
- **MD032**: Lists should be surrounded by blank lines
- **MD035**: Horizontal rule style (---)
- **MD037**: Spaces inside emphasis markers
- **MD038**: Spaces inside code span elements
- **MD039**: Spaces inside link text
- **MD042**: No empty links
- **MD045**: Images should have alternate text (alt text)
<!-- - **MD046**: Code block style (fenced) -->
- **MD047**: Files should end with a single newline character
- **MD048**: Code fence style (backtick)
- **MD049**: Emphasis style (underscore)
- **MD050**: Strong style (asterisk)

### Disabled Rules

- **MD001**: Heading levels increment (disabled - documentation may skip heading levels for layout)
- **MD003**: Heading style (disabled - allows both ATX and Setext styles)
- **MD007**: Unordered list indentation (disabled - flexible indentation for complex lists)
- **MD013**: Line length (disabled - technical docs have long URLs/code examples)
- **MD025**: Multiple top-level headings (disabled - allows multiple H1 headers for DocFX frontmatter)
- **MD028**: Blank line inside blockquote (disabled - allows flexible blockquote formatting)
- **MD029**: Ordered list item prefix (disabled - allows flexible numbering in documentation)
- **MD033**: Inline HTML (disabled - allows HTML tags needed for DocFX)
- **MD034**: Bare URLs (disabled - allows bare URLs as we use many reference links)
- **MD036**: Emphasis used instead of heading (disabled - allows emphasis used as headers for styling)
- **MD040**: Fenced code blocks should have a language specified (disabled - would be noisy)
- **MD041**: First line in a file should be a top-level heading (disabled - not always applicable with frontmatter)
- **MD043**: Required heading structure (disabled - too restrictive)
- **MD044**: Proper names should have the correct capitalization (disabled - would require extensive config)
- **MD046**: Code block style (disabled - allows both fenced and indented code blocks)

## Usage

### Run linting on all English docs

```bash
npx markdownlint "en/**/*.md"
```

### Run linting on all Japanese docs

```bash
npx markdownlint "jp/**/*.md"
```

### Run linting on specific file

```bash
npx markdownlint en/getting-started.md
```

### Fix auto-fixable issues

```bash
npx markdownlint --fix "en/**/*.md"
```

### Run with custom config

```bash
npx markdownlint --config .markdownlint.json "en/**/*.md"
```

### Use npm scripts

```bash
# Lint all markdown files
npm run lint:md

# Fix auto-fixable issues
npm run lint:md:fix

# Run spell check only
npm run spellcheck

# Run full verification (includes spell check)
npm run verify

## Auto-Fix Capabilities

### Recommended Workflow
```bash
# 1. Auto-fix what's possible
npm run lint:md:fix

# 2. Check remaining issues
npm run verify

# 3. Manually fix spelling errors and remaining markdown issues (If needed)
```

### What Can Be Auto-Fixed (Markdownlint)

- Trailing spaces (MD009)
- Missing blank lines around headers, lists, code blocks (MD022, MD031, MD032)
- Inconsistent list markers (MD004)
- File ending newlines (MD047)
- Header spacing issues (MD018, MD019)
- Some emphasis and code span formatting (MD037, MD038)

### What Requires Manual Fix

- **All spelling errors** (cspell has no auto-fix feature)
- Complex markdown structure issues
- Content-related problems
- Heading hierarchy problems (MD001)
- Line length issues (MD013)

## Common Issues and Fixes

### MD001 - Heading increment

**Issue**: Jumping from `##` to `####`
**Fix**: Use `###` instead

### MD009 - Trailing spaces

**Issue**: Unnecessary trailing spaces at end of line
**Fix**: Remove trailing spaces (except when intentional for line breaks)

### MD022 - Headings surrounded by blank lines

**Issue**: No blank line before/after heading
**Fix**: Add blank lines around headings

### MD031 - Code blocks surrounded by blank lines

**Issue**: No blank line before/after code fence
**Fix**: Add blank lines around code blocks

### MD047 - File should end with newline

**Issue**: No newline at end of file
**Fix**: Add single newline at end of file

### MD013 - Line length (disabled)

This rule is disabled in `.markdownlint.json` because our documentation often contains long URLs, code samples, and reference content that are not practical to wrap manually. You may still choose to wrap paragraphs for readability, but the linter will not enforce a maximum line length.

## Integration with CI/CD

The configuration is integrated with GitHub Actions in `.github/workflows/node.js.yml`:

```yaml
- run: npm run verify
```

npm scripts in `package.json`:

```json
{
  "scripts": {
    "lint:md": "markdownlint \"**/*.md\" --ignore node_modules --ignore _site",
    "lint:md:fix": "markdownlint \"**/*.md\" --ignore node_modules --ignore _site --fix",
    "spellcheck": "cspell \"en/**/*.md\" \"jp/**/*.md\"",
    "verify": "npm run spellcheck && npm run lint:md"
  }
}
```

## VS Code Integration

Install the "markdownlint" extension by David Anson for real-time linting in VS Code:

- Extension ID: `DavidAnson.vscode-markdownlint`
- The `.markdownlint.json` file will be automatically detected

## Related Tools

- **cspell**: Spell checking (configured in `cspell.json`)
- **DocFX**: Documentation generation platform
- **GitHub Actions**: CI/CD integration for automated checks
