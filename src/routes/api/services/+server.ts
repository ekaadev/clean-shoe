import { json, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ locals }) => {
	const { data: services, error } = await locals.supabase
		.from('services')
		.select('*')
		.order('created_at', { ascending: true });

	if (error) {
		console.error('Error fetching order details:', error);
		return json({ error: 'Failed to fetch order details' }, { status: 500 });
	}

	return json(services || []);
};
