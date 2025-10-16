<script lang="ts">
	import { components } from '$lib/index.js';
	import { Unist } from '@accuser/svelte-unist';
	import { u } from 'unist-builder';
	import Highlight from './Highlight.svelte';

	const ast = u('root', [u('textDirective', { name: 'highlight' }, [u('text', 'Hello, World!')])]);
</script>

<Unist {ast} {components} textDirectives={{ highlight: Highlight }} />
