<script lang="ts">
	// Impor Form dan tipe nya
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { formSchema, type FormSchema } from './schema';

	// Impor komponen UI Shadcn-Svelte
	import { Input } from '@/components/ui/input/index';
	import * as Card from '@/components/ui/card/index';
	import * as Form from '@/components/ui/form/index';
	import * as Select from '@/components/ui/select';
	import { Textarea } from '@/components/ui/textarea';

	// Impor yang diperlukan untuk logika tanggal
	import { cart } from '$lib/helper/cart-handler'; // Sesuaikan path jika perlu
	import { browser } from '$app/environment';

	// Inisialisasi Form
	let { data } = $props();
	const form = superForm(data.form as SuperValidated<Infer<FormSchema>>, {
		validators: zodClient(formSchema)
	});
	const { form: formData, enhance, errors } = form;

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
								bind:value={$formData.email}
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
								type="teks"
								bind:value={$formData.pickupAddress}
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
