<script lang="ts">
	import SectionCardsAdminServices from '@/components/service-management/section-cards-admin-services.svelte';

	const { data } = $props();
</script>

<svelte:head>
	<title>Service Management</title>
</svelte:head>

<div class="flex flex-1 flex-col">
	<div class="@container/main flex flex-1 flex-col gap-2">
		<div class="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
			<SectionCardsAdminServices {data} />
		</div>
	</div>
</div>
