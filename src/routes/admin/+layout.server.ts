import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals }) => {
	if (!locals.user) {
		throw redirect(302, '/auth');
	}

	if (locals.profile?.role !== 'admin') {
		throw redirect(302, '/');
	}

	return {
		profile: locals.profile
	};
};
