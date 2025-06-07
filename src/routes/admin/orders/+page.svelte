<script lang="ts">
	import DataTable from '@/components/order-management/data-table.svelte';
</script>

<svelte:head>
	<title>Order Management</title>
</svelte:head>

<div class="flex flex-1 flex-col">
	<div class="@container/main flex flex-1 flex-col gap-2">
		<div class="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
			<DataTable />
		</div>
	</div>
</div>
