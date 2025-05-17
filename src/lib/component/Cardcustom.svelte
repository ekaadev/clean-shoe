<script lang="ts">
	export let title: string;
	export let description: string;
	export let price: number;
	export let estimationday: number;
</script>

<a href="/order" class="group rounded-xl overflow-hidden shadow-md bg-zinc-800 text-white hover:shadow-xl hover:bg-zinc-900 transition-all duration-300 w-64 h-[360px] flex flex-col">
	<!-- Gambar dengan overlay gelap saat hover -->
	<div class="relative">
		<img
			src="/assets/images.png"
			alt="Service preview"
			class="w-full h-40 object-cover transition-all duration-300 group-hover:brightness-75"
		/>
		<div class="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
	</div>

	<!-- Konten bawah -->
	<div class="flex flex-col justify-between flex-1 px-4 py-3 group-hover:bg-zinc-900 transition-colors duration-300">
		<div class="text-center">
			<h3 class="text-md font-semibold text-orange-400 mb-1 group-hover:text-orange-300">{title}</h3>
			<p class="text-sm text-zinc-300 line-clamp-2 group-hover:text-zinc-200">{description}</p>
		</div>

		<div class="flex justify-between text-sm text-zinc-400 font-medium border-t border-zinc-600 pt-3 mt-3 group-hover:text-zinc-300 group-hover:border-zinc-700">
			<span>Rp {price.toLocaleString()}</span>
			<span>{estimationday} {estimationday > 1 ? 'hari' : 'hari'}</span>
		</div>
	</div>
</a>