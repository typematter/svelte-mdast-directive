<script lang="ts">
	import { getUnistContext, Node } from '@accuser/svelte-unist';
	import type { LeafDirective } from 'mdast-util-directive';

	let { children, name, ...props }: LeafDirective = $props();

	const { directives = {} } = getUnistContext();

	let Component = $derived(
		directives[name as keyof typeof directives] as import('svelte').Component<LeafDirective>
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
