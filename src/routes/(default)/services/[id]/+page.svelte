<script lang="ts">
	import * as Card from '@/components/ui/card/index';
	import { Toaster } from 'svelte-sonner';
	import OrderPanel from '@/components/order-panel.svelte';
	import * as Accordion from '$lib/components/ui/accordion/index';
	import * as Carousel from '$lib/components/ui/carousel/index';
	import { IsMobile } from '@/hooks/is-mobile.svelte';
	import { AspectRatio } from '$lib/components/ui/aspect-ratio/index';
	import { toIndonesianCurrency } from '$lib/helper/currency';

	import { onMount } from 'svelte';
	import { invalidateAll } from '$app/navigation';

	const isMobile = new IsMobile();

	const { data } = $props();

	onMount(() => {
		invalidateAll();
	});

	// ini untuk mengambil layanan lain yang tidak sama dengan layanan saat ini
	const other_services = $derived(data.services.filter((s: any) => s.id !== data.service.id));

	// FAQ DUMMY
	const faqItems = [
		{
			value: 'item-1',
			title: 'Cleaning Part',
			content:
				'Bagian sepatu yang dibersihkan dalam layanan ini meliputi: <strong>Upper Sole</strong>, <strong>Middle Sole</strong>, <strong>Out Sole</strong>, <strong>In Sole</strong>, dan <strong>Laces</strong>.'
		},
		{
			value: 'item-2',
			title: 'Shoe Material',
			content:
				'Layanan cocok untuk berbagai jenis material sepatu seperti: <strong>Canvas, Suede, Leather, Nubuck</strong>, dan bahan lainnya.'
		},
		{
			value: 'item-3',
			title: 'On-site Availability',
			content:
				'Layanan <strong>tidak dapat ditunggu</strong>. Proses pembersihan dilakukan secara menyeluruh dan membutuhkan waktu pengerjaan tertentu.'
		},
		{
			value: 'item-4',
			title: 'Duration',
			content: 'Estimasi pengerjaan adalah <strong>2 - 3 hari</strong> (tidak termasuk hari libur).'
		},
		{
			value: 'item-5',
			title: 'Price',
			content:
				'Harga layanan Deep Clean adalah sebesar <strong>Rp 30.000</strong> per pasang sepatu.'
		},
		{
			value: 'item-6',
			title: 'Pick Up & Delivery',
			content:
				'Layanan ini mencakup <strong>pick up</strong> dan <strong>delivery</strong> di area Surabaya Timur dan sekitarnya. Biaya tambahan mungkin berlaku untuk area tertentu.'
		}
	];
</script>

<svelte:head>
	<title>Orders</title>
</svelte:head>

<Toaster position="top-right" expand={true} />

