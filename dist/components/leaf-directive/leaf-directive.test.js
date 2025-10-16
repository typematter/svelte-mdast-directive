import { Unist } from '@typematter/svelte-unist';
import { mount } from 'svelte';
import { u } from 'unist-builder';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import LeafDirective from './leaf-directive.svelte';
vi.mock('@typematter/svelte-unist', async () => {
    const actual = await vi.importActual('@typematter/svelte-unist');
    return {
        ...actual,
        getUnistContext: vi.fn().mockReturnValue({
            leafDirectives: {}
        })
    };
});
describe('LeafDirective', () => {
    beforeEach(() => {
        document.body = document.createElement('body');
    });
    const it = test.extend({
        props: {
            ast: u('leafDirective', { name: 'leaf' }, []),
            components: { leafDirective: LeafDirective }
        }
    });
    it('renders <div>', ({ props }) => {
        mount(Unist, { props, target: document.body });
        expect(document.body.querySelector('div')).toBeInTheDocument();
    });
    it('renders <div> with `class` attribute', ({ props }) => {
        mount(Unist, { props, target: document.body });
        expect(document.body.querySelector('div.leaf')).toBeInTheDocument();
    });
});
