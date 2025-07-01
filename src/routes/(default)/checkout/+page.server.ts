import type { PageServerLoad, Actions } from './$types.js';
import { fail } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms';
import { formSchema } from '$lib/components/checkout/schema';
import { zod } from 'sveltekit-superforms/adapters';
import type { CartItem } from '$lib/types/interface/cart.interface.js';

// Type definitions for order data
interface OrderItem {
	service_id: number;
	quantity: number;
	price: number;
	total: number;
}

interface CreateOrderRequest {
	orders: {
		user_id: string | null;
		name: string;
		phone_number: string;
		email: string;
		total_amount: number;
		pickup_address: string | undefined;
		delivery_address: string;
		pickup_date: string | undefined;
		notes: string;
	};
	order_items: OrderItem[];
}

export const load: PageServerLoad = async () => {
	return {
		form: await superValidate(zod(formSchema))
	};
};

export const actions: Actions = {
	default: async ({ request, locals, fetch }) => {
		console.log('Processing order submission...');
		// First, get the form data to extract cart data before superValidate consumes the body
		const formData = await request.formData();
		const cartDataString = formData.get('cartData') as string;
		let cartData: CartItem[] = [];

		try {
			cartData = JSON.parse(cartDataString || '[]');
		} catch (error) {
			console.error('Error parsing cart data:', error);
		}

		// Now validate the form using the formData instead of request
		const form = await superValidate(formData, zod(formSchema));

		console.log('Form Data:', form.data);
		console.log('Cart Data:', cartData);

		if (!form.valid) {
			return fail(400, { form });
		}

		// Here you can process the order data
		// For example: save to database, send confirmation email, etc.

		// Example order data structure:
		const orderData = {
			customer: {
				fullName: form.data.fullName,
				contact: form.data.contact,
				email: form.data.email
			},
			delivery: {
				type: form.data.deliveryType,
				pickupDate: form.data.pickupDate,
				pickupAddress: form.data.pickupAddress,
				deliveryAddress: form.data.delieveryAddress
			},
			items: cartData,
			notes: form.data.notes,
			createdAt: new Date().toISOString()
		};

		console.log('Order Data:', orderData);

		const updateData: CreateOrderRequest = {
			orders: {
				user_id: locals.user?.id || null,
				name: orderData.customer.fullName,
				phone_number: orderData.customer.contact,
				email: orderData.customer.email,
				total_amount: cartData.reduce((total: number, item: CartItem) => total + item.total, 0),
				pickup_address: orderData.delivery.pickupAddress || '',
				delivery_address: orderData.delivery.deliveryAddress,
				pickup_date: orderData.delivery.pickupDate,
				notes: orderData.notes || ''
			},
			order_items: cartData.map((item: CartItem) => ({
				service_id: item.service_id, // Changed from item.id to item.service_id
				quantity: item.qty, // Changed from item.quantity to item.qty
				price: item.price, // Changed from item.total to item.price (unit price)
				total: item.total // Added total for line item total
			}))
		};

		console.log('Update Data being sent to API:', JSON.stringify(updateData, null, 2));

		// TODO: Save orderData to database
		try {
			const response = await fetch('/api/orders', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(updateData)
			});

			// Get the response text to see the actual error
			const responseText = await response.text();

			if (!response.ok) {
				console.error('Failed to save order:', {
					status: response.status,
					statusText: response.statusText,
					responseBody: responseText
				});

				// Try to parse the error response
				let errorMessage = 'Gagal menyimpan pesanan. Silakan coba lagi.';
				try {
					const errorData = JSON.parse(responseText);
					if (errorData.error) {
						errorMessage = `Error: ${errorData.error}`;
					}
				} catch (parseError) {
					console.error('Could not parse error response:', parseError);
				}

				return fail(500, {
					form,
					message: errorMessage
				});
			}

			const result = JSON.parse(responseText);
			console.log('Order saved successfully:', result);
		} catch (error) {
			console.error('Error saving order:', error);
			return fail(500, {
				form,
				message: 'Terjadi kesalahan saat menyimpan pesanan.'
			});
		}

		// TODO: Send confirmation email
		// TODO: Clear cart after successful order

		return {
			form,
			message: 'Pesanan berhasil dibuat!',
			orderId: `ORDER-${Date.now()}` // Generate temporary order ID
		};
	}
};
