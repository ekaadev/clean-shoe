<script lang="ts">
	import SectionCardsServices from '@/components/section-cards-services.svelte';

	const { data } = $props();
</script>

<svelte:head>
	<title>Services</title>
</svelte:head>

<div class="flex flex-1 flex-col">
	<div class="container mx-auto flex flex-1 flex-col px-4 md:px-8">
		<!-- title, description, and cta -->
		<div class="shrink-0 py-10 lg:py-20">
			<div class="max-w-2xl">
				<h1 class="text-4xl font-semibold tracking-tight text-balance">Services</h1>
				<p class="text-muted-foreground mt-2 text-sm leading-relaxed sm:mt-4 sm:text-lg/7">
          Kami menawarkan berbagai layanan cuci sepatu profesional untuk menjaga kebersihan, kenyamanan, dan tampilan sepatu kesayangan Anda. 
				</p>
			</div>
		</div>
		<!-- section card services -->
		<SectionCardsServices {data} />
	</div>
</div>
