import ContainerDirective from '../components/ContainerDirective.svelte';
import LeafDirective from '../components/LeafDirective.svelte';
import TextDirective from '../components/TextDirective.svelte';
import { directiveFromMarkdown } from 'mdast-util-directive';
import { directive } from 'micromark-extension-directive';
export const components = {
    containerDirective: ContainerDirective,
    leafDirective: LeafDirective,
    textDirective: TextDirective
};
export const directives = {};
export const extensions = [directive()];
export const mdastExtensions = [directiveFromMarkdown()];
