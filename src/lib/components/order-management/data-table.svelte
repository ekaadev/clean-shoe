<script lang="ts" module>
	export const columns: ColumnDef<Schema>[] = [
		{
			id: 'select',
			header: ({ table }) =>
				renderComponent(DataTableCheckbox, {
					checked: table.getIsAllPageRowsSelected(),
					indeterminate: table.getIsSomePageRowsSelected() && !table.getIsAllPageRowsSelected(),
					onCheckedChange: (value) => table.toggleAllPageRowsSelected(!!value),
					'aria-label': 'Select all'
				}),
			cell: ({ row }) =>
				renderComponent(DataTableCheckbox, {
					checked: row.getIsSelected(),
					onCheckedChange: (value) => row.toggleSelected(!!value),
					'aria-label': 'Select row'
				}),
			enableSorting: false,
			enableHiding: false,
			size: 50
		},
		{
			accessorKey: 'invoice_id',
			header: 'Invoice ID',
			enableHiding: false,
			cell: ({ row }) => renderSnippet(DataTableId, { row }),
			size: 180,
      filterFn: (row, columnId, filterValue) => {
        const cellValue = String(row.getValue(columnId) ?? '');
        return cellValue.toLowerCase().includes(String(filterValue).toLowerCase());
      }
		},
		{
			accessorKey: 'pickup_address',
			header: 'Pickup Address',
			cell: ({ row }) => renderSnippet(DataTablePickupAddress, { row }),
			size: 300
		},
		{
			accessorKey: 'status',
			header: 'Status',
			cell: ({ row }) => renderSnippet(DataTableStatus, { row }),
			size: 150
		},
		{
			accessorKey: 'payment_status',
			header: 'Payment',
			cell: ({ row }) => renderSnippet(DataTablePaymentStatus, { row }),
			size: 150
		},
		{
			accessorKey: 'total_amount',
			header: 'Total Amount',
			cell: ({ row }) => renderSnippet(DataTableTotalAmount, { row }),
			size: 150
		},
		{
			id: 'actions',
			cell: ({ row }) => renderComponent(DataTableCellViewer, { item: row.original }),
			size: 100
		}
	];
</script>

<script lang="ts">
	import {
		getCoreRowModel,
		getFacetedRowModel,
		getFacetedUniqueValues,
		getFilteredRowModel,
		getSortedRowModel,
		type ColumnDef,
		type ColumnFiltersState,
		type PaginationState,
		type Row,
		type RowSelectionState,
		type SortingState,
		type VisibilityState
	} from '@tanstack/table-core';
	import { FlexRender, renderComponent, renderSnippet } from '$lib/components/ui/data-table/index';
	import type { Schema } from './schemas';
	import { createSvelteTable } from '@/components/ui/data-table/data-table.svelte';
	import * as Table from '@/components/ui/table/index';
	import DataTableCheckbox from './data-table-checkbox.svelte';
	import DataTableCellViewer from './data-table-cell-viewer.svelte';
	import { Input } from '@/components/ui/input/index';
	import { Button } from '@/components/ui/button/index';
	import { Badge } from '@/components/ui/badge/index';
	import { Label } from '@/components/ui/label/index';
	import { page } from '$app/state';
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';
	import { toIndonesianCurrency } from '@/helper/currency';
	import { getLastStringUUID, toUppercaseFirstWord } from '@/helper/format';
	import CircleCheckFilledIcon from '@tabler/icons-svelte/icons/circle-check-filled';
	import Circle from '@tabler/icons-svelte/icons/circle';
	import LoaderIcon from '@tabler/icons-svelte/icons/loader';
	import PackageImport from '@tabler/icons-svelte/icons/package-import';
	import ChevronLeftIcon from '@tabler/icons-svelte/icons/chevron-left';
	import ChevronRightIcon from '@tabler/icons-svelte/icons/chevron-right';
	import ChevronsLeftIcon from '@tabler/icons-svelte/icons/chevrons-left';
	import ChevronsRightIcon from '@tabler/icons-svelte/icons/chevrons-right';

	let pagination = $state<PaginationState>({
		pageIndex: (page.data.pagination?.page || 1) - 1,
		pageSize: page.data.pagination?.limit || 10
	});
	let sorting = $state<SortingState>([]);
	let columnFilters = $state<ColumnFiltersState>([]);
	let rowSelection = $state<RowSelectionState>({});
	let columnVisibility = $state<VisibilityState>({});

	// Helper function to navigate to a new page
	const navigateToPage = (newPage: number) => {
		if (browser) {
			const url = new URL(window.location.href);
			url.searchParams.set('page', newPage.toString());
			url.searchParams.set('limit', pagination.pageSize.toString());
			goto(url.pathname + url.search);
		}
	};

	const table = createSvelteTable({
		get data() {
			return page.data.tableOrder as Schema[];
		},
		columns,
		state: {
			get pagination() {
				return pagination;
			},
			get sorting() {
				return sorting;
			},
			get columnVisibility() {
				return columnVisibility;
			},
			get rowSelection() {
				return rowSelection;
			},
			get columnFilters() {
				return columnFilters;
			}
		},
		getRowId: (row) => row.id.toString(),
		enableRowSelection: true,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFacetedRowModel: getFacetedRowModel(),
		getFacetedUniqueValues: getFacetedUniqueValues(),
		getFilteredRowModel: getFilteredRowModel(),
		manualPagination: true,
		pageCount: page.data.pagination?.totalPages || 1,
		onPaginationChange: (updater) => {
			if (typeof updater === 'function') {
				const newPagination = updater(pagination);
				pagination = newPagination;
				navigateToPage(newPagination.pageIndex + 1);
			} else {
				pagination = updater;
				navigateToPage(updater.pageIndex + 1);
			}
		},
		onSortingChange: (updater) => {
			if (typeof updater === 'function') {
				sorting = updater(sorting);
			} else {
				sorting = updater;
			}
		},
		onColumnFiltersChange: (updater) => {
			if (typeof updater === 'function') {
				columnFilters = updater(columnFilters);
			} else {
				columnFilters = updater;
			}
		},
		onColumnVisibilityChange: (updater) => {
			if (typeof updater === 'function') {
				columnVisibility = updater(columnVisibility);
			} else {
				columnVisibility = updater;
			}
		},
		onRowSelectionChange: (updater) => {
			if (typeof updater === 'function') {
				rowSelection = updater(rowSelection);
			} else {
				rowSelection = updater;
			}
		}
	});
