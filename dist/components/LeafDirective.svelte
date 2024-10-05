<script lang="ts">
	import { getUnistContext, Node } from '@accuser/svelte-unist';
	import type { LeafDirective } from 'mdast-util-directive';

	let { children, name, ...props }: LeafDirective = $props();

	const { components = {} } = getUnistContext();

	let Component = $derived(
		components[name as keyof typeof components] as import('svelte').Component<LeafDirective>
	);
</script>

{#if Component}
	<Component {children} {name} {...props} />
{:else}
	{@html `<!-- Unrecognized leaf directive ::${name} -->`}
	<div class={name}>
		{#each children as node}<Node {...node} />{/each}
	</div>
{/if}
