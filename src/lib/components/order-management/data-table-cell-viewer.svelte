<script lang="ts">
	import {
		type DateValue,
		DateFormatter,
		getLocalTimeZone,
		parseAbsolute
	} from '@internationalized/date';
	import { cn } from '$lib/utils';
	import { Calendar } from '@/components/ui/calendar/index';
	import { buttonVariants } from '$lib/components/ui/button/index';
	import * as Popover from '@/components/ui/popover/index';
	import * as Drawer from '@/components/ui/drawer/index';
	import * as Table from '@/components/ui/table/index';
	import * as Select from '@/components/ui/select/index';
	import { Button } from '@/components/ui/button/index';
	import { IsMobile } from '@/hooks/is-mobile.svelte';
	import { Label } from '@/components/ui/label/index';
	import { Input } from '@/components/ui/input/index';
	import { Separator } from '@/components/ui/separator/index';
	import { toIndonesianCurrency } from '@/helper/currency';
	import CalendarIcon from '@lucide/svelte/icons/calendar';
	import * as Form from '@/components/ui/form/index';
	import { formSchema, type FormSchema } from './schemas';
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { page } from '$app/state';
	import { onMount } from 'svelte';
	import { toast } from 'svelte-sonner';

	let { item } = $props();

	// State to control drawer open/close
	let drawerOpen = $state(false);

	// console.log('Item received:', item);
	console.log('Item received');
	// console.log('Page data form:', page.data.form);
	console.log('Page data form');

	const form = superForm(page.data.form as SuperValidated<Infer<FormSchema>>, {
		id: `order-form-${item.id}`,
		validators: zodClient(formSchema),
		onSubmit: ({ formElement, formData, cancel }) => {
			console.log('Form submitting...');
			// console.log('Form element:', formElement);
			console.log('Form element');
			// console.log('Form data entries:', [...formData.entries()]);
			console.log('Form data entries');
			// console.log('Current formData store:', formData);
			console.log('Current formData store');

			// Check if required fields are present
			const currentFormData = formData.get('id');
			if (!currentFormData) {
				console.error('ID is missing!');
				cancel();
				return;
			}
		},
		onResult: ({ result }) => {
			// console.log('Form result:', result);
			console.log('Form result received');
			if (result.type === 'success') {
				toast.success('Order updated successfully!');
				drawerOpen = false; // Close the drawer
			} else if (result.type === 'failure') {
				toast.error('Failed to update order. Please try again.');
			}
		},
		onError: ({ result }) => {
			// console.log('Form error:', result);
			console.log('Form error');
			toast.error('An error occurred while updating the order.');
		},
		onUpdated: ({ form }) => {
			// console.log('Form updated:', form);
			console.log('Form updated');
		}
	});

	const { form: formData, enhance } = form;

	const isMobile = new IsMobile();

	const orderStatuses = [
		{ value: 'pending', label: 'Pending' },
		{ value: 'confirmed', label: 'Confirmed' },
		{ value: 'processing', label: 'Processing' },
		{ value: 'ready_for_delivery', label: 'Ready For Delivery' },
		{ value: 'delivered', label: 'Delivered' },
		{ value: 'cancelled', label: 'Cancelled' }
	];

	// state for order status
	// let orderStatusState = $state(item.status ?? '');
	//
	// const triggerContentOrderStatus = $derived(
	// 	orderStatuses.find((s) => s.value === orderStatusState)?.label ?? 'Select Status'
	// );

	const paymentStatuses = [
		{ value: 'pending', label: 'Pending' },
		{ value: 'paid', label: 'Paid' },
		{ value: 'failed', label: 'Failed' }
	];

	// state for payment status
	// let paymentStatusState = $state(item.payment_status ?? '');
	//
	// const triggerContentPaymentStatus = $derived(
	// 	paymentStatuses.find((ps) => ps.value === paymentStatusState)?.label ?? 'Select Payment Status'
	// );

	// date
	const df = new DateFormatter('en-US', {
		dateStyle: 'long'
	});

	let pickupDateState = $state<DateValue | undefined>(
		item.pickup_date ? parseAbsolute(item.pickup_date, getLocalTimeZone()) : undefined
	);

	let pickupDateValue = $derived(
		pickupDateState ? pickupDateState.toDate(getLocalTimeZone()) : undefined
	);

	let deliveryDateState = $state<DateValue | undefined>(
		item.delivery_date ? parseAbsolute(item.delivery_date, getLocalTimeZone()) : undefined
	);

	let deliveryDateValue = $derived(
		deliveryDateState ? deliveryDateState.toDate(getLocalTimeZone()) : undefined
	);

	onMount(() => {
		// console.log('Setting form data with item:', item);
		console.log('Setting form data with item');
		$formData.id = item.id;
		$formData.status = item.status ?? '';
		$formData.payment_status = item.payment_status ?? '';
		$formData.pickup_date = item.pickup_date ?? '';
		$formData.delivery_date = item.delivery_date ?? '';
		// console.log('Form data after setting:', $formData);
		console.log('Form data after setting');
	});

	// Function to handle pickup date change
	const handlePickupDateChange = (value: DateValue | undefined) => {
		pickupDateState = value;
		if (value) {
			$formData.pickup_date = value.toDate(getLocalTimeZone()).toISOString();
		} else {
			$formData.pickup_date = '';
		}
	};

	// Function to handle delivery date change
	const handleDeliveryDateChange = (value: DateValue | undefined) => {
		deliveryDateState = value;
		if (value) {
			$formData.delivery_date = value.toDate(getLocalTimeZone()).toISOString();
		} else {
			$formData.delivery_date = '';
		}
	};
