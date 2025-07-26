import { type Actions } from '@sveltejs/kit';
import { fail } from '@sveltejs/kit';

export const actions: Actions = {
	signup: async ({ request, locals: { supabase } }) => {
		const formData = await request.formData();
		const email = formData.get('email') as string;
		const password = formData.get('password') as string;

		// check user already exists
		const { data: existingUser, error: userError } = await supabase
			.from('users')
			.select('id')
			.eq('email', email);

		if (userError) {
			console.error(`[ERROR] ${userError.message}`);
			return fail(400, {
				error: true,
				message: userError.message,
				type: 'signup'
			});
		}

		if (existingUser && existingUser.length > 0) {
			console.warn(`[WARN] User already exists with email: ${email}`);
			return fail(400, {
				error: true,
				message: 'User already exists with this email',
				type: 'signup'
			});
		}

		// Proceed with signup
		const { error } = await supabase.auth.signUp({ email, password });
		if (error) {
			console.error(`[ERROR] Signup failed: ${error.message}`);
			return fail(400, {
				error: true,
				message: error.message,
				type: 'signup'
			});
		}

		return {
			success: true
		};
	}
};
