<script lang="ts">
	import { mdastDirectiveComponents } from '$lib/index.js';
	import { Unist } from '@accuser/svelte-unist';
	import type { PageData } from './$types.js';
	import Highlight from './Highlight.svelte';

	let { data }: { data: PageData } = $props();

	let { ast } = $derived(data);

	let components = { ...mdastDirectiveComponents, hl: Highlight };
</script>

<Unist {ast} {components} />
