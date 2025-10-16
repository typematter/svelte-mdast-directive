import { Unist } from '@accuser/svelte-unist';
import { mount, type ComponentProps } from 'svelte';
import { u } from 'unist-builder';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import TextDirective from './text-directive.svelte';

vi.mock('@accuser/svelte-unist', async () => {
	const actual = await vi.importActual('@accuser/svelte-unist');

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

	const it = test.extend<{ props: ComponentProps<typeof Unist> }>({
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
});
