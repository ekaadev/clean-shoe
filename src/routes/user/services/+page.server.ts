import type { PageServerLoad } from './$types';
// Mengimpor data tiruan dari file lokal
import { services, websiteInfo } from '$lib/data/services';

export const load: PageServerLoad = () => {
	console.log('Loading MOCK services from local file...');
	return { services, websiteInfo };
};
