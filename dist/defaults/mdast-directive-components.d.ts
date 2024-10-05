declare module '@accuser/svelte-unist' {
    interface NodeMap {
        containerDirective: import('mdast-util-directive').ContainerDirective;
        leafDirective: import('mdast-util-directive').LeafDirective;
        textDirective: import('mdast-util-directive').TextDirective;
    }
}
declare const _default: {
    containerDirective: import("svelte").Component<import("mdast-util-directive").ContainerDirective, {}, "">;
    leafDirective: import("svelte").Component<import("mdast-util-directive").LeafDirective, {}, "">;
    textDirective: import("svelte").Component<import("mdast-util-directive").TextDirective, {}, "">;
};
export default _default;