{#if isMobile.current}
	<div class="flex min-h-screen flex-1 flex-col justify-between">
		<main class="flex-grow">
			<div class="container mx-auto flex flex-1 flex-col gap-10 px-4 py-6">
				<!-- Title Service -->
				<div class="pt-5">
					<h1 class="text-4xl font-semibold">{data.service.name}</h1>
				</div>

				<!-- WRAPPER: Baris horizontal -->
				<div class="flex w-full flex-col gap-15 md:min-h-[400px] md:flex-row">
					<!-- LEFT: Carousel + Info -->
					<div class="flex w-full flex-col gap-4 md:w-2/3">
						<!-- Carousel Current Service -->
						<div>
							<div class="w-full">
								<AspectRatio ratio={16 / 9}>
									<img
										src={data.service.image_url ||
											'https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80'}
										alt={data.service.name}
										class="aspect-[16/9] w-full rounded-xl object-cover"
									/>
								</AspectRatio>
							</div>
						</div>
					</div>
				</div>

				<!-- Deskripsi -->
				<div class="justify-text flex max-w-5xl flex-col gap-4">
					<div>
						<h2 class="text-2xl font-semibold">Deskripsi</h2>
					</div>
					<div>
						<p class="justify-text text-sm">
							{data.service.description}
						</p>
					</div>
				</div>

				<!-- Accordion pertanyaan -->
				<div class="flex max-w-full flex-col gap-4">
					<div>
						<h2 class="text-2xl font-semibold">FAQ</h2>
					</div>
					<Accordion.Root type="single" class="w-full">
						{#each faqItems as item}
							<Accordion.Item value={item.value}>
								<Accordion.Trigger class="text-md sm:text-md">{item.title}</Accordion.Trigger>
								<Accordion.Content class="text-md flex flex-col gap-4">
									{@html `<p class="text-sm">${item.content}</p>`}
								</Accordion.Content>
							</Accordion.Item>
						{/each}
					</Accordion.Root>
				</div>

				<!-- Other Services -->
				<div class="flex flex-col gap-4">
					<div>
						<h2 class="text-2xl font-semibold">Other Services</h2>
					</div>
					<div class="w-full overflow-x-auto">
						<div class="flex w-max gap-3 pt-4 pb-6">
							{#each other_services as service}
								<a href={`/services/${service.id}`}>
									<Card.Root
										class="@container/card flex h-full w-[200px] flex-shrink-0 cursor-pointer flex-col"
									>
										<!-- Gambar -->
										<Card.Content class="p-3">
											<AspectRatio ratio={16 / 9}>
												<img
													src={service.image_url ||
														'https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80'}
													alt={service.name}
													class="h-full w-full rounded-md object-cover"
												/>
											</AspectRatio>
										</Card.Content>

										<Card.Footer class="flex flex-grow flex-col justify-end gap-2 p-3 text-sm">
											<div class="flex flex-grow flex-col gap-1">
												<Card.Title class="line-clamp-2 text-sm font-semibold">
													{service.name}
												</Card.Title>

												<Card.Description
													class="text-muted-foreground line-clamp-2 flex-grow text-xs"
												>
													{service.description}
												</Card.Description>
											</div>

											<!-- Footer info tetap di bawah -->
											<div class="mt-2 flex w-full flex-col gap-1">
												<div class="flex flex-row items-center justify-between">
													<p class="text-muted-foreground text-xs">Estimated Days</p>
													<p class="text-xs font-semibold">
														{service.estimated_days} Days
													</p>
												</div>
												<div class="flex flex-row items-center justify-between">
													<p class="text-muted-foreground text-xs">Price</p>
													<p class="text-xs font-semibold">
														{toIndonesianCurrency(service.price)}
													</p>
												</div>
											</div>
										</Card.Footer>
									</Card.Root>
								</a>
							{/each}
						</div>
					</div>
				</div>
			</div>
		</main>

		<!-- RIGHT: Order Panel -->
		<div class="max-h-xl sticky bottom-0 flex w-full max-w-xl items-center justify-end md:w-1/3">
			<OrderPanel {data} />
		</div>
	</div>

	<!-- WEB -->
{:else}
	<div class="flex flex-1 flex-col">
		<div class="container mx-auto flex flex-1 flex-col gap-10 px-4 py-5 md:px-8">
			<!-- Title Service -->
			<div class="pt-5">
				<h1 class="text-5xl font-semibold">{data.service.name}</h1>
			</div>

			<!-- WRAPPER: Baris horizontal -->
			<div class="flex w-full flex-col gap-15 md:min-h-[400px] md:flex-row">
				<!-- LEFT: Carousel + Info -->
				<div class="flex w-full flex-col gap-4 md:w-2/3">
					<!-- Carousel Current Service -->
					<div>
						<Carousel.Root class="w-full max-w-400">
							<Carousel.Content>
								<Carousel.Item class="basis-full">
									<div class="max-w-[100%]">
										<AspectRatio ratio={16 / 9}>
											<img
												src={data.service.image_url ||
													'https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80'}
												alt={data.service.name}
												class="aspect-[16/9] w-full rounded-xl object-cover"
											/>
										</AspectRatio>
									</div>
								</Carousel.Item>
							</Carousel.Content>
						</Carousel.Root>
					</div>
				</div>

				<!-- RIGHT: Order Panel -->
				<div class="flex h-fit w-full max-w-xl justify-end md:w-1/3">
					<OrderPanel {data} />
				</div>
			</div>

			<!-- Deskripsi -->
			<div class="justify-text flex max-w-5xl flex-col gap-4">
				<div>
					<h2 class="text-3xl font-semibold">Deskripsi</h2>
				</div>
				<div>
					<p class="max-w-4xl pr-4 text-lg">
						{data.service.description}
					</p>
				</div>
			</div>

			<!-- Accordion pertanyaan -->
			<div class="flex max-w-[1000px] flex-col gap-4">
				<div>
					<h2 class="text-3xl font-semibold">FAQ</h2>
				</div>
				<Accordion.Root type="single" class="w-full max-w-4xl">
					{#each faqItems as item}
						<Accordion.Item value={item.value}>
							<Accordion.Trigger class="text-lg sm:text-xl">{item.title}</Accordion.Trigger>
							<Accordion.Content class="flex flex-col gap-4 text-balance">
								{@html `<p class="text-lg">${item.content}</p>`}
							</Accordion.Content>
						</Accordion.Item>
					{/each}
				</Accordion.Root>
			</div>

			<!-- Other Services -->
			<div class="flex flex-col gap-4">
				<div>
					<h2 class="text-3xl font-semibold">Other Services</h2>
				</div>
				<div class="w-full overflow-x-auto">
					<div class="flex w-max gap-4 pt-4 pb-6">
						{#each other_services as service}
							<a href={`/services/${service.id}`}>
								<Card.Root
									class="@container/card flex h-full w-[280px] flex-shrink-0 cursor-pointer flex-col"
								>
									<!-- Gambar -->
									<Card.Content class="p-4">
										<AspectRatio ratio={16 / 9}>
											<img
												src={service.image_url ||
													'https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80'}
												alt={service.name}
												class="h-full w-full rounded-md object-cover"
											/>
										</AspectRatio>
									</Card.Content>

									<Card.Footer class="flex flex-grow flex-col justify-end gap-2 p-4 text-sm">
										<div class="flex flex-grow flex-col gap-1">
											<Card.Title class="line-clamp-2 text-lg font-semibold">
												{service.name}
											</Card.Title>

											<Card.Description class="text-muted-foreground line-clamp-3 flex-grow">
												{service.description}
											</Card.Description>
										</div>

										<!-- Footer info tetap di bawah -->
										<div class="mt-2 flex w-full flex-col gap-2">
											<div class="flex flex-row items-center justify-between">
												<p class="text-muted-foreground text-sm font-semibold">Estimated Days</p>
												<p class="text-sm font-semibold">
													{service.estimated_days} Days
												</p>
											</div>
											<div class="flex flex-row items-center justify-between">
												<p class="text-muted-foreground text-sm font-semibold">Price</p>
												<p class="text-sm font-semibold">
													{toIndonesianCurrency(service.price)}
												</p>
											</div>
										</div>
									</Card.Footer>
								</Card.Root>
							</a>
						{/each}
					</div>
				</div>
			</div>
		</div>
	</div>
{/if}
