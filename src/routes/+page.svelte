<script lang="ts">
	import * as MdastUtilDirective from '$lib/components/index.js';
	import { Unist } from '@accuser/svelte-unist';
	import { u } from 'unist-builder';
	import Shouty from './Shouty.svelte';

	const ast = u('root', [u('textDirective', { name: 'shouty' }, [u('text', 'Hello, world!')])]);
</script>

<Unist {ast} components={MdastUtilDirective.components} textDirectives={{ shouty: Shouty }} />
