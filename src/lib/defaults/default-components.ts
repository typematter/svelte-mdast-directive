import ContainerDirective from '$lib/components/ContainerDirective.svelte';
import LeafDirective from '$lib/components/LeafDirective.svelte';
import TextDirective from '$lib/components/TextDirective.svelte';
import type { Components } from '@accuser/svelte-unist';
import type { Node } from 'mdast';
import type { Directives } from 'mdast-util-directive';

const components: Components<Directives> = {
	containerDirective: ContainerDirective,
	leafDirective: LeafDirective,
	textDirective: TextDirective
};

export default components as Components<Node>;
