import type { PageServerLoad, Actions } from './$types.js';
import { fail } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms';
import { formSchema } from '$lib/components/checkout/schema';
import { zod } from 'sveltekit-superforms/adapters';

export const load: PageServerLoad = async () => {
	return {
		form: await superValidate(zod(formSchema))
	};
};

export const actions: Actions = {
	default: async ({ request }) => {
		const form = await superValidate(request, zod(formSchema));

		console.log('Form Data:', form.data);

		if (!form.valid) {
			return fail(400, { form });
		}

		// Contoh Return Form biasa, Nanti bisa diganti untuk menyimpan data ke database atau melakukan proses lainnya
		return {
			form,
			message: 'Form submitted successfully!'
		};
	}
};
