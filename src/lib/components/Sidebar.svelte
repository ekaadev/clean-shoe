<script>
	import { goto } from '$app/navigation';
</script>

<div>
	<div class="mb-6 flex items-center justify-center text-2xl font-bold">Menu Admin</div>
	<ul class="flex-1 overflow-hidden">
		<li class="mb-2">
			<button
				class="group flex flex w-full items-center gap-3 rounded py-2 pr-4 pl-6 text-left hover:bg-[#173753] hover:text-white focus:outline-none"
				onclick={() => {
					goto('./orders');
				}}
			>
				<img
					src="/order.svg"
					alt="Logo Order"
					class="h-5 w-5 object-contain group-hover:brightness-0 group-hover:invert-100 group-hover:filter"
				/>
				Manage Order
			</button>
		</li>
		<li class="mb-2">
			<button
				class="
                    group flex w-full items-center gap-3 rounded py-2
                    pr-4 pl-6 text-left
                    hover:bg-[#173753] hover:text-white focus:outline-none
                "
				onclick={() => {
					goto('./services');
				}}
			>
				<img
					src="/services.svg"
					alt="Logo Service"
					class="h-5 w-5 object-contain group-hover:brightness-0 group-hover:invert-100 group-hover:filter"
				/>
				Manage Service
			</button>
		</li>
	</ul>
</div>
