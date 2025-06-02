<script lang="ts">
	import type { Order } from '$lib/types/order';

	export let data: Order[];

	const columns = [
		{ key: 'id', header: 'ID Pesanan' },
		{
			key: 'customerName',
			header: 'Pelanggan'
		},
		{
			key: 'totalAmount',
			header: 'Jumlah Pembayaran'
		},
		{
			key: 'status',
			header: 'Status Pesanan'
		}
	];

	const formatCurrency = (amount: number) => {
		return new Intl.NumberFormat('id-ID', {
			style: 'currency',
			currency: 'IDR'
		}).format(amount);
	};
</script>

<div class="overflow-x-auto overflow-y-hidden rounded-md shadow-xl/20">
	<table class="min-w-full divide-y divide-gray-200">
		<thead class="bg-gray-50">
			<tr>
				{#each columns as column}
					<th class="font-semi-bold px-6 py-3 text-left text-xs text-gray-500 uppercase">
						{column.header}
					</th>
				{/each}
				<th class="relative px-6 py-3">
					<span class="sr-only">Aksi</span>
				</th>
			</tr>
		</thead>
		<tbody class="divide-y divide-gray-400 bg-white">
			{#each data as row (row.id)}
				<tr class="hover:bg-gray-200">
					<td class="px-6 py-4 text-sm font-medium whitespace-nowrap text-gray-900">
						{row.id}
					</td>
					<td class="px-6 py-4 text-sm whitespace-nowrap text-gray-500">
						{row.customerName}
					</td>
					<td class="px-6 py-4 text-sm whitespace-nowrap text-gray-500">
						{formatCurrency(row.totalAmount)}
					</td>
					<td class="px-6 py-4 text-sm whitespace-nowrap text-gray-500">
						{row.status}
					</td>
					<td class="space-x-2 px-6 py-4 text-right text-sm font-medium whitespace-nowrap">
						<button
							type="button"
							title="Setujui Pesanan"
							class="rounded-md p-1.5 text-green-600 transition-colors duration-150 hover:bg-green-100 hover:text-green-800 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:outline-none"
							on:click={() => console.log('Approve clicked for order:', row.id)}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="18"
								height="18"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
								class="lucide lucide-check-circle-2"
								><path
									d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"
								/><path d="m9 12 2 2 4-4" /></svg
							>
							<span class="sr-only">Setujui</span>
						</button>

						<button
							type="button"
							title="Tolak Pesanan"
							class="rounded-md p-1.5 text-red-600 transition-colors duration-150 hover:bg-red-100 hover:text-red-800 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:outline-none"
							on:click={() => console.log('Reject clicked for order:', row.id)}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="18"
								height="18"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
								class="lucide lucide-x-circle"
								><circle cx="12" cy="12" r="10" /><path d="m15 9-6 6" /><path d="m9 9 6 6" /></svg
							>
							<span class="sr-only">Tolak</span>
						</button>

						<button
							type="button"
							title="Lihat Detail Pesanan"
							class="rounded-md p-1.5 text-blue-600 transition-colors duration-150 hover:bg-blue-100 hover:text-blue-800 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
							on:click={() => console.log('Detail clicked for order:', row.id)}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="18"
								height="18"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
								class="lucide lucide-eye"
								><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" /><circle
									cx="12"
									cy="12"
									r="3"
								/></svg
							>
							<span class="sr-only">Lihat Detail</span>
						</button>
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
