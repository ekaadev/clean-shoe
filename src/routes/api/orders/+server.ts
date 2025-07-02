import { json, type RequestHandler } from '@sveltejs/kit';
import { redirect } from '@sveltejs/kit';
import { formatInvoiceOrder } from '@/helper/format';
import { Invoice } from '$lib/xendit';
import type { CreateInvoiceRequest } from 'xendit-node/invoice/models';
import { PUBLIC_URL } from '$env/static/public';

interface OrderItem {
	order_id: number;
	service_id: number;
	quantity: number;
	price: number;
	total: number;
}

interface ListOrderXendit {
	name: string;
	quantity: number;
	price: number;
}

export const GET: RequestHandler = async ({ locals, url }) => {
	if (!locals.user) {
		throw redirect(302, '/auth');
	}

	if (locals.profile?.role !== 'admin') {
		throw redirect(302, '/');
	}

	const page = parseInt(url.searchParams.get('page') || '1');
	const limit = parseInt(url.searchParams.get('limit') || '10');

	const offset = (page - 1) * limit;

	const { count } = await locals.supabase
		.from('orders')
		.select('*', { count: 'exact', head: true });

	const { data, error } = await locals.supabase
		.from('orders')
		.select(
			`
    *,
    order_items (
      quantity,
      price,
      services (
        name
      )
    )
  `
		)
		.order('created_at', { ascending: false })
		.range(offset, offset + limit - 1);

	if (error) {
		console.error('Error fetching order details:', error);
		return json({ error: 'Failed to fetch order details' }, { status: 500 });
	}

	return json({
		orders: data || [],
		pagination: {
			page,
			limit,
			totalCount: count || 0,
			totalPages: Math.ceil((count || 0) / limit)
		}
	});
};

export const POST: RequestHandler = async ({ locals, request }) => {
	try {
		// Check if user is authenticated (optional for guest orders)
		console.log('User authenticated:', !!locals.user);
		console.log('User ID:', locals.user?.id);

		const body = await request.json();
		console.log('Received order data:', JSON.stringify(body, null, 2));

		const { orders, order_items } = body;

		if (!orders || !order_items || order_items.length === 0) {
			console.error('Invalid order data received:', { orders, order_items });
			return json(
				{ error: 'Invalid order data: orders and order_items are required' },
				{ status: 400 }
			);
		}

		// Validate required fields
		const requiredFields = ['name', 'phone_number', 'email', 'total_amount', 'delivery_address'];
		const missingFields = requiredFields.filter((field) => !orders[field]);

		if (missingFields.length > 0) {
			console.error('Missing required fields:', missingFields);
			return json(
				{ error: `Missing required fields: ${missingFields.join(', ')}` },
				{ status: 400 }
			);
		}

		console.log('Attempting to insert order:', {
			user_id: orders.user_id || null,
			name: orders.name,
			phone_number: orders.phone_number,
			email: orders.email,
			total_amount: orders.total_amount,
			pickup_address: orders.pickup_address,
			delivery_address: orders.delivery_address,
			pickup_date: orders.pickup_date,
			notes: orders.notes || ''
		});

		// generate invoice id
		const invoiceId = formatInvoiceOrder();

		const { data, error } = await locals.supabase
			.from('orders')
			.insert([
				{
					user_id: orders.user_id || null,
					name: orders.name,
					phone_number: orders.phone_number,
					email: orders.email,
					total_amount: orders.total_amount,
					pickup_address: orders.pickup_address,
					delivery_address: orders.delivery_address,
					pickup_date: orders.pickup_date,
					notes: orders.notes || '',
					invoice_id: invoiceId
				}
			])
			.select()
			.single();

		if (error) {
			console.error('Error creating order:', {
				message: error.message,
				details: error.details,
				hint: error.hint,
				code: error.code
			});
			return json(
				{
					error: `Failed to create order: ${error.message}`,
					details: error.details,
					hint: error.hint
				},
				{ status: 500 }
			);
		}

		console.log('Order created successfully:', data);
		const orderId = data.id;

		const orderItems = order_items.map((item: OrderItem) => ({
			order_id: orderId,
			service_id: item.service_id,
			quantity: item.quantity,
			price: item.total
		}));

		console.log('Attempting to insert order items:', orderItems);

		const { error: itemsError } = await locals.supabase.from('order_items').insert(orderItems);

		if (itemsError) {
			console.error('Error creating order items:', {
				message: itemsError.message,
				details: itemsError.details,
				hint: itemsError.hint,
				code: itemsError.code
			});
			return json(
				{
					error: `Failed to create order items: ${itemsError.message}`,
					details: itemsError.details,
					hint: itemsError.hint
				},
				{ status: 500 }
			);
		}

		const dataInvoice: CreateInvoiceRequest = {
			externalId: invoiceId,
			amount: orders.total_amount,
			payerEmail: orders.email,
			description: 'Pembayaran Jasa Cuci Sepatu',
			successRedirectUrl: `${PUBLIC_URL}/orders/${invoiceId}`, // test with tunnel random url
			items: order_items.map((item: ListOrderXendit) => ({
				name: `Layanan ${item.name}`,
				quantity: item.quantity,
				price: item.price
			}))
		};

		let invoiceUrl;
		try {
			const created = await Invoice.createInvoice({ data: dataInvoice });
			invoiceUrl = created.invoiceUrl;

			console.log('Invoice created successfully:', created);
		} catch (invoiceError) {
			console.error('Error creating invoice:', invoiceError);
			return json(
				{
					error: 'Failed to create invoice'
				},
				{
					status: 500
				}
			);
		}

		console.log('Order items created successfully');
		return json(
			{
				order_id: data.id,
				invoice_id: data.invoice_id,
				invoiceUrl: invoiceUrl
			},
			{
				status: 201
			}
		);
	} catch (error) {
		console.error('Error processing request:', error);
		return json(
			{
				error: 'Invalid request data',
				details: error instanceof Error ? error.message : 'Unknown error'
			},
			{ status: 400 }
		);
	}
};
