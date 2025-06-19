<script lang="ts">
	import * as Table from '@/components/ui/table/index';
	import { Badge } from '@/components/ui/badge/index';
	import { page } from '$app/state';
	import CircleCheckFilledIcon from '@tabler/icons-svelte/icons/circle-check-filled';
	import Circle from '@tabler/icons-svelte/icons/circle';
	import { toIndonesianCurrency } from '$lib/helper/currency';
	import { toUppercaseFirstWord } from '$lib/helper/format';
	import { getLastStringUUID } from '$lib/helper/format';
</script>

<div class="px-4 lg:px-6">
	<h1 class="mt-4 text-3xl font-semibold tracking-tight transition-colors">Incoming Order</h1>
	<p class="text-muted-foreground text-sm">Review and manage the latest orders from customers.</p>
	<a href="/admin/orders" class="text-sm hover:underline">See Detail </a>
	<div class="mt-4 overflow-hidden rounded-lg border">
		<Table.Root>
			<Table.Header class="bg-muted text-muted-foreground sticky top-0 z-10">
				<Table.Row>
					<Table.Head class="px-6 py-4 text-sm font-medium">Order ID</Table.Head>
					<Table.Head class="py-4 text-center text-sm font-medium">Order Status</Table.Head>
					<Table.Head class="py-4 text-center text-sm font-medium">Payment Status</Table.Head>
					<Table.Head class="py-4 text-center text-sm font-medium">Total Amount</Table.Head>
				</Table.Row>
			</Table.Header>
			<Table.Body>
				{#each page.data.tableOrder as value}
					<Table.Row>
						<Table.Cell class="px-6 py-4">{getLastStringUUID(value.id)}</Table.Cell>
						<Table.Cell class="py-4 text-center">
							<Badge variant="outline" class="text-muted-foreground px-1.5">
								<Circle class="fill-yellow-500 dark:fill-yellow-400" />
								{toUppercaseFirstWord(value.status)}
							</Badge>
						</Table.Cell>
						<Table.Cell class="py-4 text-center">
							<Badge variant="outline" class="text-muted-foreground px-1.5">
								<CircleCheckFilledIcon class="fill-green-500 dark:fill-green-400" />
								{toUppercaseFirstWord(value.payment_status)}
							</Badge>
						</Table.Cell>
						<Table.Cell class="py-4 text-center"
							>{toIndonesianCurrency(value.total_amount)}</Table.Cell
						>
					</Table.Row>
				{/each}
			</Table.Body>
		</Table.Root>
	</div>
</div>
