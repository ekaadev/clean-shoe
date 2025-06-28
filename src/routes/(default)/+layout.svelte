<script lang="ts">
	import { Toaster } from '@/components/ui/sonner/index.js';
	import NavMenu from '@/components/nav-menu.svelte';
	import Footer from '@/components/footer.svelte';
	const { children } = $props();
</script>

<div class="flex flex-1 flex-col">
	<NavMenu />
	<div>
		{@render children()}
	</div>
	<!-- footer -->
	<Footer />
</div>
