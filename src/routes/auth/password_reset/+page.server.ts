import { fail, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async () => {
	return {};
}) satisfies PageServerLoad;

export const actions: Actions = {
	reset: async ({ request, locals: { supabase } }) => {
		const formData = await request.formData();
		const email = formData.get('email') as string;

		// check if email is existing in database
		const { data: existingUser, error: userError } = await supabase
			.from('users')
			.select('id')
			.eq('email', email);

		if (userError) {
			console.error(`[ERROR] ${userError.message}`);
			return fail(400, {
				error: true,
				message: userError.message,
				type: 'reset'
			});
		}

		if (!existingUser || existingUser.length === 0) {
			console.warn(`[WARN] Email not found: ${email}`);
			return fail(400, {
				error: true,
				message: 'Email not found',
				type: 'reset'
			});
		}

		// proceed with password reset in supabase
		const { error } = await supabase.auth.resetPasswordForEmail(email, {
			redirectTo: `/auth/update_password`
		});

		if (error) {
			console.error(`[ERROR] Password reset failed: ${error.message}`);
			return fail(400, {
				error: true,
				message: error.message,
				type: 'reset'
			});
		}

		console.log(`[INFO] Password reset email sent to: ${email}`);

		return {
			success: true
		};
	}
};
