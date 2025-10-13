export interface LeafDirectiveMap {
}
export type LeafDirectives<T extends import('mdast-util-directive').LeafDirective = LeafDirectiveMap[keyof LeafDirectiveMap]> = {
    [K in T['type']]?: import('svelte').Component<{
        node: Extract<T, {
            type: K;
        }>;
    }>;
};
declare module '@accuser/svelte-unist' {
    interface UnistContext {
        leafDirectives?: LeafDirectives;
    }
}
type $$ComponentProps = {
    node: import('mdast-util-directive').LeafDirective;
};
declare const LeafDirective: import("svelte").Component<$$ComponentProps, {}, "">;
type LeafDirective = ReturnType<typeof LeafDirective>;
export default LeafDirective;
