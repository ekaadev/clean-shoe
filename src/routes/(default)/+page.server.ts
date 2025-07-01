import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch }) => {
    const response = await fetch('/api/services');

    if (!response.ok) {
        console.error('Failed to fetch services:', response.statusText);
        return {
            services: []
        };
    }

    const body = await response.json();

    return {
        services: body || []
    };
};
