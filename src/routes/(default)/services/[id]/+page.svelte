<script lang="ts">
	import * as Card from '@/components/ui/card/index';
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

	// ini untuk mengambil layanan lain yang tidak sama dengan layanan saat ini
	const other_services = $derived(data.services.filter((s: any) => s.id !== data.service.id));

	const faq = [
		{
			id: '2e199160-62b6-4b67-b8a2-fc4eeee0ee2d',
			servicePart:
				'Bagian sepatu yang dibersihkan dalam layanan ini meliputi: <strong>Upper Sole</strong>, <strong>Middle Sole</strong>, dan <strong>Out Sole</strong>',
			shoeMaterial:
				'Layanan cocok untuk berbagai jenis material sepatu seperti: <strong>Canvas, Suede, Leather, Nubuck</strong>, dan bahan lainnya.',
			onSiteAvailability:
				'Layanan <strong>tidak dapat ditunggu</strong>. Proses pembersihan dilakukan secara menyeluruh dan membutuhkan waktu pengerjaan tertentu',
			duration:
				'Estimasi pengerjaan adalah <strong>1 - 2 hari</strong> (tidak termasuk hari libur).',
			price:
				'Harga layanan Fast Clean adalah sebesar <strong>Rp 20.000</strong> per pasang sepatu.',
			pickupDelivery:
				'Layanan ini mencakup <strong>pick up</strong> dan <strong>delivery</strong> di area Surabaya Timur, Surabaya Selatan dan Surabaya Utara. Biaya tambahan mungkin berlaku untuk di luar area tersebut.'
		},
		{
			id: '3613d4ef-0651-4323-8678-f4a83e7ff5a9',
			servicePart:
				'Bagian sepatu yang dibersihkan dalam layanan ini semua area sepatu, termasuk: <strong>Upper Sole</strong>, <strong>Middle Sole</strong>, <strong>Out Sole</strong>, <strong>In Sole</strong>, dan <strong>Laces</strong>.',
			shoeMaterial:
				'Layanan cocok untuk berbagai jenis material sepatu seperti: <strong>Canvas, Suede, Leather, Nubuck</strong>, dan bahan lainnya.',
			onSiteAvailability:
				'Layanan <strong>tidak dapat ditunggu</strong>. Proses pembersihan dilakukan secara menyeluruh dan membutuhkan waktu pengerjaan tertentu',
			duration:
				'Estimasi pengerjaan adalah <strong>3 - 4 hari</strong> (tidak termasuk hari libur).',
			price:
				'Harga layanan Deep Clean adalah sebesar <strong>Rp 25.000</strong> per pasang sepatu.',
			pickupDelivery:
				'Layanan ini mencakup <strong>pick up</strong> dan <strong>delivery</strong> di area Surabaya Timur, Surabaya Selatan dan Surabaya Utara. Biaya tambahan mungkin berlaku untuk di luar area tersebut.'
		},
		{
			id: '5c4c1ea2-544e-4e15-bfe7-d6f5c10b704e',
			servicePart:
				'Bagian sepatu yang dibersihkan dalam layanan ini semua area sepatu, termasuk: <strong>Upper Sole</strong>, <strong>Middle Sole</strong>, <strong>Out Sole</strong>, <strong>In Sole</strong>, dan <strong>Laces</strong>.',
			shoeMaterial:
				'Layanan cocok untuk berbagai jenis material sepatu selain kulit seperti: <strong>Canvas, Suede, Nubuck</strong>, dan bahan lainnya.',
			onSiteAvailability:
				'Layanan <strong>tidak dapat ditunggu</strong>. Proses pembersihan dilakukan secara menyeluruh dan membutuhkan waktu pengerjaan tertentu',
			duration:
				'Estimasi pengerjaan adalah <strong>5 - 6 hari</strong> (tidak termasuk hari libur).',
			price:
				'Harga layanan Unyellowing adalah sebesar <strong>Rp 45.000</strong> per pasang sepatu.',
			pickupDelivery:
				'Layanan ini mencakup <strong>pick up</strong> dan <strong>delivery</strong> di area Surabaya Timur, Surabaya Selatan dan Surabaya Utara. Biaya tambahan mungkin berlaku untuk di luar area tersebut.'
		},
		{
			id: '482f04af-7d78-4c0d-b355-af0b179ac0f5',
			servicePart:
				'Bagian sepatu yang diperbaiki dalam layanan ini meliputi: <strong>Middle Sole</strong>, <strong>Out Sole</strong> dan tergantung pada kondisi sepatu.',
			shoeMaterial:
				'Layanan cocok untuk berbagai jenis material sepatu selain suede seperti: <strong>Canvas, Leather, Nubuck</strong>, dan bahan lainnya.',
			onSiteAvailability:
				'Layanan <strong>tidak dapat ditunggu</strong>. Proses pembersihan dilakukan secara menyeluruh dan membutuhkan waktu pengerjaan tertentu',
			duration:
				'Estimasi pengerjaan adalah <strong>7 - 8 hari</strong> (tidak termasuk hari libur).',
			price: 'Harga layanan Reglue adalah sebesar <strong>Rp 18.000</strong> per pasang sepatu.',
			pickupDelivery:
				'Layanan ini mencakup <strong>pick up</strong> dan <strong>delivery</strong> di area Surabaya Timur, Surabaya Selatan dan Surabaya Utara. Biaya tambahan mungkin berlaku untuk di luar area tersebut.'
		}
	];

	const faqFiltered = $derived(faq.filter((item) => item.id === data.service.id));

	onMount(() => {
		invalidateAll();
	});
