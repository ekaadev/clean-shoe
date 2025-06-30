import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params, fetch }) => {
	// fetch data on load with fetch function
	const response = await fetch(`/api/services/${params.id}`);
	const all = await fetch('/api/services');

	if (!response.ok) {
		error(404, {
			status: 404,
			message: 'NOT FOUND'
		});
	}

	if (!all.ok) {
		error(500, {
			status: 500,
			message: 'INTERNAL SERVER ERROR'
		});
	}

	const body = await response.json();
	const allServices = await all.json();

	return {
		service: body || null,
		services: allServices || []
	};
};
