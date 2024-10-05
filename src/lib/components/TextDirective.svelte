<script lang="ts">
	import { getUnistContext, Node } from '@accuser/svelte-unist';
	import type { TextDirective } from 'mdast-util-directive';

	let { children, name, ...props }: TextDirective = $props();

	const { components } = getUnistContext();

	let Component = $derived(components[name] as import('svelte').Component<TextDirective>);
</script>

{#if Component}
	<Component {children} {name} {...props} />
{:else}
	{@html `<!-- Unrecognized text directive :${name} -->`}
	<span class={name}>
		{#each children as node}<Node {...node} />{/each}
	</span>
{/if}
