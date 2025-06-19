<script lang="ts">
	import { toast } from 'svelte-sonner';
	import { addItem } from '$lib/helper/cart-handler';
	import { goto } from '$app/navigation';
	import { IsMobile } from '@/hooks/is-mobile.svelte';
	import { Button } from '$lib/components/ui/button/index';
	import * as Drawer from '$lib/components/ui/drawer/index';
	import { refreshCart } from '$lib/stores/cart.store';
	import { onMount } from 'svelte';

	const { data } = $props();

	const isMobile = new IsMobile();

	let qty = $state(1);
</script>

{#if isMobile.current}
	<div
		class="bg-background fixed right-0 bottom-0 left-0 z-10 max-w-full space-y-4 border-t px-4 py-6 shadow-sm"
	>
		<Drawer.Root>
			<Drawer.Trigger class="w-full">
				<div class="flex w-full gap-2">
					<Button class="flex-1 rounded-lg font-semibold" variant="outline">Beli Sekarang</Button>
					<Button class="flex-1 rounded-lg font-semibold">Masukkan keranjang</Button>
				</div>
			</Drawer.Trigger>

			<Drawer.Content>
				<Drawer.Header>
					<Drawer.Title>
						<div class="flex flex-col gap-2">
							<h3 class="text-lg font-semibold">Jumlah</h3>

							<div
								class="mx-auto flex w-fit items-center justify-center overflow-hidden rounded-lg text-xl"
							>
								<Button onclick={() => (qty > 1 ? qty-- : qty)} class="px-4 py-2">-</Button>
								<span class="px-6 py-2">{qty}</span>
								<Button onclick={() => qty++} class="px-4 py-2">+</Button>
							</div>
						</div>
					</Drawer.Title>

					<Drawer.Description class="w-full">
						<div>
							<h4 class="font-medium">Rincian pesanan</h4>

							<div class="space-y-1 rounded-lg border p-4 text-sm">
								<div class="flex justify-between">
									<span>Durasi</span>
									<span>{data.service.estimated_days} Hari</span>
								</div>
								<div class="flex justify-between">
									<span>Biaya</span>
									<span>Rp {data.service.price.toLocaleString()}</span>
								</div>
								<div class="flex justify-between">
									<span>Jumlah</span>
									<span>{qty}</span>
								</div>
								<hr />
								<div class="flex justify-between font-semibold">
									<span>Total</span>
									<span>Rp {(data.service.price * qty).toLocaleString()}</span>
								</div>
							</div>
						</div>
					</Drawer.Description>
				</Drawer.Header>

				<Drawer.Footer class="w-full">
					<div class="flex w-full gap-2">
						<Button
							class="flex-1 rounded-lg py-2 font-semibold"
							variant="outline"
							onclick={() => {
								addItem({
									service_id: data.service.id,
									service_name: data.service.name,
									price: data.service.price,
									qty: qty, // dari state lokal OrderPanel
									estimated_days: data.service.estimated_days
								});

								qty = 1;
								goto('/checkout');
							}}
						>
							Beli Sekarang
						</Button>

						<Button
							class="flex-1 rounded-lg py-2 font-semibold"
							onclick={() => {
								addItem({
									service_id: data.service.id,
									service_name: data.service.name,
									price: data.service.price,
									qty: qty, // dari state lokal OrderPanel
									estimated_days: data.service.estimated_days
								});

								toast.success('Berhasil ditambahkan ke keranjang!');
								qty = 1;
							}}
						>
							Masukkan keranjang
						</Button>
					</div>
				</Drawer.Footer>
			</Drawer.Content>
		</Drawer.Root>
	</div>
{:else}
	<div class="w-full max-w-md space-y-4 rounded-xl border-2 p-4 shadow-sm">
		<h3 class="text-lg font-semibold">Jumlah</h3>

		<div class="mx-auto flex w-full items-center justify-center overflow-hidden rounded-lg text-xl">
			<Button onclick={() => (qty > 1 ? qty-- : qty)} class="px-4 py-2">-</Button>
			<span class="px-6 py-2">{qty}</span>
			<Button onclick={() => qty++} class="px-4 py-2">+</Button>
		</div>

		<h4 class="font-medium">Rincian pesanan</h4>

		<div class="space-y-1 rounded-lg border p-4 text-sm">
			<div class="flex justify-between">
				<span>Durasi</span>
				<span>{data.service.estimated_days} Hari</span>
			</div>
			<div class="flex justify-between">
				<span>Biaya</span>
				<span>Rp {data.service.price.toLocaleString()}</span>
			</div>
			<div class="flex justify-between">
				<span>Jumlah</span>
				<span>{qty}</span>
			</div>
			<hr />
			<div class="flex justify-between font-semibold">
				<span>Total</span>
				<span>Rp {(data.service.price * qty).toLocaleString()}</span>
			</div>
		</div>

		<Button
			class="w-full rounded-lg py-2 font-semibold"
			onclick={() => {
				addItem({
					service_id: data.service.id,
					service_name: data.service.name,
					price: data.service.price,
					qty: qty, // dari state lokal OrderPanel
					estimated_days: data.service.estimated_days
				});

				toast.success('Berhasil ditambahkan ke keranjang!');
				qty = 1;
			}}
		>
			Masukkan keranjang
		</Button>

		<Button
			class="w-full rounded-lg py-2 font-semibold"
			variant="outline"
			onclick={() => {
				addItem({
					service_id: data.service.id,
					service_name: data.service.name,
					price: data.service.price,
					qty: qty, // dari state lokal OrderPanel
					estimated_days: data.service.estimated_days
				});

				qty = 1;

				goto('/checkout');
			}}
		>
			Beli Sekarang
		</Button>
	</div>
{/if}
