import type { PageLoad } from './$types';
import type { Order } from '$lib/types/order';

const dummyOrders: Order[] = [
	{
		id: 'ORD001',
		customerName: 'Budi Santoso',
		totalAmount: 150000,
		status: 'Pending'
	},
	{
		id: 'ORD002',
		customerName: 'Siti Aminah',
		totalAmount: 300000,
		status: 'Completed'
	},
	{
		id: 'ORD003',
		customerName: 'Joko Susilo',
		totalAmount: 75000,
		status: 'Canceled'
	},
	{
		id: 'ORD004',
		customerName: 'Anwar Mulet',
		totalAmount: 68000,
		status: 'Completed'
	},
	{
		id: 'ORD005',
		customerName: 'Kobra Ler',
		totalAmount: 120000,
		status: 'Pending'
	},
	{
		id: 'ORD006',
		customerName: 'Kobra Ler',
		totalAmount: 120000,
		status: 'Pending'
	},
	{
		id: 'ORD007',
		customerName: 'Kobra Ler',
		totalAmount: 120000,
		status: 'Pending'
	},
	{
		id: 'ORD008',
		customerName: 'Kobra Ler',
		totalAmount: 120000,
		status: 'Pending'
	},
	{
		id: 'ORD009',
		customerName: 'Kobra Ler',
		totalAmount: 120000,
		status: 'Pending'
	},
	{
		id: 'ORD0010',
		customerName: 'Kobra Ler',
		totalAmount: 120000,
		status: 'Pending'
	},
	{
		id: 'ORD0011',
		customerName: 'Kobra Ler',
		totalAmount: 120000,
		status: 'Pending'
	},
	{
		id: 'ORD0012',
		customerName: 'Kobra Ler',
		totalAmount: 120000,
		status: 'Pending'
	},
	{
		id: 'ORD0013',
		customerName: 'Kobra Ler',
		totalAmount: 120000,
		status: 'Pending'
	},
	{
		id: 'ORD0014',
		customerName: 'Kobra Ler',
		totalAmount: 120000,
		status: 'Pending'
	}
];

export const load: PageLoad = () => {
	return {
		orders: dummyOrders
	};
};
