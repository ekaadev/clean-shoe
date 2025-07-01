<script lang="ts">
	import * as Card from '@/components/ui/card/index';
	import { AspectRatio } from '@/components/ui/aspect-ratio/index';
	import { Badge } from '$lib/components/ui/badge/index';
	import { quintOut } from 'svelte/easing';
	import { fly } from 'svelte/transition';
	const { data } = $props();
	import { toIndonesianCurrency } from '$lib/helper/currency';

	const dataOrdered = data?.orderDetails.order_items || [];

	// Get the order status
	const orderStatus = $derived(data?.orderDetails?.status || 'unknown');

	// Define color mappings with proper typing
	const statusColors: Record<string, { bg: string; text: string }> = {
		delivered: {
			bg: 'bg-green-100 dark:bg-green-900',
			text: 'text-green-800 dark:text-green-200'
		},
		pending: {
			bg: 'bg-yellow-100 dark:bg-yellow-900',
			text: 'text-yellow-800 dark:text-yellow-200'
		},
		cancelled: {
			bg: 'bg-red-100 dark:bg-red-900',
			text: 'text-red-800 dark:text-red-200'
		},
		processing: {
			bg: 'bg-blue-100 dark:bg-blue-900',
			text: 'text-blue-800 dark:text-blue-200'
		},
		completed: {
			bg: 'bg-green-100 dark:bg-green-900',
			text: 'text-green-800 dark:text-green-200'
		},
		default: {
			bg: 'bg-gray-100 dark:bg-gray-900',
			text: 'text-gray-800 dark:text-gray-200'
		}
	};

	// Define color and message mappings for payment status
	const paymentStatusColors: Record<string, { bg: string; text: string }> = {
		pending: {
			bg: 'bg-yellow-100 dark:bg-yellow-900',
			text: 'text-yellow-800 dark:text-yellow-200'
		},
		paid: {
			bg: 'bg-green-100 dark:bg-green-900',
			text: 'text-green-800 dark:text-green-200'
		},
		failed: {
			bg: 'bg-red-100 dark:bg-red-900',
			text: 'text-red-800 dark:text-red-200'
		},
		default: {
			bg: 'bg-gray-100 dark:bg-gray-900',
			text: 'text-gray-800 dark:text-gray-200'
		}
	};

	const statusMessages: Record<string, string> = {
		delivered: 'Pesanan Telah Diterima',
		pending: 'Pesanan Menunggu Konfirmasi',
		cancelled: 'Pesanan Dibatalkan',
		processing: 'Pesanan Sedang Diproses',
		completed: 'Pesanan Selesai',
		default: 'Status Pesanan'
	};

	const currentStatusColors = $derived(statusColors[orderStatus] || statusColors.default);
	const currentStatusMessage = $derived(statusMessages[orderStatus] || statusMessages.default);
	const currentPaymentStatusColors = $derived(
		paymentStatusColors[data?.orderDetails?.payment_status] || paymentStatusColors.default
	);
</script>

<svelte:head>
	<title>Orders Details</title>
</svelte:head>

