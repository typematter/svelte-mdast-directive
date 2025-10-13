<script lang="ts" module>
	export interface TextDirectiveMap {}

	export type TextDirectives<
		T extends
			import('mdast-util-directive').TextDirective = TextDirectiveMap[keyof TextDirectiveMap]
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
			textDirectives?: TextDirectives;
		}
	}
</script>

<script lang="ts">
	import { getUnistContext, Node } from '@accuser/svelte-unist';

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
	{@html `<!-- Unrecognized text directive :${node.name} -->`}
	<div class={node.name}>
		{#each node.children as child}<Node node={child} />{/each}
	</div>
{/if}
