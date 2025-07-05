<script lang="ts">
	import * as Card from '@/components/ui/card/index';
	import * as DropdownMenu from '@/components/ui/dropdown-menu/index';
	import * as Drawer from '@/components/ui/drawer/index';
	import { Button } from '@/components/ui/button/index';
	import { AspectRatio } from '@/components/ui/aspect-ratio/index';
	import { toIndonesianCurrency } from '@/helper/currency';
	import { IsMobile } from '@/hooks/is-mobile.svelte';
	import { Label } from '@/components/ui/label/index';
	import { Input } from '@/components/ui/input/index';
	import { Textarea } from '@/components/ui/textarea/index';
	import { toast } from 'svelte-sonner';
	import Ellipsis from '@lucide/svelte/icons/ellipsis';
	import * as Form from '@/components/ui/form/index';
	import { clientFormSchema, type ClientFormSchema } from '../service-management/schemas';
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';

	type Service = {
		id: string;
		name: string;
		description: string;
		price: number;
		estimated_days: number;
		image_url?: string;
		created_at?: string;
		updated_at?: string;
	};

	const isMobile = new IsMobile();

	const { data } = $props();

	let editDrawerOpen = $state(false);
	let selectedService = $state<Service | null>(null);
	let imagePreview = $state<string | null>(null);

	const form = superForm(data.form as SuperValidated<Infer<ClientFormSchema>>, {
		validators: zodClient(clientFormSchema),
		onUpdated: ({ form }) => {
			if (form.valid) {
				// Close drawer on successful submission
				editDrawerOpen = false;
				selectedService = null;
				imagePreview = null;
				console.log('Service updated successfully!');
			}
		},
		onError: ({ result }) => {
			// console.error('Form submission error:', result);
			console.error('Form submission error');
		},
		onResult: ({ result }) => {
			// console.log('Form result:', result);
			console.log('Form result received');
			if (result.type === 'success') {
				toast.success('Service updated successfully!');
				editDrawerOpen = false; // Close the drawer
			} else if (result.type === 'failure') {
				toast.error('Failed to update service. Please try again.');
			}
		}
	});

	const { form: formData, enhance } = form;

	function openEditDrawer(service: Service) {
		selectedService = service;

		// Sync form data with selected service
		$formData.id = service.id;
		$formData.name = service.name;
		$formData.description = service.description;
		$formData.price = service.price;
		$formData.estimated_days = service.estimated_days;

		// Reset image preview to current image
		imagePreview = service.image_url || null;

		editDrawerOpen = true;
	}

	function handleImageChange(event: Event) {
		const target = event.target as HTMLInputElement;
		const file = target.files?.[0];

		if (file) {
			// Create preview URL
			const reader = new FileReader();
			reader.onload = (e) => {
				imagePreview = e.target?.result as string;
			};
			reader.readAsDataURL(file);
		}
	}
</script>

