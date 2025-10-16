import { Unist } from '@accuser/svelte-unist';
import { mount, type ComponentProps } from 'svelte';
import { u } from 'unist-builder';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import ContainerDirective from './container-directive.svelte';

vi.mock('@accuser/svelte-unist', async () => {
	const actual = await vi.importActual('@accuser/svelte-unist');

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

	const it = test.extend<{ props: ComponentProps<typeof Unist> }>({
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
});
