<script lang="ts">
  import { intersect } from '$lib/components/intersect';

  const { data } = $props();
</script>

<section class="md:py-16 px-4 md:max-w-5xl mx-auto">
  <h2 class="text-3xl font-bold text-center mb-12">Layanan Unggulan</h2>
  <div class="px-4 grid grid-cols-1 md:grid-cols-2 gap-8">
    {#each data.services as list_service, index}
      <div
        use:intersect={{ className: 'fade-step', delay: index * 300 }}
        class="dark:bg-muted p-8 rounded-lg shadow-sm border hover:border-[#2563eb] dark:hover:border-[#3b82f6] transition-colors duration-300 opacity-0"
      >
        <a href="/services">
          <h3 class="font-semibold text-xl md:text-3xl mb-3">{list_service.name}</h3>
          <p class="text-muted-foreground line-clamp-3 flex-grow md:text-base text-sm">{list_service.description}</p>
        </a>
      </div>
    {/each}
  </div>
</section>
