import ContainerDirective from '$lib/components/ContainerDirective.svelte';
import LeafDirective from '$lib/components/LeafDirective.svelte';
import TextDirective from '$lib/components/TextDirective.svelte';
import type { Components, Nodes } from '@accuser/svelte-unist';

declare module '@accuser/svelte-unist' {
	export interface NodeMap {
		containerDirective: import('mdast-util-directive').ContainerDirective;
		leafDirective: import('mdast-util-directive').LeafDirective;
		textDirective: import('mdast-util-directive').TextDirective;
	}
}

export default {
	containerDirective: ContainerDirective,
	leafDirective: LeafDirective,
	textDirective: TextDirective
} satisfies Components<Nodes>;
