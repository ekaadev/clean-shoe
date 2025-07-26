import { z } from 'zod';

export const formSchema = z.object({
	id: z.string().optional(),
	name: z.string().optional(),
	phone_number: z
		.string()
		.optional()
		.refine((val) => !val || /^(\+62|62|08)\d{8,13}$/.test(val), {
			message: 'Nomor HP harus dimulai dengan +62, 62, atau 08 dan berisi 10–15 digit'
		}),
	address: z.string().optional()
});

export type FormSchema = typeof formSchema;
