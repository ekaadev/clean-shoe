<script lang="ts">
	import Sidebar from '$lib/components/Sidebar.svelte';
	import Navbar from '$lib/components/Navbar.svelte';
	let { children } = $props();
</script>

<div class="flex h-screen bg-gray-100">
	<div class="h-full w-64 flex-shrink-0 bg-[#F5F5F5] p-4 pt-10 shadow-lg">
		<Sidebar />
	</div>

	<div class="flex min-h-0 flex-1 flex-col">
		<div class="w-full shadow-sm">
			<Navbar />
		</div>

		<div class="flex-1 overflow-y-auto p-6">
			{@render children()}
		</div>
	</div>
</div>
