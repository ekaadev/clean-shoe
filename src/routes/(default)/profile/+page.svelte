<script lang="ts">
	import BodyProfile from '@/components/profile/body-profile.svelte';
	import { Separator } from '@/components/ui/separator/index';

	const { data } = $props();
</script>

<svelte:head>
	<title>Profile</title>
</svelte:head>

<div class="flex flex-1 flex-col">
	<div class="container mx-auto flex flex-1 flex-col px-4 md:px-8">
		<!-- title, description, and cta -->
		<div class="shrink-0 pt-10 lg:pt-20">
			<div>
				<h1 class="text-4xl font-semibold tracking-tight text-balance">Profil</h1>
				<p class="text-muted-foreground mt-2 text-sm leading-relaxed sm:mt-4 sm:text-base/7">
					Atur akunmu, cek riwayat pesanan, dan ubah preferensimu kapan aja.
				</p>
			</div>
		</div>
		<Separator class="my-4 max-w-3xl" />
		<!-- body profile -->
		<BodyProfile {data} />
	</div>
</div>
