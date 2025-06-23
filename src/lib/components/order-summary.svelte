<script lang="ts">
	import * as Card from '@/components/ui/card/index.js';
	import * as Form from '@/components/ui/form/index.js';
	import { cart, cartTotal } from '@/helper/cart-handler';
	import { toIndonesianCurrency } from '$lib/helper/currency';
</script>

<Card.Root>
	<Card.Header>
		<Card.Title class="text-2xl">Rincian Pesanan</Card.Title>
	</Card.Header>

	{#if $cart.length > 0}
		<Card.Content class="flex flex-col gap-y-5">
			{#each $cart as item (item.service_id)}
				<div class="flex items-center justify-between">
					<div class="flex flex-col">
						<span class="font-medium">{item.service_name}</span>
						<span class="text-muted-foreground text-sm">
							{toIndonesianCurrency(item.price)}
						</span>
					</div>

					<div class="flex min-w-0 flex-shrink-1 items-center rounded-md border p-1 md:gap-2">
						<button
							onclick={() => cart.decreaseQuantity(item.service_id)}
							class="hover:text-destructive md:text-md px-2 text-lg md:px-1 lg:px-2"
						>
							-
						</button>
						<span class="w-4 text-center font-medium">{item.qty}</span>
						<button
							onclick={() => cart.increaseQuantity(item.service_id)}
							class="hover:text-primary md:text-md px-2 text-lg md:px-1 lg:px-2"
						>
							+
						</button>
					</div>
				</div>
			{/each}
		</Card.Content>

		<Card.Footer class="flex flex-col gap-y-2 border-t pt-4">
			<div class="flex w-full justify-between">
				<div class="text-md font-bold">Total</div>
				<div class="flex">{toIndonesianCurrency($cartTotal)}</div>
			</div>

			<div class="hidden w-full flex-col gap-y-2 md:mt-4 md:flex">
				<Form.Button form="form-checkout" type="submit" class="w-full">Bayar Sekarang</Form.Button>
			</div>
		</Card.Footer>
	{:else}
		<Card.Content>
			<p class="text-muted-foreground text-center">Keranjang Anda kosong.</p>
		</Card.Content>
	{/if}
</Card.Root>
