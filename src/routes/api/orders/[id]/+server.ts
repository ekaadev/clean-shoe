import { json, type RequestHandler } from '@sveltejs/kit';
import { redirect } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ locals, params }) => {
	if (!locals.user) {
		throw redirect(302, '/auth');
	}

	if (locals.profile?.role !== 'admin') {
		throw redirect(302, '/');
	}

	const orderId = params.id;

	const { data, error } = await locals.supabase
		.from('orders')
		.select(
			`
    *,
    order_items (
      quantity,
      price,
      services (
        name
      )
    )
  `
		)
		.eq('id', orderId)
		.single();

	if (error) {
		console.error('Error fetching order details:', error);
		return json({ error: 'Failed to fetch order details' }, { status: 500 });
	}

	return json(data || null);
};

export const PATCH: RequestHandler = async ({ locals, params, request }) => {
	if (!locals.user) {
		throw redirect(302, '/auth');
	}

	if (locals.profile?.role !== 'admin') {
		throw redirect(302, '/');
	}

	const orderId = params.id;

	try {
		const body = await request.json();
		const { status, payment_status, pickup_date, delivery_date } = body;

		console.log(status, payment_status, pickup_date, delivery_date);

		const { data, error } = await locals.supabase
			.from('orders')
			.update({
				status: status,
				payment_status: payment_status,
				pickup_date: pickup_date,
				delivery_date: delivery_date
			})
			.eq('id', orderId)
			.select()
			.single();

		if (error) {
			console.error('Error updating order:', error);
			return json({ error: 'Failed to update order' }, { status: 500 });
		}
		// const { status } = body;
		//
		// // Validate status
		// const validStatuses = [
		// 	'pending',
		// 	'confirmed',
		// 	'processing',
		// 	'ready_for_delivery',
		// 	'delivered',
		// 	'cancelled'
		// ];
		// if (!validStatuses.includes(status)) {
		// 	return json({ error: 'Invalid status' }, { status: 400 });
		// }
		//
		// const { data, error } = await locals.supabase
		// 	.from('orders')
		// 	.update({ status })
		// 	.eq('id', orderId)
		// 	.select()
		// 	.single();
		//
		// if (error) {
		// 	console.error('Error updating order:', error);
		// 	return json({ error: 'Failed to update order' }, { status: 500 });
		// }
		//
		// return json(data);
		return json(data || null);
	} catch (err) {
		console.error('Error parsing request body:', err);
		return json({ error: 'Invalid request body' }, { status: 400 });
	}
};
