<script lang="ts">
	// Impor Form dan tipe nya
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { formSchema, type FormSchema } from './schema';

	import { toast } from 'svelte-sonner';

	// Impor komponen UI Shadcn-Svelte
	import { Input } from '@/components/ui/input/index';
	import * as Card from '@/components/ui/card/index';
	import * as Form from '@/components/ui/form/index';
	import * as Select from '@/components/ui/select';
	import { Textarea } from '@/components/ui/textarea';

	// Impor yang diperlukan untuk logika tanggal
	import { cart } from '$lib/helper/cart-handler'; // Sesuaikan path jika perlu
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';

	// Inisialisasi Form
	let { data } = $props();
	const form = superForm(data.form as SuperValidated<Infer<FormSchema>>, {
		validators: zodClient(formSchema),
		onSubmit: ({ formData, cancel }) => {
			// Validate cart before submission
			if ($cart.length === 0) {
				toast.success('Keranjang kosong! Silakan tambahkan item terlebih dahulu.');
				cancel();
				return;
			}

			// Ensure cart data is included in the form submission
			formData.set('cartData', JSON.stringify($cart));
			console.log('Submitting order with cart data:', $cart);
		},
		onResult: ({ result }) => {
			if (result.type === 'success' && result.data?.message) {
				// Show success message
				console.log('Order success:', result.data.message);
				toast.success('Pesanan berhasil dibuat!');
				// Clear cart after successful submission
				cart.clearCart();
				// Redirect to home or orders page
				if (browser) {
					goto('/orders'); // or wherever you want to redirect
				}
			}
		},
		onError: ({ result }) => {
			console.error('Form submission error:', result);
			toast.error('Terjadi kesalahan saat memproses pesanan. Silakan coba lagi.');
		}
	});
	const { form: formData, enhance, errors } = form;

	// Alternative approach: You could also handle cart data entirely client-side
	// and pass it via the onSubmit callback or through a separate API call

	// Example alternative method:
	// const submitWithCart = async () => {
	//   const orderData = {
	//     ...form.data,
	//     cartItems: $cart
	//   };
	//   // Send to custom API endpoint
	//   const response = await fetch('/api/orders', {
	//     method: 'POST',
	//     headers: { 'Content-Type': 'application/json' },
	//     body: JSON.stringify(orderData)
	//   });
	// };

	// --- Logika Untuk UI Date Picker Dinamis ---
	let estimatedDays = $state(2);

	$effect(() => {
		// $cart akan otomatis update setiap kali keranjang berubah
		const currentCart = $cart;
		if (browser && currentCart.length > 0) {
			// Ambil estimasi hari terlama dari semua item di keranjang
			estimatedDays = Math.max(...currentCart.map((item) => Number(item.estimated_days) || 2));
		}
	});

	let minDeliveryDate = $derived(() => {
		if (!$formData.pickupDate) return '';

		const pickup = new Date($formData.pickupDate);
		pickup.setDate(pickup.getDate() + estimatedDays);
		return pickup.toISOString().split('T')[0];
	});

	let todayString = new Date().toISOString().split('T')[0];
</script>

<Card.Root class="w-full">
	<Card.Content class="pt-6">
		<h2 class="mb-4 pb-6 text-2xl font-semibold tracking-tight">Form Pemesanan</h2>
		<form
			method="POST"
			use:enhance
			id="form-checkout"
			class="grid grid-cols-1 gap-x-6 gap-y-8 md:grid-cols-2"
		>
			<!-- Hidden field untuk cart data -->
			<input type="hidden" name="cartData" value={JSON.stringify($cart)} />

			<Form.Field {form} name="fullName">
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label>Nama Lengkap</Form.Label>
						<Input
							{...props}
							bind:value={$formData.fullName}
							autocomplete="off"
							placeholder="Masukkan Nama Pemesan"
						/>
					{/snippet}
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>

			<Form.Field {form} name="contact">
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label>No Telepon</Form.Label>
						<Input
							{...props}
							bind:value={$formData.contact}
							autocomplete="off"
							placeholder="0812xxxxxxxx"
						/>
					{/snippet}
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>

			<Form.Field {form} name="email">
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label>Email</Form.Label>
						<Input
							{...props}
							type="email"
							bind:value={$formData.email}
							autocomplete="email"
							placeholder="contoh@email.com"
						/>
					{/snippet}
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>

			<Form.Field {form} name="deliveryType">
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label>Jenis Layanan</Form.Label>
						<Select.Root type="single" bind:value={$formData.deliveryType} name={props.name}>
							<Select.Trigger {...props} class="w-full">
								{#if $formData.deliveryType === 'antar_jemput'}
									Antar Jemput
								{:else if $formData.deliveryType === 'antar_sendiri'}
									Antar Sendiri
								{:else}
									Pilih Jenis Layanan
								{/if}
							</Select.Trigger>
							<Select.Content>
								<Select.Item value="antar_jemput" label="Antar Jemput" />
								<Select.Item value="antar_sendiri" label="Antar Sendiri" />
							</Select.Content>
						</Select.Root>
					{/snippet}
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>

			{#if $formData.deliveryType === 'antar_jemput'}
				<Form.Field {form} name="pickupDate">
					<Form.Control>
						{#snippet children({ props })}
							<div class="relative">
								<Form.Label>Tanggal Pengambilan</Form.Label>
								<Input
									{...props}
									type="date"
									bind:value={$formData.pickupDate}
									class="mt-2"
									min={todayString}
								/>
							</div>
						{/snippet}
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>

				<Form.Field {form} name="pickupAddress">
					<Form.Control>
						{#snippet children({ props })}
							<Form.Label>Alamat Pengambilan</Form.Label>
							<Input
								{...props}
								type="text"
								bind:value={$formData.pickupAddress}
								placeholder="Masukkan Alamat Pengambilan"
							/>
						{/snippet}
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>
			{/if}

			<Form.Field {form} name="delieveryAddress">
				<Form.Control>
					{#snippet children({ props })}
						<div class="relative">
							<Form.Label>Alamat Pengantaran</Form.Label>
							<Input
								{...props}
								type="text"
								bind:value={$formData.delieveryAddress}
								class="mt-2"
								placeholder="Masukkan Alamat Pengantaran"
							/>
						</div>
					{/snippet}
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>

			<div class="md:col-span-2">
				<Form.Field {form} name="notes">
					<Form.Control>
						{#snippet children({ props })}
							<Form.Label>Note (Opsional)</Form.Label>
							<Textarea
								{...props}
								bind:value={$formData.notes}
								placeholder="Tinggalkan catatan jika ada..."
							/>
						{/snippet}
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>
			</div>
		</form>
	</Card.Content>
</Card.Root>
