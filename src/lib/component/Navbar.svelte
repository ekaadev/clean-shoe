<script lang="ts">
	import { page } from '$app/stores';
</script>

<nav class="flex h-16 items-center justify-end gap-3 bg-gray-600 text-zinc-100 pr-5">
	<a
		href="/services"
		class="flex h-full items-center border-b-2 px-4 {$page.url.pathname === '/services'
			? 'border-orange-500 hover:border-b-orange-500'
			: 'border-transparent hover:border-b-gray-900'} "
	>
		Service</a
	>
	<a
		href="/history"
		class="flex h-full items-center border-b-2 px-4 {$page.url.pathname === '/history'
			? 'border-orange-500 hover:border-b-orange-500'
			: 'border-transparent hover:border-b-gray-900'} "
	>
		History</a
	>
</nav>