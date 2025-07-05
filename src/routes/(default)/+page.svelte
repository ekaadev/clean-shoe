<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import LayananUnggulan from '@/components/featured-service.svelte';
	import OrderSteps from '$lib/components/order-step.svelte';
	import ImageMarquee from '$lib/components/image-marquee.svelte';
	const totalCustomer = 110;
	const totalCleaned = 220;

	const { data } = $props();

	const images1 = [
		'https://xxcfabnlhvbfasfykzvd.supabase.co/storage/v1/object/public/services-images/services/463655391_1064777395108387_8567305059650254061_n.webp',
		'https://xxcfabnlhvbfasfykzvd.supabase.co/storage/v1/object/public/services-images/services/463848744_3425692350896183_6081045120550184603_n.webp',
		'https://xxcfabnlhvbfasfykzvd.supabase.co/storage/v1/object/public/services-images/services/464254316_923594129694260_5333616463652149390_n.jpg',
		'https://xxcfabnlhvbfasfykzvd.supabase.co/storage/v1/object/public/services-images/services/465938372_927462769298409_2673522739780486665_n.jpg',
		'https://xxcfabnlhvbfasfykzvd.supabase.co/storage/v1/object/public/services-images/services/467191573_1309189817105106_5006606469469446197_n.jpg',
		'https://xxcfabnlhvbfasfykzvd.supabase.co/storage/v1/object/public/services-images/services/467344439_1291665985593125_5674773781307921899_n.webp',
		'https://xxcfabnlhvbfasfykzvd.supabase.co/storage/v1/object/public/services-images/services/467442756_1335929514515658_264847202812313719_n.jpg',
		'https://xxcfabnlhvbfasfykzvd.supabase.co/storage/v1/object/public/services-images/services/467856584_8973906036005641_8801393648203155639_n.jpg',
		'https://xxcfabnlhvbfasfykzvd.supabase.co/storage/v1/object/public/services-images/services/468516454_1642177663034932_3929806038224692750_n.jpg',
		'https://xxcfabnlhvbfasfykzvd.supabase.co/storage/v1/object/public/services-images/services/468815687_1605356110062461_2910894845730022691_n.jpg'
	];

	const images2 = [
		'https://xxcfabnlhvbfasfykzvd.supabase.co/storage/v1/object/public/services-images/services/468824482_892102332990346_7741710181263207788_n.jpg',
		'https://xxcfabnlhvbfasfykzvd.supabase.co/storage/v1/object/public/services-images/services/468912001_1603844837158562_9025008881879551292_n.jpg',
		'https://xxcfabnlhvbfasfykzvd.supabase.co/storage/v1/object/public/services-images/services/469170270_1061157172453676_6725146515236317497_n.jpg',
		'https://xxcfabnlhvbfasfykzvd.supabase.co/storage/v1/object/public/services-images/services/469217432_1760882458021522_5445416930779241639_n.jpg',
		'https://xxcfabnlhvbfasfykzvd.supabase.co/storage/v1/object/public/services-images/services/469259995_9349039061791924_3923978598174338328_n.jpg',
		'https://xxcfabnlhvbfasfykzvd.supabase.co/storage/v1/object/public/services-images/services/469828392_472569065443076_6747263277810493519_n.jpg',
		'https://xxcfabnlhvbfasfykzvd.supabase.co/storage/v1/object/public/services-images/services/464988681_537973812151683_2144598391232474668_n.webp',
		'https://xxcfabnlhvbfasfykzvd.supabase.co/storage/v1/object/public/services-images/services/467623127_2320184648347664_7700562396104769753_n.webp',
		'https://xxcfabnlhvbfasfykzvd.supabase.co/storage/v1/object/public/services-images/services/468912001_1603844837158562_9025008881879551292_n.jpg',
		'https://xxcfabnlhvbfasfykzvd.supabase.co/storage/v1/object/public/services-images/services/466704647_1120901779392294_1884376990759167194_n.jpg'
	];
</script>

<svelte:head>
	<title>Clean Shoe</title>
</svelte:head>

<div class="flex flex-1 flex-col">
	<div class="container mx-auto flex flex-1 flex-col">
		<!-- Hero (done)-->
		<section class="flex h-156 items-center justify-center rounded-b-lg px-4 py-16 text-center">
			<div class="max-w-1xl flex flex-col items-center justify-center space-y-6">
				<h1 class="text-5xl leading-tight font-bold break-words md:text-8xl">
					<span class="text-[#2563eb] dark:text-[#3b82f6]"> Walk </span> Brighter,
					<span class="text-[#2563eb] dark:text-[#3b82f6]"> Feel </span> Better!
				</h1>
				<p class="max-w-[300px] text-base md:max-w-[800px] md:text-xl">
					Cuci sepatu cepat, aman, dan maksimal. Untuk setiap gaya dan aktivitasmu
				</p>
				<a href="/services">
					<Button class="cursor-pointer">Gunakan Layanan Sekarang</Button>
				</a>
			</div>
		</section>

		<!-- Statistik -->
		<section class="py-16">
			<div
				class="bg-muted flex flex-col gap-6
                  px-4 py-12 text-center sm:grid sm:grid-cols-2 md:rounded-lg"
			>
				<div class="flex h-full flex-col justify-center">
					<h3 class="mb-2 text-3xl font-semibold">Telah Melayani</h3>
					<p class="text-5xl font-bold text-[#2563eb] dark:text-[#3b82f6]">
						{totalCustomer.toLocaleString()}+
					</p>
					<p class="text-md mt-1">Pelanggan sejak berdiri</p>
				</div>

				<div class="flex h-full flex-col justify-center">
					<h3 class="mb-2 text-3xl font-semibold">Telah membersihkan</h3>
					<p class="text-5xl font-bold text-[#2563eb] dark:text-[#3b82f6]">
						{totalCleaned.toLocaleString()}+
					</p>
					<p class="mt-1 text-base">Pasang sepatu sejak berdiri</p>
				</div>
			</div>
		</section>

		<!-- Layanan Unggulan -->
		<section>
			<LayananUnggulan {data} />
		</section>

		<!-- Cara Pemesanan -->
		<section>
			<OrderSteps />
		</section>

		<!-- Galeri Pelanggan -->
		<section class="px-4 py-16">
			<h2 class="mb-12 text-center text-3xl font-bold">Galeri Pelanggan</h2>
			<div class="grid grid-cols-1 gap-8">
				<ImageMarquee direction="right" duration={50} image={images1} />
				<ImageMarquee direction="left" duration={50} image={images2} />
			</div>
		</section>
	</div>
</div>

<!-- style animasi -->
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
		animation: fadeUp 0.6s ease-out forwards;
	}
</style>
