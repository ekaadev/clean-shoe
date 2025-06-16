import type { PageServerLoad, Actions } from './$types.js';
import { superValidate } from 'sveltekit-superforms';
import { formSchema } from '@/components/profile/schemas';
import { fail } from '@sveltejs/kit';
import { zod } from 'sveltekit-superforms/adapters';

export const load: PageServerLoad = async ({ parent }) => {
	const data = await parent();
	return {
		profile: data.profile,
		form: await superValidate(zod(formSchema))
	};
};

export const actions: Actions = {
	patch: async (event) => {
		console.log('patch action called');
		const form = await superValidate(event, zod(formSchema));

		if (!form.valid) {
			console.log('Form errors:', form.errors);
			return fail(400, { form });
		}

		const updateData = Object.fromEntries(
			Object.entries(form.data).filter(([, value]) => value !== '' && value !== undefined)
		);

		const response = await event.fetch(`/api/users/${form.data.id}`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(updateData)
		});

		if (!response.ok) {
			console.error('Failed to update user:', response.statusText);
			const errorBody = await response.text();
			console.error('Error response:', errorBody);
			return fail(500, { form, error: 'Failed to update user' });
		}

		const updatedUser = await response.json();
		console.log('Updated user:', updatedUser);

		// Return the form with a success message
		form.message = 'Profile updated successfully';
		return { form };
	}
};
