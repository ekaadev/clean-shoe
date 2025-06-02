export type Order = {
	id: string;
	customerName: string;
	totalAmount: number;
	status: 'Pending' | 'Completed' | 'Canceled';
};
