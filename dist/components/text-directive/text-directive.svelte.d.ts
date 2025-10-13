export interface TextDirectiveMap {
}
export type TextDirectives<T extends import('mdast-util-directive').TextDirective = TextDirectiveMap[keyof TextDirectiveMap]> = {
    [K in T['type']]?: import('svelte').Component<{
        node: Extract<T, {
            type: K;
        }>;
    }>;
};
declare module '@accuser/svelte-unist' {
    interface UnistContext {
        textDirectives?: TextDirectives;
    }
}
type $$ComponentProps = {
    node: import('mdast-util-directive').TextDirective;
};
declare const TextDirective: import("svelte").Component<$$ComponentProps, {}, "">;
type TextDirective = ReturnType<typeof TextDirective>;
export default TextDirective;
