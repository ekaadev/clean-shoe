<script lang="ts">
	import * as DropdownMenu from '@/components/ui/dropdown-menu/index';
	import * as NavigationMenu from '@/components/ui/navigation-menu/index';
	import * as Drawer from '@/components/ui/drawer/index';
	import { Button } from '@/components/ui/button/index';
	import { toggleMode } from 'mode-watcher';
	import SunIcon from '@lucide/svelte/icons/sun';
	import MoonIcon from '@lucide/svelte/icons/moon';
	import AlignRightIcon from '@lucide/svelte/icons/align-right';
	import CloseIcon from '@lucide/svelte/icons/x';
	import LogoutIcon from '@tabler/icons-svelte/icons/logout';
	import UserCircleIcon from '@tabler/icons-svelte/icons/user-circle';
	import ShoppingCartIcon from '@lucide/svelte/icons/shopping-cart';
	import { page } from '$app/state';
	import { goto } from '$app/navigation';
	import { toast } from 'svelte-sonner';

	import { IsMobile } from '@/hooks/is-mobile.svelte';

	import { cartItemCount } from '$lib/helper/cart-handler';

	const menu: { title: string; href: string }[] = [
		{
			title: 'Beranda',
			href: '/'
		},
		{
			title: 'Layanan',
			href: '/services'
		},
		{
			title: 'Cek Pesanan',
			href: '/orders'
		}
	];

	const isMobile = new IsMobile();

	const logout = async () => {
		console.log('Logging out user:', page.data.user?.email);
		try {
			// Get supabase from page data (available from root layout)
			const supabase = page.data.supabase;
			if (!supabase) {
				// console.error('Supabase client not available');
				return;
			}

			const { error } = await supabase.auth.signOut();
			if (error) {
				// console.error('logout error:', error);
				return;
			} else {
				await goto('/auth/login');
			}
		} catch (error) {
			toast.error('Gagal keluar. Silakan coba lagi.');
		}
	};
</script>