<div class="flex flex-1 flex-col">
	<!-- Dynamic status header with proper colors -->
	<nav
		class="mb-10 flex w-full flex-1 flex-col {currentStatusColors.bg}"
		in:fly={{ y: -50, duration: 800, easing: quintOut }}
		out:fly={{ y: -50, duration: 100 }}
	>
		<div class="container mx-auto flex flex-col items-center justify-between py-2">
			<p class="text-center text-xl font-semibold {currentStatusColors.text}">
				{currentStatusMessage}
			</p>
		</div>
	</nav>
	<div class="container mx-auto flex flex-1 flex-col">
		<div class="flex flex-1 flex-col">
			<div class="flex flex-1 flex-col px-4 md:px-8">
				<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
					<div class="flex flex-1 flex-col gap-4">
						<div class="flex items-center justify-between">
							<p class="text-lg font-semibold">Purchased Services</p>
							<span class="text-muted-foreground text-sm">
								{dataOrdered.length}
								{dataOrdered.length === 1 ? 'service' : 'services'}
							</span>
						</div>

						<div class="flex flex-col gap-3">
							{#each dataOrdered as value, index}
								<Card.Root class="w-full">
									<Card.Content class="p-4">
										<div class="flex flex-col gap-4 md:flex-row">
											<!-- Service Image -->
											<div class="w-full flex-shrink-0 md:w-32">
												<AspectRatio ratio={16 / 9} class="w-full">
													<img
														src={'https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80'}
														alt={'Service Image ' + (index + 1)}
														class="h-full w-full rounded-md object-cover"
													/>
												</AspectRatio>
											</div>

											<!-- Service Details -->
											<div class="flex flex-1 flex-col justify-between gap-3">
												<div class="flex flex-col gap-2">
													<div class="flex items-start justify-between">
														<h3 class="text-lg leading-tight font-semibold">
															{value.services.name}
														</h3>
														<a
															href={`/services/${value.services.id}`}
															class="text-sm text-blue-600 hover:text-blue-800 hover:underline"
														>
															View Details
														</a>
													</div>

													<p class="text-muted-foreground line-clamp-2 text-sm">
														{value.services.description}
													</p>
												</div>

												<!-- Service Info Grid -->
												<div class="grid grid-cols-1 gap-3 md:grid-cols-3">
													<div class="flex flex-col">
														<span class="text-muted-foreground text-xs tracking-wide uppercase"
															>Quantity</span
														>
														<span class="text-sm font-medium">
															{value.quantity || 1}
															{value.quantity === 1 ? 'item' : 'items'}
														</span>
													</div>

													<div class="flex flex-col">
														<span class="text-muted-foreground text-xs tracking-wide uppercase"
															>Estimated Days</span
														>
														<span class="text-sm font-medium">
															{value.services.estimated_days}
															{value.services.estimated_days === 1 ? 'day' : 'days'}
														</span>
													</div>

													<div class="flex flex-col">
														<span class="text-muted-foreground text-xs tracking-wide uppercase"
															>Unit Price</span
														>
														<span class="text-sm font-semibold">
															{toIndonesianCurrency(value.services.price)}
														</span>
													</div>
												</div>

												<!-- Total Price if quantity > 1 -->
												{#if value.quantity && value.quantity > 1}
													<div class="flex items-center justify-between border-t pt-2">
														<span class="text-sm font-medium">Total for this service:</span>
														<span class="text-lg font-bold text-green-600">
															{toIndonesianCurrency(value.services.price * value.quantity)}
														</span>
													</div>
												{/if}
											</div>
										</div>
									</Card.Content>
								</Card.Root>
							{/each}
						</div>

						<!-- Order Summary -->
						{#if dataOrdered.length > 0}
							<Card.Root class="mt-1">
								<Card.Header>
									<Card.Title class="text-base">Order Summary</Card.Title>
								</Card.Header>
								<Card.Content class="pt-0">
									<div class="space-y-2">
										{#each dataOrdered as value}
											<div class="flex justify-between text-sm">
												<span>{value.services.name} × {value.quantity || 1}</span>
												<span
													>{toIndonesianCurrency(
														value.services.price * (value.quantity || 1)
													)}</span
												>
											</div>
										{/each}
										<div class="mt-2 border-t pt-2">
											<div class="flex justify-between font-semibold">
												<span>Total Amount:</span>
												<span class="text-lg text-green-600">
													{toIndonesianCurrency(
														dataOrdered.reduce(
															(total: any, item: any) =>
																total + item.services.price * (item.quantity || 1),
															0
														)
													)}
												</span>
											</div>
										</div>
									</div>
								</Card.Content>
							</Card.Root>
						{/if}
					</div>
					<div class="flex flex-1 flex-col gap-4">
						<p class="text-lg font-semibold">Order Details</p>
						<!-- data metode pembayaran -->
						<Card.Root>
							<Card.Header>
								<Card.Title class="text-base">Metode Pembayaran</Card.Title>
							</Card.Header>
							<Card.Content class="pt-0">
								<div class="space-y-2">
									<div class="flex justify-between text-sm">
										<!-- no invoice will be update soon, it is temporary -->
										<span>No Invoice</span>
										<span>{data.orderDetails.invoice_id}</span>
									</div>
									<div class="flex justify-between text-sm">
										<span>Status Pembayaran</span>
										<span>
											<Badge
												variant="outline"
												class="{currentPaymentStatusColors.text} {currentPaymentStatusColors.bg}"
											>
												{data.orderDetails.payment_status}
											</Badge>
										</span>
									</div>
									<div class="flex justify-between text-sm">
										<span>Status Order</span>
										<span>
											<Badge
												variant="outline"
												class="capitalize {currentStatusColors.text} {currentStatusColors.bg}"
											>
												{data.orderDetails.status}
											</Badge>
										</span>
									</div>
									<div class="mt-2 border-t pt-2">
										<div class="flex justify-between font-semibold">
											<span>Jenis Pembayaran</span>
											<span class="text-lg">
												{data.orderDetails.payment_transactions[0]?.payment_method.toUpperCase() ||
													'N/A'}
											</span>
										</div>
									</div>
								</div>
							</Card.Content>
						</Card.Root>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
