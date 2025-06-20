<script lang="ts">
	import SectionSearch from '@/components/orders/section-search.svelte';

	const { data } = $props();
</script>

<svelte:head>
	<title>Orders</title>
</svelte:head>

<div class="flex flex-1 flex-col">
	<div class="container mx-auto flex flex-1 flex-col">
		<!-- todo: add padding y (vertical) -->
		<div class="flex flex-1 flex-col">
			<div class="flex flex-1 flex-col px-4 pt-16 pb-10 md:px-8 lg:pt-[10rem] lg:pb-20">
				<SectionSearch {data} />
			</div>
		</div>
	</div>
</div>
