import { getUnistContext, Unist } from '@typematter/svelte-unist';
import { mount } from 'svelte';
import { u } from 'unist-builder';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import MockTextDirective from './mock-text-directive.svelte';
import TextDirective from './text-directive.svelte';
vi.mock('@typematter/svelte-unist', async () => {
    const actual = await vi.importActual('@typematter/svelte-unist');
    return {
        ...actual,
        getUnistContext: vi.fn().mockReturnValue({
            textDirectives: {}
        })
    };
});
describe('TextDirective', () => {
    beforeEach(() => {
        document.body = document.createElement('body');
    });
    const it = test.extend({
        props: {
            ast: u('textDirective', { name: 'text' }, []),
            components: { textDirective: TextDirective }
        }
    });
    it('renders <div>', ({ props }) => {
        mount(Unist, { props, target: document.body });
        expect(document.body.querySelector('div')).toBeInTheDocument();
    });
    it('renders <div> with `class` attribute', ({ props }) => {
        mount(Unist, { props, target: document.body });
        expect(document.body.querySelector('div.text')).toBeInTheDocument();
    });
    describe('with custom directive', () => {
        it('renders custom element', ({ props }) => {
            props.ast = u('textDirective', { name: 'mock' }, []);
            props.textDirectives = {
                mock: MockTextDirective
            };
            // Update the mock to return the textDirectives from props
            vi.mocked(getUnistContext).mockReturnValueOnce({
                textDirectives: props.textDirectives
            });
            mount(Unist, { props, target: document.body });
            expect(document.body.querySelector('div[data-testid="mock-text-directive"]')).toBeInTheDocument();
        });
    });
});
