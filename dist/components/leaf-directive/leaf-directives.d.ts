import type { LeafDirectiveMap } from './leaf-directive-map.js';
export type LeafDirectives<T extends import('mdast-util-directive').LeafDirective = LeafDirectiveMap[keyof LeafDirectiveMap]> = {
    [K in T['type']]?: import('svelte').Component<{
        node: Extract<T, {
            type: K;
        }>;
    }>;
};
