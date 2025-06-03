<script lang="ts">
	import SectionCards from '@/components/section-cards.svelte';
	import DataTable from '@/components/data-table.svelte';
	import CharTAreaInteractiveOrder from '@/components/chart-area-interactive-order.svelte';
</script>

<svelte:head>
	<title>Dashboard Admin</title>
</svelte:head>

<div class="flex flex-1 flex-col">
	<div class="@container/main flex flex-1 flex-col gap-2">
		<div class="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
			<SectionCards />
			<div class="px-4 lg:px-6">
				<CharTAreaInteractiveOrder />
			</div>
			<DataTable />
		</div>
	</div>
</div>
