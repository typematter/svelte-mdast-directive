<script lang="ts">
	import type { PageData } from './$types.js';

	const { data }: { data: PageData } = $props();

	const { ast } = $derived(data);
</script>
