<script lang="ts">
	import * as Card from '@/components/ui/card/index';
	import { Label } from '@/components/ui/label/index';
	import { Input } from '@/components/ui/input/index';
	import { Button } from '@/components/ui/button/index';
	import { cn } from '$lib/utils';
	import type { HTMLAttributes } from 'svelte/elements';
	import image from '$lib/assets/placeholder.svg';

	let { class: className, ...restProps }: HTMLAttributes<HTMLDivElement> = $props();
</script>

<div class={cn('flex flex-col gap-6', className)} {...restProps}>
	<Card.Root class="overflow-hidden p-0">
		<Card.Content class="grid p-0 md:grid-cols-2">
			<form class="p-6 md:p-8" action="?/login" method="post">
				<div class="flex flex-col gap-6">
					<div class="flex flex-col items-center text-center">
						<h1 class="text-2xl font-bold">Welcome back</h1>
						<p class="text-muted-foreground text-balance">Login to your Clean Shoe account</p>
					</div>
					<div class="grid gap-3">
						<Label for="email">Email</Label>
						<Input id="email" type="email" placeholder="m@example.com" required name="email" />
					</div>
					<div class="grid gap-3">
						<div class="flex items-center">
							<Label for="password">Password</Label>
							<a href="##" class="ml-auto text-sm underline-offset-2 hover:underline">
								Forgot your password?
							</a>
						</div>
						<Input id="password" type="password" required name="password" />
					</div>
					<Button type="submit" class="w-full">Login</Button>
					<div
						class="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t"
					>
						<span class="bg-card text-muted-foreground relative z-10 px-2"> Or continue with </span>
					</div>
					<Button type="submit" class="w-full" variant="outline" formaction="?/signup"
						>Sign Up</Button
					>
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
	<div
		class="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4"
	>
		By clicking continue, you agree to our <a href="##">Terms of Service</a> and
		<a href="##">Privacy Policy</a>.
	</div>
</div>
