<script lang="ts">
	import CircleAlertIcon from '@lucide/svelte/icons/circle-alert';
	import * as Alert from '@/components/ui/alert/index';
	import type { PageData } from './$types.js';
	import FormCheckout from '@/components/checkout/form-checkout.svelte';

	// [BARU]: Impor komponen OrderSummary yang baru kita buat
	import OrderSummary from '@/components/order-summary.svelte';

	let { data }: { data: PageData } = $props();

	// Semua logika keranjang sudah dipindahkan ke dalam OrderSummary.svelte,
	// sehingga bagian script di sini menjadi sangat bersih.
</script>

<svelte:head>
	<title>Checkout</title>
</svelte:head>

<div class="flex flex-1 flex-col">
	<div class="container mx-auto flex flex-1 flex-col px-4 md:px-8">
		<div class="flex flex-col px-2 py-5 md:grid md:grid-cols-3 md:gap-x-12 md:px-8 md:pb-0">
			<div class="order-2 p-3 md:col-span-1 md:p-0 lg:p-6 lg:pt-8">
				<div class="flex flex-col gap-4 md:sticky md:top-24">
					<OrderSummary />
					<Alert.Root variant="destructive" class="shadow-md">
						<CircleAlertIcon class="size-4" />
						<Alert.Title>Aturan Pengantaran dan Pengambilan</Alert.Title>
						<Alert.Description
							>Biaya tambahan mungkin berlaku untuk di luar area Surabaya Timur, Surabaya Selatan
							dan Surabaya Utara.</Alert.Description
						>
					</Alert.Root>
				</div>
			</div>

			<div class=" order-1 p-4 pt-5 md:col-span-2 md:p-6">
				<div>
					<h1 class="pb-6 text-4xl font-semibold md:pb-8 md:text-5xl">Checkout</h1>
					<FormCheckout {data} />
				</div>
			</div>
		</div>

		<div class="bg-background fixed right-0 bottom-0 left-0 z-10 border-t p-4 md:hidden">
			<div class="flex gap-4 sm:flex-row sm:justify-end">
				<button
					type="submit"
					form="form-checkout"
					class="bg-primary text-primary-foreground ring-offset-background hover:bg-primary/90 focus-visible:ring-ring inline-flex h-10 w-full items-center justify-center rounded-md px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50"
				>
					Bayar Sekarang
				</button>
			</div>
		</div>
	</div>
</div>
