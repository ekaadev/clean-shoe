<script lang="ts">
	import * as Card from '@/components/ui/card/index';
	import { page } from '$app/state';
	import { toIndonesianCurrency } from '$lib/helper/currency';
	import { Badge } from '$lib/components/ui/badge/index';
	import Moneybag from '@tabler/icons-svelte/icons/moneybag';
	import Package from '@tabler/icons-svelte/icons/package';
	import User from '@tabler/icons-svelte/icons/user';
</script>

<div
	class="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @3xl/main:grid-cols-4"
>
	<Card.Root class="@container/card">
		<Card.Header>
			<Card.Description>Total Pendapatan</Card.Description>
			<Card.Title class="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
				{toIndonesianCurrency(page.data?.totalRevenue || 0)}
			</Card.Title>
			<Card.Action>
				<Badge variant="outline">
					<Moneybag />Rp
				</Badge>
			</Card.Action>
		</Card.Header>
		<Card.Footer class="flex-col items-start gap-1.5 text-sm">
			<div class="line-clamp-1 flex gap-2 font-medium">Lagi naik nih di bulan ini</div>
			<div class="text-muted-foreground">Tetap pertahanin ya</div>
		</Card.Footer>
	</Card.Root>
	<Card.Root class="@container/card">
		<Card.Header>
			<Card.Description>Total Order</Card.Description>
			<Card.Title class="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
				{page.data?.totalOrder || 0}
			</Card.Title>
			<Card.Action>
				<Badge variant="outline">
					<Package />
					Orders
				</Badge>
			</Card.Action>
		</Card.Header>
		<Card.Footer class="flex-col items-start gap-1.5 text-sm">
			<div class="line-clamp-1 flex gap-2 font-medium">Total order dalam 1 bulan terakhir</div>
			<div class="text-muted-foreground">Tetap semangat & terus berkembang!</div>
		</Card.Footer>
	</Card.Root>
	<Card.Root class="@container/card">
		<Card.Header>
			<Card.Description>Total Customer</Card.Description>
			<Card.Title class="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
				{page.data?.totalCustomer || 0}
			</Card.Title>
			<Card.Action>
				<Badge variant="outline">
					<User />
					Customers
				</Badge>
			</Card.Action>
		</Card.Header>
		<Card.Footer class="flex-col items-start gap-1.5 text-sm">
			<div class="line-clamp-1 flex gap-2 font-medium">Pengguna setia makin banyak</div>
			<div class="text-muted-foreground">Buat bisnismu menjadi semakin menarik</div>
		</Card.Footer>
	</Card.Root>
	<Card.Root class="@container/card">
		<Card.Header>
			<Card.Description>Order Pending</Card.Description>
			<Card.Title class="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
				{page.data?.totalPendingOrder || 0}
			</Card.Title>
		</Card.Header>
		<Card.Footer class="flex-col items-start gap-1.5 text-sm">
			<div class="line-clamp-1 flex gap-2 font-medium">Menunggu tindakan dari tim</div>
			<div class="text-muted-foreground">Yuk, proses pesanannya sekarang</div>
		</Card.Footer>
	</Card.Root>
</div>
