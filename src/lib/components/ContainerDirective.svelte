<script lang="ts">
	import { getUnistContext, Node } from '@accuser/svelte-unist';
	import type { ContainerDirective } from 'mdast-util-directive';

	let { children, name, ...props }: ContainerDirective = $props();

	const { components } = getUnistContext();

	let Component = $derived(components[name] as import('svelte').Component<ContainerDirective>);
</script>

{#if Component}
	<Component {children} {name} {...props} />
{:else}
	{@html `<!-- Unrecognized container directive :::${name} -->`}
	<div class={name}>
		{#each children as node}<Node {...node} />{/each}
	</div>
{/if}
