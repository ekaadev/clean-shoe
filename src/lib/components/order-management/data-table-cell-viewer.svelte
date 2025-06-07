<script lang="ts">
	import { page } from '$app/state';
	import * as Drawer from '@/components/ui/drawer/index';
	import * as Table from '@/components/ui/table/index';
	import { Button } from '@/components/ui/button/index';
	import { IsMobile } from '@/hooks/is-mobile.svelte';
	import { Label } from '@/components/ui/label/index';
	import { Input } from '@/components/ui/input/index';
	import * as Select from '@/components/ui/select/index';
	import { Separator } from '@/components/ui/separator/index';
	import { toUppercaseFirstWord } from '@/helper/format';
	import { toIndonesianCurrency } from '@/helper/currency';

	let { item } = $props();

	const isMobile = new IsMobile();

	let status = $state(page.data?.orderDetails?.status || 'pending');
</script>

<Drawer.Root direction={isMobile.current ? 'bottom' : 'right'}>
	<Drawer.Trigger>
		{#snippet child({ props })}
			<Button
				variant="link"
				class="text-foreground w-fit px-0 text-left hover:underline"
				{...props}
			>
				See Details
			</Button>
		{/snippet}
	</Drawer.Trigger>
	<Drawer.Content
		class="data-[vaul-drawer-direction=right]:w-[85vw] data-[vaul-drawer-direction=right]:sm:max-w-2xl"
	>
		<Drawer.Header class="border-b pb-4">
			<Drawer.Title>Order Details</Drawer.Title>
			<Drawer.Description>View and manage order information</Drawer.Description>
		</Drawer.Header>

		<div class="flex flex-col gap-4 overflow-y-auto p-4 text-sm">
			<div class="grid grid-cols-12 items-center">
				<div class="col-span-4 flex flex-col">
					<Label>Order ID</Label>
				</div>
				<div class="col-span-8 flex flex-col">
					<Input value={item.id} disabled class="w-full" />
				</div>
			</div>
			<div class="grid grid-cols-12 items-center">
				<div class="col-span-4 flex flex-col">
					<Label>User ID</Label>
				</div>
				<div class="col-span-8 flex flex-col">
					<Input value={item.user_id ? item.user_id : 'Guest'} disabled class="w-full" />
				</div>
			</div>
			<div class="grid grid-cols-12 items-center">
				<div class="col-span-4 flex flex-col">
					<Label>Status</Label>
				</div>
				<div class="col-span-8 flex flex-col">
					<Input value={toUppercaseFirstWord(item.status)} disabled class="w-full" />
				</div>
			</div>
			<div class="grid grid-cols-12 items-center">
				<div class="col-span-4 flex flex-col">
					<Label>Payment Status</Label>
				</div>
				<div class="col-span-8 flex flex-col">
					<Input value={toUppercaseFirstWord(item.payment_status)} disabled class="w-full" />
				</div>
			</div>
			<div class="grid grid-cols-12 items-center">
				<div class="col-span-4 flex flex-col">
					<Label>Pickup Address</Label>
				</div>
				<div class="col-span-8 flex flex-col">
					<Input value={item.pickup_address} disabled class="w-full" />
				</div>
			</div>
			<div class="grid grid-cols-12 items-center">
				<div class="col-span-4 flex flex-col">
					<Label>Delivery Address</Label>
				</div>
				<div class="col-span-8 flex flex-col">
					<Input value={item.delivery_address} disabled class="w-full" />
				</div>
			</div>
			<div class="grid grid-cols-12 items-center">
				<div class="col-span-4 flex flex-col">
					<Label>Pickup Date</Label>
				</div>
				<div class="col-span-8 flex flex-col">
					<Input value={new Date(item.pickup_date).toLocaleString()} disabled class="w-full" />
				</div>
			</div>
			<div class="grid grid-cols-12 items-center">
				<div class="col-span-4 flex flex-col">
					<Label>Delivery Date</Label>
				</div>
				<div class="col-span-8 flex flex-col">
					<Input value={new Date(item.delivery_date).toLocaleString()} disabled class="w-full" />
				</div>
			</div>
			<div class="grid grid-cols-12 items-center">
				<div class="col-span-4 flex flex-col">
					<Label>Total Amount</Label>
				</div>
				<div class="col-span-8 flex flex-col">
					<Input value={toIndonesianCurrency(item.total_amount)} disabled class="w-full" />
				</div>
			</div>

			<Separator class="my-2" />

			<div class="rounded-lg border">
				<Table.Root>
					<Table.Header class="bg-muted text-muted-foreground sticky top-0 z-10">
						<Table.Head>Name</Table.Head>
						<Table.Head>Quantity</Table.Head>
						<Table.Head>Price</Table.Head>
					</Table.Header>
					<Table.Body>
						{#each item.order_items as value}
							<Table.Row>
								<Table.Cell>{value.services.name}</Table.Cell>
								<Table.Cell>{value.quantity}</Table.Cell>
								<Table.Cell>{toIndonesianCurrency(value.price)}</Table.Cell>
							</Table.Row>
						{/each}
					</Table.Body>
				</Table.Root>
			</div>
		</div>

		<Drawer.Footer class="flex flex-row items-center justify-end border-t pt-4">
			<Drawer.Close>
				{#snippet child({ props })}
					<Button variant="outline" {...props}>Cancel</Button>
				{/snippet}
			</Drawer.Close>
			<Button>Save Changes</Button>
		</Drawer.Footer>
	</Drawer.Content>
</Drawer.Root>
