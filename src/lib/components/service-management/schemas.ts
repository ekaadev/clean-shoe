import { z } from 'zod';

export const formSchema = z.object({
	id: z.string().optional(), // Add ID field for updates
	name: z.string().min(2).max(100),
	description: z.string().min(10).max(1000),
	price: z.number().positive(),
	estimated_days: z.number().int().positive().max(365),
	image_file: z.instanceof(File).optional() // Keep it simple - just optional File
});

// Client-side schema without file (for Superforms)
export const clientFormSchema = z.object({
	id: z.string().optional(),
	name: z.string().min(2).max(100),
	description: z.string().min(10).max(1000),
	price: z.number().positive(),
	estimated_days: z.number().int().positive().max(365)
});

export type FormSchema = typeof formSchema;
export type ClientFormSchema = typeof clientFormSchema;
