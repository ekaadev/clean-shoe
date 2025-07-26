<script lang="ts">
	import { Label } from '$lib/components/ui/label/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { toast } from 'svelte-sonner';
	import { enhance } from '$app/forms';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { browser } from '$app/environment';

	let isLoading = $state(false);

	const handleSubmit: SubmitFunction = () => {
		isLoading = true;

		return async ({ result, update }) => {
			isLoading = false;

			if (result.type === 'failure') {
				toast.error(`Ups, gagal daftar`, {
					description: result.data?.message || 'An error occurred',
					duration: 3000
				});
			} else if (result.type === 'success') {
				const actionType = 'Akun berhasil dibuat. Yuk, cek email kamu buat konfirmasi!';
				toast.success(actionType, {
					description: 'Selamat datang di Clean Shoe!',
					duration: 6000
				});

				if (browser) {
					setTimeout(() => {
						window.location.href = '/auth/login';
					}, 2000); // delay 2 detik
				}
			}

			await update();
		};
	};
</script>

<form class="flex flex-col gap-6" action="?/signup" method="post" use:enhance={handleSubmit}>
	<div class="flex flex-col items-center gap-2 text-center">
		<h1 class="text-2xl font-bold">Daftar di Clean Shoe</h1>
		<p class="text-muted-foreground mb-6 text-sm text-balance">
			Masukkan data kamu buat bikin akun
		</p>
	</div>
	<div class="grid gap-6">
		<div class="grid gap-3">
			<Label for="email">Email</Label>
			<Input
				id="email"
				type="email"
				placeholder="m@example.com"
				required
				name="email"
				disabled={isLoading}
			/>
		</div>
		<div class="grid gap-3">
			<div class="flex items-center">
				<Label for="password">Password</Label>
			</div>
			<Input
				id="password"
				type="password"
				required
				name="password"
				placeholder=""
				disabled={isLoading}
			/>
		</div>
		{#if !isLoading}
			<Button type="submit" class="w-full">Daftar</Button>
		{:else}
			<Button type="submit" class="w-full" disabled>Bentar...</Button>
		{/if}
	</div>
	<div class="mt-4 text-center text-sm">
		Udah punya akun?
		<a href="/auth/login" class="underline underline-offset-4"> Masuk </a>
	</div>
</form>
