<script lang="ts">
	import { page } from '$app/state';
	import * as Chart from '@/components/ui/chart/index';
	import * as Card from '@/components/ui/card/index';
	import * as Select from '@/components/ui/select/index';
	import * as ToggleGroup from '@/components/ui/toggle-group/index';
	import { scaleUtc } from 'd3-scale';
	import { AreaChart } from 'layerchart';
	import { curveNatural } from 'd3-shape';

	type OrderEachDay = {
		date: string;
		total_order: number;
	};

	const last30Days = () => {
		const days = [];
		const today = new Date();
		for (let i = 0; i < 30; i++) {
			const d = new Date(today);
			d.setDate(today.getDate() - i);
			days.push(d.toISOString().slice(0, 10));
		}
		return days;
	};

	const orderMap = new Map(
		page.data.orderEachDay.map((item: OrderEachDay) => [item.date, item.total_order])
	);

	const chartData = last30Days()
		.map((date) => ({
			date: new Date(date),
			total: orderMap.get(date) || 0
		}))
		.reverse();

	let timeRange = $state('7d');

	const selectedLabel = $derived.by(() => {
		switch (timeRange) {
			case '30d':
				return '30 days';
			case '7d':
				return '7 days';
			default:
				return '7 days';
		}
	});

	const filteredData = $derived(
		chartData.filter((item) => {
			const referenceDate = new Date();
			referenceDate.setDate(referenceDate.getDate() - (timeRange === '7d' ? 7 : 30));
			return item.date >= referenceDate;
		})
	);

	const chartConfig = {
		orders: {
			label: 'Orders',
			color: '#2563eb'
		}
	} satisfies Chart.ChartConfig;
</script>

<Card.Root class="@container/card">
	<Card.Header>
		<Card.Title>Grafik Total Pesanan</Card.Title>
		<Card.Description>
			<span class="hidden @[540px]/card:block"> Selama 1 Bulan Terakhir </span>
			<span class="@[540px]/card:hidden">1 Bulan Terakhir</span>
		</Card.Description>
		<Card.Action>
			<ToggleGroup.Root
				type="single"
				bind:value={timeRange}
				variant="outline"
				class="hidden *:data-[slot=toggle-group-item]:!px-4 @[767px]/card:flex"
			>
				<ToggleGroup.Item value="30d">Last 30 days</ToggleGroup.Item>
				<ToggleGroup.Item value="7d">Last 7 days</ToggleGroup.Item>
			</ToggleGroup.Root>
			<Select.Root type="single" bind:value={timeRange}>
				<Select.Trigger
					size="sm"
					class="flex w-40 **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate @[767px]/card:hidden"
					aria-label="Select a value"
				>
					<span data-slot="select-value">
						{selectedLabel}
					</span>
				</Select.Trigger>
				<Select.Content class="rounded-xl">
					<Select.Item value="30d" class="rounded-lg">Last 30 days</Select.Item>
					<Select.Item value="7d" class="rounded-lg">Last 7 days</Select.Item>
				</Select.Content>
			</Select.Root>
		</Card.Action>
	</Card.Header>
	<Card.Content class="px-2 pt-4 sm:px-6 sm:pt-6">
		<Chart.Container config={chartConfig} class="aspect-auto h-[250px] w-full">
			<AreaChart
				data={filteredData}
				x="date"
				xScale={scaleUtc()}
				series={[
					{
						key: 'total',
						label: 'Orders',
						color: chartConfig.orders.color
					}
				]}
				axis="x"
				props={{
					area: {
						curve: curveNatural,
						'fill-opacity': 0.4,
						line: { class: 'stroke-1' },
						motion: 'tween'
					},
					xAxis: {
						ticks: timeRange === '7d' ? 7 : undefined,
						format: (v) => {
							return v.toLocaleDateString('en-US', {
								month: 'short',
								day: 'numeric'
							});
						}
					},

					yAxis: { format: () => '' }
				}}
			>
				{#snippet tooltip()}
					<Chart.Tooltip
						labelFormatter={(v: Date) => {
							return v.toLocaleDateString('en-US', {
								month: 'short',
								day: 'numeric'
							});
						}}
						indicator="line"
					/>
				{/snippet}
			</AreaChart>
		</Chart.Container>
	</Card.Content>
</Card.Root>
