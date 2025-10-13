import { mount, type ComponentProps } from 'svelte';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import TextDirective from './text-directive.svelte';

vi.mock('@accuser/svelte-unist', async () => {
	const actual = await vi.importActual('@accuser/svelte-unist');

	return {
		...actual,
		getUnistContext: vi.fn().mockReturnValue({
			components: {}
		})
	};
});

describe('TextDirective.svelte', () => {
	beforeEach(() => {
		document.body = document.createElement('body');
	});

	const it = test.extend<{ props: ComponentProps<typeof TextDirective> }>({
		props: {
			node: {
				type: 'textDirective',
				name: 'text',
				children: []
			}
		}
	});

	it('renders an HTML comment', ({ props }) => {
		mount(TextDirective, { props, target: document.body });

		expect(document.body.innerHTML).toContain('<!-- Unrecognized text directive :text -->');
	});

	it('renders <span>', ({ props }) => {
		mount(TextDirective, { props, target: document.body });

		expect(document.body.querySelector('span')).toBeInTheDocument();
	});

	it('renders <span> with `class` attribute', ({ props }) => {
		mount(TextDirective, { props, target: document.body });

		expect(document.body.querySelector('span.text')).toBeInTheDocument();
	});
});
