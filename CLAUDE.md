# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

`@accuser/svelte-mdast-directive` is a SvelteKit library that provides Svelte components for rendering [mdast](https://github.com/syntax-tree/mdast) directive nodes. It integrates with `@typematter/svelte-unist` to enable custom directive handling in markdown processing.

The library supports three directive types from the [directive syntax specification](https://talk.commonmark.org/t/generic-directives-plugins-syntax/444):

- **Text directives**: `:name[content]` - inline directives
- **Leaf directives**: `::name[content]` - block-level directives without children
- **Container directives**: `:::name` - block-level directives that can contain other content

### Basic Usage

```svelte
<script lang="ts">
	import { components } from '@accuser/svelte-mdast-directive';
	import { Unist } from '@typematter/svelte-unist';
	import { u } from 'unist-builder';
	import Highlight from './Highlight.svelte';

	const ast = u('root', [u('textDirective', { name: 'highlight' }, [u('text', 'Hello, World!')])]);
</script>

<Unist {ast} {components} textDirectives={{ highlight: Highlight }} />
```

This library is related to `@typematter/svelte-mdast` (transforms standard mdast nodes) but specifically handles directive extensions.

## Development Commands

```bash
# Install dependencies
pnpm install

# Development server
pnpm dev

# Build the library
pnpm build           # Runs vite build + package

# Package the library (used in build)
pnpm package         # Runs svelte-kit sync, svelte-package, and publint

# Type checking
pnpm check           # Run once
pnpm check:watch     # Watch mode

# Testing
pnpm test            # Run vitest

# Linting and formatting
pnpm lint            # Check with prettier and eslint
pnpm format          # Format with prettier
```

### Running a Single Test

Use Vitest's filtering:

```bash
pnpm test container-directive    # Run tests matching "container-directive"
pnpm test -t "renders <div>"     # Run specific test by name
```

## Architecture

### Core Pattern: Directive Maps and Type Safety

The library uses **module augmentation** to provide type-safe directive registration. Each directive type has:

1. **Map interface** (e.g., `ContainerDirectiveMap`) - empty interface for module augmentation
2. **Directives type** (e.g., `ContainerDirectives<T>`) - derives component types from the map
3. **Svelte component** (e.g., `container-directive.svelte`) - renders the directive using context

Consumers extend the map interfaces in their projects to register custom directives:

```typescript
// Consumer code
declare module '@accuser/svelte-mdast-directive' {
	interface ContainerDirectiveMap {
		note: ContainerDirective & { name: 'note' };
	}
}
```

This pattern enables:

- Type-safe directive name checking
- Autocomplete for directive names
- Compile-time verification of registered directives

### Component Structure

Each directive type follows identical structure in `src/lib/components/{type}-directive/`:

- `{type}-directive.svelte` - Main component that resolves and renders custom directive components
- `{type}-directive-map.ts` - Empty interface for module augmentation
- `{type}-directives.ts` - Type that maps directive names to Svelte components
- `{type}-directive.test.ts` - Component tests using Vitest
- `index.ts` - Re-exports

### Integration with @typematter/svelte-unist

The components rely on context from `@typematter/svelte-unist`:

- `getUnistContext()` retrieves directive registrations (e.g., `containerDirectives`, `leafDirectives`, `textDirectives`)
- `<Node>` component recursively renders child nodes
- The `components` export satisfies the `@typematter/svelte-unist` Components interface

### Test Patterns

Tests use Vitest with:

- `vi.mock()` to mock `@typematter/svelte-unist` context
- `mount()` from Svelte for component mounting
- `@testing-library/jest-dom` for DOM assertions
- `unist-builder` (`u()`) for creating AST nodes

Example test structure:

```typescript
vi.mock('@typematter/svelte-unist', async () => ({
	...(await vi.importActual('@typematter/svelte-unist')),
	getUnistContext: vi.fn().mockReturnValue({
		/* mock context */
	})
}));
```

## File Organization

- `src/lib/components/` - Three directive component folders (container, leaf, text)
- `src/lib/index.ts` - Main library export (re-exports components)
- `src/routes/` - Demo SvelteKit app showing usage
- `dist/` - Built package output (excluded from tests via package.json)

## Key Configuration

- **TypeScript**: Strict mode enabled with NodeNext module resolution
- **Vitest**: jsdom environment, tests in `src/**/*.test.{js,ts}`
- **ESLint**: Flat config with TypeScript and Svelte support
- **Package exports**: ESM-only (`"type": "module"`)
- **Peer dependency**: Svelte 5.39.11+

## Important Notes

- The library uses Svelte 5 features (`$props`, `$derived`)
- All three directive types share identical architectural patterns
- The empty `*DirectiveMap` interfaces are intentional - they're extended via module augmentation by consumers
- ESLint warnings about empty object types in map files are suppressed with `eslint-disable-next-line`
