<script lang="ts">
	import { onMount } from 'svelte';
	import { invalidateAll } from '$app/navigation';

	const { data } = $props();

	onMount(() => {
		invalidateAll();
	});
</script>

<!-- ready for detail serice page -->
