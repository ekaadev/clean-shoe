import type { SupabaseClient } from '@supabase/supabase-js';
import type { PageServerLoad } from './$types';
export const load: PageServerLoad = async ({ locals }) => {
	const totalRevenue = await getTotalRevenue(locals.supabase);
	const totalOrder = await getTotalOrder(locals.supabase);
	const totalCustomer = await getTotalAllCustomer(locals.supabase);

	return {
		totalRevenue: totalRevenue || 0,
		totalOrder: totalOrder || 0,
		totalCustomer: totalCustomer || 0
	};
};

// TODO: create proper logging mechanism

const getTotalRevenue = async (supabase: SupabaseClient) => {
	const { data, error } = await supabase.rpc('get_total_revenue_last_month');
	if (error) {
		console.error('Error fetching total revenue:', error);
		return 0; // Return 0 or handle the error as needed
	}
	return data || 0; // Return the data or 0 if no data is found
};

const getTotalOrder = async (supabase: SupabaseClient) => {
	const { data, error } = await supabase.rpc('get_total_order_last_month');
	if (error) {
		console.error('Error fetching total order:', error);
		return 0; // Return 0 or handle the error as needed
	}
	return data || 0; // Return the data or 0 if no data is found
};

const getTotalAllCustomer = async (supabase: SupabaseClient) => {
	const { data, error } = await supabase.rpc('get_total_customer');
	if (error) {
		console.error('Error fetching total customer:', error);
		return 0; // Return 0 or handle the error as needed
	}
	return data || 0; // Return the data or 0 if no data is found
};
