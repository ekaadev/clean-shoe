<script lang="ts">
	import type { ActionData } from '../../routes/auth/$types';
	import GalleryVerticalEndIcon from '@lucide/svelte/icons/gallery-vertical-end';
	import { Label } from '$lib/components/ui/label/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { toast } from 'svelte-sonner';
	import { enhance } from '$app/forms';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { goto } from '$app/navigation';

	let password = $state('');
	let confirmPassword = $state('');

	let isMatch = $derived(password === confirmPassword);

	let isLoading = $state(false);

	const handleSubmit: SubmitFunction = ({ formData, submitter, cancel }) => {
		isLoading = true;
		const action = 'update';

		return async ({ result, update }) => {
			isLoading = false;

			if (result.type === 'failure') {
				toast.error(`Update failed`, {
					description: result.data?.message || 'An error occurred',
					duration: 5000
				});
			} else if (result.type === 'success') {
				toast.success('Update Password', {
					description: 'Your password has been updated successfully.',
					duration: 5000
				});

				await goto('/auth');
			}

			await update();
		};
	};
</script>

<div class="flex flex-col gap-6">
	<form method="post" action="?/update" use:enhance={handleSubmit}>
		<div class="flex flex-col gap-6">
			<div class="flex flex-col items-center gap-2">
				<a href="/" class="flex flex-col items-center gap-2 font-medium">
					<div class="flex size-8 items-center justify-center rounded-md">
						<GalleryVerticalEndIcon class="size-6" />
					</div>
					<span class="sr-only">Reset Password</span>
				</a>
				<h1 class="text-xl font-medium">Reset your password</h1>
			</div>
			<div class="flex flex-col gap-6">
				<div class="grid gap-3">
					<Label for="password">Password</Label>
					<Input id="password" type="password" required name="password" bind:value={password} />
				</div>
				<div class="grid gap-3">
					<Label for="confirmPassword">Confirm Password</Label>
					<Input
						id="confirmPassword"
						type="password"
						required
						name="confirmPassword"
						bind:value={confirmPassword}
					/>
				</div>
				<Button type="submit" class="w-full" disabled={!isMatch || isLoading}>Send</Button>
			</div>
		</div>
	</form>
</div>
