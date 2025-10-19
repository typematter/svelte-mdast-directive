import { getUnistContext, Unist } from '@typematter/svelte-unist';
import { mount, type ComponentProps } from 'svelte';
import { u } from 'unist-builder';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import LeafDirective from './leaf-directive.svelte';
import MockLeafDirective from './mock-leaf-directive.svelte';

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

	const it = test.extend<{ props: ComponentProps<typeof Unist> }>({
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

	describe('with custom directive', () => {
		it('renders custom element', ({ props }) => {
			props.ast = u('leafDirective', { name: 'mock' }, []);
			props.leafDirectives = {
				mock: MockLeafDirective
			};

			// Update the mock to return the leafDirectives from props
			vi.mocked(getUnistContext).mockReturnValueOnce({
				leafDirectives: props.leafDirectives
			} as ReturnType<typeof getUnistContext>);

			mount(Unist, { props, target: document.body });

			expect(
				document.body.querySelector('div[data-testid="mock-leaf-directive"]')
			).toBeInTheDocument();
		});
	});
});
