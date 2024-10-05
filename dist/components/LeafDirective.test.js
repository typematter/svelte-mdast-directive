import { mount } from 'svelte';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import LeafDirective from './LeafDirective.svelte';
vi.mock('@accuser/svelte-unist', async () => {
    const actual = await vi.importActual('@accuser/svelte-unist');
    return {
        ...actual,
        getUnistContext: vi.fn().mockReturnValue({
            components: {}
        })
    };
});
describe('LeafDirective.svelte', () => {
    beforeEach(() => {
        document.body = document.createElement('body');
    });
    const it = test.extend({
        props: {
            type: 'leafDirective',
            name: 'leaf',
            children: []
        }
    });
    it('renders an HTML comment', ({ props }) => {
        mount(LeafDirective, { props, target: document.body });
        expect(document.body.innerHTML).toContain('<!-- Unrecognized leaf directive ::leaf -->');
    });
    it('renders <div>', ({ props }) => {
        mount(LeafDirective, { props, target: document.body });
        expect(document.body.querySelector('div')).toBeInTheDocument();
    });
    it('renders <div> with `class` attribute', ({ props }) => {
        mount(LeafDirective, { props, target: document.body });
        expect(document.body.querySelector('div.leaf')).toBeInTheDocument();
    });
});
