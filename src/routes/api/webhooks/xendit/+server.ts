import { json, type RequestHandler } from '@sveltejs/kit';

// webhook handler for Xendit

export const POST: RequestHandler = async ({ request, locals }) => {
	const payload = await request.json();

	console.log('log: retrieved payload', JSON.stringify(payload, null, 2));

	/**
   * 
   {
    "id": "579c8d61f23fa4ca35e52da4",
    "external_id": "invoice_123124123",
    "user_id": "5781d19b2e2385880609791c",
    "is_high": true,
    "payment_method": "BANK_TRANSFER",
    "status": "PAID",
    "merchant_name": "Xendit",
    "amount": 50000,
    "paid_amount": 50000,
    "bank_code": "PERMATA",
    "paid_at": "2016-10-12T08:15:03.404Z",
    "payer_email": "wildan@xendit.co",
    "description": "This is a description",
    "adjusted_received_amount": 47500,
    "fees_paid_amount": 0,
    "updated": "2016-10-10T08:15:03.404Z",
    "created": "2016-10-10T08:15:03.404Z",
    "currency": "IDR",
    "payment_channel": "PERMATA",
    "payment_destination": "888888888888"
  }
   */

	const invoiceId = payload.external_id;
	const status = payload.status.toLowerCase();
	const payment_provider = payload.merchant_name;
	const payment_method = payload.payment_method;
	const amount = payload.amount;
	const reference_id = payload.id;

	const { data: orders } = await locals.supabase
		.from('orders')
		.select('id')
		.eq('invoice_id', invoiceId)
		.single();

	if (!orders) {
		console.log('log: order not found');
		return json({ error: 'Order not found' }, { status: 404 });
	}

	// insert payment transaction
	await locals.supabase.from('payment_transactions').insert([
		{
			order_id: orders.id,
			payment_provider: payment_provider,
			amount: amount,
			reference_id: reference_id,
			status: status,
			payment_method: payment_method
		}
	]);

	// update order status
	await locals.supabase
		.from('orders')
		.update({
			payment_status: status
		})
		.eq('invoice_id', invoiceId);

	console.log('log: payment transaction and order status updated successfully');

	return json(
		{
			message: 'Webhook processed successfully'
		},
		{
			status: 200
		}
	);
};
