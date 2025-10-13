import { mount, type ComponentProps } from 'svelte';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import ContainerDirective from './container-directive.svelte';

vi.mock('@accuser/svelte-unist', async () => {
	const actual = await vi.importActual('@accuser/svelte-unist');

	return {
		...actual,
		getUnistContext: vi.fn().mockReturnValue({
			ContainerDirectives: {}
		})
	};
});

describe('ContainerDirective.svelte', () => {
	beforeEach(() => {
		document.body = document.createElement('body');
	});

	const it = test.extend<{ props: ComponentProps<typeof ContainerDirective> }>({
		props: {
			node: {
				type: 'containerDirective',
				name: 'container',
				children: []
			}
		}
	});

	it('renders an HTML comment', ({ props }) => {
		mount(ContainerDirective, { props, target: document.body });

		expect(document.body.innerHTML).toContain(
			'<!-- Unrecognized container directive :::container -->'
		);
	});

	it('renders <div>', ({ props }) => {
		mount(ContainerDirective, { props, target: document.body });

		expect(document.body.querySelector('div')).toBeInTheDocument();
	});

	it('renders <div> with `class` attribute', ({ props }) => {
		mount(ContainerDirective, { props, target: document.body });

		expect(document.body.querySelector('div.container')).toBeInTheDocument();
	});
});
