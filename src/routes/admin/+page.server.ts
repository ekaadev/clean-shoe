import type { SupabaseClient } from '@supabase/supabase-js';
import type { PageServerLoad } from './$types';
export const load: PageServerLoad = async ({ locals }) => {
	const totalRevenue = await getTotalRevenue(locals.supabase);
	const totalOrder = await getTotalOrder(locals.supabase);
	const totalCustomer = await getTotalAllCustomer(locals.supabase);
	const tableOrder = await getTableOrder(locals.supabase);
	const orderEachDay = await getOrderEachDay(locals.supabase);
	const totalPendingOrder = await getTotalPendingOrder(locals.supabase);

	return {
		totalRevenue: totalRevenue || 0,
		totalOrder: totalOrder || 0,
		totalCustomer: totalCustomer || 0,
		totalPendingOrder: totalPendingOrder || 0,
		tableOrder: tableOrder || [],
		orderEachDay: orderEachDay || []
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

const getTableOrder = async (supabase: SupabaseClient) => {
	let { data: orders, error } = await supabase
		.from('orders')
		.select('id,total_amount,status,payment_status, created_at')
		.eq('status', 'pending')
		.eq('payment_status', 'paid')
		.order('created_at', { ascending: true })
		.limit(8);
	if (error) {
		console.error('Error fetching orders:', error);
		return []; // Return an empty array or handle the error as needed
	}
	return orders || []; // Return the orders or an empty array if no data is found
};

const getOrderEachDay = async (supabase: SupabaseClient) => {
	let { data, error } = await supabase.rpc('get_order_each_day');
	if (error) {
		console.error('Error fetching orders each day:', error);
		return []; // Return an empty array or handle the error as needed
	}

	return data || []; // Return the data or an empty array if no data is found
};

const getTotalPendingOrder = async (supabase: SupabaseClient) => {
	let { data, error } = await supabase.rpc('get_total_pending_order');
	if (error) {
		console.error('Error fetching total pending orders:', error);
		return 0; // Return 0 or handle the error as needed
	}
	return data || 0; // Return the data or 0 if no data is found
};
