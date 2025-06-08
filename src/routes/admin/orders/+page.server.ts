import type { PageServerLoad, Actions } from './$types';
import { fail } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms';
import { formSchema } from '@/components/order-management/schemas';
import { zod } from 'sveltekit-superforms/adapters';

export const load: PageServerLoad = async ({ url, fetch }) => {
	const page = parseInt(url.searchParams.get('page') || '1');
	const limit = parseInt(url.searchParams.get('limit') || '10');

	const response = await fetch('/api/orders' + `?page=${page}&limit=${limit}`);

	if (!response.ok) {
		console.error('Failed to fetch orders:', response.statusText);
		return {
			form: await superValidate(zod(formSchema)),
			tableOrder: [],
			pagination: {
				page,
				limit,
				totalCount: 0,
				totalPages: 0
			}
		};
	}

	const body = await response.json();

	return {
		form: await superValidate(zod(formSchema)),
		tableOrder: body.orders || [],
		pagination: {
			page: body.pagination?.page,
			limit: body.pagination?.limit,
			totalCount: body.pagination?.totalCount || 0,
			totalPages: body.pagination?.totalPages || 0
		}
	};
};

export const actions: Actions = {
	patch: async (event) => {
		console.log('patch action called');
		const form = await superValidate(event, zod(formSchema));

		console.log('Form data:', form.data);
		console.log('Form valid:', form.valid);

		if (!form.valid) {
			console.log('Form errors:', form.errors);
			return fail(400, { form });
		}

		// Filter out empty fields
		const updateData = Object.fromEntries(
			Object.entries(form.data).filter(([, value]) => value !== '' && value !== undefined)
		);

		console.log('Update data:', updateData);

		const response = await event.fetch(`/api/orders/${form.data.id}`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(updateData)
		});

		if (!response.ok) {
			console.error('Failed to update order:', response.statusText);
			const errorBody = await response.text();
			console.error('Error response:', errorBody);
			return fail(500, { form, error: 'Failed to update order' });
		}

		const updatedOrder = await response.json();
		console.log('Updated order:', updatedOrder);

		return {
			form: await superValidate(zod(formSchema)),
			updatedOrder
		};
	}
};