</script>

<Drawer.Root direction={isMobile.current ? 'bottom' : 'right'} bind:open={drawerOpen}>
	<Drawer.Trigger>
		{#snippet child({ props })}
			<Button
				variant="link"
				class="text-foreground w-fit px-0 text-left hover:underline"
				{...props}
			>
				See Details
			</Button>
		{/snippet}
	</Drawer.Trigger>
	<Drawer.Content
		class="data-[vaul-drawer-direction=right]:w-[85vw] data-[vaul-drawer-direction=right]:sm:max-w-2xl"
	>
		<form
			method="post"
			use:enhance
			action="?/patch"
			id="order-form-{item.id}"
			class="flex h-full flex-col overflow-y-auto"
		>
			<Drawer.Header class="border-b pb-4">
				<Drawer.Title>Order Details</Drawer.Title>
				<Drawer.Description>View and manage order information</Drawer.Description>
			</Drawer.Header>

			<div class="flex flex-col gap-4 overflow-y-auto p-4 text-sm">
				<div class="grid grid-cols-12 items-center">
					<div class="col-span-4 flex flex-col">
						<Label>Order ID</Label>
					</div>
					<div class="col-span-8 flex flex-col">
						<Input value={item.id} disabled class="w-full" />
					</div>
				</div>
				<div class="grid grid-cols-12 items-center">
					<div class="col-span-4 flex flex-col">
						<Label>Invoice ID</Label>
					</div>
					<div class="col-span-8 flex flex-col">
						<Input value={item.invoice_id} disabled class="w-full" />
					</div>
				</div>
				<div class="grid grid-cols-12 items-center">
					<div class="col-span-4 flex flex-col">
						<Label>User ID</Label>
					</div>
					<div class="col-span-8 flex flex-col">
						<Input value={item.user_id ? item.user_id : 'Guest'} disabled class="w-full" />
					</div>
				</div>
				<div class="grid grid-cols-12 items-center">
					<div class="col-span-4 flex flex-col">
						<Label>Status</Label>
					</div>
					<div class="col-span-8 flex flex-col">
						<Form.Field {form} name="status">
							<Form.Control>
								{#snippet children({ props })}
									<Select.Root
										type="single"
										name={props.name}
										bind:value={$formData.status}
										onValueChange={(value) => {
											$formData.status = value ?? '';
											// console.log('Status changed to:', value);
											console.log('Status changed');
										}}
									>
										<Select.Trigger class="w-full capitalize" {...props}
											>{$formData.status
												? $formData.status.replace(/[-_]/g, ' ')
												: 'Select Status'}</Select.Trigger
										>
										<Select.Content>
											<Select.Group>
												<Select.Label>Status</Select.Label>
												{#each orderStatuses as status (status.value)}
													<Select.Item value={status.value} label={status.label}>
														{status.label}
													</Select.Item>
												{/each}
											</Select.Group>
										</Select.Content>
									</Select.Root>
								{/snippet}
							</Form.Control>
							<Form.FieldErrors />
						</Form.Field>
					</div>
				</div>
				<div class="grid grid-cols-12 items-center">
					<div class="col-span-4 flex flex-col">
						<Label>Payment Status</Label>
					</div>
					<div class="col-span-8 flex flex-col">
						<Form.Field {form} name="payment_status">
							<Form.Control>
								{#snippet children({ props })}
									<Select.Root
										type="single"
										name={props.name}
										bind:value={$formData.payment_status}
										onValueChange={(value) => {
											$formData.payment_status = value ?? '';
											// console.log('Payment status changed to:', value);
											console.log('Payment status changed');
										}}
									>
										<Select.Trigger class="w-full capitalize" {...props}
											>{$formData.payment_status
												? $formData.payment_status.replace(/[-_]/g, ' ')
												: 'Select Status'}</Select.Trigger
										>
										<Select.Content>
											<Select.Group>
												<Select.Label>Status</Select.Label>
												{#each paymentStatuses as status (status.value)}
													<Select.Item value={status.value} label={status.label}>
														{status.label}
													</Select.Item>
												{/each}
											</Select.Group>
										</Select.Content>
									</Select.Root>
								{/snippet}
							</Form.Control>
							<Form.FieldErrors />
						</Form.Field>
					</div>
				</div>
				<div class="grid grid-cols-12 items-center">
					<div class="col-span-4 flex flex-col">
						<Label>Pickup Address</Label>
					</div>
					<div class="col-span-8 flex flex-col">
						<Input value={item.pickup_address} disabled class="w-full" />
					</div>
				</div>
				<div class="grid grid-cols-12 items-center">
					<div class="col-span-4 flex flex-col">
						<Label>Delivery Address</Label>
					</div>
					<div class="col-span-8 flex flex-col">
						<Input value={item.delivery_address} disabled class="w-full" />
					</div>
				</div>
				<div class="grid grid-cols-12 items-center">
					<div class="col-span-4 flex flex-col">
						<Label>Pickup Date</Label>
					</div>
					<div class="col-span-8 flex flex-col">
						<Form.Field {form} name="pickup_date">
							<Form.Control>
								{#snippet children({ props })}
									<Popover.Root>
										<Popover.Trigger
											{...props}
											class={cn(
												buttonVariants({
													variant: 'outline',
													class: 'w-full justify-start text-left font-normal'
												}),
												!pickupDateState && 'text-muted-foreground'
											)}
										>
											<CalendarIcon />
											{pickupDateState
												? df.format(pickupDateState.toDate(getLocalTimeZone()))
												: 'Pick a date'}</Popover.Trigger
										>
										<Popover.Content class="w-auto p-0">
											<Calendar
												bind:value={pickupDateState}
												type="single"
												initialFocus
												onValueChange={handlePickupDateChange}
											/>
										</Popover.Content>
									</Popover.Root>
								{/snippet}
							</Form.Control>
							<Form.FieldErrors />
						</Form.Field>
					</div>
				</div>
				<div class="grid grid-cols-12 items-center">
					<div class="col-span-4 flex flex-col">
						<Label>Delivery Date</Label>
					</div>
					<div class="col-span-8 flex flex-col">
						<Form.Field {form} name="delivery_date">
							<Form.Control>
								{#snippet children({ props })}
									<Popover.Root>
										<Popover.Trigger
											{...props}
											class={cn(
												buttonVariants({
													variant: 'outline',
													class: 'w-full justify-start text-left font-normal'
												}),
												!deliveryDateState && 'text-muted-foreground'
											)}
										>
											<CalendarIcon />
											{deliveryDateState
												? df.format(deliveryDateState.toDate(getLocalTimeZone()))
												: 'Pick a date'}</Popover.Trigger
										>
										<Popover.Content class="w-auto p-0">
											<Calendar
												bind:value={deliveryDateState}
												type="single"
												initialFocus
												onValueChange={handleDeliveryDateChange}
											/>
										</Popover.Content>
									</Popover.Root>
								{/snippet}
							</Form.Control>
							<Form.FieldErrors />
						</Form.Field>
					</div>
				</div>
				<div class="grid grid-cols-12 items-center">
					<div class="col-span-4 flex flex-col">
						<Label>Total Amount</Label>
					</div>
					<div class="col-span-8 flex flex-col">
						<Input value={toIndonesianCurrency(item.total_amount)} disabled class="w-full" />
					</div>
				</div>

				<Separator class="my-2" />

				<div class="rounded-lg border">
					<Table.Root>
						<Table.Header class="bg-muted text-muted-foreground sticky top-0 z-10">
							<Table.Head>No</Table.Head>
							<Table.Head>Name</Table.Head>
							<Table.Head>Quantity</Table.Head>
							<Table.Head>Price</Table.Head>
						</Table.Header>
						<Table.Body>
							{#each item.order_items as value, index}
								<Table.Row>
									<Table.Cell>{index + 1}</Table.Cell>
									<Table.Cell>{value.services.name}</Table.Cell>
									<Table.Cell>{value.quantity}</Table.Cell>
									<Table.Cell>{toIndonesianCurrency(value.price)}</Table.Cell>
								</Table.Row>
							{/each}
						</Table.Body>
					</Table.Root>
				</div>
			</div>

			<Drawer.Footer class="flex flex-row items-center justify-end gap-2 border-t pt-6">
				<Form.Field {form} name="id">
					<Form.Control>
						{#snippet children({ props })}
							<Input type="hidden" value={item.id} name={props.name} />
						{/snippet}
					</Form.Control>
				</Form.Field>

				<!-- Additional hidden inputs for backup -->
				<input type="hidden" name="status" bind:value={$formData.status} />
				<input type="hidden" name="payment_status" bind:value={$formData.payment_status} />
				<input type="hidden" name="pickup_date" bind:value={$formData.pickup_date} />
				<input type="hidden" name="delivery_date" bind:value={$formData.delivery_date} />

				<Drawer.Close>
					{#snippet child({ props })}
						<Button variant="outline" {...props}>Cancel</Button>
					{/snippet}
				</Drawer.Close>

				<Button type="submit">Save Changes</Button>
			</Drawer.Footer>
		</form>
	</Drawer.Content>
</Drawer.Root>
