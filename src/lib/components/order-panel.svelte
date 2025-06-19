<script lang="ts">
	import { toast } from "svelte-sonner";
	import { addItem } from '$lib/helper/cart-handler';
	import { goto } from '$app/navigation';
	import { IsMobile } from '@/hooks/is-mobile.svelte';
	import { Button } from '$lib/components/ui/button/index'
	import * as Drawer from "$lib/components/ui/drawer/index";
	import { refreshCart } from "$lib/stores/cart.store"
	import { onMount } from 'svelte';

  const { data } = $props();

	const isMobile = new IsMobile();

	let qty = $state(1);

</script>


{#if isMobile.current}
	<div class="px-4 py-6 border-t max-w-full space-y-4 shadow-sm fixed bottom-0 bg-background z-10 left-0 right-0">
		<Drawer.Root>
			<Drawer.Trigger class="w-full">
				<div class="flex w-full gap-2">
					<Button class="flex-1 rounded-lg font-semibold" variant="outline">
						Beli Sekarang
					</Button>
					<Button class="flex-1 rounded-lg font-semibold">
						Masukkan keranjang
					</Button>
				</div>
			</Drawer.Trigger>

			<Drawer.Content>
				<Drawer.Header>
					<Drawer.Title>
						<div class="flex flex-col gap-2">
							<h3 class="text-lg font-semibold">Jumlah</h3>

							<div class="flex items-center justify-center rounded-lg w-fit mx-auto overflow-hidden text-xl">
								<Button onclick={() => qty > 1 ? qty-- : qty} class="px-4 py-2">-</Button>
								<span class="px-6 py-2">{qty}</span>
								<Button onclick={() => qty++} class="px-4 py-2">+</Button>
							</div>
						</div>
					</Drawer.Title>

					<Drawer.Description class="w-full">
						<div>
							<h4 class="font-medium">Rincian pesanan</h4>

							<div class="p-4 border rounded-lg space-y-1 text-sm">
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
					<div class="flex gap-2 w-full">
						<Button
							class="flex-1 py-2 rounded-lg font-semibold"
							variant="outline"
							onclick={() => {
							addItem ({
								service_id: data.service.id,
								service_name: data.service.name,
								price: data.service.price,
								qty: qty, // dari state lokal OrderPanel
								estimated_days: data.service.estimated_days
							});
							
							qty = 1;
							goto('/checkout');
							}}>
							Beli Sekarang
						</Button>

						<Button
							class="flex-1 py-2 rounded-lg font-semibold"
							onclick={() => {
							addItem ({
								service_id: data.service.id,
								service_name: data.service.name,
								price: data.service.price,
								qty: qty, // dari state lokal OrderPanel
								estimated_days: data.service.estimated_days
							});
							
							toast.success("Berhasil ditambahkan ke keranjang!");
							qty = 1;
							}}>
							Masukkan keranjang
						</Button>
					</div>
				</Drawer.Footer>
			</Drawer.Content>
		</Drawer.Root>
	</div>



{:else}
	<div class="p-4 rounded-xl border-2 w-full max-w-md space-y-4 shadow-sm">
		<h3 class="text-lg font-semibold">Jumlah</h3>

		<div class="flex items-center justify-center w-full rounded-lg w-fit mx-auto overflow-hidden text-xl">
			<Button onclick={() => qty > 1? qty--:qty} class="px-4 py-2">-</Button>
			<span class="px-6 py-2">{qty}</span>
			<Button onclick={() => qty++} class="px-4 py-2">+</Button>
		</div>	

		<h4 class="font-medium">Rincian pesanan</h4>

		<div class="p-4 border rounded-lg space-y-1 text-sm">
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
			class="w-full py-2 rounded-lg font-semibold"
			onclick={() => {
			addItem ({
				service_id: data.service.id,
				service_name: data.service.name,
				price: data.service.price,
				qty: qty, // dari state lokal OrderPanel
				estimated_days: data.service.estimated_days
			});

			toast.success("Berhasil ditambahkan ke keranjang!");
			qty = 1;
			}}>
			Masukkan keranjang
		</Button>

		<Button
			class="w-full py-2 rounded-lg font-semibold"
			variant="outline"
			onclick={() => {
				addItem ({
				service_id: data.service.id,
				service_name: data.service.name,
				price: data.service.price,
				qty: qty, // dari state lokal OrderPanel
				estimated_days: data.service.estimated_days
			});
			
			qty = 1;

			goto('/checkout');
			}}>
			Beli Sekarang
		</Button>
	</div>
{/if}
