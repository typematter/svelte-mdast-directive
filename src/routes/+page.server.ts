import { u } from 'unist-builder';
import type { PageServerLoad } from './$types.js';

export const load = (async () => {
	const ast = u('root', [u('leafDirective', { name: 'greeting' }, 'Hello, World!')]);

	return { ast };
}) satisfies PageServerLoad;
