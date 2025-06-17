<script lang="ts">
	import BrandInstagram from '@tabler/icons-svelte/icons/brand-instagram';
</script>

<footer class="bg-background flex w-full flex-1 flex-col">
	<div
		class="container mx-auto flex flex-col items-center justify-between px-4 pt-16 pb-32 sm:px-6 sm:pt-24 lg:px-8 lg:pt-32"
	>
		<div class="xl:grid xl:grid-cols-2 xl:gap-36">
			<div class="mt-8 space-y-8">
				<p class="text-3xl font-semibold">Clean Shoe</p>
				<p class="text-muted-foreground text-sm leading-6">
					Di Clean Shoe, kami menawarkan layanan cuci sepatu profesional dengan teknik dan bahan
					khusus yang ramah sepatu dan lingkungan. Kami melayani semua jenis sepatu: sneakers,
					canvas, kulit, suede, hingga heels. Setiap pasang sepatu dirawat dengan teliti oleh tim
					ahli kami, agar kembali bersih, bebas bau, dan siap tampil gaya.
				</p>
				<div>
					<span>
						<a href="/">
							<BrandInstagram class="text-muted-foreground inline h-10 w-10" />
						</a>
					</span>
				</div>
			</div>
			<div class="mt-8 flex flex-col items-start">
				<ul class="flex flex-col gap-4 text-sm">
					<li class="text-muted-foreground">Index</li>
					<li class="hover:underline">
						<a href="/">Home</a>
					</li>
					<li class="hover:underline">
						<a href="/services">Services</a>
					</li>
					<li class="hover:underline">
						<a href="/orders">Check Order</a>
					</li>
				</ul>
			</div>
		</div>
	</div>
</footer>
