import type { Components, Directives } from '@accuser/svelte-unist';
declare module '@accuser/svelte-unist' {
    type AllDirectives = DirectiveMap[keyof DirectiveMap];
    interface ComponentMap {
        containerDirective: import('mdast-util-directive').ContainerDirective;
        leafDirective: import('mdast-util-directive').LeafDirective;
        textDirective: import('mdast-util-directive').TextDirective;
    }
    interface Context {
        directives: Directives;
    }
    interface DirectiveMap {
    }
    type Directives<T extends import('mdast-util-directive').Directives = AllDirectives> = {
        [K in T['name']]: import('svelte').Component<Extract<T, {
            name: K;
        }>> | undefined;
    };
    interface Props {
        directives?: Directives;
    }
}
export declare const components: Components;
export declare const directives: Directives;
export declare const extensions: import('micromark-util-types').Extension[];
export declare const mdastExtensions: (import('mdast-util-from-markdown').Extension | import('mdast-util-from-markdown').Extension[])[];
