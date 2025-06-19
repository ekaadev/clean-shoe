<script lang="ts">
	import * as Card from '@/components/ui/card/index';
	import { Toaster } from "svelte-sonner"; 
	import OrderPanel from '@/components/order-panel.svelte';
	import * as Accordion from "$lib/components/ui/accordion/index";
	import * as Carousel from "$lib/components/ui/carousel/index";
	import { IsMobile } from '@/hooks/is-mobile.svelte';
	import { AspectRatio } from "$lib/components/ui/aspect-ratio/index";
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
			value: "item-1",
			title: "Cleaning Part",
			content:
				'Bagian sepatu yang dibersihkan dalam layanan ini meliputi: <strong>Upper Sole</strong>, <strong>Middle Sole</strong>, <strong>Out Sole</strong>, <strong>In Sole</strong>, dan <strong>Laces</strong>.'
		},
		{
			value: "item-2",
			title: "Shoe Material",
			content:
				'Layanan cocok untuk berbagai jenis material sepatu seperti: <strong>Canvas, Suede, Leather, Nubuck</strong>, dan bahan lainnya.'
		},
		{
			value: "item-3",
			title: "On-site Availability",
			content:
				'Layanan <strong>tidak dapat ditunggu</strong>. Proses pembersihan dilakukan secara menyeluruh dan membutuhkan waktu pengerjaan tertentu.'
		},
		{
			value: "item-4",
			title: "Duration",
			content:
				'Estimasi pengerjaan adalah <strong>2 - 3 hari</strong> (tidak termasuk hari libur).'
		},
		{
			value: "item-5",
			title: "Price",
			content:
				'Harga layanan Deep Clean adalah sebesar <strong>Rp 30.000</strong> per pasang sepatu.'
		},
		{
			value: "item-6",
			title: "Pick Up & Delivery",
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
	<div class="flex flex-1 flex-col min-h-screen justify-between">
		<main class="flex-grow">
			<div class="py-6 container mx-auto flex px-4 flex-1 flex-col gap-10">

				<!-- Title Service -->
				<div class="pt-5">
					<h1 class="text-4xl font-semibold">{data.service.name}</h1>
				</div>

				<!-- WRAPPER: Baris horizontal -->
				<div class="flex flex-col md:flex-row md:min-h-[400px] gap-15 w-full">

					<!-- LEFT: Carousel + Info -->
					<div class="flex flex-col gap-4 w-full md:w-2/3">

						<!-- Carousel Current Service -->
						<div>
							<div class="w-full">
								<AspectRatio ratio={16 / 9}>
									<img
										src={data.service.image_url || "https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"}
										alt="{data.service.name}"
										class="w-full object-cover aspect-[16/9] rounded-xl"
									/>
								</AspectRatio>
							</div>
						</div>
					</div>
				</div>

				<!-- Deskripsi -->
				<div class="justify-text max-w-5xl flex flex-col gap-4">
					<div>
						<h2 class="text-2xl font-semibold">Deskripsi</h2>
					</div>
					<div>
						<p class="text-sm justify-text">
							{data.service.description}
						</p>
					</div>
				</div>

				<!-- Accordion pertanyaan -->
				<div class="max-w-full flex flex-col gap-4">
					<div>
						<h2 class="text-2xl font-semibold">FAQ</h2>
					</div>
					<Accordion.Root type="single" class="w-full w-full">
						{#each faqItems as item}
							<Accordion.Item value={item.value}>
								<Accordion.Trigger class="text-md sm:text-md">{item.title}</Accordion.Trigger>
								<Accordion.Content class="flex flex-col gap-4 text-md">
									{@html `<p class="text-sm">${item.content}</p>`}
								</Accordion.Content>
							</Accordion.Item>
						{/each}
					</Accordion.Root>
				</div>

				<!-- Carousel services -->
				<div class="flex flex-col">
					<div>
						<h2 class="text-2xl font-semibold">Other Services</h2>
					</div>
					<div class="w-full overflow-x-auto">
						<div class="flex gap-2 w-max pb-6 pt-4">
							{#each other_services as services}
								<a href={`/services/${services.id}`}>
									<div class="flex-shrink-0 w-[160px] bg-muted p-3 rounded-2xl">

										<!-- Gambar -->
										<img 
											src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
											alt="Gambar layanan"
											class="rounded-md aspect-square object-cover w-full mb-2"
										/>

										<!-- Teks -->
										<div class="text-sm leading-tight space-y-1">
											<p class="font-semibold line-clamp-2">{services.name}</p>
											<p class="text-muted-foreground line-clamp-2">{services.description}</p>
											<p class="text-xs">{toIndonesianCurrency(services.price)}</p>
										</div>
									</div>
								</a>
							{/each}
						</div>
					</div>

				</div>
				
			</div>
		</main>

		<!-- RIGHT: Order Panel -->
		<div class="w-full max-w-xl max-h-xl md:w-1/3 flex justify-end items-center sticky bottom-0">
			<OrderPanel {data} />
		</div>
	</div>


	
<!-- WEB -->
{:else}
	<div class="flex flex-1 flex-col">
		<div class="py-5 container mx-auto flex flex-1 flex-col gap-10 px-4 md:px-8">

			<!-- Title Service -->
			<div class="pt-5">
				<h1 class="text-5xl font-semibold">{data.service.name}</h1>
			</div>

			<!-- WRAPPER: Baris horizontal -->
			<div class="flex flex-col md:flex-row md:min-h-[400px] gap-15 w-full">
				
				<!-- LEFT: Carousel + Info -->
				<div class="flex flex-col gap-4 w-full md:w-2/3">
					
					<!-- Carousel Current Service -->
					<div>
						<Carousel.Root class="w-full max-w-400">
							<Carousel.Content>
								<Carousel.Item class="basis-full">
									<div class="max-w-[100%]">
										<AspectRatio ratio={16 / 9} class="bg-muted">
											<img
											src={data.service.image_url || "https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"}
											alt="{data.service.name}"
											class="w-full object-cover aspect-[16/9] rounded-xl"
											/>
										</AspectRatio>
									</div>
								</Carousel.Item>
							</Carousel.Content>
						</Carousel.Root>
					</div>

				</div>

				<!-- RIGHT: Order Panel -->
				<div class="w-full max-w-xl h-fit md:w-1/3 flex justify-end">
					<OrderPanel {data} />
				</div>
			</div>

			<!-- Deskripsi -->
			<div class="justify-text max-w-5xl flex flex-col gap-4">
				<div>
					<h2 class="text-3xl font-semibold">Deskripsi</h2>
				</div>
				<div>
					<p class="text-lg pr-4 max-w-4xl">
						{data.service.description}
					</p>
				</div>
			</div>

			<!-- Accordion pertanyaan -->
			<div class="max-w-[1000px] flex flex-col gap-4">
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

			<!-- Carousel services -->
			<div class="flex flex-col gap-4">
				<div>
					<h2 class="text-3xl font-semibold">Other Services</h2>
				</div>
				<Carousel.Root>
					<Carousel.Content>
						{#each other_services as other_service, index}
						<Carousel.Item class="md:basis-1/2 lg:basis-1/3">
							<Card.Root class="@container/card cursor-pointer h-full flex flex-col">
								<a href={`/services/${other_service.id}`} >
									<Card.Content>
										<AspectRatio ratio={16 / 9}>
											<img
												src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
												alt="Gray by Drew Beamer"
												class="h-full w-full rounded-md object-cover"
											/>
										</AspectRatio>
									</Card.Content>

									<Card.Footer class="flex flex-col justify-end flex-grow gap-2 p-6 text-sm">
										<div class="flex flex-col gap-1 flex-grow">
											<Card.Title class="text-lg font-semibold tabular-nums line-clamp-2">
												{other_service.name}
											</Card.Title>

											<Card.Description class="text-muted-foreground line-clamp-3 flex-grow">
												{other_service.description}
											</Card.Description>
										</div>

										<!-- Footer info tetap di bawah -->
										<div class="mt-2 flex w-full flex-row items-center justify-between md:mt-4">
											<p class="text-muted-foreground text-sm font-semibold md:text-base">Estimated Days</p>
											<p class=" text-sm font-semibold md:text-base">
												{other_service.estimated_days} Days
											</p>
										</div>
										<div class="flex w-full flex-row items-center justify-between">
											<p class="text-muted-foreground text-sm font-semibold md:text-base">Price</p>
											<p class="text-sm font-semibold md:text-base">
												{toIndonesianCurrency(other_service.price)}
											</p>
										</div>
									</Card.Footer>
								</a>
							</Card.Root>
						</Carousel.Item>
						{/each}
					</Carousel.Content>
				</Carousel.Root>
			</div>

		</div>
	</div>
{/if}