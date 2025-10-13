import type { TextDirectiveMap } from './text-directive-map.js';
export type TextDirectives<T extends import('mdast-util-directive').TextDirective = TextDirectiveMap[keyof TextDirectiveMap]> = {
    [K in T['type']]?: import('svelte').Component<{
        node: Extract<T, {
            type: K;
        }>;
    }>;
};
