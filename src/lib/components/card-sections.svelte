<script lang="ts">
	import * as Card from '@/components/ui/card/index';
	import { page } from '$app/state';

	const toIndonesianCurrency = (value: number): string => {
		return new Intl.NumberFormat('id-ID', {
			style: 'currency',
			currency: 'IDR',
			minimumFractionDigits: 0
		}).format(value);
	};
</script>

<div
	class="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-1 @3xl/main:grid-cols-3"
>
	<Card.Root class="@container/card">
		<Card.Header>
			<Card.Description>Total Revenue</Card.Description>
			<Card.Title class="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
				{toIndonesianCurrency(page.data?.totalRevenue || 0)}
			</Card.Title>
		</Card.Header>
		<Card.Footer class="flex-col items-start gap-1.5 text-sm">
			<div class="line-clamp-1 flex gap-2 font-medium">Trending up this month</div>
			<div class="text-muted-foreground">Visitors for the last 1 month</div>
		</Card.Footer>
	</Card.Root>
	<Card.Root class="@container/card">
		<Card.Header>
			<Card.Description>Total Order</Card.Description>
			<Card.Title class="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
				{page.data?.totalOrder || 0}
			</Card.Title>
		</Card.Header>
		<Card.Footer class="flex-col items-start gap-1.5 text-sm">
			<div class="line-clamp-1 flex gap-2 font-medium">Total order in this month</div>
			<div class="text-muted-foreground">Keep strong and grow up</div>
		</Card.Footer>
	</Card.Root>
	<Card.Root class="@container/card">
		<Card.Header>
			<Card.Description>Total Customer</Card.Description>
			<Card.Title class="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
				{page.data?.totalCustomer || 0}
			</Card.Title>
		</Card.Header>
		<Card.Footer class="flex-col items-start gap-1.5 text-sm">
			<div class="line-clamp-1 flex gap-2 font-medium">Strong user retention</div>
			<div class="text-muted-foreground">Engagement exceed targets</div>
		</Card.Footer>
	</Card.Root>
</div>
