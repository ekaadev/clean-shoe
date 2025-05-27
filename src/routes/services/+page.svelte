<script lang="ts">
  import Navbar from "$lib/component/Navbar.svelte";
  import Cardcus from '$lib/component/Cardcustom.svelte';
  import type { IService } from '$lib/types/interface/service.interface';

  let loading = false;
  let error: string | null = null;

  // DUMMY DATA OBJECT
  const services: IService[] = [
    {
      name: 'Deep Clean',
      description: 'Pembersihan mendalam untuk sepatu anda',
      price: 100000,
      image_url: '/assets/images.png',
      estimated_days: '3'
    },
    {
      name: 'Fast Clean',
      description: 'Pembersihan cepat untuk sepatu anda',
      price: 50000,
      image_url: '/assets/images.png',
      estimated_days: '1'
    },
    {
      name: 'Premium Clean',
      description: 'Pembersihan premium dengan treatment khusus',
      price: 150000,
      image_url: '/assets/images.png',
      estimated_days: '5'
    }
  ];

  const cards = services.map((service) => ({
    title: service.name,
    description: service.description,
    price: service.price,
    image: service.image_url,
    estimationday: parseInt(service.estimated_days)
  }));

</script>

<Navbar />

<div class="flex justify-center p-6">
  <p class="text-5xl">CLEANING SERVICE SHOE</p>
</div>

<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6 justify justify-items-center max-w-7xl mx-auto p-6">
  {#if loading}
    <div class="col-span-full text-3xl">Loading services...</div>
  {:else if error}
    <div class="text-red-500 col-span-full text-3xl">{error}</div>
  {:else if services.length === 0}
    <div class="col-span-full text-3xl">No services available</div>
  {:else}
    {#each cards as card (card.title)}
      <Cardcus {...card} />
    {/each}
  {/if}
</div>