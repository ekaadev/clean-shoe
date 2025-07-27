<script lang="ts">
	import DataTable from '@/components/histories/data-table.svelte';

	const { data } = $props();
</script>

<svelte:head>
	<title>History Order</title>
</svelte:head>

<div class="flex flex-1 flex-col">
	<div class="container mx-auto flex flex-1 flex-col gap-2 px-4 md:px-8">
		<div class="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
			<DataTable {data} />
		</div>
	</div>
</div>
