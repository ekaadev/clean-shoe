import { json, type RequestHandler } from '@sveltejs/kit';
import { redirect } from '@sveltejs/kit';

export const PATCH: RequestHandler = async ({ locals, params, request }) => {
	if (!locals.user) {
		throw redirect(302, '/auth');
	}

	const userId = params.id;

	try {
		const body = await request.json();
		const { name, address, phone_number } = body;

		const { data, error } = await locals.supabase
			.from('users')
			.update({
				name: name,
				address: address,
				phone_number: phone_number
			})
			.eq('id', userId)
			.select()
			.single();

		if (error) {
			console.error('Error updating order:', error);
			return json({ error: 'Failed to update order' }, { status: 500 });
		}
		return json(data || null);
	} catch (err) {
		console.error('Error parsing request body:', err);
		return json({ error: 'Invalid request body' }, { status: 400 });
	}
};
