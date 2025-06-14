import { json, type RequestHandler } from '@sveltejs/kit';
import { redirect } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ locals, params }) => {
	const servicesId = params.id;

	const { data, error } = await locals.supabase
		.from('services')
		.select('*')
		.eq('id', servicesId)
		.single();

	if (error) {
		console.error('Error fetching service details:', error);
		return json({ error: 'Failed to fetch service details' }, { status: 500 });
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

	const serviceId = params.id;

	try {
		const body = await request.json();
		const { name, description, price, estimated_days, image_url } = body;

		console.log('Updating service:', {
			serviceId,
			name,
			description,
			price,
			estimated_days,
			image_url
		});

		// Prepare update data - only include fields that are provided
		const updateData: {
			name?: string;
			description?: string;
			price?: number;
			estimated_days?: number;
			image_url?: string;
		} = {};
		if (name !== undefined) updateData.name = name;
		if (description !== undefined) updateData.description = description;
		if (price !== undefined) updateData.price = price;
		if (estimated_days !== undefined) updateData.estimated_days = estimated_days;
		if (image_url !== undefined) updateData.image_url = image_url;

		const { data, error } = await locals.supabase
			.from('services')
			.update(updateData)
			.eq('id', serviceId)
			.select()
			.single();

		if (error) {
			console.error('Error updating service:', error);
			return json({ error: 'Failed to update service' }, { status: 500 });
		}

		return json(data || null);
	} catch (err) {
		console.error('Error parsing request body:', err);
		return json({ error: 'Invalid request body' }, { status: 400 });
	}
};
