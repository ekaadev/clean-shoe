import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url, fetch }) => {
	const page = parseInt(url.searchParams.get('page') || '1');
	const limit = parseInt(url.searchParams.get('limit') || '10');

	const response = await fetch('/api/orders' + `?page=${page}&limit=${limit}`);

	if (!response.ok) {
		console.error('Failed to fetch orders:', response.statusText);
		return {
			tableOrder: [],
			pagination: {
				page,
				limit,
				totalCount: 0,
				totalPages: 0
			}
		};
	}

	const body = await response.json();

	return {
		tableOrder: body.orders || [],
		pagination: {
			page: body.pagination?.page,
			limit: body.pagination?.limit,
			totalCount: body.pagination?.totalCount || 0,
			totalPages: body.pagination?.totalPages || 0
		}
	};
};
