import ContainerDirective from '$lib/components/ContainerDirective.svelte';
import LeafDirective from '$lib/components/LeafDirective.svelte';
import TextDirective from '$lib/components/TextDirective.svelte';
import type { Components } from '@accuser/svelte-unist';

declare module '@accuser/svelte-unist' {
	export type AllDirectives = DirectiveMap[keyof DirectiveMap];

	export interface ComponentMap {
		containerDirective: import('mdast-util-directive').ContainerDirective;
		leafDirective: import('mdast-util-directive').LeafDirective;
		textDirective: import('mdast-util-directive').TextDirective;
	}

	export interface Context {
		directives: Directives;
	}

	export interface DirectiveMap {}

	export type Directives<T extends import('mdast-util-directive').Directives = AllDirectives> = {
		[K in T['name']]: import('svelte').Component<Extract<T, { name: K }>> | undefined;
	};

	export interface Props {
		directives?: Directives;
	}
}

export default {
	containerDirective: ContainerDirective,
	leafDirective: LeafDirective,
	textDirective: TextDirective
} satisfies Components;
