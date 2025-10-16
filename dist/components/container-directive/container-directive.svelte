<script lang="ts">
	import { getUnistContext, Node } from '@accuser/svelte-unist';
	import type { ContainerDirectives } from './container-directives.js';

	let { node }: { node: import('mdast-util-directive').ContainerDirective } = $props();

	const { containerDirectives = {} } = getUnistContext();

	let Component = $derived(
		containerDirectives[node.name as keyof ContainerDirectives] as import('svelte').Component<{
			node: import('mdast-util-directive').ContainerDirective;
		}>
	);
</script>

{#if Component}
	<Component {node} />
{:else}
	{console.warn(`Unist.Node: unrecognized container directive :::${node.name}`)}
	<div class={node.name}>
		{#each node.children as child (child)}<Node node={child} />{/each}
	</div>
{/if}
