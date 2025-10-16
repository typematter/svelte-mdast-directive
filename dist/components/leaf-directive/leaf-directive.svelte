<script lang="ts">
	import { getUnistContext, Node } from '@accuser/svelte-unist';
	import type { LeafDirectives } from './leaf-directives.js';

	let { node }: { node: import('mdast-util-directive').LeafDirective } = $props();

	const { leafDirectives = {} } = getUnistContext();

	let Component = $derived(
		leafDirectives[node.name as keyof LeafDirectives] as import('svelte').Component<{
			node: import('mdast-util-directive').LeafDirective;
		}>
	);
</script>

{#if Component}
	<Component {node} />
{:else}
	{console.warn(`Unist.Node: unrecognized leaf directive ::${node.name}`)}
	<div class={node.name}>
		{#each node.children as child (child)}<Node node={child} />{/each}
	</div>
{/if}
