<script lang="ts">
	import type { PageProps } from './$types';
	import Table from '$lib/components/Table.svelte'; // Komponen Table Anda yang *tidak reusable*
	import PaginationControls from '$lib/components/PaginationControls.svelte';
	import type { Order } from '$lib/types/order';
	// import { onMount } from 'svelte'; // Tidak lagi dibutuhkan jika hanya untuk log

	let { data: pageData }: PageProps = $props();
	// Pastikan allOrders adalah array baru jika pageData.orders mungkin undefined
	const allOrders: Order[] = Array.isArray(pageData.orders) ? [...pageData.orders] : [];

	// --- State untuk Pagination ---
	let currentPage = $state(1);
	let itemsPerPage = $state(5);

	// --- Derived State ---
	const totalItems = $derived(allOrders.length);
	const totalPages = $derived(Math.ceil(totalItems / itemsPerPage));

	const paginatedOrders = $derived(() => {
		const startIndex = (currentPage - 1) * itemsPerPage;
		const endIndex = startIndex + itemsPerPage;
		// Pastikan allOrders adalah array sebelum slice
		return Array.isArray(allOrders) ? allOrders.slice(startIndex, endIndex) : [];
	});

	// --- Handler untuk callback dari PaginationControls ---
	function handlePageChange(newPage: number) {
		currentPage = newPage;
	}

	// Handler untuk mengubah jumlah item per halaman
	function handleItemsPerPageChange(event: Event) {
		const selectElement = event.target as HTMLSelectElement;
		itemsPerPage = parseInt(selectElement.value, 10);
		currentPage = 1; // Reset ke halaman pertama
	}
</script>

<div class="mt-5 p-6">
	<h1 class="mb-6 text-3xl font-bold text-gray-800">Histori Pesanan</h1>
	<div class="mb-4 flex justify-end">
		<label for="itemsPerPageSelect" class="mr-2 self-center text-sm text-gray-600"
			>Item per Halaman:</label
		>
		<select
			id="itemsPerPageSelect"
			value={itemsPerPage}
			onchange={handleItemsPerPageChange}
			class="rounded border border-gray-300 p-2 text-sm shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
		>
			<option value={5}>5</option>
			<option value={10}>10</option>
			<option value={15}>15</option>
			<option value={20}>20</option>
		</select>
	</div>

	{#if allOrders && allOrders.length > 0}
		<Table data={paginatedOrders()} />

		<PaginationControls
			{currentPage}
			{totalPages}
			{totalItems}
			siblings={1}
			onPageChange={handlePageChange}
		/>
	{:else}
		<p class="py-10 text-center text-gray-600">
			{#if Array.isArray(allOrders) && allOrders.length === 0 && pageData.orders !== undefined}
				Tidak ada pesanan untuk ditampilkan.
			{:else if !pageData.orders}
				Data pesanan tidak tersedia atau sedang dimuat.
			{:else}
				Memproses data...
			{/if}
		</p>
	{/if}
</div>
