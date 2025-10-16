# Svelte Mdast Directive

Transform [Mdast](https://github.com/syntax-tree/mdast) directive nodes into Svelte components.

## Installing

Add the `@accuser/svelte-mdast-directive` package dependency to your [Svelte](https://svelte.dev) / [SvelteKit](https://kit.svelte.dev) project:

```sh
npm install --save-dev @accuser/svelte-mdast-directive

# or
yarn add -D @accuser/svelte-mdast-directive

# or
pnpm add -D @accuser/svelte-mdast-directive
```

## Usage

```svelte
<script lang="ts">
	import { components } from '@accuser/svelte-mdast-directive';
	import { Unist } from '@typematter/svelte-unist';
	import { u } from 'unist-builder';
	import Highlight from './Highlight.svelte';

	const ast: import('mdast').Root = u('root', [
		u('textDirective', { name: 'highlight' }, [u('text', 'Hello, World!')])
	]);
</script>

<Unist {ast} {components} textDirectives={{ highlight: Highlight }} />
```

### Custom Directive Component

Create a custom component for your directive:

```svelte
<!-- Highlight.svelte -->
<script lang="ts">
	import { Node } from '@typematter/svelte-unist';

	let { node }: { node: import('mdast-util-directive').TextDirective } = $props();

	let { children } = $derived(node);
</script>

<span style="background-color: yellow;">
	{#each children as child (child)}<Node node={child} />{/each}
</span>
```

### Directive Types

This library supports three directive types from the [directive syntax specification](https://talk.commonmark.org/t/generic-directives-plugins-syntax/444):

- **Text directives**: `:name[content]` - inline directives
- **Leaf directives**: `::name[content]` - block-level directives without children
- **Container directives**: `:::name` - block-level directives that can contain other content

Pass custom components via the corresponding props:

- `textDirectives={{ name: Component }}`
- `leafDirectives={{ name: Component }}`
- `containerDirectives={{ name: Component }}`

## Test

```sh
pnpm test
```

## License

[MIT](LICENSE)

## Copyright

Copyright &copy; 2024 [Matthew Gibbons](https://github.com/accuser)
