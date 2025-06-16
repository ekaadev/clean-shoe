import { z } from 'zod';

export const formSchema = z.object({
	id: z.string().optional(),
	name: z.string().optional(),
	phone_number: z.string().optional(),
	address: z.string().optional()
});

export type FormSchema = typeof formSchema;
