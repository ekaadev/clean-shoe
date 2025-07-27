import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals, url, fetch }) => {
	// Check if user is authenticated
	if (!locals.user) {
		throw redirect(302, '/auth/login');
	}

	const page = parseInt(url.searchParams.get('page') || '1');
	const limit = parseInt(url.searchParams.get('limit') || '10');

	try {
		// Fetch order history from API
		const response = await fetch(`/api/histories?page=${page}&limit=${limit}`);

		if (!response.ok) {
			console.error('Failed to fetch order history');
			return {
				orders: [],
				pagination: {
					page: 1,
					limit: 10,
					totalCount: 0,
					totalPages: 0
				}
			};
		}

		const data = await response.json();

		return {
			orders: data.orders || [],
			pagination: data.pagination || {
				page: 1,
				limit: 10,
				totalCount: 0,
				totalPages: 0
			}
		};
	} catch (error) {
		console.error('Error loading order history:', error);
		return {
			orders: [],
			pagination: {
				page: 1,
				limit: 10,
				totalCount: 0,
				totalPages: 0
			}
		};
	}
};
