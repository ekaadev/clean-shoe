import { z } from 'zod';

export const formSchema = z.object({
	id: z.string().optional()
});

export type FormSchema = typeof formSchema;
