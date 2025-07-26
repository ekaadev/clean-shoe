import { type Actions } from '@sveltejs/kit';
import { fail } from '@sveltejs/kit';

export const actions: Actions = {
	login: async ({ request, locals: { supabase } }) => {
		const formData = await request.formData();
		const email = formData.get('email') as string;
		const password = formData.get('password') as string;

		const { error } = await supabase.auth.signInWithPassword({ email, password });
		if (error) {
			console.log(`[ERROR] Login failed: ${error.message}`);
			return fail(400, {
				error: true,
				message: error.message,
				type: 'login'
			});
		}

		console.log(`[INFO] User logged in: ${email}`);

		return {
			success: true
		};
	}
};
