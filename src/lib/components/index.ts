import { ContainerDirective } from '$lib/components/container-directive/index.js';
import { LeafDirective } from '$lib/components/leaf-directive/index.js';
import { TextDirective } from '$lib/components/text-directive/index.js';

export const components = {
	containerDirective: ContainerDirective,
	leafDirective: LeafDirective,
	textDirective: TextDirective
} satisfies import('@typematter/svelte-unist').Components;

export * from './container-directive/index.js';
export * from './leaf-directive/index.js';
export * from './text-directive/index.js';