<div class="flex w-full flex-col justify-start gap-6">
	<div class="flex flex-col gap-2 px-4 lg:px-6">
		<div class="grid grid-cols-1 gap-4 *:data-[slot=card]:shadow-xs md:grid-cols-2">
			{#each data.services as service, index}
				<Card.Root class="@container/card cursor-pointer">
					<Card.Header>
						<Card.Action>
							<DropdownMenu.Root>
								<DropdownMenu.Trigger>
									<Button variant="ghost" size="icon">
										<Ellipsis class="h-4 w-4" />
									</Button>
								</DropdownMenu.Trigger>
								<DropdownMenu.Content
									class="w-(--bits-dropdown-menu-anchor-width) min-w-24 rounded-lg"
									align="end"
									sideOffset={4}
								>
									<DropdownMenu.Group>
										<DropdownMenu.Item onSelect={() => openEditDrawer(service)}>
											Edit
										</DropdownMenu.Item>
									</DropdownMenu.Group>
								</DropdownMenu.Content>
							</DropdownMenu.Root>
						</Card.Action>
					</Card.Header>
					<Card.Content>
						<AspectRatio ratio={16 / 9} class="bg-muted">
							<img
								src={service.image_url ||
									'https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80'}
								alt={service.name}
								class="h-full w-full rounded-md object-cover"
							/>
						</AspectRatio>
					</Card.Content>
					<Card.Footer class="flex-1 flex-col items-start gap-1.5 text-sm">
						<Card.Title class="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
							{service.name}
						</Card.Title>
						<Card.Description
							class="text-muted-foreground line-clamp-1 flex flex-1 gap-2 text-sm tabular-nums md:text-base"
						>
							{service.description}
						</Card.Description>
						<div class="mt-2 flex w-full flex-row items-center justify-between md:mt-4">
							<p class="text-muted-foreground text-sm font-semibold md:text-base">Estimated Days</p>
							<p class=" text-sm font-semibold md:text-base">
								{service.estimated_days} Days
							</p>
						</div>
						<div class="flex w-full flex-row items-center justify-between">
							<p class="text-muted-foreground text-sm font-semibold md:text-base">Price</p>
							<p class="text-sm font-semibold md:text-base">
								{toIndonesianCurrency(service.price)}
							</p>
						</div>
					</Card.Footer>
				</Card.Root>
			{/each}
		</div>
	</div>
</div>

<!-- Edit Service Drawer -->
<Drawer.Root bind:open={editDrawerOpen} direction={isMobile.current ? 'bottom' : 'right'}>
	<Drawer.Content
		class="data-[vaul-drawer-direction=right]:w-[85vw] data-[vaul-drawer-direction=right]:sm:max-w-2xl"
	>
		<form
			method="post"
			action="?/patch"
			use:enhance
			enctype="multipart/form-data"
			id="edit-service-form-{selectedService?.id}"
			class="flex h-full flex-col overflow-y-auto"
		>
			<Drawer.Header class="border-b pb-4">
				<Drawer.Title>Edit Service</Drawer.Title>
				<Drawer.Description>Make changes to the service details.</Drawer.Description>
			</Drawer.Header>

			{#if selectedService}
				<!-- Hidden ID field -->
				<input type="hidden" name="id" bind:value={$formData.id} />

				<div class="flex flex-col gap-4 overflow-y-auto p-4 text-sm">
					<div class="grid grid-cols-12 items-start">
						<div class="col-span-4 flex flex-col">
							<Label>Service ID</Label>
						</div>
						<div class="col-span-8 flex flex-col">
							<Input value={selectedService.id} disabled class="w-full" />
						</div>
					</div>
					<div class="grid grid-cols-12 items-start">
						<div class="col-span-4 flex flex-col">
							<Label>Service Name</Label>
						</div>
						<div class="col-span-8 flex flex-col">
							<Form.Field {form} name="name">
								<Form.Control>
									{#snippet children({ props })}
										<Input bind:value={$formData.name} class="w-full" {...props} />
									{/snippet}
								</Form.Control>
								<Form.FieldErrors />
							</Form.Field>
						</div>
					</div>
					<div class="grid grid-cols-12 items-start">
						<div class="col-span-4 flex flex-col">
							<Label>Description</Label>
						</div>
						<div class="col-span-8 flex flex-col">
							<Form.Field {form} name="description">
								<Form.Control>
									{#snippet children({ props })}
										<Textarea bind:value={$formData.description} class="w-full" {...props} />
									{/snippet}
								</Form.Control>
								<Form.FieldErrors />
							</Form.Field>
						</div>
					</div>
					<div class="grid grid-cols-12 items-start">
						<div class="col-span-4 flex flex-col">
							<Label>Estimated Days</Label>
						</div>
						<div class="col-span-8 flex flex-col">
							<Form.Field {form} name="estimated_days">
								<Form.Control>
									{#snippet children({ props })}
										<Input
											bind:value={$formData.estimated_days}
											type="number"
											class="w-full"
											{...props}
										/>
									{/snippet}
								</Form.Control>
								<Form.FieldErrors />
							</Form.Field>
						</div>
					</div>
					<div class="grid grid-cols-12 items-start">
						<div class="col-span-4 flex flex-col">
							<Label>Price</Label>
						</div>
						<div class="col-span-8 flex flex-col">
							<Form.Field {form} name="price">
								<Form.Control>
									{#snippet children({ props })}
										<Input
											bind:value={$formData.price}
											type="number"
											step="0.01"
											class="w-full"
											{...props}
										/>
									{/snippet}
								</Form.Control>
								<Form.FieldErrors />
							</Form.Field>
						</div>
					</div>
					<div class="grid grid-cols-12 items-start">
						<div class="col-span-4 flex flex-col">
							<Label>Image</Label>
						</div>
						<div class="col-span-8 flex flex-col gap-2">
							<!-- Current/Preview Image -->
							{#if imagePreview}
								<div class="w-full max-w-xs">
									<img
										src={imagePreview}
										alt="Service preview"
										class="h-32 w-full rounded-md border object-cover"
									/>
								</div>
							{/if}

							<!-- File Input -->
							<Input name="image_file" type="file" accept="image/*" onchange={handleImageChange} />

							<p class="text-muted-foreground text-xs">
								Upload a new image to replace the current one. Accepted formats: JPG, PNG, WebP
							</p>
						</div>
					</div>
				</div>
			{/if}

			<Drawer.Footer class="flex flex-row items-center justify-end gap-2 border-t pt-6">
				<Drawer.Close>
					<Button variant="outline">Cancel</Button>
				</Drawer.Close>
				<Button type="submit" form="edit-service-form-{selectedService?.id}">Submit</Button>
			</Drawer.Footer>
		</form>
	</Drawer.Content>
</Drawer.Root>
