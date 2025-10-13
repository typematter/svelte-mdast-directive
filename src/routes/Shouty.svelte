<script lang="ts">
	import { Node } from '@accuser/svelte-unist';

	let { node }: { node: import('mdast-util-directive').TextDirective } = $props();

	let { children } = $derived(node);
</script>

<span style="text-transform: uppercase;"
	>{#each children as child}<Node node={child} />{/each}</span
>
