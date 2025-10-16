import type { LeafDirectives } from './leaf-directives.js';
declare module '@typematter/svelte-unist' {
    interface ComponentMap {
        leafDirective: import('mdast-util-directive').LeafDirective;
    }
    interface UnistContext {
        leafDirectives?: LeafDirectives;
    }
}
export type { LeafDirectiveMap } from './leaf-directive-map.js';
export { default as LeafDirective } from './leaf-directive.svelte';
export type { LeafDirectives };
