<script lang="ts">
	import GalleryVerticalEndIcon from '@lucide/svelte/icons/gallery-vertical-end';
	import { Label } from '$lib/components/ui/label/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { toast } from 'svelte-sonner';
	import { enhance } from '$app/forms';
	import type { SubmitFunction } from '@sveltejs/kit';

	let isLoading = $state(false);

	const handleSubmit: SubmitFunction = ({ formData, submitter, cancel }) => {
		isLoading = true;
		const action = 'reset';

		return async ({ result, update }) => {
			isLoading = false;

			if (result.type === 'failure') {
				toast.error(`Reset failed`, {
					description: result.data?.message || 'An error occurred',
					duration: 5000
				});
			} else if (result.type === 'success') {
				toast.success('Reset Password', {
					description: 'Please check your email for the reset link.',
					duration: 5000
				});
			}

			await update();
		};
	};
</script>

<div class="flex flex-col gap-6">
	<form method="post" action="?/reset" use:enhance={handleSubmit}>
		<div class="flex flex-col gap-6">
			<div class="flex flex-col items-center gap-2">
				<a href="/" class="flex flex-col items-center gap-2 font-medium">
					<div class="flex size-8 items-center justify-center rounded-md">
						<GalleryVerticalEndIcon class="size-6" />
					</div>
					<span class="sr-only">Reset Password</span>
				</a>
				<h1 class="text-xl font-medium">Reset Password Kamu</h1>
			</div>
			<div class="flex flex-col gap-6">
				<div class="grid gap-3">
					<Label for="email">Email</Label>
					<Input id="email" type="email" placeholder="Masukkan email kamu" required name="email" />
				</div>
				<Button type="submit" class="w-full" disabled={isLoading}>Kirim</Button>
			</div>
		</div>
	</form>
	<div
		class="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4"
	>
		Belum punya akun ya? <a href="/auth/signup" class="text-blue-600">Daftar</a>
	</div>
</div>
