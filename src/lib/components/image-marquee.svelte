<script lang="ts">
  import { AspectRatio } from "$lib/components/ui/aspect-ratio/index.js";
  // arah & kecepatan
  export let direction: 'left' | 'right' = 'left';
  export let duration = 30;          // detik

  // ganti favicon → 1.jpg .. 10.jpg di /static/images
  const baseImages = [
    "https://img.freepik.com/free-photo/front-view-people-eating-asian-food_23-2150288308.jpg?t=st=1751353537~exp=1751357137~hmac=a2ff48a554277e26e79634afb6c355d3428da9f51df35bcaf3c08bcd1e230cb4",
    "https://img.freepik.com/free-photo/view-cooked-crawfish_23-2150426277.jpg?t=st=1751353537~exp=1751357137~hmac=9db334ccd3abe7eaa8691a80646543c523d7ab7c0612adc6559cd55e1c5e16f8",
    "https://img.freepik.com/free-photo/woman-offering-food-neighbor_23-2149447158.jpg?t=st=1751353537~exp=1751357137~hmac=e956f015ff5b1cb260d7f5c19c2266ec9f9e4f58467047f96328057ec4391719",
    "https://img.freepik.com/premium-photo/close-up-portrait-young-woman-holding-drink_1048944-16713109.jpg",
    "https://img.freepik.com/free-photo/medium-shot-women-with-delicious-food_23-2150168102.jpg?t=st=1751353537~exp=1751357137~hmac=36ebb95321c2f0d26a381222c98c3c8753e3516479025771151c3ee0ebdf4152",
    "https://img.freepik.com/premium-photo/closeup-image-beautiful-asian-woman-eating-fish-chips-table-restaurant_1048944-27612350.jpg",
    "https://img.freepik.com/premium-photo/woman-preparing-smoothie-kitchen_1048944-20034728.jpg",
    "https://img.freepik.com/free-photo/front-view-man-eating-apple_23-2149857625.jpg?t=st=1751353537~exp=1751357137~hmac=1a0fb75acbce40671c466dc934ba6bc0840bd6ef55c22cb1a03469c617f06f5f",
    "https://img.freepik.com/free-photo/sugar-sprinkles-green-text-space_53876-94486.jpg?ga=GA1.1.2132799387.1751353552&semt=ais_items_boosted&w=740",
    "https://img.freepik.com/free-photo/still-life-wine-carafe-table_23-2149631769.jpg"
  ];
  // const baseImages = Array.from({ length: 10 }, (_, i) => `/favicon.png`);

  const trackClass = direction === 'left' ? 'marquee-left' : 'marquee-right';
</script>

  <div class="relative overflow-hidden w-full">
    <div class="pointer-events-none absolute inset-0 z-10 flex justify-between">
      <div class="w-32 bg-gradient-to-r from-white/100 via-transparent to-transparent dark:from-black/100 dark:via-transparent dark:to-transparent"></div>
      <div class="w-32 bg-gradient-to-l from-white/100 via-transparent to-transparent dark:from-black/100 dark:via-transparent dark:to-transparent"></div>
  </div>

  <div class={`flex gap-4 ${trackClass}`} style={`--duration:${duration}s`}>
    {#each [...baseImages, ...baseImages, ...baseImages] as img}
      <div class="flex-none w-[60vw] sm:w-[300px]">
        <AspectRatio ratio={4 / 3}>
          <img
            src={img}
            alt="marquee"
            loading="lazy"
            class="w-full h-full object-cover rounded shadow"
          />
        </AspectRatio>
      </div>
    {/each}
  </div>
</div>


<style>
  @keyframes slide-left  { 0% {transform:translateX(0);} 100% {transform:translateX(-33.333%);} }
  @keyframes slide-right { 0% {transform:translateX(-33.333%);} 100% {transform:translateX(0);} }

  .marquee-left,
  .marquee-right {
    width: max-content;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
    animation-duration: var(--duration);
  }
  .marquee-left  { animation-name: slide-left; }
  .marquee-right { animation-name: slide-right; }
</style>
