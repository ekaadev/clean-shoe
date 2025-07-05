<script lang="ts">
	import * as Card from '@/components/ui/card/index';
	import { Label } from '@/components/ui/label/index';
	import { Input } from '@/components/ui/input/index';
	import { Button } from '@/components/ui/button/index';
	import { cn } from '$lib/utils';
	import image from '$lib/assets/placeholder.svg';
	import { toast } from 'svelte-sonner';
	import { enhance } from '$app/forms';
	import type { ActionData } from '../../routes/auth/$types';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { browser } from '$app/environment';

	let { form }: { form: ActionData } = $props();
	let isLoading = $state(false);

	const handleSubmit: SubmitFunction = ({ formData, submitter, cancel }) => {
		isLoading = true;
		const action = (submitter as HTMLButtonElement)?.formAction?.split('?/')[1] || 'login';

		return async ({ result, update }) => {
			isLoading = false;

			if (result.type === 'failure') {
				const actionType = action === 'login' ? 'Login' : 'Sign up';
				toast.error(`${actionType} failed`, {
					description: result.data?.message || 'An error occurred',
					duration: 5000
				});
			} else if (result.type === 'success') {
				const actionType = action === 'login' ? 'Logged in' : 'Account created';
				toast.success(actionType, {
					description: action === 'login' ? 'Welcome back!' : 'Welcome to Clean Shoe!',
					duration: 3000
				});

        if (browser) {
					window.location.href = '/';
        }
			}

			await update();
		};
	};
</script>

<div class={cn('flex flex-col gap-6')}>
	<Card.Root class="overflow-hidden p-0">
		<Card.Content class="grid p-0 md:grid-cols-2">
			<form class="p-6 md:p-8" action="?/login" method="post" use:enhance={handleSubmit}>
				<div class="flex flex-col gap-6">
					<div class="flex flex-col items-center text-center">
						<h1 class="text-2xl font-bold">Welcome back</h1>
						<p class="text-muted-foreground text-balance">
							Simplify your authentication process with one click.
						</p>
					</div>
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
							<a
								href="/auth/password_reset"
								class="text-muted-foreground ml-auto text-sm underline-offset-2 hover:underline"
							>
								Forgot your password?
							</a>
						</div>
						<Input id="password" type="password" required name="password" disabled={isLoading} />
					</div>
					<Button type="submit" class="w-full" disabled={isLoading}>
						{isLoading ? 'Logging in...' : 'Login'}
					</Button>
					<div
						class="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t"
					>
						<span class="bg-card text-muted-foreground relative z-10 px-2"> Or continue with </span>
					</div>
					<Button
						type="submit"
						class="w-full"
						variant="outline"
						formaction="?/signup"
						disabled={isLoading}
					>
						{isLoading ? 'Creating account...' : 'Sign Up'}
					</Button>
				</div>
			</form>
			<div class="bg-muted relative hidden md:block">
				<img
					src={image}
					alt="placeholder"
					class="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
				/>
			</div>
		</Card.Content>
	</Card.Root>
</div>
