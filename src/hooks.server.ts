import { type Handle, redirect } from '@sveltejs/kit';
import { createServerClient } from '@supabase/ssr';
import { PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL } from '$env/static/public';
import { sequence } from '@sveltejs/kit/hooks';

const supabase: Handle = async ({ event, resolve }) => {
	/**
	 * Create supabase client specific to the request
	 *
	 * The supabase client gets the Auth token from the requests cookies
	 */
	event.locals.supabase = createServerClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
		cookies: {
			getAll: () => event.cookies.getAll(),
			/**
			 * SvelteKit's cookies API requires `path` to be explicitly set in
			 * the cookie options. Setting `path` to `/` replicates previous/
			 * standard behavior.
			 */
			setAll: (cookiesToSet) => {
				cookiesToSet.forEach(({ name, value, options }) => {
					event.cookies.set(name, value, { ...options, path: '/' });
				});
			}
		}
	});
	/**
	 * Unlike `supabase.auth.getSession()`, which returns the session _without_
	 * validating the JWT, this function also calls `getUser()` to validate the
	 * JWT before returning the session.
	 */
	event.locals.safeGetSession = async () => {
		const {
			data: { session }
		} = await event.locals.supabase.auth.getSession();
		if (!session) {
			return { session: null, user: null };
		}

		const {
			data: { user },
			error
		} = await event.locals.supabase.auth.getUser();
		if (error) {
			console.error(`[ERROR] ${error.message}`);
			return {
				session: null,
				user: null
			};
		}

		if (session) {
			// get data from table users
			const { data: users, error } = await event.locals.supabase
				.from('users')
				.select('*')
				.eq('id', session.user.id)
				.single();
			if (error) {
				console.error(`[ERROR] ${error.message}`);
				return { session: null, user: null };
			}
			if (user) {
				event.locals.profile = {
					id: users.id,
					name: users.name || '',
					email: users.email,
					phone_number: users.phone_number || '',
					address: users.address || '',
					role: users.role
				};
			}
		}
		return { session, user };
	};

	return resolve(event, {
		filterSerializedResponseHeaders(name) {
			/**
			 * Supabase libraries use the `content-range` and `x-supabase-api-version`
			 * headers, so we need to tell SvelteKit to pass it through.
			 */
			return name === 'content-range' || name === 'x-supabase-api-version';
		}
	});
};

const authGuard: Handle = async ({ event, resolve }) => {
	const { session, user } = await event.locals.safeGetSession();
	event.locals.session = session;
	event.locals.user = user;

	if (event.locals.session && event.url.pathname === '/auth') {
		redirect(303, '/');
	}

	console.log(`[INFO] User ${user ? user.email : 'No user logged in'}`);
	console.log(`[INFO] Access Path: ${event.url.pathname}`);

	return resolve(event);
};

export const handle: Handle = sequence(supabase, authGuard);
