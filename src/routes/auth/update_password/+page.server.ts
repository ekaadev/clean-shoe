import type { PageServerLoad } from './$types';
import { fail } from '@sveltejs/kit';

export const load = (async () => {
	return {};
}) satisfies PageServerLoad;

export const actions = {
	update: async ({ request, locals: { supabase } }) => {
		const formData = await request.formData();

		// get password and confirm password from form data
		const password = formData.get('password') as string;
		const confirmPassword = formData.get('confirmPassword') as string;

		// check if password and confirm password match
		if (password !== confirmPassword) {
			console.warn('[WARN] Password and confirm password do not match');
			return fail(400, {
				error: true,
				message: 'Password and confirm password do not match',
				type: 'update'
			});
		}

		// update password in supabase
		const { error } = await supabase.auth.updateUser({
			password: password
		});

		if (error) {
			console.error(`[ERROR] Password update failed: ${error.message}`);
			return fail(400, {
				error: true,
				message: error.message,
				type: 'update'
			});
		}

		console.log('[INFO] Password updated successfully');

		return {
			success: true
		};
	}
};
