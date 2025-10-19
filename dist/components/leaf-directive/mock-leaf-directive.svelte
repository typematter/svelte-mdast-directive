<script lang="ts">
	import { Node } from '@typematter/svelte-unist';

	let { node }: { node: import('mdast-util-directive').LeafDirective } = $props();

	let { children } = $derived(node);
</script>

<div data-testid="mock-leaf-directive">
	Mocked!
	{#each children as child (child)}<Node node={child} />{/each}
</div>
