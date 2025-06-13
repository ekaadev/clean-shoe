<script lang="ts">
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
