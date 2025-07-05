<script lang="ts">
	import { AspectRatio } from '$lib/components/ui/aspect-ratio/index.js';

	const { direction = 'left', duration = 60, image = [] } = $props();

	const trackClass = direction === 'left' ? 'marquee-left' : 'marquee-right';
</script>

<div class="relative w-full overflow-hidden">
	<div class="pointer-events-none absolute inset-0 z-10 flex justify-between">
		<div
			class="w-32 bg-gradient-to-r from-white/100 via-transparent to-transparent dark:from-black/100 dark:via-transparent dark:to-transparent"
		></div>
		<div
			class="w-32 bg-gradient-to-l from-white/100 via-transparent to-transparent dark:from-black/100 dark:via-transparent dark:to-transparent"
		></div>
	</div>

	<div class={`flex gap-4 ${trackClass}`} style={`--duration:${duration}s`}>
		{#each [...image, ...image, ...image] as img}
			<div class="w-[60vw] flex-none sm:w-[300px]">
				<AspectRatio ratio={4 / 3}>
					<img
						src={img}
						alt="marquee"
						loading="lazy"
						class="h-full w-full rounded object-cover shadow"
					/>
				</AspectRatio>
			</div>
		{/each}
	</div>
</div>

<style>
	@keyframes slide-left {
		0% {
			transform: translateX(0);
		}
		100% {
			transform: translateX(-33.333%);
		}
	}
	@keyframes slide-right {
		0% {
			transform: translateX(-33.333%);
		}
		100% {
			transform: translateX(0);
		}
	}

	.marquee-left,
	.marquee-right {
		width: max-content;
		animation-iteration-count: infinite;
		animation-timing-function: linear;
		animation-duration: var(--duration);
	}
	.marquee-left {
		animation-name: slide-left;
	}
	.marquee-right {
		animation-name: slide-right;
	}
</style>
