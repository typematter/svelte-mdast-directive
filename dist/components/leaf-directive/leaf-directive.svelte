<script lang="ts" module>
	export interface LeafDirectiveMap {}

	export type LeafDirectives<
		T extends
			import('mdast-util-directive').LeafDirective = LeafDirectiveMap[keyof LeafDirectiveMap]
	> = {
		[K in T['type']]?: import('svelte').Component<{
			node: Extract<
				T,
				{
					type: K;
				}
			>;
		}>;
	};

	declare module '@accuser/svelte-unist' {
		interface UnistContext {
			leafDirectives?: LeafDirectives;
		}
	}
</script>

<script lang="ts">
	import { getUnistContext, Node } from '@accuser/svelte-unist';

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
	{@html `<!-- Unrecognized leaf directive ::${node.name} -->`}
	<div class={node.name}>
		{#each node.children as child}<Node node={child} />{/each}
	</div>
{/if}
