<script lang="ts">
	import ChartBarIcon from '@tabler/icons-svelte/icons/chart-bar';
	import DashboardIcon from '@tabler/icons-svelte/icons/dashboard';
	import InnerShadowTopIcon from '@tabler/icons-svelte/icons/inner-shadow-top';
	import ListDetailsIcon from '@tabler/icons-svelte/icons/list-details';
	import NavMain from './nav-main.svelte';
	import NavUser from './nav-user.svelte';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import type { ComponentProps } from 'svelte';
	import { page } from '$app/state';

	let { ...restProps }: ComponentProps<typeof Sidebar.Root> = $props();

	const data = {
		user: {
			name: page.data.profile.name || 'No Name',
			email: page.data.profile.email || 'No Email',
			avatar: 'https://github.com/shadcn.png'
		},
		navMain: [
			{
				title: 'Dashboard',
				url: '/admin',
				icon: DashboardIcon
			},
			{
				title: 'Service Management',
				url: '/admin/services',
				icon: ListDetailsIcon
			},
			{
				title: 'Order Management',
				url: '/admin/orders',
				icon: ChartBarIcon
			}
		]
	};
</script>

<Sidebar.Root collapsible="offcanvas" {...restProps}>
	<Sidebar.Header>
		<Sidebar.Menu>
			<Sidebar.MenuItem>
				<Sidebar.MenuButton class="data-[slot=sidebar-menu-button]:!p-1.5">
					{#snippet child({ props })}
						<a href="/" {...props}>
							<InnerShadowTopIcon class="!size-5" />
							<span class="text-base font-semibold">Clean Shoe</span>
						</a>
					{/snippet}
				</Sidebar.MenuButton>
			</Sidebar.MenuItem>
		</Sidebar.Menu>
	</Sidebar.Header>
	<Sidebar.Content>
		<NavMain items={data.navMain} />
	</Sidebar.Content>
	<Sidebar.Footer>
		<NavUser user={data.user} />
	</Sidebar.Footer>
</Sidebar.Root>
