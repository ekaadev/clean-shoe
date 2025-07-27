import { z } from 'zod';

export const historySchema = z.object({
	id: z.number(),
	invoice_id: z.string(),
	pickup_address: z.string(),
	status: z.string(),
	payment_status: z.string(),
	total_amount: z.number(),
	created_at: z.string()
});

export type HistorySchema = typeof historySchema;
export type History = z.infer<typeof historySchema>;