</script>

<div class="flex w-full flex-col justify-start gap-6">
	<div class="flex flex-col gap-2 px-4 lg:px-6">
		<h1 class="text-3xl font-semibold tracking-tight transition-colors">Order Management</h1>
		<p class="text-muted-foreground text-sm">Review and manage the latest orders from customers.</p>
		<Input
			placeholder="Filter orders..."
			value={(table.getColumn('invoice_id')?.getFilterValue() as string) ?? ''}
			onchange={(e) => {
				table.getColumn('invoice_id')?.setFilterValue(e.currentTarget.value);
			}}
			oninput={(e) => {
				table.getColumn('invoice_id')?.setFilterValue(e.currentTarget.value);
			}}
			class="max-w-sm"
		/>
	</div>
	<div class="flex items-start justify-between px-4 lg:px-6">
		<div class="relative flex w-full flex-col gap-4 overflow-auto rounded-lg border">
			<Table.Root style="table-layout: auto; width: 100%; min-width: 900px;">
				<Table.Header class="bg-muted sticky top-0 z-10">
					{#each table.getHeaderGroups() as headerGroup (headerGroup.id)}
						<Table.Row>
							{#each headerGroup.headers as header (header.id)}
								<Table.Head colspan={header.colSpan} style="min-width: {header.getSize()}px">
									{#if !header.isPlaceholder}
										<FlexRender
											content={header.column.columnDef.header}
											context={header.getContext()}
										/>
									{/if}
								</Table.Head>
							{/each}
						</Table.Row>
					{/each}
				</Table.Header>
				<Table.Body class="**:data-[slot=table-cell]:first:w-8">
					{#if table.getRowModel().rows?.length}
						{#each table.getRowModel().rows as row (row.id)}
							<Table.Row data-state={row.getIsSelected() && 'selected'}>
								{#each row.getVisibleCells() as cell (cell.id)}
									<Table.Cell style="min-width: {cell.column.getSize()}px" class="text-wrap">
										<FlexRender content={cell.column.columnDef.cell} context={cell.getContext()} />
									</Table.Cell>
								{/each}
							</Table.Row>
						{/each}
					{:else}
						<Table.Row>
							<Table.Cell colspan={columns.length} class="h-24 text-center">No results.</Table.Cell>
						</Table.Row>
					{/if}
				</Table.Body>
			</Table.Root>
		</div>
	</div>
	<div class="flex items-center justify-between px-6 lg:px-10">
		<div class="text-muted-foreground hidden flex-1 text-sm lg:flex">
			{table.getFilteredSelectedRowModel().rows.length} of
			{page.data.pagination?.totalCount || 0} row(s) selected.
		</div>
		<div class="flex w-full items-center gap-8 lg:w-fit">
			<div class="hidden items-center gap-2 lg:flex">
				<Label for="rows-per-page" class="text-sm font-medium"
					>Rows per page {page.data.pagination?.limit || 10}</Label
				>
			</div>
			<div class="flex w-fit items-center justify-center text-sm font-medium">
				Page {page.data.pagination?.page || 1} of
				{page.data.pagination?.totalPages || 1}
			</div>
			<div class="ml-auto flex items-center gap-2 lg:ml-0">
				<Button
					variant="outline"
					class="hidden h-8 w-8 p-0 lg:flex"
					onclick={() => navigateToPage(1)}
					disabled={(page.data.pagination?.page || 1) <= 1}
				>
					<span class="sr-only">Go to first page</span>
					<ChevronsLeftIcon />
				</Button>
				<Button
					variant="outline"
					class="size-8"
					size="icon"
					onclick={() => navigateToPage((page.data.pagination?.page || 1) - 1)}
					disabled={(page.data.pagination?.page || 1) <= 1}
				>
					<span class="sr-only">Go to previous page</span>
					<ChevronLeftIcon />
				</Button>
				<Button
					variant="outline"
					class="size-8"
					size="icon"
					onclick={() => navigateToPage((page.data.pagination?.page || 1) + 1)}
					disabled={(page.data.pagination?.page || 1) >= (page.data.pagination?.totalPages || 1)}
				>
					<span class="sr-only">Go to next page</span>
					<ChevronRightIcon />
				</Button>
				<Button
					variant="outline"
					class="hidden size-8 lg:flex"
					size="icon"
					onclick={() => navigateToPage(page.data.pagination?.totalPages || 1)}
					disabled={(page.data.pagination?.page || 1) >= (page.data.pagination?.totalPages || 1)}
				>
					<span class="sr-only">Go to last page</span>
					<ChevronsRightIcon />
				</Button>
			</div>
		</div>
	</div>
</div>

{#snippet DataTableId({ row }: { row: Row<Schema> })}
	{row.getValue('invoice_id')}
{/snippet}

{#snippet DataTablePickupAddress({ row }: { row: Row<Schema> })}
	<div class="max-w-xs truncate text-sm leading-tight">
		{row.getValue('pickup_address')}
	</div>
{/snippet}

{#snippet DataTableTotalAmount({ row }: { row: Row<Schema> })}
	<div class="truncate px-1.5 text-left">
		{toIndonesianCurrency(row.getValue('total_amount'))}
	</div>
{/snippet}

{#snippet DataTableStatus({ row }: { row: Row<Schema> })}
	<Badge variant="outline" class="text-muted-foreground px-1.5">
		{#if row.getValue('status') === 'pending'}
			<Circle class="fill-yellow-500 dark:fill-yellow-400" />
		{:else if row.getValue('status') === 'confirmed'}
			<CircleCheckFilledIcon />
		{:else if row.getValue('status') === 'processing'}
			<LoaderIcon />
		{:else if row.getValue('status') === 'ready_for_delivery'}
			<PackageImport class="fill-green-500 dark:fill-green-400" />
		{:else if row.getValue('status') === 'delivered'}
			<CircleCheckFilledIcon class="fill-green-500 dark:fill-green-400" />
		{:else}
			<Circle class="fill-red-500 dark:fill-red-400" />
		{/if}
		{toUppercaseFirstWord(row.getValue('status'))}
	</Badge>
{/snippet}

{#snippet DataTablePaymentStatus({ row }: { row: Row<Schema> })}
	<Badge variant="outline" class="text-muted-foreground px-1.5">
		{#if row.getValue('payment_status') === 'pending'}
			<Circle class="fill-yellow-500 dark:fill-yellow-400" />
		{:else if row.getValue('payment_status') === 'paid'}
			<CircleCheckFilledIcon class="fill-green-500 dark:fill-green-400" />
		{:else}
			<Circle class="fill-red-500 dark:fill-red-400" />
		{/if}
		{toUppercaseFirstWord(row.getValue('payment_status'))}
	</Badge>
{/snippet}
