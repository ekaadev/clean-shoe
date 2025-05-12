<script>
	const { data, children } = $props();
	let { supabase } = $derived(data);

	const logout = async () => {
		const { data, error } = await supabase.auth.getUser();
		if (data) {
			const { error } = await supabase.auth.signOut();
			if (error) {
				console.log(error);
			}
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
