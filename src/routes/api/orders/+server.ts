import { json, type RequestHandler } from '@sveltejs/kit';
import { redirect } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ locals, url }) => {
	if (!locals.user) {
		throw redirect(302, '/auth');
	}

	if (locals.profile?.role !== 'admin') {
		throw redirect(302, '/');
	}

	const page = parseInt(url.searchParams.get('page') || '1');
	const limit = parseInt(url.searchParams.get('limit') || '10');

	const offset = (page - 1) * limit;

	const { count } = await locals.supabase
		.from('orders')
		.select('*', { count: 'exact', head: true });

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
		.order('created_at', { ascending: false })
		.range(offset, offset + limit - 1);

	if (error) {
		console.error('Error fetching order details:', error);
		return json({ error: 'Failed to fetch order details' }, { status: 500 });
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
};
