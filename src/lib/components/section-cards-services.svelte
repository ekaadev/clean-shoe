<script lang="ts">
	import { intersect } from '$lib/components/intersect';
	import * as Card from '@/components/ui/card/index';
	import { AspectRatio } from '@/components/ui/aspect-ratio/index';
	import { toIndonesianCurrency } from '@/helper/currency';

	const { data } = $props();
</script>

<div class="grid grid-cols-1 gap-4 *:data-[slot=card]:shadow-xs md:grid-cols-2">
	{#each data.services as service, index}
		<div class="opacity-0" use:intersect={{ delay: index * 200, className: 'fade-step' }}>
			<a href="/services/{service.id}" class="no-underline">
				<Card.Root class="@container/card cursor-pointer">
					<Card.Content>
						<AspectRatio ratio={16 / 9} class="bg-muted">
							<img
								src={service.image_url ||
									'https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80'}
								alt="Gray by Drew Beamer"
								class="h-full w-full rounded-md object-cover"
							/>
						</AspectRatio>
					</Card.Content>
					<Card.Footer class="flex-col items-start gap-1.5 text-sm">
						<Card.Title class="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
							{service.name}
						</Card.Title>
						<Card.Description
							class="text-muted-foreground line-clamp-1 flex gap-2 text-sm tabular-nums md:text-base"
						>
							{service.description}
						</Card.Description>
						<div class="mt-2 flex w-full flex-row items-center justify-between md:mt-4">
							<p class="text-muted-foreground text-sm font-semibold md:text-base">
								Estimasi Pengerjaan
							</p>
							<p class=" text-sm font-semibold md:text-base">
								{service.estimated_days} Hari
							</p>
						</div>
						<div class="flex w-full flex-row items-center justify-between">
							<p class="text-muted-foreground text-sm font-semibold md:text-base">Harga</p>
							<p class="text-sm font-semibold md:text-base">
								{toIndonesianCurrency(service.price)}
							</p>
						</div>
					</Card.Footer>
				</Card.Root>
			</a>
		</div>
	{/each}
</div>

<style>
	@keyframes fadeUp {
		from {
			opacity: 0;
			transform: translateY(20px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	:global(.fade-step) {
		animation: fadeUp 0.4s ease-out forwards;
	}
</style>