<!-- Mobile Drawer Navigation -->
<div class="md:hidden">
	<Drawer.Root direction="right">
		<div
			class="bg-background sticky top-0 z-50 flex flex-row items-center justify-between border-b p-4"
		>
			<a href="/" class="block font-semibold">Clean Shoe</a>
			<div class="flex flex-row items-center gap-2">
				<Button onclick={toggleMode} variant="outline" size="icon">
					<SunIcon class="h-[1.2rem] w-[1.2rem] transition-all dark:scale-0 dark:-rotate-90" />
					<MoonIcon
						class="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0"
					/>
				</Button>

				<a href="/checkout" class="relative">
					<Button variant="outline" size="icon"><ShoppingCartIcon class="h-5 w-5" /></Button>
					{#if $cartItemCount > 0}
						<span
							class="bg-primary text-primary-foreground absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full text-xs"
						>
							{$cartItemCount}
						</span>
					{/if}
				</a>

				<Drawer.Trigger class="flex items-center justify-center">
					<Button variant="outline" size="icon"><AlignRightIcon class="h-5 w-5" /></Button>
				</Drawer.Trigger>
			</div>
		</div>

		<Drawer.Content>
			<Drawer.Header class="flex flex-row items-start justify-between">
				<div class="flex w-full flex-col gap-2 px-4 py-1">
					{#each menu as item}
						<Drawer.Close class="block text-start font-semibold">
							<a href={item.href}>{item.title}</a>
						</Drawer.Close>
					{/each}
				</div>
				<Drawer.Close>
					<Button variant="outline" size="icon"><CloseIcon class="h-5 w-5" /></Button>
				</Drawer.Close>
			</Drawer.Header>
			<Drawer.Footer class="flex flex-col items-start gap-2 px-4">
				{#if page.data.user && page.data.profile}
					<DropdownMenu.Root>
						<DropdownMenu.Trigger
							class="flex w-full flex-row items-center gap-2 rounded-lg border px-3 py-2"
						>
							<UserCircleIcon class="h-5 w-5" />
							<div class="flex flex-col">
								<span class="text-left text-xs"
									>{page.data.profile.name || 'Nama masih kosong'}</span
								>
								<span class="text-muted-foreground text-left text-xs"
									>{page.data.profile.email || 'Email masih kosong'}</span
								>
							</div>
						</DropdownMenu.Trigger>
						<DropdownMenu.Content
							class="w-[--radix-dropdown-menu-content-available-width]"
							align="end"
							sideOffset={4}
						>
							<DropdownMenu.Group>
								<DropdownMenu.Item>
									<UserCircleIcon />
									<Drawer.Close>
										<a href="/profile">Profil</a>
									</Drawer.Close>
								</DropdownMenu.Item>
								{#if page.data.profile && page.data.profile.role === 'admin'}
									<DropdownMenu.Item>
										<LogoutIcon />
										<a href="/admin">Kembali ke dashboard</a>
									</DropdownMenu.Item>
								{/if}
								<DropdownMenu.Separator />
								<DropdownMenu.Item onclick={logout}>
									<LogoutIcon />
									Keluar</DropdownMenu.Item
								>
							</DropdownMenu.Group>
						</DropdownMenu.Content>
					</DropdownMenu.Root>
				{:else}
					<Button variant="outline" href="/auth/login" class="w-full">Masuk</Button>
					<Button href="/auth/signup" class="w-full">Daftar</Button>
				{/if}
			</Drawer.Footer>
		</Drawer.Content>
	</Drawer.Root>
</div>

<!-- Desktop Navigation -->
<nav class="bg-background sticky top-0 z-50 hidden w-full flex-col border-b md:flex">
	<div class="container mx-auto flex flex-row items-center justify-between py-4">
		<NavigationMenu.Root>
			<NavigationMenu.List>
				<NavigationMenu.Item>
					<a href="/" class="font-semibold">Clean Shoe</a>
				</NavigationMenu.Item>
			</NavigationMenu.List>
		</NavigationMenu.Root>
		<div class="flex flex-row items-center gap-6">
			<NavigationMenu.Root>
				<NavigationMenu.List>
					{#each menu as item}
						<NavigationMenu.Item>
							<NavigationMenu.Link href={item.href}>{item.title}</NavigationMenu.Link>
						</NavigationMenu.Item>
					{/each}
				</NavigationMenu.List>
			</NavigationMenu.Root>

			<div class="flex flex-row items-center gap-2">
				<a href="/checkout" class="relative">
					<Button variant="outline" size="icon" class="cursor-pointer"
						><ShoppingCartIcon class="h-5 w-5" /></Button
					>
					{#if $cartItemCount > 0}
						<span
							class="bg-primary text-primary-foreground absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full text-xs"
						>
							{$cartItemCount}
						</span>
					{/if}
				</a>

				<Button onclick={toggleMode} variant="outline" size="icon" class="cursor-pointer">
					<SunIcon class="h-[1.2rem] w-[1.2rem] transition-all dark:scale-0 dark:-rotate-90" />
					<MoonIcon
						class="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0"
					/>
					<span class="sr-only">Toggle theme</span>
				</Button>

				<!-- Auth / Dropdown tetap sama -->
				{#if page.data.user && page.data.profile}
					<DropdownMenu.Root>
						<DropdownMenu.Trigger>
							<Button variant="outline" size="icon" class="cursor-pointer rounded-full">
								{page.data.profile.name[0] || 'U'}
							</Button>
						</DropdownMenu.Trigger>
						<DropdownMenu.Content
							class="w-56 min-w-[var(--radix-dropdown-menu-trigger-width)] rounded-lg"
							align="end"
							sideOffset={4}
						>
							<DropdownMenu.Group>
								<DropdownMenu.Item>
									<UserCircleIcon />
									<a href="/profile" class="w-full">Profil</a>
								</DropdownMenu.Item>
								{#if page.data.profile && page.data.profile.role === 'admin'}
									<DropdownMenu.Item>
										<LogoutIcon />
										<a href="/admin" class="w-full">Kembali ke dashboard</a>
									</DropdownMenu.Item>
								{/if}
								<DropdownMenu.Separator />
								<DropdownMenu.Item
									onclick={logout}
									class="cursor-pointer text-red-500 dark:text-red-400"
								>
									<LogoutIcon />
									Keluar</DropdownMenu.Item
								>
							</DropdownMenu.Group>
						</DropdownMenu.Content>
					</DropdownMenu.Root>
				{:else}
					<Button variant="outline" href="/auth/login">Masuk</Button>
					<Button href="/auth/signup">Daftar</Button>
				{/if}
			</div>
		</div>
	</div>
</nav>
