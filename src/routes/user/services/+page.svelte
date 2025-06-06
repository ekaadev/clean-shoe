<script lang="ts">
	import * as Card from '$lib/components/ui/card/index';
	import SiteHeader from '$lib/components/site-header.svelte';
	import * as Carousel from '$lib/components/ui/carousel/index';

	import type { PageData } from './$types';
	import type { Service } from '$lib/types';

	import { Button, buttonVariants } from '$lib/components/ui/button';
	import { fade } from 'svelte/transition';

	export let data: PageData;

	let selectedService: Service | null = null;
	$: services = data.services;

	function selectService(service: Service) {
		selectedService = service;
	}

	function clearSelection() {
		console.log('Clearing selection... Button click should work now!');
		selectedService = null;
	}

	function handleCardKeyDown(event: KeyboardEvent, service: Service) {
		if (event.key === 'Enter' || event.key === ' ') {
			event.preventDefault();
			selectService(service);
		}
	}
</script>

<div class="min-h-screen bg-gray-50 text-gray-800 dark:bg-gray-900 dark:text-gray-200">
	<SiteHeader />

	<main class="container mx-auto p-4 md:p-8">
		<div class="grid grid-cols-1 gap-8 lg:grid-cols-5">
			<div class="flex min-h-[300px] flex-col justify-center lg:col-span-3">
				{#key selectedService}
					<div in:fade={{ duration: 300 }}>
						{#if selectedService}
							<h2 class="mb-4 text-4xl font-extrabold text-slate-800 md:text-5xl dark:text-white">
								{selectedService.name}
							</h2>
							<p class="mb-6 text-lg text-gray-600 dark:text-gray-300">
								{selectedService.description}
							</p>
						{:else}
							<h2 class="mb-4 text-4xl font-extrabold text-slate-800 md:text-5xl dark:text-white">
								{data.websiteInfo.name}
							</h2>
							<p class="mb-6 text-lg text-gray-600 dark:text-gray-300">
								{data.websiteInfo.description}
							</p>
						{/if}
					</div>
				{/key}

				<div class="mt-4 flex items-center space-x-4">
					<Button
						size="lg"
						class="bg-slate-800 hover:bg-slate-700 dark:bg-slate-200 dark:text-slate-900 dark:hover:bg-slate-300"
					>
						Order Sekarang
					</Button>
					{#if selectedService}
						<button
							on:click={clearSelection}
							class={buttonVariants({ variant: 'outline', size: 'lg' })}
						>
							Lihat Informasi Website
						</button>
					{/if}
				</div>
			</div>

			<div class="flex flex-col items-center justify-center lg:col-span-2">
				<h2 class="mb-4 text-2xl font-bold text-slate-700 dark:text-slate-300">Our Services</h2>
				<div class="relative w-full max-w-xs">
					<Carousel.Root
						class="w-full"
						opts={{
							align: 'start'
						}}
						orientation="vertical"
					>
						<Carousel.Content class="-mt-4 h-[450px]">
							{#each services as service (service.id)}
								<Carousel.Item class="basis-1/3 pt-4">
									<div
										class="h-full cursor-pointer rounded-lg focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 focus:outline-none dark:focus:ring-offset-gray-900"
										role="button"
										tabindex="0"
										on:click={() => selectService(service)}
										on:keydown={(e) => handleCardKeyDown(e, service)}
									>
										<Card.Root
											class="h-full transition-all duration-300 hover:border-slate-500 hover:shadow-lg {selectedService?.id ===
											service.id
												? 'border-2 border-slate-700 shadow-xl dark:border-slate-300'
												: 'border'}"
										>
											<Card.Content
												class="flex h-full flex-row items-center justify-center gap-4 p-3"
											>
												<div>
													<img
														src={service.imageUrl}
														alt={service.name}
														class="h-14 w-20 rounded-md bg-gray-200 object-cover"
													/>
												</div>
												<div class="flex flex-col gap-2">
													<h3 class="text-lg leading-tight font-semibold">{service.name}</h3>
													<p class="text-sm text-gray-500 dark:text-gray-400">
														Rp {service.price.toLocaleString('id-ID')}
													</p>
												</div>
											</Card.Content>
										</Card.Root>
									</div>
								</Carousel.Item>
							{/each}
						</Carousel.Content>
					</Carousel.Root>
					<div
						class="pointer-events-none absolute bottom-0 h-20 w-full bg-gradient-to-t from-gray-50 to-transparent dark:from-gray-900"
					></div>
				</div>
			</div>
		</div>
	</main>
</div>
