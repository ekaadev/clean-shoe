import { z } from 'zod';

export const schema = z.object({
	id: z.string(),
	status: z.string(),
	payment_status: z.string(),
	total_amount: z.string()
});

export type Schema = z.infer<typeof schema>;
