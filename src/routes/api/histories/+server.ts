import { json, type RequestHandler } from '@sveltejs/kit';
import { redirect } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ locals, url }) => {
	// Check if user is authenticated
	if (!locals.user) {
		throw redirect(302, '/auth/login');
	}

	const page = parseInt(url.searchParams.get('page') || '1');
	const limit = parseInt(url.searchParams.get('limit') || '10');
	const offset = (page - 1) * limit;

	try {
		// Get total count for user's orders
		const { count } = await locals.supabase
			.from('orders')
			.select('*', { count: 'exact', head: true })
			.eq('user_id', locals.user.id);

		// Get user's order history with pagination
		const { data, error } = await locals.supabase
			.from('orders')
			.select(
				`
				id,
				invoice_id,
				pickup_address,
				status,
				payment_status,
				total_amount,
				created_at
			`
			)
			.eq('user_id', locals.user.id)
			.order('created_at', { ascending: false })
			.range(offset, offset + limit - 1);

		if (error) {
			console.error('Error fetching order history:', error);
			return json({ error: 'Failed to fetch order history' }, { status: 500 });
		}

		return json({
			orders: data || [],
			pagination: {
				page,
				limit,
				totalCount: count || 0,
				totalPages: Math.ceil((count || 0) / limit)
			}
		});
	} catch (err) {
		console.error('Unexpected error:', err);
		return json({ error: 'Internal server error' }, { status: 500 });
	}
};
