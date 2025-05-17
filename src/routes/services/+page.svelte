<script lang="ts">
	import { onMount } from 'svelte';
	import Navbar from "$lib/component/Navbar.svelte";
	import Cardcus from '$lib/component/Cardcustom.svelte';
	import type { IService } from '$lib/types/interface/service.interface';
	import { supabase } from '$lib/supabase/client';

	let services: IService[] = [];
	let loading = true;
	let error: string | null = null;

	async function fetchServices() {
		try {
			const { data, error: supabaseError } = await supabase
				.schema('public')
				.from('NAMA TABEL')
				.select('*');

			if (supabaseError) {
				console.error('SUPABASE ERROR:', supabaseError);
				error = supabaseError.message;
				return;
			}

			if (!data || data.length === 0) {
				console.log('No data found in services table');
				error = 'No services found';
				return;
			}

			console.log('SUPABASE DATA:', data);
			services = data as IService[];
		} catch (e) {
			console.error('Unexpected error:', e);
			error = 'An unexpected error occurred';
		} finally {
			loading = false;
		}
	}

	onMount(() => {
		fetchServices();
	});

	$: cards = services.map((service) => ({
		title: service.name,
		description: service.description,
		price: service.price,
		estimationday: service.estimated_days,
	}));
</script>

<Navbar />

<div class="flex justify-center p-6">
	<p class="text-5xl">CLEANING SERVICE SHOE</p>
</div>

<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6 justify-items-center max-w-7xl mx-auto p-6">
	{#if loading}
		<p>Loading services...</p>
	{:else if error}
		<p class="text-red-500">{error}</p>
	{:else if services.length === 0}
		<p>No services available</p>
	{:else}
		{#each cards as card (card.title)}
			<Cardcus {...card} />
		{/each}
	{/if}
</div>