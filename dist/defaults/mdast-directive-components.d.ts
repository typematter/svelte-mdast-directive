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
declare const _default: {
    containerDirective: import("svelte").Component<import("mdast-util-directive").ContainerDirective, {}, "">;
    leafDirective: import("svelte").Component<import("mdast-util-directive").LeafDirective, {}, "">;
    textDirective: import("svelte").Component<import("mdast-util-directive").TextDirective, {}, "">;
};
export default _default;
