import { json, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ locals, params }) => {
	const servicesId = params.id;

	const { data, error } = await locals.supabase
		.from('services')
		.select('*')
		.eq('id', servicesId)
		.single();

	if (error) {
		console.error('Error fetching order details:', error);
		return json({ error: 'Failed to fetch order details' }, { status: 500 });
	}

	return json(data || null);
};
