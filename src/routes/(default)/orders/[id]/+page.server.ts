import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, fetch }) => {
	const { id } = params;

	const response = await fetch(`/api/orders/${id}`);
	if (!response.ok) {
		console.error('Failed to fetch order details:', response.statusText);
		return { error: 'Failed to fetch order details' };
	}

	const orderDetails = await response.json();
	// console.log('Order details:', orderDetails);

	return {
		orderId: id,
		orderDetails: orderDetails || null
	};
};
