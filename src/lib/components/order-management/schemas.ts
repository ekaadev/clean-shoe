import { z } from 'zod';

export const schema = z.object({
	id: z.string(),
	status: z.string(),
	payment_status: z.string(),
	total_amount: z.string(),
	pickup_address: z.string().optional(),
	delivery_address: z.string().optional(),
	pickup_date: z.string().optional(),
	delivery_date: z.string().optional(),
	user_id: z.string().optional()
});

export const formSchema = z.object({
	id: z.string(),
	status: z.string().optional(),
	payment_status: z.string().optional(),
	pickup_date: z.string().optional(),
	delivery_date: z.string().optional()
});

export type Schema = z.infer<typeof schema>;

export type FormSchema = typeof formSchema;
