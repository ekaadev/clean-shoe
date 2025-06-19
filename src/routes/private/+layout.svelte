<script>
	import { goto } from '$app/navigation';

	const { data, children } = $props();
	let { supabase } = $derived(data);

	const logout = async () => {
		const { data } = await supabase.auth.getUser();
		if (data) {
			const { error } = await supabase.auth.signOut();
			if (error) {
				console.log(error);
			}
			await goto('/auth');
		} else {
			console.log('No user found');
		}
	};
</script>

<header>
	<nav>
		<a href="/">Home</a>
	</nav>
	<button onclick={logout}>Logout</button>
</header>

<main>
	{@render children()}
</main>
