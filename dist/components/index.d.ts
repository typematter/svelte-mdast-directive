export declare const components: {
    containerDirective: import("svelte").Component<{
        node: import("mdast-util-directive").ContainerDirective;
    }, {}, "">;
    leafDirective: import("svelte").Component<{
        node: import("mdast-util-directive").LeafDirective;
    }, {}, "">;
    textDirective: import("svelte").Component<{
        node: import("mdast-util-directive").TextDirective;
    }, {}, "">;
};
export * from './container-directive/index.js';
export * from './leaf-directive/index.js';
export * from './text-directive/index.js';
