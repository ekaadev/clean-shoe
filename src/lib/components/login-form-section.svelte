<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
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
				toast.error(`Ups, gagal masuk`, {
					description: result.data?.message || 'An error occurred',
					duration: 3000
				});
			} else if (result.type === 'success') {
				toast.success('Berhasil masuk aplikasi', {
					description: 'Selamat datang lagi!',
					duration: 4000
				});

				if (browser) {
					window.location.href = '/';
				}
			}

			await update();
		};
	};
</script>

<Card.Root class="mx-auto w-full max-w-sm">
	<Card.Header>
		<Card.Title class="text-2xl">Masuk</Card.Title>
		<Card.Description>Masukkan email kamu buat login</Card.Description>
	</Card.Header>
	<Card.Content>
		<form action="?/login" method="post" use:enhance={handleSubmit}>
			<div class="grid gap-4">
				<div class="grid gap-2">
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
				<div class="grid gap-2">
					<div class="flex items-center">
						<Label for="password">Password</Label>
						<a href="/auth/reset_password" class="ml-auto inline-block text-sm underline">
							Lupa Password?
						</a>
					</div>
					<Input
						id="password"
						type="password"
						name="password"
						disabled={isLoading}
						placeholder=""
						required
					/>
				</div>
				{#if !isLoading}
					<Button type="submit" class="w-full">Masuk</Button>
				{:else}
					<Button type="submit" class="w-full" disabled>Bentar...</Button>
				{/if}
			</div>
		</form>
		<div class="mt-4 text-center text-sm">
			Belum punya akun ya?
			<a href="/auth/signup" class="underline"> Daftar </a>
		</div>
	</Card.Content>
</Card.Root>
