import type { PageServerLoad, Actions } from './$types';
import { fail } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms';
import { clientFormSchema } from '@/components/service-management/schemas';
import { zod } from 'sveltekit-superforms/adapters';
import { z } from 'zod';

export const load: PageServerLoad = async ({ fetch }) => {
	const response = await fetch('/api/services');

	if (!response.ok) {
		console.error('Failed to fetch services:', response.statusText);
		return {
			form: await superValidate(zod(clientFormSchema)),
			services: []
		};
	}

	const body = await response.json();

	return {
		form: await superValidate(zod(clientFormSchema)),
		services: body || []
	};
};

export const actions: Actions = {
	patch: async (event) => {
		console.log('patch action called');

		// Parse form data manually
		const formData = await event.request.formData();

		// Extract fields manually
		const id = formData.get('id') as string;
		const name = formData.get('name') as string;
		const description = formData.get('description') as string;
		const price = parseFloat(formData.get('price') as string);
		const estimated_days = parseInt(formData.get('estimated_days') as string);
		const imageFile = formData.get('image_file') as File;

		// Create data object for validation (without file)
		const dataToValidate = {
			id,
			name,
			description,
			price,
			estimated_days
		};

		// Validate using a simplified schema without the file
		const validationSchema = z.object({
			id: z.string().optional(),
			name: z.string().min(2).max(100),
			description: z.string().min(10).max(1000),
			price: z.number().positive(),
			estimated_days: z.number().int().positive().max(365)
		});

		const validation = validationSchema.safeParse(dataToValidate);

		if (!validation.success) {
			console.log('Validation errors:', validation.error);
			const form = await superValidate(dataToValidate, zod(validationSchema));
			return fail(400, { form });
		}

		const validatedData = validation.data;
		console.log('Validated data:', validatedData);

		let imageUrl = null;

		// Handle image upload if provided
		if (imageFile && imageFile.size > 0) {
			try {
				// Generate unique filename
				const fileExt = imageFile.name.split('.').pop();
				const fileName = `${validatedData.id}-${Date.now()}.${fileExt}`;
				const filePath = `services/${fileName}`;

				console.log('Uploading file:', { fileName, filePath, size: imageFile.size });

				// Convert File to ArrayBuffer for Supabase upload
				const fileBuffer = await imageFile.arrayBuffer();

				// Upload to Supabase Storage
				const { error: uploadError } = await event.locals.supabase.storage
					.from('services-images')
					.upload(filePath, fileBuffer, {
						contentType: imageFile.type,
						upsert: true // Replace if exists
					});

				if (uploadError) {
					console.error('Error uploading image:', uploadError);
					const form = await superValidate(dataToValidate, zod(validationSchema));
					return fail(500, { form, error: 'Failed to upload image' });
				}

				// Get public URL
				const { data: urlData } = event.locals.supabase.storage
					.from('services-images')
					.getPublicUrl(filePath);

				imageUrl = urlData.publicUrl;
				console.log('Image uploaded successfully:', imageUrl);
			} catch (uploadErr) {
				console.error('Image upload error:', uploadErr);
				const form = await superValidate(dataToValidate, zod(validationSchema));
				return fail(500, { form, error: 'Failed to process image upload' });
			}
		}

		// Prepare update data
		const updateData: {
			name: string;
			description: string;
			price: number;
			estimated_days: number;
			image_url?: string;
		} = {
			name: validatedData.name,
			description: validatedData.description,
			price: validatedData.price,
			estimated_days: validatedData.estimated_days
		};

		// Add image URL if uploaded
		if (imageUrl) {
			updateData.image_url = imageUrl;
		}

		console.log('Update data:', updateData);

		// Update service via API
		const response = await event.fetch(`/api/services/${validatedData.id}`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(updateData)
		});

		if (!response.ok) {
			console.error('Failed to update service:', response.statusText);
			const errorBody = await response.text();
			console.error('Error response:', errorBody);
			const form = await superValidate(dataToValidate, zod(validationSchema));
			return fail(500, { form, error: 'Failed to update service' });
		}

		const updatedService = await response.json();
		console.log('Updated service:', updatedService);

		// Return success with clean form data
		return {
			form: await superValidate(dataToValidate, zod(validationSchema)),
			updatedService
		};
	}
};