</script>

<svelte:head>
	<title>Orders</title>
</svelte:head>

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
						<h2 class="text-2xl font-semibold">Apa yang bisa kami bantu?</h2>
					</div>
					<Accordion.Root type="single" class="w-full">
						<Accordion.Item value="value-1">
							<Accordion.Trigger class="text-md sm:text-md"
								>Bagian yang dikerjakan</Accordion.Trigger
							>
							<Accordion.Content class="text-md flex flex-col gap-4">
								{@html `<p class="text-sm">${faqFiltered[0].servicePart || 'Item tidak teridentifikasi'}</p>`}
							</Accordion.Content>
						</Accordion.Item>
						<Accordion.Item value="value-2">
							<Accordion.Trigger class="text-md sm:text-md"
								>Bahan sepatu yang cocok</Accordion.Trigger
							>
							<Accordion.Content class="text-md flex flex-col gap-4">
								{@html `<p class="text-sm">${faqFiltered[0].shoeMaterial || 'Item tidak teridentifikasi'}</p>`}
							</Accordion.Content>
						</Accordion.Item>
						<Accordion.Item value="value-3">
							<Accordion.Trigger class="text-md sm:text-md">Tipe layanan</Accordion.Trigger>
							<Accordion.Content class="text-md flex flex-col gap-4">
								{@html `<p class="text-sm">${faqFiltered[0].onSiteAvailability || 'Item tidak teridentifikasi'}</p>`}
							</Accordion.Content>
						</Accordion.Item>
						<Accordion.Item value="value-4">
							<Accordion.Trigger class="text-md sm:text-md">Waktu pengerjaan</Accordion.Trigger>
							<Accordion.Content class="text-md flex flex-col gap-4">
								{@html `<p class="text-sm">${faqFiltered[0].duration || 'Item tidak teridentifikasi'}</p>`}
							</Accordion.Content>
						</Accordion.Item>
						<Accordion.Item value="value-5">
							<Accordion.Trigger class="text-md sm:text-md">Harga</Accordion.Trigger>
							<Accordion.Content class="text-md flex flex-col gap-4">
								{@html `<p class="text-sm">${faqFiltered[0].price || 'Item tidak teridentifikasi'}</p>`}
							</Accordion.Content>
						</Accordion.Item>
						<Accordion.Item value="value-6">
							<Accordion.Trigger class="text-md sm:text-md">Jemput dan antar</Accordion.Trigger>
							<Accordion.Content class="text-md flex flex-col gap-4">
								{@html `<p class="text-sm">${faqFiltered[0].pickupDelivery || 'Item tidak teridentifikasi'}</p>`}
							</Accordion.Content>
						</Accordion.Item>
					</Accordion.Root>
				</div>

				<!-- Other Services -->
				<div class="flex flex-col gap-4">
					<div>
						<h2 class="text-2xl font-semibold">Layanan lainnya</h2>
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
													<p class="text-muted-foreground text-xs">Estimasi Pengerjaan</p>
													<p class="text-xs font-semibold">
														{service.estimated_days} Hari
													</p>
												</div>
												<div class="flex flex-row items-center justify-between">
													<p class="text-muted-foreground text-xs">Harga</p>
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
					<h2 class="text-3xl font-semibold">Apa yang bisa kami bantu?</h2>
				</div>
				<Accordion.Root type="single" class="w-full max-w-4xl">
					<Accordion.Item value="item-1">
						<Accordion.Trigger class="text-lg sm:text-xl">Bagian yang dikerjakan</Accordion.Trigger>
						<Accordion.Content class="flex flex-col gap-4 text-balance">
							{@html `<p class="text-lg">${faqFiltered[0].servicePart || 'Item tidak teridentifikasi'}</p>`}
						</Accordion.Content>
					</Accordion.Item>
					<Accordion.Item value="item-2">
						<Accordion.Trigger class="text-lg sm:text-xl">Bahan sepatu yang cocok</Accordion.Trigger
						>
						<Accordion.Content class="flex flex-col gap-4 text-balance">
							{@html `<p class="text-lg">${faqFiltered[0].shoeMaterial || 'Item tidak teridentifikasi'}</p>`}
						</Accordion.Content>
					</Accordion.Item>
					<Accordion.Item value="item-3">
						<Accordion.Trigger class="text-lg sm:text-xl">Tipe layanan</Accordion.Trigger>
						<Accordion.Content class="flex flex-col gap-4 text-balance">
							{@html `<p class="text-lg">${faqFiltered[0].onSiteAvailability || 'Item tidak teridentifikasi'}</p>`}
						</Accordion.Content>
					</Accordion.Item>
					<Accordion.Item value="item-4">
						<Accordion.Trigger class="text-lg sm:text-xl">Waktu pengerjaan</Accordion.Trigger>
						<Accordion.Content class="flex flex-col gap-4 text-balance">
							{@html `<p class="text-lg">${faqFiltered[0].duration || 'Item tidak teridentifikasi'}</p>`}
						</Accordion.Content>
					</Accordion.Item>
					<Accordion.Item value="item-5">
						<Accordion.Trigger class="text-lg sm:text-xl">Harga</Accordion.Trigger>
						<Accordion.Content class="flex flex-col gap-4 text-balance">
							{@html `<p class="text-lg">${faqFiltered[0].price || 'Item tidak teridentifikasi'}</p>`}
						</Accordion.Content>
					</Accordion.Item>
					<Accordion.Item value="item-6">
						<Accordion.Trigger class="text-lg sm:text-xl">Jemput dan antar</Accordion.Trigger>
						<Accordion.Content class="flex flex-col gap-4 text-balance">
							{@html `<p class="text-lg">${faqFiltered[0].pickupDelivery || 'Item tidak teridentifikasi'}</p>`}
						</Accordion.Content>
					</Accordion.Item>
				</Accordion.Root>
			</div>

			<!-- Other Services -->
			<div class="flex flex-col gap-4">
				<div>
					<h2 class="text-3xl font-semibold">Layanan lainnya</h2>
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
												<p class="text-muted-foreground text-sm font-semibold">
													Estimasi Pengerjaan
												</p>
												<p class="text-sm font-semibold">
													{service.estimated_days} Hari
												</p>
											</div>
											<div class="flex flex-row items-center justify-between">
												<p class="text-muted-foreground text-sm font-semibold">Harga</p>
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
