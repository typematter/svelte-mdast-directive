declare const MdastDirective: import("svelte").Component<{
    ast: import("mdast").Root;
} & Partial<import("@accuser/svelte-unist").UnistContext>, {}, "">;
export default MdastDirective;
