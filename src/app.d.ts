// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
import { type Session, SupabaseClient } from '@supabase/supabase-js';

type Profile = {
	id: string;
	name?: string;
	email: string;
	phone_number?: string;
	address?: string;
	role: string;
};

declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			supabase: SupabaseClient<Database>;
			safeGetSession: () => Promise<{ session: Session | null; user: User | null }>;
			session: Session | null;
			user: User | null;
			profile: Profile | null;
		}

		interface PageData {
			session: Session | null;
		}

		interface Error {
			message: string;
		}

		interface ActionData {
			message?: string;
		}

		// interface PageState {}
		// interface Platform {}
	}
}

export {};
