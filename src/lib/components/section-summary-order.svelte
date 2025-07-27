<script lang="ts">
	import * as Card from '@/components/ui/card/index';
	import Papa from 'papaparse';
	import { Button } from '@/components/ui/button';
	import { enhance } from '$app/forms';

	let loading = false;
	let startDate = '';
	let endDate = '';

	// Set default tanggal (bulan ini)
	const today = new Date();
	const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
	startDate = firstDayOfMonth.toISOString().split('T')[0];
	endDate = today.toISOString().split('T')[0];

	function downloadCSV(data: any[]) {
		const csv = Papa.unparse(data);
		const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
		const url = URL.createObjectURL(blob);
		const link = document.createElement('a');
		link.href = url;
		link.setAttribute('download', `rekap-order-${startDate}-${endDate}.csv`);
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
		URL.revokeObjectURL(url);
	}
</script>

<div
	class="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2"
>
	<form
		action="?/downloadOrderCSV"
		method="POST"
		class="w-full"
		use:enhance={() => {
			loading = true;
			return async ({ result }) => {
				loading = false;
				if (result.type === 'success' && result.data?.success && Array.isArray(result.data?.data)) {
					downloadCSV(result.data.data);
				} else if (result.type === 'success' && result.data?.error) {
					alert(result.data.error);
				} else {
					alert('Gagal mengunduh data');
				}
			};
		}}
	>
		<Card.Root class="@container/card">
			<Card.Header>
				<Card.Title class="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
					Rekap Data Order
				</Card.Title>
				<p class="text-muted-foreground text-sm">
					Pilih rentang tanggal untuk mengunduh data order dalam format CSV
				</p>
			</Card.Header>
			<Card.Footer class="flex-col items-start gap-3 text-sm">
				<div class="flex w-full flex-col gap-2">
					<span class="text-sm font-medium">Rentang Tanggal</span>
					<div class="flex items-center gap-2">
						<div class="flex flex-col gap-1">
							<label for="start-date" class="text-muted-foreground text-xs">Dari tanggal</label>
							<input
								id="start-date"
								name="start_date"
								type="date"
								bind:value={startDate}
								class="border-input bg-background rounded border px-3 py-2 text-sm"
								required
							/>
						</div>
						<span class="text-muted-foreground mt-5">—</span>
						<div class="flex flex-col gap-1">
							<label for="end-date" class="text-muted-foreground text-xs">Sampai tanggal</label>
							<input
								id="end-date"
								name="end_date"
								type="date"
								bind:value={endDate}
								class="border-input bg-background rounded border px-3 py-2 text-sm"
								required
							/>
						</div>
					</div>
					<p class="text-muted-foreground text-xs">
						Default: Data bulan ini ({new Date().toLocaleDateString('id-ID', {
							month: 'long',
							year: 'numeric'
						})})
					</p>
				</div>
				<Button type="submit" variant="default" disabled={loading} class="w-full sm:w-auto">
					{loading ? 'Mengunduh...' : 'Download CSV'}
				</Button>
			</Card.Footer>
		</Card.Root>
	</form>
</div>
