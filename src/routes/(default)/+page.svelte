<script lang="ts">
    import { intersect } from '$lib/components/intersect';
    import { Button } from "$lib/components/ui/button/index.js";
    import LayananUnggulan from '@/components/featured-service.svelte';
    import OrderSteps from '$lib/components/order-step.svelte';
    import ImageMarquee from '$lib/components/image-marquee.svelte';
	const totalCustomer = 10;
	const totalCleaned = 30;

	const { data } = $props();

</script>

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

<svelte:head>
	<title>Clean Shoe</title>
</svelte:head>

<div class="flex flex-1 flex-col">
	<div class="container mx-auto flex flex-1 flex-col">

		<!-- Hero (done)-->
        <section
        class="py-16 px-4 h-156 flex items-center justify-center rounded-b-lg text-center"
        >
        <div class="flex flex-col items-center justify-center space-y-6 max-w-1xl">
            <h1 class="text-5xl md:text-8xl font-bold break-words leading-tight">
            <span class="text-[#2563eb] dark:text-[#3b82f6]"> Walk </span> Brighter, <span class="text-[#2563eb] dark:text-[#3b82f6]"> Feel </span> Better!
            </h1>
            <p class="text-base md:text-xl max-w-[300px] md:max-w-[800px]">
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
            class="py-12 px-4 text-center bg-muted 
                  flex flex-col sm:grid sm:grid-cols-2 md:rounded-lg gap-6">
            <div class="h-full flex flex-col justify-center">
            <h3 class="text-3xl font-semibold mb-2">Telah Melayani</h3>
            <p class="text-5xl font-bold text-[#2563eb] dark:text-[#3b82f6]">{totalCustomer.toLocaleString()}+</p>
            <p class="text-md mt-1">Pelanggan sejak berdiri</p>
            </div>

            <div class="h-full flex flex-col justify-center">
            <h3 class="text-3xl font-semibold mb-2">Telah membersihkan</h3>
            <p class="text-5xl font-bold text-[#2563eb] dark:text-[#3b82f6]">{totalCleaned.toLocaleString()}+</p>
            <p class="text-base mt-1">Pasang sepatu sejak berdiri</p>
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
            <h2 class="text-3xl font-bold text-center mb-12"
            >Galeri Pelanggan</h2>
            <div class="grid gap-8 grid-cols-1">
                <ImageMarquee direction="right" duration={60} />
                <ImageMarquee direction="left" duration={60} />
            </div>
        </section>
	</div>
</div>
