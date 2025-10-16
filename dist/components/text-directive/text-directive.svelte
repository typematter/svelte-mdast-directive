<script lang="ts">
	import { getUnistContext, Node } from '@accuser/svelte-unist';
	import type { TextDirectives } from './text-directives.js';

	let { node }: { node: import('mdast-util-directive').TextDirective } = $props();

	const { textDirectives = {} } = getUnistContext();

	let Component = $derived(
		textDirectives[node.name as keyof TextDirectives] as import('svelte').Component<{
			node: import('mdast-util-directive').TextDirective;
		}>
	);
</script>

{#if Component}
	<Component {node} />
{:else}
	{console.warn(`Unist.Node: unrecognized text directive :${node.name}`)}
	<div class={node.name}>
		{#each node.children as child (child)}<Node node={child} />{/each}
	</div>
{/if}
