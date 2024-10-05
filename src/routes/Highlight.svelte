<script lang="ts">
	import { Node } from '@accuser/svelte-unist';

	let { children }: import('mdast-util-directive').TextDirective = $props();
</script>

<span
	>{#each children as node}<Node {...node} />{/each}</span
>

<style>
	span {
		background-color: yellow;
	}
</style>
