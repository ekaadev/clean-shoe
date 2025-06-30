<script lang="ts">
	import { page } from '$app/state';
</script>

<svelte:head>
	<title>{page.status} | {page.error?.message}</title>
</svelte:head>

<div class="bg-background relative flex min-h-svh flex-1 flex-col">
	<div class="container mx-auto flex flex-1 flex-col">
		<div class="text-muted-foreground mx-auto flex flex-1 flex-col items-start justify-center">
			<div class="flex items-center justify-center gap-2 text-2xl">
				<h1>{page.status}</h1>
				<span>|</span>
				<p>{page.error?.message}</p>
			</div>
			{#if page.status === 404}
				<p>The page you are looking for does not exist.</p>
			{:else if page.status === 500}
				<p>An unexpected error occurred. Please try again later.</p>
			{/if}
			<p class="mt-2"><a class="underline" href="/">Home</a></p>
		</div>
	</div>
</div>
