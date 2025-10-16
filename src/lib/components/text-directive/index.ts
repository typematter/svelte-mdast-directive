import type { TextDirectives } from './text-directives.js';

declare module '@typematter/svelte-unist' {
	interface ComponentMap {
		textDirective: import('mdast-util-directive').TextDirective;
	}

	interface UnistContext {
		textDirectives?: TextDirectives;
	}
}

export type { TextDirectiveMap } from './text-directive-map.js';
export { default as TextDirective } from './text-directive.svelte';
export type { TextDirectives };
