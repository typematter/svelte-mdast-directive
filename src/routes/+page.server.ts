import type { PageServerLoad } from './$types.js';

export const load = (async () => {
	const ast = {
		type: 'root',
		children: [
			{
				type: 'text',
				value: 'This is some '
			},
			{
				type: 'textDirective',
				name: 'hl',
				children: [
					{
						type: 'text',
						value: 'highlighted'
					}
				]
			},
			{
				type: 'text',
				value: ' text.'
			}
		]
	};

	return { ast };
}) satisfies PageServerLoad;
