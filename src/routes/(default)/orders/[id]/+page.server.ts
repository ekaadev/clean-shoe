import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, fetch }) => {
	const { id } = params;

	const response = await fetch(`/api/orders/${id}`);
	if (!response.ok) {
		console.error('Failed to fetch order details:', response.statusText);
		error(response.status, {
			status: response.status,
			message: response.status === 404 ? 'NOT FOUND' : 'INTERNAL SERVER ERROR'
		});
	}

	const orderDetails = await response.json();

	return {
		orderId: id,
		orderDetails: orderDetails || null
	};
};
