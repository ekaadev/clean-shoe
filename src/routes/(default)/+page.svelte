<script lang="ts">
    import { intersect } from '$lib/components/intersect';
	import ImageMarquee from '$lib/components/image-marquee.svelte';
	const totalCustomer = 10;
	const totalCleaned = 30;

	const { data } = $props();
    
    $inspect(data)

    const steps = [
    {
        number: 1,
        title: 'Pilih Layanan',
        description: 'Telusuri daftar layanan seperti Fast Clean, Deep Clean, dll.'
    },
    {
        number: 2,
        title: 'Masukkan Jumlah',
        description: 'Tentukan jumlah sepatu atau layanan yang ingin dibeli.'
    },
    {
        number: 3,
        title: 'Isi Formulir',
        description: 'Masukkan nama, alamat, dan detail pemesanan di form yang tersedia.'
    },
    {
        number: 4,
        title: 'Lakukan Pembayaran',
        description: 'Pilih metode pembayaran, lalu selesaikan pemesananmu.'
    }
    ];

</script>

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

<svelte:head>
	<title>Clean Shoe</title>
</svelte:head>

<div class="flex flex-1 flex-col"> <!-- JANGAN DIUBAH -->
	<div class="container mx-auto flex flex-1 flex-col"> <!-- JANGAN DIUBAH-->
		<!-- Hero -->
		<section
        use:intersect={{ className: 'fade-step' }}
        class="py-16 px-4 text-center h-156 flex items-center justify-center"
        style="background-image: url('https://shoesandcare.com/assets/front/img/cta/bg-cant-visit-workshop.png');">
            <div class="grid grid-rows-3">
                <div>
                    <h1 class="text-4xl font-bold mb-4 max-w-[700px] break-words">Walk Brighter, Feel Better! lorem ipsum dolor sit amet lorem ipsum dolor sit</h1>
                </div>
                <div>
                    <p class="text-base mb-6 max-w-xl mx-auto whitespace-normal">
                    Solusi cuci sepatu profesional di Surabaya. Cepat, bersih, dan terjangkau.
                    </p>
                </div>
                <div>
                    <a href="/services" class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition">
                        Lihat Layanan
                    </a>
                </div>
            </div>
		</section>

		<!-- Statistik -->
		<section class="py-16 px-4">
            <div
            class="flex py-8 px-4 dark:bg-gray-800 text-center bg-gray-200 grid grid-cols-1 sm:grid-cols-2 rounded-lg gap-6"
            use:intersect={{ className: 'fade-step' }}>
                <div>
                    <h3 class="text-3xl font-semibold mb-2">Telah Melayani</h3> 
                    <p class="text-5xl font-bold text-blue-600">{totalCustomer.toLocaleString()}+</p>
                    <p class="text-base mt-1">Pelanggan sejak berdiri</p>
                </div>
                <div>
                    <h3 class="text-3xl font-semibold mb-2">Telah membersihkan</h3>
                    <p class="text-5xl font-bold text-blue-600">{totalCleaned.toLocaleString()}+</p>
                    <p class="text-base mt-1">pasang sepatu sejak berdiri</p>
                </div>
            </div>
        </section>

        <section id="layanan" class="py-16 px-4 max-w-5xl mx-auto">
            <h2 class="text-4xl font-semibold text-center mb-12">Layanan Unggulan</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                {#each data.services as list_service, index}
                <div
                    use:intersect={{ className: 'fade-step', delay: index * 200 }}
                    class="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md border hover:border-blue-600 transition duration-500 opacity-0"
                >
                    <a href="/services">
                    <h3 class="font-semibold text-3xl mb-3">{list_service.name}</h3>
                    <p class="text-muted-foreground line-clamp-3 flex-grow">{list_service.description}</p>
                    </a>
                </div>
                {/each}
            </div>
        </section>

        <section class="bg-white dark:bg-gray-900 py-16 px-4">
            <div class="max-w-4xl mx-auto text-center">
                <h2 class="text-3xl md:text-4xl font-bold mb-6">Cara Pemesanan</h2>
                <p class="text-base md:text-lg text-gray-600 dark:text-gray-300 mb-12">
                Ikuti langkah mudah berikut untuk memesan layanan kami.
                </p>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-8 text-left">
                {#each steps as step, index}
                    <div
                    class="flex items-start space-x-4 opacity-0"
                    use:intersect={{ delay: index * 300, className: 'fade-step' }}
                    >
                    <div class="flex-shrink-0 bg-blue-100 text-blue-600 rounded-full w-10 h-10 flex items-center justify-center text-lg font-bold">
                        {step.number}
                    </div>
                    <div>
                        <h3 class="text-lg md:text-xl font-semibold mb-1">{step.title}</h3>
                        <p class="text-gray-600 dark:text-gray-300">{step.description}</p>
                    </div>
                    </div>
                {/each}
                </div>
            </div>
        </section>

        <section class="px-4 py-16">
            <h2 class="text-4xl font-semibold text-center mb-12"
            >Galeri Pelanggan</h2>
            <div class="grid gap-8 grid-cols-1">
                <ImageMarquee direction="right" duration={28} />
                <ImageMarquee direction="left" duration={28} />
            </div>
        </section>

		<!-- Tombol WhatsApp -->
		<!-- <a href="https://wa.me/6281234567890" target="_blank"
			class="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg z-50">
			<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
				stroke="currentColor" class="w-6 h-6">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
					d="M3 8l7.89 5.26L21 3" />
			</svg>
		</a> -->
	</div>
</div>
