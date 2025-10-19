import { getUnistContext, Unist } from '@typematter/svelte-unist';
import { mount } from 'svelte';
import { u } from 'unist-builder';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import ContainerDirective from './container-directive.svelte';
import MockContainerDirective from './mock-container-directive.svelte';
vi.mock('@typematter/svelte-unist', async () => {
    const actual = await vi.importActual('@typematter/svelte-unist');
    return {
        ...actual,
        getUnistContext: vi.fn().mockReturnValue({
            containerDirectives: {}
        })
    };
});
describe('ContainerDirective', () => {
    beforeEach(() => {
        document.body = document.createElement('body');
    });
    const it = test.extend({
        props: {
            ast: u('containerDirective', { name: 'container' }, []),
            components: { containerDirective: ContainerDirective }
        }
    });
    it('renders <div>', ({ props }) => {
        mount(Unist, { props, target: document.body });
        expect(document.body.querySelector('div')).toBeInTheDocument();
    });
    it('renders <div> with `class` attribute', ({ props }) => {
        mount(Unist, { props, target: document.body });
        expect(document.body.querySelector('div.container')).toBeInTheDocument();
    });
    describe('with custom directive', () => {
        it('renders custom element', ({ props }) => {
            props.ast = u('containerDirective', { name: 'mock' }, []);
            props.containerDirectives = {
                mock: MockContainerDirective
            };
            // Update the mock to return the containerDirectives from props
            vi.mocked(getUnistContext).mockReturnValueOnce({
                containerDirectives: props.containerDirectives
            });
            mount(Unist, { props, target: document.body });
            expect(document.body.querySelector('div[data-testid="mock-container-directive"]')).toBeInTheDocument();
        });
    });
});
