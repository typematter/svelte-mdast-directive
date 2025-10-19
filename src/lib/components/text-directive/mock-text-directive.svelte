<script lang="ts">
	import { Node } from '@typematter/svelte-unist';

	let { node }: { node: import('mdast-util-directive').TextDirective } = $props();

	let { children } = $derived(node);
</script>

<div data-testid="mock-text-directive">
	Mocked!
	{#each children as child (child)}<Node node={child} />{/each}
</div>
