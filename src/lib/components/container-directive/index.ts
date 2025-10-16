import type { ContainerDirectives } from './container-directives.js';

declare module '@typematter/svelte-unist' {
	interface ComponentMap {
		containerDirective: import('mdast-util-directive').ContainerDirective;
	}

	interface UnistContext {
		containerDirectives?: ContainerDirectives;
	}
}

export type { ContainerDirectiveMap } from './container-directive-map.js';
export { default as ContainerDirective } from './container-directive.svelte';
export type { ContainerDirectives };
