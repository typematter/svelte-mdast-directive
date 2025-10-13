import type { ContainerDirectiveMap } from './container-directive-map.js';
export type ContainerDirectives<T extends import('mdast-util-directive').ContainerDirective = ContainerDirectiveMap[keyof ContainerDirectiveMap]> = {
    [K in T['type']]?: import('svelte').Component<{
        node: Extract<T, {
            type: K;
        }>;
    }>;
};
