import type { PageServerLoad, Actions } from './$types.js';
import { fail } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms';
import { formSchema } from '@/components/orders/schemas';
import { zod } from 'sveltekit-superforms/adapters';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async () => {
	return {
		form: await superValidate(zod(formSchema))
	};
};

export const actions: Actions = {
	default: async (event) => {
		console.log('default action called');
		const form = await superValidate(event, zod(formSchema));

		if (!form.valid) {
			console.log('Form errors:', form.errors);
			return fail(400, { form });
		}

		redirect(303, `/orders/${form.data.id}`);
	}
};
