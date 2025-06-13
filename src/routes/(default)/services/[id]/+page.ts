import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params, fetch }) => {
	// fetch data on load with fetch function
	const response = await fetch(`/api/services/${params.id}`);

	if (!response.ok) {
		error(404, {
			message: 'Not Found'
		});
	}

	const body = await response.json();

	return {
		service: body || null
	};
};
