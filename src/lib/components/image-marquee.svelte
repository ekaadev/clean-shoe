<script lang="ts">
  // arah & kecepatan
  export let direction: 'left' | 'right' = 'left';
  export let duration = 30;          // detik

  // ganti favicon → 1.jpg .. 10.jpg di /static/images
  const baseImages = Array.from({ length: 10 }, (_, i) => `/favicon.png`);

  // track class
  const trackClass = direction === 'left' ? 'marquee-left' : 'marquee-right';
</script>

<div class="overflow-hidden w-full">
  <div class={`flex gap-4 ${trackClass}`} style={`--duration:${duration}s`}>
    {#each [...baseImages, ...baseImages, ...baseImages] as img}  <!-- digandakan 3× -->
      <div class="flex-none w-[300px] h-[200px] md:h-[250px] rounded-xl overflow-hidden shadow border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
        <img src={img} alt="marquee" class="object-cover w-full h-full" loading="lazy" />
      </div>
    {/each}
  </div>
</div>

<style>
  /* keyframes */
  @keyframes slide-left  { 0% {transform:translateX(0);} 100% {transform:translateX(-33.333%);} }
  @keyframes slide-right { 0% {transform:translateX(-33.333%);} 100% {transform:translateX(0);} }

  .marquee-left,
  .marquee-right {
    width: max-content;               /* panjang = total lebar konten */
    animation-iteration-count: infinite;
    animation-timing-function: linear;
    animation-duration: var(--duration);
  }
  .marquee-left  { animation-name: slide-left; }
  .marquee-right { animation-name: slide-right; }
</style>
