<script lang="ts">
  import { intersect } from '$lib/components/intersect';

  export let steps = [
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

<section class="py-16 px-4 rounded-lg">
  <div class="max-w-4xl mx-auto items-center justify-center flex flex-col">
    <h2 class="text-3xl md:text-3xl font-bold mb-6">Cara Pemesanan</h2>
    <p class="text-sm max-w-[18rem] md:max-w-full text-center md:text-lg text-gray-600 dark:text-gray-300 mb-12">
      Ikuti langkah mudah berikut untuk memesan layanan kami
    </p>

    <div class="grid grid-cols-1 sm:grid-cols-2 gap-8 text-left">
      {#each steps as step, index}
        <div
          class="flex items-start space-x-4 opacity-0 px-4"
          use:intersect={{ delay: index * 300, className: 'fade-step' }}
        >
          <div class="flex-shrink-0 bg-blue-100 text-[#2563eb] dark:text-[#3b82f6] rounded-full w-10 h-10 flex items-center justify-center text-lg font-bold">
            {step.number}
          </div>
          <div>
            <h3 class="text-lg md:text-2xl font-semibold mb-1">{step.title}</h3>
            <p class="text-muted-foreground text-sm md:text-base">{step.description}</p>
          </div>
        </div>
      {/each}
    </div>
  </div>
</section>
