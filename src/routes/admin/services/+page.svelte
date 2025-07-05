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
			<div class="flex w-full flex-col justify-start gap-6">
				<div class="flex flex-col gap-2 px-4 pb-2 lg:px-6 lg:pb-4">
					<h1 class="text-3xl font-semibold tracking-tight transition-colors">Kelola Layanan</h1>
					<p class="text-muted-foreground text-sm">
						Lihat & atur daftar layanan. Kamu bisa edit daftar layanan.
					</p>
				</div>
			</div>
			<SectionCardsAdminServices {data} />
		</div>
	</div>
</div>
